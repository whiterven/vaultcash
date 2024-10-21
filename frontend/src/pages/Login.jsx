// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FaUser, FaLock } from 'react-icons/fa';
import '../assets/styles/Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting login form with credentials:', credentials);
    try {
      const userData = await login(credentials);
      console.log('Login successful, received user data:', userData);
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error in component:', err);
      if (err.response) {
        setError(err.response.data.error || 'An error occurred during login.');
      } else if (err.request) {
        setError('No response received from server. Please try again.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to access your VaultCash account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <FaUser className="input-icon" />
            <Input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              label="Username"
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              label="Password"
              required
            />
          </div>
          <Button type="submit" className="submit-btn">
            Login
          </Button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link to="/signup" className="signup-link">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;