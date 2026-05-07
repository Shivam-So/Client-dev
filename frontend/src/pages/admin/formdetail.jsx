import { useLocation, useNavigate } from "react-router-dom";

export default function FormDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const f = state?.form;

    return (
        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 bg-gray-200 px-4 py-2 rounded-lg"
            >
                ← Back
            </button>

            <h1 className="text-3xl font-bold mb-6">Form Details</h1>

            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
                <div>
                    <p className="text-gray-500 text-sm">Name</p>
                    <p className="font-semibold">{f?.userId?.name || "N/A"}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-semibold">{f?.userId?.email || "N/A"}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Q1</p>
                    <p className="font-semibold">{f?.q1 || "N/A"}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Q2</p>
                    <p className="font-semibold">{f?.q2?.join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Q3</p>
                    <p className="font-semibold">{f?.q3 || "N/A"}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Submitted At</p>
                    <p className="font-semibold">
                        {f?.createdAt ? new Date(f.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}