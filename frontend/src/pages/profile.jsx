import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import loginLogo from "../assets/app-logo.png";

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
                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`
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

        <div
            className="
            min-h-screen
            flex justify-center items-center
            px-4
            "
            style={{
                background:
                    "linear-gradient(to bottom right, #0f1117, #111827)"
            }}
        >

            {/* Profile Card */}
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
                        alt="Profile Logo"

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
                    text-3xl font-bold text-center mb-2
                    "
                    style={{ color: "#fff" }}
                >
                    Complete Profile
                </h2>

                <p
                    className="
                    text-sm text-center mb-8
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Fill your profile details
                </p>

                {/* Inputs */}
                <div className="space-y-5">

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

                            placeholder="Enter your contact"

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

                </div>

                {/* Button */}
                <button
                    onClick={handleSubmit}

                    className="
                    w-full mt-6 py-3 rounded-xl
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
                    Save Profile
                </button>

            </div>

        </div>
    );
}
