import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-red-600 font-bold text-2xl mb-4">
        Unauthorized Access
      </h1>
      <p className="text-gray-700 mb-6">
        You don't have permission to view this page.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;
