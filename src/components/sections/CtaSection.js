import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="cta-section">
      <h2>Ready to Explore Your Community?</h2>
      <p>Join EventMappr today and discover what's happening around you</p>
      <Link to="/explore" className="cta-button">Get Started</Link>
    </section>
  );
};

export default CtaSection; 