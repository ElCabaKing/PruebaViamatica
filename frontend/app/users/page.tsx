'use client';

import { useState } from "react";
import { useUsers } from "./useUsers";

export default function UsersPage() {
  const { filters, setFilters, results, search, upload, changeStatus, statusMsg } = useUsers();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (file) upload(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mantenimiento de Usuarios</h1>
      <div className="mb-4">
        <input
          className="border p-1 mr-2"
          placeholder="username"
          value={filters.username}
          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="mail"
          value={filters.mail}
          onChange={(e) => setFilters({ ...filters, mail: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="status"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
        <button className="px-3 py-1 bg-blue-600 text-white" onClick={search}>Buscar</button>
      </div>
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Username</th>
            <th className="border px-2">Mail</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {results.map((u) => (
            <tr key={u.id_usuario}>
              <td className="border px-2">{u.id_usuario}</td>
              <td className="border px-2">{u.username}</td>
              <td className="border px-2">{u.mail}</td>
              <td className="border px-2">{u.status}</td>
              <td className="border px-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white mr-1"
                  onClick={() => changeStatus(u.id_usuario, u.status === 'AC' ? 'BL' : 'AC')}
                >
                  {u.status === 'AC' ? 'Bloquear' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-4">
        <p className="text-sm mb-1">CSV: nombre,apellidos,identificacion,fechaNacimiento por línea</p>
        <input type="file" accept=".csv" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
        <button className="px-3 py-1 bg-blue-600 text-white ml-2" onClick={handleUpload}>
          Cargar CSV
        </button>
        <div>{statusMsg}</div>
      </div>
    </div>
  );
}
