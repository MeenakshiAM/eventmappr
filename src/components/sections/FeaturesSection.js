import React, { useEffect } from 'react';

const FeaturesSection = () => {
  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.feature-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <section className="features" id="features">
      <h2>Core Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-map-pin"></i>
          </div>
          <h3>Add Custom Events</h3>
          <p>Click anywhere on the map to add your community events</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-filter"></i>
          </div>
          <h3>Filter by Categories</h3>
          <p>Find Music, Tech, Volunteering, Market, and Art events</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-location-arrow"></i>
          </div>
          <h3>Geolocation</h3>
          <p>Discover events happening near your current location</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-laptop"></i>
          </div>
          <h3>Responsive UI</h3>
          <p>Enjoy a seamless experience on any device</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 