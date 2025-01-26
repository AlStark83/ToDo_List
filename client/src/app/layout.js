import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../hooks/AuthProvider";

export const metadata = {
	title: "Task Manager",
	description: "App de tareas con Next.js",
};

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body className="min-h-screen flex flex-col">
				<Providers>
					<AuthProvider>
						<Navbar />
						<main className="flex-1 container mx-auto p-4">{children}</main>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
