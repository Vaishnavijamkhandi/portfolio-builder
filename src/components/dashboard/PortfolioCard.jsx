// src/components/dashboard/PortfolioCard.jsx
import React from "react";
import { FaEye, FaRocket } from "react-icons/fa";
import "./dashboard.css";

const PortfolioCard = ({ 
  title, 
  category, 
  description, 
  tags, 
  image, 
  color,
  onPreview, 
  onDemo 
}) => {
  return (
    <div className="portfolio-card">
      {/* Header */}
      <div className="card-header" style={{ backgroundColor: `${color}15` }}>
        <span className="category-badge" style={{ color: color }}>
          {category}
        </span>
      </div>
      
      {/* Small Image */}
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      
      {/* Content */}
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-description">{description}</p>
        
        {/* Tags */}
        <div className="card-tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
      {/* Small Action Buttons */}
      <div className="card-actions">
        <button className="preview-btn" onClick={onPreview}>
          <FaEye size={12} /> Preview
        </button>
        <button className="demo-btn" onClick={onDemo}>
          <FaRocket size={12} /> Use Template
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;