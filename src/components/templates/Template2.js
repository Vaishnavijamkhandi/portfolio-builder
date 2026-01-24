// src/components/templates/Template2.js (UPDATED VERSION)
import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { FaBehance, FaDribbble, FaFigma, FaInstagram, FaLinkedin, FaPenNib } from 'react-icons/fa';

const Template2 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 2 || data.templateId === undefined) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
    setIsLoading(false);
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

  // Default data structure
  const defaultData = {
    name: 'Sarah Design',
    title: 'UI/UX Designer & Creative Director',
    tagline: 'Creating Digital Experiences That Inspire',
    specialty: 'Product Design & User Experience',
    location: 'New York, NY',
    email: 'sarah@designportfolio.com',
    bio: `UI/UX Designer & Creative Director with 7+ years of experience 
          transforming complex problems into beautiful, intuitive solutions.`,
    behance: 'https://behance.net',
    dribbble: 'https://dribbble.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    stats: { projects: '150+', satisfaction: '98%', awards: '25+' },
    projects: [
      {
        title: 'Fintech Mobile App',
        category: 'Mobile App Design',
        client: 'Major Bank',
        description: 'Complete redesign of banking experience for millennials',
        tools: ['Figma', 'Adobe XD', 'Principle'],
        link: '#',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        title: 'E-Learning Platform',
        category: 'Web Design',
        client: 'EduTech Startup',
        description: 'Gamified education interface for online learning',
        tools: ['Sketch', 'InVision', 'After Effects'],
        link: '#',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      }
    ],
    processSteps: [
      { step: '01', title: 'Discover', description: 'User research & analysis' },
      { step: '02', title: 'Define', description: 'Problem framing & strategy' },
      { step: '03', title: 'Design', description: 'Wireframing & prototyping' },
      { step: '04', title: 'Deliver', description: 'Testing & implementation' }
    ],
    designTools: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision', 'Principle'],
    methodologies: ['Design Thinking', 'User-Centered Design', 'Agile Methodology']
  };

  // Merge user data with defaults
  const data = { ...defaultData, ...userData };

  // Safe name formatting function
  const formatName = (name) => {
    return (name || '').replace(/\s+/g, '').toUpperCase();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="template2 loading-container">
        <div className="loading-spinner">
          <FaPenNib className="spinner-icon" />
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="template2">
      {/* Minimal Navigation */}
      <nav className="design-nav">
        <div className="design-logo">
          <FaPenNib />
          <span>{formatName(data.name)}</span>
        </div>
        <div className="nav-menu">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#process">PROCESS</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-resume">RESUME</button>
      </nav>

      {/* Hero */}
      <section className="design-hero">
        <div className="hero-content">
          <h1 className="hero-main-text">
            Creating <span className="hero-highlight">Digital</span>
            <br />
            Experiences That <span className="hero-highlight">Inspire</span>
          </h1>
          <p className="hero-subtext">{data.bio}</p>
          <div className="hero-stats">
            <div className="design-stat">
              <div className="stat-number">{data.stats?.projects || '150+'}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="design-stat">
              <div className="stat-number">{data.stats?.satisfaction || '98%'}</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="design-stat">
              <div className="stat-number">{data.stats?.awards || '25+'}</div>
              <div className="stat-label">Awards</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-shapes">
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape triangle"></div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="work-section">
        <div className="container">
          <div className="section-title">SELECTED WORK</div>
          <div className="work-grid">
            {(data.projects || []).map((project, index) => (
              <div key={index} className={`work-card ${index === 0 ? 'large' : ''}`}>
                <div className="work-image" style={{background: project.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="work-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.category || 'Design Project'}</p>
                  </div>
                </div>
                <div className="work-info">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="work-tags">
                    {(project.tools || []).map((tool, i) => (
                      <span key={i}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section id="process" className="process-section">
        <div className="container">
          <div className="section-title">DESIGN PROCESS</div>
          <div className="process-steps">
            {(data.processSteps || []).map((step, index) => (
              <div key={index} className="step">
                <div className="step-number">{step.step || `0${index + 1}`}</div>
                <h3>{step.title || 'Step'}</h3>
                <p>{step.description || 'Design process step'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Skills */}
      <section className="tools-section">
        <div className="container">
          <div className="section-title">TOOLS & SKILLS</div>
          <div className="tools-grid">
            <div className="tool-category">
              <h3>Design Tools</h3>
              <div className="tool-icons">
                <FaFigma className="tool-icon" />
                <FaBehance className="tool-icon" />
                <FaDribbble className="tool-icon" />
              </div>
              <div className="tools-list">
                {(data.designTools || []).map((tool, index) => (
                  <span key={index}>{tool}</span>
                ))}
              </div>
            </div>
            <div className="tool-category">
              <h3>Methodologies</h3>
              <div className="method-list">
                {(data.methodologies || []).map((method, index) => (
                  <span key={index}>{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Let's Create Together</h2>
            <p>Available for select projects and consultations.</p>
            <div className="contact-info">
              <div className="info-item">
                <strong>Email:</strong> {data.email || 'Not specified'}
              </div>
              <div className="info-item">
                <strong>Location:</strong> {data.location || 'Not specified'}
              </div>
            </div>
            <div className="social-buttons">
              {data.linkedin && (
                <a href={data.linkedin} className="social-btn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {data.behance && (
                <a href={data.behance} className="social-btn" target="_blank" rel="noopener noreferrer">
                  <FaBehance /> Behance
                </a>
              )}
              {data.dribbble && (
                <a href={data.dribbble} className="social-btn" target="_blank" rel="noopener noreferrer">
                  <FaDribbble /> Dribbble
                </a>
              )}
              {data.instagram && (
                <a href={data.instagram} className="social-btn" target="_blank" rel="noopener noreferrer">
                  <FaInstagram /> Instagram
                </a>
              )}
            </div>
            
            {/* Contact Form */}
            <form className="design-contact-form" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
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
                  placeholder="Tell me about your project..." 
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="design-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <FaPenNib /> {formatName(data.name)}
            </div>
            <p>© 2024 {data.name || ''}. All designs are original.</p>
            <div className="footer-links">
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#contact">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template2;