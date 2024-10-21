import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Instead of getCurrentUser, we can use the stored user data or token
        const token = localStorage.getItem('token'); // Assuming you store the token
        if (token) {
          try {
            // You might want to validate the token here
            await authService.refreshToken(); // Use the existing refreshToken method
            // Get user data from token or stored data
            const userData = JSON.parse(localStorage.getItem('userData'));
            setUser(userData);
          } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData.user);
    // Store user data
    localStorage.setItem('userData', JSON.stringify(userData.user));
    return userData;
  };

  const signup = async (userData) => {
    const result = await authService.signup(userData);
    setUser(result.user);
    // Store user data
    localStorage.setItem('userData', JSON.stringify(result.user));
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // Clear stored data
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};