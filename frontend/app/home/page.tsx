'use client';

import { useState } from "react";
import { useHome } from "./useHome";

export default function HomePage() {
  const [criteria, setCriteria] = useState("");
  const [password, setPassword] = useState("");
  const { status, token, login } = useHome();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(criteria, password);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder="usuario/email/ID"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="contraseña"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <div>{status}</div>
      {token && <div>Token: {token}</div>}
    </div>
  );
}
