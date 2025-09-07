import React from 'react'
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Contact from './Contact';
import RealTimeMetrics from './RealTimeMetrics';
import MovingJobs from './MovingJobs';
import WhatsAppButton from './WhatsAppButton';
import { useOutletContext, useNavigate, Link, Location, useLocation } from 'react-router-dom';


function Home() {
  const { signupFormVisibility,calendlyModalVisibility,setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  }>();

  return (
    <div>
            <Hero setCalendlyModalVisibility={setCalendlyModalVisibility} setSignupFormVisibility={setSignupFormVisibility}/>
            <MovingJobs setSignupFormVisibility={setSignupFormVisibility}/>
            <RealTimeMetrics setSignupFormVisibility={setSignupFormVisibility}/>
            <Features setSignupFormVisibility={setSignupFormVisibility}/>
            <HowItWorks setSignupFormVisibility={setSignupFormVisibility}/>
            <Testimonials />
            <Pricing />
            <FAQ setSignupFormVisibility={setSignupFormVisibility}/>
            <Contact setSignupFormVisibility={setSignupFormVisibility}/>
            <WhatsAppButton />
            

    </div>
  )
}

export default Home
