import { useNavigate } from "react-router-dom";

export default function Success() {

    const navigate = useNavigate();

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

            {/* Success Card */}
            <div
                className="
                w-full max-w-md
                p-8 rounded-2xl
                shadow-2xl
                text-center
                transition-all duration-300
                hover:scale-[1.02]
                "
                style={{
                    background: "#151921",
                    border: "1px solid #1e2433"
                }}
            >

                {/* Success Icon */}
                <div
                    className="
                    w-20 h-20
                    mx-auto mb-6
                    flex items-center justify-center
                    rounded-full
                    text-4xl font-bold
                    "
                    style={{
                        background:
                            "linear-gradient(135deg,#3b82f6,#2563eb)",
                        color: "#fff"
                    }}
                >
                    ✓
                </div>

                {/* Heading */}
                <h2
                    className="
                    text-3xl font-bold mb-3
                    "
                    style={{ color: "#fff" }}
                >
                    Thank You!
                </h2>

                {/* Message */}
                <p
                    className="
                    text-sm mb-8
                    "
                    style={{ color: "#9ca3af" }}
                >
                    The form has been submitted successfully
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/")}

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
                    Go To Login
                </button>

            </div>

        </div>
    );
}