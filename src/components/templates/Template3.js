// src/components/templates/Template3.js (YOUR ORIGINAL + Dynamic Data)
import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { FaPython, FaChartLine, FaDatabase, FaBrain, FaGraduationCap, FaFileAlt, FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';

const Template3 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 3 || data.templateId === undefined) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailjsConfig = userData?.emailjs || {};
    
    if (emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.userId) {
      emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          to_email: emailjsConfig.contactEmail || userData?.email
        },
        emailjsConfig.userId
      )
      .then(() => alert('Message sent successfully!'))
      .catch(() => alert('Failed to send message.'));
    } else {
      alert(`Message would be sent to: ${emailjsConfig.contactEmail || userData?.email || 'your email'}`);
    }
    
    setContactForm({ name: '', email: '', message: '' });
  };

  // Use user data or defaults
  const data = userData || {
    name: 'Dr. James Wilson',
    title: 'Data Scientist & ML Engineer',
    tagline: 'Transforming Data Into Actionable Insights',
    specialization: 'Predictive Analytics & AI Solutions',
    location: 'Boston, MA',
    email: 'james@datascience.com',
    bio: `Data Scientist & Machine Learning Engineer specializing in 
          predictive analytics and AI solutions with 5+ years of research experience.`,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    kaggle: 'https://kaggle.com',
    researchgate: 'https://researchgate.net',
    metrics: { accuracy: '94.3%', papers: '15+', dataProcessed: '5TB' },
    programming: ['Python', 'R', 'SQL', 'Spark'],
    mlFrameworks: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost'],
    visualization: ['Matplotlib', 'Seaborn', 'Tableau', 'Power BI'],
    researchProjects: [
      {
        title: 'Predictive Maintenance',
        description: 'ML model predicting equipment failures with 92% accuracy',
        techniques: ['Time Series Analysis', 'Random Forest', 'LSTM'],
        metrics: { accuracy: '92%', auc: '0.89' },
        tools: ['Python', 'TensorFlow', 'Scikit-learn']
      }
    ]
  };

  return (
    <div className="template3">
      {/* Scientific Header - KEEPING ORIGINAL */}
      <header className="data-header">
        <div className="data-logo">
          <span className="data-icon">📊</span>
          <span className="data-name">{(data.name || 'Data Scientist').toUpperCase()}</span>
        </div>
        <nav className="data-nav">
          <a href="#research">RESEARCH</a>
          <a href="#projects">PROJECTS</a>
          <a href="#publications">PUBLICATIONS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      {/* Hero with Data Visualization - KEEPING ORIGINAL */}
      <section className="data-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforming Data Into
            <span className="hero-highlight"> Actionable Insights</span>
          </h1>
          <p className="hero-subtitle">{data.bio}</p>
          <div className="data-metrics">
            <div className="metric-card">
              <div className="metric-value">{data.metrics?.accuracy || '94.3%'}</div>
              <div className="metric-label">Model Accuracy</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.metrics?.papers || '15+'}</div>
              <div className="metric-label">Research Papers</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.metrics?.dataProcessed || '5TB'}</div>
              <div className="metric-label">Data Processed</div>
            </div>
          </div>
        </div>
        <div className="data-viz">
          <div className="viz-title">Customer Segmentation Analysis</div>
          <div className="viz-clusters">
            {[35, 25, 20, 15, 5].map((size, i) => (
              <div 
                key={i}
                className="cluster"
                style={{
                  width: `${size}%`,
                  height: `${size}%`,
                  background: `hsl(${i * 72}, 70%, 60%)`
                }}
              >
                <span className="cluster-label">Cluster {i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects - KEEPING ORIGINAL */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Research Projects</h2>
          <div className="project-cards">
            {data.researchProjects?.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <FaBrain className="project-icon" />
                  <h3>{project.title}</h3>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-stats">
                  <div className="project-stat">
                    <div className="stat-value">{project.metrics?.accuracy || '92%'}</div>
                    <div className="stat-name">Accuracy</div>
                  </div>
                  <div className="project-stat">
                    <div className="stat-value">{project.metrics?.auc || '0.89'}</div>
                    <div className="stat-name">AUC Score</div>
                  </div>
                </div>
                <div className="project-tech">
                  {project.tools?.map((tool, i) => (
                    <span key={i} className="tech-tag">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - KEEPING ORIGINAL */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <FaPython className="category-icon" />
              <h3>Programming</h3>
              <div className="skill-items">
                {data.programming?.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <FaChartLine className="category-icon" />
              <h3>ML & AI</h3>
              <div className="skill-items">
                {data.mlFrameworks?.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <FaDatabase className="category-icon" />
              <h3>Databases</h3>
              <div className="skill-items">
                <span>SQL</span>
                <span>NoSQL</span>
                <span>Big Data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Added */}
      <section id="contact" className="data-contact-section">
        <div className="container">
          <h2 className="section-title">Research Collaboration</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Discuss Data Science</h3>
              <p>Open to research collaborations, consulting, and speaking engagements.</p>
              <div className="contact-details">
                <div className="detail">
                  <strong>Email:</strong> {data.email}
                </div>
                <div className="detail">
                  <strong>Location:</strong> {data.location}
                </div>
              </div>
              <div className="research-links">
                {data.github && (
                  <a href={data.github} className="research-link" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                )}
                {data.kaggle && (
                  <a href={data.kaggle} className="research-link" target="_blank" rel="noopener noreferrer">
                    <FaKaggle /> Kaggle
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} className="research-link" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
              </div>
            </div>
            <form className="research-contact-form" onSubmit={handleSubmit}>
              <h3>Contact for Research</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Describe your research interest or collaboration idea..." 
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                SEND RESEARCH INQUIRY
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template3;