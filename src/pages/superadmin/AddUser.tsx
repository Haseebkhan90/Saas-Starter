// pages/superadmin/AddUser.tsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "sonner";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import SidebarLayout from "../../layouts/SidebarLayout";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) return toast.error("Please select a role");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        email,
        role,
        createdAt: Timestamp.now(),
      });

      toast.success("✅ User added successfully");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err: any) {
      toast.error("❌ " + err.message);
    }
  };

  return (
    <SidebarLayout>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4"> Add New Users</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Temporary Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">superadmin</option>
          <option value="developer">Developer</option>
          <option value="manager">Manager</option>
          <option value="finance">Finance</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>
    </div>
    </SidebarLayout>
  );
};

export default AddUser;
