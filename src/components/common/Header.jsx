// src/components/common/Header.jsx (FIXED VERSION)
import React from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // ADD THIS

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Logged out successfully");
      navigate("/", { replace: true }); // CHANGED: use navigate
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeployments = () => {
    console.log("📥 Navigating to deployments");
    navigate("/deployments"); // CHANGED: use navigate
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <div className="logo">Portfolio.ai</div>
        <span className="tagline">Build Your Professional Portfolio</span>
      </div>
      
      <div className="header-right">
        <button className="deployments-btn" onClick={handleDeployments}>
          <FaRocket /> My Downloads
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;