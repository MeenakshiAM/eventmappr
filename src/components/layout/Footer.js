import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <i className="fas fa-map-marker-alt"></i>
          <span>EventMappr</span>
        </div>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/community">Community Forum</Link>
          <Link to="/gallery">
            <i className="fas fa-camera" style={{ marginRight: '6px', color: '#38BDF8' }}></i> Gallery
          </Link>
          <Link to="/weather">
            <i className="fas fa-calendar-alt" style={{ marginRight: '6px', color: '#f1c40f' }}></i> Weather Planner
          </Link>
        </div>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} EventMappr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 