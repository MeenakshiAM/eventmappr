/**
 * Application routes configuration
 * This file defines all the routes used in the application
 */

// Main routes
export const ROUTES = {
  HOME: '/',
  MAP: '/explore',
  CONTACT: '/contact',
  ABOUT: '/about',
  AUTH: '/auth',
  PROFILE: '/profile',
  EVENT: '/event/:id',
  NOT_FOUND: '/404',
};

// Utility function to generate route with parameters
export const generateRoute = (route, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  );
};

// Navigation items for the navbar
export const NAV_ITEMS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Map', path: ROUTES.MAP },
  { name: 'Contact', path: ROUTES.CONTACT },
  { name: 'About', path: ROUTES.ABOUT },
];

// Footer navigation items
export const FOOTER_NAV_ITEMS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Map', path: ROUTES.MAP },
  { name: 'Contact', path: ROUTES.CONTACT },
  { name: 'About', path: ROUTES.ABOUT },
  { name: 'Sign In', path: ROUTES.AUTH },
];

// Event categories
export const EVENT_CATEGORIES = [
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'volunteer', name: 'Volunteering', icon: '🤝' },
  { id: 'market', name: 'Market', icon: '🛍️' },
  { id: 'art', name: 'Art', icon: '🎨' },
];

export default ROUTES; 