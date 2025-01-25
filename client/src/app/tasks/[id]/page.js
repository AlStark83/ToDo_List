"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosClient from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function TaskDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: task, isLoading, error } = useQuery(["task", id], async () => {
    const response = await axiosClient.get(`/tasks/${id}`);
    return response.data;
  });

  const deleteTask = useMutation(
    async () => {
      await axiosClient.delete(`/tasks/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        router.push("/tasks");
      },
    }
  );

  if (isLoading) return <p>Cargando tarea...</p>;
  if (error) return <p>Error al cargar la tarea: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
      <h2 className="font-bold mt-4">Subtareas</h2>
      <ul>
        {task.subtasks.map((subtask) => (
          <li key={subtask.id} className="border p-2 rounded mb-2">
            {subtask.title} - {subtask.completed ? "Completada" : "Pendiente"}
          </li>
        ))}
      </ul>
      <button
        onClick={() => deleteTask.mutate()}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Eliminar Tarea
      </button>
    </div>
  );
}
