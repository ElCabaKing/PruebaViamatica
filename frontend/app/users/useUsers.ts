'use client';

import { useState } from "react";
import axios from "axios";

export function useUsers() {
  const [filters, setFilters] = useState({ username: "", mail: "", status: "" });
  const [results, setResults] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState("");

  const search = async () => {
    const params: any = {};
    if (filters.username) params.username = filters.username;
    if (filters.mail) params.mail = filters.mail;
    if (filters.status) params.status = filters.status;
    const resp = await axios.get(`/api/users/search`, { params });
    setResults(resp.data);
  };

  const upload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    try {
      await axios.post("/api/users/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatusMsg("Carga completada");
    } catch (e: any) {
      setStatusMsg(`Error: ${e.response?.data?.error || e.message}`);
    }
  };

  const changeStatus = async (id: number, newStatus: string) => {
    await axios.patch(`/api/users/${id}/status`, { status: newStatus });
    search();
  };

  return { filters, setFilters, results, search, upload, changeStatus, statusMsg };
}
