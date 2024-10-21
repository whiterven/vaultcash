// src/services/paymentService.js
import api from './api';

export const createPaymentIntent = async (amount) => {
  const response = await api.post('/payment/create-payment-intent', { amount });
  return response.data;
};

export const confirmPayment = async (paymentIntentId) => {
  const response = await api.post('/payment/confirm-payment', { paymentIntentId });
  return response.data;
};