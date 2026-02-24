import { useState } from "react";
import * as personaService from "../../services/persona";

export function usePersona() {
  const [status, setStatus] = useState("");

  const register = async (data: {
    nombre: string;
    apellidos: string;
    identificacion: string;
    fechaNacimiento: string;
  }) => {
    setStatus("Enviando...");
    try {
      await personaService.registerPersona(data);
      setStatus("Persona registrada");
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return { status, register };
}
