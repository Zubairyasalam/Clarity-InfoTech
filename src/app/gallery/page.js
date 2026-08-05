"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Play, Maximize2, Image as ImageIcon } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";

// Curated high-quality professional technology & workspace images from Unsplash
const DEFAULT_GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    alt: "Premium Developer Workspace",
    title: "Bespoke Workspace Setup"
  },
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "Enterprise Cloud Servers",
    title: "Secure Server Infrastructure"
  },
  {
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    alt: "System Architecture Mapping",
    title: "Solution Engineering Sprint"
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    alt: "Agile Development Sprint",
    title: "Collaborative Team Work"
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    alt: "High-Throughput Codebase",
    title: "Clean Production Code"
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    alt: "CIT Office Lounge",
    title: "Office Collaboration Lounge"
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    alt: "System Design Wireframe",
    title: "Bespoke System Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
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
  const [lightboxImg, setLightboxImg] = useState(null);

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DEFAULT_HEADER = {
    logo: "/logo.png",
    links: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "About Us", url: "/about" },
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
        if (parsed && parsed.links) {
          parsed.links = parsed.links.filter(l => l.label !== "Our Projects");
          if (!parsed.links.some(l => l.url === "/gallery")) {
            parsed.links.push({ id: 6, label: "Gallery", url: "/gallery" });
          }
          const linkOrder = ["/", "/about", "/our-services", "/gallery", "/contact"];
          parsed.links.sort((a, b) => {
            const idxA = linkOrder.indexOf(a.url);
            const idxB = linkOrder.indexOf(b.url);
            return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
          });
          localStorage.setItem("clarity_header", JSON.stringify(parsed));
          setHeaderData(parsed);
        }
      } catch (e) { }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#0F1631] font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      <SEOMetadata pageKey="gallery" />

      {/* PINNED WHITE NAVBAR */}
      <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200/80 flex items-center h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full">

          {/* Logo */}
          <a href="/" className="flex items-center group h-full">
            <img
              src={headerData.logo}
              alt={seoConfig.imageAlt || "Clarity InfoTech Logo"}
              title={seoConfig.imageTitle || "Clarity InfoTech"}
              className="w-auto h-8 sm:h-10 md:h-10 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105 filter brightness-90 contrast-200 drop-shadow-sm"
            />
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "Gallery";
              return (
                <a
                  key={link.label}
                  href={link.url}
                  className={`px-4 py-2 font-bold text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-600 font-extrabold"
                      : "text-slate-800 hover:text-indigo-600"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-900 transition-colors"
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
              className="md:hidden border-t border-gray-100 bg-white text-slate-900 w-full overflow-hidden absolute top-full left-0 shadow-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {headerData.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-base transition-colors ${
                      link.label === "Gallery" ? "text-indigo-600 font-bold" : "text-slate-700 hover:text-indigo-600"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="w-full">
        {/* HERO HEADER SECTION - ELEGANT DEEP NAVY BANNER */}
        <section className="relative py-14 sm:py-16 md:py-20 bg-[#0A0E39] text-white overflow-hidden select-none text-center">
          {/* Ambient Background Glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060926] via-[#0A0E39] to-[#0A0E39] opacity-95" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
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
              className="flex flex-col items-center space-y-4"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-sky-400/25 text-sky-300 text-xs font-semibold uppercase tracking-widest shadow-inner mb-1">
                <Sparkles size={14} className="text-sky-400 animate-pulse" />
                CIT Media & Highlights
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-sans leading-[1.15] drop-shadow-md">
                {galleryPageData.heroTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                {galleryPageData.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* VIDEO POSTS SECTION */}
        {galleryVideos && galleryVideos.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#FAF9F5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100 inline-block mb-3">
                  Featured Videos
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-900">
                  Our Videos
                </h2>
                <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Watch our team stories, project highlights, and event recaps
                </p>
              </motion.div>

              {/* Video Grid - 3 small boxes per row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {galleryVideos.map((vid, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                  >
                    {/* Media Container */}
                    <div className="relative w-full bg-slate-900 overflow-hidden" style={{ aspectRatio: '16/9' }}>
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
                              <Play size={36} className="text-white/30" />
                            </div>
                          )}

                          {/* Hover Tint Overlay */}
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />

                          {/* Play Badge Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => setPlayingVideo(i)}
                              className="w-12 h-12 rounded-full bg-white/90 group-hover:bg-white text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
                            >
                              <Play size={20} className="fill-indigo-600 ml-0.5" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* Close button when playing */}
                      {playingVideo === i && (
                        <button
                          onClick={() => setPlayingVideo(null)}
                          className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm transition border border-white/10 z-10"
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

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <Play size={12} className="text-indigo-500" /> Video Post
                        </span>
                        <button
                          onClick={() => setPlayingVideo(playingVideo === i ? null : i)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
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

        {/* PHOTO GALLERY SHOWCASE SECTION */}
        {galleryImages && galleryImages.length > 0 && (
          <section className="py-12 sm:py-16 bg-white border-t border-slate-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-600 border border-sky-100 inline-block mb-3">
                  Photo Showcase
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-900">
                  {galleryPageData.sectionTitle}
                </h2>
                <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {galleryPageData.sectionSubtitle}
                </p>
              </motion.div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => setLightboxImg(img)}
                    className="group relative bg-slate-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-64 border border-slate-200/60"
                  >
                    <img
                      src={img.url}
                      alt={img.alt || img.title || "Gallery image"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

                    {/* Image Caption & Zoom Button */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all">
                          <Maximize2 size={16} />
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base leading-snug drop-shadow">
                          {img.title || "Clarity Moment"}
                        </h4>
                        <p className="text-xs text-sky-200 font-medium mt-0.5 opacity-95">
                          {img.alt || "Workspace & Event"}
                        </p>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition"
              >
                <X size={20} />
              </button>
              <img
                src={lightboxImg.url}
                alt={lightboxImg.alt || lightboxImg.title}
                className="w-full max-h-[75vh] object-contain bg-black"
              />
              <div className="p-5 bg-slate-900 text-white border-t border-white/10">
                <h3 className="text-lg font-bold">{lightboxImg.title}</h3>
                {lightboxImg.alt && <p className="text-sm text-slate-400 mt-1">{lightboxImg.alt}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
