// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/authService';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import '../assets/styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Your VaultCash Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            label="Username"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email"
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
          />
          <Button type="submit" className="submit-btn">Sign Up</Button>
        </form>
        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;