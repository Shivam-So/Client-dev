import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import FormPage from "./pages/formpage";
import Success from "./pages/success";
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
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<Success />} />

        {/* /dashboard → redirect to admin dashboard */}
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

      </Routes>
    </BrowserRouter>
  );
}