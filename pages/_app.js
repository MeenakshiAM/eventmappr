import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { initializeFirebase } from '../utils/firebase';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  // Initialize Firebase on app load
  useEffect(() => {
    setMounted(true);
    initializeFirebase();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use dark theme if user prefers dark mode
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    
    // Listen for changes in system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      // Only apply if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Next.js already handles routing, so we'll use our router utilities
  // instead of wrapping with BrowserRouter
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 