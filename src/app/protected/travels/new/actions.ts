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

  if (!travel_name) {
    return encodedRedirect(
      "error",
      "/protected/travels/new",
      "travel_name is required",
    );
  }

  const { data, error } = await supabase.from("travels").insert([{ travel_name, created_by: user?.id }]);

  if (error) {
    console.error("Error creating travel plan:", error);
    return encodedRedirect("error", "/protected/travels/new", error.message);
  }

  return redirect("/protected/travels");
};
