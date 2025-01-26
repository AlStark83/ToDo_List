"use client";

import { useForm } from "react-hook-form";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/tasks", data);
      alert("Tarea creada correctamente");
      reset();
      router.push("/tasks");
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alert(error.response?.data?.message || "Error al crear tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
      <input
        {...register("title", { required: true })}
        placeholder="Título de la tarea"
        className="block w-full border p-2 mb-2"
      />
      <textarea
        {...register("description")}
        placeholder="Descripción"
        className="block w-full border p-2 mb-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </form>
  );
}
