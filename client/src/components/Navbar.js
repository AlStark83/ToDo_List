"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/AuthProvider";



export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow p-4 mb-4 flex justify-between items-center ">
      <div >
        <Link onClick={handleLogout} href="/" className="font-bold mr-4">
          Inicio
        </Link>
        <Link href="/tasks" className="mr-4">
          Tareas
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
        null
        )}
      </div>
    </nav>
  );
}
