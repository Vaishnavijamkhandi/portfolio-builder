// src/utils/aiHelper.js
// Template-specific fallback improvements
const templateAIFallbacks = {
  1: { // Developer
    bio: (name, title) => `Passionate ${title} with expertise in modern web technologies. ${name} builds scalable applications with clean code and best practices, delivering high-performance solutions that drive business growth.`,
    project: (title) => `Developed ${title} using cutting-edge technologies with focus on performance, scalability, and user experience. Implemented industry best practices and delivered ahead of schedule.`,
    experience: (desc) => `${desc}. Achieved measurable results through efficient problem-solving and technical leadership.`,
    default: (text) => `${text} [Enhanced for developer portfolio]`
  },
  2: { // Designer
    bio: (name, title) => `Creative ${title} with a user-centered approach. ${name} transforms complex problems into beautiful, intuitive digital experiences that resonate with users and drive engagement.`,
    designProject: (desc) => `Designed ${desc} focusing on user experience, visual aesthetics, and interaction design principles. Delivered pixel-perfect designs that exceeded client expectations.`,
    default: (text) => `${text} [Enhanced for design portfolio]`
  },
  3: { // Data Scientist
    bio: (name, title) => `Analytical ${title} specializing in data-driven insights. ${name} transforms raw data into actionable business intelligence, building predictive models that drive strategic decision-making.`,
    researchProject: (desc) => `Research project: ${desc}. Applied advanced statistical methods and machine learning algorithms to extract meaningful insights from complex datasets.`,
    default: (text) => `${text} [Enhanced for data science portfolio]`
  },
  4: { // Business Analyst
    bio: (name, title) => `Strategic ${title} with expertise in business process optimization. ${name} bridges the gap between business needs and technical solutions, delivering measurable ROI through data-driven insights.`,
    caseStudy: (solution) => `Solution implemented: ${solution}. Resulted in significant cost savings and process improvements for the client.`,
    default: (text) => `${text} [Enhanced for business portfolio]`
  },
  5: { // Digital Marketer
    bio: (name, title) => `Results-driven ${title} specializing in digital growth strategies. ${name} creates campaigns that deliver measurable ROI and business impact through data-driven marketing approaches.`,
    campaign: (title) => `Executed ${title} campaign across multiple channels, optimizing for engagement, conversion, and brand awareness. Delivered exceptional results within budget.`,
    default: (text) => `${text} [Enhanced for marketing portfolio]`
  },
  6: { // Music Artist
    bio: (name, title) => `Creative ${title} with a unique sonic signature. ${name} crafts immersive musical experiences that resonate with audiences worldwide through innovative sound design and emotive compositions.`,
    musicProject: (desc) => `Produced ${desc} with intricate sound design and melodic complexity, creating an auditory journey that connects with listeners on an emotional level.`,
    artistBio: (text) => `${text}. Blending technical mastery with artistic vision to create memorable musical moments.`,
    default: (text) => `${text} [Enhanced for music portfolio]`
  },
  7: { // Flexible Portfolio
    bio: (name, title) => `${name} is a ${title} with a diverse skill set and professional experience. Using a flexible portfolio approach, they showcase their unique combination of skills and achievements in a customizable format that adapts to any profession.`,
    summary: (text) => `${text}. This portfolio utilizes a modular design that can be customized to highlight specific strengths, achievements, and professional experiences relevant to any field or industry.`,
    experience: (desc) => `${desc}. Demonstrated adaptability across various roles and industries, consistently delivering results through innovative approaches and strategic thinking.`,
    skills: () => 'Adaptable professional with expertise in multiple domains including technical, creative, and strategic skills',
    default: (text) => `${text} [Enhanced for flexible portfolio]`
  }
};

// Check if AI is available
const isAIAvailable = () => {
  return !!process.env.REACT_APP_OPENAI_API_KEY;
};

// Get template-specific fallback
const getFallbackImprovement = (field, text, templateId, userData) => {
  const template = templateAIFallbacks[templateId];
  if (!template) return text;
  
  // Template 7 specific
  if (templateId === 7) {
    if (field === 'bio' || field === 'summary') {
      return template.summary?.(text) || template.default?.(text) || text;
    }
    if (field === 'experience') {
      return template.experience?.(text) || template.default?.(text) || text;
    }
    if (field === 'skills') {
      return template.skills?.() || text;
    }
    return template.default?.(text) || text;
  }
  
  // Other templates
  if (field === 'bio' && template.bio) {
    return template.bio(userData?.name || '', userData?.title || '');
  }
  
  if (field === 'projects' || field === 'designProject') {
    return template.designProject?.(text) || template.default?.(text) || text;
  }
  
  if (field === 'researchProjects' || field === 'researchProject') {
    return template.researchProject?.(text) || template.default?.(text) || text;
  }
  
  if (field === 'caseStudies' || field === 'caseStudy') {
    return template.caseStudy?.(text) || template.default?.(text) || text;
  }
  
  if (field === 'campaigns' || field === 'campaign') {
    return template.campaign?.(text) || template.default?.(text) || text;
  }
  
  if (field === 'tracks' || field === 'musicProject') {
    return template.musicProject?.(text) || template.default?.(text) || text;
  }
  
  if (field === 'artistBio') {
    return template.artistBio?.(text) || template.default?.(text) || text;
  }
  
  return template.default?.(text) || text;
};

// Main AI improvement function
export const improveWithAI = async (field, text, templateId, userData = {}) => {
  const templateIdNum = parseInt(templateId);
  
  // If AI not available, use template-specific fallback
  if (!isAIAvailable()) {
    return getFallbackImprovement(field, text, templateIdNum, userData);
  }

  try {
    // Template-specific system prompts
    const systemPrompts = {
      1: "You are helping a software developer improve their portfolio content. Make it professional, technical, and focused on coding achievements.",
      2: "You are helping a UI/UX designer improve their portfolio content. Make it creative, user-focused, and visually descriptive.",
      3: "You are helping a data scientist improve their portfolio content. Make it analytical, data-driven, and research-focused.",
      4: "You are helping a business analyst improve their portfolio content. Make it strategic, results-oriented, and business-focused.",
      5: "You are helping a digital marketer improve their portfolio content. Make it engaging, results-driven, and conversion-focused.",
      6: "You are helping a music artist improve their portfolio content. Make it artistic, emotional, and focused on musical expression.",
      7: "You are helping a professional create a flexible portfolio. Make the content adaptable, professional, and suitable for any industry or role."
    };
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompts[templateIdNum] || "Improve this portfolio content professionally."
          },
          {
            role: 'user',
            content: `Improve this ${field} for my portfolio:\n\n${text}\n\nMake it more impactful and professional.`
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.warn('AI service failed, using fallback:', error);
    // Use template-specific fallback
    return getFallbackImprovement(field, text, templateIdNum, userData);
  }
};

// Enhanced text with AI (for Template 7 and other templates)
export const enhanceTextWithAI = async (text, field) => {
  // Mock AI enhancement - in real app, call your AI API
  const enhancements = {
    bio: [
      "Transforming into a professional bio...",
      "Crafting an engaging professional summary...",
      "Polishing your bio for maximum impact..."
    ],
    summary: [
      "Creating a compelling professional summary...",
      "Enhancing your career summary...",
      "Professionalizing your summary statement..."
    ],
    experience: [
      "Improving experience descriptions...",
      "Professionalizing your work experience...",
      "Enhancing job descriptions..."
    ],
    default: [
      "Improving text quality...",
      "Polishing your content...",
      "Enhancing readability..."
    ]
  };

  const messages = enhancements[field] || enhancements.default;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Simulate AI processing
  return new Promise((resolve) => {
    setTimeout(() => {
      // Basic text improvements (simulated AI)
      const improvedText = text
        .replace(/i am/g, 'I am')
        .replace(/i have/g, 'I have')
        .replace(/i work/g, 'I work')
        .replace(/\b(\w+)\b/g, (match) => {
          const professionalWords = {
            'good': 'excellent',
            'great': 'outstanding',
            'make': 'develop',
            'do': 'execute',
            'know': 'expertise in',
            'help': 'assist',
            'use': 'utilize',
            'try': 'attempt',
            'fix': 'resolve',
            'tell': 'communicate'
          };
          return professionalWords[match.toLowerCase()] || match;
        })
        .replace(/(\.)(\s|$)/g, '$1 $2')
        .trim();

      // Add some professional phrases
      const professionalPhrases = [
        "with a strong background in",
        "demonstrated success in",
        "proven ability to",
        "skilled in",
        "experienced with",
        "passionate about",
        "dedicated to",
        "committed to excellence in"
      ];

      // Only add if text is short
      if (improvedText.length < 100) {
        const randomPhrase = professionalPhrases[Math.floor(Math.random() * professionalPhrases.length)];
        resolve(`${improvedText} ${randomPhrase} my field.`);
      } else {
        resolve(improvedText);
      }
    }, 1500);
  });
};

// Generate section content (SINGLE FUNCTION - REMOVED DUPLICATE)
export const generateSectionContent = async (sectionType, userData) => {
  // Generate content for different sections based on user data
  const generators = {
    about: () => {
      return `${userData.name || 'Professional'} is a ${userData.profession || 'skilled professional'} with expertise in ${userData.skills?.join(', ') || 'multiple domains'}. With a focus on delivering high-quality results, they bring a unique combination of technical skills and strategic thinking to every project.`;
    },
    skills: () => {
      return userData.skills || [
        'Project Management',
        'Strategic Planning',
        'Communication',
        'Problem Solving',
        'Adaptability'
      ];
    },
    experience: () => {
      return [{
        title: userData.profession || 'Professional Role',
        company: 'Various Organizations',
        duration: 'Multiple years',
        description: `Demonstrated success across different roles, consistently delivering measurable results through innovative approaches and strategic execution.`
      }];
    },
    projects: () => {
      return [{
        title: `${userData.profession || 'Professional'} Project`,
        description: `A comprehensive project demonstrating skills in ${userData.skills?.[0] || 'project management'} and ${userData.skills?.[1] || 'strategic execution'}.`,
        technologies: userData.skills?.slice(0, 3) || ['Project Management', 'Strategy', 'Execution']
      }];
    }
  };

  const generator = generators[sectionType];
  return generator ? generator() : '';
};

// Generate complete content suggestions
export const generateAISuggestion = async (templateId, section, context = {}) => {
  const templateIdNum = parseInt(templateId);
  
  if (!isAIAvailable()) {
    return "AI suggestions are currently unavailable. Please fill in your details manually.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a professional portfolio writer for ${getTemplateName(templateIdNum)}.`
          },
          {
            role: 'user',
            content: `Generate ${section} content for a ${getTemplateName(templateIdNum)} portfolio with these details: ${JSON.stringify(context)}`
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.warn('AI generation failed:', error);
    return "Professional content suggestion would appear here.";
  }
};

// Helper function
function getTemplateName(templateId) {
  const names = {
    1: 'Software Developer',
    2: 'UI/UX Designer',
    3: 'Data Scientist',
    4: 'Business Analyst',
    5: 'Digital Marketer',
    6: 'Music Artist',
    7: 'Flexible Portfolio'
  };
  return names[templateId] || 'Professional';
}

// Test AI availability
export const testAIConnection = async () => {
  if (!isAIAvailable()) {
    return { available: false, message: 'OpenAI API key not configured' };
  }
  
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      }
    });
    
    return { 
      available: response.ok, 
      message: response.ok ? 'AI connected successfully' : 'AI service error' 
    };
  } catch (error) {
    return { available: false, message: 'AI service unavailable' };
  }
};

// Get AI suggestions
export const getAISuggestions = async (field, context = '') => {
  try {
    return await generateAISuggestion(context?.role || 'Software Developer', field, context);
  } catch (error) {
    console.error('AI suggestions failed:', error);
    return getMockAISuggestions(field);
  }
};

export const getMockAISuggestions = (field) => {
  const mockSuggestions = {
    bio: [
      "Experienced professional with a passion for innovation and problem-solving.",
      "Results-driven expert with extensive industry experience.",
      "Creative thinker with a track record of successful projects."
    ],
    project: [
      "Developed a comprehensive solution that improved efficiency by 40%.",
      "Led a team to create innovative features that delighted users.",
      "Built scalable architecture supporting thousands of concurrent users."
    ],
    experience: [
      "Led cross-functional teams to deliver successful projects.",
      "Implemented processes that increased productivity by 30%.",
      "Mentored junior team members and fostered growth."
    ],
    music: [
      "Crafted immersive sonic experiences that connect with listeners.",
      "Produced tracks with emotional depth and technical precision.",
      "Created memorable musical moments through innovative sound design."
    ]
  };
  
  return mockSuggestions[field] || ["Strong communication skills", "Team player", "Detail-oriented"];
};

// Export for use in forms
export default {
  improveWithAI,
  enhanceTextWithAI,
  generateSectionContent,
  generateAISuggestion,
  testAIConnection,
  getAISuggestions,
  getMockAISuggestions
};