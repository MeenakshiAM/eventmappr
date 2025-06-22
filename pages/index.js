import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import FAQSection from '../components/sections/FAQSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>EventMappr - Discover Local Events on the Map</title>
        <meta name="description" content="EventMappr helps you discover and share local events happening in your community. Explore events on an interactive map." />
      </Head>

      <HeroSection />
      
      <FeaturesSection />
      
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">EventMappr makes it easy to discover and share local events in just a few steps</p>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-number">
                <span>1</span>
              </div>
              <h3>Explore the Map</h3>
              <p>Browse our interactive map to discover events happening near you. Filter by category to find exactly what you're looking for.</p>
            </div>
            
            <div className="step">
              <div className="step-number">
                <span>2</span>
              </div>
              <h3>Add an Event</h3>
              <p>Hosting something? Simply click on the map to add your event details. Share with the community in seconds.</p>
            </div>
            
            <div className="step">
              <div className="step-number">
                <span>3</span>
              </div>
              <h3>Connect with Attendees</h3>
              <p>Find events you're interested in, connect with organizers, and meet new people in your community.</p>
            </div>
          </div>
        </div>
      </section>
      
      <FAQSection />
      
      <style jsx>{`
        .how-it-works {
          padding: 8rem 0 5rem;
          background-color: var(--background-alt);
          position: relative;
          z-index: 1;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 2.2rem;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          border-radius: 2px;
        }
        
        .section-subtitle {
          text-align: center;
          max-width: 700px;
          margin: 1.5rem auto 3rem;
          color: var(--text-light);
        }
        
        .steps-container {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 3rem;
          position: relative;
          z-index: 5;
        }
        
        .step {
          flex: 1;
          background-color: var(--background);
          padding: 2.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px var(--shadow);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          z-index: 1;
          overflow: hidden;
          border: 1px solid rgba(var(--primary-rgb), 0.05);
        }
        
        .step::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0) 70%);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }
        
        .step:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px var(--shadow-hover);
        }
        
        .step:hover::before {
          opacity: 1;
        }
        
        .step-number {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 20px rgba(var(--primary-rgb), 0.3);
          position: relative;
          z-index: 1;
        }
        
        .step-number::after {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          border: 2px dashed rgba(var(--primary-rgb), 0.5);
          animation: spin 20s linear infinite;
        }
        
        .step h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          color: var(--text);
        }
        
        .step p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .steps-container {
            flex-direction: column;
          }
          
          .step {
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
} 