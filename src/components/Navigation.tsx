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
              <a href='hhttps://flashfire-dashboard-frontend.vercel.app/register'  target='_blank'>
                <button
                // onClick={()=> openSignupModal(2)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base"
                >
                  Sign Up For Free 
                </button>
              </a>
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
                <a href='hhttps://flashfire-dashboard-frontend.vercel.app/register'  target='_blank'>
                <button
                
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 block text-center mt-4 w-full text-base"
                >
                  Start Free Trial
                </button>
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Consultation Banner - Single Line */}
        <div className='w-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            
            {/* Single Line Layout for All Devices */}
            <div className='flex items-center justify-center py-2.5 space-x-6'>
              
              {/* Demo Session Text */}
              <div className='flex items-center space-x-3'>
                <div className='bg-white/20 p-1.5 rounded-full'>
                  <ArrowRight className='w-4 h-4 text-white' />
                </div>
                <span className='font-bold text-white text-sm sm:text-base tracking-wide'>
                  Book a Live Demo Session
                </span>
              </div>
              
              {/* Separator */}
              <div className='w-px h-6 bg-white/30'></div>
              
              {/* Cohort Info */}
              <div className='flex items-center space-x-2'>
                <div className='bg-white/20 p-1.5 rounded-full'>
                  <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <rect x='3' y='4' width='18' height='16' rx='2' strokeWidth='2'/>
                    <path d='M16 2v4M8 2v4M3 10h18' strokeWidth='2'/>
                    <circle cx='8' cy='14' r='1' fill='currentColor'/>
                    <circle cx='12' cy='14' r='1' fill='currentColor'/>
                    <circle cx='16' cy='14' r='1' fill='currentColor'/>
                  </svg>
                </div>
                <span className='font-bold text-white text-sm sm:text-base tracking-wide'>
                  Next cohort starts Today
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