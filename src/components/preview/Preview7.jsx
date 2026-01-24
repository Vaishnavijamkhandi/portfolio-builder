// src/components/preview/Preview7.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Template7 from '../templates/Template7';
import BackButton from '../common/BackButton';
import './Preview.css';

const Preview7 = () => {
  const navigate = useNavigate();
  const [hasUserData, setHasUserData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        console.log('✅ Template7 Preview: Loaded user data', data);
        setHasUserData(true);
      } catch (error) {
        console.error('Error loading user data:', error);
        setHasUserData(false);
      }
    } else {
      console.log('⚠️ Template7 Preview: No user data found');
      setHasUserData(false);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="preview-page">
        <div className="loading-preview">
          <div className="spinner"></div>
          <p>Loading portfolio preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview7-page">
      {/* Simple Header with Back Button */}
      <div className="preview7-header">
        <BackButton text="← Back to Form" onClick={() => navigate('/builder/7')} />
        
        <div className="preview7-controls">
          <h2>Your Flexible Portfolio Preview</h2>
          <div className="preview7-status">
            {hasUserData ? (
              <span className="status-badge success">✓ Your Data Loaded</span>
            ) : (
              <span className="status-badge warning">⚠️ Using Sample Data</span>
            )}
          </div>
          
          <div className="preview7-actions">
            <button 
              className="preview7-btn edit-btn"
              onClick={() => navigate('/builder/7')}
            >
              ✏️ Edit Portfolio
            </button>
            <button 
              className="preview7-btn launch-btn"
              onClick={() => {
                // Save to ensure data is there
                const existingData = localStorage.getItem('portfolio_data');
                if (!existingData) {
                  // Save sample data
                  const sampleData = {
                    name: 'Alex Chen',
                    jobTitle: 'Full-Stack Developer',
                    tagline: 'Building scalable solutions with React, Node.js, and AWS',
                    location: 'San Francisco, CA',
                    email: 'alex@devportfolio.com',
                    phone: '+1 (555) 123-4567',
                    bio: 'Passionate software engineer with 5+ years of experience...',
                    availability: 'Open to Opportunities',
                    sections: [
                      {
                        id: 'tech-stack',
                        title: 'Tech Stack',
                        type: 'tech-stack',
                        enabled: true,
                        data: {
                          frontend: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
                          backend: ['Node.js', 'Python', 'Express', 'GraphQL', 'REST APIs'],
                          devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
                          databases: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch']
                        }
                      }
                    ],
                    templateId: 7
                  };
                  localStorage.setItem('portfolio_data', JSON.stringify(sampleData));
                }
                navigate('/deploy-guide');
              }}
            >
              🚀 Launch Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="preview7-container">
        <Template7 />
      </div>

      {/* Simple Footer */}
      <div className="preview7-footer">
        <p>
          This is a preview of your portfolio. 
          {hasUserData 
            ? ' Your data has been loaded.' 
            : ' Using sample data. Fill the form to see your actual data.'
          }
        </p>
        <button 
          className="back-to-form-btn"
          onClick={() => navigate('/builder/7')}
        >
          ← Back to Form Editor
        </button>
      </div>
    </div>
  );
};

export default Preview7;