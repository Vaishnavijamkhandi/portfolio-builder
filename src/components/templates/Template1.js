// src/components/templates/Template1.js (UPDATED VERSION)
import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaServer, FaCloud, FaDatabase, FaTerminal } from 'react-icons/fa';

const Template1 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 1 || data.templateId === undefined) {
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
    name: 'Alex Chen',
    jobTitle: 'Full-Stack Developer & Cloud Architect',
    tagline: 'Building scalable solutions with React, Node.js, and AWS',
    location: 'San Francisco, CA',
    email: 'alex@devportfolio.com',
    phone: '+1 (555) 123-4567',
    bio: `Passionate software engineer with 5+ years of experience building 
          high-performance web applications. Specialized in microservices architecture, 
          real-time systems, and cloud infrastructure.`,
    availability: 'Open to Opportunities',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    frontend: ['React.js', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Express', 'GraphQL', 'REST APIs'],
    devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    databases: ['MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch'],
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
    education: {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      period: '2018 - 2020',
      specialization: 'Specialization in Distributed Systems and Cloud Computing'
    },
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Kubernetes Administrator'],
    stats: { projects: '50+', years: '5', uptime: '99%' }
  };

  // Merge user data with defaults
  const data = { ...defaultData, ...userData };

  // Show loading state
  if (isLoading) {
    return (
      <div className="template1 loading-container">
        <div className="loading-spinner">
          <FaTerminal className="spinner-icon" />
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="template1">
      {/* Futuristic Navigation */}
      <nav className="dev-nav">
        <div className="nav-logo">
          <FaTerminal className="logo-icon" />
          <span className="logo-text">DEV.<span className="highlight">PORTFOLIO</span></span>
        </div>
        <div className="nav-links">
          <a href="#hero">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-cta">VIEW RESUME</button>
      </nav>

      {/* Hero with Animated Background */}
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
            <span className="gradient-text">{(data.name || '').toUpperCase()}</span>
            <span className="title-cursor">_</span>
          </h1>
          <h2 className="hero-subtitle">
            <span className="typewriter">{(data.jobTitle || '').toUpperCase()}</span>
          </h2>
          <p className="hero-desc">
            {data.tagline || 'Building scalable solutions with '}
            {data.tagline ? '' : (
              <>
                <span className="tech-highlight">React</span>, 
                <span className="tech-highlight"> Node.js</span>, and <span className="tech-highlight">AWS</span>
              </>
            )}
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
                  <strong>Location:</strong> {data.location || 'Not specified'}
                </div>
                <div className="detail">
                  <strong>Email:</strong> {data.email || 'Not specified'}
                </div>
                <div className="detail">
                  <strong>Availability:</strong> {data.availability || 'Not specified'}
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
  name: "${data.name || ''}",
  role: "${data.jobTitle || ''}",
  skills: ["React", "Node.js", "AWS", "Docker"],
  experience: "${data.stats?.years || '5+'}+ years",
  location: "${data.location || ''}",
  availability: ${(data.availability || '').includes('Open') ? 'true' : 'false'}
};`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">02</span>
              TECH STACK
            </h2>
          </div>
          <div className="skills-categories">
            <div className="category">
              <div className="category-icon"><FaCode /></div>
              <h3>Frontend</h3>
              <div className="skills-list">
                {(data.frontend || []).map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
            <div className="category">
              <div className="category-icon"><FaServer /></div>
              <h3>Backend</h3>
              <div className="skills-list">
                {(data.backend || []).map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
            <div className="category">
              <div className="category-icon"><FaCloud /></div>
              <h3>DevOps</h3>
              <div className="skills-list">
                {(data.devops || []).map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
            <div className="category">
              <div className="category-icon"><FaDatabase /></div>
              <h3>Databases</h3>
              <div className="skills-list">
                {(data.databases || []).map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">03</span>
              FEATURED PROJECTS
            </h2>
          </div>
          <div className="projects-grid">
            {(data.projects || []).map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <div className="project-badge">{project.badge || 'PROJECT'}</div>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {(project.technologies || []).map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <div className="project-stats">
                  {project.stats && Object.entries(project.stats || {}).map(([key, value], i) => (
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

      {/* Experience Timeline */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">04</span>
              EXPERIENCE
            </h2>
          </div>
          <div className="timeline">
            {(data.experiences || []).map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-date">{exp.period}</div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company} • {exp.location}</h4>
                  <ul>
                    {(exp.bullets || []).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">05</span>
              EDUCATION & CERTIFICATIONS
            </h2>
          </div>
          <div className="education-grid">
            {data.education && (
              <div className="education-card">
                <h3>{data.education.degree}</h3>
                <h4>{data.education.institution} • {data.education.period}</h4>
                {data.education.specialization && (
                  <p>{data.education.specialization}</p>
                )}
              </div>
            )}
            {(data.certifications || []).length > 0 && (
              <div className="education-card">
                <h3>Certifications</h3>
                <div className="certifications">
                  {(data.certifications || []).map((cert, index) => (
                    <span key={index} className="cert">{cert}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-number">06</span>
              GET IN TOUCH
            </h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Build Something Amazing</h3>
              <p>Open to freelance projects, full-time opportunities, and technical discussions.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> {data.email || 'Not specified'}
                </div>
                {data.phone && (
                  <div className="contact-item">
                    <strong>Phone:</strong> {data.phone}
                  </div>
                )}
                <div className="contact-item">
                  <strong>Location:</strong> {data.location || 'Not specified'}
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
              <FaTerminal /> DEV.PORTFOLIO
            </div>
            <p>© 2024 {data.name || ''}. All code and designs are original.</p>
            <div className="footer-links">
              <a href="#hero">Home</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template1;