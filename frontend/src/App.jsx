// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/features/Dashboard/Dashboard';
import Wallet from './components/features/Wallet/Wallet';
import Transactions from './pages/Transactions';
import Profile from './components/features/Profile/Profile';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import PrivateRoute from './components/common/PrivateRoute';
import './assets/styles/App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
                <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;