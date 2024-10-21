// src/routes.js
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/features/Dashboard/Dashboard';
import Wallet from './components/features/Wallet/Wallet';
import Transactions from './pages/Transactions';
import Profile from '../components/features/Profile/Profile';

const routes = [
  { path: '/', element: Home },
  { path: '/login', element: Login },
  { path: '/signup', element: Signup },
  { path: '/dashboard', element: Dashboard, private: true },
  { path: '/wallet', element: Wallet, private: true },
  { path: '/transactions', element: Transactions, private: true },
  { path: '/profile', element: Profile, private: true },
];

export default routes;