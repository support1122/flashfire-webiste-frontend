<<<<<<< HEAD
import { useState, useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { GTagUTM } from "../utils/GTagUTM.js"

const Hero = ({ setSignupFormVisibility }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const successMatrixRef = useRef<HTMLDivElement>(null)
=======
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users, Clock, Briefcase } from "lucide-react";
import { GTagUTM } from "../utils/GTagUTM";

// Type for CountUp props
type CountUpProps = {
  end: string | number;
  duration?: number;
  isVisible: boolean;
};
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b

// CountUp Component
const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = Number.parseInt(end.toString().replace(/[^0-9]/g, ""));

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  const formatCount = (num: number) => {
    const originalStr = end.toString();
    if (originalStr.includes("+")) return `${num}+`;
    return num;
  };

  return <span>{formatCount(count)}</span>;
};

// Type for Hero props
type HeroProps = {
  setSignupFormVisibility: (visible: boolean) => void;
};

// Type for Metrics
type Metrics = {
  jobsApplying: number;
  interviewsToday: number;
  activeUsers: number;
  totalApplications: number;
};

// Hero Component
const Hero: React.FC<HeroProps> = ({ setSignupFormVisibility }) => {
  const [isSuccessMatrixVisible, setIsSuccessMatrixVisible] = useState<boolean>(false);
  const successMatrixRef = useRef<HTMLDivElement | null>(null);

  const [metrics, setMetrics] = useState<Metrics>({
    jobsApplying: 24,
    interviewsToday: 6,
    activeUsers: 48,
    totalApplications: 210,
  });

  // Intersection Observer
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSuccessMatrixVisible(true)
      },
<<<<<<< HEAD
      { threshold: 0.05, rootMargin: "100px 0px" },
    )
    if (successMatrixRef.current) observer.observe(successMatrixRef.current)
=======
      { threshold: 0.05, rootMargin: "100px 0px" }
    );

    if (successMatrixRef.current) observer.observe(successMatrixRef.current);
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
    return () => {
      clearTimeout(timer)
      if (successMatrixRef.current) observer.unobserve(successMatrixRef.current)
    }
  }, [])

  // Update metrics every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        jobsApplying: Math.min(prev.jobsApplying + Math.floor(Math.random() * 2), 150),
        interviewsToday: Math.min(prev.interviewsToday + (Math.random() < 0.15 ? 1 : 0), 15),
        activeUsers: Math.min(prev.activeUsers + (Math.random() > 0.7 ? 1 : 0), 100),
        totalApplications: Math.min(prev.totalApplications + Math.floor(Math.random() * 4), 300),
      }));
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const metricsData = [
    {
      icon: <Clock className="w-7 h-7 text-orange-600" />,
      label: "Jobs being applied now",
      value: `${metrics.jobsApplying}+`,
    },
    {
      icon: <Users className="w-7 h-7 text-green-600" />,
      label: "Users got interviews today",
      value: metrics.interviewsToday,
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-purple-600" />,
      label: "Active job seekers",
      value: `${metrics.activeUsers}+`,
    },
    {
      icon: <Briefcase className="w-7 h-7 text-red-600" />,
      label: "Total applications sent",
      value: `${metrics.totalApplications}+`,
    },
  ];

  return (
    <>
<<<<<<< HEAD
      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(-100%) translateY(0px) rotate(0deg); }
          50% { transform: translateX(100vw) translateY(-20px) rotate(180deg); }
        }
        
        @keyframes wave2 {
          0%, 100% { transform: translateX(100vw) translateY(0px) rotate(180deg); }
          50% { transform: translateX(-100%) translateY(-30px) rotate(360deg); }
        }
        
        @keyframes wave3 {
          0%, 100% { transform: translateX(-50%) translateY(0px) rotate(0deg); }
          33% { transform: translateX(50vw) translateY(-15px) rotate(120deg); }
          66% { transform: translateX(150vw) translateY(-25px) rotate(240deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .wave-bg {
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, rgba(249, 115, 22, 0.4), rgba(239, 68, 68, 0.3));
          border-radius: 50%;
          animation: wave1 40s ease-in-out infinite;
        }
        
        .wave-bg-2 {
          position: absolute;
          width: 150%;
          height: 150%;
          background: linear-gradient(-45deg, rgba(249, 115, 22, 0.35), rgba(239, 68, 68, 0.25));
          border-radius: 50%;
          animation: wave2 50s ease-in-out infinite;
          animation-delay: -5s;
        }
        
        .wave-bg-3 {
          position: absolute;
          width: 180%;
          height: 180%;
          background: linear-gradient(90deg, rgba(249, 115, 22, 0.3), rgba(239, 68, 68, 0.2));
          border-radius: 50%;
          animation: wave3 60s ease-in-out infinite;
          animation-delay: -10s;
        }
        
        .floating-element {
          animation: float 12s ease-in-out infinite;
        }
        
        .slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .slide-in-down {
          animation: slideInDown 0.6s ease-out forwards;
        }
        
        .fade-in-scale {
          animation: fadeInScale 0.7s ease-out forwards;
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .scroll-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main Hero Section - 100vh */}
=======
      {/* Hero Section */}
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
      <section
        id="home"
        className="relative pt-20 pb-2 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden"
      >
<<<<<<< HEAD
        <div className="absolute inset-0 pointer-events-none">
          <div className="wave-bg opacity-60" />
          <div className="wave-bg-2 opacity-50" />
          <div className="wave-bg-3 opacity-40" />
=======
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-red-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-orange-100/40 to-red-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 text-center flex-1 flex flex-col justify-center">
            {/* Badge */}
<<<<<<< HEAD
            <div
              className={`inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 lg:mb-20 transition-all duration-500 ${isLoaded ? "slide-in-down opacity-100" : "opacity-0"}`}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
              <span className="text-orange-800 text-xs sm:text-sm font-medium">Save 150+ Hours Every Month</span>
            </div>

            {/* Main Headline */}
            <h1
              className={`relative -top-[18px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-black leading-snug mb-6 sm:mb-8 px-2 text-center transition-all duration-700 ${isLoaded ? "fade-in-scale opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
=======
            <div className="inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-orange-800 text-sm font-medium">Save 150+ Hours Every Month</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl font-bold text-black leading-snug mb-6">
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
              <span className="block">Land 15+ Interview Calls with Us</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Powered by Flashfire AI.
              </span>
            </h1>

            {/* Subtext */}
<<<<<<< HEAD
            <p
              className={`text-lg sm:text-xl md:text-2xl lg:text-2xl text-[#333333] tracking-tight mb-12 sm:mb-12 max-w-[1100px] mx-auto leading-snug px-4 text-center lg:mb-14 transition-all duration-700 ${isLoaded ? "slide-in-up opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              We apply to <span className="text-orange-600 font-bold">1,200+ USA jobs</span> and track everything - so
              you can focus on interviews.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-700 ${isLoaded ? "slide-in-up opacity-100" : "opacity-0"}`}
              style={{ animationDelay: "0.6s" }}
            >
=======
            <p className="text-xl text-[#333] mb-12 max-w-[1100px] mx-auto">
              We apply to <span className="text-orange-600 font-bold">1,000+ USA jobs</span> and track everything — so
              you can focus on interviews.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
              <button
                onClick={() => {
<<<<<<< HEAD
                  // Open the form first
                  setSignupFormVisibility(true)
                  // Track safely
=======
                  setSignupFormVisibility(true);
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
                  try {
                    GTagUTM({
                      eventName: "sign_up_click",
                      label: "Hero_Start_Free_Trial_Button",
                      utmParams: {
                        utm_source: "WEBSITE",
                        utm_medium: "Website_Front_Page",
                        utm_campaign: "Website",
                      },
                    })
                  } catch {}
                }}
<<<<<<< HEAD
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center pulse-glow transform hover:rotate-1"
=======
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center space-x-2"
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
              >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

<<<<<<< HEAD
        <div className="absolute bottom-8 left-1/2 h-fit transform -translate-x-1/2 scroll-bounce">
          <div className="w-8 h-12 border-3 border-orange-500 rounded-full flex justify-center bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="w-2 h-4 bg-orange-500 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Success Matrix Section - unchanged */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={successMatrixRef}
            className={`max-w-7xl mx-auto text-center transition-all duration-800 ease-out opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-8 ${
              isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
            }`}
          >
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight transition-all duration-800 delay-100 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              <span className="block">Our Platform Gets Users Interview Calls Within Weeks —</span>
              <span className="block">And Offers In Months</span>
            </h2>

            <p
              className={`text-lg sm:text-xl md:text-xl lg:text-xl text-gray-600 mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 delay-150 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              Powered by AI-driven job targeting and recruiter outreach automation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 mb-8 sm:mb-12">
              {[
                { percentage: "95%", title: "Clients get calls", subtitle: "within a month", delay: "delay-200" },
                { percentage: "90%", title: "Clients land job", subtitle: "within 3 months", delay: "delay-300" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center group cursor-pointer relative p-4 sm:p-6 lg:p-8 transition-all duration-800 ${stat.delay} opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-6 flex flex-col items-center justify-center ${
                    isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-gradient-to-br from-orange-100 via-orange-50 to-red-100 rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-76 lg:h-76 xl:w-84 xl:h-84 border-2 border-orange-200 rounded-full scale-0 group-hover:scale-100 transition-all duration-700 ease-out opacity-0 group-hover:opacity-60" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 xl:w-76 xl:h-76 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full scale-0 group-hover:scale-100 transition-all duration-600 ease-out opacity-0 group-hover:opacity-70 blur-md" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center transition-all duration-300 group-hover:scale-105">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-orange-600 mb-2 sm:mb-3 lg:mb-4 group-hover:text-orange-700 transition-colors duration-300">
                      {stat.percentage}
                    </div>
                    <div className="h-1 w-16 sm:w-20 lg:w-24 bg-orange-600 mx-auto mb-4 sm:mb-5 lg:mb-6 transition-all duration-300 group-hover:bg-orange-700 group-hover:w-20 sm:group-hover:w-24 lg:group-hover:w-28" />
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 text-center leading-tight group-hover:text-gray-800 transition-colors duration-300">
                      {stat.title}
                    </div>
                    <div className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-orange-600 font-medium text-center group-hover:text-orange-700 transition-colors duration-300">
                      {stat.subtitle}
                    </div>
=======
          {/* Metrics */}
          <div ref={successMatrixRef} className="w-full max-w-7xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {metricsData.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  {m.icon}
                  <div className="text-3xl font-bold">
                    <CountUp end={m.value} isVisible={isSuccessMatrixVisible} />
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
                  </div>
                  <div className="text-gray-600 text-sm">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
            <p
              className={`text-sm sm:text-base md:text-lg text-gray-500 italic transition-all duration-800 delay-400 opacity-100 transform translate-y-0 lg:opacity-0 lg:transform lg:translate-y-4 ${
                isSuccessMatrixVisible ? "lg:opacity-100 lg:transform lg:translate-y-0" : ""
              }`}
            >
              *Based on verified user data from 2024-25 cohort
            </p>
=======
          {/* Scroll Down */}
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center animate-bounce">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
>>>>>>> 0d713dc75898843afcb03d079ced38899d85276b
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
