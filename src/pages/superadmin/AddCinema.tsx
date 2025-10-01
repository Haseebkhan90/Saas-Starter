import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../layouts/SidebarLayout";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AddCinema = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); //  added

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, ownerEmail, clientPassword);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: ownerEmail,
        role: "client",
        createdAt: Timestamp.now(),
      });

      await addDoc(collection(db, "cinemas"), {
        name,
        address,
        ownerEmail,
        createdAt: Timestamp.now(),
      });

      setSuccess("Cinema and client added successfully!");
      setName("");
      setAddress("");
      setOwnerEmail("");
      setClientPassword("");

      setTimeout(() => {
        navigate("/superadmin/dashboard");
      }, 1500);
    } catch (err) {
      console.error("❌ Error adding cinema or client:", err);
      setSuccess("❌ Failed to add cinema or client.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add New Cinema</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Cinema Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Owner Email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Client Password"
            value={clientPassword}
            onChange={(e) => setClientPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Cinema"}
          </button>
          {success && <p className="text-center text-green-600 mt-2">{success}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
};

export default AddCinema;
