import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMagic, FaSpinner, FaPython, FaChartLine, FaDatabase, 
  FaBrain, FaGraduationCap, FaFileAlt, FaKaggle, FaGithub, FaLinkedin
} from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template3Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Data Scientist Info
    name: 'Dr. James Wilson',
    title: 'Data Scientist & ML Engineer',
    tagline: 'Transforming Data Into Actionable Insights',
    specialization: 'Predictive Analytics & AI Solutions',
    location: 'Boston, MA',
    email: 'james@datascience.com',
    bio: `Data Scientist & Machine Learning Engineer specializing in 
          predictive analytics and AI solutions with 5+ years of research experience.`,
    
    // Data Scientist Links
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    kaggle: 'https://kaggle.com',
    researchgate: 'https://researchgate.net',
    
    // Data Science Metrics
    metrics: {
      accuracy: '94.3%',
      papers: '15+',
      dataProcessed: '5TB'
    },
    
    // Technical Skills
    programming: ['Python', 'R', 'SQL', 'Spark'],
    mlFrameworks: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost'],
    visualization: ['Matplotlib', 'Seaborn', 'Tableau', 'Power BI'],
    bigData: ['Hadoop', 'Spark', 'Hive', 'AWS SageMaker'],
    
    // Research Projects
    researchProjects: [
      {
        title: 'Predictive Maintenance',
        description: 'ML model predicting equipment failures with 92% accuracy',
        techniques: ['Time Series Analysis', 'Random Forest', 'LSTM'],
        metrics: { accuracy: '92%', auc: '0.89' },
        tools: ['Python', 'TensorFlow', 'Scikit-learn']
      }
    ],
    
    // Publications (Added for template)
    publications: [
      {
        title: 'Deep Learning for Anomaly Detection',
        journal: 'Journal of Machine Learning Research',
        year: '2023',
        link: '#'
      }
    ],
    
    // Education (Template expects object with specific fields)
    education: {
      degree: 'PhD in Computer Science',
      institution: 'MIT',
      specialization: 'Machine Learning & AI',
      year: '2020'
    },
    
    // EmailJS
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'james@datascience.com'
    },
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'jameswilson'
    }
  });

  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `Data Scientist portfolio, specializing in ${formData.specialization}`;
      
      if (index !== null && field === 'researchProjects') {
        improvedText = await improveWithAI('researchProject', formData.researchProjects[index].description, 3, {
          name: formData.name,
          title: formData.title
        });
        
        const newProjects = [...formData.researchProjects];
        newProjects[index].description = improvedText;
        setFormData({...formData, researchProjects: newProjects});
      } else {
        improvedText = await improveWithAI(field, formData[field], 3, {
          name: formData.name,
          title: formData.title
        });
        setFormData({...formData, [field]: improvedText});
      }
      
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

// Add research project
const addResearchProject = () => {
  setFormData(prev => ({
    ...prev,
    researchProjects: [...prev.researchProjects, {
      title: 'New Research Project',
      description: 'Research description...',
      techniques: ['Machine Learning', 'Data Analysis'],
      metrics: { accuracy: '0%', auc: '0.00' },
      tools: ['Python', 'TensorFlow']
    }]
  }));
};

// Remove research project
const removeResearchProject = (index) => {
  if (formData.researchProjects.length <= 1) {
    alert('You need at least one research project');
    return;
  }
  
  if (window.confirm('Delete this research project?')) {
    const newProjects = [...formData.researchProjects];
    newProjects.splice(index, 1);
    setFormData({...formData, researchProjects: newProjects});
  }
};

// Add publication
const addPublication = () => {
  setFormData(prev => ({
    ...prev,
    publications: [...prev.publications, {
      title: 'New Publication',
      journal: 'Journal Name',
      year: '2024',
      link: '#'
    }]
  }));
};

// Remove publication
const removePublication = (index) => {
  if (formData.publications.length <= 1) {
    alert('You need at least one publication');
    return;
  }
  
  if (window.confirm('Delete this publication?')) {
    const newPubs = [...formData.publications];
    newPubs.splice(index, 1);
    setFormData({...formData, publications: newPubs});
  }
};

  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data matching Template3.js structure
      const portfolioData = {
        ...formData,
        templateId: 3,
        createdAt: new Date().toISOString(),
        // Add fields that Template3.js expects but aren't in form
        programming: formData.programming || ['Python', 'R', 'SQL', 'Spark'],
        mlFrameworks: formData.mlFrameworks || ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost'],
        visualization: formData.visualization || ['Matplotlib', 'Seaborn', 'Tableau', 'Power BI']
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
    <div className="template-form template3-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaChartLine /> Data Science Portfolio Setup</h1>
        <p>Showcase your research, models, and data insights</p>
      </div>

      <div id="ai-success" className="ai-success-message">
        ✨ Research content improved with AI!
      </div>

      {/* BASIC INFO */}
      <div className="form-section">
        <h2><FaBrain /> Data Scientist Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Dr. James Wilson"
            />
          </div>
          
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Data Scientist & ML Engineer"
            />
          </div>
          
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
              placeholder="Predictive Analytics & AI Solutions"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Research Bio *
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
              placeholder="Describe your research focus and data science expertise..."
            />
          </div>
        </div>
      </div>

      {/* DATA SCIENCE LINKS */}
      <div className="form-section">
        <h2>Research & Data Links</h2>
        <div className="form-grid">
          <div className="form-group">
            <label><FaKaggle /> Kaggle Profile</label>
            <input
              type="url"
              value={formData.kaggle}
              onChange={(e) => setFormData({...formData, kaggle: e.target.value})}
              placeholder="https://kaggle.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaGithub /> GitHub (Code)</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              placeholder="https://github.com/username"
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
            <label><FaFileAlt /> ResearchGate</label>
            <input
              type="url"
              value={formData.researchgate}
              onChange={(e) => setFormData({...formData, researchgate: e.target.value})}
              placeholder="https://researchgate.net/profile"
            />
          </div>
        </div>
      </div>

      {/* DATA SCIENCE METRICS */}
      <div className="form-section">
        <h2>Research Metrics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Model Accuracy</label>
            <input
              type="text"
              value={formData.metrics.accuracy}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, accuracy: e.target.value}
              })}
              placeholder="94.3%"
            />
          </div>
          
          <div className="form-group">
            <label>Research Papers</label>
            <input
              type="text"
              value={formData.metrics.papers}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, papers: e.target.value}
              })}
              placeholder="15+"
            />
          </div>
          
          <div className="form-group">
            <label>Data Processed</label>
            <input
              type="text"
              value={formData.metrics.dataProcessed}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, dataProcessed: e.target.value}
              })}
              placeholder="5TB"
            />
          </div>
        </div>
      </div>

      {/* TECHNICAL SKILLS */}
      <div className="form-section">
        <h2><FaPython /> Data Science Skills</h2>
        
        <div className="skills-categories">
          <div className="skill-category">
            <h3><FaPython /> Programming</h3>
            <input
              type="text"
              value={formData.programming.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                programming: e.target.value.split(',').map(s => s.trim())
              })}
              placeholder="Python, R, SQL, Spark"
            />
          </div>
          
          <div className="skill-category">
            <h3><FaBrain /> ML Frameworks</h3>
            <input
              type="text"
              value={formData.mlFrameworks.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                mlFrameworks: e.target.value.split(',').map(s => s.trim())
              })}
              placeholder="TensorFlow, PyTorch, Scikit-learn"
            />
          </div>
          
          <div className="skill-category">
            <h3><FaChartLine /> Visualization</h3>
            <input
              type="text"
              value={formData.visualization.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                visualization: e.target.value.split(',').map(s => s.trim())
              })}
              placeholder="Matplotlib, Seaborn, Tableau"
            />
          </div>
          
          <div className="skill-category">
            <h3><FaDatabase /> Big Data Tools</h3>
            <input
              type="text"
              value={formData.bigData.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                bigData: e.target.value.split(',').map(s => s.trim())
              })}
              placeholder="Hadoop, Spark, Hive, AWS SageMaker"
            />
          </div>
        </div>
      </div>
{/* RESEARCH PROJECTS */}
<div className="form-section">
  <div className="section-header">
    <h2><FaFileAlt /> Research Projects</h2>
    <button type="button" className="add-section-btn" onClick={addResearchProject}>
      + Add Research Project
    </button>
  </div>
  
  {formData.researchProjects.map((project, index) => (
    <div key={index} className="research-project-card">
      <div className="card-header">
        <h3>Research Project {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removeResearchProject(index)}
          disabled={formData.researchProjects.length <= 1}
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
              const newProjects = [...formData.researchProjects];
              newProjects[index].title = e.target.value;
              setFormData({...formData, researchProjects: newProjects});
            }}
            placeholder="Predictive Maintenance"
          />
        </div>
        
        <div className="form-group full-width">
          <label>
            Research Description *
            <button 
              type="button"
              className="ai-improve-btn"
              onClick={() => handleAIImprovement('researchProjects', index)}
              disabled={aiLoading.researchProjects}
            >
              {aiLoading.researchProjects ? <FaSpinner className="spinner" /> : <FaMagic />}
              Improve with AI
            </button>
          </label>
          <textarea
            value={project.description}
            onChange={(e) => {
              const newProjects = [...formData.researchProjects];
              newProjects[index].description = e.target.value;
              setFormData({...formData, researchProjects: newProjects});
            }}
            rows={3}
            placeholder="Describe your research methodology and findings..."
          />
        </div>
        
        <div className="form-group">
          <label>ML Techniques Used</label>
          <input
            type="text"
            value={project.techniques.join(', ')}
            onChange={(e) => {
              const newProjects = [...formData.researchProjects];
              newProjects[index].techniques = e.target.value.split(',').map(t => t.trim());
              setFormData({...formData, researchProjects: newProjects});
            }}
            placeholder="Time Series Analysis, Random Forest, LSTM"
          />
        </div>
        
        <div className="form-group">
          <label>Tools & Technologies</label>
          <input
            type="text"
            value={project.tools.join(', ')}
            onChange={(e) => {
              const newProjects = [...formData.researchProjects];
              newProjects[index].tools = e.target.value.split(',').map(t => t.trim());
              setFormData({...formData, researchProjects: newProjects});
            }}
            placeholder="Python, TensorFlow, Scikit-learn"
          />
        </div>
        
        <div className="form-group">
          <label>Model Accuracy</label>
          <input
            type="text"
            value={project.metrics.accuracy}
            onChange={(e) => {
              const newProjects = [...formData.researchProjects];
              newProjects[index].metrics.accuracy = e.target.value;
              setFormData({...formData, researchProjects: newProjects});
            }}
            placeholder="92%"
          />
        </div>
        
        <div className="form-group">
          <label>AUC Score</label>
          <input
            type="text"
            value={project.metrics.auc}
            onChange={(e) => {
              const newProjects = [...formData.researchProjects];
              newProjects[index].metrics.auc = e.target.value;
              setFormData({...formData, researchProjects: newProjects});
            }}
            placeholder="0.89"
          />
        </div>
      </div>
    </div>
  ))}
</div>    {/* PUBLICATIONS */}
<div className="form-section">
  <div className="section-header">
    <h2>Research Publications</h2>
    <button type="button" className="add-section-btn" onClick={addPublication}>
      + Add Publication
    </button>
  </div>
  
  {formData.publications.map((pub, index) => (
    <div key={index} className="publication-card">
      <div className="card-header">
        <h3>Publication {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removePublication(index)}
          disabled={formData.publications.length <= 1}
        >
          🗑️ Remove
        </button>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Publication Title *</label>
          <input
            type="text"
            value={pub.title}
            onChange={(e) => {
              const newPubs = [...formData.publications];
              newPubs[index].title = e.target.value;
              setFormData({...formData, publications: newPubs});
            }}
            placeholder="Deep Learning for Anomaly Detection"
          />
        </div>
        
        <div className="form-group">
          <label>Journal/Conference</label>
          <input
            type="text"
            value={pub.journal}
            onChange={(e) => {
              const newPubs = [...formData.publications];
              newPubs[index].journal = e.target.value;
              setFormData({...formData, publications: newPubs});
            }}
            placeholder="Journal of Machine Learning Research"
          />
        </div>
        
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            value={pub.year}
            onChange={(e) => {
              const newPubs = [...formData.publications];
              newPubs[index].year = e.target.value;
              setFormData({...formData, publications: newPubs});
            }}
            placeholder="2023"
          />
        </div>
        
        <div className="form-group">
          <label>Publication Link</label>
          <input
            type="url"
            value={pub.link}
            onChange={(e) => {
              const newPubs = [...formData.publications];
              newPubs[index].link = e.target.value;
              setFormData({...formData, publications: newPubs});
            }}
            placeholder="https://arxiv.org/abs/..."
          />
        </div>
      </div>
    </div>
  ))}
</div>

      {/* EDUCATION */}
      <div className="form-section">
        <h2><FaGraduationCap /> Education</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              value={formData.education.degree}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, degree: e.target.value}
              })}
              placeholder="PhD in Computer Science"
            />
          </div>
          
          <div className="form-group">
            <label>Institution *</label>
            <input
              type="text"
              value={formData.education.institution}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, institution: e.target.value}
              })}
              placeholder="MIT"
            />
          </div>
          
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              value={formData.education.specialization}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, specialization: e.target.value}
              })}
              placeholder="Machine Learning & AI"
            />
          </div>
          
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              value={formData.education.year}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, year: e.target.value}
              })}
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      {/* EMAILJS & DEPLOYMENT */}
      <div className="form-section">
        <h2>Contact & Deployment</h2>
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
              placeholder="jameswilson"
            />
            <small>Will create: username-dataportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Data Science Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'data'}-dataportfolio.vercel.app`}
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
      templateId: 3
    }));
    navigate('/preview/3'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview Data Scientist Portfolio
</button>
        
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '📊 Launch Data Science Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template3Form;