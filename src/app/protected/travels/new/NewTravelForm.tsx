"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { createTravelAction } from "./actions";
import { SubmitButton } from "@/components/submit-button";

export default function TravelForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full max-w-md">
      <form action={createTravelAction} method="POST">
        <Input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          type="text"
          placeholder="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />
        <SubmitButton
          pendingText="Creating travel plan..."
        >
          旅行プランを作成
        </SubmitButton>
      </form>
    </div>
  );
}