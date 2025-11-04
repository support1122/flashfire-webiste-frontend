import React, { useEffect } from 'react'
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing.tsx';
import FAQ from './FAQ';
import Contact from './Contact';
import MovingJobs from './MovingJobs';
import WhatsAppButton from './WhatsAppButton';
import { useOutletContext, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import { trackPageView } from '../../utils/PostHogTracking.ts';


function Home() {
  const location = useLocation();

  useEffect(() => {
    // Track page view (regular tracking)
    trackPageView('canada_home', location.pathname, {
      page_url: location.pathname,
      page_title: document.title
    });
    
    // Track Canada-specific page view
    try {
      if (typeof posthog !== 'undefined' && posthog.capture) {
        posthog.capture('canada_page_view', {
          page_name: "canada_home",
          page_url: location.pathname,
          page_title: document.title,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Canada page view tracking error:', error);
    }
  }, [location.pathname]);
  const {setSignupFormVisibility, handleSignupAttempt } = useOutletContext<{
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    handleBookingAttempt?: () => boolean,
    handleSignupAttempt?: () => boolean,
  }>();
  const section = useLocation().pathname;
  useEffect(()=>{
    console.log(section);
  if(section.includes('testimonials')){
    const testimonials = document.getElementById('testimonials');
    testimonials?.scrollIntoView({behavior: "smooth", block: "start"} );
  }
  else if(section.includes('features')){
    const features = document.getElementById('features');
    features?.scrollIntoView({behavior: "smooth", block: "start"} );
  }
  else if(section.includes('pricing')){
    const pricing = document.getElementById('pricing');
    pricing?.scrollIntoView({behavior: "smooth", block: "start"} ); 
  }
  else if(section.includes('faq')){
    const faq = document.getElementById('faq');
    faq?.scrollIntoView({behavior: "smooth", block: "start"} ); 
  }
  else if(section.includes('home')){
    const top = document.getElementById('home');
    top?.scrollIntoView({behavior: "smooth", block: "start"} );
  }
  else{
    const top = document.getElementById('home');
    top?.scrollIntoView({behavior: "smooth", block: "start"} );
  }
    

  },[location.pathname])
  
  // if(section == )

  return (
    <div>
            <Hero setSignupFormVisibility={setSignupFormVisibility} handleSignupAttempt={handleSignupAttempt}/>
            <MovingJobs setSignupFormVisibility={setSignupFormVisibility} handleSignupAttempt={handleSignupAttempt}/>
            {/* <RealTimeMetrics /> */}
            <Features setSignupFormVisibility={setSignupFormVisibility}/>
            <HowItWorks setSignupFormVisibility={setSignupFormVisibility} handleSignupAttempt={handleSignupAttempt}/>
            <Testimonials />
            <Pricing />
            <FAQ setSignupFormVisibility={setSignupFormVisibility} handleSignupAttempt={handleSignupAttempt}/>
            <Contact setSignupFormVisibility={setSignupFormVisibility}/>
            <WhatsAppButton />
            

    </div>
  )
}

export default Home
