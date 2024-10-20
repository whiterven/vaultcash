import React, { createContext, useContext, useState, useEffect } from 'react';
import walletService from '../services/walletService';
import { useAuth } from './AuthContext';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const data = await walletService.getBalance();
      setBalance(data.balance);
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

  const addFunds = async (amount, source) => {
    try {
      await walletService.addFunds(amount, source);
      await fetchBalance();
      await fetchTransactions();
    } catch (error) {
      console.error('Failed to add funds:', error);
      throw error;
    }
  };

  const withdrawFunds = async (amount, destination) => {
    try {
      await walletService.withdrawFunds(amount, destination);
      await fetchBalance();
      await fetchTransactions();
    } catch (error) {
      console.error('Failed to withdraw funds:', error);
      throw error;
    }
  };

  const value = {
    balance,
    transactions,
    loading,
    addFunds,
    withdrawFunds,
    refreshWallet: fetchBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};