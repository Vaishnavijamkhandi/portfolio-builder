// src/utils/deploymentService.js - SAFE VERSION
const DeploymentService = {
  // Don't actually deploy, just save locally
  deployPortfolio: async (portfolioData) => {
    console.log('Portfolio data saved locally. User must deploy themselves.');
    
    // Create a fake deployment record for user's history
    const deployment = {
      id: Date.now().toString(),
      name: portfolioData.name || 'My Portfolio',
      templateId: portfolioData.templateId,
      timestamp: new Date().toISOString(),
      url: `https://${portfolioData.deployment?.username || 'my'}-portfolio.vercel.app`,
      status: 'ready_for_download',
      platform: portfolioData.deployment?.platform || 'vercel'
    };
    
    // Save to user's deployments
    const existing = JSON.parse(localStorage.getItem('portfolio_deployments') || '[]');
    existing.push(deployment);
    localStorage.setItem('portfolio_deployments', JSON.stringify(existing));
    
    return {
      success: true,
      message: 'Portfolio ready for download and deployment',
      url: 'download-guide' // Not a real URL
    };
  },
  
  saveDeployment: (deployment) => {
    console.log('Deployment saved locally:', deployment);
    return true;
  }
};

export default DeploymentService;