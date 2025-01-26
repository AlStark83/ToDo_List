"use client";

import { useForm } from "react-hook-form";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/auth/register", data);
      alert("Registro exitoso. Ahora inicia sesión");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert(error.response?.data?.message || "Error en el registro");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Regístrate</h2>

      <input
        {...register("name", { required: true })}
        placeholder="Nombre"
        className="block w-full border p-2 mb-2"
      />
      <input
        {...register("email", { required: true })}
        placeholder="Correo electrónico"
        type="email"
        className="block w-full border p-2 mb-2"
      />
      <input
        {...register("password", { required: true })}
        placeholder="Contraseña"
        type="password"
        className="block w-full border p-2 mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Registrarse
      </button>
    </form>
  );
}
