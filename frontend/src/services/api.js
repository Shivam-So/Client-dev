
import axios from "axios";

const server = import.meta.env.VITE_ENV
const API = axios.create({ baseURL: import.meta.env[`VITE_${server}_BACKEND_URL`] });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;