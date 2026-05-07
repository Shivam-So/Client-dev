import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Settings() {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) { toast.error("Passwords do not match!"); return; }
        if (form.newPassword.length < 6) { toast.error("Min 6 characters required!"); return; }
        setLoading(true);
        try {
            await API.post("/auth/change-password", { currentPassword: form.currentPassword, newPassword: form.newPassword });
            toast.success("Password changed! ✅");
            setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            toast.error(err.response?.data?.message || "Error changing password");
        } finally { setLoading(false); }
    };

    const inputStyle = { background: "#0f1117", border: "1px solid #1e2433", color: "#fff", borderRadius: 8, padding: "10px 14px", width: "100%", fontSize: 14 };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#fff" }}>Settings</h1>
            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>Manage your account</p>

            <div className="p-6 max-w-md" style={{ background: "#151921", border: "1px solid #1e2433", borderRadius: 12 }}>
                <h2 className="text-sm font-semibold mb-4" style={{ color: "#fff" }}>Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "CURRENT PASSWORD", key: "currentPassword", placeholder: "Enter current password" },
                        { label: "NEW PASSWORD", key: "newPassword", placeholder: "Enter new password" },
                        { label: "CONFIRM PASSWORD", key: "confirmPassword", placeholder: "Confirm new password" },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>{label}</label>
                            <input type="password" placeholder={placeholder} value={form[key]} style={inputStyle}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                        </div>
                    ))}
                    <button type="submit" disabled={loading}
                        className="w-full py-2.5 rounded-lg text-sm font-semibold mt-2"
                        style={{ background: "#3b82f6", color: "#fff", opacity: loading ? 0.5 : 1 }}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}