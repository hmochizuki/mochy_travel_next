import { PlusIcon } from "lucide-react";
import { IconButton } from "../ui/iconButton";

export default function FetchDataSteps() {
	return (
		<ol className="flex flex-col gap-6">
			<div className="fixed bottom-4 right-4 z-50">
				<IconButton>
					<PlusIcon />
				</IconButton>
			</div>
		</ol>
	);
}
