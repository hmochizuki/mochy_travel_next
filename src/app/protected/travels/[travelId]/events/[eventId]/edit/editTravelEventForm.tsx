"use client";

import type { TravelEvent } from "@/types/travelEvent";

export default function EditTravelEventForm({ travelId, eventId, event }: { travelId: string, eventId: string, event: TravelEvent }) {
  return (
    <form
      // action={(e) => createTravelEventAction(e, travelId)}
      className="flex flex-col gap-4 max-w-md w-full"
    >
      <label>
        タイトル（必須）
        <input
          type="text"
          name="eventName"
          defaultValue={event.event_name}
          required
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        開始日
        <input
          type="date"
          name="startDate"
          defaultValue={event.start_date || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        開始時刻
        <input
          type="time"
          name="startTime"
          defaultValue={event.start_time || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        終了日
        <input
          type="date"
          name="endDate"
          defaultValue={event.end_date || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        終了時刻
        <input
          type="time"
          name="endTime"
          defaultValue={event.end_time || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        イベントタイプ
        <select
          name="eventType"
          defaultValue={event.event_type || undefined}
          className="border p-2 rounded w-full"
        >
          <option value="">選択してください</option>
          <option value="sightseeing">観光</option>
          <option value="entertainment">娯楽</option>
          <option value="experience">体験</option>
          <option value="food">食事</option>
          <option value="accommodation">宿泊</option>
          <option value="shopping">買い物</option>
          <option value="walking">徒歩</option>
          <option value="car">車</option>
          <option value="bus">バス</option>
          <option value="train">列車</option>
          <option value="shinkansen">新幹線</option>
          <option value="plane">飛行機</option>
          <option value="ship">船</option>
          <option value="motorcycle">バイク</option>
          <option value="bicycle">自転車</option>
        </select>
      </label>
      <label>
        場所
        <input
          type="text"
          name="location"
          defaultValue={event.location || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        メモ（説明）
        <textarea
          name="description"
          defaultValue={event.description || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        URL
        <input
          type="url"
          name="url"
          defaultValue={event.url || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        費用（円）
        <input
          type="number"
          name="cost"
          defaultValue={event.cost || undefined}
          className="border p-2 rounded w-full"
        />
      </label>
      {/* TODO: フローティングボタンにする */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        イベントを更新
      </button>
    </form>
  );
}
