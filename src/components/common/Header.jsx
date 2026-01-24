// src/components/common/Header.jsx (Updated)
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaRocket, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // redirect to landing
  };

  const handleDeployments = () => {
    window.location.href = "/deployments"; // navigate to deployments page
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