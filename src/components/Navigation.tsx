import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
  ];

  const openModal = () => {
    const modal = document.getElementById('signup-modal');
    if (modal) modal.classList.remove('hidden');
    setIsMenuOpen(false);
  };

  return (
    <div className="font-inter">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity duration-200">
                FLASHFIRE
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              {/* <a href='http://localhost:5174/register' target='_blank'> */}
                <button
                onClick={()=> openSignupModal(1)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base"
                >
                  Sign Up For Free 
                </button>
              {/* </a> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 transition-colors duration-200 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-lg shadow-lg">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-orange-600 block px-3 py-3 font-medium transition-colors duration-200 text-base rounded-lg hover:bg-orange-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 block text-center mt-4 w-full text-base"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Consultation Banner - Single Line */}
        <div className='w-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:p-1'>
            
            {/* Single Line Layout for All Devices */}
            <div className='flex items-center justify-center py-2.5 space-x-6'>
              
              {/* Demo Session Text */}
              <div className='flex items-center space-x-3'>
                <img 
                  src='https://res.cloudinary.com/drit9nkha/image/upload/v1753417509/right-arrow_j7m7o3.webp' 
                  alt='Arrow' 
                  className='w-5 h-5 filter brightness-0 invert'
                />
                <span className='font-bold text-white text-sm sm:text-base tracking-wide'>
                  Book A Live Demo Session
                </span>
              </div>
              
              {/* Separator */}
              <div className='w-px h-6 bg-white/30'></div>
              
              {/* Cohort Info */}
              <div className='flex items-center space-x-2'>
                <div className='w-5 h-5 flex items-center justify-center'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24'>
                    <defs>
                      <linearGradient id='clockGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                        <stop offset='0%' stopColor='#4F46E5'/>
                        <stop offset='50%' stopColor='#7C3AED'/>
                        <stop offset='100%' stopColor='#EC4899'/>
                      </linearGradient>
                    </defs>
                    <circle cx='12' cy='12' r='10' fill='url(#clockGradient)' stroke='#1F2937' strokeWidth='0.5'/>
                    <circle cx='12' cy='12' r='8.5' fill='white' stroke='#E5E7EB' strokeWidth='0.5'/>
                    <circle cx='12' cy='6' r='0.8' fill='#374151'/>
                    <circle cx='18' cy='12' r='0.8' fill='#374151'/>
                    <circle cx='12' cy='18' r='0.8' fill='#374151'/>
                    <circle cx='6' cy='12' r='0.8' fill='#374151'/>
                    <path d='M12 7v5l3.5 2' stroke='#EF4444' strokeWidth='2' strokeLinecap='round' fill='none'/>
                    <circle cx='12' cy='12' r='1.5' fill='#EF4444'/>
                  </svg>
                </div>
                <span className='font-bold text-white text-sm sm:text-base tracking-wide'>
                  Just 2 Spots Left
                </span>
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={()=> openSignupModal(2)} 
                className='bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm tracking-wide'
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;