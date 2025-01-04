"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const createTravelAction = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return encodedRedirect(
      "error",
      "/protected/travels/new",
      userError?.message ?? "User not found",
    );
  }

  const travel_name = formData.get("travel_name")?.toString();
  const first_name = user.user_metadata.first_name;
  const last_name = user.user_metadata.last_name;

  // TODO: first_nameとlast_nameは必須を必須にする。
  if (!travel_name) {
    return encodedRedirect(
      "error",
      "/protected/travels/new",
      "required fields are required",
    );
  }

  try {
    // TODO: トランザクション処理にする。supabaseクライアントがトランザクションを提供してないため工夫が必要。
    const { data: travelData, error: travelError } = await supabase
      .from("travels")
      .insert([{ travel_name, created_by: user.id, created_user_name: `${first_name} ${last_name}` }])
      .select("travel_id")
      .single();

    if (travelError) throw travelError;

    const { error: memberError } = await supabase.from("travel_members").insert([
      {
        travel_id: travelData.travel_id,
        user_id: user.id,
        role: "owner",
      },
    ]);
    if (memberError) throw memberError;

  } catch (error) {
    console.error("Transaction error:", error);
    if (!(error instanceof Error)) {
      return encodedRedirect("error", "/protected/travels/new", "Unknown error");
    }
    return encodedRedirect("error", "/protected/travels/new", error.message);
  }

  return redirect("/protected");
};
