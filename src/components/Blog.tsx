import React from 'react';
import { useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import blogPosts from '../BLogsData.ts';
import { Link } from 'react-router-dom';

const Blog = () => {
  const openBlogPost = (post) => {
    const currentOrigin = window.location.origin;
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title} - FlashFire Blog</title>
        <link rel="icon" type="image/png" href="${currentOrigin}/favicon-32x32.png">
        <link rel="apple-touch-icon" href="${currentOrigin}/favicon-32x32.png">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: 'Inter', sans-serif; background: #f9fafb; }
          .content { max-width: 800px; margin: 0 auto; line-height: 1.8; color: #374151; }
          h2 { font-size: 1.75rem; font-weight: 700; color: #111827; margin-top: 1.5rem; border-bottom: 3px solid #f97316; padding-bottom: 0.4rem; }
          h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-top: 1rem; }
          p { margin-top: 0.5rem; }
          a { color: #f97316; text-decoration: underline; }
        </style>
      </head>
      <body class="p-6">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <img src="${post.image}" alt="${post.title}" class="w-full h-auto rounded-lg mb-6" />
          <h1 class="text-4xl font-bold mb-4">${post.title}</h1>
          <p class="text-gray-500 mb-4">${post.date} • ${post.readTime} • ${post.author}</p>
          <div class="content">${post.content}</div>
          <div class="mt-8 text-center">
            <button onclick="window.close()" class="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition">
              Close Article
            </button>
          </div>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="blog" className="pt-6 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium text-sm mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Career Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert Job Search Tips & Career Advice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with proven strategies, AI automation insights, and career growth tips from industry experts.
          </p>
        </div>

        {/* Blog Grid (Full Page Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link to={`/blogs/${post.id}`} target="_blank" key={post.id}>
              <article
                onClick={() => openBlogPost(post)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600 font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700 transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
       @keyframes fadeInUp {
       from { opacity: 0; transform: translateY(30px); }
       to { opacity: 1; transform: translateY(0); }
        }
     .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
     }

     /* Hide scrollbar but keep scroll functionality */
     html, body, section {
     scrollbar-width: none;        /* Firefox */
     -ms-overflow-style: none;     /* IE and Edge */
    }
    html::-webkit-scrollbar,
    body::-webkit-scrollbar,
    section::-webkit-scrollbar {
    display: none;                /* Chrome, Safari */
  }
      `}</style>
    </section>
  );
};

export default Blog;
