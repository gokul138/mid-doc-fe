// axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://docgeniee.org/mid-doc/doc-genie',
  withCredentials: true, // Allow sending cookies with cross-origin requests
});

// Add interceptor to inject token into request headers
axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
});

export default axiosInstance;
