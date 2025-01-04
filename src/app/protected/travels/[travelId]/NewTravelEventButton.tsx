"use client";

import { IconButton } from "@/components/ui/iconButton";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function NewTravelEventButton() {
  const router = useRouter();
  const { travelId } = useParams();

  return (
    <IconButton onClick={() => { router.push(`/protected/travels/${travelId}/events/new`); }}>
      <PlusIcon />
    </IconButton>
  );
}
