import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GTagUTM } from "../utils/GTagUTM.ts";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface NavigationProps {
  setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployerFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

type NavItem =
  | { name: "" | "Features" | "Testimonials" | "Pricing" | "FAQ"; type: "section"; id: string }
  | { name: "Blog" | "Employers"; type: "route"; to: string };

const Navigation: React.FC<NavigationProps> = ({
  setSignupFormVisibility,
  setCalendlyModalVisibility,
  setEmployerFormVisibility,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [employerFormVisible, setEmployerFormVisible] = useState(false);

  // ----------------- Countdown (Days / Hrs / Mins / Secs) -----------------
  // Set your target deadline here. Example: 24 hours from now.
  const TARGET_DATE = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getTime();
  })[0];

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CONFIG: one-pager sections + external routes ---
  const navItems: NavItem[] = [
    { name: "Home", type: "section", id: "home" },
    { name: "Features", type: "section", id: "features" },
    { name: "Testimonials", type: "section", id: "testimonials" },
    { name: "Pricing", type: "section", id: "pricing" },
    { name: "FAQ", type: "section", id: "faq" },
    { name: "Blog", type: "route", to: "/blogs" },
    { name: "Employers", type: "route", to: "/employers" },
  ];

  // --- helpers ---
  const safeTrack = (payload: any) => {
    try {
      GTagUTM?.(payload);
    } catch {
      /* swallow analytics errors */
    }
  };

  // Navigate to "/", then scroll to a section id.
  // If we're already on "/", just scroll.
  const goToSection = (id: string, closeMenu = true) => {
  const el = document.getElementById(id);

  if (el) {
    // Scroll if element exists
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState({}, "", "/" + id);
  } else {
    // Navigate to home first
    navigate("/");

    // Wait for Home to mount, then scroll
    setTimeout(() => {
      const newEl = document.getElementById(id);
      if (newEl) {
        newEl.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState({}, "", "/" + id);
      }
    }, 100); // Delay allows DOM to render
  }

  if (closeMenu) setIsMenuOpen(false);
};


  const openSignup = () => {
    navigate("/signup");
    setIsMenuOpen(false);
    safeTrack({
      eventName: "sign_up_click",
      label: "Header Sign Up Button",
      utmParams: {
        utm_source: "WEBSITE",
        utm_medium: "NAVBAR_SIGNUP_BUTTON",
        utm_campaign: "header_signup",
      },
    });
  };

  const openCalendly = () => {
    setCalendlyModalVisibility(true);
    setIsMenuOpen(false);
    safeTrack({
      eventName: "Calendly_Meet_click",
      label: "NAVBAR_LOWER_SECTION_Button",
      utmParams: {
        utm_source: "WEBSITE",
        utm_medium: "Navbar_Meet_Button",
        utm_campaign: "WEBSITE_NAVBAR_LOWER_SECTION",
      },
    });
  };

  const openEmployerForm = () => {
    setEmployerFormVisibility(true);
    navigate("/employers");
    // keep menu state as-is by design
  };

  const closeEmployerForm = () => setEmployerFormVisibility(false);

  return (
    <div className="font-inter">
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled
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
                onClick={(e) => {
                  // If not on home, go home; if on home, scroll to top
                  e.preventDefault();
                  goToSection("home");
                }}
              >
                FLASHFIRE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                if (item.type === "route") {
                  // Special handling for Employers (kept as in your code)
                  if (item.name === "Employers") {
                    return (
                      <Link to="/employers" key={item.name}>
                        <button
                          className="font-medium border-none text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base"
                          onClick={openEmployerForm}
                        >
                          {item.name}
                        </button>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base focus:outline-none focus:ring-0 focus:text-orange-500"
                    >
                      {item.name}
                    </Link>
                  );
                }

                // section item (one-pager)
                return (
                  <button
                    key={item.name}
                    onClick={() => goToSection(item.id)}
className="font-medium text-gray-700 transition-colors duration-200 hover:text-orange-600 text-sm lg:text-base focus:outline-none focus:text-orange-500 focus:ring-0"
                  >
                    {item.name}
                  </button>
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
                  if (item.type === "route") {
                    if (item.name === "Employers") {
                      return (
                        <button
                          key={item.name}
                          onClick={() => {
                            openEmployerForm();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          {item.name}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  // section (one-pager) on mobile
                  return (
                    <button
                      key={item.name}
                      onClick={() => goToSection(item.id)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
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
              {/* <div className="flex-1 min-w-0 flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-red-300 rounded-full mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span>
                <span className="text-white font-semibold text-sm opacity-95 truncate">
                  10 Slots Left 
                </span>
              </div> */}

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
                  Hurry! 6 Slots Remaining
                </span>
              </div>

              {/* Divider (unchanged) */}
              <div className="w-px h-6 sm:h-6 lg:h-8 bg-white/50" />

              {/* Middle: Countdown + "Just 1 Spot Left" (clock replaced) */}
              <div className="flex items-end sm:items-center space-x-2">
                <Countdown />
                {/* <span className="font-bold text-white text-xs sm:text-base lg:text-lg tracking-wide whitespace-nowrap flex items-center">
                  <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-300 rounded-full mr-1.5 sm:mr-2 animate-[breathe_1.5s_ease-in-out_infinite]"></span>
                  10 Slots Left This September
                </span> */}
              </div>
              <Link to={'/book-free-demo'}>
              <button
                // onClick={openCalendly}
                className="bg-red-600 hover:bg-red-700 text-white px-1.5 sm:px-4 lg:px-6 py-0.5 sm:py-2 rounded sm:rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-[10px] sm:text-sm tracking-wide whitespace-nowrap flex-shrink-0"
              >
                Book Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
