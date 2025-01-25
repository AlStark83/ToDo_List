"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<head>
				<title>To-Do List App</title>
        <description>description: "App de tareas con autenticación y subtareas"</description>
			</head>
			<body className="bg-gray-100 text-gray-900 font-sans">
				<QueryClientProvider client={queryClient}>
					<Navbar></Navbar>
					<div>{children}</div>
				</QueryClientProvider>
			</body>
		</html>
	);
}
