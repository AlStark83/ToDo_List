"use client";

import {jwtDecode} from "jwt-decode"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";

export default function TasksPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    data: tasks = [], 
    isLoading,
    error,
  } = useQuery("tasks", async () => {
    const response = await axiosClient.get("/tasks");
    return response.data;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No has iniciado sesión");
      setTimeout(() => {
        router.push("/auth/login");
      }, 5000);
    } else {
      try {
        const decoded = jwtDecode(token);
        const fullName = decoded.name;
        const firstName = fullName.split(" ")[0];
        setUserName(firstName);
      } catch (error) {
        console.log("Error al decodificar token:", error);
      }
    }
  }, [router]);

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (isLoading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error al cargar las tareas</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Hola {userName}, estas son tus tareas
      </h1>

      <Link
        href="/tasks/new"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Nueva Tarea
      </Link>

      <div className="mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-2 py-1 rounded mr-2 ${
            filter === "all" ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-2 py-1 rounded mr-2 ${
            filter === "completed" ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-2 py-1 rounded ${
            filter === "pending" ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          Pendientes
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id} className="border p-4 rounded mb-2">
            <Link href={`/tasks/${task._id}`} className="font-bold">
              {task.title}
            </Link>
            <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
