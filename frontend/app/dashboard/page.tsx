'use client';

import { useEffect, useState } from "react";
import * as authService from "../../services/auth";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    authService.getDashboard().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>
      {stats ? (
        <ul className="space-y-1">
          <li>Total: {stats.total}</li>
          <li>Activos: {stats.activos}</li>
          <li>Bloqueados: {stats.bloqueados}</li>
          <li>Intentos fallidos: {stats.intentosFallidos}</li>
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
