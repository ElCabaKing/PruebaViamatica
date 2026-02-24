'use client';

import { useState } from "react";
import { usePersona } from "./usePersona";

export default function PersonaPage() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const { status, register } = usePersona();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ nombre, apellidos, identificacion, fechaNacimiento });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Registrar Persona</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="w-full p-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Apellidos"
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Identificación"
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
          Registrar
        </button>
      </form>
      <div className="mt-2">{status}</div>
    </div>
  );
}
