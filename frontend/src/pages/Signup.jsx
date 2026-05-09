import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import loginLogo from "../assets/295128.png";

export default function Signup() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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

            const msg =
                err.response?.data?.message ||
                "Signup failed";

            toast.error(msg);
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

            {/* Signup Card */}
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
                        alt="Signup Logo"

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
                    Create Account
                </h2>

                <p
                    className="
                    text-sm text-center mb-8
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Signup to access your dashboard
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>

                        <label
                            className="
                            text-sm font-medium mb-2 block
                            "
                            style={{ color: "#d1d5db" }}
                        >
                            Name
                        </label>

                        <input
                            type="text"

                            placeholder="Enter your name"

                            value={form.name}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }

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

                            placeholder="Enter your email"

                            value={form.email}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }

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

                    {/* Contact */}
                    <div>

                        <label
                            className="
                            text-sm font-medium mb-2 block
                            "
                            style={{ color: "#d1d5db" }}
                        >
                            Contact
                        </label>

                        <input
                            type="text"

                            placeholder="Enter contact number"

                            value={form.contact}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    contact: e.target.value
                                })
                            }

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

                                placeholder="Enter your password"

                                value={form.password}

                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value
                                    })
                                }

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

                    {/* Submit Button */}
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
                        Create Account
                    </button>

                </form>

                {/* Login Link */}
                <p
                    className="
                    text-center text-sm mt-6
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Already have an account?{" "}

                    <Link
                        to="/"

                        className="
                        font-semibold
                        transition-all duration-300
                        hover:underline
                        "

                        style={{
                            color: "#60a5fa"
                        }}
                    >
                        Log In
                    </Link>
                </p>

            </div>

        </div>
    );
}