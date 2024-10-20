import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">{transaction.description}</td>
              <td className={`py-3 px-6 text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;