// src/services/authService.js
import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'An error occurred during registration';
  }
};

export const login = async (credentials) => {
  try {
    console.log('Attempting login with credentials:', credentials);
    const response = await api.post('/auth/login', credentials);
    console.log('Login response:', response);

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }
    }
    console.log('Returning user data:', response.data.user);
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    return response.data.access_token;
  } catch (error) {
    throw error.response?.data?.error || 'An error occurred while refreshing the token';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// Add signup as an alias for register to maintain compatibility
export const signup = register;

// Additional utility function to check if the user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};