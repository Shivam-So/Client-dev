
import axios from "axios";

const server = import.meta.env.VITE_ENV
const API = axios.create({ baseURL: import.meta.env[`VITE_${server}_BACKEND_URL`] });

let pendingRequests = 0;
let hideTimer;

const showLoader = () => {
    clearTimeout(hideTimer);
    document.body.classList.add("app-loading");
};

const hideLoader = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
        if (pendingRequests === 0) {
            document.body.classList.remove("app-loading");
        }
    }, 250);
};

const finishRequest = (value, isError = false) => {
    pendingRequests = Math.max(0, pendingRequests - 1);

    if (pendingRequests === 0) {
        hideLoader();
    }

    if (isError) {
        return Promise.reject(value);
    }

    return value;
};

API.interceptors.request.use((config) => {
    pendingRequests += 1;
    showLoader();

    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => finishRequest(error, true));

API.interceptors.response.use((response) => {
    return finishRequest(response);
}, (error) => {
    return finishRequest(error, true);
});

export default API;
