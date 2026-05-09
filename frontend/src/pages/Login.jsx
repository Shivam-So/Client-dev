import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import loginLogo from "../assets/app-logo.png";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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

            toast.success("Login successful!");

            navigate("/success");

        } catch (err) {

            toast.error("Invalid credentials");
        }
    };

    return (

        <div
            className="
            min-h-screen
            flex items-center justify-center
            px-4
            "
            style={{
                background:
                    "linear-gradient(to bottom right, #0f1117, #111827)"
            }}
        >

            {/* Login Card */}
            <div
                className="
                w-full max-w-md
                p-8 rounded-2xl
                shadow-2xl
                transition-all duration-300
                hover:scale-[1.01]
                "
                style={{
                    background: "#151921",
                    border: "1px solid #1e2433"
                }}
            >

                {/* Logo */}
                <div className="flex justify-center mb-5">

                    <img
                        src={loginLogo}
                        alt="Login Logo"

                        className="
                        w-24 h-24 object-contain
                        transition-all duration-300
                        hover:scale-110
                        hover:rotate-3
                        "
                    />

                </div>

                {/* Heading */}
                <h2
                    className="
                    text-3xl font-bold
                    text-center mb-2
                    "
                    style={{ color: "#fff" }}
                >
                    Welcome Back
                </h2>

                <p
                    className="
                    text-sm text-center mb-8
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Login to your dashboard
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>

                        <label
                            className="
                            text-sm font-medium mb-2 block
                            "
                            style={{ color: "#d1d5db" }}
                        >
                            Email
                        </label>

                        <input
                            type="email"

                            value={form.email}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }

                            placeholder="Enter your email"

                            className="
                            w-full px-4 py-3 rounded-xl
                            outline-none
                            transition-all duration-300
                            focus:scale-[1.01]
                            "

                            style={{
                                background: "#0f1117",
                                border: "1px solid #1e2433",
                                color: "#fff"
                            }}
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label
                            className="
                            text-sm font-medium mb-2 block
                            "
                            style={{ color: "#d1d5db" }}
                        >
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                value={form.password}

                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }

                                placeholder="Enter your password"

                                className="
                                w-full px-4 py-3 rounded-xl
                                outline-none pr-12
                                transition-all duration-300
                                focus:scale-[1.01]
                                "

                                style={{
                                    background: "#0f1117",
                                    border: "1px solid #1e2433",
                                    color: "#fff"
                                }}
                            />

                            {/* Eye Button */}
                            <button
                                type="button"

                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }

                                className="
                                absolute right-4 top-1/2
                                -translate-y-1/2
                                transition-all duration-300
                                hover:scale-110
                                cursor-pointer
                                "

                                style={{
                                    color: "#9ca3af"
                                }}
                            >

                                {showPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }

                            </button>

                        </div>

                    </div>

                    {/* Button */}
                    <button
                        type="submit"

                        className="
                        w-full py-3 rounded-xl
                        font-semibold text-white
                        transition-all duration-300
                        hover:scale-[1.02]
                        hover:shadow-2xl
                        cursor-pointer
                        "

                        style={{
                            background:
                                "linear-gradient(135deg,#3b82f6,#2563eb)"
                        }}
                    >
                        Sign In
                    </button>

                </form>

                {/* Signup */}
                <p
                    className="
                    text-center text-sm mt-6
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Don&apos;t have an account?{" "}

                    <Link
                        to="/signup"

                        className="
                        font-semibold
                        transition-all duration-300
                        hover:underline
                        "

                        style={{
                            color: "#60a5fa"
                        }}
                    >
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    );
}
