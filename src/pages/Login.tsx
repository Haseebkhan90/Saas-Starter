import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === 'login') {
        const res = await signInWithEmailAndPassword(auth, email, password);

        // Firestore modular way
        const userRef = doc(db, "users", res.user.uid);
        console.log("UID being used:", res.user.uid);
        const userSnap: DocumentSnapshot<DocumentData> = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const role = userData.role || "";
          console.log("🔍 Loaded role from Firestore:", role); // Here
          localStorage.setItem("userRole", role);
          toast.success("Logged in successfully!");
          // window.location.reload();

          if (role === "superadmin") {
            navigate("/superadmin/dashboard");
          } else {
            navigate("/client/dashboard");
          }
        } else {
          toast.error("User role document not found.");
        }


      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const role = email === "owner@ticketpulse.com" ? "superadmin" : "developer";

        await setDoc(doc(db, "users", res.user.uid), {
          email,
          role,
          createdAt: Timestamp.now(),
        });

        localStorage.setItem("userRole", role); //  Save role
        toast.success(" Account created successfully!");
        setTimeout(() => setMode('login'), 1000);
      }

    } catch (error: any) {
      toast.error(`${mode === 'login' ? "Login" : "Signup"} failed: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/netflix-hero.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-xl w-full max-w-md">

        {/* Test credentials message add karein */}
        <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-300 text-center">
            <strong>Test Credentials:</strong><br />
            Email: admin@test.com<br />
            Password: admin123
          </p>
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {mode === 'login'
            ? "Welcome Back to TicketPulse"
            : "Create Your TicketPulse Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-600"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            {mode === 'login' ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Signup toggle hidden from public if needed */}
        {mode === 'signup' && (
          <p className="text-center text-gray-300 mt-4">
            Already have an account?
            <button
              onClick={() => setMode("login")}
              className="ml-2 text-red-400 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
