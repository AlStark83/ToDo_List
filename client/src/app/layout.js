import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Task Manager",
  description: "App de tareas con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
