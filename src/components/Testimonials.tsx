import React from 'react';
import { Quote, Heart } from 'lucide-react';

const testimonials = [
  {
    text: "It’s crazy how much time I used to waste. Now I get tailored job matches, and the dashboard makes tracking everything so easy.",
    name: "Aman G.",
    role: "Barclays",
    avatar: "/images/aman.jpg"
  },
  {
    text: "I didn’t think a tool could be this effective. My resume was instantly optimized and I saw results almost immediately.",
    name: "Amit G.",
    role: "ArmorCode",
    avatar: "/images/amit.jpg"  },
  {
    text: "What really impressed me was how personalized everything felt. The AI knew exactly which jobs suited me and why.",
    name: "Harkirat S.",
    role: "Amazon",
avatar: "/images/harkirat.jpg"  },
  {
    text: "This saved me hours every week. The resume targeting feature alone is worth it—and I actually enjoy job hunting now!",
    name: "Aryan G.",
    role: "IBM",
avatar: "/images/aryan.jpg"  },
  {
    text: "I wasn’t sure what to expect at first, but Flashfire turned out to be a game-changer. Within a week, I got multiple interview calls from top companies.",
    name: "Rudraksh T.",
    role: "State Street",
avatar: "/images/rudraksh.jpg"  },
  {
    text: "I’ve tried other job platforms, but nothing compares to Flashfire’s speed and accuracy. Plus, I finally stopped editing my resume manually.",
    name: "Rijul J.",
    role: "Bresy",
avatar: "/images/rijul.jpg"  },
  {
    text: "Honestly, I was skeptical. But Flashfire delivered—within a week, I had interviews booked. The insights and AI help made a huge difference.",
    name: "Chiraj J.",
    role: "Mastercard",
avatar: "/images/chirag.jpg"  },
];


const TestimonialsGrid = () => {
  return (
    <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 min-h-screen py-16 px-6 relative overflow-hidden rounded-[3rem]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] rounded-[3rem]"></div>
      
      {/* Heart Icon */}
      <div className="absolute top-8 right-8 z-10">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Heart className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            100+ HAPPY<br />USERS' LOVE
          </h2>
          <div className="max-w-md">
            <p className="text-white/90 text-sm leading-relaxed">
              Thank you for your praise and suggestions. With your support, we can go further. We hope to accompany you throughout your job search journey.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            {/* First testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[0].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[0].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[0].role}</p>
                </div>
              </div>
            </div>

            {/* Second testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 ml-8">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[1].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[1].avatar}
                  alt={testimonials[1].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[1].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[1].role}</p>
                </div>
              </div>
            </div>

            {/* Third testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[2].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[2].avatar}
                  alt={testimonials[2].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[2].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[2].role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 mt-12 lg:mt-0">
            {/* Fourth testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 mr-8">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[3].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[3].avatar}
                  alt={testimonials[3].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[3].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[3].role}</p>
                </div>
              </div>
            </div>

            {/* Fifth testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[4].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[4].avatar}
                  alt={testimonials[4].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[4].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[4].role}</p>
                </div>
              </div>
            </div>

            {/* Sixth testimonial */}
            <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300 ml-6">
              <div className="flex items-start gap-3 mb-4">
                <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm leading-relaxed">
                  {testimonials[5].text}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[5].avatar}
                  alt={testimonials[5].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonials[5].name}</p>
                  <p className="text-xs text-gray-600">{testimonials[5].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chiraj J. testimonial as 7th block */}
<div className="mt-8 max-w-2xl mx-auto">
  <div className="bg-white rounded-2xl p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300">
    <div className="flex items-start gap-3 mb-4">
      <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
      <p className="text-gray-800 text-sm leading-relaxed">
        {testimonials[6].text}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <img
        src={testimonials[6].avatar}
        alt={testimonials[6].name}
        className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
      />
      <div>
        <p className="font-semibold text-sm text-gray-900">{testimonials[6].name}</p>
        <p className="text-xs text-gray-600">{testimonials[6].role}</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TestimonialsGrid />
    </div>
  );
}

export default App;