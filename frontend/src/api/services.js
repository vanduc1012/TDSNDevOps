import api from './axios';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    // Không tự động lưu token khi đăng ký, để user phải đăng nhập
    // Token sẽ được lưu khi user đăng nhập
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'ADMIN';
  },
};

// Dịch vụ đi kèm phòng trọ (Wifi, điện, nước, giặt ủi, bảo vệ...)
export const serviceService = {
  getAll: () => api.get('/services'),
  getAvailable: () => api.get('/services/available'),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Giữ lại menuService để backward compatibility (sẽ deprecated)
export const menuService = serviceService;

// Đặt phòng trọ
export const bookingService = {
  getAll: () => api.get('/bookings'),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getByRoom: (roomId) => api.get(`/bookings/room/${roomId}`),
  getByStatus: (status) => api.get(`/bookings/status/${status}`),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  cancel: (id, reason) => api.patch(`/bookings/${id}/cancel`, { reason }),
  approve: (id) => api.patch(`/bookings/${id}/approve`),
};

// Giữ lại orderService để backward compatibility (sẽ deprecated)
export const orderService = bookingService;

export const reportService = {
  getDailyReport: (date) => {
    const params = date ? { date } : {};
    return api.get('/reports/daily', { params });
  },
  getTodayReport: () => api.get('/reports/today'),
  getMonthlyReport: (year, month) => {
    return api.get('/reports/monthly', { params: { year, month } });
  },
};

export const roomService = {
  getAll: () => api.get('/rooms'),
  getActive: () => api.get('/rooms/active'),
  getByStatus: (status) => api.get(`/rooms/status/${status}`),
  getById: (id) => api.get(`/rooms/${id}`),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  updateStatus: (id, status) => api.patch(`/rooms/${id}/status`, { status }),
  toggleVisibility: (id) => api.patch(`/rooms/${id}/toggle-visibility`),
  updateImages: (id, images) => api.put(`/rooms/${id}/images`, { images }),
  delete: (id) => api.delete(`/rooms/${id}`),
};

export const postService = {
  getAll: () => api.get('/posts'),
  getPending: () => api.get('/posts/pending'),
  getByStatus: (status) => api.get(`/posts/status/${status}`),
  getById: (id) => api.get(`/posts/${id}`),
  approve: (id) => api.post(`/posts/${id}/approve`),
  reject: (id, reason) => api.post(`/posts/${id}/reject`, { reason }),
  markSpam: (id) => api.post(`/posts/${id}/mark-spam`),
  markDuplicate: (id) => api.post(`/posts/${id}/mark-duplicate`),
  markInappropriate: (id, data) => api.post(`/posts/${id}/mark-inappropriate`, data),
};

export const userManagementService = {
  getAll: () => api.get('/admin/users'),
  getById: (id) => api.get(`/admin/users/${id}`),
  lock: (id) => api.post(`/admin/users/${id}/lock`),
  unlock: (id) => api.post(`/admin/users/${id}/unlock`),
  resetPassword: (id) => api.post(`/admin/users/${id}/reset-password`),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

// Table service - DEPRECATED: Không còn sử dụng trong dự án quản lý trọ
// Giữ lại để tránh lỗi compile, nhưng sẽ trả về lỗi khi gọi API
export const tableService = {
  getAll: () => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  getAvailable: () => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  getById: (id) => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  create: (data) => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  update: (id, data) => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  updateStatus: (id, status) => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
  delete: (id) => Promise.reject(new Error('Table service is deprecated. Use roomService instead.')),
};