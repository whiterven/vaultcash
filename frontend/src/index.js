import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import App from './App';
import './assets/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <WalletProvider>
          <Router>
            <App />
          </Router>
        </WalletProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);