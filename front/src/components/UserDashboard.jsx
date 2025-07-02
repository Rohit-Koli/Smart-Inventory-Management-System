import React from "react";
import { useAuth } from "./AuthProvider"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.username} 👋</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">User Details</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <p><strong>About:</strong> {user.about}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dashboard Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>View Profile</li>
              <li>Update Account</li>
              <li>Check Notifications</li>
              <li>Secure Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
