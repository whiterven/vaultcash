import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWalletBalance, addFunds, withdrawFunds } from '../../../features/wallet/walletSlice';
import WalletSummary from './WalletSummary';
import Button from '../../common/Button';
import Modal from '../../common/Modal';

const Wallet = () => {
  const dispatch = useDispatch();
  const { balance, loading, error } = useSelector((state) => state.wallet);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  const handleAddFunds = () => {
    dispatch(addFunds(parseFloat(amount)));
    setIsAddFundsModalOpen(false);
    setAmount('');
  };

  const handleWithdraw = () => {
    dispatch(withdrawFunds(parseFloat(amount)));
    setIsWithdrawModalOpen(false);
    setAmount('');
  };

  if (loading) {
    return <div>Loading wallet information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wallet</h1>
      <WalletSummary balance={balance} />
      <div className="mt-8 flex space-x-4">
        <Button onClick={() => setIsAddFundsModalOpen(true)}>Add Funds</Button>
        <Button onClick={() => setIsWithdrawModalOpen(true)} variant="secondary">Withdraw</Button>
      </div>

      <Modal isOpen={isAddFundsModalOpen} onClose={() => setIsAddFundsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Add Funds</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input mb-4"
          placeholder="Enter amount"
        />
        <Button onClick={handleAddFunds}>Confirm</Button>
      </Modal>

      <Modal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input mb-4"
          placeholder="Enter amount"
        />
        <Button onClick={handleWithdraw}>Confirm</Button>
      </Modal>
    </div>
  );
};

export default Wallet;