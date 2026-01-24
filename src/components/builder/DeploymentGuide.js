import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiVercel, SiNetlify } from 'react-icons/si';
import { 
  FaDownload, FaCopy, FaGithub, 
  FaFire, FaCode, FaCloudUploadAlt,
  FaCheckCircle, FaExternalLinkAlt,
  FaGithubAlt, FaCodeBranch, FaFileCode,
  FaTimes, FaInfoCircle, FaExclamationTriangle,
  FaRocket
} from 'react-icons/fa';
import './DeploymentGuide.css';


const DeploymentGuide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('vercel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '', type: 'info' });

  useEffect(() => {
    const data = localStorage.getItem('portfolio_data');
    if (data) {
      setPortfolioData(JSON.parse(data));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const showAlertModal = (title, content, type = 'info') => {
    setModalContent({ title, content, type });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to generate complete HTML for the portfolio
  const generateHTML = (templateId, data) => {
    // Base HTML structure
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name || data.artistName} - Portfolio</title>
    <meta name="description" content="${data.bio || 'Professional Portfolio'}">
    <meta name="keywords" content="${data.jobTitle || data.title}, ${data.tagline || 'Portfolio'}">
    <meta name="author" content="${data.name || data.artistName}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="style.css">
    
    <!-- SEO Meta Tags -->
    <meta property="og:title" content="${data.name || data.artistName} - Portfolio">
    <meta property="og:description" content="${data.bio || 'Professional Portfolio'}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourportfolio.com">
    <meta name="twitter:card" content="summary_large_image">
</head>
<body>
	
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <a href="#" class="logo">${data.name || data.artistName}</a>
            <div class="nav-links">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${data.name || data.artistName}</h1>
            <h2>${data.jobTitle || data.title || data.tagline}</h2>
            <p class="tagline">${data.tagline || data.bio || 'Building amazing things'}</p>
            <div class="cta-buttons">
                <a href="#contact" class="btn btn-primary">Get in Touch</a>
                <a href="#projects" class="btn btn-secondary">View Work</a>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>${data.bio || 'Passionate professional with extensive experience.'}</p>
                    
                    ${data.specialty ? `<h3>Specialization</h3><p>${data.specialty}</p>` : ''}
                    
                    ${data.location ? `<p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>` : ''}
                    ${data.email ? `<p><i class="fas fa-envelope"></i> ${data.email}</p>` : ''}
                    ${data.phone ? `<p><i class="fas fa-phone"></i> ${data.phone}</p>` : ''}
                    
                    <!-- Social Links -->
                    <div class="social-links">
                        ${data.github ? `<a href="${data.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                        ${data.twitter ? `<a href="${data.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                        ${data.instagram ? `<a href="${data.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
                        ${data.behance ? `<a href="${data.behance}" target="_blank"><i class="fab fa-behance"></i></a>` : ''}
                        ${data.dribbble ? `<a href="${data.dribbble}" target="_blank"><i class="fab fa-dribbble"></i></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    ${data.projects && data.projects.length > 0 ? `
    <section id="projects" class="projects">
        <div class="container">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                <div class="project-card">
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        ${project.badge ? `<span class="badge">${project.badge}</span>` : ''}
                    </div>
                    <p>${project.description || 'Project description'}</p>
                    ${project.technologies && project.technologies.length > 0 ? `
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>` : ''}
                    <div class="project-links">
                        ${project.liveUrl && project.liveUrl !== '#' ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-small">Live Demo</a>` : ''}
                        ${project.githubUrl && project.githubUrl !== '#' ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-small btn-secondary">Code</a>` : ''}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>` : ''}

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Contact Information</h3>
                    ${data.email ? `<p><i class="fas fa-envelope"></i> ${data.email}</p>` : ''}
                    ${data.phone ? `<p><i class="fas fa-phone"></i> ${data.phone}</p>` : ''}
                    ${data.location ? `<p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>` : ''}
                </div>
                <form id="contactForm" class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${data.name || data.artistName}. All rights reserved.</p>
            <p>Portfolio generated with <a href="https://yourportfolio.com" target="_blank">Portfolio Builder</a></p>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="script.js"></script>
    ${data.emailjs && data.emailjs.serviceId ? `
    <!-- EmailJS Integration -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script>
        (function() {
            emailjs.init('${data.emailjs.userId}');
            
            document.getElementById('contactForm').addEventListener('submit', function(event) {
                event.preventDefault();
                
                emailjs.sendForm('${data.emailjs.serviceId}', '${data.emailjs.templateId}', this)
                    .then(function() {
                        alert('Message sent successfully!');
                        document.getElementById('contactForm').reset();
                    }, function(error) {
                        alert('Failed to send message: ' + JSON.stringify(error));
                    });
            });
        })();
    </script>` : ''}
</body>
</html>`;
  };

  // Function to generate CSS
  const generateCSS = (templateId, data) => {
    return `/* Main Styles for ${data.name || data.artistName}'s Portfolio */

:root {
    --primary-color: #3b82f6;
    --secondary-color: #6366f1;
    --dark-color: #1f2937;
    --light-color: #f9fafb;
    --text-color: #374151;
    --border-color: #e5e7eb;
    --success-color: #10b981;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: #ffffff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 20px;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
}

.nav-links a {
    margin-left: 2rem;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--primary-color);
}

/* Hero Section */
.hero {
    padding: 120px 0 80px;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    opacity: 0.9;
}

.tagline {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.btn {
    padding: 12px 30px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    display: inline-block;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background-color: white;
    color: var(--primary-color);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn-secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
}

.btn-secondary:hover {
    background-color: white;
    color: var(--primary-color);
}

/* Sections */
section {
    padding: 80px 0;
}

h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
    color: var(--dark-color);
}

/* About Section */
.about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.social-links {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--light-color);
    border-radius: 50%;
    color: var(--text-color);
    text-decoration: none;
    transition: all 0.3s;
}

.social-links a:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.project-card {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.badge {
    background-color: var(--primary-color);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
}

.tech-tag {
    background-color: var(--light-color);
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--text-color);
}

.project-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-small {
    padding: 8px 20px;
    font-size: 0.9rem;
}

/* Contact Section */
.contact-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 4rem;
    max-width: 1000px;
    margin: 0 auto;
}

.contact-info h3 {
    margin-bottom: 1.5rem;
    color: var(--dark-color);
}

.contact-info p {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

/* Footer */
.footer {
    background-color: var(--dark-color);
    color: white;
    text-align: center;
    padding: 2rem 0;
}

.footer a {
    color: var(--primary-color);
    text-decoration: none;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero h2 {
        font-size: 1.5rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 300px;
    }
    
    .nav-links {
        display: none;
    }
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section {
    animation: fadeIn 0.8s ease-out;
}`;
  };

  // Function to generate JavaScript
  const generateJS = () => {
    return `// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e5e7eb';
                }
            });
            
            if (isValid) {
                // If EmailJS is not set up, use simple alert
                if (typeof emailjs === 'undefined') {
                    alert('Thank you for your message! This is a demo form. In a real setup, this would send an email.');
                    this.reset();
                }
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Console greeting
    console.log('%c👋 Welcome to the portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%cThis portfolio was generated with Portfolio Builder', 'color: #666;');
});`;
  };

 const downloadPortfolioCode = async () => {
  if (!portfolioData) return;
  
  setIsGenerating(true);
  
  try {
    const templateId = portfolioData.templateId || 1;
    const userName = portfolioData.name || portfolioData.artistName || 'portfolio';
    const safeName = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Create download record
    const downloadRecord = {
      id: `download-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      filename: `${safeName}-portfolio.zip`,
      portfolioId: portfolioData.id || `portfolio-${Date.now()}`,
      portfolioName: userName,
      templateId: templateId,
      timestamp: new Date().toISOString(),
      status: 'completed',
      size: '2.5 MB',
      filepath: `${safeName}-portfolio.zip`,
      url: `https://${safeName}-portfolio.vercel.app` // Example URL
    };
    
    // Save to localStorage
    const existingDownloads = JSON.parse(localStorage.getItem('portfolio_downloads') || '[]');
    const updatedDownloads = [downloadRecord, ...existingDownloads];
    localStorage.setItem('portfolio_downloads', JSON.stringify(updatedDownloads));
    
    // Generate actual files based on template
    let htmlContent, cssContent, jsContent;
    
    if (templateId === 7) {
      // Use Template 7 specific generators
      htmlContent = generateTemplate7HTML(portfolioData);
      cssContent = generateTemplate7CSS(portfolioData);
      jsContent = generateTemplate7JS();
    } else {
      // Use regular generators
      htmlContent = generateHTML(templateId, portfolioData);
      cssContent = generateCSS(templateId, portfolioData);
      jsContent = generateJS();
    }
    
    // Create ZIP file (if jszip is available)
    try {
      const JSZip = await import('jszip');
      const zip = new JSZip.default();
      
      // Add files to ZIP
      zip.file("index.html", htmlContent);
      zip.file("style.css", cssContent);
      zip.file("script.js", jsContent);
      
      // Add README
      const readmeContent = `# ${userName}'s Portfolio\n\nThis portfolio was created with Portfolio Builder.\n\n## Quick Start:\n1. Extract all files\n2. Upload to Vercel, Netlify, or GitHub Pages\n3. Your portfolio is live!`;
      zip.file("README.md", readmeContent);
      
      // Add configuration files
      zip.file("vercel.json", JSON.stringify({
        "version": 2,
        "name": safeName,
        "builds": [{ "src": "index.html", "use": "@vercel/static" }],
        "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
      }, null, 2));
      
      zip.file("netlify.toml", `[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`);
      
      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeName}-portfolio.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (zipError) {
      console.warn('ZIP creation failed, offering text download instead', zipError);
      
      // Fallback: Create a text file with HTML
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      const htmlUrl = URL.createObjectURL(htmlBlob);
      const a = document.createElement("a");
      a.href = htmlUrl;
      a.download = `${safeName}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(htmlUrl);
    }
    
    // Show success message
    showAlertModal(
      '✅ Portfolio Downloaded Successfully!',
      `📁 File: ${safeName}-portfolio.zip\n\n✅ Download recorded in your dashboard!\n\n📂 Folder Structure:\n├── index.html\n├── style.css\n├── script.js\n├── README.md\n├── vercel.json\n└── netlify.toml\n\n🎯 Check "Portfolio Files" dashboard to view all downloads.`,
      'success'
    );
    
  } catch (error) {
    console.error('Error creating portfolio package:', error);
    showAlertModal(
      '⚠️ Error Generating Files',
      'There was an issue generating the portfolio files. Please try again.\n\nError: ' + error.message,
      'error'
    );
  } finally {
    setIsGenerating(false);
  }
};
  const copyCodeToClipboard = () => {
  if (!portfolioData) return;
  
  let htmlCode;
  if (portfolioData.templateId === 7) {
    htmlCode = generateTemplate7HTML(portfolioData);
  } else {
    htmlCode = generateHTML(portfolioData.templateId, portfolioData);
  }
  
  navigator.clipboard.writeText(htmlCode).then(() => {
    showAlertModal(
      '✅ Copied Successfully!',
      `✅ HTML code copied to clipboard!\n\n📋 **What's copied:**\nComplete HTML code for your portfolio\n\n🔧 **Next Steps:**\n1. Create a new file named index.html\n2. Paste the copied code\n3. Add style.css and script.js files\n4. Your portfolio is ready to deploy!`,
      'success'
    );
  }).catch(err => {
    showAlertModal(
      '❌ Copy Failed',
      'Could not copy code to clipboard.\n\n**Possible reasons:**\n• Clipboard permissions not granted\n• Browser security restrictions\n\n💡 **Try this instead:**\n1. Download the ZIP file\n2. Extract and edit the HTML file\n3. Copy the code manually',
      'error'
    );
  });
};
  const showGitHubGuide = () => {
    showAlertModal(
      '🐙 GitHub Pages Deployment',
      `## Step-by-Step Guide\n\n### 1. Create GitHub Repository\n- Go to github.com and sign in\n- Click "New Repository"\n- Name: portfolio-website\n- Keep it public\n\n### 2. Upload Files\n- Click "uploading an existing file"\n- Select all downloaded portfolio files\n- Commit changes\n\n### 3. Enable GitHub Pages\n- Go to Settings → Pages\n- Select "main" branch\n- Click Save\n\n### 4. Your Site is Live!\n- Visit: username.github.io/portfolio-website\n- Takes 1-2 minutes to deploy\n\n✅ Free forever with custom domain option`,
      'info'
    );
  };

  const downloadFilesAlert = () => {
    showAlertModal(
      '📦 Portfolio Files Ready',
      `## What's Included:\n\n📄 **HTML File** - Complete portfolio structure\n🎨 **CSS File** - Styling and responsive design\n⚡ **JavaScript File** - Interactive features\n📖 **README.md** - Deployment instructions\n⚙️ **Config Files** - For Vercel & Netlify\n\n## Quick Start:\n1. Download the ZIP file\n2. Extract to a folder\n3. Choose hosting platform below\n4. Follow step-by-step guide\n\n💡 Pro Tip: Start with Vercel for easiest deployment`,
      'info'
    );
  };

// Function to generate HTML for Template 7
const generateTemplate7HTML = (data) => {
  // Get enabled sections
  const enabledSections = data.sections?.filter(section => section.enabled) || [];
  const getOrderedSections = () => {
    return enabledSections.sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name || 'Developer'} - AI Portfolio</title>
    <meta name="description" content="${data.bio || 'Professional Developer Portfolio'}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="dev-nav">
        <div class="nav-logo">
            <i class="fas fa-robot logo-icon"></i>
            <span class="logo-text">AI.<span class="highlight">PORTFOLIO</span></span>
        </div>
        <div class="nav-links">
            <a href="#hero">HOME</a>
            <a href="#about">ABOUT</a>
            ${getOrderedSections().map(section => `
                <a href="#${section.id}">${section.title.toUpperCase()}</a>
            `).join('')}
            <a href="#contact">CONTACT</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="dev-hero">
        <div class="hero-content">
            <h1 class="hero-title">
                <span class="gradient-text">${(data.name || 'DEVELOPER').toUpperCase()}</span>
                <span class="title-cursor">_</span>
            </h1>
            <h2 class="hero-subtitle">
                ${data.jobTitle?.toUpperCase() || 'FULL-STACK DEVELOPER'}
            </h2>
            <p class="hero-desc">
                ${data.tagline || 'Building the future with code'}
            </p>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="section-number">01</span>
                    ABOUT ME
                </h2>
            </div>
            <div class="about-grid">
                <div class="about-content">
                    <h3>Code. Create. Innovate.</h3>
                    <p>${data.bio || 'Passionate developer...'}</p>
                    <div class="social-links">
                        ${data.github ? `<a href="${data.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Dynamic Sections -->
    ${getOrderedSections().map((section, index) => {
        const sectionNumber = (index + 2).toString().padStart(2, '0');
        
        switch(section.type) {
            case 'tech-stack':
                return `
    <section id="${section.id}" class="skills-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="section-number">${sectionNumber}</span>
                    ${section.title.toUpperCase()}
                </h2>
            </div>
            <div class="skills-categories">
                ${section.data.frontend && section.data.frontend.length > 0 ? `
                <div class="category">
                    <h3>Frontend</h3>
                    <div class="skills-list">
                        ${section.data.frontend.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>` : ''}
                
                ${section.data.backend && section.data.backend.length > 0 ? `
                <div class="category">
                    <h3>Backend</h3>
                    <div class="skills-list">
                        ${section.data.backend.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>
    </section>`;
            
            case 'projects':
                return `
    <section id="${section.id}" class="projects-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="section-number">${sectionNumber}</span>
                    ${section.title.toUpperCase()}
                </h2>
            </div>
            <div class="projects-grid">
                ${section.data.map(project => `
                <div class="project-card">
                    <div class="project-header">
                        <div class="project-badge">${project.badge || 'PROJECT'}</div>
                        <h3>${project.title}</h3>
                    </div>
                    <p class="project-desc">${project.description}</p>
                    ${project.technologies ? `
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>` : ''}
                    <div class="project-links">
                        ${project.liveUrl && project.liveUrl !== '#' ? 
                            `<a href="${project.liveUrl}" class="project-link" target="_blank">View Demo</a>` : ''}
                        ${project.githubUrl && project.githubUrl !== '#' ? 
                            `<a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>` : ''}
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>`;
            
            default:
                return '';
        }
    }).join('')}

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="section-number">${(getOrderedSections().length + 2).toString().padStart(2, '0')}</span>
                    GET IN TOUCH
                </h2>
            </div>
            <div class="contact-grid">
                <div class="contact-info">
                    <h3>Let's Build Something Amazing</h3>
                    <p>${data.availability || 'Open to opportunities'}</p>
                    ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ''}
                    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                </div>
                <form id="contactForm" class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="submit-btn">SEND MESSAGE</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="dev-footer">
        <div class="container">
            <p>© ${new Date().getFullYear()} ${data.name}. Built with Portfolio Builder.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
};

// Function to generate CSS for Template 7
const generateTemplate7CSS = (data) => {
  return `/* Template 7 - AI Portfolio Styles */
:root {
    --primary: #00d9ff;
    --secondary: #8a2be2;
    --dark: #0a0a0f;
    --light: #ffffff;
    --gray: #1a1a2e;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: var(--dark);
    color: var(--light);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.dev-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: rgba(10, 10, 15, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 217, 255, 0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 800;
}

.logo-icon {
    color: var(--primary);
}

.highlight {
    color: var(--primary);
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: var(--light);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: var(--primary);
}

/* Hero Section */
.dev-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8rem 2rem 4rem;
    background: linear-gradient(135deg, rgba(10,10,15,1) 0%, rgba(26,26,46,1) 100%);
    position: relative;
    overflow: hidden;
}

.dev-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(0,217,255,0.1) 0%, transparent 50%);
}

.hero-title {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1rem;
    letter-spacing: 2px;
}

.gradient-text {
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.5rem;
    color: #aaa;
    margin-bottom: 2rem;
    font-weight: 400;
}

.hero-desc {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 3rem;
    color: #ccc;
}

/* Sections */
.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: 2px;
}

.section-number {
    color: var(--primary);
    margin-right: 10px;
}

/* About Section */
.about-section {
    padding: 6rem 0;
    background: var(--gray);
}

.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-content h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.about-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #ccc;
    margin-bottom: 2rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-links a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.8rem 1.5rem;
    background: rgba(0, 217, 255, 0.1);
    color: var(--primary);
    text-decoration: none;
    border-radius: 4px;
    border: 1px solid rgba(0, 217, 255, 0.2);
    transition: all 0.3s;
}

.social-links a:hover {
    background: rgba(0, 217, 255, 0.2);
    transform: translateY(-2px);
}

/* Projects Section */
.projects-section {
    padding: 6rem 0;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.project-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 217, 255, 0.1);
    border-radius: 8px;
    padding: 2rem;
    transition: all 0.3s;
}

.project-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: 0 10px 30px rgba(0, 217, 255, 0.1);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
}

.project-badge {
    background: var(--primary);
    color: var(--dark);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.project-desc {
    color: #ccc;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.project-tech span {
    background: rgba(0, 217, 255, 0.1);
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--primary);
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    padding: 0.8rem 1.5rem;
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s;
}

.project-link:hover {
    background: var(--primary);
    color: var(--dark);
}

/* Contact Section */
.contact-section {
    padding: 6rem 0;
    background: var(--gray);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.contact-info p {
    color: #ccc;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: var(--light);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: var(--primary);
}

.submit-btn {
    padding: 1rem 2rem;
    background: var(--primary);
    color: var(--dark);
    border: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
}

/* Footer */
.dev-footer {
    text-align: center;
    padding: 2rem;
    background: var(--dark);
    border-top: 1px solid rgba(0, 217, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .about-grid,
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .nav-links {
        display: none;
    }
}`;
};

// Function to generate JavaScript for Template 7
const generateTemplate7JS = () => {
  return `// Template 7 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            this.reset();
        });
    }
    
    // Cursor animation
    const cursor = document.querySelector('.title-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});`;
};
  const platforms = [
    {
      id: 'vercel',
      name: 'Vercel',
      icon: <SiVercel />,
      color: '#000000',
      description: 'Easiest deployment with instant previews',
      steps: [
        'Sign up at vercel.com (free)',
        'Drag and drop your folder',
        'Get live URL in 30 seconds'
      ]
    },
    {
      id: 'netlify',
      name: 'Netlify',
      icon: <SiNetlify />,
      color: '#00C7B7',
      description: 'Great for static sites with free SSL',
      steps: [
        'Sign up at netlify.com',
        'Drag folder to Netlify dashboard',
        'Automatic HTTPS included'
      ]
    },
    {
      id: 'github',
      name: 'GitHub Pages',
      icon: <FaGithub />,
      color: '#333333',
      description: 'Free hosting for GitHub users',
      steps: [
        'Create GitHub repository',
        'Upload all files to repo',
        'Enable GitHub Pages in settings'
      ]
    },
    {
      id: 'firebase',
      name: 'Firebase Hosting',
      icon: <FaFire />,
      color: '#FFCA28',
      description: 'Google hosting with global CDN',
      steps: [
        'Install Firebase CLI',
        'Run: firebase init hosting',
        'Deploy with: firebase deploy'
      ]
    }
  ];

  if (!portfolioData) {
    return (
      <div className="loading-guide">
        <div className="spinner"></div>
        <p>Loading your portfolio data...</p>
      </div>
    );
  }

 const templateName = portfolioData.templateId === 1 ? 'Developer' :
                    portfolioData.templateId === 2 ? 'Designer' :
                    portfolioData.templateId === 3 ? 'Data Scientist' :
                    portfolioData.templateId === 4 ? 'Business Analyst' :
                    portfolioData.templateId === 5 ? 'Digital Marketer' :
                    portfolioData.templateId === 6 ? 'Music Artist' :
                    portfolioData.templateId === 7 ? 'AI Developer Portfolio' : 'Portfolio';

  return (
    <div className="deployment-guide">
	<button 
    className="simple-back-btn" 
    onClick={() => window.history.back()}
  >
    ← Back
  </button>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-card ${modalContent.type}`}>
            <div className="modal-header">
              <h3>
                {modalContent.type === 'success' && '✅ '}
                {modalContent.type === 'error' && '❌ '}
                {modalContent.type === 'info' && '💡 '}
                {modalContent.title}
              </h3>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {modalContent.content.split('\n').map((line, index) => (
                <div key={index} className="modal-line">
                  {line.startsWith('## ') ? (
                    <h4>{line.substring(3)}</h4>
                  ) : line.startsWith('- ') ? (
                    <div className="modal-list-item">
                      <span className="bullet">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  ) : line.startsWith('✅ ') ? (
                    <div className="modal-success-item">
                      <span className="check">✓</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  ) : (
                    <p>{line}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="modal-ok-btn" onClick={closeModal}>
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="guide-header">
        <h1><FaCloudUploadAlt /> Launch Your Portfolio</h1>
        <p className="subtitle">
          Get your <span className="highlight">{templateName}</span> portfolio live in minutes
        </p>
        <div className="portfolio-info">
          <span className="info-badge">👤 {portfolioData.name || portfolioData.artistName}</span>
          <span className="info-badge">🎨 {templateName} Template</span>
          <span className="info-badge">🚀 Ready to Deploy</span>
        </div>
      </div>

      <div className="guide-content">
        {/* Quick Actions Section */}
        <div className="quick-actions-section">
          <h2><FaRocket /> Quick Start Options</h2>
          <p className="section-subtitle">Choose how you want to deploy your portfolio</p>
          
          <div className="quick-actions-grid">
            <div className="quick-action-card primary">
  <div className="action-icon">
    <FaDownload />
  </div>
  <div className="action-content">
    <h4>Download Complete Package</h4>
    <p>Get all files including HTML, CSS, JS, and configuration files ready to deploy</p>
  </div>
  <button 
    className="action-btn"
    onClick={() => {
      // Direct download without showing alert first
      downloadPortfolioCode();
    }}
    disabled={isGenerating}
  >
    {isGenerating ? '⏳ Downloading...' : '📥 Download ZIP'}
  </button>
</div>
            
            <div className="quick-action-card secondary">
              <div className="action-icon">
                <FaCopy />
              </div>
              <div className="action-content">
                <h4>Copy HTML Code Only</h4>
                <p>Copy the HTML to paste into your existing website or CMS</p>
              </div>
              <button 
                className="action-btn"
                onClick={copyCodeToClipboard}
              >
                📋 Copy HTML Code
              </button>
            </div>
            
            <div className="quick-action-card tertiary">
              <div className="action-icon">
                <FaGithub />
              </div>
              <div className="action-content">
                <h4>GitHub Pages Guide</h4>
                <p>Step-by-step instructions for free GitHub hosting</p>
              </div>
              <button 
                className="action-btn"
                onClick={showGitHubGuide}
              >
                🐙 View GitHub Guide
              </button>
            </div>
          </div>
          
          <div className="action-tips">
            <FaInfoCircle /> <strong>Tip:</strong> Download the ZIP for complete control, or use Copy HTML for quick integration
          </div>
        </div>

        {/* Platform Selection */}
        <div className="platform-section">
          <h2><FaCloudUploadAlt /> Choose Your Hosting Platform</h2>
          <p className="section-subtitle">Select a platform for detailed, step-by-step deployment instructions</p>
          
          <div className="platforms-grid">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                className={`platform-card ${selectedPlatform === platform.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlatform(platform.id)}
                style={{ borderLeftColor: platform.color }}
              >
                <div className="platform-header">
                  <div className="platform-icon" style={{ color: platform.color }}>
                    {platform.icon}
                  </div>
                  <div className="platform-title">
                    <h3>{platform.name}</h3>
                    <div className="platform-tag">
                      {platform.id === 'vercel' ? '⚡ Easiest' : 
                       platform.id === 'netlify' ? '🔒 Free SSL' :
                       platform.id === 'github' ? '💯 Free' : '🌐 Google CDN'}
                    </div>
                  </div>
                </div>
                <p className="platform-desc">{platform.description}</p>
                <div className="platform-steps">
                  {platform.steps.map((step, index) => (
                    <div key={index} className="platform-step">
                      <span className="step-number">{index + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Platform-Specific Guide */}
          {selectedPlatform && (
            <div className="platform-guide-section">
              <div className="guide-header-section">
                <h3>
                  {platforms.find(p => p.id === selectedPlatform).icon}
                  {platforms.find(p => p.id === selectedPlatform).name} Deployment Guide
                </h3>
                <p className="guide-time">⏱️ Estimated time: {selectedPlatform === 'vercel' ? '2 minutes' : '5 minutes'}</p>
              </div>
              
              <div className="guide-steps">
                {selectedPlatform === 'vercel' && (
                  <>
                    <div className="guide-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Create Vercel Account</h4>
                        <p>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a> and sign up with GitHub, GitLab, or email.</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Start New Project</h4>
                        <p>Click "New Project" → Import your portfolio folder.</p>
                        <div className="code-snippet">
                          <code>Drag and drop your portfolio folder here</code>
                        </div>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Configure & Deploy</h4>
                        <p>Vercel auto-detects settings. Just click "Deploy".</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Your Site is Live!</h4>
                        <p>Your portfolio will be available at:</p>
                        <div className="success-box">
                          <strong>yourname.vercel.app</strong>
                          <small>Custom domain can be added later</small>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedPlatform === 'firebase' && (
                  <>
                    <div className="guide-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Install Firebase CLI</h4>
                        <p>Open terminal/command prompt and install Firebase tools:</p>
                        <div className="code-snippet multi-line">
                          <code>npm install -g firebase-tools</code>
                          <small className="code-note">or use: yarn global add firebase-tools</small>
                        </div>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Login & Initialize</h4>
                        <p>Run these commands one by one:</p>
                        <div className="code-snippet multi-line">
                          <code className="block">firebase login</code>
                          <code className="block">firebase init hosting</code>
                          <small className="code-note">Select your project or create new</small>
                        </div>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Copy Files & Deploy</h4>
                        <p>Place portfolio files in project folder, then deploy:</p>
                        <div className="code-snippet">
                          <code>firebase deploy --only hosting</code>
                        </div>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Deployment Complete</h4>
                        <p>Your Firebase URL will be displayed:</p>
                        <div className="success-box">
                          <strong>your-project.web.app</strong>
                          <small>Also available at: your-project.firebaseapp.com</small>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedPlatform === 'netlify' && (
                  <>
                    <div className="guide-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Sign Up for Netlify</h4>
                        <p>Go to <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">netlify.com</a> and create a free account.</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Drag & Drop Deployment</h4>
                        <p>Go to "Sites" → Drag your entire portfolio folder to the drop zone.</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Wait for Build</h4>
                        <p>Netlify automatically detects and deploys your site.</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Your Site is Live!</h4>
                        <p>Visit your custom Netlify URL:</p>
                        <div className="success-box">
                          <strong>random-name.netlify.app</strong>
                          <small>Free SSL included automatically</small>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedPlatform === 'github' && (
                  <>
                    <div className="guide-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Create GitHub Repository</h4>
                        <p>Go to GitHub → New repository → Name: portfolio</p>
                        <div className="code-snippet">
                          <code>Repository name: portfolio-website</code>
                          <small className="code-note">Keep it public for free hosting</small>
                        </div>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Upload Files</h4>
                        <p>Upload all portfolio files using "upload existing files".</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Enable GitHub Pages</h4>
                        <p>Settings → Pages → Source: main branch → Save</p>
                      </div>
                    </div>
                    <div className="guide-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Visit Your Site</h4>
                        <p>Your portfolio will be available at:</p>
                        <div className="success-box">
                          <strong>username.github.io/portfolio-website</strong>
                          <small>Takes 1-2 minutes to go live</small>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="guide-actions">
                <button 
                  className="download-guide-btn"
                  onClick={downloadPortfolioCode}
                  disabled={isGenerating}
                >
                  {isGenerating ? '⏳ Generating...' : '📥 Download Portfolio Files'}
                </button>
                <p className="guide-note">
                  <FaInfoCircle /> First download the files, then follow the steps above to deploy
                </p>
              </div>
            </div>
          )}
        </div>

        {/* File Structure Preview */}
        <div className="file-structure-section">
          <h2><FaFileCode /> What's in the Package</h2>
          <p className="section-subtitle">Complete set of files you'll receive</p>
          
          <div className="file-structure-grid">
            <div className="file-item">
              <div className="file-icon html">.html</div>
              <div className="file-info">
                <h4>index.html</h4>
                <p>Complete portfolio structure with your content</p>
              </div>
            </div>
            <div className="file-item">
              <div className="file-icon css">.css</div>
              <div className="file-info">
                <h4>style.css</h4>
                <p>Responsive design with modern styling</p>
              </div>
            </div>
            <div className="file-item">
              <div className="file-icon js">.js</div>
              <div className="file-info">
                <h4>script.js</h4>
                <p>Interactive features and animations</p>
              </div>
            </div>
            <div className="file-item">
              <div className="file-icon md">.md</div>
              <div className="file-info">
                <h4>README.md</h4>
                <p>Complete deployment instructions</p>
              </div>
            </div>
            <div className="file-item">
              <div className="file-icon json">.json</div>
              <div className="file-info">
                <h4>Config Files</h4>
                <p>Ready for Vercel, Netlify & Firebase</p>
              </div>
            </div>
          </div>
          
          <div className="folder-preview">
            <h4>📁 Folder Structure Preview</h4>
            <pre className="folder-tree">
{`portfolio-website/
├── 📄 index.html
├── 🎨 style.css
├── ⚡ script.js
├── 📖 README.md
├── ⚙️ package.json
├── 🚀 vercel.json
└── 🌐 netlify.toml`}
            </pre>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3><FaExclamationTriangle /> Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Is hosting really free?</h4>
              <p>Yes! All platforms offer free tiers perfect for portfolios. Vercel, Netlify, and GitHub Pages are completely free with custom domains available on paid plans.</p>
            </div>
            <div className="faq-item">
              <h4>Can I update my portfolio later?</h4>
              <p>Absolutely! Just edit the files and redeploy. Most platforms support continuous deployment from GitHub for automatic updates.</p>
            </div>
            <div className="faq-item">
              <h4>Do I need coding experience?</h4>
              <p>No coding needed! The files are ready-to-use. Just follow the simple deployment steps above.</p>
            </div>
            <div className="faq-item">
              <h4>How long does deployment take?</h4>
              <p>Vercel: 30 seconds, Netlify: 1-2 minutes, GitHub Pages: 2-3 minutes. All provide live URLs immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;