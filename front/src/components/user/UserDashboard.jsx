import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useAuth } from "../AuthProvider";
import ProductManager from "./ProductManager";

const UserDashboard = () => {
  const { user } = useAuth(); // contains user.email
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8081/user/getUserWithEmail", {
          params: { email: user.email },
        });
        setUserData(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:8081/user/updateUser", formData);
      setMsg(res.data);
      setEditing(false);
    } catch (error) {
      setMsg("Update failed.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete("http://localhost:8081/user/deleteUser", {
        params: { id: userData.id },
      });
      if (res.data) {
        setMsg("User deleted successfully.");
        setUserData(null);
      } else {
        setMsg("Failed to delete user.");
      }
    } catch (error) {
      setMsg("Error deleting user.");
    }
  };

  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex items-center justify-center text-lg font-semibold">Loading user data...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Welcome, {userData.username}</h2>

          {msg && (
            <div className="text-center mb-4 text-sm font-medium text-green-600">
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["username", "email", "contact", "about"].map((field) => (
              <div key={field}>
                <label className="block text-gray-600 capitalize mb-1">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!editing}
                  className={`w-full p-2 border ${editing ? "border-blue-400" : "border-gray-300"} rounded-md`}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center mt-6">
            {!editing ? (
              <button onClick={() => setEditing(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
                Edit
              </button>
            ) : (
              <button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Save Changes
              </button>
            )}
            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && <ProductManager userId={user.id} />}
    </div>
    </>
  );
};

export default UserDashboard;
