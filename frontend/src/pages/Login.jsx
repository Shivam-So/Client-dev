import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            const role = res.data.user.role;

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", role);

            if (role === "admin") {
                toast.success("Welcome Admin!");
                navigate("/admin/dashboard");
                return;
            }

            if (role === "employee") {
                toast.success("Welcome!");
                navigate("/dashboard");
                return;
            }

            // normal user
            toast.success("Login successful!");
            navigate("/success");
        }
        catch (err) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">

            <div className="bg-white p-8 rounded-2xl shadow-md w-96">

                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-black rounded-full"></div>
                </div>

                <h2 className="text-2xl font-bold text-center">
                    Log in to your account
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Welcome back! Please enter your details.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-lg bg-gray-100"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-lg bg-gray-100"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg">
                        Sign in
                    </button>

                </form>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    );
}