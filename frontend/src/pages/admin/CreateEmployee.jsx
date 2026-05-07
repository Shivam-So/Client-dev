import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CreateEmployee() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", contact: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/admin/create-employee", form);
            toast.success("Employee created & email sent! ✅");
            navigate("/admin/employees");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating employee");
        } finally { setLoading(false); }
    };

    const inputStyle = { background: "#0f1117", border: "1px solid #1e2433", color: "#fff", borderRadius: 8, padding: "10px 14px", width: "100%", fontSize: 14 };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#fff" }}>Create Employee</h1>
            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>Add a new employee to the system</p>

            <div className="p-6 max-w-md" style={{ background: "#151921", border: "1px solid #1e2433", borderRadius: 12 }}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>NAME</label>
                        <input placeholder="Full name" style={inputStyle}
                            onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>EMAIL</label>
                        <input placeholder="Email address" style={inputStyle}
                            onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>PHONE</label>
                        <input placeholder="Phone number" style={inputStyle}
                            onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                    </div>
                    <button disabled={loading} type="submit"
                        className="w-full py-2.5 rounded-lg text-sm font-semibold mt-2"
                        style={{ background: "#3b82f6", color: "#fff", opacity: loading ? 0.5 : 1 }}>
                        {loading ? "Creating..." : "Create Employee"}
                    </button>
                </form>
            </div>
        </div>
    );
}