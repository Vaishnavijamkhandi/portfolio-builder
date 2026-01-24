// src/components/builder/SimpleBuilder.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
   
   getAISuggestions,
  getMockAISuggestions 
} from "../../utils/aiHelper"; // Single import statement
import BackButton from "../common/BackButton";
import "./Builder.css";

// Remove the duplicate import lines 2-3 that were:
// import { getAISuggestions, getMockAISuggestions } from "../../utils/aiHelper";

// AI Help Button Component
const AIHelpButton = ({ field, currentValue, onSuggest, template }) => {
  const [loading, setLoading] = useState(false);

  const handleAIClick = async () => {
    setLoading(true);
    try {
      let suggestion;
      
      // Determine AI prompt type based on field
      const promptType = {
        summary: 'professional_summary',
        experience: 'bullet_point',
        projects: 'project_description',
        skills: 'skill_description'
      }[field] || 'professional_summary';

      // Get context for AI
      const context = {
        role: template?.category || "Professional",
        text: currentValue,
        field: field
      };

      // Try real AI first, fallback to mock
      try {
        suggestion = await getAISuggestions(promptType, context);
      } catch {
        suggestion = getMockAISuggestions(promptType, context);
      }
      
      onSuggest(suggestion);
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI service temporarily unavailable. Using mock suggestions.");
      onSuggest(getMockAISuggestions('professional_summary', { text: currentValue }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button" 
      className="ai-help-btn"
      onClick={handleAIClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="ai-spinner"></span> AI Thinking...
        </>
      ) : (
        <>
          <span className="ai-icon">✨</span> AI Help
        </>
      )}
    </button>
  );
};

// AI Text Improvement Component
const AITextImprover = ({ text, onImprove }) => {
  const [improving, setImproving] = useState(false);

  const handleImprove = async () => {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setImproving(true);
    try {
      const improved = await getAISuggestions('project_description', { 
        text: text,
        action: 'improve_and_professionalize'
      });
      onImprove(improved);
    } catch {
      const mockImproved = getMockAISuggestions('project_description', { text: text });
      onImprove(mockImproved);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="ai-improver">
      <button 
        onClick={handleImprove}
        disabled={improving}
        className="improve-btn"
      >
        {improving ? (
          <>
            <span className="ai-spinner"></span> Improving...
          </>
        ) : (
          <>
            <span className="ai-icon">⚡</span> AI Improve Text
          </>
        )}
      </button>
      <p className="ai-note">
        AI will make your text more professional and impactful
      </p>
    </div>
  );
};

// Main Builder Component
const SimpleBuilder = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    
    // Social Links
    linkedin: "",
    github: "",
    portfolio: "",
    twitter: "",
    
    // Content
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
    
    // Role-specific
    behance: "",
    dribbble: "",
    kaggle: "",
    research: ""
  });

  // Load template data
  useEffect(() => {
    const templates = [
      { id: 1, name: "Software Developer", category: "Software Developer", color: "#3b82f6" },
      { id: 2, name: "UI/UX Designer", category: "UI/UX Designer", color: "#8b5cf6" },
      { id: 3, name: "Data Scientist", category: "Data Scientist", color: "#06D6A0" },
      { id: 4, name: "Business Analyst", category: "Business Analyst", color: "#EF476F" },
      { id: 5, name: "Digital Marketer", category: "Digital Marketer", color: "#FFD166" }
    ];
    
    const selectedTemplate = templates.find(t => t.id === parseInt(templateId));
    setTemplate(selectedTemplate);
    
    // Load saved data if exists
    const savedData = localStorage.getItem(`portfolioData_${templateId}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [templateId]);

  // Save data on change
  useEffect(() => {
    localStorage.setItem(`portfolioData_${templateId}`, JSON.stringify(formData));
  }, [formData, templateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAISuggest = (field, suggestion) => {
    setFormData(prev => ({
      ...prev,
      [field]: suggestion
    }));
  };

  // Generate portfolio HTML
  const generatePortfolioHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.fullName} - Portfolio</title>
    <style>
        /* Basic styles for the portfolio */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { background: ${template?.color || '#3b82f6'}; color: white; padding: 40px 20px; text-align: center; }
        h1 { font-size: 48px; margin-bottom: 10px; }
        h2 { font-size: 24px; margin-bottom: 30px; opacity: 0.9; }
        .contact-info { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
        .contact-item { flex: 1; min-width: 200px; }
        section { padding: 40px 20px; border-bottom: 1px solid #eee; }
        h3 { font-size: 32px; margin-bottom: 20px; color: ${template?.color || '#3b82f6'}; }
        .content { font-size: 16px; color: #333; }
        footer { text-align: center; padding: 20px; background: #f5f5f5; margin-top: 40px; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${formData.fullName}</h1>
            <h2>${formData.professionalTitle}</h2>
            <div class="contact-info">
                ${formData.email ? `<div class="contact-item">📧 ${formData.email}</div>` : ''}
                ${formData.phone ? `<div class="contact-item">📱 ${formData.phone}</div>` : ''}
                ${formData.location ? `<div class="contact-item">📍 ${formData.location}</div>` : ''}
                ${formData.linkedin ? `<div class="contact-item">💼 ${formData.linkedin}</div>` : ''}
                ${formData.github ? `<div class="contact-item">💻 ${formData.github}</div>` : ''}
            </div>
        </div>
    </header>

    <section>
        <div class="container">
            <h3>Professional Summary</h3>
            <div class="content">
                ${formData.summary.replace(/\n/g, '<br>')}
            </div>
        </div>
    </section>

    ${formData.skills ? `
    <section>
        <div class="container">
            <h3>Skills</h3>
            <div class="content">
                ${formData.skills.replace(/\n/g, '<br>')}
            </div>
        </div>
    </section>` : ''}

    ${formData.experience ? `
    <section>
        <div class="container">
            <h3>Experience</h3>
            <div class="content">
                ${formData.experience.replace(/\n/g, '<br>')}
            </div>
        </div>
    </section>` : ''}

    ${formData.projects ? `
    <section>
        <div class="container">
            <h3>Projects</h3>
            <div class="content">
                ${formData.projects.replace(/\n/g, '<br>')}
            </div>
        </div>
    </section>` : ''}

    <footer>
        <div class="container">
            <p>Generated with Portfolio.ai • ${new Date().getFullYear()}</p>
        </div>
    </footer>
</body>
</html>`;

    return html;
  };

  const handleDownload = () => {
    const html = generatePortfolioHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName.replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("✅ Portfolio downloaded! Open the HTML file in your browser.");
  };

  const handleDeploy = async () => {
    // In a real app, this would deploy to Netlify/Vercel/Firebase
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const liveUrl = `https://${formData.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${uniqueId}.portfolio.ai`;
    
    // Save to user's portfolio list
    const myPortfolios = JSON.parse(localStorage.getItem('myPortfolios') || '[]');
    myPortfolios.push({
      id: uniqueId,
      url: liveUrl,
      name: `${formData.fullName}'s Portfolio`,
      template: template?.name,
      created: new Date().toISOString()
    });
    localStorage.setItem('myPortfolios', JSON.stringify(myPortfolios));
    
    // Copy to clipboard and show success
    navigator.clipboard.writeText(liveUrl);
    alert(`🎉 Your portfolio is now live!\n\n${liveUrl}\n\nLink copied to clipboard.`);
  };

  // Render different steps
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="builder-step">
            <h2>
              <span className="step-number">1</span>
              Personal Information
            </h2>
            <p className="step-description">
              Basic information that appears at the top of your portfolio
            </p>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Professional Title *</label>
                <input
                  type="text"
                  name="professionalTitle"
                  value={formData.professionalTitle}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
            
            <div className="ai-section">
              <h3>✨ AI-Powered Profile</h3>
              <p>Let AI help you create a professional profile</p>
              <AIHelpButton 
                field="summary"
                currentValue={formData.summary}
                onSuggest={(suggestion) => handleAISuggest('summary', suggestion)}
                template={template}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="builder-step">
            <h2>
              <span className="step-number">2</span>
              Social Links & Professional Summary
            </h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>
              
              {/* Role-specific fields */}
              {template?.category === "UI/UX Designer" && (
                <>
                  <div className="form-group">
                    <label>Behance URL</label>
                    <input
                      type="url"
                      name="behance"
                      value={formData.behance}
                      onChange={handleChange}
                      placeholder="https://behance.net/username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Dribbble URL</label>
                    <input
                      type="url"
                      name="dribbble"
                      value={formData.dribbble}
                      onChange={handleChange}
                      placeholder="https://dribbble.com/username"
                    />
                  </div>
                </>
              )}
              
              {template?.category === "Data Scientist" && (
                <div className="form-group">
                  <label>Kaggle Profile</label>
                  <input
                    type="url"
                    name="kaggle"
                    value={formData.kaggle}
                    onChange={handleChange}
                    placeholder="https://kaggle.com/username"
                  />
                </div>
              )}
              
              <div className="form-group full-width">
                <label>
                  Professional Summary *
                  <AIHelpButton 
                    field="summary"
                    currentValue={formData.summary}
                    onSuggest={(suggestion) => handleAISuggest('summary', suggestion)}
                    template={template}
                  />
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="AI will help you write a compelling professional summary..."
                  rows={6}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>
                  Skills (one per line or comma separated) *
                  <AIHelpButton 
                    field="skills"
                    currentValue={formData.skills}
                    onSuggest={(suggestion) => handleAISuggest('skills', suggestion)}
                    template={template}
                  />
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Python, AWS..."
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="builder-step">
            <h2>
              <span className="step-number">3</span>
              Experience & Projects
            </h2>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>
                  Work Experience
                  <AIHelpButton 
                    field="experience"
                    currentValue={formData.experience}
                    onSuggest={(suggestion) => handleAISuggest('experience', suggestion)}
                    template={template}
                  />
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe your work experience, achievements, and responsibilities..."
                  rows={6}
                />
                <AITextImprover 
                  text={formData.experience}
                  onImprove={(improved) => handleAISuggest('experience', improved)}
                />
              </div>
              
              <div className="form-group full-width">
                <label>
                  Projects
                  <AIHelpButton 
                    field="projects"
                    currentValue={formData.projects}
                    onSuggest={(suggestion) => handleAISuggest('projects', suggestion)}
                    template={template}
                  />
                </label>
                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  placeholder="Describe your key projects, technologies used, and results achieved..."
                  rows={6}
                />
                <AITextImprover 
                  text={formData.projects}
                  onImprove={(improved) => handleAISuggest('projects', improved)}
                />
              </div>
              
              <div className="form-group full-width">
                <label>Education</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Your educational background, degrees, and certifications..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="builder-step">
            <h2>
              <span className="step-number">4</span>
              Preview & Generate
            </h2>
            
            <div className="preview-section">
              <div className="preview-header">
                <h3>Your Portfolio Preview</h3>
                <p>This is how your portfolio will look</p>
              </div>
              
              <div className="preview-card">
                <div className="preview-title" style={{ backgroundColor: template?.color }}>
                  <h4>{formData.fullName || "Your Name"}</h4>
                  <p>{formData.professionalTitle || "Your Title"}</p>
                </div>
                
                <div className="preview-content">
                  <div className="preview-item">
                    <strong>Contact:</strong>
                    {formData.email && <p>📧 ${formData.email}</p>}
                    {formData.phone && <p>📱 ${formData.phone}</p>}
                    {formData.linkedin && <p>💼 ${formData.linkedin}</p>}
                    {formData.github && <p>💻 ${formData.github}</p>}
                  </div>
                  
                  {formData.summary && (
                    <div className="preview-item">
                      <strong>Summary:</strong>
                      <p>{formData.summary.substring(0, 150)}...</p>
                    </div>
                  )}
                  
                  {formData.skills && (
                    <div className="preview-item">
                      <strong>Skills:</strong>
                      <p>{formData.skills.substring(0, 100)}...</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="action-btn download-btn" onClick={handleDownload}>
                  <span className="btn-icon">📥</span>
                  Download HTML
                </button>
                
                <button className="action-btn deploy-btn" onClick={handleDeploy}>
                  <span className="btn-icon">🚀</span>
                  Deploy Live Website
                </button>
                
                <button 
                  className="action-btn share-btn"
                  onClick={() => alert("Share feature coming soon!")}
                >
                  <span className="btn-icon">🔗</span>
                  Get Shareable Link
                </button>
              </div>
              
              <div className="success-message">
                <p className="success-icon">✅</p>
                <h4>Your portfolio is ready!</h4>
                <p>Choose how you want to use it:</p>
                <ul className="options-list">
                  <li><strong>Download HTML:</strong> Get the file and host anywhere</li>
                  <li><strong>Deploy Live:</strong> Get a live URL instantly</li>
                  <li><strong>Share Link:</strong> Send to recruiters immediately</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="simple-builder">
      {/* Back Button */}
      <BackButton text="← Back to Templates" />
      
      {/* Header */}
      <div className="builder-header">
        <div className="header-content">
          <h1>
            Building: <span style={{ color: template?.color }}>{template?.name}</span>
          </h1>
          <p className="template-description">
            Customize your portfolio with AI assistance
          </p>
        </div>
        
        <div className="progress-indicator">
          {[1, 2, 3, 4].map((stepNum) => (
            <div 
              key={stepNum}
              className={`progress-step ${step === stepNum ? 'active' : ''} ${step > stepNum ? 'completed' : ''}`}
              onClick={() => setStep(stepNum)}
            >
              <div className="step-circle">{stepNum}</div>
              <span className="step-label">
                {stepNum === 1 && 'Personal'}
                {stepNum === 2 && 'Social'}
                {stepNum === 3 && 'Experience'}
                {stepNum === 4 && 'Preview'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="builder-content">
        {renderStep()}
      </div>
      
      {/* Navigation */}
      <div className="navigation-buttons">
        {step > 1 && (
          <button className="nav-btn prev-btn" onClick={handleBack}>
            ← Previous Step
          </button>
        )}
        
        {step < 4 ? (
          <button className="nav-btn next-btn" onClick={handleNext}>
            Next Step →
          </button>
        ) : (
          <button 
            className="nav-btn finish-btn"
            onClick={() => {
              handleDownload();
              navigate('/');
            }}
          >
            🎉 Finish & Download
          </button>
        )}
      </div>
      
      {/* AI Info Box */}
      <div className="ai-info-box">
        <div className="ai-icon">🤖</div>
        <div className="ai-content">
          <h3>AI Assistant Active</h3>
          <p>Click "AI Help" buttons for smart suggestions and improvements</p>
          {!process.env.REACT_APP_OPENAI_API_KEY && (
            <div className="ai-warning">
              ⚠️ Using demo AI. Add your OpenAI API key for full AI features.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleBuilder;