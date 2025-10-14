
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import blogPosts from '../BLogsData.ts';

function IndividualBlog() {
  const { id, slug } = useParams();

  const selectedBlog = slug 
    ? blogPosts.find((blog) => blog.slug === slug)
    : blogPosts.find((blog) => blog.id === parseInt(id || '0'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!selectedBlog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Blog not found</h1>
          <button 
            onClick={() => window.close()}
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  const { title, image, category, categoryColor, date, readTime, content } = selectedBlog;
  const currentOrigin = window.location.origin;

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* FLASHFIRE Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 text-center">
            <h2 className="text-2xl font-bold">FLASHFIRE</h2>
            <p className="text-orange-100 text-sm">Your AI-Powered Job Search Platform</p>
          </div>

          {/* Blog Content */}
          <div className="p-8">
            {/* Category Badge */}
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                {category}
              </span>
            </div>

            {/* Featured Image */}
            <img
              src={image.startsWith('/') ? currentOrigin + image : image}
              alt={title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
            />

            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

            
            <div className="flex items-center text-gray-600 space-x-6 text-sm mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {date}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {readTime}
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                lineHeight: '1.8',
                color: '#374151'
              }}
            />

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to accelerate your job search?
                </h3>
                <p className="text-gray-700 mb-4">
                  Join thousands of international students landing their dream jobs in the U.S.
                </p>
                <a 
                  href={currentOrigin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition font-semibold"
                >
                  Visit FlashFire Jobs
                </a>
              </div>

              {/* Close Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => window.close()}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Blog Content */}
      <style>{`
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
          border-bottom: 3px solid #f97316;
          padding-bottom: 0.5rem;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose a {
          color: #f97316;
          text-decoration: underline;
        }
        .prose ul, .prose ol {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #f97316;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
        }
        .prose strong {
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
}

export default IndividualBlog;
