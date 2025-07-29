import React from 'react';
import { GTagUTM } from '../utils/GTagUTM.js';
const MovingJobs = ({setSignupFormVisibility}) => {
  const jobs = [
    {
      company: "Redfin",
      position: "Senior Recruiter",
      time: "43 hours ago",
      logo: "🏠"
    },
    {
      company: "Motorola Solutions",
      position: "Software Engineer",
      time: "22 hours ago",
      logo: "📱"
    },
    {
      company: "Bank of America",
      position: "Senior Data Analyst",
      time: "5 hours ago",
      logo: "🏦"
    },
    {
      company: "Barclays",
      position: "Software Engineer",
      time: "17 hours ago",
      logo: "💳"
    },
    {
      company: "Goldman Sachs",
      position: "Quantitative Analyst",
      time: "8 hours ago",
      logo: "💰"
    },
    {
      company: "JPMorgan Chase",
      position: "Full Stack Developer",
      time: "12 hours ago",
      logo: "🏛️"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Never Miss Out On New Jobs Again.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Join The Largest Job Board!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">200,000+</div>
              <p className="text-gray-600 text-sm sm:text-base">New U.S. Jobs Daily</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">5,000,000+</div>
              <p className="text-gray-600 text-sm sm:text-base">Verified Active Listings</p>
            </div>
          </div>
        </div>

        {/* Moving Jobs Container - Improved Mobile */}
        <div className="relative">
          <div className="flex animate-scroll space-x-4 sm:space-x-6">
            {/* First set of jobs */}
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 min-w-[280px] sm:min-w-[320px]"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl">{job.logo}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{job.company}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">{job.position}</p>
                    <p className="text-xs text-gray-500">{job.time}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {jobs.map((job, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 min-w-[280px] sm:min-w-[320px]"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl">{job.logo}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{job.company}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">{job.position}</p>
                    <p className="text-xs text-gray-500">{job.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => {GTagUTM({
                                  eventName: 'sign_up_click',
                                  label: 'Moving_Jobs_Signup_Button',
                                  utmParams: {
                                    utm_source: 'WEBSITE',
                                    utm_medium: 'Moving_Jobs_Section',
                                    utm_campaign: 'Moving_Jobs_Signup',
                                  },
                                });
                                setSignupFormVisibility(true); // just opens modal/form
                              }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            Apply to These Jobs Automatically
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovingJobs;