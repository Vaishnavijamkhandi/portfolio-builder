import React, { useState, useEffect } from "react";
import "./template7.css";
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaCloud, FaDatabase, FaTerminal, FaRobot } from 'react-icons/fa';

const Template7 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    console.log('Template7: Checking for portfolio_data', savedData);
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        console.log('Template7: Loaded data', data);
        
        // Check if this data is for template 7
        if (data.templateId === 7 || data.templateId === "7") {
          console.log('Template7: Data is for template 7, loading...');
          setUserData(data);
        } else {
          console.log('Template7: Data is for different template', data.templateId);
          // Still use it but show in console
          setUserData(data);
        }
      } catch (error) {
        console.error('Template7: Error loading portfolio data:', error);
      }
    } else {
      console.log('Template7: No portfolio_data found, checking editingPortfolioData...');
      // Try the editing data as fallback
      const editingData = localStorage.getItem('editingPortfolioData');
      if (editingData) {
        try {
          const data = JSON.parse(editingData);
          console.log('Template7: Loaded editing data', data);
          setUserData(data);
        } catch (error) {
          console.error('Template7: Error loading editing data:', error);
        }
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
    name: 'Alex Chen',
    jobTitle: 'Full-Stack Developer & Cloud Architect',
    tagline: 'Building scalable solutions with React, Node.js, and AWS',
    location: 'San Francisco, CA',
    email: 'alex@devportfolio.com',
    phone: '+1 (555) 123-4567',
    bio: `Passionate software engineer with 5+ years of experience building high-performance web applications. Specialized in microservices architecture, real-time systems, and cloud infrastructure.`,
    availability: 'Open to Opportunities',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
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
      },
      {
        id: 'projects',
        title: 'Projects',
        type: 'projects',
        enabled: true,
        data: [
          {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            liveUrl: '#',
            githubUrl: '#',
            badge: 'LIVE',
            stats: { users: '10K+', uptime: '99.9%' }
          }
        ]
      }
    ]
  };

  // Filter enabled sections
  const enabledSections = data.sections?.filter(section => section.enabled) || [];

  // Helper function to get section by order
  const getOrderedSections = () => {
    return enabledSections.sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  return (
    <div className="template1">
      {/* Futuristic Navigation */}
      <nav className="dev-nav">
        <div className="nav-logo">
          <FaRobot className="logo-icon" />
          <span className="logo-text">AI.<span className="highlight">PORTFOLIO</span></span>
        </div>
        <div className="nav-links">
          <a href="#hero">HOME</a>
          <a href="#about">ABOUT</a>
          {getOrderedSections().map(section => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title.toUpperCase()}
            </a>
          ))}
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-cta">VIEW RESUME</button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="dev-hero">
        <div className="hero-bg">
          <div className="code-grid">
            {Array.from({length: 50}).map((_, i) => (
              <div key={i} className="code-char">{['{', '}', '<', '>', ';', '=', '(', ')', '[', ']'][i % 10]}</div>
            ))}
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">{data.name.toUpperCase()}</span>
            <span className="title-cursor">_</span>
          </h1>
          <h2 className="hero-subtitle">
            <span className="typewriter">{data.jobTitle?.toUpperCase() || 'FULL-STACK DEVELOPER'}</span>
          </h2>
          <p className="hero-desc">
            {data.tagline}
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">{data.stats?.projects || '50+'}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat">
              <div className="stat-number">{data.stats?.years || '5'}</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat">
              <div className="stat-number">{data.stats?.uptime || '99%'}</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">01</span>
              ABOUT ME
            </h2>
            <div className="section-line"></div>
          </div>
          <div className="about-grid">
            <div className="about-content">
              <h3>Code. Create. Innovate.</h3>
              <p>{data.bio}</p>
              <div className="about-details">
                <div className="detail">
                  <strong>Location:</strong> {data.location}
                </div>
                <div className="detail">
                  <strong>Email:</strong> {data.email}
                </div>
                <div className="detail">
                  <strong>Availability:</strong> {data.availability}
                </div>
              </div>
              <div className="social-links">
                {data.github && (
                  <a href={data.github} className="social-link" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {data.twitter && (
                  <a href={data.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                    <FaTwitter /> Twitter
                  </a>
                )}
              </div>
            </div>
            <div className="about-visual">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="window-title">about.js</span>
                </div>
                <div className="code-content">
                  <pre>{`const developer = {
  name: "${data.name}",
  role: "${data.jobTitle || 'Developer'}",
  skills: ["React", "Node.js", "AWS", "Docker"],
  experience: "${data.stats?.years || '5+'}+ years",
  location: "${data.location}",
  availability: ${data.availability?.includes('Open') ? 'true' : 'false'}
};`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {getOrderedSections().map((section, sectionIndex) => {
        const sectionNumber = (sectionIndex + 2).toString().padStart(2, '0');
        
        switch(section.type) {
          case 'tech-stack':
            return (
              <section key={section.id} id={section.id} className="skills-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      TECH STACK
                    </h2>
                  </div>
                  <div className="skills-categories">
                    {section.data.frontend && section.data.frontend.length > 0 && (
                      <div className="category">
                        <div className="category-icon"><FaCode /></div>
                        <h3>Frontend</h3>
                        <div className="skills-list">
                          {section.data.frontend.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {section.data.backend && section.data.backend.length > 0 && (
                      <div className="category">
                        <div className="category-icon"><FaServer /></div>
                        <h3>Backend</h3>
                        <div className="skills-list">
                          {section.data.backend.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {section.data.devops && section.data.devops.length > 0 && (
                      <div className="category">
                        <div className="category-icon"><FaCloud /></div>
                        <h3>DevOps</h3>
                        <div className="skills-list">
                          {section.data.devops.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {section.data.databases && section.data.databases.length > 0 && (
                      <div className="category">
                        <div className="category-icon"><FaDatabase /></div>
                        <h3>Databases</h3>
                        <div className="skills-list">
                          {section.data.databases.map((skill, index) => (
                            <span key={index} className="skill-item">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );

          case 'projects':
            return (
              <section key={section.id} id={section.id} className="projects-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      PROJECTS
                    </h2>
                  </div>
                  <div className="projects-grid">
                    {section.data.map((project, index) => (
                      <div key={index} className="project-card">
                        <div className="project-header">
                          <div className="project-badge">{project.badge || 'PROJECT'}</div>
                          <h3>{project.title}</h3>
                        </div>
                        <p className="project-desc">{project.description}</p>
                        <div className="project-tech">
                          {project.technologies?.map((tech, i) => (
                            <span key={i}>{tech}</span>
                          ))}
                        </div>
                        <div className="project-stats">
                          {project.stats && Object.entries(project.stats).map(([key, value], i) => (
                            <div key={i} className="project-stat">
                              <div className="stat-value">{value}</div>
                              <div className="stat-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            </div>
                          ))}
                        </div>
                        <div className="project-links">
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                              {project.badge === 'OPEN SOURCE' ? 'Documentation' : 'View Demo'}
                            </a>
                          )}
                          {project.githubUrl && project.githubUrl !== '#' && (
                            <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'experience':
            return (
              <section key={section.id} id={section.id} className="experience-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      EXPERIENCE
                    </h2>
                  </div>
                  <div className="timeline">
                    {section.data.map((exp, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-date">{exp.period}</div>
                        <div className="timeline-content">
                          <h3>{exp.title}</h3>
                          <h4>{exp.company} • {exp.location}</h4>
                          <ul>
                            {exp.bullets?.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'education':
            return (
              <section key={section.id} id={section.id} className="education-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      EDUCATION
                    </h2>
                  </div>
                  <div className="education-card">
                    <h3>{section.data.degree}</h3>
                    <h4>{section.data.institution} • {section.data.period}</h4>
                    {section.data.specialization && (
                      <p>{section.data.specialization}</p>
                    )}
                  </div>
                </div>
              </section>
            );

          case 'certifications':
            return (
              <section key={section.id} id={section.id} className="certifications-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      CERTIFICATIONS
                    </h2>
                  </div>
                  <div className="certifications">
                    {section.data.map((cert, index) => (
                      <span key={index} className="cert">{cert}</span>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'stats':
            return (
              <section key={section.id} id={section.id} className="stats-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">
                      <span className="section-number">{sectionNumber}</span>
                      STATISTICS
                    </h2>
                  </div>
                  <div className="stats-grid">
                    {section.data && Object.entries(section.data).map(([key, value]) => (
                      <div key={key} className="stat-item">
                        <div className="stat-number">{value}</div>
                        <div className="stat-label">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">{(getOrderedSections().length + 2).toString().padStart(2, '0')}</span>
              GET IN TOUCH
            </h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Build Something Amazing</h3>
              <p>Open to freelance projects, full-time opportunities, and technical discussions.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> {data.email}
                </div>
                {data.phone && (
                  <div className="contact-item">
                    <strong>Phone:</strong> {data.phone}
                  </div>
                )}
                <div className="contact-item">
                  <strong>Location:</strong> {data.location}
                </div>
              </div>
              <div className="contact-social">
                {data.github && (
                  <a href={data.github} className="social-btn" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} className="social-btn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
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
                  placeholder="Your Message" 
                  rows={5}
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
      <footer className="dev-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <FaRobot /> AI.PORTFOLIO
            </div>
            <p>© 2024 {data.name}. Built with the Flexible Portfolio Builder.</p>
            <div className="footer-links">
              <a href="#hero">Home</a>
              {getOrderedSections().map(section => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template7;