import Link from "next/link";

export default function Home() {
	return (
		<div >
			<h1 className="text-2xl font-bold">Bienvenido a la To-Do List App</h1>
			<p className="mt-2 pb-4">
				Por favor, inicia sesión o regístrate para continuar.
			</p>
			<Link href="/auth/register" className="bg-blue-500 text-white mx-2 px-4 py-2 rounded w-full">
				Registrase
			</Link>
      <Link href="/auth/login" className="bg-blue-500 text-white mx-2 px-4 py-2 rounded w-full">
				Login
			</Link>
		</div>
	);
}
