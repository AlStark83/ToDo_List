"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const router = useRouter();

	const onSubmit = async (data) => {
		try {
			const response = await fetch("http://localhost:5000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); 
      }
      const result = await response.json();
			localStorage.setItem("token", result.token);
			alert(`Es bueno tenerte de vuelta. Iniciando sesión...`);
			router.push("/tasks");
			console.log("Login exitoso:", result);
		} catch (error) {
			console.error("Error al iniciar sesión:", error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
			<h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
			<input
				type="email"
				placeholder="Correo electrónico"
				className="w-full p-2 mb-4 border rounded"
				{...register("email", { required: "El correo es obligatorio" })}
			/>
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}

			<input
				type="password"
				placeholder="Contraseña"
				className="w-full p-2 mb-4 border rounded"
				{...register("password", { required: "La contraseña es obligatoria" })}
      />
      {errors.password && <span className="text-red-500">{errors.password.message}</span>}
		
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded">
				Iniciar sesión
			</button>
		</form>
	);
}
