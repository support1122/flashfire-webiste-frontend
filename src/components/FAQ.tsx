import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is there a refund policy if I'm not satisfied with the service?",
      answer: "We prioritize your satisfaction and offer prorated refunds if you're not happy with our service. A one-time fee of $150 covers resume building, dashboard setup, and admin costs. The remaining amount (up to $200 total) is refunded based on the number of job applications already processed. You only pay for what you receive, and we ensure it's worth it."
    },
    {
      question: "What if I don't receive any interview calls?",
      answer: "If you don't receive any interview calls by the end of your plan, we'll send 100+ extra applications and provide a free resume update. This promise is exclusive to our Premium Plan users. Your career is our priority — we won't leave you hanging."
    },
    {
      question: "Why should I pay for FlashFire when I can apply to jobs on my own?",
      answer: "FlashFire automates your entire job application process — from resume tailoring to mass applications and tracking. While you focus on interviews and skill-building, we apply to 1000+ high-matching roles on your behalf. Clients save ~200 hours and double their callback rate with us."
    },
    {
      question: "What is FlashFire's success rate?",
      answer: "Our users have a 90%+ chance of receiving interview calls within the first 4 weeks of using FlashFire. With targeted applications and optimized resumes, most land interviews faster than expected. Premium users see even stronger results."
    },
    {
      question: "How is FlashFire different from other job platforms?",
      answer: "Unlike typical job boards, we don't wait for you to apply — we apply for you, daily. Our AI + human experts personalize every resume and track each submission in your dashboard. No spam, no guessing, just results."
    },
    {
      question: "Can I track my job applications and progress?",
      answer: "Yes! Your personalized dashboard shows live updates on all job applications, statuses, and interview alerts. You'll always know where things stand, without chasing emails or spreadsheets."
    },
    {
      question: "Is FlashFire right for U.S. students and job seekers?",
      answer: "Absolutely. FlashFire is designed for OPT/CPT/H1B holders and international students. We know every application matters, and our team ensures you maximize your chances in a competitive U.S. market."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about FlashFire's AI-powered job search automation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white hover:bg-orange-50 transition-colors duration-200 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md"
            >
              <button
                className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 sm:px-8 pb-4 sm:pb-6">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-orange-100 mb-6 sm:mb-8 text-lg sm:text-xl max-w-2xl mx-auto">
              Our team is here to help you understand how FlashFire can transform your job search and save you 220+ hours every month.
            </p>
            <button
              onClick={() => {
                const modal = document.getElementById('signup-modal');
                if (modal) modal.classList.remove('hidden');
              }}
              className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:scale-105"
            >
              Schedule a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;