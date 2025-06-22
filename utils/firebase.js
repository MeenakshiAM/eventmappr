import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let app;

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
export const initializeFirebase = () => {
  try {
    if (!app) {
      // Check if we have valid configuration
      const hasValidConfig = firebaseConfig.apiKey && 
                            firebaseConfig.apiKey !== "demo-api-key" &&
                            firebaseConfig.projectId && 
                            firebaseConfig.projectId !== "demo-project";
      
      if (!hasValidConfig) {
        console.warn('Firebase not configured. Using demo mode.');
        return null;
      }
      
      app = initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    }
    return app;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return null;
  }
};

// Get Firebase Auth instance
export const getFirebaseAuth = () => {
  if (!app) {
    initializeFirebase();
  }
  return getAuth(app);
};

// Get Firestore instance
export const getFirebaseFirestore = () => {
  if (!app) {
    initializeFirebase();
  }
  return getFirestore(app);
};

// Add more Firebase utility functions as needed 