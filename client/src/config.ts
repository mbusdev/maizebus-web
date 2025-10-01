const isDevelopment = import.meta.env.DEV;
const apiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : apiUrl || 'https://your-ec2-ip.com'; // Replace with your actual EC2 domain/IP

export const API_ENDPOINTS = {
  JOIN: `${API_BASE_URL}/api/join`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/health`,
} as const;