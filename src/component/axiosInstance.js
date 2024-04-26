import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://docgeniee.org/mid-doc/',
  withCredentials: true, // Allow sending cookies with cross-origin requests
});


export default axiosInstance;
