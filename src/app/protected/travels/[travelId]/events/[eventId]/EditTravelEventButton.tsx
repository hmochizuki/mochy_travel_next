"use client";

import { IconButton } from "@/components/ui/iconButton";
import { Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function EditTravelEventButton() {
  const router = useRouter();
  const { travelId, eventId } = useParams();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <IconButton onClick={() => { router.push(`/protected/travels/${travelId}/events/${eventId}/edit`); }}>
        <Edit />
      </IconButton>
    </div>
  );
}
