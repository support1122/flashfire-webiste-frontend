import React from 'react';
import { Bot, FileText, Target, Zap, Shield, BarChart3, Linkedin } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { GTagUTM } from '../utils/GTagUTM.js';
import WhatsAppButton from './WhatsAppButton.js';
import WhatsAppSupport from './WhatsappSupport.js';
const screenshots = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
  "/images/image11.jpg",
  "/images/image12.png",
  // Add more image paths as needed
]

const rotations = [
  "rotate-2",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-3",
  "-rotate-3",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
]
const Features = ({ setSignupFormVisibility }) => {
  // const { setSignupFormVisibility } = useOutletContext<{
  //   setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  // }>();
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-orange-500" />,
      title: "AI-Powered Matching",
      description: "For each and every application, your base resume is automatically optimized to the job description with ATS-friendly keywords and skills.",
      highlight: "Smart Algorithm"
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      title: "Dynamic Resume Optimization",
      description: "We build your base resume from scratch and tailor it for each job, making it ATS-friendly and recruiter-visible.",
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
      description: "We only apply to jobs that fit your pay, location, company size, and career goals — and only to jobs posted in the last 24–48 hours.",
      highlight: "Quality Over Quantity"
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: "Lightning Fast Applications",
      description: "Our team applies to 1,200+ jobs within just 6–7 weeks, sending applications within hours of postings so you get the first-mover advantage.",
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
       <section className="relative mt-20 py-24 px-6 overflow-hidden  rounded-3xl ">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.05),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.05),transparent_50%)]"></div>

          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-orange-100 backdrop-blur-sm border border-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <span className="text-red-500">❤️</span>
                <span>Client Success Stories</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 text-balance">
                What Our Clients Say
              </h2>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover how we've helped 100+ professionals land their dream jobs at
                <span className="font-semibold text-gray-800"> Amazon, Google, Microsoft</span>, and other top companies
              </p>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 [column-fill:_balance]">
              {screenshots.map((src, index) => (
                <div
                  key={index}
                  className={`mb-2 inline-block w-full rounded-xl shadow-md transform ${rotations[index % rotations.length]} hover:rotate-0 transition-all duration-300 bg-orange-50 border border-gray-100 p-2`}
                >
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Testimonial ${index + 1}`}
                    className="rounded-lg w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <WhatsAppSupport />
      </div>
    </section>
  );
};

export default Features;
