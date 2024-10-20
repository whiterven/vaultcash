import api from './api';

const paymentService = {
  sendMoney: async (recipientId, amount) => {
    const response = await api.post('/payments/send', { recipientId, amount });
    return response.data;
  },

  requestMoney: async (senderId, amount) => {
    const response = await api.post('/payments/request', { senderId, amount });
    return response.data;
  },

  payBill: async (billerId, amount, reference) => {
    const response = await api.post('/payments/pay-bill', { billerId, amount, reference });
    return response.data;
  },

  getPaymentHistory: async () => {
    const response = await api.get('/payments/history');
    return response.data;
  },
};

export default paymentService;