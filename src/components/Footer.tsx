import { Link } from "react-router-dom"
import { Linkedin, Youtube, Zap, ChevronRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white">
      {/* Subtle radial highlights */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay
        [background:radial-gradient(600px_200px_at_20%_10%,rgba(255,255,255,0.08),transparent_60%),
                     radial-gradient(500px_180px_at_80%_20%,rgba(255,255,255,0.06),transparent_60%)]"
      />
      <div className="relative max-w-7xl mx-auto px-6 py-8 md:py-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Logo and Description */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold tracking-tight">FLASHFIRE</h2>
            <p className="text-sm leading-relaxed">
              The AI-powered platform to apply smarter. Optimized resumes, auto applications, and interview prep at
              scale.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/flashfire-pvt-ltd/posts/?feedView=all"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 hover:bg-black/50 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@flashfireindia"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/70 hover:bg-black/50 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col gap-3 md:border-l md:border-white/20 md:pl-6">
            <h3 className="font-semibold text-base">Company</h3>
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/RefundPolicy" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-white">
                  Refund Policy
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/PrivacyPolicy"onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-white">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/PaymentPolicy" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-white">
                  Payment Policy
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/TermsOfService" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </nav>
          </div>

          {/* Quick Access Section */}
          <div className="flex flex-col gap-3 md:border-l md:border-white/20 md:pl-6">
            <h3 className="font-semibold text-base">Quick Access</h3>
            <nav className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/features" className="hover:underline hover:text-white">
                  Features
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/testimonials" className="hover:underline hover:text-white">
                  Testimonials
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/pricing" className="hover:underline hover:text-white">
                  Pricing
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to ="/faq" className="hover:underline hover:text-white">
                  FAQ
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                <Link to="/blogs" className="hover:underline hover:text-white">
                  Blog
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 border-t border-white/30 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm gap-2">
          <p>© Flashfire 2025 | All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Flashfire Pvt. Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
