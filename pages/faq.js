import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import FAQSection from '../components/sections/FAQSection';

const FAQPage = () => {
  return (
    <>
      <Head>
        <title>Frequently Asked Questions | EventMappr</title>
        <meta name="description" content="Find answers to common questions about EventMappr - the community event discovery platform." />
      </Head>
      
      <Layout>
        <div className="faq-page">
          <div className="faq-header">
            <div className="container">
              <h1>Frequently Asked Questions</h1>
              <p>Find answers to the most common questions about using EventMappr</p>
            </div>
          </div>
          
          <div className="container">
            <FAQSection />
          </div>
        </div>
      </Layout>
      
      <style jsx>{`
        .faq-page {
          min-height: 100vh;
        }
        
        .faq-header {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          padding: 8rem 0 4rem;
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .faq-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .faq-header p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        @media (max-width: 768px) {
          .faq-header {
            padding: 6rem 0 3rem;
          }
          
          .faq-header h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default FAQPage; 