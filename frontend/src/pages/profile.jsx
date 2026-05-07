import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {


    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: ""
    });

    const handleSubmit = async () => {
        try {
            await API.post("/profile", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            toast.success("Profile saved successfully!");
            navigate("/form");

        } catch (err) {
            console.log(err);
            toast.error("Error saving profile ❌");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                <div className="space-y-4">

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Name"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Contact"
                        onChange={(e) =>
                            setForm({ ...form, contact: e.target.value })
                        }
                    />

                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white my-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                    Submit
                </button>

            </div>
        </div>
    );
}