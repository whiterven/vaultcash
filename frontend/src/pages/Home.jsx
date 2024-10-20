import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to FinInclusion</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">Empowering underserved communities through financial inclusion</p>
          <div className="flex justify-center space-x-4">
            <Button as={Link} to="/signup" variant="primary">Get Started</Button>
            <Button as={Link} to="/about" variant="secondary">Learn More</Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Easy Transactions</h2>
            <p className="text-gray-600">Send and receive money with ease, right from your mobile device.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bill Payments</h2>
            <p className="text-gray-600">Pay your bills on time without the hassle of visiting physical locations.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Financial Education</h2>
            <p className="text-gray-600">Access resources to improve your financial literacy and make informed decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;