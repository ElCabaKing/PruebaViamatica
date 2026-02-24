'use client';

import { useEffect, useState } from "react";
import * as authService from "../../services/auth";

export default function WelcomePage() {
  const [data, setData] = useState<any>(null);
  const user = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("user") || "null") : null;

  useEffect(() => {
    if (user) {
      authService.getWelcome(user.id_usuario).then(setData).catch(console.error);
    }
  }, [user]);

  if (!user) {
    return <div className="p-4">Debe iniciar sesión</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Bienvenido, {user.username}</h1>
      {data?.lastSession && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>Última sesión: {data.lastSession.fecha_ingreso}</p>
          <p>Fecha cierre: {data.lastSession.fecha_cierre || 'activa'}</p>
        </div>
      )}
      {typeof window !== "undefined" &&
        JSON.parse(sessionStorage.getItem("menu") || "[]").includes("Dashboard") && (
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
