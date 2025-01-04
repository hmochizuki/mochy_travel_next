"use client";

import { IconButton } from "@/components/ui/iconButton";
import { Notebook } from "lucide-react";
import { generateAndUploadHandbook, getSignedHandbookURL } from "./actions";
import { useState } from "react";

export default function CreateHandbookButton({ travelId }: { travelId: string }) {
  const [_isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);

    try {
      const filePath = await generateAndUploadHandbook(travelId);
      const pdfUrl = await getSignedHandbookURL(filePath);
      alert("しおりが正常に生成されました！");
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error:", error);
      alert("しおりの生成中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      <Notebook />
    </IconButton>
  );
}
