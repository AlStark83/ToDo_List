"use client";

import { useQuery } from "react-query";
import axiosClient from "@/lib/axios";
import Link from "next/link";

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useQuery("tasks", async () => {
    const response = await axiosClient.get("/tasks");
    return response.data;
  });

  if (isLoading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error al cargar las tareas: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tus Tareas</h1>
      <Link
        href="/tasks/new"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Nueva Tarea
      </Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-4 rounded mb-2">
            <Link href={`/tasks/${task.id}`} className="font-bold">
              {task.title}
            </Link>
            <p>{task.description}</p>
            <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
