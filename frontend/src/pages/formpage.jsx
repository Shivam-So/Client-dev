import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function FormPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        q1: "",
        q2: [],
        q3: ""
    });

    const handleCheckbox = (value) => {
        setForm((prev) => ({
            ...prev,
            q2: prev.q2.includes(value)
                ? prev.q2.filter((v) => v !== value)
                : [...prev.q2, value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.q1 || form.q2.length === 0 || !form.q3) {
            toast.error("Please answer all questions");
            return;
        }

        try {
            await API.post("/form", form);

            localStorage.removeItem("token");
            toast.success("Form submitted! Please login.");
            navigate("/success");

        } catch (err) {
            console.log(err);
            toast.error("Error submitting form");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-100">
                <h2 className="text-xl font-bold mb-6">Please fill out below form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="font-medium">1. What is your favorite skill?</p>
                        <input
                            className="w-full border p-2 rounded mt-2"
                            onChange={(e) => setForm({ ...form, q1: e.target.value })}
                        />
                    </div>
                    <div>
                        <p className="font-medium">2. Select your technologies</p>
                        {["React", "Node", "MongoDB"].map((item) => (
                            <label key={item} className="block">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckbox(item)}
                                /> {item}
                            </label>
                        ))}
                    </div>
                    <div>
                        <p className="font-medium">3. Experience Level</p>
                        {["Beginner", "Intermediate"].map((item) => (
                            <label key={item} className="block">
                                <input
                                    type="radio"
                                    name="exp"
                                    onChange={() => setForm({ ...form, q3: item })}
                                /> {item}
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-40 bg-black text-white my-4 py-2 rounded-lg hover:opacity-90 transition"
                        >
                            Submit
                        </button>
                        <button
                            type="reset"
                            className="w-40 bg-black text-white my-4 py-2 rounded-lg hover:opacity-90 transition"
                            onClick={() => setForm({ q1: "", q2: [], q3: "" })}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}