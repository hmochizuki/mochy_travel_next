"use client";

import { useRouter } from "next/navigation";

type Props = {
  travelId: string;
  travelName: string;
  createdBy: string;
}

export default function TravelCard({ travelId, travelName, createdBy }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/protected/travels/${travelId}`);
  };

  return (
    <button onClick={handleClick} type="button" className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
      <h2 className="text-xl font-bold mb-2">{travelName}</h2>
      <p className="text-gray-600">作成者: {createdBy}</p>
    </button>
  );
}
