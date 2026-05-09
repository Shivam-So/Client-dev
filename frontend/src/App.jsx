import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import FormPage from "./pages/formpage";
import Success from "./pages/Success";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminForms from "./pages/admin/AdminForms";
import FormDetail from "./pages/admin/FormDetail";
import CreateEmployee from "./pages/admin/CreateEmployee";
import Employees from "./pages/admin/Emplyoee";
import EditEmployee from "./pages/admin/EditEmplyoee";
import Settings from "./pages/admin/Settings";

export default function App() {
  useEffect(() => {
    document.body.classList.add("app-loaded");

    return () => {
      document.body.classList.remove("app-loaded");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<Success />} />

        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="forms" element={<AdminForms />} />
          <Route path="forms/:id" element={<FormDetail />} />
          <Route path="employees" element={<Employees />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          <Route path="edit/:id" element={<EditEmployee />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
