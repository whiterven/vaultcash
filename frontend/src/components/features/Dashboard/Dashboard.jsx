// src/components/features/Dashboard/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { getTransactions } from '../../../services/walletService';
import Button from '../../common/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { balance } = useContext(WalletContext);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const transactions = await getTransactions(1, 5); // Get first page, 5 items
        setRecentTransactions(transactions);
      } catch (error) {
        console.error('Failed to fetch recent transactions:', error);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="balance-card">
          <h2>Current Balance</h2>
          <p className="balance">${balance.toFixed(2)}</p>
          <div className="action-buttons">
            <Button>Add Funds</Button>
            <Button>Withdraw</Button>
          </div>
        </div>
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Button>Send Money</Button>
          <Button>Request Money</Button>
          <Button>View Transactions</Button>
        </div>
      </div>
      <div className="recent-transactions">
        <h2>Recent Transactions</h2>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <span>{transaction.description}</span>
              <span className={`amount ${transaction.type}`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;