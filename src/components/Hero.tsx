import { useState, useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { GTagUTM } from "../utils/GTagUTM.js"
import { useNavigate } from "react-router-dom"
import { 
  trackButtonClick, 
  trackSignupIntent, 
  trackSectionView,
  trackPageView 
} from "../utils/PostHogTracking.ts"
import { navigateWithUTM } from "../utils/UTMUtils"

const Hero = ({ setSignupFormVisibility }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const successMatrixRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSuccessMatrixVisible(true)
          trackSectionView("success_matrix", {
            section: "hero_success_metrics"
          })
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px" },
    )
    if (successMatrixRef.current) observer.observe(successMatrixRef.current)
    
    trackPageView("hero", "home", {
      section: "hero_landing"
    })
    
    return () => {
      clearTimeout(timer)
      if (successMatrixRef.current) observer.unobserve(successMatrixRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        /* Existing animations */
        @keyframes wave1 {
          0% { transform: translateX(-80%) translateY(-60%) rotate(0deg); opacity: 0; }
          10% { opacity: 0.4; }
          50% { transform: translateX(-60%) translateY(-80%) rotate(180deg); opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateX(-80%) translateY(-60%) rotate(0deg); opacity: 0; }
        }
        @keyframes wave2 {
          0% { transform: translateX(60%) translateY(-60%) rotate(180deg); opacity: 0; }
          15% { opacity: 0.35; }
          50% { transform: translateX(80%) translateY(-40%) rotate(360deg); opacity: 0.35; }
          85% { opacity: 0.35; }
          100% { transform: translateX(60%) translateY(-60%) rotate(180deg); opacity: 0; }
        }
        @keyframes wave3 {
          0% { transform: translateX(-70%) translateY(40%) rotate(0deg); opacity: 0; }
          20% { opacity: 0.3; }
          33% { transform: translateX(-50%) translateY(60%) rotate(120deg); opacity: 0.3; }
          66% { transform: translateX(-90%) translateY(50%) rotate(240deg); opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateX(-70%) translateY(40%) rotate(0deg); opacity: 0; }
        }
        @keyframes wave4 {
          0% { transform: translateX(70%) translateY(50%) rotate(0deg); opacity: 0; }
          25% { opacity: 0.25; }
          50% { transform: translateX(90%) translateY(70%) rotate(180deg); opacity: 0.25; }
          75% { opacity: 0.25; }
          100% { transform: translateX(70%) translateY(50%) rotate(0deg); opacity: 0; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .scroll-bounce { animation: scrollBounce 2s ease-in-out infinite; }

        /* ✅ New: Moving Company Names Animation */
        @keyframes companyScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .company-ticker {
          position: absolute;
          bottom: 70px;
          left: 0;
          width: 100%;
          overflow: hidden;
          background: transparent;
          z-index: 5;
        }
        .company-track {
          display: flex;
          gap: 1.5rem;
          white-space: nowrap;
          animation: companyScroll 28s linear infinite;
        }
        .company-item {
          display: inline-block;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(249, 115, 22, 0.2);
          color: #333;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(249, 115, 22, 0.15);
          transition: transform 0.3s ease;
        }
        .company-item:hover { transform: scale(1.05); }
      `}</style>

      {/* ---------------- HERO SECTION ---------------- */}
      <section
        id="home"
        className="relative pb-4 h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="wave-bg" />
          <div className="wave-bg-2" />
          <div className="wave-bg-3" />
          <div className="wave-bg-4" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 lg:mb-20 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="text-orange-800 text-xs sm:text-sm font-medium">
                Save 150+ Hours Every Month
              </span>
            </div>

            <h1
              className={`relative -top-[18px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-black leading-snug mb-6 sm:mb-8 px-2 text-center transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <span className="block">Land 15+ Interview Calls with Us</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Powered by Flashfire AI.
              </span>
            </h1>

            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-2xl text-[#333333] tracking-tight mb-12 sm:mb-12 max-w-[1100px] mx-auto leading-snug px-4 text-center lg:mb-14 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              We apply to <span className="text-orange-600 font-bold">1,200+ USA jobs</span> and track everything — so
              you can focus on interviews.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            >
              <button
                type="button"
                onClick={() => {
                  try {
                    GTagUTM({
                      eventName: "sign_up_click",
                      label: "Hero_Start_Free_Trial_Button",
                      utmParams: {
                        utm_source: "WEBSITE",
                        utm_medium: "Website_Front_Page",
                        utm_campaign: "Website",
                      },
                    });
                  } catch {}
                  trackButtonClick("Start My 7-Day Free Trial", "hero_cta", "cta", {
                    button_location: "hero_main_cta",
                    section: "hero_landing",
                  });
                  trackSignupIntent("hero_cta", {
                    signup_source: "hero_main_button",
                    funnel_stage: "signup_intent",
                  });
                  navigateWithUTM("/signup", navigate);
                }}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Moving Company Names Bar */}
        <div className="company-ticker">
          <div className="company-track">
            {[
              "Google",
              "Amazon",
              "Meta",
              "Microsoft",
              "Tesla",
              "Netflix",
              "Adobe",
              "Salesforce",
              "Apple",
              "NVIDIA",
              "Uber",
              "Airbnb",
              "Stripe",
              "Shopify",
              "Oracle",
              "Intel",
              "IBM",
              "Cisco",
              "Zoom",
              "Spotify",
            ].map((name, idx) => (
              <span key={idx} className="company-item">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-bounce">
          <div className="w-8 h-12 border-3 border-orange-500 rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-2 h-4 bg-orange-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Success Matrix Section (unchanged) */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* ... existing success matrix code ... */}
      </section>
    </>
  )
}

export default Hero
