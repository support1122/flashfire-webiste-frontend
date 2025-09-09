
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

const screenshots = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/image6.jpg",
  "/images/image7.jpg",
  "/images/image8.jpg",
  "/images/image9.jpg",
  "/images/image10.jpg",
  "/images/image11.jpg",
  "/images/image12.png",
]

const rotations = [
  "rotate-2",
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-3",
  "-rotate-3",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
]

const VideoTestimonial = ({ testimonial, index }) => {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      const iframe = document.querySelector(`#video-${index}`)
      if (showVideo && iframe && !iframe.contains(e.target)) {
        setShowVideo(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showVideo])

  const rotationClass = !showVideo ? rotations[index % rotations.length] : ""

  return (
    <div
      className={`mb-2 inline-block w-full rounded-xl shadow-md transform ${rotationClass} hover:rotate-0 transition-all duration-300 p-2`}
    >
      {!showVideo ? (
        <div className="relative overflow-hidden">
          <img
            src={testimonial.thumbnail || "/placeholder.svg"}
            alt={`${testimonial.name} video testimonial`}
            className="w-full aspect-[3/4] object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowVideo(true)
              }}
              className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
            >
              <Play className="w-8 h-8 text-orange-500" />
            </button>
          </div>
        </div>
      ) : (
        <iframe
          id={`video-${index}`}
          src={`${testimonial.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
          className="w-full aspect-[3/4] rounded-xl"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={`${testimonial.name} testimonial video`}
        />
      )}
    </div>
  )
}


const TestimonialsGrid = () => {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 min-h-screen py-16 px-6 overflow-hidden rounded-[3rem]"
    >

      {/* <div className="text-center text-white mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Client Testimonials
          </h2>
          <p className="text-white/90 text-sm leading-relaxed max-w-xl mx-auto">
            See what our clients say about us through real screenshots and success stories.
          </p>
        </div> */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl  lg:text-6xl font-black text-white mb-6 leading-tight">
            100+ HAPPY
            <br />
            USERS' LOVE
          </h2>
          <div className="max-w-2xl">
            <p className="text-white/90 text-sm leading-relaxed">
              Thank you for your praise and suggestions. With your support, we can go further. We hope to accompany
              you throughout your job search journey.
            </p>
          </div>
        </div>

        {/* Image Testimonials */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 [column-fill:_balance]">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className={`mb-2 inline-block w-full rounded-xl shadow-md transform ${rotations[index % rotations.length]} hover:rotate-0 transition-all duration-300  p-2`}
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Testimonial ${index + 1}`}
                className="rounded-lg w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
              thumbnail: "/images/anjali.jpeg",
              name: "Anjali S.",
              avatar: "/images/anjali.jpeg",
            },
            {
              videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
              thumbnail: "images/rijul.jpg",
              name: "Rijul J.",
              avatar: "images/rijul.jpg",
            },
            {
              videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
              thumbnail: "/images/aryan.jpg",
              name: "Aryan G.",
              avatar: "/images/aryan.jpg",
            },
          ].map((video, index) => (
            <VideoTestimonial testimonial={video} index={index} key={index} />
          ))}

        </div>
      </div>
    </section>
  )
}

export default TestimonialsGrid







