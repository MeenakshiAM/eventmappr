import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <i className="fas fa-map-marker-alt"></i>
        <span>EventMappr</span>
      </div>
      <div className={`nav-links ${showMenu ? 'show' : ''}`}>
        <Link to="/" className="active">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/gallery" className="nav-link gallery-link">
          <i className="fas fa-camera"></i> Gallery
        </Link>
        <Link to="/weather" className="nav-link weather-link">
          <i className="fas fa-calendar-alt"></i> Weather Planner
        </Link>
        <Link to="/badge" className="badge-btn">Generate Badge</Link>
        <Link to="/add-event" className="add-event-btn">Add Event</Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
};

export default Navbar; 