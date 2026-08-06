"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Play, Maximize2, Image as ImageIcon } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import HeroBannerSlider from "@/components/HeroBannerSlider";

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
    heroSubtitle: "A visual showcase of our workspace, team milestones, and event highlights."
  });

  const DEFAULT_GALLERY_VIDEOS = [
    {
      title: "The Secrets of Learning a New Language",
      url: "https://www.youtube.com/embed/NiTsduRreug",
      thumbnail: "https://img.youtube.com/vi/NiTsduRreug/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "AI & Machine Learning for Enterprises",
      url: "https://www.youtube.com/embed/aircAruvnKk",
      thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "Cybersecurity & Network Defense Architecture",
      url: "https://www.youtube.com/embed/inWWhr5tnEA",
      thumbnail: "https://img.youtube.com/vi/inWWhr5tnEA/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "Full-Stack Software Engineering Masterclass",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk",
      thumbnail: "https://img.youtube.com/vi/nu_pCVPKzTk/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "Computer Science & Systems Architecture",
      url: "https://www.youtube.com/embed/zOjov-2OZ0E",
      thumbnail: "https://img.youtube.com/vi/zOjov-2OZ0E/hqdefault.jpg",
      isLocal: false
    },
    {
      title: "System Design & High-Scalability Engineering",
      url: "https://www.youtube.com/embed/xpDnVSmNFX0",
      thumbnail: "https://img.youtube.com/vi/xpDnVSmNFX0/hqdefault.jpg",
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

      // Load gallery page content from admin
      const storedPageGallery = localStorage.getItem("clarity_page_gallery");
      if (storedPageGallery) {
        try {
          const parsed = JSON.parse(storedPageGallery);
          if (parsed.videos && parsed.videos.length > 0 && parsed.videos[0].title === "Cloud Infrastructure & DevOps Automation") {
            parsed.videos[0] = {
              title: "The Secrets of Learning a New Language",
              url: "https://www.youtube.com/embed/NiTsduRreug",
              thumbnail: "https://img.youtube.com/vi/NiTsduRreug/hqdefault.jpg",
              isLocal: false
            };
            localStorage.setItem("clarity_page_gallery", JSON.stringify(parsed));
          }
          setGalleryPageData(prev => ({ ...prev, ...parsed }));
        } catch (e) { }
      }

      // Load gallery videos from admin — edu key
      const storedVideos = localStorage.getItem("clarity_gallery_videos_edu");
      if (storedVideos) {
        try {
          const parsed = JSON.parse(storedVideos);
          const validVideos = Array.isArray(parsed) ? parsed.filter(v => v.url && v.url.trim() !== "") : [];
          if (validVideos.length > 0) {
            setGalleryVideos(validVideos);
          } else {
            setGalleryVideos(DEFAULT_GALLERY_VIDEOS);
            localStorage.setItem("clarity_gallery_videos_edu", JSON.stringify(DEFAULT_GALLERY_VIDEOS));
          }
        } catch (e) { }
      } else {
        setGalleryVideos(DEFAULT_GALLERY_VIDEOS);
        localStorage.setItem("clarity_gallery_videos_edu", JSON.stringify(DEFAULT_GALLERY_VIDEOS));
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
        {/* HERO SLIDER BANNER SECTION */}
        <HeroBannerSlider
          slides={[
            {
              id: 1,
              title: "A Visual Showcase",
              highlight: "Of Our Moments & Workspace",
              description: "Explore our vibrant engineering workspace, team hackathons, technology summits, and corporate event highlights.",
              buttonText: "View Gallery",
              buttonLink: "#gallery-photos",
              slideLabel: "Moments",
              image: "/carousel-1.png"
            },
            {
              id: 2,
              title: "Inside Our Modern",
              highlight: "Innovation Hub",
              description: "A glimpse inside our collaborative workspace where developers, architects, and designers build high-tech platforms.",
              buttonText: "Workspace Hub",
              buttonLink: "#gallery-photos",
              slideLabel: "Workspace",
              image: "/carousel-2.png"
            },
            {
              id: 3,
              title: "Tech Milestones &",
              highlight: "Team Culture",
              description: "Celebrating team achievements, engineering sprints, continuous learning, and shared project success.",
              buttonText: "Culture & Sprints",
              buttonLink: "#gallery-photos",
              slideLabel: "Culture",
              image: "/carousel-3.png"
            },
            {
              id: 4,
              title: "Connecting Tech Teams",
              highlight: "Worldwide",
              description: "Building strong client partnerships and enterprise digital products together.",
              buttonText: "Get In Touch",
              buttonLink: "/contact",
              slideLabel: "Global Team",
              image: "/carousel-4.png"
            }
          ]}
          seoConfig={{ imageAlt: "Clarity InfoTech Gallery", imageTitle: "Clarity InfoTech Moments & Team" }}
          badge={galleryPageData.heroBadge || "GALLERY"}
        />

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
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800 mb-3">
                  Our Videos
                </h2>
                <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
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
