"use server";

import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const updateTravelEventAction = async (
  formData: FormData,
  travelId: string,
  eventId: string
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

  const pathWhenError = `/protected/travels/${travelId}/events/${eventId}/edit`;
  const pathWhenSuccess = `/protected/travels/${travelId}/events/${eventId}`;

  if (!eventName) {
    return encodedRedirect(
      "error",
      pathWhenError,
      "Event name is required"
    );
  }

  try {
    const { error: eventError } = await supabase.from("travel_events").update([
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
        pathWhenError,
        "Unknown error"
      );
    }
    return encodedRedirect(
      "error",
      pathWhenError,
      error.message
    );
  }

  return redirect(pathWhenSuccess);
};
