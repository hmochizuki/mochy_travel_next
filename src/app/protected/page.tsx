import { IconButton } from "@/components/ui/iconButton";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { CreateTravelDialog } from "./CreateTravelDialog";

export default async function ProtectedPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<CreateTravelDialog />
		</div>
	);
}
