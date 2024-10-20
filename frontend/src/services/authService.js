import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  resetPassword: async (email) => {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/auth/change-password', { oldPassword, newPassword });
    return response.data;
  },
};

export default authService;