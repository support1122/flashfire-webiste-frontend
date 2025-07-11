import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import SignupModal from './components/SignupModal';
import RealTimeMetrics from './components/RealTimeMetrics';
import MovingJobs from './components/MovingJobs';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <MovingJobs />
      <RealTimeMetrics />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <SignupModal />
      <WhatsAppButton />
    </div>
  );
}

export default App;