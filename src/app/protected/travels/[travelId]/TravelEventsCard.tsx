"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";

type Props = {
  date: string;
  events: {
    event_id: string;
    start_time: string;
    end_time: string;
    event_name: string;
  }[];
  travelId: string;
};

export default function TravelEventsCard({
  date,
  events,
  travelId,
}: Props) {
  const router = useRouter();

  return (
    <div key={date} className="border rounded-lg p-4 shadow w-full">
      <h2 className="text-xl font-bold mb-2">
        {date !== "未定" ? format(new Date(date), "yyyy年MM月dd日") : "未定"}
      </h2>
      <ul>
        {events.map((event) => (
          <li key={event.event_id} className="mb-1">
            <button
              type="button"
              onClick={() => {
                router.push(`/protected/travels/${travelId}/events/${event.event_id}`);
              }}
              className="grid grid-cols-[100px_auto] items-center gap-4"
            >
              <p className="text-sm text-left">
                <span className="block text-gray-500">
                  {event.start_time || "未定"}
                </span>
                <span className="block text-gray-500">
                  ~ {event.end_time || "未定"}
                </span>
              </p>
              <span className="text-left font-medium">{event.event_name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}