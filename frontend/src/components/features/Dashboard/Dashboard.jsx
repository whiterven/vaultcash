import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletBalance } from '../../../features/wallet/walletSlice';
import { fetchRecentTransactions } from '../../../features/transactions/transactionSlice';
import WalletSummary from '../Wallet/WalletSummary';
import TransactionList from '../Transactions/TransactionList';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { balance, loading: walletLoading } = useSelector((state) => state.wallet);
  const { transactions, loading: transactionsLoading } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchWalletBalance());
    dispatch(fetchRecentTransactions());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Wallet Summary</h2>
          {walletLoading ? (
            <p>Loading wallet information...</p>
          ) : (
            <WalletSummary balance={balance} />
          )}
          <div className="mt-4">
            <Link to="/wallet">
              <Button variant="secondary">View Wallet Details</Button>
            </Link>
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          {transactionsLoading ? (
            <p>Loading recent transactions...</p>
          ) : (
            <TransactionList transactions={transactions.slice(0, 5)} />
          )}
          <div className="mt-4">
            <Link to="/transactions">
              <Button variant="secondary">View All Transactions</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button as={Link} to="/send-money" variant="primary">Send Money</Button>
        <Button as={Link} to="/request-money" variant="primary">Request Money</Button>
        <Button as={Link} to="/pay-bills" variant="primary">Pay Bills</Button>
      </div>
    </div>
  );
};

export default Dashboard;