import axios from 'axios';
const api=axios.create({
    baseURL:'http://localhost:3000/',
     headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use(
  (config) => {
    // Modify config before the request is sent (e.g., add auth token)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
export default api;