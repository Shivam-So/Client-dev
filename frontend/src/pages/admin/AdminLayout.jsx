import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, UsersRound, UserPlus, Settings } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "admin" && role !== "employee") {
            navigate("/");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    const navItems = [
        { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
        { to: "/admin/forms", label: "Forms", icon: <FileText size={18} /> },
        ...(role === "admin" ? [
            { to: "/admin/employees", label: "Employees", icon: <UsersRound size={18} /> },
            { to: "/admin/create-employee", label: "Create Employee", icon: <UserPlus size={18} /> },
        ] : []),
        { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
    ];

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: "#0f1117" }}>
            <Toaster position="top-right" />

            {/* Sidebar */}
            <div className="w-64 flex flex-col p-4 border-r" style={{ background: "#151921", borderColor: "#1e2433" }}>
                <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f97316" }}>
                        <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <span className="text-white font-bold text-lg">Admin Panel</span>
                </div>

                <p className="text-xs font-semibold mb-3 px-2" style={{ color: "#4b5563" }}>DASHBOARD</p>

                <nav className="space-y-1 flex-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                                style={{
                                    background: isActive ? "#1e3a5f" : "transparent",
                                    color: isActive ? "#60a5fa" : "#9ca3af",
                                    borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent"
                                }}
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mt-4"
                    style={{ color: "#ef4444", background: "#1f1520" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    Logout
                </button>
            </div>

            {/* Main */}
            <div className="flex-1 overflow-y-auto" style={{ background: "#0f1117" }}>
                {/* Topbar */}
                <div className="flex justify-between items-center px-6 py-4 border-b" style={{ background: "#151921", borderColor: "#1e2433" }}>
                    <p className="text-sm" style={{ color: "#9ca3af" }}>
                        Welcome back, <span className="text-white font-semibold">{role === "admin" ? "Admin" : "Employee"}</span>
                    </p>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "#3b82f6" }}>
                        {role === "admin" ? "A" : "E"}
                    </div>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}