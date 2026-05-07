import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/signup", form);

            localStorage.setItem("token", res.data.token);

            toast.success("Signup successful!");
            navigate("/profile");

        } catch (err) {
            const msg = err.response?.data?.message || "Signup failed";
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="w-full p-2 border rounded-lg mt-1 bg-gray-100 focus:outline-none"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded-lg mt-1 bg-gray-100 focus:outline-none"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Contact</label>
                        <input
                            type="text"
                            placeholder="Enter Your Contact Number"
                            className="w-full p-2 border rounded-lg mt-1 bg-gray-100 focus:outline-none"
                            onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full p-2 border rounded-lg mt-1 bg-gray-100 focus:outline-none"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
                        Submit
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already Have an account?{" "}
                    <Link to="/" className="text-blue-500">Log In</Link>
                </p>
            </div>
        </div>
    );
}