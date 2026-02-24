import Image from "next/image";

import Link from "next/link";

export default function RootPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4">Página de inicio</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/home" className="text-blue-600 hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/persona" className="text-blue-600 hover:underline">
              Registrar persona
            </Link>
          </li>
          <li>
            <Link href="/users" className="text-blue-600 hover:underline">
              Mantenimiento usuarios
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
