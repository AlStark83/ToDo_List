"use client";

import { useForm, useFieldArray } from "react-hook-form";
import axiosClient from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm({
    defaultValues: { title: "", description: "", subtasks: [] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "subtasks" });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/tasks", data);
      router.push("/tasks"); // Redirige al listado de tareas
    } catch (error) {
      console.error("Error al crear la tarea:", error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nueva Tarea</h1>
      <input
        {...register("title", { required: true })}
        type="text"
        placeholder="Título de la tarea"
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        {...register("description")}
        placeholder="Descripción"
        className="w-full p-2 mb-4 border rounded"
      ></textarea>

      <h2 className="font-bold">Subtareas</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2">
          <input
            {...register(`subtasks.${index}.title`, { required: true })}
            type="text"
            placeholder="Título de la subtarea"
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ title: "" })}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        + Agregar Subtarea
      </button>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Crear Tarea
      </button>
    </form>
  );
}
