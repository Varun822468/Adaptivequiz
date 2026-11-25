import axios from "axios";

// Backend URL:
//  - production (Vercel): set VITE_API_URL to your deployed backend URL
//  - local dev: falls back to http://localhost:3000
const baseURL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3000" : "")
).replace(/\/$/, "");

const api = axios.create({ baseURL });

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
