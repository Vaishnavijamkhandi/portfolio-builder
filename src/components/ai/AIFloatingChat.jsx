import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './AIFloatingChat.css';

const AIFloatingChat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [conversationStep, setConversationStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    profession: '',
    experience: '',
    education: '',
    field: '',
    skills: [],
    email: '',
    phone: '',
    location: '',
    summary: ''
  });
  const chatEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "👋 Hi! I'm your AI Portfolio Assistant. I'll help you create a custom portfolio by asking a few questions.",
          from: 'bot',
          time: new Date()
        },
        {
          id: 2,
          text: "What's your full name?",
          from: 'bot',
          time: new Date()
        }
      ]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const questions = [
    { field: 'name', question: "What's your full name?", placeholder: "John Doe" },
    { field: 'profession', question: "What's your profession?", placeholder: "Software Developer, Designer, etc." },
    { field: 'experience', question: "How many years of experience do you have?", placeholder: "e.g., 3 years" },
    { field: 'education', question: "What's your educational background?", placeholder: "e.g., Bachelor's in Computer Science" },
    { field: 'field', question: "What field are you in?", placeholder: "e.g., Technology, Design, Marketing" },
    { field: 'skills', question: "What are your top skills? (comma separated)", placeholder: "React, UI/UX, Project Management" },
    { field: 'email', question: "What's your email for contact?", placeholder: "hello@example.com" },
    { field: 'phone', question: "What's your phone number? (optional)", placeholder: "+1 234 567 8900" },
    { field: 'location', question: "Where are you located?", placeholder: "New York, NY" },
    { field: 'summary', question: "Tell me about yourself in one sentence", placeholder: "Passionate developer with 5 years of experience..." }
  ];

  const quickReplies = {
    name: ["John Doe", "Jane Smith", "Alex Johnson"],
    profession: ["Software Developer", "UI/UX Designer", "Data Scientist", "Digital Marketer", "Business Analyst", "Student", "Freelancer"],
    experience: ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
    education: ["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Self-taught"],
    field: ["Technology", "Design", "Business", "Marketing", "Education", "Healthcare"]
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, {
      id: messages.length + 1,
      text: userInput,
      from: 'user',
      time: new Date()
    }];

    // Update user data
    const currentField = questions[conversationStep]?.field;
    if (currentField) {
      setUserData(prev => ({
        ...prev,
        [currentField]: currentField === 'skills' 
          ? userInput.split(',').map(s => s.trim())
          : userInput
      }));
    }

    setMessages(newMessages);
    setUserInput('');

    // Bot responds after delay
    setTimeout(() => {
      if (conversationStep < questions.length - 1) {
        // Ask next question
        setConversationStep(prev => prev + 1);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: questions[conversationStep + 1].question,
          from: 'bot',
          time: new Date()
        }]);
      } else {
        // All questions answered
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "🎉 Perfect! I have all the information I need. Would you like me to create a custom portfolio form with your details?",
          from: 'bot',
          time: new Date()
        }]);
        
        // Show final action buttons as a separate bot message
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          text: "Choose an option below:",
          from: 'bot',
          time: new Date(),
          showActions: true,
          actions: [
            { label: "Yes, create my portfolio!", action: "create" },
            { label: "Start over", action: "restart" },
            { label: "Just save info", action: "save" }
          ]
        }]);
      }
    }, 500);
  };

  const handleQuickReply = (reply) => {
    setUserInput(reply);
  };

  const handleAction = (action) => {
    switch(action) {
      case 'create':
        // Save data to localStorage and navigate to Template 7 form
        const portfolioData = {
          ...userData,
          id: `ai-generated-${Date.now()}`,
          templateId: 7,
          timestamp: new Date().toISOString(),
          generatedByAI: true
        };
        
        localStorage.setItem('aiPortfolioData', JSON.stringify(portfolioData));
        localStorage.setItem('editingPortfolioData', JSON.stringify(portfolioData));
        
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "✅ Great! Taking you to the portfolio builder with your details pre-filled...",
          from: 'bot',
          time: new Date()
        }]);
        
        setTimeout(() => {
          navigate('/builder/7');
        }, 1500);
        break;
        
      case 'restart':
        setMessages([
          {
            id: 1,
            text: "🔄 Let's start over! What's your full name?",
            from: 'bot',
            time: new Date()
          }
        ]);
        setConversationStep(0);
        setUserData({
          name: '',
          profession: '',
          experience: '',
          education: '',
          field: '',
          skills: [],
          email: '',
          phone: '',
          location: '',
          summary: ''
        });
        break;
        
      case 'save':
        // Just save data for later
        localStorage.setItem('aiPortfolioData', JSON.stringify(userData));
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "✅ Your information has been saved. You can access it anytime from this chat!",
          from: 'bot',
          time: new Date()
        }]);
        break;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`ai-chat-button ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        <FaRobot />
        {!isOpen && <span className="pulse-dot"></span>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`ai-chat-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="header-left">
              <FaRobot className="header-icon" />
              <div className="header-info">
                <h4>AI Portfolio Assistant</h4>
                <span className="status online">● Online</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="icon-btn" onClick={minimizeChat} title={isMinimized ? 'Maximize' : 'Minimize'}>
                {isMinimized ? '+' : '−'}
              </button>
              <button className="icon-btn close-btn" onClick={toggleChat} title="Close">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Chat Body - Only show if not minimized */}
          {!isMinimized && (
            <>
              <div className="chat-body">
                <div className="welcome-note">
                  <p><strong>Need help?</strong> I'll ask questions and create a custom portfolio for you!</p>
                </div>
                
                <div className="messages-container">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.from}`}>
                      {msg.from === 'bot' && <FaRobot className="message-icon" />}
                      
                      <div className="message-content">
                        <div className="message-text">
                          {msg.text}
                        </div>
                        
                        {/* Quick Replies - ONLY show for question messages (not greeting) */}
                        {msg.from === 'bot' && 
                         msg.id > 1 && // Exclude the first greeting message (id: 1)
                         !msg.showActions &&
                         quickReplies[questions[conversationStep]?.field] && (
                          <div className="quick-replies">
                            {quickReplies[questions[conversationStep]?.field].map((reply, idx) => (
                              <button
                                key={idx}
                                className="quick-reply-btn"
                                onClick={() => handleQuickReply(reply)}
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Action Buttons - ONLY show when showActions is true */}
                        {msg.from === 'bot' && msg.showActions && msg.actions && (
                          <div className="action-buttons">
                            {msg.actions.map((action, idx) => (
                              <button
                                key={idx}
                                className={`action-btn ${action.action}`}
                                onClick={() => handleAction(action.action)}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="message-time">
                          {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="chat-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your answer here..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  disabled={conversationStep >= questions.length}
                />
                <button 
                  className="send-btn" 
                  onClick={handleSend}
                  disabled={!userInput.trim() || conversationStep >= questions.length}
                >
                  <FaPaperPlane />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="chat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((conversationStep + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  Question {Math.min(conversationStep + 1, questions.length)} of {questions.length}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIFloatingChat;