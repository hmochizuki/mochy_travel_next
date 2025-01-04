"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

export default function NewTravelPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreateTravel = async () => {
    const supabase = createClient();
    const supabaseClient = await createClient();
    const { data, error } = await supabaseClient
      .from("travels")
      .insert([{ title, description }]);

    if (error) {
      console.error("Error creating travel plan:", error);
    } else {
      router.push("/protected/travels");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">新しい旅行プランを作成</h1>
      <div className="w-full max-w-md">
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
        <Button onClick={handleCreateTravel} className="w-full">
          作成
        </Button>
      </div>
    </div>
  );
}
