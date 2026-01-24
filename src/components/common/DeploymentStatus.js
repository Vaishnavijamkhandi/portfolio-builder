// src/components/common/DeploymentStatus.js
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaExternalLinkAlt, FaCopy } from 'react-icons/fa';
import './DeploymentStatus.css';

const DeploymentStatus = () => {
  const [deploymentInfo, setDeploymentInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const info = localStorage.getItem('deployment_info');
    if (info) {
      setDeploymentInfo(JSON.parse(info));
    }
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!deploymentInfo) {
    return null;
  }

  return (
    <div className="deployment-status">
      <div className="status-header">
        <FaCheckCircle className="status-icon success" />
        <h3>Portfolio Deployed Successfully!</h3>
      </div>
      
      <div className="deployment-details">
        <div className="detail">
          <strong>Status:</strong>
          <span className="status-badge deployed">Deployed</span>
        </div>
        
        <div className="detail">
          <strong>Deployed At:</strong>
          <span>{new Date(deploymentInfo.deployedAt).toLocaleString()}</span>
        </div>
        
        <div className="detail">
          <strong>Template:</strong>
          <span>Template {deploymentInfo.templateId}</span>
        </div>
      </div>
      
      <div className="portfolio-url">
        <strong>Your Live Portfolio:</strong>
        <div className="url-container">
          <a 
            href={deploymentInfo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="live-url"
          >
            {deploymentInfo.url}
            <FaExternalLinkAlt className="external-icon" />
          </a>
          <button 
            className="copy-btn"
            onClick={() => copyToClipboard(deploymentInfo.url)}
          >
            <FaCopy /> {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
      </div>
      
      <div className="deployment-actions">
        <button 
          className="view-btn"
          onClick={() => window.open(deploymentInfo.url, '_blank')}
        >
          Open Portfolio
        </button>
        <button 
          className="share-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My Portfolio',
                text: 'Check out my portfolio!',
                url: deploymentInfo.url
              });
            } else {
              copyToClipboard(deploymentInfo.url);
              alert('URL copied to clipboard! Share it with others.');
            }
          }}
        >
          Share Portfolio
        </button>
      </div>
    </div>
  );
};

export default DeploymentStatus;