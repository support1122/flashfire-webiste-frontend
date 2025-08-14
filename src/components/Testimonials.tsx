
import { useState, useEffect } from "react"
import { Quote, Heart, Play } from "lucide-react"

const customStyles = `@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(5deg); }
  66% { transform: translateY(-5px) rotate(-5deg); }
}

@keyframes slide-in-left {
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  0% { transform: translateX(20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-bottom {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
.animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
.animate-slide-in-bottom { animation: slide-in-bottom 0.4s ease-out; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-1000 { animation-delay: 1s; }
`

const testimonials = [
  {
    type: "text",
    text: "It's crazy how much time I used to waste. Now I get tailored job matches, and the dashboard makes tracking everything so easy.",
    name: "Aman G.",
    role: "Barclays",
    avatar: "/images/aman.jpg",
  },
  {
    type: "text",
    text: "I’ve tried other job platforms, but nothing compares to Flashfire’s speed and accuracy. Plus, I finally stopped editing my resume manually",
    name: "Sanju G.",
    role: "Wood Mackenzie.",
    avatar: "/images/sanju.jpg",
  },
  {
   
    type: "video",
    videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
    thumbnail: "/images/anjali.jpeg",
    text: "I've tried other job platforms, but nothing compares to Flashfire's speed and accuracy. Plus, I finally stopped editing my resume manually.",
    name: "Anjali S.",
    role: "Skyworks Solutions, Inc.",
    avatar: "/images/anjali.jpeg",
  },
  {
    type: "text",
    text: "I wasn't sure what to expect at first, but Flashfire turned out to be a game-changer. Within a week, I got multiple interview calls from top companies.",
    name: "Rudraksh T.",
    role: "State Street",
    avatar: "/images/rudraksh.jpg",
  },
  {
     type: "video",
    videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
    thumbnail: "images/rijul.jpg",
    text: "I didn't think a tool could be this effective. My resume was instantly optimized and I saw results almost immediately.",
    name: "Rijul J.",
    avatar: "images/rijul.jpg",
  },
  {
    type: "",
    text: "",
    name: "",
    role: "",
    avatar: "",
  },
  {
    type: "text",
    text: "I didn’t think a tool could be this effective. My resume was instantly optimized and I saw results almost immediately.",
    name: "Amit G.",
    role: "ArmorCode",
    avatar: "/images/amit.jpg",
  },
  {
    type: "video",
    videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
    thumbnail: "/images/aryan.jpg",
    text: "This saved me hours every week. The resume targeting feature alone is worth it—and I actually enjoy job hunting now!",
    name: "Aryan G.",
    role : "IBM",
    avatar: "/images/aryan.jpg",
  },
]

const VideoTestimonial = ({ testimonial, index }) => {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handlePageClick = (e) => {
      if (showVideo && !e.target.closest("iframe") && !e.target.closest("button")) {
        setShowVideo(false)
        setIsLoading(false)
        setHasError(false)
      }
    }
    if (showVideo) {
      document.addEventListener("click", handlePageClick)
    }
    return () => {
      document.removeEventListener("click", handlePageClick)
    }
  }, [showVideo])

  const handleShowVideo = (e) => {
    e.stopPropagation()
    setIsLoading(true)
    setShowVideo(true)
    setHasError(false)
  }

  const handleStopVideo = () => {
    setShowVideo(false)
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg group animate-pulse-slow max-w-xs mx-auto`}>
      {!showVideo ? (
        <div className="relative overflow-hidden">
          <img
            src={testimonial.thumbnail || "/placeholder.svg"}
            alt={`${testimonial.name} video testimonial`}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleShowVideo}
              className="relative w-16 h-16 bg-white bg-opacity-95 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 hover:scale-110 animate-bounce-gentle group-hover:animate-pulse"
            >
              <Play className="w-8 h-8 text-orange-500 ml-1 transition-transform duration-200 group-hover:scale-110" />

              <div className="absolute inset-0 rounded-full border-2 border-white opacity-60 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-white opacity-40 animate-ping animation-delay-200"></div>
            </button>
          </div>

          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full opacity-40 animate-float animation-delay-500"></div>
          <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-float animation-delay-1000"></div>

          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-3 border-orange-100 shadow-md transition-transform duration-300 hover:scale-110"
            />
            <div className="animate-slide-in-right">
              <p className="font-bold text-base">{testimonial.name}</p>
              <p className="text-sm font-medium opacity-90">{testimonial.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center gap-3 text-center p-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <p className="text-white text-sm">Video unavailable on localhost</p>
                <p className="text-gray-300 text-xs">Deploy to see videos</p>
                <button onClick={handleStopVideo} className="text-orange-400 text-xs underline">
                  Go back
                </button>
              </div>
            </div>
          )}
          <iframe
            src={`${testimonial.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
            className="w-full aspect-[3/4] rounded-2xl"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            title={`${testimonial.name} testimonial video`}
          />
        </div>
      )}
    </div>
  )
}

const TextTestimonial = ({ testimonial, rotation }) => (
  <div
    className={`bg-white rounded-2xl p-6 shadow-lg transform ${rotation} hover:rotate-0 transition-transform duration-300`}
  >
    <div className="flex items-start gap-3 mb-4">
      <Quote className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
      <p className="text-gray-800 text-sm leading-relaxed">{testimonial.text}</p>
    </div>
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar || "/placeholder.svg"}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
      />
      <div>
        <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
        <p className="text-xs text-gray-600">{testimonial.role}</p>
      </div>
    </div>
  </div>
)

const TestimonialsGrid = () => {
  const rotations = [
    "rotate-1",
    "-rotate-1",
    "rotate-2",
    "-rotate-2",
    "rotate-3",
    "-rotate-2",
    "rotate-1",
    "-rotate-3",
    "rotate-2",
  ]
  const margins = ["", "ml-8", "", "mr-8", "", "ml-6", "mr-4", "", "mr-6"]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <section
        id="testimonials"
        className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 min-h-screen py-16 px-6 overflow-hidden rounded-[3rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] rounded-[3rem]"></div>

        <div className="absolute top-8 right-8 z-10">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              100+ HAPPY
              <br />
              USERS' LOVE
            </h2>
            <div className="max-w-md">
              <p className="text-white/90 text-sm leading-relaxed">
                Thank you for your praise and suggestions. With your support, we can go further. We hope to accompany
                you throughout your job search journey.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div
                  key={index}
                  className={`${margins[index]} transform ${testimonial.type === "video" ? rotations[index] : ""} ${testimonial.type === "video" ? "hover:rotate-0 hover:scale-105 transition-all duration-500" : ""}`}
                >
                  {testimonial.type === "video" ? (
                    <VideoTestimonial testimonial={testimonial} index={index} />
                  ) : (
                    <TextTestimonial testimonial={testimonial} rotation={rotations[index]} />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6 -mt-2 lg:-mt-4">
              {testimonials.slice(4, 8).map((testimonial, index) => (
                <div
                  key={index + 4}
                  className={`${margins[index + 4]} transform ${testimonial.type === "video" ? rotations[index + 4] : ""} ${testimonial.type === "video" ? "hover:rotate-0 hover:scale-105 transition-all duration-500" : ""}`}
                >
                  {testimonial.type === "video" ? (
                    <VideoTestimonial testimonial={testimonial} index={index + 4} />
                  ) : (
                    <TextTestimonial testimonial={testimonial} rotation={rotations[index + 4]} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {testimonials[8] && (
            <div className="mt-8 max-w-2xl mx-auto transform translate-x-8 -translate-y-4">
              {testimonials[8].type === "video" ? (
                <div className={`transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500`}>
                  <VideoTestimonial testimonial={testimonials[8]} index={8} />
                </div>
              ) : (
                <TextTestimonial testimonial={testimonials[8]} rotation="rotate-1" />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default TestimonialsGrid
