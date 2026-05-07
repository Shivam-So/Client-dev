import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalForms, setTotalForms] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resUsers = await API.get("/admin/users");
                setTotalUsers(resUsers.data.count);
                const latest = resUsers.data.data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4);
                setUsers(latest);
                const resForms = await API.get("/admin/forms");
                setTotalForms(resForms.data.count);
            } catch (err) {
                toast.error("Failed to load dashboard data");
            }
        };
        fetchData();
    }, []);

    const cardStyle = { background: "#151921", border: "1px solid #1e2433", borderRadius: 12 };
    const textMuted = { color: "#9ca3af" };
    const textWhite = { color: "#ffffff" };

    return (
        <div>
            <h1 className="text-xl md:text-2xl font-bold mb-1" style={textWhite}>Dashboard</h1>
            <p className="text-sm mb-6" style={textMuted}>Welcome to your admin panel</p>


            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="p-4 md:p-5" style={cardStyle}>
                    <div className="flex items-center gap-2 md:gap-3 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "#1e3a5f" }}>
                            <UsersIcon size={18} color="#60a5fa" />
                        </div>
                        <p className="text-xs md:text-sm" style={textMuted}>Total Users</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold" style={textWhite}>{totalUsers}</p>
                    <div className="mt-3 h-1 rounded-full" style={{ background: "#1e2433" }}>
                        <div className="h-1 rounded-full" style={{ background: "#3b82f6", width: "60%" }}></div>
                    </div>
                </div>

                <div className="p-4 md:p-5" style={cardStyle}>
                    <div className="flex items-center gap-2 md:gap-3 mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center" style={{ background: "#1a2e1a" }}>
                            <FileTextIcon size={18} color="#4ade80" />
                        </div>
                        <p className="text-xs md:text-sm" style={textMuted}>Total Forms</p>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold" style={textWhite}>{totalForms}</p>
                    <div className="mt-3 h-1 rounded-full" style={{ background: "#1e2433" }}>
                        <div className="h-1 rounded-full" style={{ background: "#4ade80", width: "40%" }}></div>
                    </div>
                </div>
            </div>


            <div style={cardStyle}>
                <div className="flex items-center justify-between px-4 md:px-5 py-4 border-b" style={{ borderColor: "#1e2433" }}>
                    <h2 className="font-semibold text-sm md:text-base" style={textWhite}>Recent Users</h2>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ background: "#1e3a5f", color: "#60a5fa" }}>Latest 4</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left" style={{ minWidth: 400 }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #1e2433" }}>
                                {["Name", "Email", "Contact", "Created At"].map(h => (
                                    <th key={h} className="px-4 md:px-5 py-3 text-xs font-semibold uppercase" style={{ color: "#4b5563" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-5 py-6 text-center text-sm" style={textMuted}>No users found</td>
                                </tr>
                            ) : (
                                users.map((user, i) => (
                                    <tr key={i} style={{ borderBottom: "1px solid #1e2433" }}>
                                        <td className="px-4 md:px-5 py-3 text-sm font-medium" style={textWhite}>{user.name}</td>
                                        <td className="px-4 md:px-5 py-3 text-sm" style={textMuted}>{user.email}</td>
                                        <td className="px-4 md:px-5 py-3 text-sm" style={textMuted}>{user.contact || "N/A"}</td>
                                        <td className="px-4 md:px-5 py-3 text-sm" style={textMuted}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function UsersIcon({ size, color }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}
function FileTextIcon({ size, color }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
}