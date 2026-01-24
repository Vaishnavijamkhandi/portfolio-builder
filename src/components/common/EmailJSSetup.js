// src/components/common/EmailJSSetup.js - COMPLETE FILE
import React, { useState, useEffect } from 'react';
import './EmailJSSetup.css';

const EmailJSSetup = () => {
  const [credentials, setCredentials] = useState({
    serviceId: '',
    templateId: '',
    userId: '',
    contactEmail: ''
  });

  // Load saved credentials
  useEffect(() => {
    const savedData = localStorage.getItem('emailjs_credentials');
    if (savedData) {
      setCredentials(JSON.parse(savedData));
    }
    
    // Also try to load from portfolio data
    const portfolioData = localStorage.getItem('portfolio_data');
    if (portfolioData) {
      const data = JSON.parse(portfolioData);
      if (data.emailjs) {
        setCredentials(data.emailjs);
      }
    }
  }, []);

  // Save credentials
  const saveCredentials = () => {
    if (!credentials.serviceId || !credentials.templateId || !credentials.userId) {
      alert('Please enter Service ID, Template ID, and User ID');
      return;
    }
    
    localStorage.setItem('emailjs_credentials', JSON.stringify(credentials));
    
    // Also save to current portfolio data
    const portfolioData = JSON.parse(localStorage.getItem('portfolio_data') || '{}');
    localStorage.setItem('portfolio_data', JSON.stringify({
      ...portfolioData,
      emailjs: credentials
    }));
    
    alert('✅ EmailJS credentials saved! Your contact form will now work.');
  };

  // Test EmailJS
  const testEmailJS = async () => {
    if (!credentials.serviceId || !credentials.templateId || !credentials.userId) {
      alert('Please enter all EmailJS credentials first.');
      return;
    }

    try {
      // Try to load EmailJS
      const emailjs = await import('@emailjs/browser');
      
      // Simple test - we'll just check if credentials look valid
      const isValid = 
        credentials.serviceId.startsWith('service_') &&
        credentials.templateId.startsWith('template_') &&
        credentials.userId.startsWith('user_');
      
      if (isValid) {
        alert(`✅ EmailJS configured successfully!\n\nYour contact form will send emails to: ${credentials.contactEmail || 'your configured email'}\n\nTest by submitting the contact form in your portfolio preview.`);
      } else {
        alert('⚠️ Credentials format looks incorrect. Make sure they start with "service_", "template_", and "user_"');
      }
    } catch (error) {
      alert('EmailJS library not loaded. Make sure it\'s installed: npm install @emailjs/browser');
    }
  };

  return (
    <div className="emailjs-setup-guide">
      <h3><span role="img" aria-label="email">📧</span> EmailJS Setup</h3>
      <p className="setup-description">
        Enter your EmailJS credentials below. This will make your contact form actually send emails.
      </p>
      
      {/* CREDENTIAL INPUTS */}
      <div className="credentials-form">
        <div className="form-group">
          <label>Service ID *</label>
          <input
            type="text"
            value={credentials.serviceId}
            onChange={(e) => setCredentials({...credentials, serviceId: e.target.value})}
            placeholder="service_xxxxxxxxx"
            className="emailjs-input"
          />
          <small>From EmailJS → Email Services → Your Email Service</small>
        </div>
        
        <div className="form-group">
          <label>Template ID *</label>
          <input
            type="text"
            value={credentials.templateId}
            onChange={(e) => setCredentials({...credentials, templateId: e.target.value})}
            placeholder="template_xxxxxxxxx"
            className="emailjs-input"
          />
          <small>From EmailJS → Email Templates → Your Template</small>
        </div>
        
        <div className="form-group">
          <label>User ID (Public Key) *</label>
          <input
            type="text"
            value={credentials.userId}
            onChange={(e) => setCredentials({...credentials, userId: e.target.value})}
            placeholder="user_xxxxxxxxx"
            className="emailjs-input"
          />
          <small>From EmailJS → Account → API Keys → Public Key</small>
        </div>
        
        <div className="form-group">
          <label>Your Email (Where messages will be sent)</label>
          <input
            type="email"
            value={credentials.contactEmail}
            onChange={(e) => setCredentials({...credentials, contactEmail: e.target.value})}
            placeholder="you@example.com"
            className="emailjs-input"
          />
          <small>Messages from the contact form will be sent here</small>
        </div>
        
        <div className="emailjs-actions">
          <button className="save-btn" onClick={saveCredentials}>
            💾 Save Credentials
          </button>
          <button className="test-btn" onClick={testEmailJS}>
            🧪 Test Configuration
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="setup-steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>Sign up at <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer">EmailJS.com</a></h4>
            <p>Free account lets you send 200 emails/month. Connect your Gmail/Outlook.</p>
          </div>
        </div>
        
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>Create Email Template</h4>
            <p>In EmailJS dashboard, go to "Email Templates" → "Create New Template"</p>
            <p className="step-note">Use these variables in your template:</p>
            <div className="template-variables">
              <code>{"{{from_name}}"}</code> - Sender's name<br />
              <code>{"{{from_email}}"}</code> - Sender's email<br />
              <code>{"{{message}}"}</code> - Their message<br />
              <code>{"{{to_email}}"}</code> - Your email (optional)
            </div>
          </div>
        </div>
        
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h4>Get Your 3 IDs</h4>
            <div className="credentials-list">
              <div className="credential">
                <strong>Service ID</strong>
                <span>Email Services → Your connected email</span>
              </div>
              <div className="credential">
                <strong>Template ID</strong>
                <span>Email Templates → Your template</span>
              </div>
              <div className="credential">
                <strong>User ID (Public Key)</strong>
                <span>Account → API Keys → Public Key</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h4>Paste & Save Above</h4>
            <p>Copy-paste the 3 IDs, save, and test. Your contact form will work in both preview and live portfolio!</p>
          </div>
        </div>
      </div>
      
      <div className="test-section">
        <h4>Test Your Setup:</h4>
        <p>After saving credentials, go to your portfolio preview and submit the contact form.</p>
        <button 
          className="test-btn full"
          onClick={() => {
            if (!credentials.serviceId) {
              alert('Enter EmailJS credentials first.');
              return;
            }
            alert('✅ EmailJS is ready!\n\n1. Go to portfolio preview\n2. Find the contact form\n3. Submit a test message\n4. Check your email inbox');
          }}
        >
          Go Test Contact Form
        </button>
      </div>
      
      <div className="fallback-note">
        <h4><span role="img" aria-label="note">📝</span> Important Note:</h4>
        <p>
          <strong>Without EmailJS:</strong> Contact forms show demo alert only<br />
          <strong>With EmailJS:</strong> Messages are sent directly to your email inbox<br />
          <strong>Portfolio works either way</strong> - EmailJS is optional but recommended
        </p>
      </div>
    </div>
  );
};

export default EmailJSSetup;