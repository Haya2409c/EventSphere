import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Har request ke sath JWT token auto-attach karega
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('eventsphere_user');
  if (saved) {
    const { token } = JSON.parse(saved);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;