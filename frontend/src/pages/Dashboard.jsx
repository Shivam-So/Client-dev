import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await API.get("/dashboard", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setData(res.data.message);
            } catch {
                alert("Unauthorized");
                navigate("/");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded shadow">
                <h2 className="text-xl mb-2">Dashboard</h2>
                <p>{data}</p>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}