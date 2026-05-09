import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

import loginLogo from "../assets/295128.png";

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

            toast.success("Form submitted successfully!");

            navigate("/success");

        } catch (err) {

            console.log(err);

            toast.error("Error submitting form");
        }
    };

    return (

        <div
            className="
            min-h-screen
            flex justify-center items-center
            px-4 py-10
            "
            style={{
                background:
                    "linear-gradient(to bottom right, #0f1117, #111827)"
            }}
        >

            {/* Form Card */}
            <div
                className="
                w-full max-w-2xl
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
                        alt="Form Logo"

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
                    Developer Form
                </h2>

                <p
                    className="
                    text-sm text-center mb-8
                    "
                    style={{ color: "#9ca3af" }}
                >
                    Please fill all required details
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* Question 1 */}
                    <div>

                        <p
                            className="
                            text-base font-semibold mb-3
                            "
                            style={{ color: "#fff" }}
                        >
                            1. What is your favorite skill?
                        </p>

                        <input
                            type="text"

                            value={form.q1}

                            placeholder="Enter your skill"

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    q1: e.target.value
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

                    {/* Question 2 */}
                    <div>

                        <p
                            className="
                            text-base font-semibold mb-3
                            "
                            style={{ color: "#fff" }}
                        >
                            2. Select your technologies
                        </p>

                        <div className="space-y-3">

                            {["React", "Node", "MongoDB"].map((item) => (

                                <label
                                    key={item}

                                    className="
                                    flex items-center gap-3
                                    cursor-pointer
                                    transition-all duration-300
                                    hover:translate-x-1
                                    "
                                    style={{ color: "#d1d5db" }}
                                >

                                    <input
                                        type="checkbox"

                                        checked={form.q2.includes(item)}

                                        onChange={() =>
                                            handleCheckbox(item)
                                        }

                                        className="
                                        w-4 h-4 cursor-pointer
                                        "
                                    />

                                    {item}

                                </label>

                            ))}

                        </div>

                    </div>

                    {/* Question 3 */}
                    <div>

                        <p
                            className="
                            text-base font-semibold mb-3
                            "
                            style={{ color: "#fff" }}
                        >
                            3. Experience Level
                        </p>

                        <div className="space-y-3">

                            {["Beginner", "Intermediate"].map((item) => (

                                <label
                                    key={item}

                                    className="
                                    flex items-center gap-3
                                    cursor-pointer
                                    transition-all duration-300
                                    hover:translate-x-1
                                    "
                                    style={{ color: "#d1d5db" }}
                                >

                                    <input
                                        type="radio"

                                        name="exp"

                                        checked={form.q3 === item}

                                        onChange={() =>
                                            setForm({
                                                ...form,
                                                q3: item
                                            })
                                        }

                                        className="
                                        w-4 h-4 cursor-pointer
                                        "
                                    />

                                    {item}

                                </label>

                            ))}

                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">

                        {/* Submit */}
                        <button
                            type="submit"

                            className="
                            flex-1 py-3 rounded-xl
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
                            Submit
                        </button>

                        {/* Reset */}
                        <button
                            type="reset"

                            onClick={() =>
                                setForm({
                                    q1: "",
                                    q2: [],
                                    q3: ""
                                })
                            }

                            className="
                            flex-1 py-3 rounded-xl
                            font-semibold text-white
                            transition-all duration-300
                            hover:scale-[1.02]
                            hover:shadow-2xl
                            cursor-pointer
                            "

                            style={{
                                background: "#1e2433"
                            }}
                        >
                            Reset
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}