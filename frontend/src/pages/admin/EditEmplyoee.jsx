import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ firstName: "", middleName: "", lastName: "", email: "", contact: "" });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await API.get(`/admin/employees/${id}`);
                const user = res.data.data || res.data;
                const parts = user.name ? user.name.split(" ") : [];
                setForm({ firstName: parts[0] || "", middleName: "", lastName: parts[1] || "", email: user.email || "", contact: user.contact || "" });
            } catch (err) { console.log(err); }
            finally { setLoading(false); }
        };
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedName = `${form.firstName} ${form.lastName}`.trim();
            await API.put(`/admin/employees/${id}`, { name: updatedName, email: form.email, contact: form.contact });
            navigate("/admin/employees");
        } catch (err) { console.log(err); }
    };

    const inputStyle = { background: "#0f1117", border: "1px solid #1e2433", color: "#fff", borderRadius: 8, padding: "10px 14px", width: "100%", fontSize: 14 };

    if (loading) return <div style={{ color: "#9ca3af" }} className="p-6">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#fff" }}>Edit Employee</h1>
            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>Update employee details</p>

            <div className="p-6 max-w-2xl" style={{ background: "#151921", border: "1px solid #1e2433", borderRadius: 12 }}>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {[
                        { label: "FIRST NAME", key: "firstName", placeholder: "First name" },
                        { label: "MIDDLE NAME", key: "middleName", placeholder: "Middle name" },
                        { label: "LAST NAME", key: "lastName", placeholder: "Last name" },
                        { label: "EMAIL", key: "email", placeholder: "Email", disabled: true },
                    ].map(({ label, key, placeholder, disabled }) => (
                        <div key={key}>
                            <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>{label}</label>
                            <input placeholder={placeholder} value={form[key]} disabled={disabled}
                                style={{ ...inputStyle, opacity: disabled ? 0.5 : 1 }}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                        </div>
                    ))}
                    <div className="col-span-2">
                        <label className="text-xs font-semibold mb-1 block" style={{ color: "#9ca3af" }}>PHONE</label>
                        <input placeholder="Phone" value={form.contact} style={inputStyle}
                            onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-semibold"
                            style={{ background: "#3b82f6", color: "#fff" }}>Update Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}