import { createClient } from "@/utils/supabase/server";
import NewTravelEventButton from "./NewTravelEventButton";
import TravelEventsCard from "./TravelEventsCard";

type Params = Promise<{
  travelId: string;
}>;

export default async function TravelPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { travelId } = await params;

  const { data: travelEvents, error } = await supabase
    .from("travel_events")
    .select(
      `
      event_id,
      event_name,
      start_date,
      start_time,
      end_date,
      end_time
    `
    )
    .eq("travel_id", travelId)
    .order("start_date", { ascending: true });

  // 日付ごとにイベントをグループ化
  const eventsByDate = travelEvents?.reduce(
    (acc: Record<string, any[]>, event) => {
      const date = event.start_date || "未定";
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    },
    {}
  );

  return (
    <div className="flex-1 w-[90dvw] flex flex-col gap-4">
      {eventsByDate && Object.keys(eventsByDate).length > 0 ? (
        <>
          {Object.entries(eventsByDate).map(([date, events]) => (
            <TravelEventsCard
              key={date}
              date={date}
              events={events}
              travelId={travelId}
            />
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">
            イベントがありません。
            <br />
            新しいイベントを作成してください。
          </p>
        </div>
      )}
      <NewTravelEventButton />
    </div>
  );
}
