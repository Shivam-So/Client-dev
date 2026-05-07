import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", contact: "" });
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => { fetchEmployees(); }, []);

    const fetchEmployees = async () => {
        try {
            const res = await API.get("/admin/employees");
            setEmployees(res.data.data || res.data);
        } catch (err) { console.log(err); }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post("/admin/create-employee", form);
            toast.success("Employee created & email sent! ✅");
            setShowModal(false);
            setForm({ name: "", email: "", contact: "" });
            fetchEmployees();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error creating employee");
        } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;
        try {
            await API.delete(`/admin/employees/${id}`);
            fetchEmployees();
        } catch (err) { console.log(err); }
    };

    const filteredEmployees = employees.filter((emp) =>
        emp.name?.toLowerCase().includes(search.toLowerCase()) ||
        emp.email?.toLowerCase().includes(search.toLowerCase()) ||
        emp.contact?.toLowerCase().includes(search.toLowerCase())
    );

    const cardStyle = { background: "#151921", border: "1px solid #1e2433", borderRadius: 12 };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#fff" }}>Employees</h1>
            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>Manage your team</p>

            <div className="flex justify-between items-center mb-4">
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, phone or email..."
                    className="px-4 py-2 rounded-lg text-sm w-72"
                    style={{ background: "#151921", border: "1px solid #1e2433", color: "#fff" }} />
                {role === "admin" && (
                    <button onClick={() => setShowModal(true)}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{ background: "#3b82f6", color: "#fff" }}>
                        + Add Employee
                    </button>
                )}
            </div>

            <div style={cardStyle}>
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e2433" }}>
                            {["Name", "Phone", "Email", ...(role === "admin" ? ["Actions"] : [])].map(h => (
                                <th key={h} className="px-5 py-3 text-xs font-semibold uppercase" style={{ color: "#4b5563" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length === 0 ? (
                            <tr><td colSpan={role === "admin" ? 4 : 3} className="px-5 py-6 text-center text-sm" style={{ color: "#9ca3af" }}>No employees found</td></tr>
                        ) : (
                            filteredEmployees.map((emp) => (
                                <tr key={emp._id} style={{ borderBottom: "1px solid #1e2433" }}>
                                    <td className="px-5 py-3 text-sm font-medium" style={{ color: "#fff" }}>{emp.name}</td>
                                    <td className="px-5 py-3 text-sm" style={{ color: "#9ca3af" }}>{emp.contact}</td>
                                    <td className="px-5 py-3 text-sm" style={{ color: "#9ca3af" }}>{emp.email}</td>
                                    {role === "admin" && (
                                        <td className="px-5 py-3 text-sm">
                                            <div className="flex gap-2">
                                                <button onClick={() => navigate(`/admin/edit/${emp._id}`)}
                                                    className="px-3 py-1 rounded text-xs"
                                                    style={{ background: "#1e3a5f", color: "#60a5fa" }}>Edit</button>
                                                <button onClick={() => handleDelete(emp._id)}
                                                    className="px-3 py-1 rounded text-xs"
                                                    style={{ background: "#2d1515", color: "#f87171" }}>Delete</button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {role === "admin" && showModal && createPortal(
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <div className="rounded-xl p-6 w-96 shadow-xl" style={{ background: "#151921", border: "1px solid #1e2433" }}>
                        <h2 className="text-lg font-bold mb-4" style={{ color: "#fff" }}>Create Employee</h2>
                        <form onSubmit={handleCreate} className="space-y-3">
                            {["name", "email", "contact"].map((field) => (
                                <input key={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={form[field]}
                                    className="w-full px-3 py-2 rounded-lg text-sm"
                                    style={{ background: "#0f1117", border: "1px solid #1e2433", color: "#fff" }}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                            ))}
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={loading}
                                    className="w-full py-2 rounded-lg text-sm font-medium"
                                    style={{ background: "#3b82f6", color: "#fff", opacity: loading ? 0.5 : 1 }}>
                                    {loading ? "Creating..." : "Create Employee"}
                                </button>
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="w-full py-2 rounded-lg text-sm font-medium"
                                    style={{ background: "#1e2433", color: "#9ca3af" }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}