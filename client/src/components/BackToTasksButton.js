"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi"; 

export default function BackToTasksButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/tasks");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
    >
      <FiArrowLeft />
      <span>Volver a Tareas</span>
    </button>
  );
}
