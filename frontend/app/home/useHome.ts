import { useState } from "react";
import { useRouter } from "next/navigation";
import * as authService from "../../services/auth";

export function useHome() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const login = async (criteria: string | number, password: string) => {
    setStatus("Enviando...");
    try {
      const result = await authService.login(criteria, password);
      setToken(result.token);
      // store user & token
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      const menu = await authService.getMenu(result.user.id_usuario);
      sessionStorage.setItem("menu", JSON.stringify(menu));
      setStatus("Login exitoso");
      router.push("/welcome");
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return { status, token, login };
}
