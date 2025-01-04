"use client";

import { Dialog } from "@/components/feedback/dialog";
import { IconButton } from "@/components/ui/iconButton";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function CreateTravelDialog() {
  const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="fixed bottom-4 right-4 z-50">
				<IconButton onClick={() => {setIsOpen(true)}}>
					<PlusIcon />
				</IconButton>
			</div>
		<Dialog isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
			<div>
				<h1>Feedback</h1>
			</div>
		</Dialog>
		</>
	);
}
