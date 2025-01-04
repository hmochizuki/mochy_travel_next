"use client";

import { createTravelAction } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default function TravelForm() {
  return (
    <div className="w-full max-w-md">
      <form action={createTravelAction}>
        <input
          type="text"
          name="travel_name"
          placeholder="タイトル"
          defaultValue=""
          className="mb-4 w-full px-3 py-2 border rounded"
        />
        <SubmitButton pendingText="Creating travel plan...">
          旅行プランを作成
        </SubmitButton>
      </form>
    </div>
  );
}
