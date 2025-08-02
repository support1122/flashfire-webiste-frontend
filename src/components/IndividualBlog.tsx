import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogPosts from '../BLogsData.ts';

function IndividualBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedBlog = blogPosts.find((blog) => blog.id == id);

  if (!selectedBlog) return <div className="text-center text-red-500 mt-10">Blog not found.</div>;

  const { title, image, category, categoryColor, date, readTime, author, content, excerpt } = selectedBlog;

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter']">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={image.startsWith('/') ? window.location.origin + image : image}
            alt={title}
            className="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg"
          />
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                {category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <div className="flex items-center text-gray-600 space-x-6 text-sm">
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
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {author}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="content prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.close()}
            className="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-orange-400 to-orange-600 hover:translate-y-[-2px] hover:shadow-orange-200 transition-all"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndividualBlog;