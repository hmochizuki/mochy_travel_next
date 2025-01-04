import { createClient } from "@/utils/supabase/server";
import EventDetail from "./eventDetail";
import EditTravelEventButton from "./EditTravelEventButton";

type Params = Promise<{
  travelId: string;
  eventId: string;
}>;

export default async function TravelEventPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { travelId, eventId } = await params;
  const { data: event, error } = await supabase
    .from("travel_events")
    .select(
      `
      event_id,
      travel_id,
      event_name,
      location,
      description,
      url,
      start_date,
      start_time,
      end_date,
      end_time,
      cost,
      created_at,
      created_by,
      event_type
    `
    )
    .eq("travel_id", travelId)
    .eq("event_id", eventId)
    .single();

  if (error || !event) {
    console.error("Error fetching travel event:", error);
    return <div>エラーが発生しました。データを取得できませんでした。</div>;
  }
  
  return (
    <div className="flex-1 w-[90dvw] flex flex-col gap-4">
      <EventDetail event={event} />
      <EditTravelEventButton />
    </div>
  );
}
