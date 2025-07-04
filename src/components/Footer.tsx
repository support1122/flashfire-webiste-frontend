import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-bold text-blue-400">ScoutBetter</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              We help professionals land their dream jobs by handling the entire application process, 
              saving you 220+ hours every month while delivering proven results.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">hello@scoutbetter.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-gray-300">San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#journey" className="text-gray-300 hover:text-white transition-colors">Your Journey</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#team" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join hundreds of professionals who saved 220+ hours monthly and landed their dream jobs
            </p>
            <a
              href="#pricing"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
            >
              Get Started for Free
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 ScoutBetter. All rights reserved. | Helping professionals save 220+ hours monthly since 2025.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;