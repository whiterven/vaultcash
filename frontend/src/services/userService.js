// src/services/userService.js
import api from './api';

export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/user/profile', profileData);
  return response.data;
};