import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export async function login(criteria: string | number, password: string) {
  const resp = await axios.post(`${API_URL}/login`, { criteria, password });
  return resp.data;
}

export async function logout(id: number) {
  await axios.post(`${API_URL}/logout`, { id });
}

export async function getSession(id: number) {
  const resp = await axios.get(`${API_URL}/session/${id}`);
  return resp.data;
}
