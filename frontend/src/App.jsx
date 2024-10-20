import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/features/Dashboard/Dashboard';
import Wallet from './components/features/Wallet/Wallet';
import Transactions from './pages/Transactions';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/wallet" 
                  element={
                    <PrivateRoute>
                      <Wallet />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/transactions" 
                  element={
                    <PrivateRoute>
                      <Transactions />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;