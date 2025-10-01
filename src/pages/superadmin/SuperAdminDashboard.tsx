// pages/superadmin/Dashboard.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useUserRole } from "../../hooks/useUserRole";



interface Cinema {
  id: string;
  name: string;
  address: string;
  ownerEmail: string;
}

const SuperAdminDashboard = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const { role, loading } = useUserRole();

  useEffect(() => {
    const fetchCinemas = async () => {
      const snapshot = await getDocs(collection(db, "cinemas"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Cinema[];
      setCinemas(data);
    };

    fetchCinemas();
  }, []);

  if (loading) return <p className="p-6 text-gray-600">⏳ Checking role...</p>;
  if (role !== "superadmin") {
    return (
      <div className="p-6 text-red-600 text-xl font-semibold">
        ⛔ Access Denied – You are not authorized to view this page.
      </div>
    );
  }

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Super Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="bg-white shadow rounded p-4">
              <h2 className="text-xl font-semibold">{cinema.name}</h2>
              <p className="text-gray-600">{cinema.address}</p>
              <p className="text-gray-500 text-sm">Owner: {cinema.ownerEmail}</p>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SuperAdminDashboard;
