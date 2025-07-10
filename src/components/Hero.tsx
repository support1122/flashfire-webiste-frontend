import React, { useState } from 'react';
import { ArrowRight, Sparkles, Target, Clock, Users, Phone } from 'lucide-react';
// import SignupModal from './SignupModal';



const Hero = ({openModal, closeModal}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  let [mobile, setMobile] = useState('');
  let [countryCode, setCountryCode] = useState('+1'); // Default to USA code
  // let [modalStep, setModalStep] = useState(1); // Step for the modal
  const countryCodes = [
    { code: '+1', country: 'USA', pattern: /^1/, flag: "🇺🇸" },
    { code: '+91', country: 'India', pattern: /^91/, flag: "in" }
  ];




  async function handleMobileForm() {
  try {
    if (mobile.length === 10) {
      openModal(2, mobile);
      const reqToServer = await fetch('https://api.flashfirejobs.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: countryCode + mobile }),
      });

      const responseFromServer = await reqToServer.json();
      console.log(responseFromServer);

      // ✅ Show modal & set step 2
      // setModalStep(2);
      // setModalVisible(true);
    }
  } catch (error) {
    console.error(error);
  }
}
  // const openModal = () => {
  //   const modal = document.getElementById('signup-modal');
  //   if (modal) modal.classList.remove('hidden');
  //   if( mobile.length === 10){
      
  //   }
  // };

  return (
    <section id="home" className=" relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50  overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-100/40 to-red-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 flex justify-center items-center">
        <div className="text-center flex flex-col items-center justify-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
            <span className="text-orange-800 text-xs sm:text-sm font-medium">Save 150+ Hours Every Month</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8 px-2">
            Land Your Dream Jobs
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              in USA 10x Faster
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Expert Team Applies to{' '}
            <span className="text-orange-600 font-semibold">1000+ USA Jobs</span>{' '}
            Tailored for International Students & Professionals in 6-7 Weeks
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:w-fit md:w-fit gap-3 sm:gap-4 justify-center shadow-lg w-fit items-center mb-4 sm:mb-16 px-4 border bg-white border-black  rounded-3xl pt-5 pb-5">
            <div className='space-y-1 w-full '>
                
                  <div className="flex  flex-col items-center justify-center md:flex-col sm:flex-col space-y-2 sm:space-y-0 sm:space-x-2  ">
                      <div className='space-y-2 w-full  flex flex-col items-center'>
                        {/* <Phone className="w-full h-4 inline mr-2" /> Phone Number (10 digits only) */}
                        <div className='flex w-fit max-w-[600px] gap-4'>
                            <select 
                          name="countryCode" 
                          value={countryCode} 
                          onChange={(e)=>setCountryCode(e.target.value)} 
                          className="px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code} ({country.country})
                            </option>
                          ))}
                        </select>
                        <input 
                            type="tel" 
                          name="phone" 
                          value={mobile} 
                        onChange={(e)=>setMobile(e.target.value)} 
                          className="flex-1 border-2  px-4 py-4 bg-gray-50  border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base" 
                          placeholder='Enter 10-digit phone number' 
                          pattern="[0-9]{10}" 
                          inputMode="numeric" 
                          maxLength={10} 
                          required 
                        />
                        </div>
                  </div>
                <div>
             <button
              onClick={handleMobileForm}
              className="group mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-3xl font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
                   {/* {formData.phone && formData.phone.length !== 10 && ( */}
               { (mobile.length>0 && mobile.length<10) && <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>}
               {/* // )} */}
                </div>
                
              </div>
                </div>
                
            
            
          </div>
          <a
              href="#how-it-works"
              className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 w-full sm:w-auto text-center"
            >
              See How It Works
            </a>
          
          {/* Benefits List - Improved Mobile Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12 sm:mb-16 px-4 mt-6">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">ATS-Optimized Resumes</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Tailored for success</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Active Job Hunt</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Applied consistently for you</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Tailored Applications</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Custom resume per job</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Save 150+ Hours</h3>
              <p className="text-gray-600 text-xs sm:text-sm">We apply. You prepare.</p>
            </div>
          </div>

          {/* No Credit Card Required */}
          {/* <p className="text-gray-500 text-sm sm:text-base lg:text-lg px-4">
            No credit card required • Cancel anytime
          </p> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-gray-500 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
      {/* {modalVisible && <SignupModal mobile={mobile} whichState={modalStep} onClose={()=>setModalVisible(false)} />
        } */}
    </section>
  );
};

export default Hero;