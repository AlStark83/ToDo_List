import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white p-4 shadow mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/auth/login">Iniciar sesión</Link>
        </li>
        <li>
          <Link href="/auth/register">Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
}
