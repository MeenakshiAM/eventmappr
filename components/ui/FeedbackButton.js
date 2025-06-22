import { useState, useEffect } from 'react';

const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form and status after closing
    setFormData({
      name: '',
      email: '',
      type: '',
      message: '',
      time: ''
    });
    setSubmitStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add current time
    const updatedFormData = {
      ...formData,
      time: new Date().toISOString()
    };
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real app, you would send this data to your server or API
      console.log('Feedback submitted:', updatedFormData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      
      // Close modal after success
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isModalOpen && e.target.classList.contains('feedback-modal-backdrop')) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <button id="feedbackBtn" title="Send Feedback" onClick={openModal}>💬</button>
      
      {isModalOpen && (
        <div className="feedback-modal-backdrop" id="feedbackModal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📝 Send Feedback</h2>
            
            {submitStatus === 'success' ? (
              <div className="success-message">
                <p>Thank you for your feedback! We appreciate your input.</p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="error-message">
                <p>There was an error submitting your feedback. Please try again.</p>
              </div>
            ) : (
              <form id="feedbackForm" onSubmit={handleSubmit}>
                <label htmlFor="feedbackName">Name: <span style={{ color: '#e74c3c' }}>*</span></label>
                <input 
                  type="text" 
                  id="feedbackName" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />

                <label htmlFor="feedbackEmail">Email: <span style={{ color: '#e74c3c' }}>*</span></label>
                <input 
                  type="email" 
                  id="feedbackEmail" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />

                <label htmlFor="feedbackType">Type of Feedback: <span style={{ color: '#e74c3c' }}>*</span></label>
                <select 
                  id="feedbackType" 
                  name="type" 
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select feedback type</option>
                  <option value="Bug Report">🐛 Bug Report</option>
                  <option value="Feature Request">💡 Feature Request</option>
                  <option value="General Feedback">💬 General Feedback</option>
                  <option value="UI/UX Improvement">🎨 UI/UX Improvement</option>
                  <option value="Performance Issue">⚡ Performance Issue</option>
                  <option value="Compliment">👏 Compliment</option>
                  <option value="Other">📝 Other</option>
                </select>

                <label htmlFor="feedbackText">Your Feedback: <span style={{ color: '#e74c3c' }}>*</span></label>
                <textarea 
                  id="feedbackText" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton; 