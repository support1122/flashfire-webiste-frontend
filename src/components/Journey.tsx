import React from 'react';
import { Calendar, FileText, Send, RefreshCw } from 'lucide-react';

const Journey = () => {
  const weeks = [
    {
      week: "Week 1",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Resume Crafting by FAANG Experts",
      description: "Our expert team creates a compelling, ATS-optimized resume tailored to your target roles and industry standards.",
      highlight: "Professional resume ready"
    },
    {
      week: "Week 2",
      icon: <Send className="w-8 h-8 text-green-600" />,
      title: "Tailored Job Applications (100+)",
      description: "We begin applying to relevant positions with customized cover letters and resume variations for each application.",
      highlight: "100+ applications sent"
    },
    {
      week: "Week 3-4",
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Continue Applying to 400+ Jobs",
      description: "Accelerated application process targeting high-potential opportunities across multiple platforms and job boards.",
      highlight: "400+ total applications"
    },
    {
      week: "Week 5-7",
      icon: <RefreshCw className="w-8 h-8 text-orange-600" />,
      title: "Switch Resume & Apply to Next 500",
      description: "If needed, we optimize your resume based on market feedback and continue with fresh applications to reach our 1000+ goal.",
      highlight: "1000+ applications completed"
    }
  ];

  return (
    <section id="journey" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven 6-7 week process that gets you hired while you save{' '}
            <span className="text-orange-600 font-semibold">220+ hours every month</span>
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-green-200 via-purple-200 to-orange-200"></div>

          <div className="space-y-12">
            {weeks.map((week, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full z-10"></div>

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="flex items-center mb-4">
                      {week.icon}
                      <span className="ml-3 text-lg font-bold text-gray-900">{week.week}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {week.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {week.description}
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-blue-800 font-semibold text-sm">
                        ✓ {week.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile timeline indicator */}
                <div className="lg:hidden w-12 flex-shrink-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Success Journey?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join hundreds of professionals who landed their dream jobs in just 6-7 weeks
            </p>
            <a
              href="#pricing"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;