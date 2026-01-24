// src/components/common/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Portfolio Not Found</h2>
        <p>The portfolio you're looking for doesn't exist or has been moved.</p>
        <div className="actions">
          <Link to="/" className="home-btn">Go to Home</Link>
          <Link to="/dashboard" className="dashboard-btn">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;