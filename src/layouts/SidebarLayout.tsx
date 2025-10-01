import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "sonner";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUserRole } from "../hooks/useUserRole";


const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { role, loading } = useUserRole();
  const finalRole = role || localStorage.getItem("userRole") || "";
  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out!");
    localStorage.removeItem("userRole");
    navigate("/home");
  };

  if (loading || role === "") {
    return (
      <div className="p-6 text-gray-500 text-lg animate-pulse">
        🔄 Checking access...
      </div>
    );
  }


  if (finalRole !== "superadmin" && finalRole !== "manager") {
    return (
      <div className="p-6 text-red-600 text-xl font-semibold">
        ⛔ Access Denied – You are not authorized to view this section.
      </div>
    );
  }



  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${isOpen ? "w-64" : "w-16"
          } bg-gray-900 text-white transition-all duration-300 p-4 sm:block hidden`}
      >
        {/* Top logo + toggle */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
          <h2
            className={`text-2xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"
              }`}
          >
            <span className="text-red-500">TicketPulse</span> Admin
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1 rounded hover:bg-gray-800 transition duration-300"
          >
            <span
              className={`transition-transform duration-300 transform ${isOpen ? "rotate-0" : "rotate-180"
                }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/superadmin/dashboard")}
            className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition"
          >
            📊 {isOpen && "Dashboard"}
          </button>
          <button
            onClick={() => navigate("/superadmin/add-cinema")}
            className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition"
          >
            ➕ {isOpen && "Add Cinema"}
          </button>
          <button
            onClick={() => navigate("/superadmin/client-list")}
            className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition"
          >
            👥 {isOpen && "Client List"}
          </button>

          {/* Conditionally Render Add User for superadmin only */}
          {finalRole === "superadmin" && (
            <button
              onClick={() => navigate("/superadmin/add-user")}
              className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition"
            >
              ✍️ {isOpen && "Add User"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className="block w-full text-left px-2 py-2 rounded hover:bg-red-600 transition mt-8"
          >
            🚪 {isOpen && "Sign Out"}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default SidebarLayout;
