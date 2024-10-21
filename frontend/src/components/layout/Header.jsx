// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../common/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">VaultCash</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/wallet">Wallet</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;