import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle, Loader2, Clock, Users, Target } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CalendlyModal({ setCalendlyModalVisibility }: { setCalendlyModalVisibility: (visible: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading after 5 seconds as fallback
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center z-10">
                <div className="text-center max-w-md mx-auto px-6">
                  {/* Animated Logo */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                      <Calendar className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Main Message */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Finding Your Perfect Time</h3>
                  <p className="text-gray-600 text-lg mb-8">We're analyzing our expert schedules to find the best consultation slots for you.</p>
                  
                  {/* Progress Indicators */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Checking availability...</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Matching with experts...</span>
                    </div>
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">Optimizing for your goals...</span>
                    </div>
                  </div>
                  
                  {/* Loading Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  
                  <p className="text-sm text-gray-500">This usually takes just a few seconds</p>
                </div>
              </div>
            )}
            <InlineWidget
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
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center z-10">
                <div className="text-center max-w-lg mx-auto px-8">
                  {/* Animated Logo */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center shadow-xl animate-pulse">
                      <Calendar className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Main Message */}
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Finding Your Perfect Time</h3>
                  <p className="text-gray-600 text-xl mb-10 leading-relaxed">We're analyzing our expert schedules to find the best consultation slots for you.</p>
                  
                  {/* Progress Indicators */}
                  <div className="space-y-5 mb-10">
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-lg">Checking availability...</span>
                    </div>
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-lg">Matching with experts...</span>
                    </div>
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-lg">Optimizing for your goals...</span>
                    </div>
                  </div>
                  
                  {/* Loading Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  
                  <p className="text-gray-500 text-lg">This usually takes just a few seconds</p>
                </div>
              </div>
            )}
            <InlineWidget
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendlyModal;
