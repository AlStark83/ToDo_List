"use client";

import { useForm } from "react-hook-form";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

      {/* Nombre */}
      <label className="block mb-2 font-semibold">Nombre</label>
      <input
        {...register("name", {
          required: "El nombre es obligatorio",
          minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
          },
          maxLength: {
            value: 30,
            message: "El nombre no puede superar los 30 caracteres",
          },
          pattern: {
            value: /^[A-Za-zÁ-ú\s]+$/,
            message: "El nombre solo puede contener letras y espacios",
          },
        })}
        placeholder="Nombre completo"
        className="block w-full border p-2 mb-2 rounded"
      />
      {errors.name && (
        <span className="text-red-500 text-sm">{errors.name.message}</span>
      )}

      {/* Correo electrónico */}
      <label className="block mt-4 mb-2 font-semibold">Correo electrónico</label>
      <input
        {...register("email", {
          required: "El correo es obligatorio",
          pattern: {
            // Este regex es un ejemplo básico para emails
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Ingresa un correo electrónico válido",
          },
        })}
        placeholder="Correo electrónico"
        type="email"
        className="block w-full border p-2 mb-2 rounded"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}

      {/* Contraseña */}
      <label className="block mt-4 mb-2 font-semibold">Contraseña</label>
      <input
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres",
          },
        })}
        placeholder="Contraseña"
        type="password"
        className="block w-full border p-2 mb-2 rounded"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Registrarse
      </button>
    </form>
  );
}
