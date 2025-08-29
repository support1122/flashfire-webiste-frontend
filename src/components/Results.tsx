import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';

const Results = () => {
  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      percentage: "91%",
      description: "Clients get calls within a month"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      percentage: "85%",
      description: "Land jobs in 3 months"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      percentage: "0.5%",
      description: "Applications = interview"
    }
  ];

  const companies = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix", "Tesla", "Spotify"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            Proven Results That Speak for Themselves
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.percentage}
                </div>
                <p className="text-gray-600 font-medium">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Our Clients Get Hired at Top Companies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg p-4 text-center"
              >
                <span className="text-gray-700 font-semibold text-sm">
                  {company}
                </span>
              </div>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <p className="text-blue-800 font-semibold text-lg mb-4">
              Ready to join our success stories?
            </p>
            <a
              href="#pricing"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Journey Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;