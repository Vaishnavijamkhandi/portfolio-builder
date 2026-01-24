import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { 
  FaRocket, FaChartLine, FaHashtag, FaEnvelope, 
  FaSearch, FaVideo, FaBullhorn, FaUsers,
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin,
  FaTiktok, FaYoutube, FaPhone, FaArrowUp
} from 'react-icons/fa';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const Template5 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [contactForm, setContactForm] = useState({ 
    name: '', 
    email: '', 
    message: '', 
    website: '', 
    budget: '' 
  });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 5 || data.templateId === undefined) {
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
          website: contactForm.website,
          budget: contactForm.budget,
          to_email: emailjsConfig.contactEmail || userData?.email
        },
        emailjsConfig.userId
      )
      .then(() => alert('Strategy session request sent successfully!'))
      .catch(() => alert('Failed to send message.'));
    } else {
      alert(`Strategy request would be sent to: ${emailjsConfig.contactEmail || userData?.email || 'your email'}`);
    }
    
    setContactForm({ name: '', email: '', message: '', website: '', budget: '' });
  };

  // Use user data or defaults
  const data = userData || {
    name: 'Emily Chen',
    title: 'Digital Growth Strategist',
    email: 'emily@digitalmarketer.com',
    phone: '+1 (310) 555-1234',
    bio: 'Digital Marketing Strategist delivering 300%+ ROI for brands through innovative campaigns and conversion optimization.',
    metrics: { 
      averageROI: '300%', 
      impressions: '50', 
      campaigns: '200' 
    },
    campaignData: [
      { month: 'Jan', revenue: 12000, engagement: 4500 },
      { month: 'Feb', revenue: 19000, engagement: 5200 },
      { month: 'Mar', revenue: 15000, engagement: 4800 },
      { month: 'Apr', revenue: 28000, engagement: 6500 },
      { month: 'May', revenue: 32000, engagement: 7200 },
      { month: 'Jun', revenue: 40000, engagement: 8500 },
    ],
    platformData: [
      { 
        name: 'Instagram', 
        value: 35, 
        color: '#E4405F',
        icon: 'FaInstagram',
        engagement: '400%'
      },
      { 
        name: 'Facebook', 
        value: 25, 
        color: '#1877F2',
        icon: 'FaFacebook',
        engagement: '350%'
      },
      { 
        name: 'TikTok', 
        value: 20, 
        color: '#000000',
        icon: 'FaTiktok',
        engagement: '450%'
      },
      { 
        name: 'LinkedIn', 
        value: 15, 
        color: '#0A66C2',
        icon: 'FaLinkedin',
        engagement: '300%'
      },
      { 
        name: 'Twitter', 
        value: 5, 
        color: '#1DA1F2',
        icon: 'FaTwitter',
        engagement: '250%'
      },
    ],
    services: [
      {
        title: 'SEO & Content Strategy',
        icon: 'FaSearch',
        items: [
          'Keyword Research & Optimization',
          'Content Marketing Strategy',
          'Technical SEO Audits',
          'Link Building Campaigns'
        ],
        metrics: { value: '+250%', label: 'Organic Traffic' }
      },
      {
        title: 'Social Media Marketing',
        icon: 'FaHashtag',
        items: [
          'Platform Strategy Development',
          'Content Creation & Calendar',
          'Community Management',
          'Influencer Partnerships'
        ],
        metrics: { value: '+400%', label: 'Engagement' }
      },
      {
        title: 'Email Marketing',
        icon: 'FaEnvelope',
        items: [
          'Automation Strategy',
          'Segmentation & Personalization',
          'A/B Testing',
          'Revenue Attribution'
        ],
        metrics: { value: '35%', label: 'Open Rate' }
      }
    ],
    campaigns: [
      {
        client: 'E-COMMERCE BRAND',
        title: 'Holiday Sales Campaign',
        period: 'Q4 2023 • 3 Months',
        results: [
          { value: '+350%', label: 'Revenue Increase' },
          { value: '+15,000', label: 'New Customers' },
          { value: '12%', label: 'Conversion Rate' }
        ],
        platforms: ['Instagram Ads', 'Google Shopping', 'Email Sequences'],
        featured: true
      },
      {
        client: 'SaaS STARTUP',
        title: 'Product Launch',
        period: 'Q2 2023 • 6 Months',
        results: [
          { value: '+5,000', label: 'Sign-ups' },
          { value: '-$15', label: 'Cost Per Lead' },
          { value: '12%', label: 'Free to Paid' }
        ],
        platforms: ['LinkedIn Ads', 'Content Marketing', 'Webinars']
      }
    ],
    tools: {
      analytics: ['Google Analytics', 'Mixpanel', 'Hotjar', 'SEMrush'],
      automation: ['HubSpot', 'Mailchimp', 'ActiveCampaign', 'Zapier'],
      advertising: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'TikTok Ads']
    },
    socialLinks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      tiktok: 'https://tiktok.com'
    }
  };

  return (
    <div className="template5">
      {/* Dynamic Navigation */}
      <nav className="marketing-nav">
        <div className="nav-brand">
          <FaRocket className="brand-icon" />
          <span className="brand-name">{data.name?.toUpperCase() || 'EMILY CHEN'}</span>
          <span className="brand-tag">{data.title || 'DIGITAL GROWTH STRATEGIST'}</span>
        </div>
        <div className="nav-links">
          <a href="#results">RESULTS</a>
          <a href="#services">SERVICES</a>
          <a href="#campaigns">CAMPAIGNS</a>
          <a href="#strategy">STRATEGY</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-free-audit">FREE AUDIT</button>
      </nav>

      {/* Hero with Animated Metrics */}
      <section className="marketing-hero">
        <div className="hero-bg">
          <div className="floating-icons">
            <FaHashtag className="icon" />
            <FaChartLine className="icon" />
            <FaRocket className="icon" />
            <FaBullhorn className="icon" />
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            EXPLOSIVE GROWTH THROUGH
            <span className="hero-highlight"> DATA-DRIVEN MARKETING</span>
          </h1>
          <p className="hero-subtitle">
            {data.bio}
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number" data-target="300">{data.metrics?.averageROI?.replace('%', '') || '300'}</div>
              <div className="stat-label">Average ROI</div>
            </div>
            <div className="stat">
              <div className="stat-number" data-target="50">{data.metrics?.impressions || '50'}</div>
              <div className="stat-label">Million Impressions</div>
            </div>
            <div className="stat">
              <div className="stat-number" data-target="200">{data.metrics?.campaigns || '200'}</div>
              <div className="stat-label">Campaigns</div>
            </div>
          </div>
          <div className="hero-chart">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data.campaignData}>
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FF6B6B" 
                  fill="url(#colorRevenue)" 
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="platforms-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaUsers className="section-icon" />
              PLATFORM MASTERY
            </h2>
          </div>
          <div className="platforms-grid">
            {data.platformData?.map((platform, index) => (
              <div key={index} className="platform-card" style={{borderLeftColor: platform.color}}>
                <div className="platform-icon">
                  {platform.icon === 'FaInstagram' && <FaInstagram />}
                  {platform.icon === 'FaFacebook' && <FaFacebook />}
                  {platform.icon === 'FaTiktok' && <FaTiktok />}
                  {platform.icon === 'FaLinkedin' && <FaLinkedin />}
                  {platform.icon === 'FaTwitter' && <FaTwitter />}
                </div>
                <div className="platform-info">
                  <h3>{platform.name}</h3>
                  <div className="platform-metrics">
                    <div className="metric">
                      <div className="metric-value">{platform.value}%</div>
                      <div className="metric-label">Engagement Rate</div>
                    </div>
                    <div className="performance">
                      <FaArrowUp className="up-arrow" />
                      <span>{platform.engagement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaRocket className="section-icon" />
              GROWTH SERVICES
            </h2>
          </div>
          <div className="services-grid">
            {data.services?.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon === 'FaSearch' && <FaSearch />}
                  {service.icon === 'FaHashtag' && <FaHashtag />}
                  {service.icon === 'FaEnvelope' && <FaEnvelope />}
                </div>
                <h3>{service.title}</h3>
                <ul>
                  {service.items?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="service-metrics">
                  <div className="metric">
                    <div className="value">{service.metrics?.value}</div>
                    <div className="label">{service.metrics?.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Results */}
      <section id="campaigns" className="campaign-results">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaChartLine className="section-icon" />
              CAMPAIGN RESULTS
            </h2>
          </div>
          <div className="campaigns-grid">
            {data.campaigns?.map((campaign, index) => (
              <div key={index} className={`campaign-card ${campaign.featured ? 'featured' : ''}`}>
                <div className="campaign-header">
                  <div className="campaign-client">{campaign.client}</div>
                  <h3>{campaign.title}</h3>
                </div>
                <div className="campaign-period">{campaign.period}</div>
                <div className="campaign-results-grid">
                  {campaign.results?.map((result, i) => (
                    <div key={i} className="result">
                      <div className="result-value">{result.value}</div>
                      <div className="result-label">{result.label}</div>
                    </div>
                  ))}
                </div>
                <div className="campaign-platforms">
                  {campaign.platforms?.map((platform, i) => (
                    <span key={i} className="platform">{platform}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Tools */}
      <section className="tools-stack">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaBullhorn className="section-icon" />
              MARKETING STACK
            </h2>
          </div>
          <div className="tools-categories">
            <div className="category">
              <h3>Analytics & Tracking</h3>
              <div className="tools-list">
                {data.tools?.analytics?.map((tool, i) => (
                  <span key={i} className="tool">{tool}</span>
                ))}
              </div>
            </div>
            <div className="category">
              <h3>Automation & CRM</h3>
              <div className="tools-list">
                {data.tools?.automation?.map((tool, i) => (
                  <span key={i} className="tool">{tool}</span>
                ))}
              </div>
            </div>
            <div className="category">
              <h3>Advertising Platforms</h3>
              <div className="tools-list">
                {data.tools?.advertising?.map((tool, i) => (
                  <span key={i} className="tool">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Session */}
      <section id="contact" className="strategy-session">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FaVideo className="section-icon" />
              FREE STRATEGY SESSION
            </h2>
          </div>
          <div className="strategy-grid">
            <div className="strategy-offer">
              <h3>What You'll Get:</h3>
              <ul className="offer-list">
                <li>✓ Comprehensive Marketing Audit</li>
                <li>✓ Custom Growth Strategy Roadmap</li>
                <li>✓ Competitor Analysis Report</li>
                <li>✓ 60-Minute Strategy Call</li>
                <li>✓ Actionable Recommendations</li>
              </ul>
              <div className="contact-details">
                <div className="detail">
                  <FaEnvelope />
                  <span>{data.email}</span>
                </div>
                <div className="detail">
                  <FaPhone />
                  <span>{data.phone}</span>
                </div>
              </div>
            </div>
            <form className="strategy-form" onSubmit={handleSubmit}>
              <h3>Book Your Session</h3>
              <div className="form-row">
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
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Company Website" 
                  value={contactForm.website}
                  onChange={(e) => setContactForm({...contactForm, website: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select 
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({...contactForm, budget: e.target.value})}
                  required
                >
                  <option value="">Current Monthly Marketing Budget</option>
                  <option>$1,000 - $5,000</option>
                  <option>$5,000 - $20,000</option>
                  <option>$20,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="What are your biggest marketing challenges?" 
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="cta-button">
                CLAIM FREE STRATEGY SESSION
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="marketing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <FaRocket className="footer-icon" />
              <div>
                <h4>{data.name}</h4>
                <p>Digital Growth Strategist</p>
              </div>
            </div>
            <div className="footer-social">
              {data.socialLinks?.instagram && (
                <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {data.socialLinks?.twitter && (
                <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              )}
              {data.socialLinks?.youtube && (
                <a href={data.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
              {data.socialLinks?.tiktok && (
                <a href={data.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                </a>
              )}
            </div>
            <div className="footer-cta">
              <p>Ready to scale your business?</p>
              <button className="footer-button">Start Now</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 {data.name}. Driving explosive growth for ambitious brands.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template5;