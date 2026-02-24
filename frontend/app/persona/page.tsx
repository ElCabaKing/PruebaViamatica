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
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Registrar Persona</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Apellidos"
          required
        />
        <input
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Identificación"
          required
        />
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <div>{status}</div>
    </div>
  );
}
