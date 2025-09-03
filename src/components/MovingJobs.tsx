import React from 'react';
import { GTagUTM } from '../utils/GTagUTM.js';

interface MovingJobsProps {
  setSignupFormVisibility: (visible: boolean) => void;
}

interface Job {
  company: string;
  position: string;
  time: string;
  logo: string;
}

const MovingJobs: React.FC<MovingJobsProps> = ({ setSignupFormVisibility }) => {
 
    const jobs: Job[] = [
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
      },
      {  
        company: "Apple",
        position: "iOS Developer",
        time: "3 hours ago",
        logo: "📱"
      },
      {
        company: "Amazon",
        position: "Cloud Solutions Architect",
        time: "9 hours ago",
        logo: "📦"
      },
      {
        company: "Microsoft",
        position: "AI Research Scientist",
        time: "6 hours ago",
        logo: "💻"
      },
      {
        company: "Google",
        position: "Product Manager",
        time: "2 hours ago",
        logo: "🌐"
      },
      {
        company: "Meta",
        position: "Frontend Engineer",
        time: "15 hours ago",
        logo: "📘"
      },
      {
        company: "Netflix",
        position: "Data Engineer",
        time: "11 hours ago",
        logo: "🎬"
      },
      {
        company: "Tesla",
        position: "Machine Learning Engineer",
        time: "4 hours ago",
        logo: "🚗"
      },
      {
        company: "IBM",
        position: "Cybersecurity Analyst",
        time: "19 hours ago",
        logo: "🖥️"
      },
      {
        company: "Intel",
        position: "Hardware Engineer",
        time: "7 hours ago",
        logo: "🔌"
      },
      {
        company: "Oracle",
        position: "Database Administrator",
        time: "13 hours ago",
        logo: "☁️"
      },
      {
        company: "Adobe",
        position: "UX Designer",
        time: "10 hours ago",
        logo: "🎨"
      },
      {
        company: "Salesforce",
        position: "CRM Specialist",
        time: "21 hours ago",
        logo: "☁️"
      },
      {
        company: "Uber",
        position: "Backend Developer",
        time: "16 hours ago",
        logo: "🚖"
      },
      {
        company: "Airbnb",
        position: "Data Scientist",
        time: "14 hours ago",
        logo: "🏡"
      },
      {
        company: "LinkedIn",
        position: "Software Engineer",
        time: "20 hours ago",
        logo: "🔗"
      }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How FLASHFIRE Delivers These Results?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            AI automation, ATS resumes, recruiter targeting.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transition-transform duration-200 hover:shadow-2xl hover:scale-105">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-600 mb-3 sm:mb-4">200x</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Return on Investment
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Clients see 200x ROI with higher salaries, faster offers, and lasting growth.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transition-transform duration-200 hover:shadow-2xl hover:scale-105">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-600 mb-3 sm:mb-4">50k+</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
               Applications Sent Smartly
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                50k+ applications optimized with ATS resumes for maximum visibility and callbacks.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transition-transform duration-200 hover:shadow-2xl hover:scale-105">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-600 mb-3 sm:mb-4">1 Week</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                To Your First Interview Call
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Members get their first interview call in just 7 days. 
              </p>
            </div>
          </div>
        </div>

        {/* Moving Jobs Container - Fixed Animation */}
        <div className="relative  w-full">
          {/* Inline animation styles */}
          <style>
            {`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll {
                animation: scroll 60s linear infinite;
                display: flex;
                width: fit-content;
              }
              .animate-scroll:hover {
                animation-play-state: paused;
              }
            `}
          </style>
          
          <div className="flex space-x-4 sm:space-x-6 animate-scroll">
            {/* First set of jobs */}
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 sm:w-80 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl flex-shrink-0">{job.logo}</div>
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
                className="flex-shrink-0 w-72 sm:w-80 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-2xl sm:text-3xl flex-shrink-0">{job.logo}</div>
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
            onClick={() => {
              GTagUTM({
                eventName: 'sign_up_click',
                label: 'Moving_Jobs_Signup_Button',
                utmParams: {
                  utm_source: 'WEBSITE',
                  utm_medium: 'Moving_Jobs_Section',
                  utm_campaign: 'Moving_Jobs_Signup',
                },
              });
              setSignupFormVisibility(true);
            }}
            //className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:scale-105 text-sm sm:text-base"
          >
          
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovingJobs;