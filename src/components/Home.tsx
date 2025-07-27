import React, { useEffect } from 'react'
import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Contact from './Contact';
import SignupModal from './SignupModal';
import RealTimeMetrics from './RealTimeMetrics';
import MovingJobs from './MovingJobs';
import WhatsAppButton from './WhatsAppButton';
import Footer from './Footer';
import Blog from './Blog';

function Home() {

  (window as any).openSignupModal = (customStep = 1) => {
    const modal = document.getElementById('signup-modal');
      if (modal) {
      modal.classList.remove('hidden');
      setStep(customStep);
    }
  };
  useEffect(() => {
    
    openSignupModal(1);
  }, []);
  return (
    <div>
              <Navigation />
            <Hero />
            <MovingJobs />
            <RealTimeMetrics />
            <Features />
            <Blog />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
            <SignupModal />
            <WhatsAppButton />
                  <Footer />

    </div>
  )
}

export default Home
