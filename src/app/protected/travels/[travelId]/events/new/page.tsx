import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

type Params = {
  travelId: string;
};

export default async function NewTravelEventPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { travelId } = params;

  const { data: travelEvents, error } = await supabase
    .from("travel_events")
    .select("*")
    .eq("travel_id", travelId);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {travelEvents && travelEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ここに travelEvents を表示するコードを追加 */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">イベントがありません。<br/>新しいイベントを作成してください。</p>
          <Button asChild size="sm" variant={"default"}>
            <a href="/protected/travels/new">イベント作成</a>
          </Button>
        </div>
      )}
    </div>
  );
}
