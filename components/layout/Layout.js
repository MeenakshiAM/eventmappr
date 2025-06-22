import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from '../ChatBot';
import Head from 'next/head';

const Layout = ({ children }) => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    // Get the height of the navbar for proper spacing
    const updateNavHeight = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    // Initial measurement
    updateNavHeight();

    // Update on resize
    window.addEventListener('resize', updateNavHeight);

    // Update when scrolling (in case navbar changes height)
    window.addEventListener('scroll', updateNavHeight);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      window.removeEventListener('scroll', updateNavHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>EventMappr - Discover Local Events</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layout">
        <Navbar />
        <main className="main-content" style={{ paddingTop: `${navHeight}px` }}>
          {children}
        </main>
        <Footer />
        <ChatBot />
      </div>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-content {
          flex: 1;
          transition: padding-top 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Layout; 