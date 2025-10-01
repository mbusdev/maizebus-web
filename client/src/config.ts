const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : '';

export const API_ENDPOINTS = {
  JOIN: `${API_BASE_URL}/api/join`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
} as const;