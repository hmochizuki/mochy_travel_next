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
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{travels?.map((travel) => (
					<div key={travel.id} className="bg-white shadow-md rounded-lg p-4">
						<h2 className="text-xl font-bold mb-2">{travel.travel_name}</h2>
						<p className="text-gray-600">Created by: {travel.created_by}</p>
					</div>
				))}
			</div>
		</div>
	);
}
