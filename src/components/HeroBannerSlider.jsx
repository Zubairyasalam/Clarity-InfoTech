"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function HeroBannerSlider({ slides, seoConfig = {}, badge = "" }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  const paginate = (newDirection) => {
    setSlideDirection(newDirection);
    setActiveSlide((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
  };

  useEffect(() => {
    if (isAutoPlayPaused || !slides || slides.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 2500);
    return () => clearInterval(timer);
  }, [activeSlide, isAutoPlayPaused, slides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section
      className="relative pt-24 sm:pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden min-h-[75vh] md:min-h-[82vh] flex items-center text-white select-none"
      onMouseEnter={() => setIsAutoPlayPaused(true)}
      onMouseLeave={() => setIsAutoPlayPaused(false)}
    >
      {/* Swipable Hero Background Slider */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={slideDirection}>
          <motion.div
            key={activeSlide}
            custom={slideDirection}
            variants={{
              enter: (direction) => ({
                x: direction > 0 ? "100%" : "-100%",
                opacity: 0,
                scale: 1.05
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
              },
              exit: (direction) => ({
                x: direction < 0 ? "100%" : "-100%",
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <img
              src={currentSlide.image || "/carousel-1.png"}
              alt={seoConfig.imageAlt ? `${seoConfig.imageAlt} - ${currentSlide.title || ''}` : (currentSlide.title || '')}
              title={seoConfig.imageTitle ? `${seoConfig.imageTitle} - ${currentSlide.title || ''}` : (currentSlide.title || '')}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Vertical and Scrim Gradients */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0A0E39]/75 via-[#0A0E39]/45 to-[#0A0E39]/85 pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-[#0A0E39]/95 via-[#0A0E39]/75 to-transparent pointer-events-none z-10" />
      </div>

      {/* Slide Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center w-full relative z-20">
        <h1
          key={`title-${activeSlide}`}
          className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight tracking-tight text-white mb-4 drop-shadow-2xl font-sans text-center max-w-4xl mx-auto"
        >
          <span className="block">{currentSlide.title}</span>
          {currentSlide.highlight && (
            <span className="text-sky-400 font-bold block mt-1 sm:mt-2 drop-shadow-md">
              {currentSlide.highlight}
            </span>
          )}
        </h1>

        <p
          key={`desc-${activeSlide}`}
          className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal drop-shadow-lg max-w-2xl mx-auto text-center font-sans"
        >
          {currentSlide.description}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-8 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white transition-all backdrop-blur-sm group cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-8 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white transition-all backdrop-blur-sm group cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </section>
  );
}
