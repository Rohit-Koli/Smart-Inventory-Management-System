import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    about: "",
  });

  const navigate=useNavigate();

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const validatePassword = (password) => {
    let error = "";
    if (password.length < 8) {
      error = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      error = "Must contain an uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      error = "Must contain a lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      error = "Must contain a number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      error = "Must include a special character (!@#$%^&*).";
    }
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const validateMobileNumber = (contact) => {
    const error = /^\d{10}$/.test(contact)
      ? ""
      : "Mobile number must be exactly 10 digits.";
    setErrors((prev) => ({ ...prev, contact: error }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const error = !email
      ? "Email is required."
      : !emailRegex.test(email)
      ? "Invalid email format."
      : "";
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") validateEmail(value);
    if (name === "password") validatePassword(value);
    if (name === "contact") validateMobileNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await axios.post("http://localhost:8081/user/signupUser ", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response:", response.data);
      setMsg("success");
      navigate('/login');
    } catch (error) {
      setMsg("Registration failed. Please try again!");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

          {msg && (
            <div
              className={`p-3 mb-4 rounded-lg text-sm text-center border ${
                msg.includes("success")
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-red-100 text-red-800 border-red-300"
              }`}
            >
              {msg.includes("success")
                ? "You Have Registered Successfully!"
                : "Registration failed. Please try again!"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Username", name: "username", type: "text", placeholder: "Your name" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
              { label: "Contact", name: "contact", type: "text", placeholder: "10-digit number" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 shadow-sm hover:shadow-md"
                />
                {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">About You</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 shadow-sm hover:shadow-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-200 shadow-lg hover:shadow-xl"
            >
              Create an Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
