import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import './App.css';
import DeploymentGuide from './components/builder/DeploymentGuide';
import Template7Form from './components/builder/TemplateForms/Template7Form';
import Preview7 from './components/preview/Preview7';

// Import all components
import LoginSignup from './components/auth/LoginSignup';
import ExampleDashboard from './components/dashboard/ExampleDashboard';
import DeploymentsDashboard from './components/dashboard/DeploymentsDashboard';
import Preview from './components/preview/Preview';
import CustomizeForm from './components/builder/CustomizeForm';
import SimpleBuilder from './components/builder/SimpleBuilder';
import TemplateViewer from './components/templates/TemplateViewer';

// Import ALL 6 Template Forms
import Template1Form from './components/builder/TemplateForms/Template1Form';
import Template2Form from './components/builder/TemplateForms/Template2Form';
import Template3Form from './components/builder/TemplateForms/Template3Form';
import Template4Form from './components/builder/TemplateForms/Template4Form';
import Template5Form from './components/builder/TemplateForms/Template5Form';
import Template6Form from './components/builder/TemplateForms/Template6Form';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 App.js - Setting up auth listener");
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 Auth state changed - User:", user ? "Logged in" : "No user");
      console.log("🔐 User UID:", user?.uid);
      console.log("🔐 User email:", user?.email);
      setIsAuthenticated(!!user);
      setLoading(false);
    }, (error) => {
      console.error("🔐 Auth state error:", error);
      setLoading(false);
    });

    return () => {
      console.log("🔐 App.js - Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  console.log("🚀 App.js rendering - isAuthenticated:", isAuthenticated, "Loading:", loading);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - NO authentication required */}
          <Route path="/" element={<LoginSignup />} />
          <Route path="/preview" element={<Navigate to="/preview/1" />} /> {/* Added */}
          <Route path="/preview/:templateId" element={<Preview />} />
          <Route path="/preview/7" element={<Preview />} />
          <Route path="/preview7" element={<Preview7 />} /> {/* Public */}
          <Route path="/template/:templateId" element={<TemplateViewer />} />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <ExampleDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/deployments" 
            element={isAuthenticated ? <DeploymentsDashboard /> : <Navigate to="/" />} 
          />
          
          {/* ALL 7 Template Form Routes - Protected */}
          <Route 
            path="/builder/1" 
            element={isAuthenticated ? <Template1Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/2" 
            element={isAuthenticated ? <Template2Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/3" 
            element={isAuthenticated ? <Template3Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/4" 
            element={isAuthenticated ? <Template4Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/5" 
            element={isAuthenticated ? <Template5Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/6" 
            element={isAuthenticated ? <Template6Form /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder/7" 
            element={isAuthenticated ? <Template7Form /> : <Navigate to="/" />} 
          />
          
          {/* Other builder routes - Protected */}
          <Route 
            path="/customize/:templateId" 
            element={isAuthenticated ? <SimpleBuilder /> : <Navigate to="/" />} 
          />
          <Route 
            path="/builder-form/:templateId" 
            element={isAuthenticated ? <CustomizeForm /> : <Navigate to="/" />} 
          />
          <Route 
            path="/deploy-guide" 
            element={isAuthenticated ? <DeploymentGuide /> : <Navigate to="/" />} 
          />
          
          {/* Test route for debugging */}
          <Route 
            path="/test-public" 
            element={<div><h1>Public Test Page - No Auth Required</h1></div>} 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;