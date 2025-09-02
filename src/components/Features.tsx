import React from 'react';
import { Bot, FileText, Target, Zap, Shield, BarChart3, Linkedin } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { GTagUTM } from '../utils/GTagUTM.js';
import WhatsAppButton from './WhatsAppButton.js';
import WhatsAppSupport from './WhatsappSupport.js';
const Features = ({setSignupFormVisibility}) => {
  // const { setSignupFormVisibility } = useOutletContext<{
  //   setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  // }>();
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-orange-500" />,
      title: "AI-Powered Matching",
      description: "Custom resumes crafted for each job using real-time data, keywords, and AI insights.",
      highlight: "Smart Algorithm"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      title: "Dynamic Resume Optimization",
      description: "Automatically tailors your resume for each application using industry-specific formatting and ATS-friendly keywords.",
      highlight: "ATS Optimized"
    },
    {
      icon: <Linkedin className="w-8 h-8 text-blue-600" />,
      title: "LinkedIn Profile Optimization",
      description: "We professionally optimize your LinkedIn profile to boost recruiter visibility and align with your job search goals.",
      highlight: "Personal Branding"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: "Precision Targeting",
      description: "Only apply to jobs that match your salary, location, company size, and career preferences.",
      highlight: "Quality Over Quantity"
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: "Lightning Fast Applications",
      description: "Applications submitted within hours of postings going live — giving you the first-mover advantage.",
      highlight: "Speed Matters"
    },
    {
  icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
  title: "Dashboard & Analytics",
  description: "Access a personalized dashboard to track applications, monitor success rates, and get real-time insights to improve your job search strategy.",
  highlight: "Live Insights"
}
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Powered by Advanced AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose FLASHFIRE?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of job searching with our cutting-edge AI technology that works 24/7 to land you the perfect role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {feature.highlight}
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Time Savings Highlight */}
        {/* <div className="mt-12 sm:mt-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Save 150+ Hours Every Month
          </h3>
          <p className="text-lg sm:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            While our AI handles job applications, resume optimization, and tracking, you focus on interviews, skill-building, and networking.
          </p>
          <button
            onClick={() => {GTagUTM({
                                  eventName: 'sign_up_click',
                                  label: 'Features_Section_Button',
                                  utmParams: {
                                    utm_source: 'WEBSITE',
                                    utm_medium: 'FEATURES_SECTION_SIGNUP_BUTTON',
                                    utm_campaign: 'WEBSITE',
                                  }
                                });
                                setSignupFormVisibility(true); // just opens modal/form
                              }}
            className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
          >
            Start Saving Time Today
          </button>
        </div> */}
      <WhatsAppSupport/>
      </div>
    </section>
  );
};

export default Features;
