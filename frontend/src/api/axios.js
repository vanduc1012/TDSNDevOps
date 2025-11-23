import axios from 'axios';

// Backend URL - có thể thay đổi qua environment variable
// Mặc định thử port 8081 trước (vì thường backend tự động chuyển sang 8081 nếu 8080 bị chiếm)
// Nếu backend chạy trên port khác, set REACT_APP_API_URL=http://localhost:PORT/api
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 and 403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token không hợp lệ hoặc user không tồn tại - xóa và redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
