import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://docgeniee.org/mid-doc/',
});


export default axiosInstance;
