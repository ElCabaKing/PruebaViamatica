import axios from "axios";

export async function registerPersona(data: {
  nombre: string;
  apellidos: string;
  identificacion: string;
  fechaNacimiento: string;
}) {
  const resp = await axios.post("/api/personas", data);
  return resp.data;
}
