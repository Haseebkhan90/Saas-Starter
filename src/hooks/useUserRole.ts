import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserRole = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setRole(data.role || "");
          localStorage.setItem("userRole", data.role);
        } else {
          const localRole = localStorage.getItem("userRole") || "";
          setRole(localRole);
        }
      } catch (err) {
        const localRole = localStorage.getItem("userRole") || "";
        setRole(localRole);
      }
    } else {
      setRole("");
      localStorage.removeItem("userRole"); 
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  return { role, loading };
};
