import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMagic, FaSpinner, FaRocket, FaChartLine, FaHashtag, 
  FaEnvelope, FaSearch, FaVideo, FaBullhorn, FaUsers,
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok,
  FaYoutube, FaPhone, FaArrowUp
} from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template5Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Digital Marketer Info
    name: 'Emily Chen',
    title: 'Digital Growth Strategist',
    tagline: 'Explosive Growth Through Data-Driven Marketing',
    specialty: 'Digital Marketing & Conversion Optimization',
    location: 'Los Angeles, CA',
    email: 'emily@digitalmarketer.com',
    phone: '+1 (310) 555-1234',
    bio: `Digital Marketing Strategist delivering 300%+ ROI for brands through 
          innovative campaigns and conversion optimization.`,
    
    // Marketing Links
    linkedin: 'https://linkedin.com/in/emilychen',
    twitter: 'https://twitter.com/emilychen',
    instagram: 'https://instagram.com/emilychen',
    
    // Social Links object (for template)
    socialLinks: {
      instagram: 'https://instagram.com/emilychen',
      linkedin: 'https://linkedin.com/in/emilychen',
      twitter: 'https://twitter.com/emilychen',
      youtube: 'https://youtube.com',
      tiktok: 'https://tiktok.com'
    },
    
    // Marketing Metrics
    metrics: {
      averageROI: '300%',
      impressions: '50',
      campaigns: '200'
    },
    
    // Campaign Data for Hero Chart
    campaignData: [
      { month: 'Jan', revenue: 12000, engagement: 4500 },
      { month: 'Feb', revenue: 19000, engagement: 5200 },
      { month: 'Mar', revenue: 15000, engagement: 4800 },
      { month: 'Apr', revenue: 28000, engagement: 6500 },
      { month: 'May', revenue: 32000, engagement: 7200 },
      { month: 'Jun', revenue: 40000, engagement: 8500 },
    ],
    
    // Platform Expertise - UPDATED STRUCTURE
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
    
    // Marketing Services
    services: [
      {
        title: 'SEO & Content Strategy',
        icon: 'search',
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
        icon: 'hashtag',
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
        icon: 'envelope',
        items: [
          'Automation Strategy',
          'Segmentation & Personalization',
          'A/B Testing',
          'Revenue Attribution'
        ],
        metrics: { value: '35%', label: 'Open Rate' }
      }
    ],
    
    // Campaign Results
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
          { value: '$15', label: 'Cost Per Lead' },
          { value: '12%', label: 'Free to Paid' }
        ],
        platforms: ['LinkedIn Ads', 'Content Marketing', 'Webinars'],
        featured: false
      }
    ],
    
    // Marketing Tools Stack
    tools: {
      analytics: ['Google Analytics', 'Mixpanel', 'Hotjar', 'SEMrush'],
      automation: ['HubSpot', 'Mailchimp', 'ActiveCampaign', 'Zapier'],
      advertising: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'TikTok Ads']
    },
    
    // Strategy Session Offer
    strategyOffer: [
      'Comprehensive Marketing Audit',
      'Custom Growth Strategy Roadmap',
      'Competitor Analysis Report',
      '60-Minute Strategy Call',
      'Actionable Recommendations'
    ],
    
    // Budget Ranges
    budgetRanges: [
      '$1,000 - $5,000',
      '$5,000 - $20,000', 
      '$20,000 - $50,000',
      '$50,000+'
    ],
    
    // EmailJS
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'emily@digitalmarketer.com'
    },
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'emilychen'
    }
  });

  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `Digital Marketer portfolio, ${formData.metrics.averageROI} average ROI`;
      
      if (index !== null && field === 'campaigns') {
        improvedText = await improveWithAI('campaign', formData.campaigns[index].title, 5, {
          name: formData.name,
          title: formData.title
        });
        
        const newCampaigns = [...formData.campaigns];
        newCampaigns[index].title = improvedText;
        setFormData({...formData, campaigns: newCampaigns});
      } else {
        improvedText = await improveWithAI(field, formData[field], 5, {
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

	// Add campaign
const addCampaign = () => {
  setFormData(prev => ({
    ...prev,
    campaigns: [...prev.campaigns, {
      client: 'NEW CLIENT',
      title: 'New Campaign',
      period: 'Q1 2024 • 3 Months',
      results: [
        { value: '+0%', label: 'Revenue Increase' },
        { value: '+0', label: 'New Customers' },
        { value: '0%', label: 'Conversion Rate' }
      ],
      platforms: ['Platform 1', 'Platform 2'],
      featured: false
    }]
  }));
};

// Remove campaign
const removeCampaign = (index) => {
  if (formData.campaigns.length <= 1) {
    alert('You need at least one campaign');
    return;
  }
  
  if (window.confirm('Delete this campaign?')) {
    const newCampaigns = [...formData.campaigns];
    newCampaigns.splice(index, 1);
    setFormData({...formData, campaigns: newCampaigns});
  }
};
  
  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data matching template structure
      const portfolioData = {
        ...formData,
        templateId: 5,
        createdAt: new Date().toISOString(),
        // Ensure socialLinks is properly set
        socialLinks: {
          instagram: formData.instagram,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          youtube: formData.socialLinks?.youtube || 'https://youtube.com',
          tiktok: formData.socialLinks?.tiktok || 'https://tiktok.com'
        }
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
    <div className="template-form template5-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaRocket /> Digital Marketing Portfolio Setup</h1>
        <p>Showcase your campaign results, marketing expertise, and growth strategies</p>
      </div>

      <div id="ai-success" className="ai-success-message">
        ✨ Marketing content improved with AI!
      </div>

      {/* MARKETING PROFILE */}
      <div className="form-section">
        <h2><FaBullhorn /> Marketing Professional Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Emily Chen"
            />
          </div>
          
          <div className="form-group">
            <label>Marketing Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Digital Growth Strategist"
            />
          </div>
          
          <div className="form-group">
            <label>Marketing Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              placeholder="Digital Marketing & Conversion Optimization"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Marketing Bio *
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
              placeholder="Describe your marketing expertise and results..."
            />
          </div>
        </div>
      </div>

      {/* MARKETING METRICS */}
      <div className="form-section">
        <h2><FaChartLine /> Marketing Performance Metrics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Average ROI Delivered</label>
            <input
              type="text"
              value={formData.metrics.averageROI}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, averageROI: e.target.value}
              })}
              placeholder="300%"
            />
          </div>
          
          <div className="form-group">
            <label>Total Impressions (M)</label>
            <input
              type="text"
              value={formData.metrics.impressions}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, impressions: e.target.value}
              })}
              placeholder="50"
            />
          </div>
          
          <div className="form-group">
            <label>Campaigns Managed</label>
            <input
              type="text"
              value={formData.metrics.campaigns}
              onChange={(e) => setFormData({
                ...formData, 
                metrics: {...formData.metrics, campaigns: e.target.value}
              })}
              placeholder="200"
            />
          </div>
        </div>
      </div>

      {/* CAMPAIGN DATA FOR CHARTS */}
      <div className="form-section">
        <h2><FaChartLine /> Monthly Campaign Performance</h2>
        <p className="section-subtitle">Data for the revenue growth chart</p>
        
        <div className="form-grid">
          {formData.campaignData.map((month, index) => (
            <div key={index} className="month-form">
              <h4>{month.month}</h4>
              <div className="form-grid compact">
                <div className="form-group">
                  <label>Revenue ($)</label>
                  <input
                    type="number"
                    value={month.revenue}
                    onChange={(e) => {
                      const newData = [...formData.campaignData];
                      newData[index].revenue = parseInt(e.target.value) || 0;
                      setFormData({...formData, campaignData: newData});
                    }}
                    placeholder="12000"
                  />
                </div>
                <div className="form-group">
                  <label>Engagement</label>
                  <input
                    type="number"
                    value={month.engagement}
                    onChange={(e) => {
                      const newData = [...formData.campaignData];
                      newData[index].engagement = parseInt(e.target.value) || 0;
                      setFormData({...formData, campaignData: newData});
                    }}
                    placeholder="4500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PLATFORM EXPERTISE */}
      <div className="form-section">
        <h2><FaHashtag /> Platform Expertise</h2>
        
        <div className="platforms-grid">
          {formData.platformData.map((platform, index) => (
            <div key={index} className="platform-form">
              <h4>{platform.name}</h4>
              
              <div className="form-grid compact">
                <div className="form-group">
                  <label>Engagement Rate %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={platform.value}
                    onChange={(e) => {
                      const newPlatforms = [...formData.platformData];
                      newPlatforms[index].value = parseInt(e.target.value) || 0;
                      setFormData({...formData, platformData: newPlatforms});
                    }}
                    placeholder="35"
                  />
                </div>
                
                <div className="form-group">
                  <label>Engagement Growth</label>
                  <input
                    type="text"
                    value={platform.engagement}
                    onChange={(e) => {
                      const newPlatforms = [...formData.platformData];
                      newPlatforms[index].engagement = e.target.value;
                      setFormData({...formData, platformData: newPlatforms});
                    }}
                    placeholder="+400%"
                  />
                </div>
                
                <div className="form-group">
                  <label>Brand Color</label>
                  <input
                    type="color"
                    value={platform.color}
                    onChange={(e) => {
                      const newPlatforms = [...formData.platformData];
                      newPlatforms[index].color = e.target.value;
                      setFormData({...formData, platformData: newPlatforms});
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MARKETING SERVICES */}
      <div className="form-section">
        <h2><FaRocket /> Marketing Services</h2>
        
        {formData.services.map((service, index) => (
          <div key={index} className="service-form">
            <h3>{service.title}</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Service Metrics Value</label>
                <input
                  type="text"
                  value={service.metrics.value}
                  onChange={(e) => {
                    const newServices = [...formData.services];
                    newServices[index].metrics.value = e.target.value;
                    setFormData({...formData, services: newServices});
                  }}
                  placeholder="+250%"
                />
              </div>
              
              <div className="form-group">
                <label>Service Metrics Label</label>
                <input
                  type="text"
                  value={service.metrics.label}
                  onChange={(e) => {
                    const newServices = [...formData.services];
                    newServices[index].metrics.label = e.target.value;
                    setFormData({...formData, services: newServices});
                  }}
                  placeholder="Organic Traffic"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Service Features</label>
                {service.items.map((item, itemIndex) => (
                  <input
                    key={itemIndex}
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newServices = [...formData.services];
                      newServices[index].items[itemIndex] = e.target.value;
                      setFormData({...formData, services: newServices});
                    }}
                    placeholder="Marketing service feature..."
                    className="feature-input"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

     {/* CAMPAIGN RESULTS */}
<div className="form-section">
  <div className="section-header">
    <h2><FaChartLine /> Campaign Case Studies</h2>
    <button type="button" className="add-section-btn" onClick={addCampaign}>
      + Add Campaign
    </button>
  </div>
  
  {formData.campaigns.map((campaign, index) => (
    <div key={index} className="campaign-form">
      <div className="card-header">
        <h3>Campaign {index + 1}</h3>
        <button 
          type="button"
          className="remove-btn"
          onClick={() => removeCampaign(index)}
          disabled={formData.campaigns.length <= 1}
        >
          🗑️ Remove
        </button>
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Client Industry</label>
          <select
            value={campaign.client}
            onChange={(e) => {
              const newCampaigns = [...formData.campaigns];
              newCampaigns[index].client = e.target.value;
              setFormData({...formData, campaigns: newCampaigns});
            }}
          >
            <option value="E-COMMERCE BRAND">E-commerce</option>
            <option value="SaaS STARTUP">SaaS</option>
            <option value="B2B COMPANY">B2B</option>
            <option value="CONSUMER BRAND">Consumer Brand</option>
            <option value="AGENCY">Agency</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>
            Campaign Title *
            <button 
              type="button"
              className="ai-improve-btn"
              onClick={() => handleAIImprovement('campaigns', index)}
              disabled={aiLoading.campaigns}
            >
              {aiLoading.campaigns ? <FaSpinner className="spinner" /> : <FaMagic />}
              Improve with AI
            </button>
          </label>
          <input
            type="text"
            value={campaign.title}
            onChange={(e) => {
              const newCampaigns = [...formData.campaigns];
              newCampaigns[index].title = e.target.value;
              setFormData({...formData, campaigns: newCampaigns});
            }}
            placeholder="Holiday Sales Campaign"
          />
        </div>
        
        <div className="form-group">
          <label>Campaign Period</label>
          <input
            type="text"
            value={campaign.period}
            onChange={(e) => {
              const newCampaigns = [...formData.campaigns];
              newCampaigns[index].period = e.target.value;
              setFormData({...formData, campaigns: newCampaigns});
            }}
            placeholder="Q4 2023 • 3 Months"
          />
        </div>
        
        {/* Campaign Results */}
        {campaign.results.map((result, resultIndex) => (
          <React.Fragment key={resultIndex}>
            <div className="form-group">
              <label>Result {resultIndex + 1} - Value</label>
              <input
                type="text"
                value={result.value}
                onChange={(e) => {
                  const newCampaigns = [...formData.campaigns];
                  newCampaigns[index].results[resultIndex].value = e.target.value;
                  setFormData({...formData, campaigns: newCampaigns});
                }}
                placeholder={resultIndex === 0 ? '+350%' : resultIndex === 1 ? '+15,000' : '12%'}
              />
            </div>
            
            <div className="form-group">
              <label>Result {resultIndex + 1} - Label</label>
              <input
                type="text"
                value={result.label}
                onChange={(e) => {
                  const newCampaigns = [...formData.campaigns];
                  newCampaigns[index].results[resultIndex].label = e.target.value;
                  setFormData({...formData, campaigns: newCampaigns});
                }}
                placeholder={resultIndex === 0 ? 'Revenue Increase' : resultIndex === 1 ? 'New Customers' : 'Conversion Rate'}
              />
            </div>
          </React.Fragment>
        ))}
        
        <div className="form-group full-width">
          <label>Platforms Used</label>
          <input
            type="text"
            value={campaign.platforms.join(', ')}
            onChange={(e) => {
              const newCampaigns = [...formData.campaigns];
              newCampaigns[index].platforms = e.target.value.split(',').map(p => p.trim());
              setFormData({...formData, campaigns: newCampaigns});
            }}
            placeholder="Instagram Ads, Google Shopping, Email Sequences"
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={campaign.featured}
              onChange={(e) => {
                const newCampaigns = [...formData.campaigns];
                newCampaigns[index].featured = e.target.checked;
                setFormData({...formData, campaigns: newCampaigns});
              }}
            />
            Featured Campaign
          </label>
        </div>
      </div>
    </div>
  ))}
</div>
      {/* MARKETING TOOLS */}
      <div className="form-section">
        <h2><FaBullhorn /> Marketing Technology Stack</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Analytics Tools</label>
            <input
              type="text"
              value={formData.tools.analytics.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                tools: {...formData.tools, analytics: e.target.value.split(',').map(t => t.trim())}
              })}
              placeholder="Google Analytics, Mixpanel, Hotjar"
            />
          </div>
          
          <div className="form-group">
            <label>Automation Tools</label>
            <input
              type="text"
              value={formData.tools.automation.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                tools: {...formData.tools, automation: e.target.value.split(',').map(t => t.trim())}
              })}
              placeholder="HubSpot, Mailchimp, ActiveCampaign"
            />
          </div>
          
          <div className="form-group">
            <label>Advertising Platforms</label>
            <input
              type="text"
              value={formData.tools.advertising.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                tools: {...formData.tools, advertising: e.target.value.split(',').map(p => p.trim())}
              })}
              placeholder="Google Ads, Facebook Ads, LinkedIn Ads"
            />
          </div>
        </div>
      </div>

      {/* SOCIAL MEDIA LINKS */}
      <div className="form-section">
        <h2><FaHashtag /> Social Media Profiles</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaInstagram /> Instagram URL</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({
                ...formData, 
                instagram: e.target.value,
                socialLinks: {...formData.socialLinks, instagram: e.target.value}
              })}
              placeholder="https://instagram.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaLinkedin /> LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({
                ...formData, 
                linkedin: e.target.value,
                socialLinks: {...formData.socialLinks, linkedin: e.target.value}
              })}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaTwitter /> Twitter URL</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => setFormData({
                ...formData, 
                twitter: e.target.value,
                socialLinks: {...formData.socialLinks, twitter: e.target.value}
              })}
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaYoutube /> YouTube URL</label>
            <input
              type="url"
              value={formData.socialLinks?.youtube || ''}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: {...formData.socialLinks, youtube: e.target.value}
              })}
              placeholder="https://youtube.com/username"
            />
          </div>
          
          <div className="form-group">
            <label><FaTiktok /> TikTok URL</label>
            <input
              type="url"
              value={formData.socialLinks?.tiktok || ''}
              onChange={(e) => setFormData({
                ...formData,
                socialLinks: {...formData.socialLinks, tiktok: e.target.value}
              })}
              placeholder="https://tiktok.com/@username"
            />
          </div>
        </div>
      </div>

      {/* STRATEGY SESSION */}
      <div className="form-section">
        <h2><FaVideo /> Free Strategy Session Offer</h2>
        
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Strategy Session Inclusions</label>
            {formData.strategyOffer.map((offer, index) => (
              <div key={index} className="offer-item">
                <input
                  type="text"
                  value={offer}
                  onChange={(e) => {
                    const newOffer = [...formData.strategyOffer];
                    newOffer[index] = e.target.value;
                    setFormData({...formData, strategyOffer: newOffer});
                  }}
                  placeholder="What clients get in the strategy session..."
                />
              </div>
            ))}
          </div>
          
          <div className="form-group">
            <label>Budget Ranges (for form)</label>
            <textarea
              value={formData.budgetRanges.join('\n')}
              onChange={(e) => setFormData({
                ...formData,
                budgetRanges: e.target.value.split('\n').map(b => b.trim())
              })}
              rows={4}
              placeholder="$1,000 - $5,000\n$5,000 - $20,000"
            />
            <small>One per line for dropdown options</small>
          </div>
        </div>
      </div>

      {/* EMAILJS & DEPLOYMENT */}
      <div className="form-section">
        <h2><FaEnvelope /> Contact & Launch</h2>
        <EmailJSSetup />
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaPhone /> Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (310) 555-1234"
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Los Angeles, CA"
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
              placeholder="emilychen"
            />
            <small>Will create: username-marketingportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Marketing Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'marketing'}-marketingportfolio.vercel.app`}
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
      templateId: 5
    }));
    navigate('/preview/5'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview Digital Marketer Portfolio
</button>
        
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '🚀 Launch Marketing Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template5Form;