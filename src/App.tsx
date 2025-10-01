import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import AuthPage from "./pages/Login";
import AddCinema from "./pages/superadmin/AddCinema";
import Dashboard from "./pages/client/Dashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import CinemaList from "./pages/superadmin/CinemaList";
import AddUser from "./pages/superadmin/AddUser";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientLogin from "./pages/client/ClientLogin";

// Optional: Unauthorized page
import Unauthorized from "./pages/Unauthorized"; // Create this component


function App() {
  return (

    <Routes>
      {/* Public Login Pages */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/client/login" element={<ClientLogin />} />

      {/* Unauthorized fallback */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Superadmin Panel (with layout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/add-cinema"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "manager"]}>
              <AddCinema />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/client-list"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "manager"]}>
              <CinemaList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/add-user"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Client Routes (NO MainLayout) */}
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}

export default App;
