"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const createTravelAction = async (formData: FormData) => {
  const supabase = await createClient();

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  if (!title || !description) {
    return encodedRedirect(
      "error",
      "/protected/travels/new",
      "Title and description are required",
    );
  }

  const { data, error } = await supabase.from("travels").insert([{ title, description }]);

  if (error) {
    console.error("Error creating travel plan:", error);
    return encodedRedirect("error", "/protected/travels/new", error.message);
  }

  return redirect("/protected/travels");
};
