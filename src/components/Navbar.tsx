// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
    {/* Public */}
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/login" className="hover:underline">Login</Link>
      <Link to="/home" className="hover:underline">Signup</Link>

    {/* Super Admin */}
      <Link to="/superadmin/add-cinema" className="hover:underline">Add Cinema</Link>

    {/* Client */}
      <Link to="/client/dashboard" className="hover:underline">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
