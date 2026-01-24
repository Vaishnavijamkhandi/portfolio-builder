import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaSpinner, FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaCloud, FaDatabase } from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template1Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info (EXACTLY as shown in template)
    name: 'Alex Chen',
    jobTitle: 'Full-Stack Developer',
    tagline: 'Building scalable solutions with React, Node.js, and AWS',
    location: 'San Francisco, CA',
    email: 'alex@devportfolio.com',
    phone: '+1 (555) 123-4567',
    bio: `Passionate software engineer with 5+ years of experience building 
          high-performance web applications. Specialized in microservices architecture, 
          real-time systems, and cloud infrastructure.`,
    availability: 'Open to Opportunities',
    
    // Social Links (EXACTLY as shown)
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    
    // Tech Stack (EXACT arrays as in template)
    frontend: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Express', 'GraphQL', 'REST APIs'],
    devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    databases: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch'],
    
    // Projects (EXACTLY 2 projects as in template)
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
        badge: 'LIVE',
        stats: { users: '10K+', uptime: '99.9%' }
      },
      {
        title: 'Task Management API',
        description: 'Scalable task management system with real-time updates, team collaboration, and analytics.',
        technologies: ['TypeScript', 'NestJS', 'PostgreSQL', 'Socket.io'],
        liveUrl: '#',
        githubUrl: '#',
        badge: 'OPEN SOURCE',
        stats: { stars: '500+', downloads: '2K+' }
      }
    ],
    
    // Experience (EXACTLY as in template)
    experiences: [
      {
        period: '2022 - Present',
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco',
        bullets: [
          'Led development of microservices architecture serving 1M+ users',
          'Improved system performance by 40% through optimization',
          'Mentored 5 junior developers'
        ]
      },
      {
        period: '2020 - 2022',
        title: 'Full Stack Developer',
        company: 'StartUpXYZ',
        location: 'Remote',
        bullets: [
          'Built MVP from scratch to 10K users',
          'Implemented CI/CD pipeline reducing deployment time by 70%',
          'Integrated third-party APIs and payment systems'
        ]
      }
    ],
    
    // Education (EXACTLY as in template - object not array)
    education: {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      period: '2018 - 2020',
      specialization: 'Specialization in Distributed Systems and Cloud Computing'
    },
    
    // Certifications (EXACTLY as in template)
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Kubernetes Administrator'],
    
    // Stats (EXACTLY as in template)
    stats: {
      projects: '50+',
      years: '5',
      uptime: '99%'
    },
    
    // EmailJS Configuration (User fills this)
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'alex@devportfolio.com'
    },
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'alexchen'
    }
  });
	
  // AI Improvement Function
  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `Software Developer portfolio, specializing in ${formData.jobTitle}`;
      
      if (index !== null) {
        // For array fields (projects, experiences)
        if (field === 'projects') {
          improvedText = await improveWithAI('project', formData.projects[index].description, 1, {
            name: formData.name,
            title: formData.jobTitle
          });
          
          const newProjects = [...formData.projects];
          newProjects[index].description = improvedText;
          setFormData({...formData, projects: newProjects});
        }
        else if (field === 'experiences') {
          // Improve experience bullets
          const newExperiences = [...formData.experiences];
          for (let i = 0; i < newExperiences[index].bullets.length; i++) {
            improvedText = await improveWithAI('experience', newExperiences[index].bullets[i], 1, {
              name: formData.name,
              title: newExperiences[index].title
            });
            newExperiences[index].bullets[i] = improvedText;
          }
          setFormData({...formData, experiences: newExperiences});
        }
      } else {
        // For single fields
        improvedText = await improveWithAI(field, formData[field], 1, {
          name: formData.name,
          title: formData.jobTitle
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
      alert('AI improvement failed. Using fallback improvements.');
    } finally {
      setAiLoading({ [field]: false });
    }
  };

  // Add Tech Skill
  const addTechSkill = (category, skill) => {
    if (skill.trim()) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], skill.trim()]
      }));
    }
  };

  // Remove Tech Skill
  const removeTechSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

	// Add new project
const addNewProject = () => {
  setFormData(prev => ({
    ...prev,
    projects: [...prev.projects, {
      title: 'New Project',
      description: 'Describe your project here...',
      technologies: ['React', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      badge: 'PROJECT',
      stats: { users: '0', uptime: '0%' }
    }]
  }));
};

// Remove project
const removeProject = (index) => {
  if (formData.projects.length <= 1) {
    alert('You need at least one project');
    return;
  }
  
  if (window.confirm('Delete this project?')) {
    const newProjects = [...formData.projects];
    newProjects.splice(index, 1);
    setFormData({...formData, projects: newProjects});
  }
};

// Add new experience
const addNewExperience = () => {
  setFormData(prev => ({
    ...prev,
    experiences: [...prev.experiences, {
      period: 'YYYY - Present',
      title: 'Job Title',
      company: 'Company Name',
      location: 'Location',
      bullets: ['Responsibility 1', 'Responsibility 2']
    }]
  }));
};

// Remove experience
const removeExperience = (index) => {
  if (formData.experiences.length <= 1) {
    alert('You need at least one experience');
    return;
  }
  
  if (window.confirm('Delete this experience entry?')) {
    const newExperiences = [...formData.experiences];
    newExperiences.splice(index, 1);
    setFormData({...formData, experiences: newExperiences});
  }
};

  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Save data first - ensure proper structure for Template1
      const portfolioData = {
        ...formData,
        templateId: 1,
        createdAt: new Date().toISOString(),
        // Template expects 'jobTitle' but also uses 'title' in some places
        title: formData.jobTitle,
        // Ensure availability is set
        availability: formData.availability || 'Open to Opportunities'
      };
      
      localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
      
      // Navigate to deployment guide instead of trying to deploy
      navigate('/deploy-guide');
      
    } catch (error) {
      console.error('Error preparing portfolio:', error);
      alert('Error preparing portfolio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="template-form template1-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaCode /> Developer Portfolio Setup</h1>
        <p>Fill in all details exactly as you want them on your portfolio</p>
      </div>

      {/* AI Success Message */}
      <div id="ai-success" className="ai-success-message">
        ✨ Content improved with AI!
      </div>

      {/* BASIC INFO SECTION */}
      <div className="form-section">
        <h2>Basic Information</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Alex Chen"
            />
          </div>
          
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              placeholder="Full-Stack Developer"
            />
          </div>
          
          <div className="form-group">
            <label>Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              placeholder="Building scalable solutions with React, Node.js, and AWS"
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="San Francisco, CA"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="alex@devportfolio.com"
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="form-group">
            <label>Availability Status</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              placeholder="Open to Opportunities"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Professional Bio *
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
              rows={4}
              placeholder="Describe your experience and skills..."
            />
          </div>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="form-section">
        <h2>Social Links</h2>
        <div className="form-grid">
          <div className="form-group">
            <label><FaGithub /> GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({...formData, github: e.target.value})}
              placeholder="https://github.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaTwitter /> Twitter URL</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => setFormData({...formData, twitter: e.target.value})}
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </div>

      {/* TECH STACK */}
      <div className="form-section">
        <h2>Tech Stack</h2>
        
        <div className="tech-categories">
          {/* Frontend */}
          <div className="tech-category">
            <h3><FaCode /> Frontend</h3>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add skill (React, Vue, Angular...)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTechSkill('frontend', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="skills-list">
              {formData.frontend.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button onClick={() => removeTechSkill('frontend', index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="tech-category">
            <h3><FaServer /> Backend</h3>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add skill (Node.js, Python, Java...)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTechSkill('backend', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="skills-list">
              {formData.backend.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button onClick={() => removeTechSkill('backend', index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="tech-category">
            <h3><FaCloud /> DevOps</h3>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add skill (AWS, Docker, Kubernetes...)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTechSkill('devops', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="skills-list">
              {formData.devops.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button onClick={() => removeTechSkill('devops', index)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="tech-category">
            <h3><FaDatabase /> Databases</h3>
            <div className="skills-input">
              <input
                type="text"
                placeholder="Add database (MongoDB, PostgreSQL...)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTechSkill('databases', e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="skills-list">
              {formData.databases.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button onClick={() => removeTechSkill('databases', index)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

{/* PROJECTS */}
<div className="form-section">
  <div className="section-header">
    <h2>Projects</h2>
    <button type="button" className="add-section-btn" onClick={addNewProject}>
      + Add Project
    </button>
  </div>
  
  {formData.projects.map((project, index) => (
    <div key={index} className="project-card-form">
      <div className="card-header">
        <h3>Project {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removeProject(index)}
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
            placeholder="E-Commerce Platform"
          />
        </div>
        
        <div className="form-group">
          <label>Badge Type</label>
          <select
            value={project.badge}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].badge = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
          >
            <option value="LIVE">Live Project</option>
            <option value="OPEN SOURCE">Open Source</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>
        
        <div className="form-group full-width">
          <label>
            Description *
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
            placeholder="Describe your project..."
          />
        </div>
        
        <div className="form-group">
          <label>Technologies (comma separated)</label>
          <input
            type="text"
            value={project.technologies.join(', ')}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].technologies = e.target.value.split(',').map(t => t.trim());
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        
        <div className="form-group">
          <label>Live Demo URL</label>
          <input
            type="url"
            value={project.liveUrl}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].liveUrl = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="https://demo-project.com"
          />
        </div>
        
        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            value={project.githubUrl}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              newProjects[index].githubUrl = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="https://github.com/username/project"
          />
        </div>
        
        <div className="form-group">
          <label>Stats - First Value</label>
          <input
            type="text"
            value={Object.values(project.stats)[0]}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              const key = Object.keys(project.stats)[0];
              newProjects[index].stats[key] = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="10K+"
          />
          <small>{Object.keys(project.stats)[0]}</small>
        </div>
        
        <div className="form-group">
          <label>Stats - Second Value</label>
          <input
            type="text"
            value={Object.values(project.stats)[1]}
            onChange={(e) => {
              const newProjects = [...formData.projects];
              const key = Object.keys(project.stats)[1];
              newProjects[index].stats[key] = e.target.value;
              setFormData({...formData, projects: newProjects});
            }}
            placeholder="99.9%"
          />
          <small>{Object.keys(project.stats)[1]}</small>
        </div>
      </div>
    </div>
  ))}
</div>

    {/* EXPERIENCE */}
<div className="form-section">
  <div className="section-header">
    <h2>Work Experience</h2>
    <button type="button" className="add-section-btn" onClick={addNewExperience}>
      + Add Experience
    </button>
  </div>
  
  {formData.experiences.map((exp, index) => (
    <div key={index} className="experience-card-form">
      <div className="card-header">
        <h3>Experience {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removeExperience(index)}
          disabled={formData.experiences.length <= 1}
        >
          🗑️ Remove
        </button>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            value={exp.title}
            onChange={(e) => {
              const newExps = [...formData.experiences];
              newExps[index].title = e.target.value;
              setFormData({...formData, experiences: newExps});
            }}
            placeholder="Senior Software Engineer"
          />
        </div>
        
        <div className="form-group">
          <label>Company *</label>
          <input
            type="text"
            value={exp.company}
            onChange={(e) => {
              const newExps = [...formData.experiences];
              newExps[index].company = e.target.value;
              setFormData({...formData, experiences: newExps});
            }}
            placeholder="TechCorp Inc."
          />
        </div>
        
        <div className="form-group">
          <label>Period</label>
          <input
            type="text"
            value={exp.period}
            onChange={(e) => {
              const newExps = [...formData.experiences];
              newExps[index].period = e.target.value;
              setFormData({...formData, experiences: newExps});
            }}
            placeholder="2022 - Present"
          />
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={exp.location}
            onChange={(e) => {
              const newExps = [...formData.experiences];
              newExps[index].location = e.target.value;
              setFormData({...formData, experiences: newExps});
            }}
            placeholder="San Francisco"
          />
        </div>
        
        <div className="form-group full-width">
          <label>
            Responsibilities *
            <button 
              type="button"
              className="ai-improve-btn"
              onClick={() => handleAIImprovement('experiences', index)}
              disabled={aiLoading.experiences}
            >
              {aiLoading.experiences ? <FaSpinner className="spinner" /> : <FaMagic />}
              Improve with AI
            </button>
          </label>
          {exp.bullets.map((bullet, bulletIndex) => (
            <input
              key={bulletIndex}
              type="text"
              value={bullet}
              onChange={(e) => {
                const newExps = [...formData.experiences];
                newExps[index].bullets[bulletIndex] = e.target.value;
                setFormData({...formData, experiences: newExps});
              }}
              placeholder="Led development of microservices architecture..."
              className="bullet-input"
            />
          ))}
          <button 
            className="add-bullet-btn"
            onClick={() => {
              const newExps = [...formData.experiences];
              newExps[index].bullets.push('');
              setFormData({...formData, experiences: newExps});
            }}
          >
            + Add Another Bullet
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* EDUCATION */}
      <div className="form-section">
        <h2>Education</h2>
        
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
              placeholder="Master of Science in Computer Science"
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
              placeholder="Stanford University"
            />
          </div>
          
          <div className="form-group">
            <label>Period</label>
            <input
              type="text"
              value={formData.education.period}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, period: e.target.value}
              })}
              placeholder="2018 - 2020"
            />
          </div>
          
          <div className="form-group full-width">
            <label>Specialization</label>
            <input
              type="text"
              value={formData.education.specialization}
              onChange={(e) => setFormData({
                ...formData,
                education: {...formData.education, specialization: e.target.value}
              })}
              placeholder="Specialization in Distributed Systems and Cloud Computing"
            />
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="form-section">
        <h2>Certifications</h2>
        <div className="form-group full-width">
          <label>Certifications (comma separated)</label>
          <input
            type="text"
            value={formData.certifications.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              certifications: e.target.value.split(',').map(c => c.trim())
            })}
            placeholder="AWS Solutions Architect, Google Cloud Professional, Kubernetes Administrator"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="form-section">
        <h2>Statistics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Projects Count</label>
            <input
              type="text"
              value={formData.stats.projects}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, projects: e.target.value}
              })}
              placeholder="50+"
            />
          </div>
          
          <div className="form-group">
            <label>Years Experience</label>
            <input
              type="text"
              value={formData.stats.years}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, years: e.target.value}
              })}
              placeholder="5"
            />
          </div>
          
          <div className="form-group">
            <label>Uptime/Other Stat</label>
            <input
              type="text"
              value={formData.stats.uptime}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, uptime: e.target.value}
              })}
              placeholder="99%"
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
              placeholder="alexchen"
            />
            <small>Will create: username-devportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Developer Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'dev'}-devportfolio.vercel.app`}
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
      templateId: 1
    }));
    navigate('/preview/1'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview Software Developer Portfolio
</button>
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '🚀 Launch Developer Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template1Form;