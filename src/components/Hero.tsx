import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users, Clock, Briefcase } from "lucide-react";
import { GTagUTM } from "../utils/GTagUTM";

// Type for CountUp props
type CountUpProps = {
  end: string | number;
  duration?: number;
  isVisible: boolean;
};

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSuccessMatrixVisible(true);
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );

    if (successMatrixRef.current) observer.observe(successMatrixRef.current);
    return () => {
      if (successMatrixRef.current) observer.unobserve(successMatrixRef.current);
    };
  }, []);

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
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-20 pb-2 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[28rem] h-[28rem] bg-red-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-orange-100/40 to-red-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 text-center flex-1 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="text-orange-800 text-sm font-medium">Save 150+ Hours Every Month</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl font-bold text-black leading-snug mb-6">
              <span className="block">Land 15+ Interview Calls with Us</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Powered by Flashfire AI.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-[#333] mb-12 max-w-[1100px] mx-auto">
              We apply to <span className="text-orange-600 font-bold">1,000+ USA jobs</span> and track everything — so
              you can focus on interviews.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => {
                  setSignupFormVisibility(true);
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
                }}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Start My 7-Day Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div ref={successMatrixRef} className="w-full max-w-7xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {metricsData.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  {m.icon}
                  <div className="text-3xl font-bold">
                    <CountUp end={m.value} isVisible={isSuccessMatrixVisible} />
                  </div>
                  <div className="text-gray-600 text-sm">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Down */}
          <div className="flex justify-center">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center animate-bounce">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
