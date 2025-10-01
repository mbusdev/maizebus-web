// API Configuration
const isDevelopment = import.meta.env.DEV;

// Base URL for API calls
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'  // Development: direct to server
  : '';  // Production: same origin as client (Vercel)

// API Endpoints
export const API_ENDPOINTS = {
  JOIN: `${API_BASE_URL}/api/join`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
} as const;