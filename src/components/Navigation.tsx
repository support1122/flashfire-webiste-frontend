import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import EmployerForm from './EmployerForm';
import { GTagUTM } from '../utils/GTagUTM.ts';
import { Link } from 'react-router-dom';

interface NavigationProps {
  setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<NavigationProps> = ({
  setSignupFormVisibility,
  setCalendlyModalVisibility,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [employerFormVisible, setEmployerFormVisible] = useState(false);

  // ----------------- Countdown (Days / Hrs / Mins / Secs) -----------------
  // Set your target deadline here. Example: 24 hours from now.
  const TARGET_DATE = useState(() => Date.now() + 24 * 60 * 60 * 1000)[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // initial paint
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [TARGET_DATE]);

  const Two = (n: number) => String(n).padStart(2, '0');

  const Countdown = () => (
    <div className="flex space-x-2 text-center items-end">
      <div>
        <div className="px-2 py-1 rounded bg-white/90 text-red-600 font-bold text-xs sm:text-sm shadow-md min-w-[2.5rem]">
          {Two(timeLeft.days)}
        </div>
        <div className="text-[10px] text-white/90 leading-tight mt-0.5">Days</div>
      </div>
      <div>
        <div className="px-2 py-1 rounded bg-white/90 text-red-600 font-bold text-xs sm:text-sm shadow-md min-w-[2.5rem]">
          {Two(timeLeft.hours)}
        </div>
        <div className="text-[10px] text-white/90 leading-tight mt-0.5">Hrs</div>
      </div>
      <div>
        <div className="px-2 py-1 rounded bg-white/90 text-red-600 font-bold text-xs sm:text-sm shadow-md min-w-[2.5rem]">
          {Two(timeLeft.minutes)}
        </div>
        <div className="text-[10px] text-white/90 leading-tight mt-0.5">Mins</div>
      </div>
      <div>
        <div className="px-2 py-1 rounded bg-white/90 text-red-600 font-bold text-xs sm:text-sm shadow-md min-w-[2.5rem]">
          {Two(timeLeft.seconds)}
        </div>
        <div className="text-[10px] text-white/90 leading-tight mt-0.5">Secs</div>
      </div>
    </div>
  );
  // ------------------------------------------------------------------------

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Employers', href: '#employers' },
  ];

  // Never let analytics break the CTA flow
  const safeTrack = (payload: any) => {
    try {
      GTagUTM?.(payload);
    } catch {
      /* swallow analytics errors */
    }
  };

  const openSignup = () => {
    setSignupFormVisibility(true);
    setIsMenuOpen(false);

    safeTrack({
      eventName: 'sign_up_click',
      label: 'Header Sign Up Button',
      utmParams: {
        utm_source: 'WEBSITE',
        utm_medium: 'NAVBAR_SIGNUP_BUTTON',
        utm_campaign: 'header_signup',
      },
    });
  };

  const openCalendly = () => {
    setCalendlyModalVisibility(true);
    setIsMenuOpen(false);

    safeTrack({
      eventName: 'Calendly_Meet_click',
      label: 'NAVBAR_LOWER_SECTION_Button',
      utmParams: {
        utm_source: 'WEBSITE',
        utm_medium: 'Navbar_Meet_Button',
        utm_campaign: 'WEBSITE_NAVBAR_LOWER_SECTION',
      },
    });
  };

  const openEmployerForm = () => {
    setEmployerFormVisible(true);
    setIsMenuOpen(false);
  };

  const closeEmployerForm = () => {
    setEmployerFormVisible(false);
  };

  return (
    <div className="font-inter">
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                FLASHFIRE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                if (item.name === 'Employers') {
                  return (
                    <button
                      key={item.name}
                      onClick={openEmployerForm}
                      className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base"
                    >
                      {item.name}
                    </button>
                  );
                }

                const isInternalRoute = item.href.startsWith('/');

                return isInternalRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base"
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* CTA Button (desktop) */}
            <div className="hidden md:block">
              <button
                onClick={openSignup}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm lg:text-base"
              >
                Sign Up For Free
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
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
                {navItems.map((item) => {
                  if (item.name === 'Employers') {
                    return (
                      <button
                        key={item.name}
                        onClick={openEmployerForm}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    );
                  }

                  const isInternalRoute = item.href.startsWith('/');

                  return isInternalRoute ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  );
                })}

                {/* CTA Button (mobile) */}
                <button
                  onClick={openSignup}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 block text-center mt-4 w-full text-base"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Consultation Banner */}
        <div className="w-full h-16 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 shadow-lg relative overflow-hidden">
          {/* Background effects (unchanged) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-[float_4s_ease-in-out_infinite_reverse]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
            {/* Mobile Layout */}
            <div className="sm:hidden h-full flex items-center justify-between gap-3 px-2">
              {/* Left: Countdown (replaces clock icon) */}
              <div className="flex-shrink-0">
                <Countdown />
              </div>

              {/* Middle: Only 1 Spot Remaining (unchanged) */}
              <div className="flex-1 min-w-0 flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-red-300 rounded-full mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span>
                <span className="text-white font-semibold text-sm opacity-95 truncate">
                  10 Slots Left 
                </span>
              </div>

              {/* Right: Book Now (unchanged) */}
              <div className="flex-shrink-0">
                <button
                  onClick={openCalendly}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-md font-semibold transition-all duration-300 shadow-md text-sm border border-red-500/30"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex h-full items-center justify-center space-x-1 sm:space-x-4 lg:space-x-8 text-nowrap">
              {/* Left: Arrow + text (unchanged) */}
              <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-4">
                <img
                  src="https://res.cloudinary.com/drit9nkha/image/upload/v1753417509/right-arrow_j7m7o3.webp"
                  alt="Arrow"
                  className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 filter brightness-0 invert drop-shadow"
                />
                <span className="font-bold text-white text-xs sm:text-base lg:text-lg tracking-wide whitespace-nowrap">
                  Book A Live Demo Session
                </span>
              </div>

              {/* Divider (unchanged) */}
              <div className="w-px h-6 sm:h-6 lg:h-8 bg-white/50" />

              {/* Middle: Countdown + "Just 1 Spot Left" (clock replaced) */}
              <div className="flex items-end sm:items-center space-x-2">
                <Countdown />
                <span className="font-bold text-white text-xs sm:text-base lg:text-lg tracking-wide whitespace-nowrap flex items-center">
                  {/* <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-300 rounded-full mr-1.5 sm:mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span> */}
                  10 Slots Left This September
                </span>
              </div>

              {/* Right: Book Now (unchanged) */}
              <button
                onClick={openCalendly}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-2 sm:px-6 lg:px-8 py-1 sm:py-2.5 rounded-md sm:rounded-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-xs sm:text-base tracking-wide whitespace-nowrap"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Employer Form Modal */}
      {employerFormVisible && (
        <div className="fixed inset-0 z-[60]">
          <EmployerForm isVisible={employerFormVisible} onClose={closeEmployerForm} />
        </div>
      )}
    </div>
  );
};

export default Navigation;
