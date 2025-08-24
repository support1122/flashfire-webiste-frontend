import React, { useState } from 'react';
import { Mail, Calendar, MessageCircle } from 'lucide-react';
import WhatsAppSupport from './WhatsappSupport.js';

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about FLASHFIRE? Our team is here to help you get started on your journey to landing your dream job.
          </p>
        </div>

        {/* Left: Contact Info + Why Choose */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email + Demo */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">Email Us</p>
                    <p className="text-gray-600 text-sm sm:text-base">support@flashfirejobs.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">Book a Demo</p>
                    <p className="text-gray-600 text-sm sm:text-base">Schedule a free consultation</p>
                  </div>
                </div>
              </div>

              {/* Why Choose FLASHFIRE */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 sm:p-8 rounded-2xl text-white shadow-lg">
                <h4 className="text-lg sm:text-xl font-bold mb-4">Why Choose FLASHFIRE?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">95%</div>
                    <div className="text-orange-100 text-xs sm:text-sm">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">150+</div>
                    <div className="text-orange-100 text-xs sm:text-sm">Hours Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">50+</div>
                    <div className="text-orange-100 text-xs sm:text-sm">Jobs Landed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                    <div className="text-orange-100 text-xs sm:text-sm">Help / Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WhatsAppSupport />
      </div>
    </section>
  );
};

export default Contact;
