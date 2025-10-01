import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [cinemaName, setCinemaName] = useState("");
  
  const finalRole = localStorage.getItem("userRole");
  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        console.log("🧾 Logged-in user email:", user.email);
        console.log("ClientLayout=>", cinemaName);
        try {
          const q = query(
            collection(db, "cinemas"),
            where("ownerEmail", "==", user.email)
          );
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const name = snapshot.docs[0].data().name;
            console.log(" Loaded cinema:", name);
            setCinemaName(name || "Your Cinema");
          } else {
            console.log(" No cinema found for this email");
          }
        } catch (err) {
          console.error(" Error loading cinema name:", err);
          setCinemaName("Cinema");
        }
      } else {
        console.log(" No user found");
      }
    });

    return () => unsubscribe();
  }, []);



  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out!");
    localStorage.removeItem("userRole");
    navigate("/client/login");
  };

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
            <span className="text-red-500">Client </span>Dashboard
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
          <button className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition">
            📊 {isOpen && "Dashboard"}
          </button>
          <button className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition">
            👥 {isOpen && "Client List"}
          </button>
          {finalRole === "superadmin" && (
            <button className="block w-full text-left px-2 py-2 rounded hover:bg-gray-800 transition">
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

export default ClientLayout;
