import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMagic, FaSpinner, FaFigma, FaBehance, FaDribbble, 
  FaLinkedin, FaInstagram, FaPenNib, FaPalette, FaLayerGroup 
} from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template2Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info (from Template2.js)
    name: 'Sarah Design',
    title: 'UI/UX Designer & Creative Director',
    tagline: 'Creating Digital Experiences That Inspire',
    specialty: 'Product Design & User Experience',
    location: 'New York, NY',
    email: 'sarah@designportfolio.com',
    bio: `UI/UX Designer & Creative Director with 7+ years of experience 
          transforming complex problems into beautiful, intuitive solutions.`,
    
    // Designer Social Links (DIFFERENT from Template 1)
    behance: 'https://behance.net',
    dribbble: 'https://dribbble.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    
    // Design Stats (DIFFERENT from dev)
    stats: {
      projects: '150+',
      satisfaction: '98%',
      awards: '25+'
    },
    
    // Design Projects (DIFFERENT structure)
    projects: [
      {
        title: 'Fintech Mobile App',
        category: 'Mobile App Design',
        client: 'Major Bank',
        description: 'Complete redesign of banking experience for millennials',
        tools: ['Figma', 'Adobe XD', 'Principle'],
        link: 'https://behance.net/project1',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'E-Learning Platform',
        category: 'Web Design',
        client: 'EduTech Startup',
        description: 'Gamified education interface for online learning',
        tools: ['Sketch', 'InVision', 'After Effects'],
        link: 'https://dribbble.com/project2',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      }
    ],
    
    // Design Process (UNIQUE to designers)
    processSteps: [
      { step: '01', title: 'Discover', description: 'User research & analysis' },
      { step: '02', title: 'Define', description: 'Problem framing & strategy' },
      { step: '03', title: 'Design', description: 'Wireframing & prototyping' },
      { step: '04', title: 'Deliver', description: 'Testing & implementation' }
    ],
    
    // Design Tools (DIFFERENT from dev tech stack)
    designTools: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision', 'Principle'],
    
    // Design Methodologies
    methodologies: ['Design Thinking', 'User-Centered Design', 'Agile Methodology'],
    
    // EmailJS
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'sarah@designportfolio.com'
    },
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'sarahdesign'
    }
  });

  // AI Improvement for Designer content
  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `UI/UX Designer portfolio, specializing in ${formData.specialty}`;
      
      if (index !== null && field === 'projects') {
        improvedText = await improveWithAI('designProject', formData.projects[index].description, 2, {
          name: formData.name,
          title: formData.title
        });
        
        const newProjects = [...formData.projects];
        newProjects[index].description = improvedText;
        setFormData({...formData, projects: newProjects});
      } else {
        improvedText = await improveWithAI(field, formData[field], 2, {
          name: formData.name,
          title: formData.title
        });
        setFormData({...formData, [field]: improvedText});
      }
      
      // Show success
      document.getElementById('ai-success').style.display = 'block';
      setTimeout(() => {
        document.getElementById('ai-success').style.display = 'none';
      }, 3000);
    } catch (error) {
      console.error('AI improvement failed:', error);
    } finally {
      setAiLoading({ [field]: false });
    }
  };

  // Add Design Tool
  const addDesignTool = (tool) => {
    if (tool.trim()) {
      setFormData(prev => ({
        ...prev,
        designTools: [...prev.designTools, tool.trim()]
      }));
    }
  };

	// Add design project
const addDesignProject = () => {
  setFormData(prev => ({
    ...prev,
    projects: [...prev.projects, {
      title: 'New Design Project',
      category: 'Web Design',
      client: 'Client Name',
      description: 'Project description...',
      tools: ['Figma', 'Adobe XD'],
      link: '#',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }]
  }));
};

// Remove design project
const removeDesignProject = (index) => {
  if (formData.projects.length <= 1) {
    alert('You need at least one project');
    return;
  }
  
  if (window.confirm('Delete this design project?')) {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({...formData, projects: newProjects});
  }
};

  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data matching Template2.js structure
      const portfolioData = {
        ...formData,
        templateId: 2,
        createdAt: new Date().toISOString(),
        // Ensure all required fields are present
        stats: formData.stats || { projects: '150+', satisfaction: '98%', awards: '25+' },
        processSteps: formData.processSteps || []
      };
      
      localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
      
      // Navigate to deployment guide instead
      navigate('/deploy-guide');
      
    } catch (error) {
      console.error('Error preparing portfolio:', error);
      alert('Error preparing portfolio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="template-form template2-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaPenNib /> Designer Portfolio Setup</h1>
        <p>Showcase your design work and creative process</p>
      </div>

      <div id="ai-success" className="ai-success-message">
        ✨ Design content improved with AI!
      </div>

      {/* BASIC INFO */}
      <div className="form-section">
        <h2><FaPenNib /> Designer Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Designer Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Sarah Design"
            />
          </div>
          
          <div className="form-group">
            <label>Design Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="UI/UX Designer & Creative Director"
            />
          </div>
          
          <div className="form-group">
            <label>Design Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              placeholder="Product Design & User Experience"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Designer Bio *
              <button 
                type="button"
                className="ai-improve-btn"
                onClick={() => handleAIImprovement('bio')}
                disabled={aiLoading.bio}
              >
                {aiLoading.bio ? <FaSpinner className="spinner" /> : <FaMagic />}
                Improve with AI
              </button>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              placeholder="Describe your design philosophy and experience..."
            />
          </div>
        </div>
      </div>

      {/* DESIGNER SOCIAL LINKS */}
      <div className="form-section">
        <h2>Designer Portfolio Links</h2>
        <div className="form-grid">
          <div className="form-group">
            <label><FaBehance /> Behance URL</label>
            <input
              type="url"
              value={formData.behance}
              onChange={(e) => setFormData({...formData, behance: e.target.value})}
              placeholder="https://behance.net/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaDribbble /> Dribbble URL</label>
            <input
              type="url"
              value={formData.dribbble}
              onChange={(e) => setFormData({...formData, dribbble: e.target.value})}
              placeholder="https://dribbble.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaInstagram /> Instagram</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </div>

      {/* DESIGN STATS */}
      <div className="form-section">
        <h2>Designer Statistics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Projects Completed</label>
            <input
              type="text"
              value={formData.stats.projects}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, projects: e.target.value}
              })}
              placeholder="150+"
            />
          </div>
          
          <div className="form-group">
            <label>Client Satisfaction</label>
            <input
              type="text"
              value={formData.stats.satisfaction}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, satisfaction: e.target.value}
              })}
              placeholder="98%"
            />
          </div>
          
          <div className="form-group">
            <label>Awards & Recognition</label>
            <input
              type="text"
              value={formData.stats.awards}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, awards: e.target.value}
              })}
              placeholder="25+"
            />
          </div>
        </div>
      </div>

      {/* DESIGN PROJECTS */}
<div className="form-section">
  <div className="section-header">
    <h2><FaLayerGroup /> Design Projects</h2>
    <button type="button" className="add-section-btn" onClick={addDesignProject}>
      + Add Design Project
    </button>
  </div>
  
  {formData.projects.map((project, index) => (
    <div key={index} className="design-project-card">
      <div className="card-header">
        <h3>Design Project {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removeDesignProject(index)}
          disabled={formData.projects.length <= 1}
        >
          🗑️ Remove
        </button>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Project Title *</label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].title = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="Fintech Mobile App"
          />
        </div>
        
        <div className="form-group">
          <label>Project Category</label>
          <input
            type="text"
            value={project.category}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].category = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="Mobile App Design"
          />
        </div>
        
        <div className="form-group">
          <label>Client/Company</label>
          <input
            type="text"
            value={project.client}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].client = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="Major Bank"
          />
        </div>
        
        <div className="form-group full-width">
          <label>
            Project Description *
            <button 
              type="button"
              className="ai-improve-btn"
              onClick={() => handleAIImprovement('projects', index)}
              disabled={aiLoading.projects}
            >
              {aiLoading.projects ? <FaSpinner className="spinner" /> : <FaMagic />}
              Improve with AI
            </button>
          </label>
          <textarea
            value={project.description}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].description = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            rows={3}
            placeholder="Describe the design challenge and solution..."
          />
        </div>
        
        <div className="form-group">
          <label>Design Tools Used</label>
          <input
            type="text"
            value={project.tools.join(', ')}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].tools = e.target.value.split(',').map(t => t.trim());
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="Figma, Adobe XD, Principle"
          />
        </div>
        
        <div className="form-group">
          <label>Project Link</label>
          <input
            type="url"
            value={project.link}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].link = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="https://behance.net/project"
          />
        </div>
        
        <div className="form-group">
          <label>Background Color (Gradient)</label>
          <input
            type="text"
            value={project.color}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].color = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <small>CSS gradient for project card</small>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* DESIGN PROCESS */}
      <div className="form-section">
        <h2>Design Process</h2>
        <p className="section-subtitle">Template shows 4 steps with step numbers, titles, and descriptions</p>
        
        <div className="design-process-grid">
          {formData.processSteps.map((step, index) => (
            <div key={index} className="process-step-form">
              <div className="form-grid compact">
                <div className="form-group">
                  <label>Step Number</label>
                  <input
                    type="text"
                    value={step.step}
                    onChange={(e) => {
                      const newSteps = [...formData.processSteps];
                      newSteps[index].step = e.target.value;
                      setFormData({...formData, processSteps: newSteps});
                    }}
                    placeholder="01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Step Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const newSteps = [...formData.processSteps];
                      newSteps[index].title = e.target.value;
                      setFormData({...formData, processSteps: newSteps});
                    }}
                    placeholder="Discover"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Step Description</label>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...formData.processSteps];
                      newSteps[index].description = e.target.value;
                      setFormData({...formData, processSteps: newSteps});
                    }}
                    placeholder="User research & analysis"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESIGN TOOLS */}
      <div className="form-section">
        <h2><FaFigma /> Design Tools & Skills</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Design Tools</label>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add design tool (Figma, Sketch...)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addDesignTool(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="skills-list">
              {formData.designTools.map((tool, index) => (
                <span key={index} className="skill-tag design-tool">
                  {tool}
                  <button onClick={() => {
                    const newTools = formData.designTools.filter((_, i) => i !== index);
                    setFormData({...formData, designTools: newTools});
                  }}>×</button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>Design Methodologies</label>
            <input
              type="text"
              value={formData.methodologies.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                methodologies: e.target.value.split(',').map(m => m.trim())
              })}
              placeholder="Design Thinking, User-Centered Design"
            />
          </div>
        </div>
      </div>

      {/* EMAILJS & DEPLOYMENT */}
      <div className="form-section">
        <h2>Contact & Launch</h2>
        <EmailJSSetup />
        
        <div className="form-grid">
          <div className="form-group">
            <label>Portfolio Username</label>
            <input
              type="text"
              value={formData.deployment.username}
              onChange={(e) => setFormData({
                ...formData, 
                deployment: {...formData.deployment, username: e.target.value}
              })}
              placeholder="sarahdesign"
            />
            <small>Will create: username-designportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Design Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'design'}-designportfolio.vercel.app`}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="form-actions">
       <button 
  className="preview-btn"
  onClick={() => {
    localStorage.setItem('portfolio_data', JSON.stringify({
      ...formData,
      templateId: 2
    }));
    navigate('/preview/2'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview UI/UX Designer Portfolio
</button>
        
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '🎨 Launch Design Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template2Form;