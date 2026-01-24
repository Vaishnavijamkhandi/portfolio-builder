import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMagic, FaSpinner, FaChartBar, FaFileExcel, FaDatabase, 
  FaLightbulb, FaBusinessTime, FaUserTie, FaGraduationCap,
  FaCertificate, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt
} from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template4Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Business Analyst Info
    name: 'Michael Roberts',
    title: 'Business Analyst & Strategy Consultant',
    tagline: 'Driving Business Growth Through Data-Driven Insights',
    experience: '8+ years',
    location: 'New York, NY',
    email: 'michael@businessanalyst.com',
    phone: '+1 (212) 555-7890',
    bio: `Senior Business Analyst with 8+ years of experience transforming 
          complex business challenges into actionable strategies and measurable results.`,
    
    // Business Links
    linkedin: 'https://linkedin.com/in/michaelroberts',
    
    // Business Metrics
    metrics: {
      costSavings: '$2.5M+',
      processImprovement: '45%',
      projects: '50+'
    },
    
    // Performance Data for Charts
    performanceData: [
      { name: 'Q1', revenue: 450000, profit: 120000 },
      { name: 'Q2', revenue: 520000, profit: 150000 },
      { name: 'Q3', revenue: 480000, profit: 130000 },
      { name: 'Q4', revenue: 600000, profit: 180000 },
    ],
    
    // Skill Data for Pie Chart
    skillData: [
      { name: 'Data Analysis', value: 95 },
      { name: 'Strategy', value: 90 },
      { name: 'Reporting', value: 85 },
      { name: 'Process', value: 88 },
    ],
    
    // Core Expertise Areas
    expertise: [
      {
        title: 'Business Intelligence',
        icon: 'chart',
        items: [
          'Data Analysis & Interpretation',
          'KPI Development & Tracking',
          'Dashboard Creation',
          'Predictive Analytics'
        ]
      },
      {
        title: 'Strategic Planning',
        icon: 'lightbulb',
        items: [
          'Market Analysis',
          'Competitive Intelligence',
          'Business Process Reengineering',
          'Risk Assessment'
        ]
      },
      {
        title: 'Process Optimization',
        icon: 'excel',
        items: [
          'Workflow Analysis',
          'Six Sigma Methodology',
          'Lean Principles',
          'Automation Strategies'
        ]
      }
    ],
    
    // Technical Toolkit
    analyticsTools: ['Tableau', 'Power BI', 'Excel Advanced', 'SQL', 'Python'],
    businessTools: ['SAP', 'Salesforce', 'JIRA', 'Confluence'],
    methodologies: ['Agile/Scrum', 'Six Sigma', 'Lean', 'Waterfall'],
    
    // Case Studies
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
    
    // Professional Experience
    experienceList: [
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
    
    // Education
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
    
    // Certifications
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
    
    // EmailJS
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'michael@businessanalyst.com'
    },
    
    // Consultation Types
    consultationTypes: [
      'Business Analysis',
      'Process Optimization', 
      'Strategy Development',
      'Data Analytics',
      'Full Consultation'
    ],
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'michaelroberts'
    }
  });

  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `Business Analyst portfolio, ${formData.experience} experience`;
      
      if (index !== null) {
        if (field === 'caseStudies') {
          improvedText = await improveWithAI('caseStudy', formData.caseStudies[index].solution, 4, {
            name: formData.name,
            title: formData.title
          });
          
          const newCaseStudies = [...formData.caseStudies];
          newCaseStudies[index].solution = improvedText;
          setFormData({...formData, caseStudies: newCaseStudies});
        }
      } else {
        improvedText = await improveWithAI(field, formData[field], 4, {
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

  // Add case study
  const addCaseStudy = () => {
    setFormData(prev => ({
      ...prev,
      caseStudies: [...prev.caseStudies, {
        industry: 'RETAIL',
        title: 'New Case Study',
        client: 'Client Company',
        challenge: 'Business challenge...',
        solution: 'Your solution...',
        results: [
          { value: '0%', label: 'Improvement' },
          { value: '$0', label: 'Savings' },
          { value: '0%', label: 'Increase' }
        ]
      }]
    }));
  };

  // Remove case study
  const removeCaseStudy = (index) => {
    if (formData.caseStudies.length <= 1) {
      alert('You need at least one case study');
      return;
    }
    
    if (window.confirm('Delete this case study?')) {
      const newCaseStudies = [...formData.caseStudies];
      newCaseStudies.splice(index, 1);
      setFormData({...formData, caseStudies: newCaseStudies});
    }
  };

  // Add experience entry
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experienceList: [...prev.experienceList, {
        period: 'YYYY - Present',
        title: 'Job Title',
        company: 'Company Name • Location',
        items: ['Achievement 1', 'Achievement 2']
      }]
    }));
  };

  // Remove experience entry
  const removeExperience = (index) => {
    if (formData.experienceList.length <= 1) {
      alert('You need at least one experience entry');
      return;
    }
    
    if (window.confirm('Delete this experience entry?')) {
      const newExp = [...formData.experienceList];
      newExp.splice(index, 1);
      setFormData({...formData, experienceList: newExp});
    }
  };

  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Transform data to match template structure
      const portfolioData = {
        ...formData,
        templateId: 4,
        createdAt: new Date().toISOString(),
        // Ensure template expects these field names
        experience: formData.experienceList, // Rename to match template
        certifications: formData.certifications
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
    <div className="template-form template4-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaChartBar /> Business Analyst Portfolio Setup</h1>
        <p>Showcase your business impact, case studies, and consulting services</p>
      </div>

      <div id="ai-success" className="ai-success-message">
        ✨ Business content improved with AI!
      </div>

      {/* BUSINESS PROFILE */}
      <div className="form-section">
        <h2><FaUserTie /> Business Professional Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Michael Roberts"
            />
          </div>
          
          <div className="form-group">
            <label>Professional Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Business Analyst & Strategy Consultant"
            />
          </div>
          
          <div className="form-group">
            <label>Years Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="8+ years"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Professional Summary *
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
              placeholder="Describe your business analysis expertise and impact..."
            />
          </div>
        </div>
      </div>

      {/* BUSINESS METRICS */}
      <div className="form-section">
        <h2><FaChartBar /> Business Impact Metrics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Cost Savings Identified</label>
            <input
              type="text"
              value={formData.metrics.costSavings}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, costSavings: e.target.value}
              })}
              placeholder="$2.5M+"
            />
          </div>
          
          <div className="form-group">
            <label>Average Process Improvement</label>
            <input
              type="text"
              value={formData.metrics.processImprovement}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, processImprovement: e.target.value}
              })}
              placeholder="45%"
            />
          </div>
          
          <div className="form-group">
            <label>Enterprise Projects</label>
            <input
              type="text"
              value={formData.metrics.projects}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, projects: e.target.value}
              })}
              placeholder="50+"
            />
          </div>
        </div>
      </div>

      {/* PERFORMANCE DATA FOR CHARTS */}
      <div className="form-section">
        <h2><FaChartBar /> Quarterly Performance Data</h2>
        <div className="form-grid">
          {formData.performanceData.map((quarter, index) => (
            <div key={index} className="quarter-form">
              <h4>{quarter.name}</h4>
              <div className="form-grid compact">
                <div className="form-group">
                  <label>Revenue ($)</label>
                  <input
                    type="number"
                    value={quarter.revenue}
                    onChange={(e) => {
                      const newData = [...formData.performanceData];
                      newData[index].revenue = parseInt(e.target.value) || 0;
                      setFormData({...formData, performanceData: newData});
                    }}
                    placeholder="450000"
                  />
                </div>
                <div className="form-group">
                  <label>Profit ($)</label>
                  <input
                    type="number"
                    value={quarter.profit}
                    onChange={(e) => {
                      const newData = [...formData.performanceData];
                      newData[index].profit = parseInt(e.target.value) || 0;
                      setFormData({...formData, performanceData: newData});
                    }}
                    placeholder="120000"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SKILL DATA FOR PIE CHART */}
      <div className="form-section">
        <h2><FaUserTie /> Skill Competencies</h2>
        <div className="form-grid">
          {formData.skillData.map((skill, index) => (
            <div key={index} className="skill-form">
              <h4>{skill.name}</h4>
              <div className="form-group">
                <label>Proficiency %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.value}
                  onChange={(e) => {
                    const newData = [...formData.skillData];
                    newData[index].value = parseInt(e.target.value) || 0;
                    setFormData({...formData, skillData: newData});
                  }}
                  placeholder="95"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CORE EXPERTISE */}
      <div className="form-section">
        <h2><FaLightbulb /> Core Expertise Areas</h2>
        
        {formData.expertise.map((area, index) => (
          <div key={index} className="expertise-area">
            <h3>{area.title}</h3>
            
            <div className="form-grid">
              {area.items.map((item, itemIndex) => (
                <div key={itemIndex} className="form-group">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newExpertise = [...formData.expertise];
                      newExpertise[index].items[itemIndex] = e.target.value;
                      setFormData({...formData, expertise: newExpertise});
                    }}
                    placeholder="Expertise item..."
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CASE STUDIES */}
      <div className="form-section">
        <div className="section-header">
          <h2><FaFileExcel /> Business Case Studies</h2>
          <button type="button" className="add-section-btn" onClick={addCaseStudy}>
            + Add Case Study
          </button>
        </div>
        
        {formData.caseStudies.map((caseStudy, index) => (
          <div key={index} className="case-study-form">
            <div className="card-header">
              <h3>Case Study {index + 1}</h3>
              <button 
                type="button"
                className="remove-btn"
                onClick={() => removeCaseStudy(index)}
                disabled={formData.caseStudies.length <= 1}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Industry</label>
                <select
                  value={caseStudy.industry}
                  onChange={(e) => {
                    const newCaseStudies = [...formData.caseStudies];
                    newCaseStudies[index].industry = e.target.value;
                    setFormData({...formData, caseStudies: newCaseStudies});
                  }}
                >
                  <option value="RETAIL">Retail</option>
                  <option value="FINANCE">Finance</option>
                  <option value="HEALTHCARE">Healthcare</option>
                  <option value="TECH">Technology</option>
                  <option value="MANUFACTURING">Manufacturing</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Case Study Title *</label>
                <input
                  type="text"
                  value={caseStudy.title}
                  onChange={(e) => {
                    const newCaseStudies = [...formData.caseStudies];
                    newCaseStudies[index].title = e.target.value;
                    setFormData({...formData, caseStudies: newCaseStudies});
                  }}
                  placeholder="Inventory Optimization"
                />
              </div>
              
              <div className="form-group">
                <label>Client Company</label>
                <input
                  type="text"
                  value={caseStudy.client}
                  onChange={(e) => {
                    const newCaseStudies = [...formData.caseStudies];
                    newCaseStudies[index].client = e.target.value;
                    setFormData({...formData, caseStudies: newCaseStudies});
                  }}
                  placeholder="Major Retail Chain"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Business Challenge</label>
                <textarea
                  value={caseStudy.challenge}
                  onChange={(e) => {
                    const newCaseStudies = [...formData.caseStudies];
                    newCaseStudies[index].challenge = e.target.value;
                    setFormData({...formData, caseStudies: newCaseStudies});
                  }}
                  rows={2}
                  placeholder="Describe the business problem..."
                />
              </div>
              
              <div className="form-group full-width">
                <label>
                  Your Solution *
                  <button 
                    type="button"
                    className="ai-improve-btn"
                    onClick={() => handleAIImprovement('caseStudies', index)}
                    disabled={aiLoading.caseStudies}
                  >
                    {aiLoading.caseStudies ? <FaSpinner className="spinner" /> : <FaMagic />}
                    Improve with AI
                  </button>
                </label>
                <textarea
                  value={caseStudy.solution}
                  onChange={(e) => {
                    const newCaseStudies = [...formData.caseStudies];
                    newCaseStudies[index].solution = e.target.value;
                    setFormData({...formData, caseStudies: newCaseStudies});
                  }}
                  rows={3}
                  placeholder="Describe your analytical approach and solution..."
                />
              </div>
              
              {/* Results */}
              {caseStudy.results.map((result, resultIndex) => (
                <React.Fragment key={resultIndex}>
                  <div className="form-group">
                    <label>Result {resultIndex + 1} - Value</label>
                    <input
                      type="text"
                      value={result.value}
                      onChange={(e) => {
                        const newCaseStudies = [...formData.caseStudies];
                        newCaseStudies[index].results[resultIndex].value = e.target.value;
                        setFormData({...formData, caseStudies: newCaseStudies});
                      }}
                      placeholder={resultIndex === 0 ? '30%' : resultIndex === 1 ? '$850K' : '15%'}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Result {resultIndex + 1} - Label</label>
                    <input
                      type="text"
                      value={result.label}
                      onChange={(e) => {
                        const newCaseStudies = [...formData.caseStudies];
                        newCaseStudies[index].results[resultIndex].label = e.target.value;
                        setFormData({...formData, caseStudies: newCaseStudies});
                      }}
                      placeholder={resultIndex === 0 ? 'Inventory Reduction' : resultIndex === 1 ? 'Annual Savings' : 'Sales Increase'}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="form-section">
        <div className="section-header">
          <h2><FaUserTie /> Professional Experience</h2>
          <button type="button" className="add-section-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>
        
        {formData.experienceList.map((exp, index) => (
          <div key={index} className="experience-form">
            <div className="card-header">
              <h3>Experience {index + 1}</h3>
              <button 
                type="button"
                className="remove-btn"
                onClick={() => removeExperience(index)}
                disabled={formData.experienceList.length <= 1}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Time Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => {
                    const newExp = [...formData.experienceList];
                    newExp[index].period = e.target.value;
                    setFormData({...formData, experienceList: newExp});
                  }}
                  placeholder="2021 - Present"
                />
              </div>
              
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...formData.experienceList];
                    newExp[index].title = e.target.value;
                    setFormData({...formData, experienceList: newExp});
                  }}
                  placeholder="Lead Business Analyst"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Company & Location</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...formData.experienceList];
                    newExp[index].company = e.target.value;
                    setFormData({...formData, experienceList: newExp});
                  }}
                  placeholder="Global Corp Inc. • New York, NY"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Achievements (one per line)</label>
                <textarea
                  value={exp.items.join('\n')}
                  onChange={(e) => {
                    const newExp = [...formData.experienceList];
                    newExp[index].items = e.target.value.split('\n').filter(item => item.trim());
                    setFormData({...formData, experienceList: newExp});
                  }}
                  rows={4}
                  placeholder="Led business intelligence team of 8 analysts\nImplemented enterprise-wide analytics platform"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="form-section">
        <h2><FaGraduationCap /> Education</h2>
        
        {formData.education.map((edu, index) => (
          <div key={index} className="education-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].degree = e.target.value;
                    setFormData({...formData, education: newEdu});
                  }}
                  placeholder="MBA, Business Analytics"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Institution & Period</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].school = e.target.value;
                    setFormData({...formData, education: newEdu});
                  }}
                  placeholder="Harvard Business School • 2016 - 2018"
                />
              </div>
              
              <div className="form-group">
                <label>Achievement (Optional)</label>
                <input
                  type="text"
                  value={edu.achievement || ''}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].achievement = e.target.value;
                    setFormData({...formData, education: newEdu});
                  }}
                  placeholder="Graduated Summa Cum Laude"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TECHNICAL TOOLKIT */}
      <div className="form-section">
        <h2><FaDatabase /> Business Analysis Toolkit</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Analytics Tools</label>
            <input
              type="text"
              value={formData.analyticsTools.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                analyticsTools: e.target.value.split(',').map(t => t.trim())
              })}
              placeholder="Tableau, Power BI, Excel, SQL"
            />
          </div>
          
          <div className="form-group">
            <label>Business Software</label>
            <input
              type="text"
              value={formData.businessTools.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                businessTools: e.target.value.split(',').map(t => t.trim())
              })}
              placeholder="SAP, Salesforce, JIRA"
            />
          </div>
          
          <div className="form-group">
            <label>Methodologies</label>
            <input
              type="text"
              value={formData.methodologies.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                methodologies: e.target.value.split(',').map(m => m.trim())
              })}
              placeholder="Agile, Six Sigma, Lean"
            />
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="form-section">
        <h2><FaCertificate /> Professional Certifications</h2>
        
        <div className="certifications-grid">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="certification-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Certification Name</label>
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].title = e.target.value;
                      setFormData({...formData, certifications: newCerts});
                    }}
                    placeholder="CBAP"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Certification Detail</label>
                  <input
                    type="text"
                    value={cert.description}
                    onChange={(e) => {
                      const newCerts = [...formData.certifications];
                      newCerts[index].description = e.target.value;
                      setFormData({...formData, certifications: newCerts});
                    }}
                    placeholder="Certified Business Analysis Professional"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONSULTATION SERVICES */}
      <div className="form-section">
        <h2><FaBusinessTime /> Consultation Services</h2>
        
        <div className="form-group full-width">
          <label>Available Services (comma separated)</label>
          <input
            type="text"
            value={formData.consultationTypes.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              consultationTypes: e.target.value.split(',').map(s => s.trim())
            })}
            placeholder="Business Analysis, Process Optimization, Strategy Development"
          />
          <small>These will appear in your contact form dropdown</small>
        </div>
      </div>

      {/* EMAILJS & DEPLOYMENT */}
      <div className="form-section">
        <h2><FaEnvelope /> Contact & Deployment</h2>
        <EmailJSSetup />
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn Profile</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaPhone /> Business Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (212) 555-7890"
            />
          </div>
          
          <div className="form-group">
            <label><FaMapMarkerAlt /> Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="New York, NY"
            />
          </div>
          
          <div className="form-group">
            <label>Portfolio Username</label>
            <input
              type="text"
              value={formData.deployment.username}
              onChange={(e) => setFormData({
                ...formData, 
                deployment: {...formData.deployment, username: e.target.value}
              })}
              placeholder="michaelroberts"
            />
            <small>Will create: username-businessportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Business Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'business'}-businessportfolio.vercel.app`}
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
      templateId: 4
    }));
    navigate('/preview/4'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview Business Analyst Portfolio
</button>
        
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '📈 Launch Business Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template4Form;