"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"


const slides = [
  {
    id: 1,
    image: "/slider/img-1.webp",
    title: "Effortless Elegance",
    description:
      "Thoughtfully curated collections designed for modern living. Blending timeless aesthetics with a commitment to sustainability and quality.",
  },
  {
    id: 2,
    image: "/slider/img-2.jpeg",
    title: "Coastal Refinement",
    description:
      "Inspired by nature's tranquility. Our pieces bring together relaxed silhouettes with premium materials for an understated luxury experience.",
  },
  {
    id: 3,
    image: "/slider/img-3.webp",
    title: "Conscious Style",
    description:
      "Ethically crafted garments that respect both tradition and innovation. Designed to last beyond seasons with enduring appeal.",
  },
]

export default function BeachSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAutoPlaying])

  return (
    <div
      className="relative w-full max-w-[1400px] h-[600px] overflow-hidden mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation arrows at top right */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <motion.button
          onClick={prevSlide}
          className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 text-gray-700" />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="relative w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Dark overlay filter */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-12 md:px-24">
              <motion.h2
                className="text-5xl md:text-7xl font-light text-white mb-4 tracking-wider text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {slides[currentSlide].title}
              </motion.h2>

              <motion.p
                className="max-w-md text-sm md:text-base text-white/90 mb-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>

            {/* Button at the bottom center */}
            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore the Collections
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
