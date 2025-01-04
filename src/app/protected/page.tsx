import { IconButton } from "@/components/ui/iconButton";
import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";

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
			<div className="fixed bottom-4 right-4 z-50">
				<IconButton>
					<PlusIcon />
				</IconButton>
			</div>
		</div>
	);
}
