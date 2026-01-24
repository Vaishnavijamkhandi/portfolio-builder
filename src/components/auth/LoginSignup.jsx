// src/components/auth/LoginSignup.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import '../../styles/auth/LoginSignup.css';

const LoginSignup = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // ADD THIS
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [animateInputs, setAnimateInputs] = useState(false);

  useEffect(() => {
    setAnimateInputs(false);

    const timer = setTimeout(() => {
      setAnimateInputs(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isSignup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(userCredential.user, {
          displayName: `${formData.name} ${formData.surname}`,
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
      
      // NAVIGATE TO DASHBOARD AFTER SUCCESS
      navigate('/dashboard');
      
      if (onLoginSuccess && typeof onLoginSuccess === "function") {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
      console.error("Authentication error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignup ? "signup-mode" : ""}`}>
        <div className="auth-left">
          <span className="badge">✨ AI-Powered Portfolio Builder</span>

          <h1>
            Build Your Professional <br />
            <span className="highlight">Portfolio in Minutes</span>
          </h1>

          <p className="subtitle">
            Create stunning, job-ready portfolios with AI-powered content
            suggestions. Stand out from the crowd and land your dream job.
          </p>

          <p className="quote">
            "Your skills deserve to be seen. We help students showcase them beautifully."
          </p>
        </div>

        <div className="auth-right">
          <h2>{isSignup ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div 
                  className={`input-group animation ${animateInputs ? "active" : ""}`} 
                  style={{ "--i": 1 }}
                >
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="First Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div 
                  className={`input-group animation ${animateInputs ? "active" : ""}`} 
                  style={{ "--i": 2 }}
                >
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="surname"
                    placeholder="Last Name"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div 
              className={`input-group animation ${animateInputs ? "active" : ""}`} 
              style={{ "--i": isSignup ? 3 : 1 }}
            >
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div 
              className={`input-group animation ${animateInputs ? "active" : ""}`} 
              style={{ "--i": isSignup ? 4 : 2 }}
            >
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className={`animation ${animateInputs ? "active" : ""}`}
              style={{ "--i": isSignup ? 5 : 3 }}
              type="submit"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
          <p
            className={`animation ${animateInputs ? "active" : ""}`}
            style={{ "--i": isSignup ? 6 : 4 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;