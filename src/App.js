import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import './App.css';

// Import components
import LoginSignup from './components/auth/LoginSignup';
import ExampleDashboard from './components/dashboard/ExampleDashboard';
import DeploymentsDashboard from './components/dashboard/DeploymentsDashboard';
import Preview from './components/preview/Preview';

// ADD THESE IMPORTs for Template Forms
import Template1Form from './components/builder/TemplateForms/Template1Form';
import Template2Form from './components/builder/TemplateForms/Template2Form';
import Template3Form from './components/builder/TemplateForms/Template3Form';
import Template4Form from './components/builder/TemplateForms/Template4Form';
import Template5Form from './components/builder/TemplateForms/Template5Form';
import Template6Form from './components/builder/TemplateForms/Template6Form';
import Template7Form from './components/builder/TemplateForms/Template7Form';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 App.js - Setting up auth listener");
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔐 Auth state changed:", user ? `Logged in as ${user.email}` : "No user");
      console.log("🔐 auth.currentUser:", auth.currentUser?.email);
      
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => {
      console.log("🔐 App.js - Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  console.log("🚀 App rendering - Auth:", isAuthenticated, "User:", auth.currentUser?.email);

  // Create ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    const user = auth.currentUser;
    console.log("🛡️ ProtectedRoute check - User:", user?.email);
    
    if (!user) {
      console.log("🛡️ No user, redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* =================== */}
        {/* PUBLIC ROUTES - No authentication required */}
        {/* =================== */}
        
        {/* Login/Signup - ALWAYS PUBLIC */}
        <Route path="/" element={<LoginSignup />} />
        
        {/* Preview Routes - MUST BE PUBLIC (no ProtectedRoute) */}
        <Route path="/preview" element={<Navigate to="/preview/1" />} />
        <Route path="/preview/:templateId" element={<Preview />} />
        <Route path="/preview7" element={<Preview />} />
        
        {/* =================== */}
        {/* PROTECTED ROUTES - Require authentication */}
        {/* =================== */}
        
        {/* Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <ExampleDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Downloads */}
        <Route 
          path="/deployments" 
          element={
            <ProtectedRoute>
              <DeploymentsDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Template Builder Forms - PROTECTED */}
        <Route 
          path="/builder/1" 
          element={
            <ProtectedRoute>
              <Template1Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/2" 
          element={
            <ProtectedRoute>
              <Template2Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/3" 
          element={
            <ProtectedRoute>
              <Template3Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/4" 
          element={
            <ProtectedRoute>
              <Template4Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/5" 
          element={
            <ProtectedRoute>
              <Template5Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/6" 
          element={
            <ProtectedRoute>
              <Template6Form />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/7" 
          element={
            <ProtectedRoute>
              <Template7Form />
            </ProtectedRoute>
          } 
        />
        
        {/* =================== */}
        {/* CATCH-ALL ROUTE */}
        {/* =================== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;