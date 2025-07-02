import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col justify-between">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Welcome to <span className="text-blue-600">Smart Inventory Tracker</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A lightweight, powerful, and easy-to-use inventory management system tailored for small businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-14 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Tracking",
                  desc: "Monitor your inventory live and never run out of stock again.",
                  icon: "📦",
                },
                {
                  title: "User-Friendly Interface",
                  desc: "Designed with simplicity in mind for quick onboarding.",
                  icon: "🖥️",
                },
                {
                  title: "Secure & Reliable",
                  desc: "Built with modern tech stack and strong authentication.",
                  icon: "🔒",
                },
              ].map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-md transition p-6 text-center"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-blue-50 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Smart Inventory Tracker. All rights reserved.
        </footer>
      </section>
    </>
  );
};

export default LandingPage;
