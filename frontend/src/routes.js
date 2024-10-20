import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/features/Dashboard/Dashboard';
import Wallet from './components/features/Wallet/Wallet';
import Transactions from './pages/Transactions';
import PrivateRoute from './components/common/PrivateRoute';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
  {
    path: '/wallet',
    element: <PrivateRoute><Wallet /></PrivateRoute>,
  },
  {
    path: '/transactions',
    element: <PrivateRoute><Transactions /></PrivateRoute>,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;