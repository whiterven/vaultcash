// src/services/walletService.js
import api from './api';

export const getBalance = async () => {
  const response = await api.get('/wallet/balance');
  return response.data.balance;
};

export const deposit = async (amount) => {
  const response = await api.post('/wallet/deposit', { amount });
  return response.data;
};

export const withdraw = async (amount) => {
  const response = await api.post('/wallet/withdraw', { amount });
  return response.data;
};

export const getTransactions = async (page = 1, limit = 10) => {
  const response = await api.get(`/wallet/transactions?page=${page}&limit=${limit}`);
  return response.data;
};

// Add aliases for existing code compatibility
export const addFunds = deposit;
export const withdrawFunds = withdraw;