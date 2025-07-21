import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Sample blog post data - in a real app, you'd fetch this based on the slug
  const blogPosts = {
    'ai-resume-tips-interviews': {
      title: "10 AI-Powered Resume Tips That Land Interviews",
      author: "Flashfire Team",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "/images/blog4.jpeg",
      content: `
        <p>In today's competitive job market, artificial intelligence is revolutionizing how we approach resume writing. Here are 10 AI-powered tips that will help your resume stand out and land more interviews.</p>
        
        <h2>1. Use AI-Powered Keyword Optimization</h2>
        <p>Modern ATS systems use AI to scan resumes for relevant keywords. Use tools like Flashfire's AI optimizer to ensure your resume contains the right keywords for your target roles.</p>
        
        <h2>2. Leverage Dynamic Content Adaptation</h2>
        <p>AI can help you automatically adapt your resume content for different job applications, ensuring each version is perfectly tailored to the specific role.</p>
        
        <h2>3. Optimize for ATS Scanning</h2>
        <p>AI-powered resume builders understand how ATS systems work and can format your resume to pass through automated screening processes.</p>
        
        <h2>4. Use Data-Driven Achievement Metrics</h2>
        <p>AI can help you identify and quantify your achievements in ways that resonate with hiring managers and ATS systems.</p>
        
        <h2>5. Smart Section Prioritization</h2>
        <p>AI analyzes job descriptions to determine which sections of your resume should be prioritized for maximum impact.</p>
        
        <p>Ready to transform your resume with AI? <a href="#pricing" class="text-blue-600 hover:text-blue-700">Get started with Flashfire today</a>.</p>
      `
    },
    'job-application-automation-future': {
      title: "The Future of Job Applications: Automation vs. Personal Touch",
      author: "Career Expert",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      image: "/images/blog5.jpeg",
      content: `
        <p>As job application automation becomes more sophisticated, job seekers are wondering: how do we balance efficiency with authenticity?</p>
        
        <h2>The Rise of Application Automation</h2>
        <p>Automated job applications have transformed the job search landscape, allowing candidates to apply to hundreds of positions efficiently.</p>
        
        <h2>Maintaining Authenticity</h2>
        <p>While automation handles the heavy lifting, the personal touch remains crucial for standing out to employers.</p>
        
        <h2>Best Practices for Balanced Approach</h2>
        <p>Learn how to leverage automation while maintaining the personal elements that make you unique as a candidate.</p>
      `
    },
    // Add more blog posts as needed
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/#blog"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/#blog"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Blog Post Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="p-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Job Search?</h3>
          <p className="text-blue-100 mb-6">
            Join thousands of professionals who've accelerated their careers with Flashfire's AI-powered automation.
          </p>
          <Link
            to="/#pricing"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors duration-200"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;