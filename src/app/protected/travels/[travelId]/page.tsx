import { createClient } from "@/utils/supabase/server";
import NewTravelEventButton from "./NewTravelEventButton";
import TravelEventsCard from "./TravelEventsCard";
import CreateHandbookButton from "./createHandbookButton";
import type { TravelEvent } from "@/types/travelEvent";

type Params = Promise<{
  travelId: string;
}>;

type TravelEvents = Pick<TravelEvent, "event_id" | "start_time" | "end_time" | "event_name">[];

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

  const eventsByDate = travelEvents?.reduce<Record<string, TravelEvents>>(
    (acc: Record<string, TravelEvents>, event) => {
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
      <div className="fixed bottom-8 right-4 z-50 flex flex-col gap-2">
        <CreateHandbookButton travelId={travelId} />
        <NewTravelEventButton />
      </div>
    </div>
  );
}
