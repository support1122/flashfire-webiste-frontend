import { Link } from "react-router-dom"
import { Linkedin, Youtube, Zap } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Left Column: Logo and Description */}
        <div className="col-span-2 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">FLASHFIRE</h2>
          <p className="text-sm leading-relaxed max-w-xs">
            The AI-powered platform to apply smarter. Optimized resumes, auto applications, 
            and interview prep at scale.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/flashfire-pvt-ltd/posts/?feedView=all"
              aria-label="LinkedIn"
              className="p-2 border-2 border-white rounded-full hover:bg-black/50 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@flashfireindia"
              aria-label="YouTube"
              className="p-2 border-2 border-white rounded-full hover:bg-black/50 transition"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Company Section */}
        <div className="col-span-1 col-start-4 flex flex-col space-y-4 mr-10">
          <h3 className="font-semibold text-lg ">Company</h3>
          <Link to="/RefundPolicy" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-red-900">Refund Policy</Link>
          <Link to="/PrivacyPolicy"   onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-red-900">Privacy Policy</Link>
          <Link to="/PaymentPolicy" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-red-900">Payment Policy</Link>
          <Link to="/TermsOfService" onClick={() => window.scrollTo(0, 0)} className="hover:underline hover:text-red-900">Terms of Service</Link>
        </div>

        {/* Quick Access Section */}
        <div className="col-span-1 flex flex-col space-y-4 ">
          <h3 className="font-semibold text-lg">Quick Access</h3>
          <Link to="/features" className="hover:underline hover:text-red-900">Features</Link>
          <Link to="/testimonials" className="hover:underline hover:text-red-900">Testimonials</Link>
          <Link to="/pricing" className="hover:underline hover:text-red-900">Pricing</Link>
          <Link to="/faq" className="hover:underline hover:text-red-900">FAQ</Link>
          <Link to="/blogs" className="hover:underline hover:text-red-900">Blog</Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm">
        <p>© Flashfire 2025 | All Rights Reserved</p>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4" />
          <span>Flashfire Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
