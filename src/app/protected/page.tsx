import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CreateTravelDialog } from "./createTravelDialog";

export default async function ProtectedPage() {
	const supabase = await createClient();
	const { data: travels } = await supabase.from("travels").select();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<CreateTravelDialog />
			{travels?.map((travel) => (
				<div key={travel.id}>{travel.travel_name}</div>
			))}
		</div>
	);
}
