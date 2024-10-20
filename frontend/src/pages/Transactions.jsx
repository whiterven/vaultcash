import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTransactions } from '../features/transactions/transactionSlice';
import TransactionList from '../components/features/Transactions/TransactionList';

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading transactions...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default Transactions;