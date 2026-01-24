import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { 
  FaChartBar, FaFileExcel, FaDatabase, FaLightbulb, 
  FaBusinessTime, FaUserTie, FaGraduationCap, FaCertificate,
  FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Template4 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [contactForm, setContactForm] = useState({ 
    name: '', 
    email: '', 
    message: '', 
    company: '', 
    service: '' 
  });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 4 || data.templateId === undefined) {
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
          company: contactForm.company,
          service: contactForm.service,
          to_email: emailjsConfig.contactEmail || userData?.email
        },
        emailjsConfig.userId
      )
      .then(() => alert('Consultation request sent successfully!'))
      .catch(() => alert('Failed to send message.'));
    } else {
      alert(`Consultation request would be sent to: ${emailjsConfig.contactEmail || userData?.email || 'your email'}`);
    }
    
    setContactForm({ name: '', email: '', message: '', company: '', service: '' });
  };

  // Use user data or defaults
  const data = userData || {
    name: 'Michael Roberts',
    title: 'Business Analyst & Strategy Consultant',
    email: 'michael@businessanalyst.com',
    phone: '+1 (212) 555-7890',
    location: 'New York, NY',
    linkedin: 'https://linkedin.com/in/michaelroberts',
    bio: 'Senior Business Analyst with 8+ years of experience transforming complex business challenges into actionable strategies and measurable results.',
    metrics: { 
      costSavings: '$2.5M+', 
      processImprovement: '45%', 
      projects: '50+' 
    },
    performanceData: [
      { name: 'Q1', revenue: 450000, profit: 120000 },
      { name: 'Q2', revenue: 520000, profit: 150000 },
      { name: 'Q3', revenue: 480000, profit: 130000 },
      { name: 'Q4', revenue: 600000, profit: 180000 },
    ],
    skillData: [
      { name: 'Data Analysis', value: 95 },
      { name: 'Strategy', value: 90 },
      { name: 'Reporting', value: 85 },
      { name: 'Process', value: 88 },
    ],
    expertise: [
      {
        title: 'Business Intelligence',
        icon: 'FaChartBar',
        items: [
          'Data Analysis & Interpretation',
          'KPI Development & Tracking',
          'Dashboard Creation',
          'Predictive Analytics'
        ]
      },
      {
        title: 'Strategic Planning',
        icon: 'FaLightbulb',
        items: [
          'Market Analysis',
          'Competitive Intelligence',
          'Business Process Reengineering',
          'Risk Assessment'
        ]
      },
      {
        title: 'Process Optimization',
        icon: 'FaFileExcel',
        items: [
          'Workflow Analysis',
          'Six Sigma Methodology',
          'Lean Principles',
          'Automation Strategies'
        ]
      }
    ],
    caseStudies: [
      {
        industry: 'RETAIL',
        title: 'Inventory Optimization',
        client: 'Major Retail Chain',
        challenge: '$3M annual loss from inventory mismanagement',
        solution: 'Implemented predictive analytics system',
        results: [
          { value: '30%', label: 'Inventory Reduction' },
          { value: '$850K', label: 'Annual Savings' },
          { value: '15%', label: 'Sales Increase' }
        ]
      },
      {
        industry: 'FINANCE',
        title: 'Process Automation',
        client: 'Financial Institution',
        challenge: '40 hours weekly manual reporting',
        solution: 'Developed automated reporting system',
        results: [
          { value: '70%', label: 'Time Saved' },
          { value: '100%', label: 'Accuracy' },
          { value: '$200K', label: 'ROI' }
        ]
      }
    ],
    experience: [
      {
        period: '2021 - Present',
        title: 'Lead Business Analyst',
        company: 'Global Corp Inc. • New York, NY',
        items: [
          'Led business intelligence team of 8 analysts',
          'Implemented enterprise-wide analytics platform',
          'Reduced operational costs by 25% through process optimization',
          'Mentored junior analysts and developed training programs'
        ]
      },
      {
        period: '2018 - 2021',
        title: 'Senior Business Analyst',
        company: 'TechSolutions Ltd. • Chicago, IL',
        items: [
          'Managed $2M+ portfolio of business improvement projects',
          'Developed predictive models increasing forecast accuracy by 40%',
          'Implemented CRM system improving sales efficiency by 35%',
          'Received "Analyst of the Year" award 2020'
        ]
      }
    ],
    education: [
      {
        degree: 'MBA, Business Analytics',
        school: 'Harvard Business School • 2016 - 2018',
        achievement: 'Graduated Summa Cum Laude'
      },
      {
        degree: 'B.Sc. Economics',
        school: 'University of Chicago • 2012 - 2016'
      }
    ],
    certifications: [
      {
        title: 'CBAP',
        description: 'Certified Business Analysis Professional'
      },
      {
        title: 'PMP',
        description: 'Project Management Professional'
      },
      {
        title: 'Six Sigma Black Belt',
        description: 'Process Improvement Specialist'
      }
    ],
    analyticsTools: ['Tableau', 'Power BI', 'Excel Advanced', 'SQL', 'Python'],
    businessTools: ['SAP', 'Salesforce', 'JIRA', 'Confluence'],
    methodologies: ['Agile/Scrum', 'Six Sigma', 'Lean', 'Waterfall']
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="template4">
      {/* Corporate Navigation */}
      <nav className="corporate-nav">
        <div className="nav-brand">
          <FaChartBar className="brand-icon" />
          <div className="brand-text">
            <span className="brand-name">{data.name?.toUpperCase() || 'MICHAEL ROBERTS'}</span>
            <span className="brand-title">{data.title || 'Business Analyst & Strategy Consultant'}</span>
          </div>
        </div>
        <div className="nav-menu">
          <a href="#overview">OVERVIEW</a>
          <a href="#expertise">EXPERTISE</a>
          <a href="#case-studies">CASE STUDIES</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-consultation">REQUEST CONSULTATION</button>
      </nav>

      {/* Executive Summary */}
      <section id="overview" className="executive-summary">
        <div className="summary-content">
          <h1 className="summary-title">
            Driving Business Growth Through
            <span className="highlight"> Data-Driven Insights</span>
          </h1>
          <p className="summary-subtitle">
            {data.bio}
          </p>
          <div className="summary-metrics">
            <div className="metric">
              <div className="metric-value">{data.metrics?.costSavings || '$2.5M+'}</div>
              <div className="metric-label">Cost Savings Identified</div>
            </div>
            <div className="metric">
              <div className="metric-value">{data.metrics?.processImprovement || '45%'}</div>
              <div className="metric-label">Average Process Improvement</div>
            </div>
            <div className="metric">
              <div className="metric-value">{data.metrics?.projects || '50+'}</div>
              <div className="metric-label">Enterprise Projects</div>
            </div>
          </div>
        </div>
        <div className="summary-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3498db" name="Revenue" />
              <Bar dataKey="profit" fill="#2ecc71" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Core Expertise */}
      <section id="expertise" className="expertise-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaBusinessTime className="section-icon" />
              CORE EXPERTISE
            </h2>
          </div>
          <div className="expertise-grid">
            {data.expertise?.map((expertise, index) => (
              <div key={index} className="expertise-card">
                <div className="expertise-icon">
                  {expertise.icon === 'FaChartBar' && <FaChartBar />}
                  {expertise.icon === 'FaLightbulb' && <FaLightbulb />}
                  {expertise.icon === 'FaFileExcel' && <FaFileExcel />}
                </div>
                <h3>{expertise.title}</h3>
                <ul>
                  {expertise.items?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Visualization */}
      <section className="skills-visualization">
        <div className="container">
          <div className="skills-grid">
            <div className="skills-chart">
              <h3>Professional Competencies</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.skillData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.skillData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="tools-list">
              <h3>Technical Toolkit</h3>
              <div className="tool-categories">
                <div className="category">
                  <h4>Analytics Tools</h4>
                  <div className="tools">
                    {data.analyticsTools?.map((tool, i) => (
                      <span key={i} className="tool">{tool}</span>
                    ))}
                  </div>
                </div>
                <div className="category">
                  <h4>Business Tools</h4>
                  <div className="tools">
                    {data.businessTools?.map((tool, i) => (
                      <span key={i} className="tool">{tool}</span>
                    ))}
                  </div>
                </div>
                <div className="category">
                  <h4>Methodologies</h4>
                  <div className="tools">
                    {data.methodologies?.map((tool, i) => (
                      <span key={i} className="tool">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="case-studies">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaDatabase className="section-icon" />
              SUCCESS STORIES
            </h2>
          </div>
          <div className="case-grid">
            {data.caseStudies?.map((caseStudy, index) => (
              <div key={index} className="case-study">
                <div className="case-header">
                  <div className="case-industry">{caseStudy.industry}</div>
                  <h3>{caseStudy.title}</h3>
                </div>
                <div className="case-client">{caseStudy.client}</div>
                <div className="case-challenge">
                  <strong>Challenge:</strong> {caseStudy.challenge}
                </div>
                <div className="case-solution">
                  <strong>Solution:</strong> {caseStudy.solution}
                </div>
                <div className="case-results">
                  {caseStudy.results?.map((result, i) => (
                    <div key={i} className="result">
                      <div className="result-value">{result.value}</div>
                      <div className="result-label">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section id="experience" className="professional-experience">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaUserTie className="section-icon" />
              PROFESSIONAL JOURNEY
            </h2>
          </div>
          <div className="experience-timeline">
            {data.experience?.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-period">{exp.period}</div>
                <div className="timeline-content">
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <ul>
                    {exp.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="education-certifications">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaGraduationCap className="section-icon" />
              QUALIFICATIONS
            </h2>
          </div>
          <div className="qualifications-grid">
            <div className="education">
              <h3>Education</h3>
              {data.education?.map((edu, index) => (
                <div key={index} className="degree">
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                  {edu.achievement && <p className="achievement">{edu.achievement}</p>}
                </div>
              ))}
            </div>
            <div className="certifications">
              <h3>Professional Certifications</h3>
              <div className="certs-grid">
                {data.certifications?.map((cert, index) => (
                  <div key={index} className="cert">
                    <FaCertificate className="cert-icon" />
                    <div>
                      <h4>{cert.title}</h4>
                      <p>{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Consultation */}
      <section id="contact" className="consultation-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaEnvelope className="section-icon" />
              STRATEGIC CONSULTATION
            </h2>
          </div>
          <div className="consultation-grid">
            <div className="contact-info">
              <h3>Ready to Optimize Your Business?</h3>
              <p>Available for strategic consulting, workshops, and speaking engagements.</p>
              <div className="contact-details">
                <div className="detail">
                  <FaEnvelope className="detail-icon" />
                  <div>
                    <strong>Email</strong>
                    <p>{data.email}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaPhone className="detail-icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>{data.phone}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaMapMarkerAlt className="detail-icon" />
                  <div>
                    <strong>Location</strong>
                    <p>{data.location} • Available Worldwide</p>
                  </div>
                </div>
                {data.linkedin && (
                  <div className="detail">
                    <FaLinkedin className="detail-icon" />
                    <div>
                      <strong>LinkedIn</strong>
                      <p>{data.linkedin.replace('https://', '')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <form className="consultation-form" onSubmit={handleSubmit}>
              <h3>Request Consultation</h3>
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
                  placeholder="Business Email" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Company" 
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select 
                  value={contactForm.service}
                  onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                  required
                >
                  <option value="">Service Required</option>
                  <option>Business Analysis</option>
                  <option>Process Optimization</option>
                  <option>Strategy Development</option>
                  <option>Data Analytics</option>
                  <option>Full Consultation</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Describe your business challenge..." 
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                SCHEDULE CONSULTATION
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="corporate-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <FaChartBar className="footer-icon" />
              <div>
                <h4>{data.name}</h4>
                <p>Business Analysis & Strategic Consulting</p>
              </div>
            </div>
            <div className="footer-links">
              <a href="#overview">Overview</a>
              <a href="#expertise">Expertise</a>
              <a href="#case-studies">Case Studies</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-legal">
              <p>© 2024 {data.name}. All rights reserved.</p>
              <p>Professional Business Analyst | Data-Driven Solutions</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template4;