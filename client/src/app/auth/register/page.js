"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const router = useRouter();

	const onSubmit = async (data) => {
		if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden.");
			return;
		}
		try {
			const response = await fetch("http://localhost:5000/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
			alert("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
			console.log("Registro exitoso:", result);
			router.push("/auth/login");
		} catch (error) {
			console.error("Error al registrarse:", error.response.data);
			alert("Ocurrió un error al intentar registrar al usuario.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
			<h2 className="text-xl font-bold mb-4">Registrarse</h2>
			<input
				type="text"
				placeholder="Nombre completo"
				className="w-full p-2 mb-4 border rounded"
				{...register("name", { required: "Nombre requerido" })}
			/>
      {errors.name && <span>{errors.name.message}</span>}
			<input
				type="email"
				placeholder="Correo electrónico"
				className="w-full p-2 mb-4 border rounded"
				{...register("email", { required: "Correo requerido" })}
			/>
      {errors.email && <span>{errors.email.message}</span>}
			<input
				type="password"
				placeholder="Contraseña"
				className="w-full p-2 mb-4 border rounded"
				{...register("password", { required: "Contraseña requerida" })}
			/>
      {errors.password && <span>{errors.password.message}</span>}
			<input
        type="password"
        placeholder="Confirmar contraseña"
        className="w-full p-2 mb-4 border rounded"
        required
        {...register("confirmPassword")}
      />
			<button
				type="submit"
				className="bg-blue-500 text-white py-2 px-4 rounded">
				Registrarse
			</button>
		</form>
	);
}
