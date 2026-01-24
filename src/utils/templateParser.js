export const fillTemplate = (templateId, userData) => {
  // This function would replace placeholders in templates with user data
  const templates = {
    1: require('../components/templates/Template1'),
    2: require('../components/templates/Template2'),
    3: require('../components/templates/Template3'),
    4: require('../components/templates/Template4'),
    5: require('../components/templates/Template5'),
  };
  
  // In a real app, you would dynamically replace placeholders
  // For now, we'll return the template as-is
  return templates[templateId];
};

export const generateHTML = (templateId, userData) => {
  // Generate complete HTML file for download
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.fullName} - Portfolio</title>
    <style>
        /* Basic reset */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { background: #3498db; color: white; padding: 40px 20px; }
        h1 { margin-bottom: 10px; }
        .contact-info { margin: 20px 0; }
        section { padding: 40px 20px; border-bottom: 1px solid #eee; }
        footer { text-align: center; padding: 20px; background: #f5f5f5; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${userData.fullName || 'Your Name'}</h1>
            <h2>${userData.professionalTitle || 'Your Title'}</h2>
            <div class="contact-info">
                ${userData.email ? `<p>📧 ${userData.email}</p>` : ''}
                ${userData.phone ? `<p>📱 ${userData.phone}</p>` : ''}
                ${userData.linkedin ? `<p>💼 ${userData.linkedin}</p>` : ''}
            </div>
        </div>
    </header>
    
    <section>
        <div class="container">
            <h3>About Me</h3>
            <p>${userData.summary || 'Professional summary here'}</p>
        </div>
    </section>
    
    ${userData.skills ? `
    <section>
        <div class="container">
            <h3>Skills</h3>
            <p>${userData.skills}</p>
        </div>
    </section>` : ''}
    
    <footer>
        <div class="container">
            <p>Generated with Portfolio.ai • ${new Date().getFullYear()}</p>
        </div>
    </footer>
</body>
</html>`;
  
  return html;
};