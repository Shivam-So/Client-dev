import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

                <h2 className="text-xl font-bold mb-2">Thank You!</h2>
                <p className="mb-4">The form has been submitted successfully</p>

                <button
                    onClick={() => navigate("/")}
                    className="w-40 bg-black text-white my-4 py-2 rounded-lg hover:opacity-90 transition"
                >
                    OK
                </button>

            </div>
        </div>
    );
}