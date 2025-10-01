
import {useEffect, useState} from 'react';
import { Outlet, useLocation } from "react-router-dom";
import SignupForm from './components/SignupForm.tsx';
import CalendlyModal from './components/CalendlyModal.tsx';
import CalendlyPreloader from './components/CalendlyPreloader.tsx';
import Navigation from './components/Navigation.tsx';
import Footer from './components/Footer.tsx';
import SalesPopup from './components/SalesPopUp.tsx';
import { trackPageView, trackUserJourney } from './utils/PostHogTracking.ts';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [signupFormVisibility, setSignupFormVisibility] = useState(false);
  const [calendlyModalVisibility, setCalendlyModalVisibility] = useState(false);
  const [calendlyUser, setCalendlyUser] = useState(null);
  const location = useLocation();

  //  useEffect(() => {
  //   const id = window.location.hash.slice(1);
  //   if (!id) return;
  //   const el = document.getElementById(id);
  //   if (el) {
  //     // let layout settle
  //     setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  //   }
  // }, []);
  
  // Capture and store UTM parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    
    // Store UTM parameters from URL in localStorage
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmContent = params.get("utm_content");
    const utmTerm = params.get("utm_term");
    
    // Store UTM parameters in localStorage if they exist in URL
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
      console.log("Stored utm_source:", utmSource);
    }
    if (utmMedium) {
      localStorage.setItem("utm_medium", utmMedium);
      console.log("Stored utm_medium:", utmMedium);
    }
    if (utmCampaign) {
      localStorage.setItem("utm_campaign", utmCampaign);
      console.log("Stored utm_campaign:", utmCampaign);
    }
    if (utmContent) {
      localStorage.setItem("utm_content", utmContent);
      console.log("Stored utm_content:", utmContent);
    }
    if (utmTerm) {
      localStorage.setItem("utm_term", utmTerm);
      console.log("Stored utm_term:", utmTerm);
    }

    // Handle ref parameter (existing logic)
    if (ref) {
      const payload = {
        ref,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      fetch("https://clients-tracking-backend.onrender.com/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            console.log("UTM Source from ref:", data.utm_source); // ✅ campaigner 
            // Only override if not already set from URL
            if (!localStorage.getItem("utm_source")) {
              localStorage.setItem("utm_source", data.utm_source);
            }
            localStorage.setItem("ref-code", ref);
          } else {
            console.warn("Tracking error:", data.message || data.error);
          }
        })
        .catch((err) => console.error("Tracking failed:", err));
    }
  }, []);
  
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


    // Disabled auto-redirect that opened the signup form after 10 seconds
    // useEffect(() => {
    //   setTimeout(() =>
    //     navigate('/signup')
    //   , 10000);
    // }, []);
    // const location = useLocation();
  
  useEffect(() => {
    // Track page views
    const pageName = location.pathname === '/' ? 'home' : location.pathname.slice(1);
    trackPageView(pageName, location.pathname, {
      page_url: location.pathname,
      page_title: document.title
    });
    
    // Track user journey
    trackUserJourney('page_view', pageName, {
      page_name: pageName,
      page_url: location.pathname
    });
    
    if (location.pathname === '/signup') {
      setSignupFormVisibility(true);
      trackUserJourney('signup_modal_opened', 'signup_flow', {
        modal_trigger: 'direct_navigation'
      });
    }
    else if(location.pathname === '/book-free-demo'){
      setCalendlyModalVisibility(true);
      trackUserJourney('demo_modal_opened', 'demo_flow', {
        modal_trigger: 'direct_navigation'
      });
    }
    else {
      setSignupFormVisibility(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <CalendlyPreloader />
      <Navigation setSignupFormVisibility={setSignupFormVisibility} setCalendlyModalVisibility={setCalendlyModalVisibility} />
      <Outlet context={{signupFormVisibility,calendlyModalVisibility, setSignupFormVisibility, setCalendlyModalVisibility }} />
      {signupFormVisibility && <SignupForm setCalendlyUser= {setCalendlyUser} setSignupFormVisibility={setSignupFormVisibility} setCalendlyModalVisibility={setCalendlyModalVisibility} />}
      <CalendlyModal user={calendlyUser} setCalendlyModalVisibility={setCalendlyModalVisibility} isVisible={calendlyModalVisibility}/>      
      <SalesPopup />
      <Footer />
    </div>
  );
}

export default App;





