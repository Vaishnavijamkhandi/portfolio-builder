// src/components/dashboard/ExampleDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import PortfolioCard from "./PortfolioCard";
import Header from "../common/Header";
import "./dashboard.css";
import AIFloatingChat from "../ai/AIFloatingChat"; 

const templates = [
  {
    id: 1,
    title: "Software Developer",
    category: "Software Developer",
    description: "Clean, code-focused portfolio with dark theme",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
    color: "#3b82f6",
    tags: ["React", "Node.js", "AWS", "Full Stack"]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    category: "UI/UX Designer",
    description: "Visual portfolio with case studies",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
    color: "#8b5cf6",
    tags: ["Figma", "UI/UX", "Prototyping", "Wireframing"]
  },
  {
    id: 3,
    title: "Data Scientist",
    category: "Data Scientist",
    description: "Data-focused with metrics visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    color: "#06D6A0",
    tags: ["Python", "ML", "Analytics", "Visualization"]
  },
  {
    id: 4,
    title: "Business Analyst",
    category: "Business Analyst",
    description: "Professional with metrics dashboards",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    color: "#EF476F",
    tags: ["Excel", "SQL", "Reports", "Analysis"]
  },
  {
    id: 5,
    title: "Digital Marketer",
    category: "Digital Marketer",
    description: "Campaign-focused portfolio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    color: "#FFD166",
    tags: ["SEO", "Social Media", "Analytics", "Campaigns"]
  },
  {
    id: 6,
    title: "Music Artist",
    category: "Music Artist",
    description: "Music-focused portfolio with tracks",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    color: "#8B5CF6",
    tags: ["Music", "Audio", "Production", "Performance"]
  }
];

const ExampleDashboard = () => {
  const navigate = useNavigate(); // ADD THIS
  
 // In ExampleDashboard.jsx - UPDATE THIS:
const handlePreview = (templateId) => {
  console.log("👁️ Preview clicked for template:", templateId);
  
  // Save which template we're previewing
  localStorage.setItem('currentPreviewTemplate', templateId.toString());
  
  const baseUrl = window.location.origin; 
  
  // Open in new tab
  if (templateId === 7) {
    window.open('/preview7', '_blank', 'noopener,noreferrer');
  } else {
    window.open(`/preview/${templateId}`, '_blank', 'noopener,noreferrer');
  }
};
  const handleDemo = (templateId) => {
    localStorage.setItem('selectedTemplate', JSON.stringify(
      templates.find(t => t.id === templateId)
    ));
    navigate(`/builder/${templateId}`); // CHANGED: use navigate instead of window.location.href
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Choose Your Portfolio Template</h1>
          <p className="subtitle">
            Select a template and customize it with your information
          </p>
        </div>

        {/* SIMPLE 3 COLUMN GRID - NOW WITH 6 TEMPLATES */}
        <div className="portfolio-grid">
          {templates.map((template) => (
            <div key={template.id} className="portfolio-grid-item">
              <PortfolioCard
                title={template.title}
                category={template.category}
                description={template.description}
                tags={template.tags}
                image={template.image}
                color={template.color}
                onPreview={() => handlePreview(template.id)}
                onDemo={() => handleDemo(template.id)}
              />
            </div>
          ))}
        </div>
        
        <AIFloatingChat />
        
        {/* Steps Section */}
        <div className="dashboard-info">
          <h3>How it works:</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Choose Template</h4>
              <p>Select a design that fits your role</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Fill Your Details</h4>
              <p>Enter your information in simple form</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Download & Share</h4>
              <p>Get your portfolio as HTML or live link</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleDashboard;