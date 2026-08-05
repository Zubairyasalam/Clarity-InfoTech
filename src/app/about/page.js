"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import {
  Lightbulb,
  Star,
  Users,
  Target,
  Check,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import DynamicIcon from "@/components/DynamicIcon";

import * as LucideIcons from "lucide-react";

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "About Clarity InfoTech",
    imageTitle: "Clarity InfoTech Team"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.about) {
            setSeoConfig(config.about);
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

      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      } catch { }
    }
  }, []);

  const DEFAULT_PAGE_ABOUT = {
    heroTitle: "About Us",
    heroSubtitle: "Pioneering technology solutions and empowering digital growth since 2016.",
    aboutTitle: "About Clarity InfoTech",
    aboutParagraph1: "Clarity InfoTech is a technology-driven company focused on building innovative digital solutions that help businesses grow, streamline operations, and stay ahead in a fast-changing digital world. We specialize in transforming ideas into practical, scalable, and user-friendly software products that solve real business challenges.",
    aboutParagraph2: "Founded with a vision to combine technology, creativity, and business strategy, Clarity InfoTech works with startups, enterprises, and organizations to deliver high-quality web applications, mobile apps, business platforms, and custom digital solutions. Our team is passionate about creating products that are not only visually modern but also technically strong, reliable, and performance-focused.",
    valuesPill: "03 / CORE PRINCIPLES",
    valuesTitle: "Our Values",
    valuesSubtitle: "The principles that guide everything we build and deliver.",
    valuesCards: [
      { step: "01", title: "Innovation", icon: "Lightbulb", gradient: "from-sky-400 to-indigo-600", tag: "Future Tech", desc: "We explore new ideas, tools, and cutting-edge frameworks to build future-ready, intelligent digital solutions." },
      { step: "02", title: "Excellence", icon: "Star", gradient: "from-indigo-500 to-purple-600", tag: "Craftsmanship", desc: "We aim for zero-compromise precision in every project, with extreme attention to detail, performance, and UI usability." },
      { step: "03", title: "Collaboration", icon: "Users", gradient: "from-blue-500 to-sky-400", tag: "Shared Vision", desc: "We partner closely with clients and cross-functional squads, believing transparent communication creates the best results." },
      { step: "04", title: "Results", icon: "Target", gradient: "from-purple-500 to-indigo-600", tag: "Measurable Impact", desc: "We focus on building software products that create real, quantifiable business value and empower digital growth." }
    ],
    approachTitle: "Our Approach",
    approachParagraph1: "At Clarity InfoTech, every project begins with understanding the client’s vision, goals, and challenges. We follow a practical and collaborative approach where planning, design, development, testing, and deployment are all handled with attention to quality and performance.",
    approachParagraph2: "We don’t just develop software — we build digital experiences that support long-term business success. Our team works closely with clients to ensure transparency, adaptability, and timely delivery throughout the project lifecycle.",
    whyChooseTitle: "Why Choose Clarity InfoTech",
    whyChooseList: [
      "Strong focus on quality, performance, and usability",
      "Expertise in modern web and software technologies",
      "Business-oriented solutions tailored to real-world needs",
      "Clean and responsive UI with scalable architecture",
      "Dedicated team support from idea to deployment",
      "Commitment to innovation, reliability, and client satisfaction"
    ]
  };
  const [pageAboutData, setPageAboutData] = useState(DEFAULT_PAGE_ABOUT);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_page_about");
    if (stored) {
      try { setPageAboutData({ ...DEFAULT_PAGE_ABOUT, ...JSON.parse(stored) }); } catch { }
    }
  }, []);

  const whyChooseList = pageAboutData.whyChooseList;
  // old array removed

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#0F1631] font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-600">
      <SEOMetadata pageKey="about" />

      {/* 1. NAVBAR - ALWAYS 100% TRANSPARENT WITH DYNAMIC CONTRAST TEXT */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center h-16 md:h-20 ${isScrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full overflow-visible">

          {/* Prominently Enlarged & Ultra-Visible Home Logo */}
          <a href="/" className="flex items-center group h-full overflow-visible relative">
            <img
              src={headerData.logo}
              alt={seoConfig.imageAlt || "Clarity InfoTech Logo"}
              title={seoConfig.imageTitle || "Clarity InfoTech"}
              className={`w-auto h-8 sm:h-10 md:h-10 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105 filter ${
                isScrolled
                  ? "brightness-90 contrast-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  : "brightness-150 contrast-125 drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
              }`}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "About Us";
              return (
                <a
                  key={link.label}
                  href={link.url}
                  className={`px-5 py-2 font-bold text-sm transition-colors duration-200 ${
                    isScrolled
                      ? isActive
                        ? "text-indigo-600 font-extrabold"
                        : "text-slate-900 hover:text-indigo-600"
                      : isActive
                        ? "text-sky-400 font-extrabold drop-shadow-[0_2px_8px_rgba(56,189,248,0.5)]"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-150 ${
              isScrolled ? "text-slate-900" : "text-white"
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
                  const isActive = link.label === "About Us";
                  return (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-lg transition-colors ${link.label === "About Us" ? "text-sky-400 font-bold" : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </a>
                  );
                })}
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthMode("login"); setAuthModalOpen(true); }}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-center mt-2 shadow-md"
                >
                  Client Console
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="w-full">

        {/* 2. HERO HEADER SECTION - RICH DEEP NAVY BANNER */}
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 bg-[#0A0E39] text-white overflow-hidden select-none text-center">
          {/* Ambient Glows */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E39] via-[#0D134D] to-[#0A0E39] opacity-95" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-sans text-white drop-shadow-md"
            >
              {pageAboutData.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {pageAboutData.heroSubtitle}
            </motion.p>
          </div>
        </section>

        {/* 3. ABOUT CLARITY INFOTECH NARRATIVE */}
        <section className="pt-4 pb-12 md:pb-16 px-6 max-w-4xl mx-auto text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800">
              {pageAboutData.aboutTitle}
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8 font-normal">
              {pageAboutData.aboutParagraph1}
            </p>

            <div className="w-full h-[1px] bg-slate-200 my-10" />

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {pageAboutData.aboutParagraph2}
            </p>
          </motion.div>
        </section>

        {/* 4. OUR VALUES SECTION - MODERN GLASSMORPHIC CARDS DESIGN */}
        <section className="py-10 md:py-12 px-6 bg-slate-50/80 border-t border-b border-slate-200/70 relative overflow-hidden text-left">
          {/* Ambient Background Gradients */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-block bg-indigo-50 text-indigo-600 border border-indigo-200/80 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider uppercase mb-4 shadow-sm">
                {pageAboutData.valuesPill}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800 mb-4">
                {pageAboutData.valuesTitle}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-light max-w-xl mx-auto">
                {pageAboutData.valuesSubtitle}
              </p>
            </div>

            {/* 4 Cards Grid Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageAboutData.valuesCards.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-3xl p-7 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Corner Accent Pill */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-indigo-600 transition-colors">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                        {item.tag}
                      </span>
                    </div>

                    {/* Icon Container */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}>
                        <DynamicIcon name={item.icon} size={28} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-extrabold text-2xl text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors font-sans">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Hover Bar */}
                    <div className={`mt-6 h-[3px] w-0 group-hover:w-full bg-gradient-to-r ${item.gradient} rounded-full transition-all duration-500`} />
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. 2-COLUMN SECTION: OUR APPROACH & WHY CHOOSE US */}
        <section className="py-20 md:py-28 px-6 max-w-6xl mx-auto text-left">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left Column: Our Approach */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800">
                {pageAboutData.approachTitle}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {pageAboutData.approachParagraph1}
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {pageAboutData.approachParagraph2}
              </p>
            </motion.div>

            {/* Right Column: Why Choose Clarity InfoTech */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800">
                {pageAboutData.whyChooseTitle}
              </h2>

              <div className="space-y-4">
                {whyChooseList.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-100 transition-all cursor-default"
                  >
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-indigo-600/30">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>



      </main>

      <Footer />

      {/* Floating Scroll-to-Top Blue Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/20"
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
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
