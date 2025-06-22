import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🗺️',
      title: 'Interactive Map',
      description: 'Explore events visually on an interactive map. See what\'s happening near you at a glance.'
    },
    {
      icon: '📍',
      title: 'Find Nearby',
      description: 'Quickly center the map on your location to discover events happening around you.'
    },
    {
      icon: '🏷️',
      title: 'Categories',
      description: 'Filter events by category to find exactly what you\'re looking for - music, tech, art, and more.'
    },
    {
      icon: '📅',
      title: 'Date & Time',
      description: 'Each event includes detailed date and time information so you never miss out.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Access EventMappr from any device - desktop, tablet, or mobile phone.'
    },
    {
      icon: '🌐',
      title: 'Community Driven',
      description: 'Built for and by the community. Add your own events and help grow the local scene.'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <p className="section-subtitle">
          Discover what makes EventMappr the perfect platform for your local events
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              className="feature-card" 
              key={index}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 8rem 0 5rem;
          position: relative;
          overflow: visible;
          background-color: var(--background);
          z-index: 1;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 1rem;
          font-size: 2.2rem;
          position: relative;
          color: var(--text);
        }
        
        .section-title:after {
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
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          position: relative;
          z-index: 5;
        }
        
        .feature-card {
          background-color: var(--background);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 10;
          overflow: hidden;
          border: 1px solid rgba(var(--primary-rgb), 0.05);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(var(--primary-rgb), 0.08) 0%, rgba(var(--primary-rgb), 0) 70%);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(var(--primary-rgb), 0.1);
        }
        
        .feature-card:hover::before {
          opacity: 1;
        }
        
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.2) 100%);
          margin-bottom: 1.5rem;
          position: relative;
          transition: all 0.4s ease;
        }
        
        .feature-icon-wrapper::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border-radius: 50%;
          border: 2px solid rgba(var(--primary-rgb), 0.3);
          opacity: 0;
          transition: all 0.4s ease;
        }
        
        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1);
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.2) 0%, rgba(var(--primary-rgb), 0.3) 100%);
          box-shadow: 0 10px 25px rgba(var(--primary-rgb), 0.3);
        }
        
        .feature-card:hover .feature-icon-wrapper::before {
          opacity: 1;
          animation: pulse 1.5s infinite;
        }
        
        .feature-icon {
          font-size: 2.5rem;
          transition: transform 0.4s ease;
          filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.1));
        }
        
        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }
        
        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--text);
          transition: color 0.3s ease;
        }
        
        .feature-card:hover .feature-title {
          color: var(--primary);
        }
        
        .feature-description {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
        
        @media (max-width: 768px) {
          .features-section {
            padding: 6rem 0 4rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection; 