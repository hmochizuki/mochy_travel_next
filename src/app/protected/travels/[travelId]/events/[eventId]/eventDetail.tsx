import type { TravelEvent } from "@/types/travelEvent";
import { Star } from "lucide-react";

type EventDetailsProps = {
  event: TravelEvent;
};

const EventSheet = ({ children }: React.PropsWithChildren) => {
  return <li className="bg-white p-4 rounded-lg">{children}</li>;
};

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <ul className="bg-gray-100 p-4 rounded-lg space-y-4 list-none">
      <EventSheet>
        <div className="text-center text-xl font-bold mb-4">
          {event.start_date}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Star className="text-yellow-500 mr-2" style={{ marginLeft: '-10px' }} />
            <span>
              {event.start_time || "未定"}
              <br />
              ~ {event.end_time || "未定"}
            </span>
          </div>
          <div className="flex-1 text-left font-medium text-lg">
            {event.event_name}
          </div>
        </div>
      </EventSheet>
      <EventSheet>
        <p>
          <span>場所:</span> <strong>{event.location}</strong>
        </p>
      </EventSheet>
      <EventSheet>
        <p>
          <span>説明:</span> <strong>{event.description}</strong>
        </p>
      </EventSheet>
      <EventSheet>
        <p>
          <span>URL:</span>{" "}
          <strong>
            <a href={event.url} className="text-blue-500">
              {event.url}
            </a>
          </strong>
        </p>
      </EventSheet>
      <EventSheet>
        <p>
          <span>費用:</span> <strong>¥{event.cost}</strong>
        </p>
      </EventSheet>
    </ul>
  );
};

export default EventDetails;
