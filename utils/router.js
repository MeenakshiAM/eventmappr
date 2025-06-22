import { useRouter } from 'next/router';
import { useEffect } from 'react';

// This is a utility file that provides compatibility functions
// to use react-router-dom style hooks with Next.js

/**
 * Hook that mimics react-router-dom's useNavigate
 * @returns {Function} navigate function
 */
export function useNavigate() {
  const router = useRouter();
  
  return (path, options = {}) => {
    if (options.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };
}

/**
 * Hook that mimics react-router-dom's useLocation
 * @returns {Object} location object
 */
export function useLocation() {
  const router = useRouter();
  
  return {
    pathname: router.pathname,
    search: router.asPath.includes('?') ? router.asPath.substring(router.asPath.indexOf('?')) : '',
    hash: router.asPath.includes('#') ? router.asPath.substring(router.asPath.indexOf('#')) : '',
    state: router.query
  };
}

/**
 * Component that mimics react-router-dom's Navigate
 */
export function Navigate({ to, replace }) {
  const router = useRouter();
  
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, router]);
  
  return null;
}

/**
 * Function that mimics react-router-dom's generatePath
 * @param {String} path - The path pattern
 * @param {Object} params - The params to replace in the path
 * @returns {String} The generated path
 */
export function generatePath(path, params = {}) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );
}

/**
 * Utility function to convert Next.js query params to react-router-dom params
 * @param {Object} query - Next.js query object
 * @returns {Object} react-router-dom params object
 */
export function queryToParams(query) {
  return { ...query };
}

/**
 * Utility function to convert Next.js dynamic route to react-router-dom route
 * @param {String} nextRoute - Next.js route (e.g., '/events/[id]')
 * @returns {String} react-router-dom route (e.g., '/events/:id')
 */
export function nextRouteToReactRoute(nextRoute) {
  return nextRoute.replace(/\[([^\]]+)\]/g, ':$1');
} 