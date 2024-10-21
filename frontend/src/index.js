// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { WalletProvider } from './context/WalletContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css'
import './assets/styles/Home.css'
import './assets/styles/App.css'
import './assets/styles/Auth.css'
import './assets/styles/designSystem.css'
import './assets/styles/Transactions.css'


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);