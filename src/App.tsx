
import {useEffect, useState} from 'react';
import { Outlet, useLocation } from "react-router-dom";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [signupFormVisibility, setSignupFormVisibility] = useState(false);
  const [calendlyModalVisibility, setCalendlyModalVisibility] = useState(false);
  const location = useLocation();
  
  // Smooth-scroll to hash targets when path is '/#section'
  useEffect(() => {
    const tryScrollToHash = () => {
      if (location.hash) {
        const id = location.hash.slice(1);
        const scrollWithRetry = (retries: number) => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
          } else if (retries > 0) {
            requestAnimationFrame(() => scrollWithRetry(retries - 1));
          }
        };
        scrollWithRetry(20);
      } else if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    tryScrollToHash();
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation setSignupFormVisibility={setSignupFormVisibility} setCalendlyModalVisibility={setCalendlyModalVisibility} /> */}
      {/* <Hero setSignupFormVisibility={setSignupFormVisibility} setCalendlyModalVisibility={setCalendlyModalVisibility} /> */}
      {/* <MovingJobs setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <RealTimeMetrics setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <Features setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <HowItWorks setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <Testimonials setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <Pricing  setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <FAQ setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <Contact setSignupFormVisibility={setSignupFormVisibility} /> */}
      {/* <Outlet context={{ setSignupFormVisibility, setCalendlyModalVisibility }} /> */}
      {/* {signupFormVisibility && <SignupForm setSignupFormVisibility={setSignupFormVisibility} />} */}
      {/* {calendlyModalVisibility && <CalendlyModal setCalendlyModalVisibility={setCalendlyModalVisibility} />} */}
      {/* <Footer /> */}
      <Outlet context={{signupFormVisibility,calendlyModalVisibility, setSignupFormVisibility, setCalendlyModalVisibility }} />
    </div>
  );
}

export default App;