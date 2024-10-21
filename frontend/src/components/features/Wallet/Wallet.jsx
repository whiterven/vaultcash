// src/components/features/Wallet/Wallet.jsx
import React, { useContext, useState } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { addFunds, withdrawFunds } from '../../../services/walletService';
import Button from '../../common/Button';
import Input from '../../common/Input';
import './Wallet.css';

const Wallet = () => {
  const { balance, updateBalance } = useContext(WalletContext);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    try {
      if (action === 'add') {
        await addFunds(parseFloat(amount));
        updateBalance(balance + parseFloat(amount));
      } else if (action === 'withdraw') {
        if (parseFloat(amount) > balance) {
          alert('Insufficient funds');
          return;
        }
        await withdrawFunds(parseFloat(amount));
        updateBalance(balance - parseFloat(amount));
      }
      setAmount('');
      setAction(null);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="wallet">
      <h1>My Wallet</h1>
      <div className="wallet-balance">
        <h2>Current Balance</h2>
        <p className="balance">${balance.toFixed(2)}</p>
      </div>
      <div className="wallet-actions">
        <Button onClick={() => setAction('add')}>Add Funds</Button>
        <Button onClick={() => setAction('withdraw')}>Withdraw Funds</Button>
      </div>
      {action && (
        <form onSubmit={handleSubmit} className="transaction-form">
          <h3>{action === 'add' ? 'Add Funds' : 'Withdraw Funds'}</h3>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            label="Amount"
          />
          <Button type="submit">Confirm</Button>
        </form>
      )}
    </div>
  );
};

export default Wallet;