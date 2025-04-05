"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Timeless Fashion,",
    subtitle: "Conscious Choices.",
    description:
      "Sustainably designed, ethically made. Our designs are timeless with premium materials and attention to detail that stands the test of time.",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Modern Elegance,",
    subtitle: "Sustainable Style.",
    description:
      "Crafted with care for the modern individual who values both aesthetics and ethics in their wardrobe choices.",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Effortless Beauty,",
    subtitle: "Ethical Essence.",
    description:
      "Discover pieces that blend contemporary design with responsible production for a wardrobe you can feel good about.",
  },
];

export default function FashionSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Text content */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-1">
                {slides[currentSlide].title}
              </h2>
              <h3 className="text-3xl md:text-4xl font-light italic text-gray-200 mb-4">
                {slides[currentSlide].subtitle}
              </h3>
              <p className="max-w-md text-sm md:text-base text-gray-200 mb-8">
                {slides[currentSlide].description}
              </p>

              <motion.button
                className="bg-white text-black px-6 py-2 rounded-full w-fit text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore the Collections
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots and arrows */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

        <div className="flex ml-4">
          <motion.button
            onClick={prevSlide}
            className="bg-white/20 backdrop-blur-sm rounded-full p-1 mr-1"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="bg-white/20 backdrop-blur-sm rounded-full p-1"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
