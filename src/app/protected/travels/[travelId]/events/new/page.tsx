import NewTravelEventForm from "./NewTravelEventForm";

type Params = Promise<{
  travelId: string;
}>;

export default async function NewTravelEventPage({ params }: { params: Params }) {
  const {travelId} = await params;
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <NewTravelEventForm travelId={travelId} />
    </div>
  );
}
