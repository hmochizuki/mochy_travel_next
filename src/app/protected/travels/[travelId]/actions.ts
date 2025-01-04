"use server";

import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb } from "pdf-lib";
// @ts-expect-error TODO: fontkit の型定義を追加
import * as fontkit from "fontkit";

type TravelData = {
  travelName: string;
  startDate: string;
  endDate: string;
  events: Array<{
    eventName: string;
    startTime: string | null;
    endTime: string | null;
    location: string;
    description: string;
  }>;
}


// TODO: 関数の切り分け
// 日本語フォントのロード関数
async function loadFont(fileName: string) {
  const fontPath = path.resolve("public/fonts", fileName);
  return fs.readFile(fontPath);
}

export async function createTravelHandbookPDF(travelData: TravelData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  
  pdfDoc.registerFontkit(fontkit);
  // 日本語フォントを埋め込み
  const regularFontBytes = await loadFont("NotoSansJP-Regular.ttf");
  const boldFontBytes = await loadFont("NotoSansJP-Bold.ttf");

  const regularFont = await pdfDoc.embedFont(regularFontBytes);
  const boldFont = await pdfDoc.embedFont(boldFontBytes);

  // PDF にテキストを描画
  page.drawText(`旅のしおり: ${travelData.travelName}`, {
    x: 50,
    y: 750,
    size: 24,
    font: boldFont,
    color: rgb(0, 0.53, 0.71),
  });

  page.drawText(`開始日: ${travelData.startDate}`, {
    x: 50,
    y: 700,
    size: 16,
    font: regularFont,
  });

  page.drawText(`終了日: ${travelData.endDate}`, {
    x: 50,
    y: 680,
    size: 16,
    font: regularFont,
  });

  // イベント情報を描画
  let eventY = 650;
  for (const event of travelData.events) {
    page.drawText(`イベント: ${event.eventName}`, {
      x: 50,
      y: eventY,
      size: 14,
      font: boldFont,
    });
    page.drawText(`時間: ${event.startTime} ~ ${event.endTime}`, {
      x: 50,
      y: eventY - 20,
      size: 12,
      font: regularFont,
    });
    page.drawText(`場所: ${event.location}`, {
      x: 50,
      y: eventY - 40,
      size: 12,
      font: regularFont,
    });
    page.drawText(`説明: ${event.description}`, {
      x: 50,
      y: eventY - 60,
      size: 12,
      font: regularFont,
    });
    eventY -= 80;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}



async function uploadHandbookPDF(travelId: string, pdfBuffer: Buffer) {
  const supabase = await createClient();

  const fileName = `${travelId}/handbook-${randomUUID()}.pdf`;
  const { error } = await supabase.storage
    .from("travel-handbooks")
    .upload(fileName, pdfBuffer, {
      contentType: "application/pdf",
    });

  if (error) {
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }

  return fileName;
}

export async function getSignedHandbookURL(filePath: string) {
  const supabase = await createClient();

  // NOTE: 署名付き URL を生成（有効期限は1時間）
  const { data, error } = await supabase.storage
    .from("travel-handbooks")
    .createSignedUrl(filePath, 60 * 60);

  if (error || !data) {
    throw new Error(`Failed to create signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

export async function generateAndUploadHandbook(travelId: string) {
  const supabase = await createClient();

  const { data: travel, error: travelError } = await supabase
    .from("travels")
    .select("*")
    .eq("travel_id", travelId)
    .single();

  if (travelError || !travel) {
    throw new Error("旅行情報の取得に失敗しました。");
  }

  const { data: events, error: eventsError } = await supabase
    .from("travel_events")
    .select("*")
    .eq("travel_id", travelId);

  if (eventsError) {
    throw new Error("イベント情報の取得に失敗しました。");
  }

  const pdfBuffer = await createTravelHandbookPDF({
    travelName: travel.travel_name,
    // TODO: 旅行の開始日と終了日を追加
    startDate: "2024-01-01",
    endDate: "2024-01-01",
    events: events.map((event) => ({
      eventName: event.event_name,
      startTime: event.start_time,
      endTime: event.end_time,
      location: event.location,
      description: event.description,
    })),
  });

  const filePath = await uploadHandbookPDF(travelId, pdfBuffer);

  const { error } = await supabase
    .from("travel_handbook")
    .upsert({
      travel_id: travelId,
      pdf_file_path: filePath,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error("PDF ファイルパスの保存に失敗しました。");
  }

  return filePath;
}
