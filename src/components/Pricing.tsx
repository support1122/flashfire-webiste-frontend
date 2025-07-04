import React from 'react';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const Pricing = () => {
  const openModal = () => {
    const modal = document.getElementById('signup-modal');
    if (modal) modal.classList.remove('hidden');
  };

  const plans = [
    {
      name: "Ignite",
      icon: <Zap className="w-6 h-6" />,
      applications: "250",
      price: "$249",
      originalPrice: "$349",
      popular: false,
      description: "Perfect for entry-level professionals",
      features: [
        "AI-powered job matching",
        "250 tailored applications",
        "Resume optimization",
        "Basic analytics dashboard",
        "Email support",
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      icon: <Crown className="w-6 h-6" />,
      applications: "500",
      price: "$399",
      originalPrice: "$499",
      popular: true,
      description: "Most popular for mid-level professionals",
      features: [
        "Everything in Ignite",
        "500 tailored applications",
        "Priority job matching",
        "Advanced analytics & insights",
        "LinkedIn profile optimization",
        "Priority support",
        "Interview preparation tips",
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Executive",
      icon: <Rocket className="w-6 h-6" />,
      applications: "1000",
      price: "$649",
      originalPrice: "$749",
      popular: false,
      badge: "Best Value",
      description: "For senior professionals & executives",
      features: [
        "Everything in Professional",
        "1000 tailored applications",
        "Executive-level job targeting",
        "Personal career consultant",
        "Salary negotiation support",
        "Custom cover letters",
        "Network introduction requests",
      ],
      cta: "Start Free Trial"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Choose Your Career Acceleration Plan
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
            All plans include our AI-powered job matching and application automation. 
            <span className="text-orange-600 font-semibold"> Save 220+ hours monthly</span> while we work for you 24/7.
          </p>
          
          {/* Discount Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">🔥 Early Bird Special - 20% OFF</h3>
            <p className="text-orange-100">Limited time offer. No code needed!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular 
                  ? 'border-orange-500 scale-100 lg:scale-105 ring-4 ring-orange-500/20' 
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 Most Popular
                  </span>
                </div>
              )}

              {plan.badge && !plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    💎 {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className={`inline-flex items-center space-x-2 p-3 rounded-2xl mb-4 ${
                    plan.popular ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {plan.icon}
                    <span className="font-semibold">{plan.name}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                      <div className="text-left">
                        <div className="text-gray-400 line-through text-sm">{plan.originalPrice}</div>
                        <div className="text-gray-600 text-sm">per month</div>
                      </div>
                    </div>
                    <p className="text-orange-600 font-semibold text-sm mt-1">
                      {plan.applications} applications included
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={openModal}
                  className={`w-full py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105'
                  }`}
                >
                  {plan.cta}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              💯 30-Day Money-Back Guarantee
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Not satisfied with your results? Get a full refund within 30 days. We're confident FLASHFIRE will transform your job search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200"
              >
                Have Questions? Contact Us
              </a>
              <a
                href="#features"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Learn More About Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;