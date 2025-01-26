"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow p-4 mb-4 flex justify-between items-center">
      <div>
        <Link href="/" className="font-bold mr-4">
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
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
