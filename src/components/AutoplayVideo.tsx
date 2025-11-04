import { useRef, useCallback } from 'react'

type AutoplayVideoProps = {
	url: string
	className?: string
}

export default function AutoplayVideo({ url, className }: AutoplayVideoProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	const enableSound = useCallback(() => {
		const el = videoRef.current
		if (!el) return
		// Unmute and ensure playback continues with sound on user gesture
		el.muted = false
		if (el.paused) {
			el.play().catch(() => {})
		}
	}, [])

	return (
		<section className={`relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 ${className || ''}`} aria-label="product-video">
			{/* Background decorative elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-orange-200/30 to-red-200/20 rounded-full blur-3xl animate-pulse" />
				<div
					className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-red-200/20 to-orange-200/30 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-100/40 to-red-100/30 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			{/* Video container */}
			<div className="relative z-10 max-w-6xl mx-auto">
				<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
					<video
						ref={videoRef}
						src={url}
						className="w-full h-auto"
						autoPlay
						muted
						loop
						playsInline
						controls
						onClick={enableSound}
					/>
				</div>
			</div>
		</section>
	)
}


