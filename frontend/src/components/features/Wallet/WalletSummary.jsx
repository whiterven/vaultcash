import React from 'react';

const WalletSummary = ({ balance }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Wallet Balance</h2>
      <p className="text-4xl font-bold text-blue-600">${balance.toFixed(2)}</p>
      <p className="text-gray-600 mt-2">Available Balance</p>
    </div>
  );
};

export default WalletSummary;