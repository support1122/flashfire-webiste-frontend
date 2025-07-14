import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const navigate = (path: string) => {
    // push new URL state without reloading
    window.history.pushState({}, '', path);
    // let your Router component know about it
    window.dispatchEvent(new CustomEvent('routechange', { detail: { path } }));
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info: unchanged */}

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'Your Journey', href: '#journey' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Team', href: '#team' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => navigate(href)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-of-service' },
                { label: 'Cookie Policy', path: '/cookie-policy' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            {/* Social Links: unchanged */}
          </div>
        </div>

        {/* CTA and Copyright: unchanged */}
      </div>
    </footer>
  );
};

export default Footer;
