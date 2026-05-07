import { useLocation, useNavigate } from "react-router-dom";

export default function FormDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const f = state?.form;

    const cardStyle = { background: "#151921", border: "1px solid #1e2433", borderRadius: 12 };

    return (
        <div>
            <button onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "#1e2433", color: "#9ca3af" }}>
                ← Back
            </button>

            <h1 className="text-xl md:text-2xl font-bold mb-6" style={{ color: "#fff" }}>Form Details</h1>

            <div className="p-5 md:p-6 max-w-lg space-y-4" style={cardStyle}>
                {[
                    { label: "Name", value: f?.userId?.name },
                    { label: "Email", value: f?.userId?.email },
                    { label: "Q1", value: f?.q1 },
                    { label: "Q2", value: f?.q2?.join(", ") },
                    { label: "Q3", value: f?.q3 },
                    { label: "Submitted At", value: f?.createdAt ? new Date(f.createdAt).toLocaleDateString() : null },
                ].map(({ label, value }) => (
                    <div key={label} style={{ borderBottom: "1px solid #1e2433", paddingBottom: 12 }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: "#4b5563" }}>{label}</p>
                        <p className="text-sm font-medium" style={{ color: "#fff" }}>{value || "N/A"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
