import ClientLayout from "../../layouts/ClientLayout";

const Dashboard = () => {
  return (
    <ClientLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Cinemas</h3>
          <p>5 cinemas connected</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Bookings</h3>
          <p>12 tickets booked</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Support</h3>
          <p>1 open request</p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Dashboard;
