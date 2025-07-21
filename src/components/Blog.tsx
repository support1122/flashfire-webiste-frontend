import React from 'react';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 AI-Powered Resume Tips That Land Interviews",
      excerpt: "Discover how artificial intelligence is revolutionizing resume writing and helping job seekers get noticed by recruiters.",
      author: "Flashfire Team",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "/images/blog4.jpeg"
    },
    {
      id: 2,
      title: "The Future of Job Applications: Automation vs. Personal Touch",
      excerpt: "Exploring the balance between automated job applications and maintaining authenticity in your job search.",
      author: "Career Expert",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      image: "/images/blog5.jpeg"
    },
    {
      id: 3,
      title: "How to Optimize Your LinkedIn Profile for US Job Market",
      excerpt: "Essential strategies for international students and professionals to make their LinkedIn profiles stand out to US recruiters.",
      author: "LinkedIn Specialist",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "/images/blog6.jpeg"
    },
    {
      id: 4,
      title: "Breaking Down ATS: What You Need to Know",
      excerpt: "Understanding Applicant Tracking Systems and how to ensure your resume passes through automated screening.",
      author: "HR Technology Expert",
      date: "Dec 8, 2024",
      readTime: "8 min read",
      image: "/images/blog7.jpeg"
    },
    {
      id: 5,
      title: "Salary Negotiation Strategies for New Graduates",
      excerpt: "Learn how to confidently negotiate your first job offer and maximize your earning potential from day one.",
      author: "Negotiation Coach",
      date: "Dec 5, 2024",
      readTime: "10 min read",
      image: "/images/blog8.jpeg"
    },
    {
      id: 6,
      title: "Remote Work Interview Tips: Ace Your Virtual Meetings",
      excerpt: "Master the art of virtual interviews with these proven strategies for remote job applications.",
      author: "Remote Work Expert",
      date: "Dec 3, 2024",
      readTime: "6 min read",
      image: "/images/blog9.jpeg"
    }
  ];

  return (
    <section id="blog" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Career Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Latest from Our Blog
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and strategies to accelerate your career and master the job search process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  
                  <a
                    href="#"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Want More Career Tips?
            </h3>
            <p className="text-blue-100 mb-6 sm:mb-8 text-lg sm:text-xl max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly insights on job searching, career development, and industry trends.
            </p>
            <button
              onClick={() => {
                const modal = document.getElementById('signup-modal');
                if (modal) modal.classList.remove('hidden');
              }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;