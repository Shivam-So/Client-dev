import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    UsersRound,
    UserPlus,
    Settings,
    Menu,
    X
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import appLogo from "../../assets/app-logo.png";

export default function AdminLayout() {

    const navigate = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem("role");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {

        if (role !== "admin" && role !== "employee") {

            navigate("/");
        }

    }, []);

    useEffect(() => {

        setSidebarOpen(false);

    }, [location.pathname]);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    const navItems = [

        {
            to: "/admin/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />
        },

        {
            to: "/admin/users",
            label: "Users",
            icon: <Users size={18} />
        },

        {
            to: "/admin/forms",
            label: "Forms",
            icon: <FileText size={18} />
        },

        ...(role === "admin"
            ? [
                {
                    to: "/admin/employees",
                    label: "Employees",
                    icon: <UsersRound size={18} />
                },

                {
                    to: "/admin/create-employee",
                    label: "Create Employee",
                    icon: <UserPlus size={18} />
                }
            ]
            : []),

        {
            to: "/admin/settings",
            label: "Settings",
            icon: <Settings size={18} />
        }
    ];

    const SidebarContent = () => (

        <>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2 mt-2">

                <img
                    src={appLogo}
                    alt={role === "admin" ? "Admin Panel Logo" : "Employee Panel Logo"}
                    className="
                    w-10 h-10 object-contain
                    transition-all duration-300
                    hover:scale-110
                    hover:rotate-6
                    hover:shadow-xl
                    "
                />

                {/* Panel Name */}
                <span className="text-white font-bold text-lg">

                    {role === "admin"
                        ? "Admin Panel"
                        : "Employee Panel"}

                </span>

            </div>

            {/* Dashboard Text */}
            <p
                className="
                text-xs font-semibold
                mb-3 px-2
                "
                style={{ color: "#4b5563" }}
            >
                DASHBOARD
            </p>

            {/* Navigation */}
            <nav className="space-y-1 flex-1">

                {navItems.map((item) => {

                    const isActive =
                        location.pathname === item.to;

                    return (

                        <Link
                            key={item.to}

                            to={item.to}

                            className="
                            flex items-center gap-3
                            px-3 py-2.5 rounded-lg
                            transition-all duration-300 ease-in-out
                            hover:translate-x-1
                            hover:shadow-lg
                            cursor-pointer
                            "

                            style={{
                                background:
                                    isActive
                                        ? "#1e3a5f"
                                        : "transparent",

                                color:
                                    isActive
                                        ? "#60a5fa"
                                        : "#9ca3af",

                                borderLeft:
                                    isActive
                                        ? "3px solid #3b82f6"
                                        : "3px solid transparent"
                            }}
                        >

                            <div
                                className="
                                transition-all duration-300
                                hover:scale-110
                                "
                            >
                                {item.icon}
                            </div>

                            <span className="text-sm font-medium">
                                {item.label}
                            </span>

                        </Link>
                    );
                })}

            </nav>

            {/* Logout */}
            <button
                onClick={logout}

                className="
                flex items-center gap-3
                px-3 py-2.5 rounded-lg
                text-sm font-medium mt-4
                transition-all duration-300
                hover:scale-[1.03]
                hover:shadow-xl
                hover:-translate-y-1
                cursor-pointer
                "

                style={{
                    color: "#ef4444",
                    background: "#1f1520"
                }}
            >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}

                        d="
                        M17 16l4-4m0 0l-4-4
                        m4 4H7
                        m6 4v1a2 2 0 01-2 2H5
                        a2 2 0 01-2-2V7
                        a2 2 0 012-2h6
                        a2 2 0 012 2v1
                        "
                    />

                </svg>

                Logout

            </button>

        </>
    );

    return (

        <div
            className="
            flex h-screen overflow-hidden
            "
            style={{ background: "#0f1117" }}
        >

            <Toaster position="top-right" />

            {/* Desktop Sidebar */}
            <div
                className="
                hidden md:flex
                w-64 flex-col
                p-4 border-r
                transition-all duration-300
                "
                style={{
                    background: "#151921",
                    borderColor: "#1e2433"
                }}
            >

                <SidebarContent />

            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (

                <div className="fixed inset-0 z-50 md:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0"

                        style={{
                            background:
                                "rgba(0,0,0,0.6)"
                        }}

                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    />

                    {/* Sidebar */}
                    <div
                        className="
                        absolute left-0 top-0
                        h-full w-64
                        flex flex-col
                        p-4 border-r z-50
                        "
                        style={{
                            background: "#151921",
                            borderColor: "#1e2433"
                        }}
                    >

                        {/* Close Button */}
                        <button
                            onClick={() =>
                                setSidebarOpen(false)
                            }

                            className="
                            absolute top-4 right-4
                            transition-all duration-300
                            hover:scale-110
                            hover:rotate-90
                            cursor-pointer
                            "

                            style={{
                                color: "#9ca3af"
                            }}
                        >

                            <X size={20} />

                        </button>

                        <SidebarContent />

                    </div>

                </div>
            )}

            {/* Main */}
            <div
                className="
                flex-1 overflow-y-auto
                "
                style={{ background: "#0f1117" }}
            >

                {/* Topbar */}
                <div
                    className="
                    flex items-center
                    px-4 md:px-6 py-4
                    border-b
                    "
                    style={{
                        background: "#151921",
                        borderColor: "#1e2433"
                    }}
                >

                    {/* Mobile Menu */}
                    <button
                        className="
                        md:hidden
                        transition-all duration-300
                        hover:scale-110
                        mr-3
                        cursor-pointer
                        "

                        onClick={() =>
                            setSidebarOpen(true)
                        }

                        style={{
                            color: "#9ca3af"
                        }}
                    >

                        <Menu size={22} />

                    </button>

                    {/* Welcome Text */}
                    <p
                        className="text-sm"
                        style={{ color: "#9ca3af" }}
                    >

                        Welcome back,{" "}

                        <span className="text-white font-semibold">

                            {role === "admin"
                                ? "Admin"
                                : "Employee"}

                        </span>

                    </p>

                </div>

                {/* Page Content */}
                <div className="p-4 md:p-6">

                    <Outlet />

                </div>

            </div>

        </div>
    );
}
