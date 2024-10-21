// src/components/layout/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About VaultCash</h3>
          <p>Secure, fast, and reliable financial solutions for everyone.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@vaultcash.com</p>
          <p>Phone: (484) 401-9149</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 VaultCash. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;