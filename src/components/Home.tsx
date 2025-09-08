import React, { useEffect } from 'react'
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
  const {setSignupFormVisibility, setCalendlyModalVisibility } = useOutletContext<{
    setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
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
  }else{
    const top = document.getElementById('home');
    top?.scrollIntoView({behavior: "smooth", block: "start"} );
  }
    

  },[location.pathname])
  
  // if(section == )

  return (
    <div>
            <Hero setSignupFormVisibility={setSignupFormVisibility}/>
            <MovingJobs setSignupFormVisibility={setSignupFormVisibility}/>
            <RealTimeMetrics />
            <Features setSignupFormVisibility={setSignupFormVisibility}/>
            <HowItWorks setSignupFormVisibility={setSignupFormVisibility}/>
            <Testimonials />
            <Pricing />
            <FAQ setSignupFormVisibility={setSignupFormVisibility}/>
            {/* <Contact setSignupFormVisibility={setSignupFormVisibility}/> */}
            <WhatsAppButton />
            

    </div>
  )
}

export default Home
