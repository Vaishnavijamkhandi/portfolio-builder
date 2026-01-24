import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/template4';
import Template5 from '../templates/template5';
import Template6 from '../templates/Template6';
import Template7 from '../templates/Template7';
import BackButton from '../common/BackButton';
import './Preview.css';

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasUserData, setHasUserData] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // If template is 7, redirect to Preview7
    if (parseInt(templateId) === 7) {
      navigate('/preview7');
      return;
    }

    // Load user data from localStorage
    const loadUserData = () => {
      const savedData = localStorage.getItem('portfolio_data');
      console.log('Looking for portfolio_data:', savedData);
      
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          console.log('✅ User data found for preview:', data);
          console.log('Data templateId:', data.templateId, 'Current templateId:', templateId);
          
          // Check if this data matches the current template
          const dataTemplateId = data.templateId;
          const currentTemplateId = parseInt(templateId);
          
          if (dataTemplateId === currentTemplateId) {
            console.log('✅ Data matches current template!', dataTemplateId);
            // Save to template-specific storage for templates to use
            localStorage.setItem(`template_${templateId}_data`, JSON.stringify(data));
            setUserData(data);
            setHasUserData(true);
          } else {
            console.log('⚠️ Data template mismatch:', dataTemplateId, 'vs', currentTemplateId);
            // Still use the data but show it's for a different template
            localStorage.setItem(`template_${templateId}_data`, JSON.stringify(data));
            setUserData(data);
            setHasUserData(true);
          }
        } catch (error) {
          console.error('❌ Error loading user data:', error);
          setHasUserData(false);
        }
      } else {
        console.log('❌ No user data found in localStorage for portfolio_data');
        
        // Also check editingPortfolioData
        const editingData = localStorage.getItem('editingPortfolioData');
        if (editingData) {
          try {
            const data = JSON.parse(editingData);
            console.log('✅ Found editingPortfolioData:', data);
            setUserData(data);
            setHasUserData(true);
          } catch (error) {
            console.error('Error loading editing data:', error);
            setHasUserData(false);
          }
        } else {
          setHasUserData(false);
        }
      }
    };

    loadUserData();

    // Map template IDs to components (excluding template 7 since we redirect)
    const templateMap = {
      1: {
        name: "Software Developer",
        component: <Template1 />,
        description: "Clean, code-focused portfolio",
        color: "#3b82f6"
      },
      2: {
        name: "UI/UX Designer",
        component: <Template2 />,
        description: "Visual portfolio with case studies",
        color: "#8b5cf6"
      },
      3: {
        name: "Data Scientist",
        component: <Template3 />,
        description: "Data-focused with metrics visualization",
        color: "#06D6A0"
      },
      4: {
        name: "Business Analyst",
        component: <Template4 />,
        description: "Professional with metrics dashboards",
        color: "#EF476F"
      },
      5: {
        name: "Digital Marketer",
        component: <Template5 />,
        description: "Campaign-focused portfolio",
        color: "#FFD166"
      },
      6: {
        name: "Music Artist",
        component: <Template6 />,
        description: "Music-focused portfolio with tracks",
        color: "#8B5CF6"
      }
    };

    const found = templateMap[parseInt(templateId)];
    if (found) {
      setTemplate(found);
    } else {
      // Default to template 1 if not found (but not template 7 since we redirect)
      setTemplate(templateMap[1]);
    }
    
    setLoading(false);
  }, [templateId, navigate]); // Add navigate to dependency array

  const handleUseTemplate = () => {
    navigate(`/builder/${templateId}`);
  };

  const handleEditData = () => {
    navigate(`/builder/${templateId}`);
  };

  // Get user name from stored data
  const getUserName = () => {
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        return data.name || data.jobTitle || 'Your Name';
      }
    } catch (error) {
      console.error('Error getting user name:', error);
    }
    return 'Your Name';
  };

  if (loading) {
    return (
      <div className="preview-page">
        <div className="loading-preview">
          <div className="spinner"></div>
          <p>Loading template preview...</p>
        </div>
      </div>
    );
  }

  const userName = getUserName();

  return (
    <div className="preview-page">
      {/* Floating Back Button */}
      <BackButton text="Back to Templates" />
      
      {/* Preview Header */}
      <div className="preview-controls">
        <div className="preview-info">
          <h1>Preview: {template?.name}</h1>
          <p>{template?.description}</p>
          
          {/* Data Status Display */}
          <div className="user-data-display">
            <span className="user-badge">👤 {userName}</span>
            <span className="template-badge">{template?.name}</span>
            {hasUserData ? (
              <span className="data-badge success">✓ Your Data Loaded</span>
            ) : (
              <span className="data-badge warning">⚠️ Fill Form to See Your Data</span>
            )}
          </div>
        </div>
        
        <div className="preview-actions">
          <button className="preview-action-btn secondary" onClick={() => navigate('/dashboard')}>
            ← All Templates
          </button>
          
          {!hasUserData && (
            <button className="preview-action-btn warning" onClick={handleEditData}>
              ✏️ Fill Your Data
            </button>
          )}
          
          <button className="preview-action-btn primary" onClick={handleUseTemplate}>
            🚀 {hasUserData ? 'Edit Your Data' : 'Use This Template'}
          </button>
        </div>
      </div>

      {/* Template Preview Frame */}
      <div className="preview-frame">
        <div className="frame-header">
          <div className="frame-buttons">
            <span className="frame-btn red"></span>
            <span className="frame-btn yellow"></span>
            <span className="frame-btn green"></span>
          </div>
          <div className="frame-url">
            preview.{userName.toLowerCase().replace(/\s+/g, '-')}.portfolio.app
          </div>
          <div className="frame-actions">
            <button 
              className="refresh-btn" 
              onClick={() => window.location.reload()}
              title="Refresh preview"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
        
        <div className="frame-content">
          {template ? (
            <div className="template-preview">
              {/* DEBUG: Show which template is being rendered */}
              <div style={{display: 'none'}}>Rendering template ID: {templateId}</div>
              {template.component}
            </div>
          ) : (
            <div className="loading-preview">
              <div className="spinner"></div>
              <p>Template not found</p>
            </div>
          )}
        </div>
      </div>

      {/* Data Status Panel */}
      <div className="data-status-panel">
        <h3>Data Status</h3>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Template Loaded:</span>
            <span className="status-value success">✓ {template?.name}</span>
          </div>
          <div className="status-item">
            <span className="status-label">User Data:</span>
            <span className={`status-value ${hasUserData ? 'success' : 'warning'}`}>
              {hasUserData ? '✓ Loaded from localStorage' : '⚠️ Not found'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Preview Mode:</span>
            <span className="status-value info">
              {hasUserData ? 'Live Preview' : 'Sample Preview'}
            </span>
          </div>
        </div>
        
        <div className="data-instructions">
          {!hasUserData && (
            <>
              <h4>To see your actual data:</h4>
              <ol>
                <li>Click "Fill Your Data" or "Use This Template" button</li>
                <li>Fill in the form with your information</li>
                <li>Click "Preview Portfolio" button in the form</li>
                <li>You'll return here with your data loaded</li>
              </ol>
            </>
          )}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="preview-footer">
        <div className="template-features">
          <h3>Template Features:</h3>
          <ul>
            <li>✓ Fully responsive design</li>
            <li>✓ SEO optimized</li>
            <li>✓ Fast loading</li>
            <li>✓ Easy to customize</li>
            <li>✓ Real-time preview</li>
            <li>✓ One-click deployment</li>
          </ul>
        </div>
        
        <div className="demo-actions">
          <button className="demo-btn" onClick={handleUseTemplate}>
            {hasUserData ? 'Edit Your Portfolio' : 'Start Building Your Portfolio'}
          </button>
          <p className="demo-note">
            {hasUserData 
              ? 'Your data is saved. Make changes to update the preview instantly.' 
              : 'Customize this template with your information in the next step'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;