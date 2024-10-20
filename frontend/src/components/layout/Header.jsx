import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import Button from '../common/Button';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">FinInclusion</Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/wallet" className="text-gray-700 hover:text-blue-600">Wallet</Link>
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;