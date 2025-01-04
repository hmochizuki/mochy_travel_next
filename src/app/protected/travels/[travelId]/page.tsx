import { createClient } from "@/utils/supabase/server";
import NewTravelEventButton from "./NewTravelEventButton";
import { format, isValid } from "date-fns";

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

  console.log(error);
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
    <div className="flex-1 w-[90dvw] flex flex-col gap-12">
      {eventsByDate && Object.keys(eventsByDate).length > 0 ? (
        <>
          {Object.entries(eventsByDate).map(([date, events]) => (
            <div key={date} className="border rounded-lg p-4 shadow w-full">
              <h2 className="text-xl font-bold mb-2">
                {date !== "未定"
                  ? format(new Date(date), "yyyy年MM月dd日")
                  : "未定"}
              </h2>
              <ul>
                {events.map((event) => (
                  <li key={event.event_id} className="mb-1">
                    <div className="grid grid-cols-[100px_auto] items-center gap-4">
                      <p className="text-sm text-left">
                        <span className="block text-gray-500">
                          {event.start_time || "未定"}
                        </span>
                        <span className="block text-gray-500">
                          ~ {event.end_time || "未定"}
                        </span>
                      </p>
                      <span className="text-left font-medium">
                        {event.event_name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
