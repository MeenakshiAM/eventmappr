import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ROUTES } from '../utils/routes';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | EventMappr</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>

      <div className="error-page">
        <div className="error-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
          <div className="error-actions">
            <Link href={ROUTES.HOME} legacyBehavior>
              <a className="btn-primary">Go Home</a>
            </Link>
            <Link href={ROUTES.MAP} legacyBehavior>
              <a className="btn-outline">Explore Events</a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 200px);
          padding: 2rem;
          text-align: center;
        }
        
        .error-content {
          max-width: 500px;
        }
        
        h1 {
          font-size: 6rem;
          margin: 0;
          color: var(--primary);
          line-height: 1;
        }
        
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        
        p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: var(--text-light);
        }
        
        .error-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .btn-primary, .btn-outline {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        
        .btn-primary {
          background-color: var(--primary);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: var(--primary-dark);
        }
        
        .btn-outline {
          border: 1px solid var(--primary);
          color: var(--primary);
        }
        
        .btn-outline:hover {
          background-color: var(--primary);
          color: white;
        }
        
        @media (max-width: 480px) {
          h1 {
            font-size: 4rem;
          }
          
          h2 {
            font-size: 1.5rem;
          }
          
          .error-actions {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </>
  );
} 