import { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import blogPosts from '../BLogsData.ts';
import { Link } from 'react-router-dom';
const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleDots, setVisibleDots] = useState([0, 1, 2]);
  const scrollContainerRef = useRef(null);
  const cardWidth = 384;
  // Limit to first 10 posts for performance=
    // Create the HTML content with proper favicon references
   const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
      
      // Calculate progress based on actual scroll position
      const maxScrollLeft = scrollWidth - clientWidth;
      const progress = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      
      // Update current index for display
      const currentPosition = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(currentPosition);
      
      // Update visible dots based on scroll position
      const maxVisible = Math.min(3, Math.ceil(clientWidth / cardWidth));
      const newVisibleDots = [];
      
      for (let i = currentPosition; i < Math.min(currentPosition + maxVisible, blogPosts.length); i++) {
        newVisibleDots.push(i);
      }
      
      setVisibleDots(newVisibleDots);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const openBlogPost = (post) => {
    // Get the current origin to properly reference local assets
    const currentOrigin = window.location.origin;
    
    // Create the HTML content with proper favicon references
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title} - FlashFire Blog</title>
        
        <!-- Favicon Links - matching the main site -->
        <link rel="icon" type="image/svg+xml" href="${currentOrigin}/favicon.svg">
        <link rel="alternate icon" href="${currentOrigin}/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="${currentOrigin}/favicon-32x32.png">
        <link rel="shortcut icon" href="${currentOrigin}/favicon.ico">
        <link rel="apple-touch-icon" href="${currentOrigin}/favicon-32x32.png">
        
        <!-- Meta tags for SEO -->
        <meta name="description" content="${post.excerpt}">
        <meta name="author" content="${post.author}">
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt}">
        <meta property="og:image" content="${post.image}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${post.title}">
        <meta name="twitter:description" content="${post.excerpt}">
        <meta name="twitter:image" content="${post.image}">
        
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4P890VGD8D"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4P890VGD8D');
        </script>
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6;
          }
          .content h2 { 
            font-size: 1.875rem; 
            font-weight: bold; 
            margin: 2rem 0 1rem 0; 
            color: #1f2937;
            border-bottom: 3px solid #f97316;
            padding-bottom: 0.5rem;
          }
          .content h3 { 
            font-size: 1.25rem; 
            font-weight: 600; 
            margin: 1.25rem 0 0.5rem 0; 
            color: #374151; 
          }
          .content h3:has(+ p strong) { 
            font-size: 1.125rem; 
            font-weight: 600; 
            margin: 1rem 0 0.25rem 0; 
            color: #4b5563; 
          }
          .content p { 
            margin: 0.5rem 0; 
            line-height: 1.75; 
            color: #4b5563; 
            font-size: 0.95rem;
          }
          .content p strong:first-child { 
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
          }
          .content ul { 
            margin: 1rem 0; 
            padding-left: 1.5rem; 
          }
          .content li { 
            margin: 0.5rem 0; 
            color: #4b5563; 
            font-size: 0.9rem;
            line-height: 1.6;
          }
          .content blockquote { 
            margin: 1rem 0; 
            padding: 1rem; 
            background: #f9fafb; 
            border-left: 4px solid #f97316; 
            font-style: italic;
            border-radius: 0.375rem;
            font-size: 0.9rem;
          }
          .content strong { 
            color: #1f2937; 
            font-weight: 600; 
          }
          .content a { 
            color: #f97316; 
            text-decoration: underline;
            transition: color 0.2s ease;
          }
          .content a:hover { 
            color: #ea580c; 
          }
          .content em { 
            font-style: italic;
            color: #6b7280;
          }
          .content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          .content th, .content td {
            border: 1px solid #e5e7eb;
            padding: 12px;
            text-align: left;
          }
          .content th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          .content tr:nth-child(even) {
            background-color: #f9fafb;
          }
          /* Special styling for FAQ sections */
          .content h2:contains("FAQ") + h3,
          .content h3:contains("Q1:"),
          .content h3:contains("Q2:"),
          .content h3:contains("Q3:"),
          .content h3:contains("Q4:"),
          .content h3:contains("Q5:") { 
            font-size: 1rem; 
            font-weight: 600; 
            margin: 1rem 0 0.25rem 0; 
            color: #374151; 
          }
          /* Special styling for subsection headers like a), b), c) */
          .content h3:contains("a)"),
          .content h3:contains("b)"),
          .content h3:contains("c)") { 
            font-size: 1rem; 
            font-weight: 600; 
            margin: 1rem 0 0.25rem 0; 
            color: #4b5563; 
          }
          .back-btn {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            transition: all 0.3s ease;
          }
          .back-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
          }
        </style>
      </head>
      <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 py-8">
          <!-- Header -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
<img src="${post.image.startsWith('/') ? currentOrigin + post.image : post.image}" 
     alt="${post.title}" 
     class="w-full h-auto max-h-[600px] object-contain mx-auto rounded-t-lg" />
            <div class="p-8">
              <div class="flex items-center mb-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium ${post.categoryColor}">
                  ${post.category}
                </span>
              </div>
              <h1 class="text-4xl font-bold text-gray-900 mb-4">${post.title}</h1>
              <div class="flex items-center text-gray-600 space-x-6">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.date}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.readTime}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
                  ${post.author}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <div class="content prose max-w-none">
              ${post.content}
            </div>
          </div>
          
          <!-- Back Button -->
          <div class="mt-8 text-center">
            <button onclick="window.close()" class="back-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              Close Article
            </button>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Create a blob URL for the HTML content
  //   const blob = new Blob([htmlContent], { type: 'text/html' });
  //   const blobUrl = URL.createObjectURL(blob);
    
  //   // Open the new window with the blob URL
  //   const newWindow = window.open(blobUrl, '_blank');
    
  //   // Clean up the blob URL after a short delay
  //   setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium text-sm mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Career Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert Job Search Tips & Career Advice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with proven strategies, AI automation insights, and career growth
            tips from industry experts.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-200" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-200" />
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
          >
            {blogPosts.map((post, index) => (
              <Link to={`/blogs/${post.id}`} target='_blank' key={post.id}  >
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1 flex-shrink-0"
                onClick={() => openBlogPost(post)}
                style={{
                  width: '368px', // Fixed width for consistent scrolling
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
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
                  {/* Meta Info */}
                  <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Author & Read More */}
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
          {/* Progress Bar */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>{currentIndex + 1} of {blogPosts.length}</span>
              <span>{Math.round(scrollProgress)}% viewed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${scrollProgress}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Blog;