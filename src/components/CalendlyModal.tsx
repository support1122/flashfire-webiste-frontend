import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import OptimizedCalendlyWidget from './OptimizedCalendlyWidget';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CalendlyModal({ setCalendlyModalVisibility }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isWidgetReady, setIsWidgetReady] = useState(false);

  // Preload Calendly widget when component mounts
  useEffect(() => {
    const preloadCalendly = () => {
      // Create a hidden iframe to preload Calendly
      const preloadIframe = document.createElement('iframe');
      preloadIframe.src = 'https://calendly.com/feedback-flashfire/30min';
      preloadIframe.style.display = 'none';
      preloadIframe.onload = () => {
        setIsWidgetReady(true);
        setIsLoading(false);
      };
      document.body.appendChild(preloadIframe);
      
      // Fallback timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    preloadCalendly();
  }, []);

  const handleWidgetLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center w-full">
      <div className="relative bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col lg:flex-row">
        {/* Close button */}
        <button
          onClick={() => setCalendlyModalVisibility(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/90 rounded-full p-2 shadow-lg"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Mobile Layout */}
        <div className="block lg:hidden h-full w-full">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Schedule Your Flashfire Consultation</h2>
                <p className="text-orange-100 text-sm">30 Minutes • Free</p>
              </div>
            </div>
          </div>

          {/* Calendar - Full Height */}
          <div className="bg-white relative" style={{ height: 'calc(100vh - 100px)' }}>
            <OptimizedCalendlyWidget
              url="https://calendly.com/feedback-flashfire/30min"
              styles={{
                height: '100%',
                width: '100%',
                minHeight: '400px',
              }}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: 'f97316',
                textColor: '374151',
              }}
              onLoad={handleWidgetLoad}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full h-[90vh]">
          {/* Orange Section (Info) */}
          <div className="w-2/5 bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white overflow-y-hidden rounded-l-xl">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Schedule Your Flashfire Consultation</h2>
                  <p className="text-orange-100">30 Minutes • Free</p>
                </div>
              </div>
              <p className="text-orange-100 text-lg leading-relaxed">
                Book your personalized consultation to learn how Flashfire can automate your job search and land interviews faster.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold mb-4">What You'll Get:</h3>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Personalized Strategy</h4>
                  <p className="text-orange-100 text-sm">Custom job search plan tailored to your goals</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Resume Review</h4>
                  <p className="text-orange-100 text-sm">Expert feedback on your current resume</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">AI Demo</h4>
                  <p className="text-orange-100 text-sm">See our automation technology in action</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-300 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Q&A Session</h4>
                  <p className="text-orange-100 text-sm">Get all your questions answered by experts</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-orange-100 text-xs">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-orange-100 text-xs">Jobs Landed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">220+</div>
                  <div className="text-orange-100 text-xs">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="w-3/5 bg-white overflow-hidden rounded-r-xl relative">
            <OptimizedCalendlyWidget
              url="https://calendly.com/feedback-flashfire/30min"
              styles={{
                height: '100%',
                width: '100%',
                minHeight: '100%',
              }}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: 'f97316',
                textColor: '374151',
              }}
              onLoad={handleWidgetLoad}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendlyModal;
