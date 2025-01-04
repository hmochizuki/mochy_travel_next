import React, { PropsWithChildren } from "react";

type EventDetailsProps = {
  event: {
    event_id: string;
    travel_id: string;
    event_name: string;
    location: string;
    description: string;
    url: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    cost: number;
    created_at: string;
    created_by: string;
    event_type: string;
  };
};

const EventSheet = ({ children }: PropsWithChildren) => {
  return (
    <li className="bg-white p-4 rounded-lg">
      {children}
    </li>
  );
};

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <ul className="bg-gray-100 p-4 rounded-lg space-y-4 list-none">
      <EventSheet>
        <strong>イベント名:</strong>
      </EventSheet>
      <EventSheet>
        <strong>場所:</strong>
      </EventSheet>
      <EventSheet>
        <strong>説明:</strong>
      </EventSheet>
      <EventSheet>
        <strong>URL:</strong>
      </EventSheet>
      <EventSheet>
        <strong>開始日:</strong>
      </EventSheet>
      <EventSheet>
        <strong>終了日:</strong>
      </EventSheet>
      <EventSheet>
        <strong>費用:</strong>
      </EventSheet>
      <EventSheet>
        <strong>作成日時:</strong>
      </EventSheet>
      <EventSheet>
        <strong>作成者:</strong>
      </EventSheet>
      <EventSheet>
        <strong>終了日:</strong>
      </EventSheet>
      <EventSheet>
        <strong>費用:</strong> ¥{event.cost}
      </EventSheet>
      <EventSheet>
        <strong>作成日時:</strong> {event.created_at}
      </EventSheet>
      <EventSheet>
        <strong>作成者:</strong> {event.created_by}
      </EventSheet>
      <EventSheet>
        <strong>イベントタイプ:</strong> {event.event_type}
      </EventSheet>
    </ul>
  );
};

export default EventDetails;
