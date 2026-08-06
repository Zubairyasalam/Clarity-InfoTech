"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide, isAutoPlayPaused, slides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[activeSlide] || slides[0];

  return (
    <section
      className="relative pt-24 sm:pt-32 md:pt-40 pb-24 md:pb-36 overflow-hidden min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center text-white select-none"
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

      {/* Glowing Chevron Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0A0E39]/90 hover:bg-[#2563EB] text-[#38BDF8] hover:text-white border-2 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(37,99,235,0.4)] backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} strokeWidth={2.5} className="text-[#38BDF8] group-hover:text-white transition-all group-hover:-translate-x-0.5 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0A0E39]/90 hover:bg-[#2563EB] text-[#38BDF8] hover:text-white border-2 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.6),0_0_40px_rgba(37,99,235,0.4)] backdrop-blur-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer group"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} strokeWidth={2.5} className="text-[#38BDF8] group-hover:text-white transition-all group-hover:translate-x-0.5 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
      </button>

      {/* Slide Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center w-full relative z-20">
        <h1
          key={`title-${activeSlide}`}
          className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-white mb-5 drop-shadow-2xl font-sans text-center"
        >
          <span>{currentSlide.title}</span>
          {currentSlide.highlight && (
            <span className="text-sky-400 font-black block mt-2 drop-shadow-md">
              {currentSlide.highlight}
            </span>
          )}
        </h1>

        <p
          key={`desc-${activeSlide}`}
          className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-normal drop-shadow-lg max-w-2xl mx-auto text-center font-sans"
        >
          {currentSlide.description}
        </p>
      </div>

      {/* Bottom Thumbnail / Pill Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <button
              key={slide.id || index}
              onClick={() => {
                setSlideDirection(index > activeSlide ? 1 : -1);
                setActiveSlide(index);
              }}
              className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-white text-slate-900 shadow-lg scale-105"
                  : "text-white/70 hover:text-white hover:bg-white/15"
              }`}
            >
              <span className="font-mono">0{index + 1}</span>
              {isActive && (
                <span className="hidden sm:inline font-sans text-[11px] font-bold tracking-tight">
                  {slide.slideLabel || slide.title || `Slide ${index + 1}`}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
