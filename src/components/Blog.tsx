import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import blogPosts from '../BLogsData.ts';

const Blog = () => {
  const [cachedBlogPosts, setCachedBlogPosts] = useState(blogPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Cache blog posts in localStorage for faster loading
    const cacheKey = 'flashfire_blog_posts';
    const cached = localStorage.getItem(cacheKey);
    
    // If cache exists, try to use it, but invalidate when code has newer posts
    if (cached) {
      try {
        const parsedPosts = JSON.parse(cached);

        // Invalidate cache when number of posts or any slug has changed
        const cacheOutdated =
          !Array.isArray(parsedPosts) ||
          parsedPosts.length !== blogPosts.length ||
          // quick slug set comparison
          (() => {
            const cachedSlugs = new Set(parsedPosts.map((p: any) => p.slug));
            for (const p of blogPosts) {
              if (!cachedSlugs.has(p.slug)) return true;
            }
            return false;
          })();

        if (cacheOutdated) {
          localStorage.setItem(cacheKey, JSON.stringify(blogPosts));
          setCachedBlogPosts(blogPosts);
        } else {
          setCachedBlogPosts(parsedPosts);
        }
      } catch (error) {
        console.log('Error parsing cached blog posts:', error);
        // Fallback to original data
        localStorage.setItem(cacheKey, JSON.stringify(blogPosts));
        setCachedBlogPosts(blogPosts);
      }
    } else {
      // First visit - cache the blog posts
      localStorage.setItem(cacheKey, JSON.stringify(blogPosts));
      setCachedBlogPosts(blogPosts);
    }
  }, []);

  const openBlogPost = (post: any) => {
    // Open the blog in a new tab with the slug URL
    window.open(`/blog/${post.slug}`, '_blank');
  };

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
          {cachedBlogPosts.map((post, index) => (
            <article
              onClick={() => openBlogPost(post)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              key={post.id}
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
                    <div className="flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700 transition-colors duration-200">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </article>
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
