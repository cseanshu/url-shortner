import axios from 'axios';
import config from '../../config';
const API_BASE_URL = config.SERVER_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = async () => {
  const response = await api.get('/healthz');
  return response.data;
};

// Create a new short link
export const createLink = async (targetUrl, customCode = '') => {
  const payload = { targetUrl };
  if (customCode) {
    payload.customCode = customCode;
  }
  const response = await api.post('/api/links', payload);
  return response.data;
};

// Get all links
export const getAllLinks = async (search = '') => {
  const params = search ? { search } : {};
  const response = await api.get('/api/links', { params });
  return response.data;
};

// Get stats for a specific link
export const getLinkStats = async (code) => {
  const response = await api.get(`/api/links/${code}`);
  return response.data;
};

// Delete a link
export const deleteLink = async (code) => {
  const response = await api.delete(`/api/links/${code}`);
  return response.data;
};

export default api;
