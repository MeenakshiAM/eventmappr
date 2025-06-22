import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_ITEMS, ROUTES } from '../../utils/routes';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">EventMappr</h3>
            <p className="footer-description">
              Discover and share local events happening in your community. EventMappr helps you find and connect with events near you.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Site Map</h3>
            <ul className="footer-links">
              {FOOTER_NAV_ITEMS.map((item, index) => (
                <li key={index}>
                  <Link href={item.path} legacyBehavior>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li>
                <Link href="/privacy" legacyBehavior>
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms" legacyBehavior>
                  <a>Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies" legacyBehavior>
                  <a>Cookie Policy</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <a href="https://twitter.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://facebook.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://github.com/Bhavya1352/eventmappr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} EventMappr. All rights reserved.</p>
          <p>Made with ❤️ for local communities</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--background-alt);
          padding: 3rem 0 1.5rem;
          margin-top: 3rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
        }
        
        .footer-title {
          font-size: 1.2rem;
          margin-bottom: 1.25rem;
          position: relative;
        }
        
        .footer-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--primary);
        }
        
        .footer-description {
          font-size: 0.9rem;
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
        }
        
        .footer-links li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a {
          color: var(--text-light);
          font-size: 0.9rem;
          transition: color 0.2s ease;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--background);
          color: var(--text-light);
          transition: all 0.2s ease;
        }
        
        .social-links a:hover {
          background-color: var(--primary);
          color: white;
        }
        
        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-light);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 