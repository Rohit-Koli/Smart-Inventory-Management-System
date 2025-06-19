import React, { useState } from "react";
import Header from "../Header/Header";
import { Textarea } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    about: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const validatePassword = (password) => {
    let error = "";
    if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      error = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      error = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      error = "Password must contain at least one special character (!@#$%^&*).";
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: error }));
  };

  const validateMobileNumber = (contact) => {
    let error = "";
    if (!/^\d{10}$/.test(contact)) {
      error = "Mobile number must be exactly 10 digits.";
    }
    setErrors((prev) => ({ ...prev, contact: error }));
  };

  const validateEmail = (email) => {
    let error = "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      error = "Email is required.";
    } else if (!emailRegex.test(email)) {
      error = "Invalid email format.";
    }
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") validateEmail(value);
    if (name === "password") validatePassword(value);
    if (name === "contact") validateMobileNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await axios.post("http://localhost:8081/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response:", response.data);
      setMsg("success");
    } catch (error) {
      setMsg("Registration failed. Please try again!");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">Signup Here</h2>
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create an account</h1>

              {msg && (
                <div
                  className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${
                    msg.includes("success")
                      ? "text-green-800 border-green-300 bg-green-50"
                      : "text-red-800 border-red-300 bg-red-50"
                  }`}
                  role="alert"
                >
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div>
                    <span className="font-medium">
                      {msg.includes("success")
                        ? "You Have Registered Successfully !"
                        : "Failed to register please try again later !"}
                    </span>
                  </div>
                </div>
              )}

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="input-style"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="input-style"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="input-style"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91"
                    required
                    className="input-style"
                  />
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                </div>

                <div>
                  <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    About You
                  </label>
                  <Textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    className="input-style"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
