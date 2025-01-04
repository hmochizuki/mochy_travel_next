"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const createTravelEventAction = async (
  formData: FormData,
  travelId: string
) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return encodedRedirect(
      "error",
      `/protected/travels/${travelId}/events/new`,
      userError?.message ?? "User not found"
    );
  }

  const eventName = formData.get("eventName")?.toString();
  const startDate = formData.get("startDate")?.toString() || null;
  const startTime = formData.get("startTime")?.toString() || null;
  const endDate = formData.get("endDate")?.toString() || null;
  const endTime = formData.get("endTime")?.toString() || null;
  const eventType = formData.get("eventType")?.toString() || null;
  const location = formData.get("location")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const url = formData.get("url")?.toString() || "";
  const cost = formData.get("cost")?.toString() || null;

  if (!eventName) {
    return encodedRedirect(
      "error",
      `/protected/travels/${travelId}/events/new`,
      "Event name is required"
    );
  }

  try {
    const { error: eventError } = await supabase.from("travel_events").insert([
      {
        travel_id: travelId,
        event_name: eventName,
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime,
        event_type: eventType,
        location: location,
        description: description,
        url: url,
        cost: cost,
      },
    ]);

    if (eventError) throw eventError;
  } catch (error) {
    console.error("Transaction error:", error);
    if (!(error instanceof Error)) {
      return encodedRedirect(
        "error",
        `/protected/travels/${travelId}/events/new`,
        "Unknown error"
      );
    }
    return encodedRedirect(
      "error",
      `/protected/travels/${travelId}/events/new`,
      error.message
    );
  }

  return redirect(`/protected/travels/${travelId}`);
};
