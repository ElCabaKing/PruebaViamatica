'use client';

import { useEffect, useState } from "react";
import * as authService from "../../services/auth";

export default function WelcomePage() {
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [menu, setMenu] = useState<string[]>([]);

  useEffect(() => {
    // read from sessionStorage only on the client
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    setUser(storedUser);
    const storedMenu = JSON.parse(sessionStorage.getItem("menu") || "[]");
    setMenu(storedMenu);
    if (storedUser) {
      authService.getWelcome(storedUser.id_usuario).then(setData).catch(console.error);
    }
  }, []);

  if (!user) {
    return <div className="p-4">Debe iniciar sesión</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Bienvenido, {user.username}</h1>
      {data?.lastSession && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="bg-black">Última sesión: {data.lastSession.fecha_ingreso}</p>
          <p className="bg-black">Fecha cierre: {data.lastSession.fecha_cierre || 'activa'}</p>
        </div>
      )}
      {menu.includes("Dashboard") && (
        <a
          href="/dashboard"
          className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded"
        >
          Ir al dashboard
        </a>
      )}
    </div>
  );
}
