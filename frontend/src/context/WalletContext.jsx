// src/context/WalletContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as walletService from '../services/walletService';
import { useAuth } from './AuthContext';

export const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const balance = await walletService.getBalance();
      setBalance(balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const data = await walletService.getTransactions();
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    balance,
    transactions,
    loading,
    updateBalance,
    addFunds: walletService.addFunds,
    withdrawFunds: walletService.withdrawFunds,
    refreshWallet: fetchBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};