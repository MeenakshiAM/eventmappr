import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { initializeFirebase } from '../utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Dynamically import MapExplorer with no SSR to avoid leaflet issues
const MapExplorer = dynamic(() => import('../components/map/MapExplorer'), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
});

export default function MapPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase first
    const app = initializeFirebase();
    
    if (app) {
      try {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting up auth:", error);
        setLoading(false);
      }
    } else {
      // Firebase not configured, continue without auth
      console.log("Running without Firebase authentication");
      setLoading(false);
    }
  }, []);

  // Load events from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('eventmappr-events');
      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents));
        } catch (error) {
          console.error('Error loading events:', error);
        }
      }
    }
  }, []);

  const handleEventAdded = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventmappr-events', JSON.stringify(updatedEvents));
    }
  };

  const handleEventDeleted = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventmappr-events', JSON.stringify(updatedEvents));
    }
  };

  return (
    <>
      <Head>
        <title>Interactive Map | EventMappr</title>
        <meta name="description" content="Explore local events happening around you on an interactive map." />
      </Head>
      
      <div className="map-page">
        <div className="map-header">
          <div className="container">
            <h1>Event Map</h1>
            <p>Discover and explore events happening in your community</p>
          </div>
        </div>
        
        <div className="map-container">
          {!loading && (
            <MapExplorer 
              events={events}
              onEventAdded={handleEventAdded}
              onEventDeleted={handleEventDeleted}
              isAuthenticated={!!user}
            />
          )}
        </div>
      </div>
      
      <style jsx>{`
        .map-page {
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 60px);
        }
        
        .map-header {
          padding: 2rem 0;
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          text-align: center;
          color: white;
        }
        
        .map-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .map-header p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        .map-container {
          flex: 1;
          width: 100%;
          height: calc(100vh - 180px);
          min-height: 500px;
          position: relative;
        }
        
        .map-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 1.2rem;
          color: var(--text-light);
        }
        
        @media (max-width: 768px) {
          .map-header {
            padding: 1.5rem 0;
          }
          
          .map-header h1 {
            font-size: 2rem;
          }
          
          .map-container {
            height: calc(100vh - 150px);
          }
        }
      `}</style>
    </>
  );
} 