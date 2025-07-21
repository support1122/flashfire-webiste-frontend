import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Eye } from 'lucide-react';

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewCounts, setViewCounts] = useState({});
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  const postsPerPage = 3;

  // Your blog posts array (keeping the same structure)
  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Resume That Gets Interviews in the U.S. (2025 Job Market Edition)",
      excerpt: "The no-nonsense guide to writing a resume that doesn't just sit in a database — it lands interviews. Learn precision-crafted strategies that make your 6-8 seconds count.",
      author: "Sneha Patel",
      date: "Jan 15, 2025",
      readTime: "12 min",
      category: "Resume Tips",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752811844/image_1_exsbfq.webp",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 1247,
      trending: true,
      slug: "resume-that-gets-interviews-2025"
    },
    {
      id: 2,
      title: "Why Finding a Job in the U.S. as a New Graduate Feels Impossible",
      excerpt: "If you're a recent graduate trying to land your first job in the United States, you're probably overwhelmed and frustrated. Learn why the system isn't built for new grads and how to overcome it.",
      author: "Devansh Pandey",
      date: "Jan 12, 2025",
      readTime: "10 min",
      category: "Job Strategy",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752832446/46d07f8b-261d-49cf-b140-5eaf609b874e_kkjjml.webp",
      categoryColor: "bg-green-100 text-green-600",
      views: 892,
      trending: false,
      slug: "job-search-new-graduate-impossible"
    },
    {
      id: 3,
      title: "From 0 to Offer: A Step-by-Step Guide to Landing Your First U.S. Job with Flashfire",
      excerpt: "Graduating in the U.S. as an international student should feel like winning the lottery. But instead of celebration, most students find themselves spiraling into a black hole of ghosted applications and visa anxiety. Here's your complete roadmap from 0 to offer.",
      author: "Radhika Shukla",
      date: "Jan 10, 2025",
      readTime: "15 min",
      category: "Job Strategy",
      image: "https://res.cloudinary.com/drit9nkha/image/upload/v1752832996/freepik__the-style-is-candid-image-photography-with-natural__35759_dnwqka.webp",
      categoryColor: "bg-purple-100 text-purple-600",
      views: 1156,
      trending: true,
      slug: "zero-to-offer-guide-flashfire"
    },
    {
      id: 4,
      title: "From CPT to H-1B: A Simple Game Plan for Navigating Job Search as an International Student",
      excerpt: "The no-nonsense guide to writing a resume that doesn't just sit in a database — it lands interviews. Learn precision-crafted strategies that make your 6-8 seconds count.",
      author: "Shubham Shukla",
      date: "Jan 5, 2025",
      readTime: "10 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 743,
      trending: false,
      slug: "cpt-to-h1b-game-plan"
    },
    {
      id: 5,
      title:"How I Got 10 Offers in 6 Weeks Using Only flashfirejobs.com (Product Manager Edition)",
      excerpt: "Struggling to get interviews as a product manager? I was too — until I found flashfirejobs.com. This blog breaks down exactly how I used it to go from confusion and rejection to multiple offers in just 6 weeks, without referrals or recruiters.",
      author: "Sneha Dingra",
      date: "Jan 1, 2025",
      readTime: "14 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 1891,
      trending: true,
      slug: "10-offers-6-weeks-product-manager"
    },
    {
      id: 6,
      title: "How to Land Your First Job in the U.S. with Zero Referrals — A Proven Strategy for International Students",
      excerpt: "Landing your first U.S. job as an international student can feel impossible — unless you use the right system. Here's the exact playbook that worked for me.",
      author: "Ira Verma",
      date: "Dec 25, 2024",
      readTime: "16 min",
      category: "Job Search Tips",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 654,
      trending: false,
      slug: "first-job-zero-referrals-strategy"
    },
    {
      id: 7,
      title: "10 Reasons International Students Fail to Land Jobs in the U.S. — And How to Fix Them",
      excerpt: "You've studied hard, built projects, and dreamed big — yet the U.S. job market still feels impossible. Here's why most international students struggle, and how flashfirejobs.com turns it around.",
      author: "Shubham Shukla",
      date: "Jul 21, 2025",
      readTime: "9 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-orange-100 text-orange-600",
      views: 1234,
      trending: false,
      slug: "10-reasons-students-fail-jobs"
    },
    {
      id: 8,
      title: "The 7 Best Job Portals for International Students Applying in the U.S. (And Which One Actually Works)",
      excerpt: "Not all job boards are created equal—especially for international students. This guide ranks the most popular platforms and reveals which one actually gets you results, fast.",
      author: "Shubham Shukla",
      date: "Jul 21, 2025",
      readTime: "8 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-green-100 text-green-600",
      views: 987,
      trending: false,
      slug: "7-best-job-portals-international-students"
    },
    {
      id: 9,
      title: "The Ultimate Job Search Strategy for OPT Students in the U.S. — What No One Tells You",
      excerpt: "OPT job seekers aren't just looking for roles—they're racing against time. Here's a step-by-step strategy to land a job in the U.S. as an international student, without wasting months.",
      author: "Shubham Shukla",
      date: "Jul 21, 2025",
      readTime: "6 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/6140676/pexels-photo-6140676.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-orange-100 text-orange-600",
      views: 1456,
      trending: true,
      slug: "ultimate-job-search-strategy-opt"
    },
    {
      id: 10,
      title: "How to Land a U.S. Internship After 2 Semesters",
      excerpt: "No U.S. experience? No referrals? No problem. Here's a step-by-step game plan for international students to land their first internship after just two semesters.",
      author: "Shubham Shukla",
      date: "Jul 21, 2025",
      readTime: "5 min",
      category: "Career Advice",
      image: "https://images.pexels.com/photos/5825664/pexels-photo-5825664.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoryColor: "bg-blue-100 text-blue-600",
      views: 789,
      trending: false,
      slug: "land-us-internship-2-semesters"
    }
  ];

  const totalPosts = blogPosts.length;
  const maxIndex = Math.max(0, totalPosts - postsPerPage);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused && totalPosts > postsPerPage) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, maxIndex, totalPosts, postsPerPage]);

  // Simulate view counts
  useEffect(() => {
    const counts = {};
    blogPosts.forEach(post => {
      counts[post.id] = post.views || Math.floor(Math.random() * 2000) + 100;
    });
    setViewCounts(counts);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + postsPerPage);

  const handleBlogClick = (post) => {
    // Simple navigation - you can replace this with your routing solution
    // For now, it will just log the post slug - you can integrate with React Router
    console.log(`Navigate to: /blog/${post.slug}`);
    
    // If you're using React Router, you would do:
    // navigate(`/blog/${post.slug}`);
    
    // For now, let's just show an alert
    alert(`This would navigate to: /blog/${post.slug}\n\nYou can integrate this with React Router or your preferred routing solution.`);
  };

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 rounded-full font-medium text-sm mb-6 transform hover:scale-105 transition-transform duration-300 shadow-lg">
            <Calendar className="w-4 h-4 mr-2 animate-bounce" />
            Career Insights & Expert Tips
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Expert Job Search Tips & Career Advice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with proven strategies, AI automation insights, and career growth
            tips from industry experts.
          </p>
          
          {/* Auto-play Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 hover:text-orange-600"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows with improved design */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-orange-50 group border border-gray-100"
            aria-label="Previous articles"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-orange-50 group border border-gray-100"
            aria-label="Next articles"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
          </button>

          {/* Blog Grid with Enhanced Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-in-out"
              style={{ 
                transform: `translateX(0)`,
                opacity: 1
              }}
            >
              {visiblePosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-3 hover:rotate-1 relative"
                  onClick={() => handleBlogClick(post)}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                  }}
                >
                  {/* Enhanced Image with Overlay Effects */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category badge with glow effect */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${post.categoryColor} shadow-lg backdrop-blur-sm`}>
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Trending badge */}
                    {post.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                          🔥 TRENDING
                        </span>
                      </div>
                    )}

                    {/* View count overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {(viewCounts[post.id] || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-8">
                    {/* Meta Info with icons */}
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Enhanced Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt with gradient fade */}
                    <div className="relative mb-6">
                      <p className="text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
                    </div>

                    {/* Enhanced Author & Read More */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 font-semibold">{post.author}</span>
                      </div>
                      <div className="flex items-center text-orange-600 font-semibold text-sm group-hover:text-orange-700 transition-colors duration-200">
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </article>
              ))}
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 rounded-full h-2 w-64">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Enhanced Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-12 h-3 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3 hover:scale-125'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 font-medium">
              {currentIndex + 1} of {maxIndex + 1}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;
