import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get("/admin/users");
                const sorted = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUsers(sorted);
            } catch (err) { console.log(err); }
        };
        fetchUsers();
    }, []);

    const totalPages = Math.ceil(users.length / perPage);
    const currentUsers = users.slice((page - 1) * perPage, page * perPage);

    const cardStyle = { background: "#151921", border: "1px solid #1e2433", borderRadius: 12 };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "#fff" }}>Users</h1>
            <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>All registered users</p>

            <div style={cardStyle}>
                <table className="w-full text-left">
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e2433" }}>
                            {["Name", "Email", "Contact", "Created At"].map(h => (
                                <th key={h} className="px-5 py-3 text-xs font-semibold uppercase" style={{ color: "#4b5563" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.length === 0 ? (
                            <tr><td colSpan={4} className="px-5 py-6 text-center text-sm" style={{ color: "#9ca3af" }}>No users found</td></tr>
                        ) : (
                            currentUsers.map((user) => (
                                <tr key={user._id} style={{ borderBottom: "1px solid #1e2433" }}>
                                    <td className="px-5 py-3 text-sm font-medium" style={{ color: "#fff" }}>{user.name}</td>
                                    <td className="px-5 py-3 text-sm" style={{ color: "#9ca3af" }}>{user.email}</td>
                                    <td className="px-5 py-3 text-sm" style={{ color: "#9ca3af" }}>{user.contact || "N/A"}</td>
                                    <td className="px-5 py-3 text-sm" style={{ color: "#9ca3af" }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 px-5 py-4" style={{ borderTop: "1px solid #1e2433" }}>
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}
                        className="px-3 py-1.5 rounded text-sm" style={{ background: "#1e3a5f", color: "#60a5fa", opacity: page === 1 ? 0.4 : 1 }}>Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => setPage(p)}
                            className="px-3 py-1.5 rounded text-sm"
                            style={{ background: page === p ? "#3b82f6" : "#1e2433", color: page === p ? "#fff" : "#9ca3af" }}>{p}</button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages || totalPages === 0}
                        className="px-3 py-1.5 rounded text-sm" style={{ background: "#1e3a5f", color: "#60a5fa", opacity: (page === totalPages || totalPages === 0) ? 0.4 : 1 }}>Next</button>
                </div>
            </div>
        </div>
    );
}