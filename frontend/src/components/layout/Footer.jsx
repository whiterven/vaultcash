import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">FinInclusion</h3>
            <p className="text-gray-400">Empowering underserved communities through financial inclusion.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Our Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 17.176c-.76.856-1.633 1.5-2.632 1.917-1 .417-2.084.625-3.261.625-1.089 0-2.094-.183-3.016-.55a7.348 7.348 0 01-2.417-1.557 7.347 7.347 0 01-1.595-2.384c-.38-.922-.57-1.922-.57-3.002 0-1.089.19-2.095.57-3.017A7.39 7.39 0 015.67 6.787a7.29 7.29 0 012.415-1.595c.922-.38 1.928-.57 3.017-.57 1.089 0 2.094.19 3.016.57.923.38 1.728.9 2.417 1.557a7.347 7.347 0 011.595 2.384c.38.922.57 1.922.57 3.002 0 1.089-.19 2.095-.57 3.017a7.39 7.39 0 01-1.595  2.422zm2.28-8.925c-.76-.57-1.633-.855-2.632-.855-1.089 0-2.084.285-3.016.855-.923.57-1.728 1.34-2.417 2.31-.76 1.09-1.139 2.31-1.139 3.66 0 1.34.38 2.56 1.139 3.66.76.97 1.633 1.74 2.632 2.31 1 .57 2.084.855 3.261.855 1.089 0 2.094-.285 3.016-.855.923-.57 1.728-1.34 2.417-2.31.76-1.09 1.139-2.31 1.139-3.66 0-1.34-.38-2.56-1.139-3.66-.76-.97-1.633-1.74-2.632-2.31z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2023 FinInclusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;