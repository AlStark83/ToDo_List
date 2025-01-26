"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosClient from "@/lib/axiosClient";
import BackToTasksButton from "@/components/BackToTasksButton";
import { useForm } from "react-hook-form";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = params;

  const { register, handleSubmit, reset } = useForm();

  const { data: task, isLoading, error } = useQuery(["task", id], async () => {
    const response = await axiosClient.get(`/tasks/${id}`);
    return response.data;
  });

  const updateTaskMutation = useMutation(
    async (updatedTask) => {
      const response = await axiosClient.patch(`/tasks/${id}`, updatedTask);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["task", id]);
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const deleteTaskMutation = useMutation(
    async () => {
      await axiosClient.delete(`/tasks/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        alert("Tarea eliminada");
        router.push("/tasks");
      },
      onError: (err) => {
        alert(err.response?.data?.message || "No se pudo eliminar la tarea");
      },
    }
  );

  function toggleTaskCompleted() {
    if (!task) return;
    updateTaskMutation.mutate({ ...task, completed: !task.completed });
  }

  function toggleSubtaskCompleted(subId) {
    if (!task) return;
    const updatedSubtasks = task.subtasks.map((sub) =>
      sub._id === subId ? { ...sub, completed: !sub.completed } : sub
    );
    updateTaskMutation.mutate({ ...task, subtasks: updatedSubtasks });
  }

  function deleteSubtask(subId) {
    if (!task) return;
    const updatedSubtasks = task.subtasks.filter((sub) => sub._id !== subId);
    updateTaskMutation.mutate({ ...task, subtasks: updatedSubtasks });
  }

  function handleDeleteTask() {
    deleteTaskMutation.mutate();
  }

  const onSubmit = (data) => {
    if (!task) return;

    const newSubtask = {
      title: data.subtaskTitle,
      completed: false,
    };

    const updatedSubtasks = [...task.subtasks, newSubtask];
    updateTaskMutation.mutate({ ...task, subtasks: updatedSubtasks });

    reset();
  };

  if (isLoading) return <p>Cargando tarea...</p>;
  if (error) return <p>Error al cargar la tarea</p>;
  if (!task) return null;

  return (
    <div>
      <BackToTasksButton />
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

      <label className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleTaskCompleted}
        />
        <span>{task.completed ? "Completada" : "Pendiente"}</span>
      </label>

      <p className="mb-4">{task.description}</p>

      <h3 className="font-bold mt-4">Subtareas</h3>
      <ul>
        {task.subtasks?.map((sub) => (
          <li key={sub._id} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={sub.completed}
              onChange={() => toggleSubtaskCompleted(sub._id)}
            />
            <span className={sub.completed ? "line-through" : ""}>
              {sub.title}
            </span>
            <button
              onClick={() => deleteSubtask(sub._id)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <h4 className="font-bold mb-2">Agregar Subtarea</h4>
        <input
          {...register("subtaskTitle", { required: true })}
          placeholder="Título de la subtarea"
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleDeleteTask}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Eliminar Tarea
        </button>
      </div>
    </div>
  );
}
