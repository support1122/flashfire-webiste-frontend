import React from 'react';
import { Mail, MapPin, Zap } from 'lucide-react';
import {RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route, Link} from 'react-router-dom';


const Footer = () => {
  const handleLinkClick = (path: string) => {
    // Update the URL without page reload
    window.history.pushState({}, '', path);
    
    // Dispatch a custom event to notify about route change
    window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }));
  };

  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Left side - Copyright and Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <span>© FLASHFIRE 2025</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs sm:text-sm">
              <a
                href ='/termsofservice'
                target="_blank" rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-200 cursor-pointer"
              >
                TERMS OF SERVICE
              </a>
              <span className="text-orange-200">|</span>
              <a
                href ='/privacypolicy'
                target="_blank" rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-200 cursor-pointer"
              >
                PRIVACY POLICY
              </a>
              <span className="text-orange-200">|</span>
              <a
                href ='/refundpolicy'
                target="_blank" rel="noopener noreferrer"
                className="hover:text-orange-200 transition-colors duration-200 cursor-pointer"
              >
                REFUND POLICY
              </a>
              <span className="text-orange-200">|</span>
              <Link to={'https://flashfire-frontend-hoisted-niqkz80c6.vercel.app/paymentpolicy'} target ='_blank' rel="noopener noreferrer">
              <button
                // onClick={() => handleLinkClick('/paymentpolicy')}
                // href='/paymentpolicy'
                // target="_blank" rel="noopener noreferrer"                
                // className="hover:text-orange-200 transition-colors duration-200 cursor-pointer"
              >
                PAYMENT POLICY
              </button>
              </Link>
            </div>
          </div>

          {/* Right side - Brand */}
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span className="font-bold text-sm sm:text-base">FLASHFIRE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
