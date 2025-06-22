import React from 'react';
import Head from 'next/head';
import ContactSection from '../components/sections/ContactSection';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | EventMappr</title>
        <meta name="description" content="Get in touch with the EventMappr team. We'd love to hear from you!" />
      </Head>
      
      <div className="contact-page">
        <div className="contact-header">
          <div className="container">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Reach out with any questions, feedback, or partnership opportunities.</p>
          </div>
        </div>
        
        <ContactSection />
      </div>
      
      <style jsx>{`
        .contact-page {
          min-height: calc(100vh - 400px); /* Adjust for footer height */
        }
        
        .contact-header {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          padding: 8rem 0 4rem;
          text-align: center;
        }
        
        .contact-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .contact-header p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
      `}</style>
    </>
  );
};

export default ContactPage; 