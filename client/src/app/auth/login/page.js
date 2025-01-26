"use client";

import { useForm } from "react-hook-form";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/auth/login/", data);
      const { token } = response.data;

      localStorage.setItem("token", token);

      alert("Login exitoso");
      router.push("/tasks");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>

      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Correo electrónico"
        className="block w-full border p-2 mb-2"
      />
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Contraseña"
        className="block w-full border p-2 mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
