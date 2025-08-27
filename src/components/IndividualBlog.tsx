// src/components/IndividualBlog.tsx
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import blogPosts from '../BLogsData.ts';
import Navigation from './Navigation';
import Footer from './Footer';

type AppOutletContext = {
  signupFormVisibility: boolean;
  calendlyModalVisibility: boolean;
  setSignupFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setCalendlyModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function IndividualBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ single source of truth from App.tsx
  const {
    setSignupFormVisibility,
    setCalendlyModalVisibility,
  } = useOutletContext<AppOutletContext>();

  useEffect(() => {
    // scroll to top when opening an article
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectedBlog = blogPosts.find((blog) => blog.id === parseInt(id || '0', 10));
  if (!selectedBlog) {
    return <div className="text-center text-red-500 mt-10">Blog not found.</div>;
  }

  const { title, image, category, categoryColor, date, readTime, author, content } =
    selectedBlog;

  // Wire up inline CTAs inside rendered HTML (e.g., gradient buttons in content)
  useEffect(() => {
    if (!contentRef.current) return;

    const buttons = contentRef.current.querySelectorAll('a[style*="background"]');
    buttons.forEach((button) => {
      const text = (button.textContent || '').toLowerCase();

      // replace node to remove previous listeners if any
      const fresh = button.cloneNode(true) as HTMLAnchorElement;
      button.parentNode?.replaceChild(fresh, button);

      fresh.addEventListener('click', (e) => {
        e.preventDefault();

        if (
          text.includes('sign up') ||
          text.includes('free trial') ||
          text.includes('start')
        ) {
          setSignupFormVisibility(true);
        } else if (
          text.includes('book') ||
          text.includes('schedule') ||
          text.includes('consultation') ||
          text.includes('demo')
        ) {
          setCalendlyModalVisibility(true);
        } else {
          // default to signup if we can't classify
          setSignupFormVisibility(true);
        }
      });
    });
  }, [content, setSignupFormVisibility, setCalendlyModalVisibility]);

  // Smart close: window.close if pop-up, back if history, else go to list
  const handleClose = () => {
    if (window.opener && !window.opener.closed) {
      window.close();
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/blogs'); // fallback to your blog list route
  };

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter']">
      <Navigation
        setCalendlyModalVisibility={setCalendlyModalVisibility}
        setSignupFormVisibility={setSignupFormVisibility}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={image.startsWith('/') ? window.location.origin + image : image}
            alt={title}
            className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg"
          />
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}
              >
                {category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex items-center text-gray-600 space-x-6 text-sm">
              <div className="flex items-center">{date}</div>
              <div className="flex items-center">{readTime}</div>
              <div className="flex items-center">{author}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div
            ref={contentRef}
            className="content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Close */}
        <div className="mt-8 text-center">
          <button
            onClick={handleClose}
            className="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:translate-y-[-2px] hover:shadow-orange-200 transition-all"
          >
            Close Article
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
