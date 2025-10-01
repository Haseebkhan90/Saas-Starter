import { useUserRole } from "../hooks/useUserRole";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

type Role = "superadmin" | "manager" | "developer" | "client";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { role, loading } = useUserRole();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("userRole"); // Clear local role
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading || checkingAuth) {
    return (
      <div className="p-6 text-gray-500 text-lg animate-pulse">
        🔄 Checking access...
      </div>
    );
  }

  const validRoles: Role[] = ["superadmin", "manager", "developer", "client"];
  const storedRole = localStorage.getItem("userRole");
  const finalRole: Role | null =
    role && validRoles.includes(role as Role)
      ? (role as Role)
      : validRoles.includes(storedRole as Role)
      ? (storedRole as Role)
      : null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!finalRole || !validRoles.includes(finalRole) || !allowedRoles.includes(finalRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
