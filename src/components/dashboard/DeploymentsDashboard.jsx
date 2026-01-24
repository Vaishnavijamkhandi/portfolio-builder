import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import { 
  FaRocket, FaExternalLinkAlt, FaCopy, FaTrash, 
  FaEdit, FaEye, FaCalendarAlt, FaLink, FaPlus,
  FaCheckCircle, FaSpinner, FaTimesCircle, FaArrowRight,
  FaDownload, FaFileArchive, FaChartLine, FaFileCode,
  FaFilePdf, FaFileImage, FaQrcode, FaClone,
  FaFileImport, FaFileExport, FaUndo
} from 'react-icons/fa';
import './dashboard.css';
import './deployment.css';

const DeploymentsDashboard = () => {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('week');

  useEffect(() => {
    loadData();
  }, []);

 const loadData = () => {
  // Load download history
  const downloadsData = localStorage.getItem('portfolio_downloads');
  if (downloadsData) {
    try {
      const parsed = JSON.parse(downloadsData);
      // Ensure it's an array and has valid data
      if (Array.isArray(parsed)) {
        // Sort by timestamp, newest first
        const sorted = parsed.sort((a, b) => 
          new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
        );
        setDownloads(sorted);
      } else {
        setDownloads([]);
      }
    } catch (error) {
      console.error('Error parsing downloads:', error);
      setDownloads([]);
    }
  } else {
    setDownloads([]);
  }

  // Load generated portfolios
  const portfolioData = localStorage.getItem('portfolio_data');
  if (portfolioData) {
    try {
      const parsed = JSON.parse(portfolioData);
      let portfoliosArray;
      
      if (Array.isArray(parsed)) {
        portfoliosArray = parsed;
      } else {
        // Single portfolio, convert to array
        portfoliosArray = [parsed];
      }
      
      // Ensure each portfolio has required fields
      const validatedPortfolios = portfoliosArray.map((p, index) => ({
        ...p,
        id: p.id || `portfolio-${Date.now()}-${index}`,
        timestamp: p.timestamp || new Date().toISOString(),
        name: p.name || p.artistName || `Portfolio ${index + 1}`,
        templateId: p.templateId || 1
      }))
      .filter(p => p.id) // Remove invalid entries
      .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)); // Sort newest first
      
      setPortfolios(validatedPortfolios);
    } catch (error) {
      console.error('Error parsing portfolio data:', error);
      setPortfolios([]);
    }
  } else {
    setPortfolios([]);
  }

  setLoading(false);
};
const getTemplateName = (templateId) => {
  const names = {
    1: 'Software Developer',
    2: 'UI/UX Designer',
    3: 'Data Scientist',
    4: 'Business Analyst',
    5: 'Digital Marketer',
    6: 'Music Artist',
    7: 'AI Developer Portfolio' // Add Template 7
  };
  return names[templateId] || `Template ${templateId}`;
};
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return <span className="deploy-status-badge completed"><FaCheckCircle /> Completed</span>;
      case 'failed':
        return <span className="deploy-status-badge failed"><FaTimesCircle /> Failed</span>;
      case 'processing':
        return <span className="deploy-status-badge processing"><FaSpinner /> Processing</span>;
      default:
        return <span className="deploy-status-badge completed"><FaCheckCircle /> Downloaded</span>;
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('✅ URL copied to clipboard!');
  };

  const deleteDownload = (id) => {
    if (window.confirm('Are you sure you want to delete this download record?')) {
      const updated = downloads.filter(d => d.id !== id);
      setDownloads(updated);
      localStorage.setItem('portfolio_downloads', JSON.stringify(updated));
    }
  };

  const editPortfolio = (portfolioId, templateId) => {
    // Save the portfolio ID in session storage to retrieve later
    sessionStorage.setItem('editingPortfolioId', portfolioId);
    // Also save the portfolio data
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (portfolio) {
      sessionStorage.setItem('editingPortfolioData', JSON.stringify(portfolio));
    }
    navigate(`/builder/${templateId}`);
  };

  // FIXED: Generate Files function - No login required
  const generateFiles = (portfolio) => {
    // Save portfolio data for the generate page
    sessionStorage.setItem('generatingPortfolio', JSON.stringify(portfolio));
    
    // Navigate to generate page (not deploy if it requires login)
    navigate('/generate', { 
      state: { 
        portfolio: portfolio,
        templateId: portfolio.templateId
      }
    });
  };

  // FIXED: Duplicate Portfolio function
  const duplicatePortfolio = (originalPortfolio) => {
    if (!originalPortfolio) return;
    
    // Create a deep copy with new ID
    const duplicatedPortfolio = {
      ...JSON.parse(JSON.stringify(originalPortfolio)),
      id: `portfolio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${originalPortfolio.name || originalPortfolio.artistName || 'Portfolio'} (Copy)`,
      timestamp: new Date().toISOString()
    };
    
    // Add to beginning of list
    const updatedPortfolios = [duplicatedPortfolio, ...portfolios];
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolio_data', JSON.stringify(updatedPortfolios));
    
    alert(`✅ Portfolio duplicated successfully!`);
  };

  // FIXED: Delete Portfolio function - Now works consistently
  const deletePortfolio = (portfolioId) => {
    if (!portfolioId) {
      alert('Error: Cannot identify portfolio to delete');
      return;
    }
    
    // Find portfolio to confirm name
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (!portfolio) {
      alert('Portfolio not found');
      return;
    }
    
    const portfolioName = portfolio.name || portfolio.artistName || 'this portfolio';
    
    if (window.confirm(`Are you sure you want to delete "${portfolioName}"? This action cannot be undone.`)) {
      // Filter out the portfolio with matching ID
      const updatedPortfolios = portfolios.filter(p => p.id !== portfolioId);
      setPortfolios(updatedPortfolios);
      localStorage.setItem('portfolio_data', JSON.stringify(updatedPortfolios));
      
      // Also clean up any downloads referencing this portfolio
      if (downloads.length > 0) {
        const updatedDownloads = downloads.filter(d => d.portfolioId !== portfolioId);
        if (updatedDownloads.length !== downloads.length) {
          setDownloads(updatedDownloads);
          localStorage.setItem('portfolio_downloads', JSON.stringify(updatedDownloads));
        }
      }
      
      alert('✅ Portfolio deleted successfully!');
    }
  };

  const viewPortfolio = (url) => {
    window.open(url, '_blank');
  };

  const downloadAgain = (portfolioData) => {
    alert(`Downloading ${portfolioData.name}'s portfolio...`);
  };

  const exportAllData = () => {
    const data = {
      portfolios: portfolios,
      downloads: downloads,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('✅ All data exported successfully!');
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.portfolios) {
            // Ensure all imported portfolios have IDs
            const portfoliosWithIds = data.portfolios.map((p, index) => ({
              ...p,
              id: p.id || `portfolio-import-${Date.now()}-${index}`
            }));
            setPortfolios(portfoliosWithIds);
            localStorage.setItem('portfolio_data', JSON.stringify(portfoliosWithIds));
          }
          if (data.downloads) {
            setDownloads(data.downloads);
            localStorage.setItem('portfolio_downloads', JSON.stringify(data.downloads));
          }
          alert('✅ Data imported successfully!');
        } catch (error) {
          alert('❌ Error importing file. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.removeItem('portfolio_data');
      localStorage.removeItem('portfolio_downloads');
      setPortfolios([]);
      setDownloads([]);
      alert('All data cleared successfully.');
    }
  };

  const getMostDownloaded = () => {
    if (portfolios.length === 0) return 'None yet';
    return portfolios[0].name || portfolios[0].artistName || 'Untitled Portfolio';
  };

  const getMostUsedTemplate = () => {
    if (portfolios.length === 0) return 'None yet';
    const templateCounts = {};
    portfolios.forEach(p => {
      templateCounts[p.templateId] = (templateCounts[p.templateId] || 0) + 1;
    });
    const mostUsed = Object.entries(templateCounts).sort((a, b) => b[1] - a[1])[0];
    return mostUsed ? getTemplateName(mostUsed[0]) : 'None';
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="deploy-loading-container">
          <div className="spinner">
            <FaRocket />
          </div>
          <p>Loading portfolio data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="deploy-dashboard-container">
        {/* Header */}
        <div className="deploy-dashboard-header">
          <h1><FaFileCode /> Portfolio Files</h1>
          <p className="subtitle">Manage your generated portfolios and downloads</p>
        </div>

        {/* Downloads Count */}
<div className="deploy-stats-single">
  <div className="deploy-stat-card center">
    <div className="deploy-stat-icon">
      <FaDownload />
    </div>
    <div className="deploy-stat-content">
      <h3>{downloads.length}</h3>
      <p>Files Downloaded</p>
    </div>
  </div>
</div>

        {/* Quick Actions */}
        <div className="deploy-section">
          <div className="deploy-section-header">
            <h2>⚡ Quick Actions</h2>
          </div>
          <div className="deploy-quick-actions">
            <button 
              className="deploy-action-btn primary"
              onClick={() => navigate('/dashboard')}
            >
              <FaPlus /> Create New Portfolio <FaArrowRight />
            </button>
            <button 
              className="deploy-action-btn secondary"
              onClick={exportAllData}
            >
              <FaFileExport /> Export All Data
            </button>
            <button 
              className="deploy-action-btn tertiary"
              onClick={importData}
            >
              <FaFileImport /> Import Data
            </button>
            <button 
              className="deploy-action-btn danger"
              onClick={clearAllData}
            >
              <FaTrash /> Clear All Data
            </button>
          </div>
        </div>

        {/* Recent Downloads */}
        <div className="deploy-section">
          <div className="deploy-section-header">
            <h2>📥 Recent Downloads</h2>
            {downloads.length > 0 && (
              <span className="deploy-count-badge">{downloads.length} downloads</span>
            )}
          </div>
          
          {downloads.length > 0 ? (
            <div className="deploy-downloads-list">
              {downloads.slice(0, 5).map((download) => (
                <div key={download.id} className="deploy-download-card">
                  <div className="deploy-download-info">
                    <div className="deploy-download-header">
                      <h3>
                        <FaFileArchive /> {download.filename || 'portfolio.zip'}
                      </h3>
                      <div className="deploy-download-meta">
                        {getStatusBadge(download.status)}
                        <span className="deploy-template-badge">
                          {download.templateId ? getTemplateName(download.templateId) : 'Unknown'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="deploy-download-details">
                      <div className="detail">
                        <FaCalendarAlt />
                        <span>{new Date(download.timestamp || Date.now()).toLocaleDateString()}</span>
                        <span className="time">
                          {new Date(download.timestamp || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <div className="detail">
                        <FaDownload />
                        <span className="file-size">{download.size || '2.5 MB'}</span>
                      </div>
                    </div>
                    
                    <div className="deploy-download-url">
                      <code className="deploy-file-path">
                        {download.filepath || 'portfolio-website.zip'}
                      </code>
                    </div>
                  </div>
                  
                  <div className="deploy-download-actions">
                    <button 
                      className="deploy-action-icon view"
                      onClick={() => downloadAgain(download)}
                      title="Download Again"
                    >
                      <FaDownload />
                    </button>
                    <button 
                      className="deploy-action-icon copy"
                      onClick={() => copyUrl(download.url)}
                      title="Copy URL"
                    >
                      <FaCopy />
                    </button>
                    <button 
                      className="deploy-action-icon delete"
                      onClick={() => deleteDownload(download.id)}
                      title="Delete Record"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="deploy-empty-state">
              <div className="deploy-empty-icon">
                <FaDownload />
              </div>
              <h3>No Downloads Yet</h3>
              <p>Generate and download your first portfolio to see it here.</p>
              <button 
                className="deploy-create-btn"
                onClick={() => navigate('/dashboard')}
              >
                <FaPlus /> Create First Portfolio
              </button>
            </div>
          )}
        </div>

        {/* Generated Portfolios - FIXED SECTION */}
        <div className="deploy-section">
          <div className="deploy-section-header">
            <h2>🎨 Your Recent Portfolio</h2>
            {portfolios.length > 0 && (
              <span className="deploy-count-badge">{portfolios.length} portfolios</span>
            )}
          </div>
          
          {portfolios.length > 0 ? (
            <div className="deploy-portfolios-list">
              {portfolios.map((portfolio) => (
                <div key={portfolio.id} className="deploy-portfolio-card">
                  <div className="deploy-portfolio-info">
                    <div className="deploy-portfolio-header">
                      <h3>
                        <FaFileCode /> {portfolio.name || portfolio.artistName || `Portfolio`}
                      </h3>
                      <div className="deploy-portfolio-meta">
                        <span className="deploy-status-badge completed">
                          <FaCheckCircle /> Ready
                        </span>
                        <span className="deploy-template-badge">
                          {getTemplateName(portfolio.templateId)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="deploy-portfolio-details">
                      <div className="detail">
                        <FaCalendarAlt />
                        <span>Created: {new Date(portfolio.timestamp || Date.now()).toLocaleDateString()}</span>
                      </div>
                      <div className="detail">
                        <FaFileCode />
                        <span>{portfolio.projects ? portfolio.projects.length : 0} projects</span>
                      </div>
                    </div>
                    
                    <div className="deploy-portfolio-preview">
                      <code className="deploy-preview-text">
                        {portfolio.bio ? portfolio.bio.substring(0, 100) + '...' : 
                         portfolio.description ? portfolio.description.substring(0, 100) + '...' : 
                         'Portfolio preview...'}
                      </code>
                    </div>
                  </div>
                  
                  <div className="deploy-portfolio-actions">
                    {/* Edit Portfolio Button */}
                    <button 
                      className="deploy-action-icon view"
                      onClick={() => editPortfolio(portfolio.id, portfolio.templateId)}
                      title="Edit Portfolio"
                    >
                      <FaEdit />
                    </button>
                    
                                       
                    {/* Duplicate Portfolio Button - FIXED */}
                    <button 
                      className="deploy-action-icon duplicate"
                      onClick={() => duplicatePortfolio(portfolio)}
                      title="Duplicate Portfolio"
                    >
                      <FaClone />
                    </button>
                    
                    {/* Delete Portfolio Button - FIXED */}
                    <button 
                      className="deploy-action-icon delete"
                      onClick={() => deletePortfolio(portfolio.id)}
                      title="Delete Portfolio"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="deploy-empty-state">
              <div className="deploy-empty-icon">
                <FaFileCode />
              </div>
              <h3>No Portfolios Yet</h3>
              <p>Create your first portfolio to get started.</p>
              <button 
                className="deploy-create-btn"
                onClick={() => navigate('/dashboard')}
              >
                <FaPlus /> Create First Portfolio
              </button>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        <div className="deploy-section">
          <div className="deploy-section-header">
            <h2>📊 Analytics</h2>
            <select 
              className="deploy-time-filter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="deploy-analytics-grid">
            <div className="deploy-analytics-card">
              <div className="deploy-chart-placeholder">
                <div className="deploy-chart-title">📥 Downloads Trend</div>
                <div className="deploy-chart-bars">
                  {[65, 80, 45, 90, 70, 85, 60].map((height, i) => (
                    <div key={i} className="deploy-chart-bar" style={{height: `${height}%`}}></div>
                  ))}
                </div>
                <div className="deploy-chart-labels">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                </div>
              </div>
            </div>
            
            <div className="deploy-analytics-card">
              <h4>🏆 Most Downloaded</h4>
              <div className="deploy-top-list">
                {portfolios.slice(0, 3).map((portfolio, index) => (
                  <div key={portfolio.id} className="deploy-top-item">
                    <span className="deploy-rank">{index + 1}</span>
                    <div className="deploy-item-info">
                      <div className="deploy-item-name">{portfolio.name || portfolio.artistName || `Portfolio ${index + 1}`}</div>
                      <div className="deploy-item-stats">{downloads.length + index} downloads</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="deploy-analytics-card">
              <h4>🎨 Template Popularity</h4>
              <div className="deploy-template-stats">
                {[1, 2, 3, 4, 5, 6].map(templateId => {
                  const count = portfolios.filter(p => p.templateId === templateId).length;
                  return count > 0 ? (
                    <div key={templateId} className="deploy-template-stat">
                      <span className="deploy-template-name">{getTemplateName(templateId)}</span>
                      <div className="deploy-stat-bar">
                        <div 
                          className="deploy-stat-fill"
                          style={{width: `${(count / portfolios.length) * 100}%`}}
                        ></div>
                      </div>
                      <span className="deploy-stat-count">{count}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="deploy-analytics-card">
              <h4>📈 Activity Summary</h4>
              <div className="deploy-activity-summary">
                <div className="deploy-activity-item">
                  <span className="deploy-activity-label">Total Downloads:</span>
                  <span className="deploy-activity-value">{downloads.length}</span>
                </div>
                <div className="deploy-activity-item">
                  <span className="deploy-activity-label">Most Used Template:</span>
                  <span className="deploy-activity-value">{getMostUsedTemplate()}</span>
                </div>
                <div className="deploy-activity-item">
                  <span className="deploy-activity-label">Most Downloaded:</span>
                  <span className="deploy-activity-value">{getMostDownloaded()}</span>
                </div>
                <div className="deploy-activity-item">
                  <span className="deploy-activity-label">Last Activity:</span>
                  <span className="deploy-activity-value">
                    {downloads.length > 0 ? 
                      new Date(downloads[0].timestamp || Date.now()).toLocaleDateString() : 
                      'Never'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeploymentsDashboard;