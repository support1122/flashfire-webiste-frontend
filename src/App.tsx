import React ,{useState, useEffect} from 'react';
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

const [modalStep, setModalStep] = useState(1);
const [mobile, setMobile] = useState('');
const [isModalVisible, setIsModalVisible] = useState(false);

const openModal = (step = 1, mobileNumber = '') => {
  setModalStep(step);
  setMobile(mobileNumber);
  setIsModalVisible(true);
};

const closeModal = () => {
  setIsModalVisible(false);
  setModalStep(1);
  setMobile('');
  console.log('triggered')
};
  return (
    
    <div className="min-h-screen bg-white">
      {isModalVisible && (
  <SignupModal openModal={openModal} whichState={modalStep} closeModal={closeModal} />
)}
      <Navigation openModal={openModal} />
      <Hero openModal={openModal} closeModal={closeModal} />
      <MovingJobs openModal={openModal}/>
      <RealTimeMetrics openModal={openModal} />
      <Features openModal={openModal} />
      <HowItWorks openModal={openModal} />
      <Testimonials />
      <Pricing openModal={openModal}/>
      <FAQ openModal={openModal}/>
      <Contact openModal={openModal}/>
      {/* <SignupModal /> */}
      <WhatsAppButton />
    </div>
  );
}

export default App;