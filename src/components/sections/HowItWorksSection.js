import React, { useEffect } from 'react';

const HowItWorksSection = () => {
  useEffect(() => {
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.step');
      
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
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Find Your Location</h3>
          <p>Allow geolocation or search for your city on the map</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Discover Events</h3>
          <p>Browse through pins or filter by categories</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Add Your Own</h3>
          <p>Click on the map to add community events</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 