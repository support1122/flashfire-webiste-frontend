import React, { useState, useEffect, useRef } from 'react';
import { Mail, Calendar, MessageCircle } from 'lucide-react';
import WhatsAppSupport from './WhatsappSupport.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = ({ setSignupFormVisibility }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentRole: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- Animation state for Orange Box ----
  const orangeRef = useRef<HTMLDivElement | null>(null);
  const [orangeVisible, setOrangeVisible] = useState(false);

  useEffect(() => {
    const el = orangeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOrangeVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const requestToServer = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const responseFromServer = await requestToServer.json();
      console.log(responseFromServer);

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        currentRole: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Have questions about FLASHFIRE? Our team is here to help you get started on your journey
            to landing your dream job.
          </p>
        </div>

        {/* Two equal columns (White + Orange) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* White Box */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get Started Today</h3>
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
          </div>

          {/* Orange Box (Animated + Hover) */}
          <div
            ref={orangeRef}
            className={`
              bg-gradient-to-r from-orange-500 to-red-500
              p-6 sm:p-8 rounded-2xl text-white shadow-lg
              transition-all duration-500
              ${orangeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              hover:-translate-y-2 hover:shadow-2xl
            `}
          >
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

        {/* Contact Form (commented out) */}
      

        <WhatsAppSupport />
      </div>
    </section>
  );
};

export default Contact;
