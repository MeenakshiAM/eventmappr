import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true
      });
      return;
    }
    
    // In a real app, you would send the form data to a server here
    console.log('Form submitted:', formData);
    
    // Reset form and show success message
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setFormStatus({
      submitted: true,
      error: false
    });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false
      });
    }, 5000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email Us</h3>
              <p>Our friendly team is here to help.</p>
              <a href="mailto:info@eventmappr.com">info@eventmappr.com</a>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Come say hello at our office.</p>
              <address>123 Event St, San Francisco, CA 94101</address>
            </div>
            
            <div className="social-links">
              <a href="https://facebook.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                <span>Facebook</span>
              </a>
              <a href="https://twitter.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
                <span>Twitter</span>
              </a>
              <a href="https://instagram.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <span>Instagram</span>
              </a>
              <a href="https://linkedin.com/company/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            <p>Have questions or suggestions? Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="btn-submit">
                <span>Send Message</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                  {formStatus.error 
                    ? 'Please fill out all required fields.' 
                    : 'Message sent successfully! We\'ll get back to you soon.'}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 5rem 0;
          background-color: var(--background);
        }
        
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .info-card {
          background: var(--background-alt);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .info-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .info-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        
        .info-card p {
          color: var(--text-light);
          margin-bottom: 0.5rem;
        }
        
        .info-card a,
        .info-card address {
          color: var(--primary);
          font-weight: 500;
          text-decoration: none;
          font-style: normal;
        }
        
        .info-card a:hover {
          text-decoration: underline;
        }
        
        .social-links {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        
        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          background-color: var(--background-alt);
          color: var(--text);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          border: 1px solid var(--border);
        }
        
        .social-link:hover {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .contact-form-container {
          background: var(--background-alt);
          border-radius: 12px;
          padding: 2.5rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
        }
        
        .contact-form-container h2 {
          font-size: 1.8rem;
          margin-bottom: 0.75rem;
        }
        
        .contact-form-container p {
          color: var(--text-light);
          margin-bottom: 2rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.9rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s ease;
          background-color: var(--input-bg);
          color: var(--text);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
        }
        
        .btn-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.9rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
        }
        
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(var(--primary-rgb), 0.4);
        }
        
        .btn-submit svg {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }
        
        .btn-submit:hover svg {
          transform: translateX(3px);
        }
        
        .form-message {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 8px;
          font-weight: 500;
          text-align: center;
        }
        
        .form-message.success {
          background-color: rgba(72, 187, 120, 0.1);
          color: #2f855a;
          border: 1px solid rgba(72, 187, 120, 0.2);
        }
        
        .form-message.error {
          background-color: rgba(245, 101, 101, 0.1);
          color: #c53030;
          border: 1px solid rgba(245, 101, 101, 0.2);
        }
        
        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
          
          .contact-info {
            order: 2;
          }
          
          .contact-form-container {
            order: 1;
          }
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection; 