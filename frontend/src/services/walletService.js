import api from './api';

const walletService = {
  getBalance: async () => {
    const response = await api.get('/wallet/balance');
    return response.data;
  },

  addFunds: async (amount, source) => {
    const response = await api.post('/wallet/add-funds', { amount, source });
    return response.data;
  },

  withdrawFunds: async (amount, destination) => {
    const response = await api.post('/wallet/withdraw', { amount, destination });
    return response.data;
  },

  getTransactions: async (page = 1, limit = 10) => {
    const response = await api.get(`/wallet/transactions?page=${page}&limit=${limit}`);
    return response.data;
  },
};

export default walletService;