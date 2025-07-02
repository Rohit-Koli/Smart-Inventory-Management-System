import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser  } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const resetForm = (e) => {
    e.preventDefault();
    setFormData({ email: "", password: "" });
    setErrors({});
    setMsg("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

  const validatePassword = (password) => {
    return !password ? "Password is required." : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/user/userLogin",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const userExist = response.data;

      if (userExist) {
        setUser ({ email: formData.email });
        setMsg("success");
        navigate("/userDashboard");
      } else {
        setMsg("Login failed. Please try again!");
      }
    } catch (error) {
      setMsg("Login failed. Please try again!");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Welcome Back
          </h2>

          {msg && (
            <div
              className={`p-3 mb-4 text-sm rounded-md border ${
                msg.includes("success")
                  ? "bg-green-50 text-green-800 border-green-300"
                  : "bg-red-50 text-red-800 border-red-300"
              }`}
            >
              {msg.includes("success")
                ? "✅ You Have Logged In Successfully!"
                : "❌ Login failed. Please try again!"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold shadow-sm transition duration-200"
              >
                Login
              </button>
              <button
                onClick={resetForm}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2.5 rounded-lg font-semibold shadow-sm transition duration-200"
              >
                Reset
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
