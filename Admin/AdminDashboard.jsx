// AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, LogOut } from "lucide-react";

// import your homepage components
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Publications from "../src/components/Publications";
import PressReleases from "../src/components/PressReleases.JSX";
import Programmes from "../src/components/Programmes";
import Footer from "../src/components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("hero");

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // clear admin flag
    navigate("/"); // go back to main website
  };

  const components = [
    { id: "hero", title: "HOME PAGE", icon: <Home size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-heroBG">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4">
          {components.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComponent(comp.id)}
              className={`flex items-center w-full text-left px-4 py-2 mb-2 rounded-md transition ${
                activeComponent === comp.id
                  ? "bg-heroBG text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {comp.icon}
              <span className="ml-3">{comp.title}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-gray-700 hover:text-red-600"
          >
            <LogOut size={18} />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Render homepage inside Admin */}
        {activeComponent === "hero" && (
          <>
            <Navbar />
            <Hero isAdmin={true} />
            <Publications />
            <PressReleases />
            <Programmes />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
