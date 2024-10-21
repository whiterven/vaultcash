// src/pages/Transactions.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getTransactions } from '../services/walletService';
import Button from '../components/common/Button';
import '../assets/styles/Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await getTransactions(page);
      if (response.transactions.length === 0) {
        setHasMore(false);
      } else {
        setTransactions(prev => [...prev, ...response.transactions]);
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="transactions-container">
      <h1>Transaction History</h1>
      <div className="transactions-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-date">
                {new Date(transaction.timestamp).toLocaleDateString()}
              </span>
              <span className="transaction-description">{transaction.description}</span>
            </div>
            <span className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="load-more">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Transactions;