import TravelForm from "./NewTravelForm";

export default async function NewTravelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">新しい旅行プランを作成</h1>
      <TravelForm/>
    </div>
  );
}
