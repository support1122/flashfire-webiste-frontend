import React from "react";
import { GTagUTM } from "../utils/GTagUTM.ts";
export default function WhatsAppSupport() {

  const handleWhatsAppClick = () => {
    const phoneNumber = '919817349846'; // Your phone number with country code
    const message = encodeURIComponent('Hi! I\'m interested in Flashfire\'s AI-powered job search automation. Can you help me get started?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <div className="flex m-10  items-center justify-between bg-white shadow-md rounded-lg p-10 border border-gray-200 max-w-4xl mx-auto">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <div className="bg-green-500 rounded-full p-3 animate-wave">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Still Confused?
          </h3>
          <p className="text-gray-600 text-sm">
            Feel free to post your queries over our Whatsapp Support
          </p>
        </div>
      </div>

      {/* Right Side Button */}
      <button
        onClick={() => {      handleWhatsAppClick();
                                GTagUTM({
                                  eventName: 'WhatsApp_Support_Click',
                                  label: 'Whatsapp_Support_Button',
                                  utmParams: {
                                    utm_source: 'WEBSITE',
                                    utm_medium: 'Website_HowItWorks_section',
                                    utm_campaign: 'Website',
                                  },
                                });
                                // setSignupFormVisibility(true);
                              }}
        // href="https://wa.me/919817349846?text=Hi%20I%20need%20assistance%20regarding%20FlashFireJobs"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all"
      >
        Ask Your Query
      </button>
    </div>
  );
}
