import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Check if Firebase is loaded
    const checkFirebase = () => {
      if (typeof window !== 'undefined' && window.firebase) {
        setFirebaseLoaded(true);
        return;
      }
      
      setTimeout(checkFirebase, 500);
    };
    
    checkFirebase();
    
    // Check if user is already logged in
    if (typeof window !== 'undefined' && window.firebase) {
      const unsubscribe = window.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          router.push('/');
        }
      });
      
      return () => unsubscribe();
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!firebaseLoaded) {
      setError('Authentication service not available. Please try again later.');
      setLoading(false);
      return;
    }
    
    try {
      if (isLogin) {
        // Login
        await window.firebase.auth().signInWithEmailAndPassword(
          formData.email,
          formData.password
        );
      } else {
        // Register
        const userCredential = await window.firebase.auth().createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        
        // Update profile with name
        if (userCredential.user) {
          await userCredential.user.updateProfile({
            displayName: formData.name
          });
        }
      }
      
      // Redirect to home page after successful auth
      router.push('/');
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <>
      <Head>
        <title>{isLogin ? 'Sign In' : 'Create Account'} | EventMappr</title>
      </Head>
      
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <span className="logo-icon">📍</span>
                <span className="logo-text">EventMappr</span>
              </div>
              <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Join EventMappr'}</h1>
              <p className="auth-subtitle">
                {isLogin 
                  ? 'Sign in to continue your journey with EventMappr' 
                  : 'Create an account to discover local events'}
              </p>
            </div>
            
            {error && (
              <div className="auth-error">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V9M8 11V11.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5C12 6.65685 10.6569 8 9 8C7.34315 8 6 6.65685 6 5C6 3.34315 7.34315 2 9 2C10.6569 2 12 3.34315 12 5Z" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M3 15.5C3 12.4624 5.46243 10 8.5 10H9.5C12.5376 10 15 12.4624 15 15.5" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6L8.16086 9.40891C8.67531 9.71451 9.32469 9.71451 9.83914 9.40891L16 6M3.8 15H14.2C15.1941 15 16 14.1941 16 13.2V4.8C16 3.80589 15.1941 3 14.2 3H3.8C2.80589 3 2 3.80589 2 4.8V13.2C2 14.1941 2.80589 15 3.8 15Z" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8V6C5 3.79086 6.79086 2 9 2C11.2091 2 13 3.79086 13 6V8M5 8H13M5 8H4C3.44772 8 3 8.44772 3 9V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V9C15 8.44772 14.5523 8 14 8H13M9 11V12" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4">
                        <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </form>
            
            <div className="auth-divider">
              <span>or</span>
            </div>
            
            <div className="auth-social">
              <button 
                type="button" 
                className="social-button google"
                onClick={() => {
                  if (firebaseLoaded) {
                    const provider = new window.firebase.auth.GoogleAuthProvider();
                    window.firebase.auth().signInWithPopup(provider);
                  }
                }}
                disabled={!firebaseLoaded}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
                  <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
                  <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                  <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
            
            <div className="auth-toggle">
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <button 
                    type="button" 
                    className="auth-toggle-button"
                    onClick={toggleAuthMode}
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    className="auth-toggle-button"
                    onClick={toggleAuthMode}
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, var(--background), var(--background-alt));
        }
        
        .auth-container {
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
        }
        
        .auth-card {
          background-color: var(--background);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(var(--primary-rgb), 0.08);
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .logo-icon {
          font-size: 1.8rem;
          margin-right: 0.5rem;
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, var(--primary), var(--primary-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .auth-title {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        
        .auth-subtitle {
          color: var(--text-light);
          font-size: 0.95rem;
        }
        
        .auth-error {
          background-color: rgba(244, 67, 54, 0.1);
          color: #f44336;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
        }
        
        .auth-error svg {
          margin-right: 0.5rem;
          flex-shrink: 0;
        }
        
        .auth-form {
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.25rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--text);
        }
        
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .input-wrapper svg {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }
        
        .form-group input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background-color: var(--background);
          color: var(--text);
        }
        
        .form-group input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
          outline: none;
        }
        
        .form-group input::placeholder {
          color: var(--text-light);
          opacity: 0.6;
        }
        
        .auth-button {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(var(--primary-rgb), 0.3);
        }
        
        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .loading-spinner {
          display: flex;
          align-items: center;
        }
        
        .loading-spinner svg {
          margin-right: 0.5rem;
        }
        
        .auth-divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: var(--text-light);
        }
        
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: var(--border);
        }
        
        .auth-divider span {
          padding: 0 1rem;
          font-size: 0.9rem;
        }
        
        .auth-social {
          margin-bottom: 1.5rem;
        }
        
        .social-button {
          width: 100%;
          padding: 0.8rem;
          background-color: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .social-button svg {
          margin-right: 0.8rem;
        }
        
        .social-button:hover {
          background-color: #f5f5f5;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .social-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .auth-toggle {
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-light);
        }
        
        .auth-toggle-button {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
        }
        
        .auth-toggle-button:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 576px) {
          .auth-card {
            padding: 2rem 1.5rem;
            border-radius: 12px;
          }
          
          .auth-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </>
  );
} 