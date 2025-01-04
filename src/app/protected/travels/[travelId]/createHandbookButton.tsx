"use client";

import { IconButton } from "@/components/ui/iconButton";
import { Notebook } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function CreateHandbookButton() {
  const { travelId } = useParams();

  return (
    <IconButton onClick={() => {}}>
      <Notebook />
    </IconButton>
  );
}
