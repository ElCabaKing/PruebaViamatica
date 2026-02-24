import { useState } from "react";
import * as authService from "../../services/auth";

export function useHome() {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const login = async (criteria: string | number, password: string) => {
    setStatus("Enviando...");
    try {
      const result = await authService.login(criteria, password);
      setToken(result.token);
      setStatus("Login exitoso");
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return { status, token, login };
}
