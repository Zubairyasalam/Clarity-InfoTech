"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Play } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";

// Curated high-quality professional technology & workspace images from Unsplash
const DEFAULT_GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Premium Developer Workspace",
    title: "Bespoke Workspace Setup"
  },
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Enterprise Cloud Servers",
    title: "Secure Server Infrastructure"
  },
  {
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "System Architecture Mapping",
    title: "Solution Engineering Sprint"
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Agile Development Sprint",
    title: "Collaborative Team Work"
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "High-Throughput Codebase",
    title: "Clean Production Code"
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "CIT Office Lounge Chennai",
    title: "Office Collaboration Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "System Design Wireframe",
    title: "Bespoke System Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&h=800&q=80",
    alt: "Fiber Networking Infrastructure",
    title: "High-Speed Fiber Telemetry"
  }
];

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);
  const [galleryImages, setGalleryImages] = useState(DEFAULT_GALLERY_IMAGES);

  const [galleryPageData, setGalleryPageData] = useState({
    heroTitle: "Our Gallery",
    heroSubtitle: "A visual showcase of our workspace, team milestones, and event highlights.",
    sectionTitle: "Glimpses of Clarity Moments",
    sectionSubtitle: "A sneak peek into our events, celebrations, and team experiences."
  });
  const DEFAULT_GALLERY_VIDEOS = [
    {
      title: "Cloud Infrastructure & DevOps Automation",
      url: "https://www.youtube.com/embed/M988_fsOSWo",
      thumbnail: "https://img.youtube.com/vi/M988_fsOSWo/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "AI & Machine Learning in Modern Enterprises",
      url: "https://www.youtube.com/embed/aircAruvnKk",
      thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "Cybersecurity & Secure System Architecture",
      url: "https://www.youtube.com/embed/inWWhr5tnEA",
      thumbnail: "https://img.youtube.com/vi/inWWhr5tnEA/hqdefault.jpg",
      isLocal: false
    }
  ];
  const [galleryVideos, setGalleryVideos] = useState(DEFAULT_GALLERY_VIDEOS);
  const [playingVideo, setPlayingVideo] = useState(null);

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "Clarity InfoTech Photo Gallery",
    imageTitle: "Gallery and Media Showcase"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.gallery) {
            setSeoConfig(config.gallery);
          }
        } catch (e) { }
      }

      // Load gallery images from admin
      const storedImages = localStorage.getItem("clarity_gallery_images");
      if (storedImages) {
        try {
          const parsed = JSON.parse(storedImages);
          if (Array.isArray(parsed) && parsed.length > 0) setGalleryImages(parsed);
        } catch (e) { }
      }

      // Load gallery page content from admin
      const storedPageGallery = localStorage.getItem("clarity_page_gallery");
      if (storedPageGallery) {
        try {
          setGalleryPageData(prev => ({ ...prev, ...JSON.parse(storedPageGallery) }));
        } catch (e) { }
      }

      // Load gallery videos from admin — v2 key (clears stale entries)
      const storedVideos = localStorage.getItem("clarity_gallery_videos_v2");
      if (storedVideos) {
        try {
          const parsed = JSON.parse(storedVideos);
          const validVideos = Array.isArray(parsed) ? parsed.filter(v => v.url && v.url.trim() !== "") : [];
          if (validVideos.length > 0) {
            setGalleryVideos(validVideos);
          } else {
            setGalleryVideos(DEFAULT_GALLERY_VIDEOS);
            localStorage.setItem("clarity_gallery_videos_v2", JSON.stringify(DEFAULT_GALLERY_VIDEOS));
          }
        } catch (e) { }
      }
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DEFAULT_HEADER = {
    logo: "/logo.png",
    links: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "About Us", url: "/about" },
      { id: 3, label: "Our Projects", url: "/services" },
      { id: 4, label: "Our Services", url: "/our-services" },
      { id: 6, label: "Gallery", url: "/gallery" },
      { id: 5, label: "Contact", url: "/contact" }
    ]
  };
  const [headerData, setHeaderData] = useState(DEFAULT_HEADER);
  useEffect(() => {
    const stored = localStorage.getItem("clarity_header");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.links && !parsed.links.some(l => l.url === "/gallery")) {
          const updatedLinks = [...parsed.links];
          const contactIdx = updatedLinks.findIndex(l => l.url === "/contact");
          if (contactIdx !== -1) {
            updatedLinks.splice(contactIdx, 0, { id: 6, label: "Gallery", url: "/gallery" });
          } else {
            updatedLinks.push({ id: 6, label: "Gallery", url: "/gallery" });
          }
          parsed.links = updatedLinks;
          localStorage.setItem("clarity_header", JSON.stringify(parsed));
        }
        setHeaderData(parsed);
      } catch (e) { }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#0F1631] font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      <SEOMetadata pageKey="gallery" />

      {/* Styled Responsive Variables & CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap');
        
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-50% - 12px), 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        
        .bg-grid-light {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(15, 22, 49, 0.015) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(15, 22, 49, 0.015) 1px, transparent 1px);
        }

        @keyframes kenBurns {
          0%   { transform: scale(1)    translate(0%, 0%); }
          25%  { transform: scale(1.08) translate(-1%, -1%); }
          50%  { transform: scale(1.12) translate(1%, 0.5%); }
          75%  { transform: scale(1.08) translate(0%, 1%); }
          100% { transform: scale(1)    translate(0%, 0%); }
        }
        .gallery-img {
          animation: kenBurns 8s ease-in-out infinite;
          will-change: transform;
        }
      `}} />

      {/* NAVBAR WITH DYNAMIC CONTRAST LIGHT/DARK STYLE */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center h-16 md:h-20 ${isScrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full overflow-visible">

          {/* Logo */}
          <a href="/" className="flex items-center group h-full overflow-visible relative">
            <img
              src={headerData.logo}
              alt={seoConfig.imageAlt || "Clarity InfoTech Logo"}
              title={seoConfig.imageTitle || "Clarity InfoTech"}
              className={`w-auto h-8 sm:h-10 md:h-10 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105 filter ${isScrolled
                ? "brightness-90 contrast-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                : "brightness-150 contrast-125 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                }`}
            />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "Gallery";
              return (
                <a
                  key={link.label}
                  href={link.url}
                  className={`px-5 py-2 font-bold text-sm transition-colors duration-200 ${isScrolled
                    ? isActive
                      ? "text-indigo-600 font-extrabold"
                      : "text-slate-900 hover:text-indigo-600"
                    : isActive
                      ? "text-sky-400 font-extrabold"
                      : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-150 ${isScrolled ? "text-slate-900" : "text-white"
              }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-navy/5 bg-[#0A0E39] text-white w-full overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                {headerData.links.map((link) => {
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-semibold text-lg transition-colors ${link.label === "Gallery" ? "text-sky-400 font-bold" : "text-white/80 hover:text-white"
                        }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="w-full">
        {/* HERO HEADER SECTION - MATCHING ABOUT US LAYOUT */}
        <section className="relative pt-20 pb-8 md:pt-24 md:pb-10 bg-[#0A0E39] text-white overflow-hidden select-none text-center">

          {/* Ambient Glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E39] via-[#0D134D] to-[#0A0E39] opacity-95" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />



          <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 relative"
            >
              <div className="relative inline-block">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sans relative z-10 leading-[1.15]">
                  {galleryPageData.heroTitle}
                </h1>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-xl mx-auto leading-relaxed">
                {galleryPageData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* GRADIENT HEADING SECTION BETWEEN HERO AND CAROUSEL */}
        <section className="pt-8 pb-2 bg-[#FAF9F5] text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800">
              {galleryPageData.sectionTitle}
            </h2>
            <p className="mt-4 text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              {galleryPageData.sectionSubtitle}
            </p>
          </motion.div>
        </section>

        {/* IMAGE CAROUSEL SECTION WITH SOFT LIGHT BACKGROUND */}
        <section className="pt-8 pb-2 bg-[#FAF9F5] overflow-hidden bg-grid-light relative">
          <div className="w-full select-none">



            <div className="animate-marquee flex gap-5 md:gap-6 py-8">
              {/* Carousel Set 1 */}
              {galleryImages.map((img, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={`mq-stg1-${i}`}
                    className={`relative w-56 md:w-64 h-72 md:h-[350px] rounded-[18px] md:rounded-[22px] overflow-hidden flex-shrink-0 shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:z-20 cursor-pointer group ${isEven ? "-translate-y-3 md:-translate-y-4" : "translate-y-3 md:translate-y-4"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="gallery-img w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-white font-bold text-sm">
                        {img.title}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Carousel Duplicate Set 2 */}
              {galleryImages.map((img, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={`mq-stg2-${i}`}
                    className={`relative w-56 md:w-64 h-72 md:h-[350px] rounded-[18px] md:rounded-[22px] overflow-hidden flex-shrink-0 shadow-md hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:z-20 cursor-pointer group ${isEven ? "-translate-y-3 md:-translate-y-4" : "translate-y-3 md:translate-y-4"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="gallery-img w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-white font-bold text-sm">
                        {img.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VIDEO POSTS SECTION */}
        {galleryVideos && galleryVideos.length > 0 && (
          <section className="py-12 bg-[#FAF9F5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800">
                  Our Videos
                </h2>
                <p className="mt-4 text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Watch our team stories, project highlights, and event recaps
                </p>
              </motion.div>



              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleryVideos.map((vid, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Media Container */}
                    <div className="relative w-full bg-slate-900 overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '280px' }}>
                      {playingVideo === i ? (
                        vid.url && (vid.url.includes("youtube") || vid.url.includes("youtu.be") || vid.url.includes("vimeo")) ? (
                          <iframe
                            src={vid.url.includes("youtu.be") ? vid.url.replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1" : vid.url + "?autoplay=1"}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          <video src={vid.url} autoPlay controls className="w-full h-full object-cover" />
                        )
                      ) : (
                        <>
                          {/* Thumbnail Image */}
                          {vid.thumbnail ? (
                            <img
                              src={vid.thumbnail}
                              alt={vid.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                              <Play size={44} className="text-white/30" />
                            </div>
                          )}

                          {/* Hover Tint Overlay */}
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />

                          {/* Play Badge Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => setPlayingVideo(i)}
                              className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
                            >
                              <Play size={28} className="fill-indigo-600 ml-0.5" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* Close button when playing */}
                      {playingVideo === i && (
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm transition border border-white/10 z-10"
                        >
                          Close Player
                        </button>
                      )}
                    </div>

                    {/* Card Content & Action Bar */}
                    <div className="p-5 bg-white flex flex-col justify-between flex-1 gap-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {vid.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-400 mt-1">Clarity InfoTech Media</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <Play size={12} className="text-indigo-500" /> Video Post
                        </span>
                        <button
                          onClick={() => setPlayingVideo(playingVideo === i ? null : i)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {playingVideo === i ? "Stop Video" : "Watch Now →"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
