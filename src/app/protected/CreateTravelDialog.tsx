"use client";

import { Dialog } from "@/components/feedback/dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/iconButton";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const CreateTravelDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="fixed bottom-4 right-4 z-50">
				<IconButton onClick={() => {setIsOpen(true)}}>
					<PlusIcon />
				</IconButton>
			</div>
		<Dialog isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
			<div className="flex flex-col">
				<h1 className="mb-4">新しい旅行プランを作成しますか？</h1>
				<Button className="self-end">作成</Button>
			</div>
		</Dialog>
		</>
	);
}