import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaSpinner, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEye, FaRocket, FaUndo, FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaCloud, FaDatabase, FaSave } from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';

const Template7Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Initial form data structure
  const [formData, setFormData] = useState({
    // Basic Info (like Template1)
    name: 'Alex Chen',
    jobTitle: 'Full-Stack Developer',
    tagline: 'Building scalable solutions with React, Node.js, and AWS',
    location: 'San Francisco, CA',
    email: 'alex@devportfolio.com',
    phone: '+1 (555) 123-4567',
    bio: `Passionate software engineer with 5+ years of experience building high-performance web applications. Specialized in microservices architecture, real-time systems, and cloud infrastructure.`,
    availability: 'Open to Opportunities',
    
    // Social Links
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username',
    
    // Modular Sections System
    sections: [
      {
        id: 'tech-stack',
        title: 'Tech Stack',
        type: 'tech-stack',
        enabled: true,
        order: 1,
        data: {
          frontend: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
          backend: ['Node.js', 'Python', 'Express', 'GraphQL', 'REST APIs'],
          devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
          databases: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch']
        }
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'projects',
        enabled: true,
        order: 2,
        data: [
          {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            liveUrl: 'https://demo-ecommerce.com',
            githubUrl: 'https://github.com/username/ecommerce',
            badge: 'LIVE',
            stats: { users: '10K+', uptime: '99.9%' }
          },
          {
            title: 'Task Management API',
            description: 'Scalable task management system with real-time updates, team collaboration, and analytics.',
            technologies: ['TypeScript', 'NestJS', 'PostgreSQL', 'Socket.io'],
            liveUrl: '#',
            githubUrl: 'https://github.com/username/task-api',
            badge: 'OPEN SOURCE',
            stats: { stars: '500+', downloads: '2K+' }
          }
        ]
      },
      {
        id: 'experience',
        title: 'Experience',
        type: 'experience',
        enabled: true,
        order: 3,
        data: [
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
        ]
      },
      {
        id: 'education',
        title: 'Education',
        type: 'education',
        enabled: true,
        order: 4,
        data: {
          degree: 'Master of Science in Computer Science',
          institution: 'Stanford University',
          period: '2018 - 2020',
          specialization: 'Specialization in Distributed Systems and Cloud Computing'
        }
      },
      {
        id: 'certifications',
        title: 'Certifications',
        type: 'certifications',
        enabled: true,
        order: 5,
        data: ['AWS Solutions Architect', 'Google Cloud Professional', 'Kubernetes Administrator']
      },
      {
        id: 'stats',
        title: 'Statistics',
        type: 'stats',
        enabled: true,
        order: 6,
        data: { projects: '50+', years: '5', uptime: '99%' }
      }
    ],
    
    // EmailJS Configuration
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

  // Load AI data if available
  useEffect(() => {
    const aiData = localStorage.getItem('aiPortfolioData');
    if (aiData) {
      try {
        const parsedData = JSON.parse(aiData);
        
        setFormData(prev => ({
          ...prev,
          name: parsedData.name || prev.name,
          jobTitle: parsedData.profession || prev.jobTitle,
          email: parsedData.email || prev.email,
          phone: parsedData.phone || prev.phone,
          location: parsedData.location || prev.location,
          bio: parsedData.summary || prev.bio,
          
          // Update tech stack section with AI skills
          sections: prev.sections.map(section => 
            section.id === 'tech-stack' 
              ? {
                  ...section,
                  data: {
                    ...section.data,
                    frontend: parsedData.skills?.slice(0, 5) || section.data.frontend
                  }
                }
              : section
          )
        }));
        
        // Clear AI data after loading
        localStorage.removeItem('aiPortfolioData');
        
        // Show success message
        setTimeout(() => {
          const successMsg = document.getElementById('ai-load-success');
          if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => {
              successMsg.style.display = 'none';
            }, 3000);
          }
        }, 500);
        
      } catch (error) {
        console.error('Error loading AI data:', error);
      }
    }
  }, []);

  // AI Improvement Function
  const handleAIImprovement = async (field, value, index = null, sectionId = null) => {
    setAiLoading(prev => ({ ...prev, [field]: true }));
    
    try {
      const improvedText = await improveWithAI(field, value, 1, {
        name: formData.name,
        title: formData.jobTitle
      });
      
      if (sectionId) {
        // Update section data
        setFormData(prev => ({
          ...prev,
          sections: prev.sections.map(section => {
            if (section.id === sectionId) {
              if (section.type === 'projects') {
                const newProjects = [...section.data];
                newProjects[index].description = improvedText;
                return { ...section, data: newProjects };
              } else if (section.type === 'experience') {
                const newExperiences = [...section.data];
                newExperiences[index].bullets = newExperiences[index].bullets.map(bullet => 
                  bullet === value ? improvedText : bullet
                );
                return { ...section, data: newExperiences };
              }
            }
            return section;
          })
        }));
      } else {
        // Update basic info
        setFormData(prev => ({ ...prev, [field]: improvedText }));
      }
      
      // Show success message
      const successMsg = document.getElementById('ai-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3000);
      }
      
    } catch (error) {
      console.error('AI improvement failed:', error);
      alert('AI improvement failed. Please try again.');
    } finally {
      setAiLoading(prev => ({ ...prev, [field]: false }));
    }
  };

  // Handle basic form changes
  const handleBasicChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Section Management
  const toggleSection = (sectionId) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
    }));
  };

  const moveSection = (sectionId, direction) => {
    setFormData(prev => {
      const sections = [...prev.sections];
      const index = sections.findIndex(s => s.id === sectionId);
      
      if ((direction === 'up' && index > 0) || (direction === 'down' && index < sections.length - 1)) {
        const newIndex = direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : index;
        [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
        
        // Update order
        return {
          ...prev,
          sections: sections.map((section, idx) => ({ ...section, order: idx + 1 }))
        };
      }
      return prev;
    });
  };

  const removeSection = (sectionId) => {
    if (formData.sections.length <= 1) {
      alert('You need at least one section');
      return;
    }
    
    if (window.confirm('Are you sure you want to remove this section?')) {
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.filter(s => s.id !== sectionId).map((section, idx) => ({ 
          ...section, 
          order: idx + 1 
        }))
      }));
    }
  };

  // Add new section
  const addNewSection = (sectionType) => {
    const sectionTemplates = {
      'project': {
        id: `project-${Date.now()}`,
        title: 'New Project',
        type: 'projects',
        enabled: true,
        order: formData.sections.length + 1,
        data: [{
          title: 'New Project',
          description: 'Describe your project here...',
          technologies: ['React', 'Node.js'],
          liveUrl: '#',
          githubUrl: '#',
          badge: 'PROJECT',
          stats: { users: '0', uptime: '0%' }
        }]
      },
      'experience': {
        id: `experience-${Date.now()}`,
        title: 'New Experience',
        type: 'experience',
        enabled: true,
        order: formData.sections.length + 1,
        data: [{
          period: 'YYYY - Present',
          title: 'Job Title',
          company: 'Company Name',
          location: 'Location',
          bullets: ['Responsibility 1', 'Responsibility 2']
        }]
      },
      'certification': {
        id: `certification-${Date.now()}`,
        title: 'Certifications',
        type: 'certifications',
        enabled: true,
        order: formData.sections.length + 1,
        data: ['New Certification']
      },
      'tech-stack': {
        id: `tech-stack-${Date.now()}`,
        title: 'Tech Stack',
        type: 'tech-stack',
        enabled: true,
        order: formData.sections.length + 1,
        data: {
          frontend: ['Skill 1', 'Skill 2'],
          backend: ['Skill 1', 'Skill 2'],
          devops: ['Skill 1', 'Skill 2'],
          databases: ['Skill 1', 'Skill 2']
        }
      }
    };

    if (sectionTemplates[sectionType]) {
      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, sectionTemplates[sectionType]]
      }));
    }
  };

  // Update section data
  const updateSectionData = (sectionId, newData) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, data: newData } : section
      )
    }));
  };

  // Add/remove items in array sections
  const addArrayItem = (sectionId, template) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, data: [...section.data, template] }
          : section
      )
    }));
  };

  const removeArrayItem = (sectionId, index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { 
              ...section, 
              data: section.data.filter((_, i) => i !== index) 
            }
          : section
      )
    }));
  };

  // Render section editor based on type
  const renderSectionEditor = (section) => {
    switch(section.type) {
      case 'tech-stack':
        return renderTechStackEditor(section);
      case 'projects':
        return renderProjectsEditor(section);
      case 'experience':
        return renderExperienceEditor(section);
      case 'education':
        return renderEducationEditor(section);
      case 'certifications':
        return renderCertificationsEditor(section);
      case 'stats':
        return renderStatsEditor(section);
      default:
        return null;
    }
  };

  const renderTechStackEditor = (section) => {
    const categories = [
      { key: 'frontend', label: 'Frontend', icon: <FaCode /> },
      { key: 'backend', label: 'Backend', icon: <FaServer /> },
      { key: 'devops', label: 'DevOps', icon: <FaCloud /> },
      { key: 'databases', label: 'Databases', icon: <FaDatabase /> }
    ];
    
    return (
      <div className="tech-stack-editor">
        <div className="tech-grid">
          {categories.map(({ key, label, icon }) => (
            <div key={key} className="tech-category-form">
              <div className="category-header">
                {icon}
                <h4>{label}</h4>
              </div>
              <textarea
                placeholder={`Enter ${label.toLowerCase()} skills, one per line or comma separated`}
                value={section.data[key]?.join('\n') || ''}
                onChange={(e) => {
                  const newData = { ...section.data };
                  const skills = e.target.value
                    .split(/[\n,]/)
                    .map(s => s.trim())
                    .filter(s => s);
                  newData[key] = skills;
                  updateSectionData(section.id, newData);
                }}
                rows={5}
                className="tech-textarea"
              />
              <small className="hint">One skill per line or comma separated</small>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjectsEditor = (section) => {
    return (
      <div className="projects-editor">
        {section.data.map((project, index) => (
          <div key={index} className="project-form-card">
            <div className="card-header">
              <h4>Project {index + 1}</h4>
              <button 
                type="button"
                className="remove-item-btn"
                onClick={() => {
                  if (section.data.length <= 1) {
                    alert('You need at least one project');
                    return;
                  }
                  if (window.confirm('Delete this project?')) {
                    removeArrayItem(section.id, index);
                  }
                }}
                title="Remove Project"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="form-grid compact">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].title = e.target.value;
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="E-Commerce Platform"
                />
              </div>
              
              <div className="form-group">
                <label>Badge Type</label>
                <select
                  value={project.badge}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].badge = e.target.value;
                    updateSectionData(section.id, newData);
                  }}
                  className="select-field"
                >
                  <option value="LIVE">Live Project</option>
                  <option value="OPEN SOURCE">Open Source</option>
                  <option value="ENTERPRISE">Enterprise</option>
                  <option value="PERSONAL">Personal</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Live Demo URL</label>
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].liveUrl = e.target.value;
                    updateSectionData(section.id, newData);
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
                    const newData = [...section.data];
                    newData[index].githubUrl = e.target.value;
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="https://github.com/username/project"
                />
              </div>
              
              <div className="form-group full-width">
                <label>
                  Description *
                  <button 
                    type="button"
                    className="ai-improve-btn"
                    onClick={() => handleAIImprovement('project', project.description, index, section.id)}
                    disabled={aiLoading.project}
                    title="Improve with AI"
                  >
                    {aiLoading.project ? <FaSpinner className="spinner" /> : <FaMagic />}
                    AI Improve
                  </button>
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].description = e.target.value;
                    updateSectionData(section.id, newData);
                  }}
                  rows={4}
                  placeholder="Describe your project in detail..."
                />
              </div>
              
              <div className="form-group full-width">
                <label>Technologies (comma separated)</label>
                <input
                  type="text"
                  value={project.technologies?.join(', ') || ''}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].technologies = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="React, Node.js, MongoDB, Stripe"
                />
              </div>
              
              <div className="form-group">
                <label>Stat 1 Value</label>
                <input
                  type="text"
                  value={project.stats?.users || ''}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].stats = { ...newData[index].stats, users: e.target.value };
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="10K+"
                />
                <small>Users/Traffic</small>
              </div>
              
              <div className="form-group">
                <label>Stat 2 Value</label>
                <input
                  type="text"
                  value={project.stats?.uptime || ''}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].stats = { ...newData[index].stats, uptime: e.target.value };
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="99.9%"
                />
                <small>Uptime/Success Rate</small>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="add-section-btn"
          onClick={() => addArrayItem(section.id, {
            title: 'New Project',
            description: 'Describe your project here...',
            technologies: ['React', 'Node.js'],
            liveUrl: '#',
            githubUrl: '#',
            badge: 'PROJECT',
            stats: { users: '0', uptime: '0%' }
          })}
        >
          <FaPlus /> Add Another Project
        </button>
      </div>
    );
  };

  const renderExperienceEditor = (section) => {
    return (
      <div className="experience-editor">
        {section.data.map((exp, index) => (
          <div key={index} className="experience-form-card">
            <div className="card-header">
              <h4>Experience {index + 1}</h4>
              <button 
                type="button"
                className="remove-item-btn"
                onClick={() => {
                  if (section.data.length <= 1) {
                    alert('You need at least one experience');
                    return;
                  }
                  if (window.confirm('Delete this experience?')) {
                    removeArrayItem(section.id, index);
                  }
                }}
                title="Remove Experience"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => {
                    const newData = [...section.data];
                    newData[index].title = e.target.value;
                    updateSectionData(section.id, newData);
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
                    const newData = [...section.data];
                    newData[index].company = e.target.value;
                    updateSectionData(section.id, newData);
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
                    const newData = [...section.data];
                    newData[index].period = e.target.value;
                    updateSectionData(section.id, newData);
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
                    const newData = [...section.data];
                    newData[index].location = e.target.value;
                    updateSectionData(section.id, newData);
                  }}
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <div className="form-group full-width">
                <label>
                  Responsibilities *
                  <button 
                    type="button"
                    className="ai-improve-btn"
                    onClick={() => handleAIImprovement('experience', exp.bullets.join(' '), index, section.id)}
                    disabled={aiLoading.experience}
                    title="Improve with AI"
                  >
                    {aiLoading.experience ? <FaSpinner className="spinner" /> : <FaMagic />}
                    AI Improve
                  </button>
                </label>
                <div className="bullets-list">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="bullet-item">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const newData = [...section.data];
                          newData[index].bullets[bulletIndex] = e.target.value;
                          updateSectionData(section.id, newData);
                        }}
                        placeholder="Led development of microservices architecture..."
                        className="bullet-input"
                      />
                      <button 
                        type="button"
                        className="remove-bullet-btn"
                        onClick={() => {
                          const newData = [...section.data];
                          newData[index].bullets.splice(bulletIndex, 1);
                          updateSectionData(section.id, newData);
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    className="add-bullet-btn"
                    onClick={() => {
                      const newData = [...section.data];
                      newData[index].bullets.push('');
                      updateSectionData(section.id, newData);
                    }}
                  >
                    <FaPlus /> Add Responsibility
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          className="add-section-btn"
          onClick={() => addArrayItem(section.id, {
            period: 'YYYY - Present',
            title: 'Job Title',
            company: 'Company Name',
            location: 'Location',
            bullets: ['Responsibility 1', 'Responsibility 2']
          })}
        >
          <FaPlus /> Add Another Experience
        </button>
      </div>
    );
  };

  const renderEducationEditor = (section) => {
    return (
      <div className="education-editor">
        <div className="form-grid">
          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              value={section.data.degree || ''}
              onChange={(e) => updateSectionData(section.id, { 
                ...section.data, 
                degree: e.target.value 
              })}
              placeholder="Master of Science in Computer Science"
            />
          </div>
          
          <div className="form-group">
            <label>Institution *</label>
            <input
              type="text"
              value={section.data.institution || ''}
              onChange={(e) => updateSectionData(section.id, { 
                ...section.data, 
                institution: e.target.value 
              })}
              placeholder="Stanford University"
            />
          </div>
          
          <div className="form-group">
            <label>Period</label>
            <input
              type="text"
              value={section.data.period || ''}
              onChange={(e) => updateSectionData(section.id, { 
                ...section.data, 
                period: e.target.value 
              })}
              placeholder="2018 - 2020"
            />
          </div>
          
          <div className="form-group full-width">
            <label>Specialization</label>
            <input
              type="text"
              value={section.data.specialization || ''}
              onChange={(e) => updateSectionData(section.id, { 
                ...section.data, 
                specialization: e.target.value 
              })}
              placeholder="Specialization in Distributed Systems and Cloud Computing"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCertificationsEditor = (section) => {
    return (
      <div className="certifications-editor">
        <div className="form-group full-width">
          <label>Certifications (one per line or comma separated)</label>
          <textarea
            value={Array.isArray(section.data) ? section.data.join('\n') : section.data}
            onChange={(e) => {
              const certs = e.target.value
                .split(/[\n,]/)
                .map(c => c.trim())
                .filter(c => c);
              updateSectionData(section.id, certs);
            }}
            rows={4}
            placeholder="AWS Solutions Architect&#10;Google Cloud Professional&#10;Kubernetes Administrator"
          />
        </div>
      </div>
    );
  };

  const renderStatsEditor = (section) => {
    const defaultStats = { projects: '50+', years: '5', uptime: '99%' };
    const stats = { ...defaultStats, ...section.data };
    
    return (
      <div className="stats-editor">
        <div className="stats-grid">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="stat-input-group">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  updateSectionData(section.id, {
                    ...stats,
                    [key]: e.target.value
                  });
                }}
                placeholder={key === 'projects' ? '50+' : key === 'years' ? '5' : '99%'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Handle Launch - Save portfolio and navigate to deploy guide
  const handleLaunch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Create portfolio data
        const portfolioData = {
          ...formData,
          templateId: 7,
          id: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          name: formData.name || 'Untitled Portfolio',
          // Ensure sections exists
          sections: formData.sections || []
        };
        
        console.log('🚀 Saving Template 7 Portfolio for launch:', portfolioData);
        
        // Get existing data
        const existingData = localStorage.getItem('portfolio_data');
        let existingPortfolios = [];
        
        if (existingData) {
          try {
            const parsed = JSON.parse(existingData);
            
            if (Array.isArray(parsed)) {
              existingPortfolios = parsed;
            } else if (parsed && typeof parsed === 'object') {
              // Convert single object to array
              existingPortfolios = [parsed];
            }
          } catch (error) {
            console.error('Error parsing existing data:', error);
            existingPortfolios = [];
          }
        }
        
        // Check if this portfolio already exists (by ID or name)
        let existingIndex = -1;
        if (existingPortfolios.length > 0) {
          existingIndex = existingPortfolios.findIndex(p => 
            p && (p.id === portfolioData.id || p.name === portfolioData.name)
          );
        }
        
        if (existingIndex >= 0) {
          // Update existing portfolio
          existingPortfolios[existingIndex] = portfolioData;
        } else {
          // Add new portfolio to beginning of array
          existingPortfolios.unshift(portfolioData);
        }
        
        // Save updated array
        localStorage.setItem('portfolio_data', JSON.stringify(existingPortfolios));
        
        // Also save single copy for editing
        localStorage.setItem('editingPortfolioData', JSON.stringify(portfolioData));
        
        console.log('✅ Portfolio saved successfully!');
        
        navigate('/deploy-guide');
      } catch (error) {
        console.error('Error during launch:', error);
        alert('Error saving portfolio. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  // Handle Preview - Save portfolio and navigate to preview
  const handlePreview = () => {
    try {
      // Create portfolio data
      const portfolioData = {
        ...formData,
        templateId: 7,
        id: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        name: formData.name || 'Untitled Portfolio',
        sections: formData.sections || []
      };
      
      console.log('👁️ Saving Template7 for preview:', portfolioData);
      
      // Save for preview (save as single object for simplicity)
      localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
      localStorage.setItem('editingPortfolioData', JSON.stringify(portfolioData));
      
      navigate('/preview7');
    } catch (error) {
      console.error('Error during preview:', error);
      alert('Error saving portfolio for preview. Please try again.');
    }
  };

  // Handle Save Progress
  const handleSave = () => {
    try {
      const portfolioData = {
        ...formData,
        templateId: 7,
        id: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        name: formData.name || 'Untitled Portfolio',
        sections: formData.sections || []
      };
      
      console.log('💾 Saving Template7 progress:', portfolioData);
      
      // Get existing data
      const existingData = localStorage.getItem('portfolio_data');
      let existingPortfolios = [];
      
      if (existingData) {
        try {
          const parsed = JSON.parse(existingData);
          
          if (Array.isArray(parsed)) {
            existingPortfolios = parsed;
          } else if (parsed && typeof parsed === 'object') {
            existingPortfolios = [parsed];
          }
        } catch (error) {
          console.error('Error parsing existing data:', error);
          existingPortfolios = [];
        }
      }
      
      // Check if this portfolio already exists
      let existingIndex = -1;
      if (existingPortfolios.length > 0) {
        existingIndex = existingPortfolios.findIndex(p => 
          p && p.id === portfolioData.id
        );
      }
      
      if (existingIndex >= 0) {
        // Update existing portfolio
        existingPortfolios[existingIndex] = portfolioData;
      } else {
        // Add new portfolio to beginning of array
        existingPortfolios.unshift(portfolioData);
      }
      
      // Save updated array
      localStorage.setItem('portfolio_data', JSON.stringify(existingPortfolios));
      
      // Save for editing
      localStorage.setItem('editingPortfolioData', JSON.stringify(portfolioData));
      
      // Show success message
      const successMsg = document.getElementById('save-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3000);
      }
      
      console.log('✅ Progress saved successfully!');
      
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Error saving progress. Please try again.');
    }
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form data? This cannot be undone.')) {
      setFormData({
        name: '',
        jobTitle: '',
        tagline: '',
        location: '',
        email: '',
        phone: '',
        bio: '',
        availability: 'Open to Opportunities',
        github: '',
        linkedin: '',
        twitter: '',
        sections: [
          {
            id: 'tech-stack',
            title: 'Tech Stack',
            type: 'tech-stack',
            enabled: true,
            order: 1,
            data: {
              frontend: [],
              backend: [],
              devops: [],
              databases: []
            }
          },
          {
            id: 'projects',
            title: 'Projects',
            type: 'projects',
            enabled: true,
            order: 2,
            data: [{
              title: '',
              description: '',
              technologies: [],
              liveUrl: '',
              githubUrl: '',
              badge: 'PROJECT',
              stats: { users: '', uptime: '' }
            }]
          }
        ],
        emailjs: { serviceId: '', templateId: '', userId: '', contactEmail: '' },
        deployment: { platform: 'vercel', customDomain: '', username: '' }
      });
      
      console.log('🔄 Form reset to default values');
    }
  };

  // Debug function (optional - can be removed in production)
  const debugForm = () => {
    console.log('=== DEBUG FORM DATA ===');
    console.log('Form Data:', formData);
    console.log('Sections count:', formData.sections?.length || 0);
    console.log('Sections:', formData.sections);
    console.log('LocalStorage portfolio_data:', localStorage.getItem('portfolio_data'));
    console.log('=== END DEBUG ===');
    
    alert(`Debug Info:\nSections: ${formData.sections?.length || 0}\nCheck console for details.`);
  };

  return (
    <div className="template-form template7-form">
      <BackButton 
        text="← Back to Templates" 
        onClick={() => navigate('/dashboard')} 
      />
      
      <div className="form-header">
        <h1>🚀 Flexible Developer Portfolio Builder</h1>
        <p>Customize your portfolio by adding, removing, or rearranging sections</p>
        
        {/* Success Messages */}
        <div id="ai-load-success" className="success-message">
          ✅ AI data loaded successfully!
        </div>
        <div id="ai-success" className="success-message">
          ✨ Content improved with AI!
        </div>
        <div id="save-success" className="success-message">
          💾 Progress saved successfully!
        </div>
        
        {/* Debug Button (optional - remove in production) */}
        <button 
          type="button"
          onClick={debugForm}
          style={{
            margin: '10px auto',
            padding: '5px 15px',
            background: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          🐛 Debug Form
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="form-tabs">
        <button 
          className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button 
          className={`tab-btn ${activeTab === 'sections' ? 'active' : ''}`}
          onClick={() => setActiveTab('sections')}
        >
          Sections ({formData.sections.filter(s => s.enabled).length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact & Launch
        </button>
      </div>

      {/* BASIC INFO TAB */}
      {activeTab === 'basic' && (
        <div className="tab-content">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleBasicChange('name', e.target.value)}
                  placeholder="Alex Chen"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleBasicChange('jobTitle', e.target.value)}
                  placeholder="Full-Stack Developer"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleBasicChange('tagline', e.target.value)}
                  placeholder="Building scalable solutions with React, Node.js, and AWS"
                />
              </div>
              
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleBasicChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleBasicChange('email', e.target.value)}
                  placeholder="alex@devportfolio.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleBasicChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="form-group">
                <label>Availability Status</label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => handleBasicChange('availability', e.target.value)}
                  placeholder="Open to Opportunities"
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label>
                Professional Bio *
                <button 
                  type="button"
                  className="ai-improve-btn"
                  onClick={() => handleAIImprovement('bio', formData.bio)}
                  disabled={aiLoading.bio}
                  title="Improve with AI"
                >
                  {aiLoading.bio ? <FaSpinner className="spinner" /> : <FaMagic />}
                  AI Improve
                </button>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleBasicChange('bio', e.target.value)}
                rows={6}
                placeholder="Describe your experience, skills, and what makes you unique..."
              />
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
                  onChange={(e) => handleBasicChange('github', e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>
              
              <div className="form-group">
                <label><FaLinkedin /> LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleBasicChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="form-group">
                <label><FaTwitter /> Twitter URL</label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => handleBasicChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTIONS TAB */}
      {activeTab === 'sections' && (
        <div className="tab-content">
          {/* Add Sections Buttons */}
          <div className="form-section add-sections-bar">
            <h3>Add New Sections</h3>
            <div className="add-buttons-grid">
              <button className="add-btn" onClick={() => addNewSection('project')}>
                <FaPlus /> Add Project
              </button>
              <button className="add-btn" onClick={() => addNewSection('experience')}>
                <FaPlus /> Add Experience
              </button>
              <button className="add-btn" onClick={() => addNewSection('certification')}>
                <FaPlus /> Add Certification
              </button>
              <button className="add-btn" onClick={() => addNewSection('tech-stack')}>
                <FaPlus /> Add Tech Stack
              </button>
            </div>
          </div>

          {/* Sections Manager */}
          <div className="form-section sections-manager">
            <div className="section-header">
              <h2>Portfolio Sections</h2>
              <div className="section-stats">
                <span className="active-count">
                  {formData.sections.filter(s => s.enabled).length} active
                </span>
                <span className="total-count">
                  {formData.sections.length} total
                </span>
              </div>
            </div>
            
            <div className="sections-list">
              {formData.sections
                .sort((a, b) => a.order - b.order)
                .map(section => (
                  <div key={section.id} className={`section-item ${section.enabled ? 'active' : 'inactive'}`}>
                    <div className="section-header-bar">
                      <div className="section-info">
                        <div className="section-title">
                          <h3>{section.title}</h3>
                          <span className="section-order">#{section.order}</span>
                          <span className="section-type">{section.type}</span>
                        </div>
                        <div className="section-status">
                          <span className={`status-badge ${section.enabled ? 'enabled' : 'disabled'}`}>
                            {section.enabled ? '✓ Visible' : '✗ Hidden'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="section-actions">
                        <button 
                          className="btn-move up"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={section.order === 1}
                          title="Move Up"
                        >
                          <FaArrowUp />
                        </button>
                        
                        <button 
                          className="btn-move down"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={section.order === formData.sections.length}
                          title="Move Down"
                        >
                          <FaArrowDown />
                        </button>
                        
                        <button 
                          className="toggle-btn"
                          onClick={() => toggleSection(section.id)}
                          title={section.enabled ? 'Hide Section' : 'Show Section'}
                        >
                          {section.enabled ? 'Hide' : 'Show'}
                        </button>
                        
                        <button 
                          className="remove-btn"
                          onClick={() => removeSection(section.id)}
                          title="Remove Section"
                          disabled={formData.sections.length <= 1}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    
                    {section.enabled && (
                      <div className="section-content">
                        {renderSectionEditor(section)}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT & LAUNCH TAB */}
      {activeTab === 'contact' && (
        <div className="tab-content">
          <div className="form-section">
            <h2>Contact Form Setup</h2>
            <EmailJSSetup />
          </div>

          <div className="form-section">
            <h2>Deployment Settings</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Portfolio Username *</label>
                <input
                  type="text"
                  value={formData.deployment.username}
                  onChange={(e) => setFormData({
                    ...formData, 
                    deployment: {...formData.deployment, username: e.target.value}
                  })}
                  placeholder="alexchen"
                  required
                />
                <small>This will be part of your portfolio URL</small>
              </div>
              
              <div className="form-group">
                <label>Custom Domain (Optional)</label>
                <input
                  type="text"
                  value={formData.deployment.customDomain}
                  onChange={(e) => setFormData({
                    ...formData, 
                    deployment: {...formData.deployment, customDomain: e.target.value}
                  })}
                  placeholder="portfolio.example.com"
                />
                <small>Leave blank for default URL</small>
              </div>
            </div>
            
            <div className="deployment-preview">
              <h4>Your Portfolio URL:</h4>
              <div className="url-display">
                {formData.deployment.customDomain 
                  ? `https://${formData.deployment.customDomain}`
                  : `https://${formData.deployment.username || 'portfolio'}-devfolio.vercel.app`
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="form-actions">
        <div className="action-group-left">
          <button 
            type="button" 
            className="btn-secondary reset-btn"
            onClick={handleReset}
          >
            <FaUndo /> Reset
          </button>
          
          <button 
            type="button" 
            className="btn-secondary save-btn"
            onClick={handleSave}
          >
            <FaSave /> Save Progress
          </button>
        </div>
        
        <div className="action-group-right">
          <button 
            type="button" 
            className="btn-primary preview-btn"
            onClick={handlePreview}
          >
            <FaEye /> Preview Portfolio
          </button>
          
          <button 
            type="button" 
            className="btn-primary launch-btn"
            onClick={handleLaunch}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner" /> Launching...
              </>
            ) : (
              <>
                <FaRocket /> Launch Portfolio
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template7Form;