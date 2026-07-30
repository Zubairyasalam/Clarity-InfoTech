"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import DynamicIcon from "@/components/DynamicIcon";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowUp, Lightbulb, Users2, TrendingUp,
  Globe, Star, Handshake, BookOpen, Heart, Zap, Award,
  Code2, Smartphone, Cloud, Shield, Cpu, BarChart3,
  Share2, Link2, AtSign, Rss,
  MapPin, Phone, Mail, ArrowUpCircle
} from "lucide-react";

export default function OurServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCircle, setActiveCircle] = useState("Growth");

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "Our Services DevOps Cloud Bespoke Software",
    imageTitle: "Clarity InfoTech Services"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.services) {
            setSeoConfig(config.services);
          }
        } catch (e) { }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const DEFAULT_HEADER = {
    logo: "/logo.png",
    links: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "About Us", url: "/about" },
      { id: 3, label: "Our Projects", url: "/services" },
      { id: 4, label: "Our Services", url: "/our-services" },
      { id: 5, label: "Contact", url: "/contact" }
    ]
  };
  const [headerData, setHeaderData] = useState(DEFAULT_HEADER);


  const getIcon = (name) => {
    return (props) => <DynamicIcon name={name} {...props} />;
  };

  const DEFAULT_PAGE_SERVICE = {
    heroTitle: "Our Service",
    heroSubtitle: "We believe great products are built by happy, collaborative teams.",
    sec1Title: "Building Future-Ready Teams Through Innovation",
    sec1Description: "At Clarity InfoTech, we foster an environment where creativity, learning, and team coordination are valued. We support every team member in reaching their potential, encouraging open collaboration, and building high-performance digital products together.",
    coreValues: [
      { title: "Innovation First", icon: "Lightbulb", desc: "We encourage creativity, experimentation, and continuous learning." },
      { title: "Collaborative Environment", icon: "Users", desc: "Every project is built through teamwork, communication, and shared success." },
      { title: "Growth & Learning", icon: "TrendingUp", desc: "Employees receive mentorship, training, and opportunities to grow." }
    ],
    serviceCards: [
      { title: "Web Development", icon: "Code2", desc: "Modern, responsive web apps tailored to your brand and business goals." },
      { title: "Mobile Apps", icon: "Smartphone", desc: "Native-feel iOS & Android apps built for performance and scale." },
      { title: "Cloud Services", icon: "Cloud", desc: "Reliable, scalable cloud infrastructure with 99.9% uptime SLAs." },
      { title: "AI Solutions", icon: "Cpu", desc: "Intelligent automation and ML models to supercharge your operations." },
      { title: "Cybersecurity", icon: "Shield", desc: "End-to-end security audits, VAPT, and compliance frameworks." },
      { title: "Data Analytics", icon: "BarChart3", desc: "Real-time dashboards and BI that turn data into decisions." }
    ],
    sec2Badge: "02 / OUR CULTURE & TEAM IMPACT",
    sec2Title: "Building Great Teams, Creating Greater Impact!",
    sec2Subtitle: "At Clarity InfoTech, we foster a culture of innovation, collaboration, and continuous learning where every individual grows and makes a real-world difference.",
    circleNodes: [
      { label: "Innovation", icon: "Zap", desc: "Cutting-edge technology solutions that push boundaries." },
      { label: "Excellence", icon: "Star", desc: "Delivering nothing short of the highest quality in every project." },
      { label: "Wellness", icon: "Heart", desc: "We care deeply about the wellbeing of our team and clients." },
      { label: "Learning", icon: "BookOpen", desc: "Continuous upskilling keeps our team at the forefront." },
      { label: "Collaboration", icon: "Handshake", desc: "Open communication and shared ownership drive our results." },
      { label: "Growth", icon: "TrendingUp", desc: "We believe in nurturing talent and providing clear paths for personal and professional advancement through continuous mentorship." }
    ],
    sec3Title: "Connecting Businesses and Innovation Worldwide",
    sec3Description: "Clarity InfoTech proudly partners with businesses across multiple countries, delivering innovative digital solutions that drive growth and transformation. We write custom software development and enterprise platforms, AI-powered solutions, cloud technologies, and enterprise platforms. We help organisations achieve their goals with scalable, secure, and high-performance products.",
    stats: [
      { value: "15+", label: "Countries Served", icon: "Globe" },
      { value: "500+", label: "Products & Projects", icon: "Award" },
      { value: "50+", label: "Global Partners", icon: "Handshake" },
      { value: "100%", label: "Client Satisfaction", icon: "Star" }
    ],
    ctaTitle: "Ready to Start Your Journey With Us?",
    ctaSubtitle: "Let's discuss how we can help your business grow with the right technology and the right team.",
    ctaButtonText: "Get In Touch"
  };

  const [pageServiceData, setPageServiceData] = useState(DEFAULT_PAGE_SERVICE);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_header");
    if (stored) {
      try { setHeaderData(JSON.parse(stored)); } catch { }
    }

    const storedService = localStorage.getItem("clarity_page_service");
    if (storedService) {
      try { setPageServiceData({ ...DEFAULT_PAGE_SERVICE, ...JSON.parse(storedService) }); } catch { }
    }
  }, []);

  const coreValues = (pageServiceData.coreValues || DEFAULT_PAGE_SERVICE.coreValues).map(v => ({
    ...v,
    icon: getIcon(v.icon)
  }));

  const serviceCardsList = (pageServiceData.serviceCards || DEFAULT_PAGE_SERVICE.serviceCards).map(c => ({
    ...c,
    icon: getIcon(c.icon)
  }));

  const circleAngles = [-60, 0, 60, 120, 180, 240];
  const circleNodes = (pageServiceData.circleNodes || DEFAULT_PAGE_SERVICE.circleNodes).map((node, idx) => ({
    ...node,
    angle: circleAngles[idx % 6],
    icon: getIcon(node.icon)
  }));

  const stats = (pageServiceData.stats || DEFAULT_PAGE_SERVICE.stats).map(s => ({
    ...s,
    icon: getIcon(s.icon)
  }));

  const activeNode = circleNodes.find(n => n.label === activeCircle) || circleNodes[5] || circleNodes[0];

  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] font-sans antialiased overflow-x-hidden">
      <SEOMetadata pageKey="services" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, #1E67E2 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .circle-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .node-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #1E67E2;
          background: white;
          transition: all 0.3s ease;
        }
        .node-icon-wrap.active {
          background: #1E67E2;
          box-shadow: 0 0 0 6px rgba(30,103,226,0.15);
        }
        .node-icon-wrap:hover {
          background: #1E67E2;
        }
        .node-icon-wrap:hover svg {
          color: white !important;
        }
        .world-map {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cellipse cx='600' cy='300' rx='580' ry='270' fill='%23e8f0fe' stroke='%23c7d8f8' stroke-width='1'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center h-16 md:h-20 ${isScrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full overflow-visible">
          <a href="/" className="flex items-center group h-full overflow-visible">
            <img src={headerData.logo} alt={seoConfig.imageAlt || "Clarity InfoTech"} title={seoConfig.imageTitle || "Clarity InfoTech"}
              className={`w-auto h-8 sm:h-10 md:h-10 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105 filter ${isScrolled ? "brightness-90 contrast-200" : "brightness-150 contrast-125"}`} />
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "Our Services";
              return (
                <a key={link.label} href={link.url}
                  className={`px-4 py-2 font-semibold text-sm transition-all duration-200 rounded-md ${isActive ? "bg-[#1E67E2] text-white" : isScrolled ? "text-gray-700 hover:text-[#1E67E2]" : "text-white/90 hover:text-white"}`}>
                  {link.label}
                </a>
              );
            })}
          </nav>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors ${isScrolled ? "text-gray-800" : "text-white"}`} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl overflow-hidden">
              <div className="px-6 py-6 flex flex-col gap-4">
                {headerData.links.map((link) => {
                  const isActive = link.label === "Our Services";
                  return (
                  <a key={link.label} href={link.url} onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-base transition-colors py-1 ${link.label === "Our Services" ? "text-[#1E67E2]" : "text-gray-700 hover:text-[#1E67E2]"}`}>
                    {link.label}
                  </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative bg-[#0A0E39] text-white text-center pt-16 md:pt-20 pb-2 md:pb-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1244] to-[#0A0E39] opacity-90" />
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              {pageServiceData.heroTitle || "Our Service"}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 text-base sm:text-lg">
              {pageServiceData.heroSubtitle || "We believe great products are built by happy, collaborative teams."}
            </motion.p>
          </div>
        </section>

        {/* ── SECTION 1: Building Future-Ready Teams ── */}
        <section className="py-8 md:py-10 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left Content */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-5 gradient-text">
                  {pageServiceData.sec1Title || "Building Future-Ready Teams Through Innovation"}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                  {pageServiceData.sec1Description || "At Clarity InfoTech, we foster an environment where creativity, learning, and team coordination are valued. We support every team member in reaching their potential, encouraging open collaboration, and building high-performance digital products together."}
                </p>
                <div className="flex flex-col gap-6">
                  {coreValues.map((val, idx) => {
                    const Ico = val.icon;
                    return (
                      <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border-2 border-[#1E67E2]/30 bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Ico size={18} className="text-[#1E67E2]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1a1a2e] text-sm mb-0.5">{val.title}</h4>
                          <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Right: Service Cards Grid */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 gap-4">
                {serviceCardsList.map((card, idx) => {
                  const Ico = card.icon;
                  return (
                    <motion.div key={idx} whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(30,103,226,0.12)" }}
                      className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#1E67E2] transition-colors">
                        <Ico size={18} className="text-[#1E67E2] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a1a2e] text-xs mb-1">{card.title}</h4>
                        <p className="text-gray-400 text-[11px] leading-relaxed">{card.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Building Great Teams, Creating Greater Impact ── */}
        <section className="relative py-14 md:py-20 px-6 bg-gradient-to-b from-[#0A0E39] via-[#0D134D] to-[#0A0E39] text-white overflow-hidden">
          {/* Ambient Glow Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Grid pattern backdrop */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold font-mono tracking-widest uppercase text-sky-400 bg-sky-400/10 border border-sky-400/25 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                {pageServiceData.sec2Badge || "02 / OUR CULTURE & TEAM IMPACT"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white font-sans">
                {pageServiceData.sec2Title || "Building Great Teams, Creating Greater Impact!"}
              </h2>
              <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                {pageServiceData.sec2Subtitle || "At Clarity InfoTech, we foster a culture of innovation, collaboration, and continuous learning where every individual grows and makes a real-world difference."}
              </p>
            </div>

            {/* Interactive Grid & Orbital Core Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: 3 Pillar Cards */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {circleNodes.slice(0, 3).map((node) => {
                  const Ico = node.icon;
                  const isActive = activeCircle === node.label;
                  return (
                    <motion.div
                      key={node.label}
                      onClick={() => setActiveCircle(node.label)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600/30 to-sky-500/20 border-sky-400/60 shadow-lg shadow-sky-500/10"
                          : "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-sky-400" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive ? "bg-sky-400 text-[#0A0E39] shadow-md shadow-sky-400/30" : "bg-white/10 text-white/80"
                        }`}>
                          <Ico size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-base transition-colors ${isActive ? "text-sky-300" : "text-white"}`}>
                              {node.label}
                            </h4>
                            {isActive && (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">Active</span>
                            )}
                          </div>
                          <p className="text-white/60 text-xs mt-1 leading-relaxed line-clamp-2">
                            {node.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Center Column: Futuristic Orbital Core Visualizer */}
              <div className="lg:col-span-4 flex items-center justify-center my-6 lg:my-0">
                <div className="relative w-[300px] sm:w-[320px] h-[300px] sm:h-[320px] flex items-center justify-center">
                  
                  {/* Glowing Outer Rings */}
                  <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-indigo-400/30 animate-[spin_30s_linear_infinite_reverse]" />
                  <div className="absolute inset-10 rounded-full border border-white/10" />

                  {/* Dynamic Glowing Core Center */}
                  <motion.div
                    key={activeCircle}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-20 w-36 h-36 rounded-full bg-gradient-to-b from-[#1E67E2] to-[#0A0E39] border-2 border-sky-400 shadow-[0_0_50px_rgba(56,189,248,0.35)] flex flex-col items-center justify-center text-center p-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-sky-400 text-[#0A0E39] flex items-center justify-center mb-1.5 shadow-md shadow-sky-400/40">
                      <activeNode.icon size={20} />
                    </div>
                    <span className="text-white font-extrabold text-xs tracking-wide">
                      {activeCircle}
                    </span>
                    <span className="text-[10px] text-sky-300 font-mono mt-0.5 opacity-80">
                      Pillar #{circleNodes.findIndex(n => n.label === activeCircle) + 1}
                    </span>
                  </motion.div>

                  {/* 6 Orbiting Node Buttons */}
                  {circleNodes.map((node) => {
                    const Ico = node.icon;
                    const isActive = activeCircle === node.label;
                    const rad = (node.angle - 90) * (Math.PI / 180);
                    const r = 135;
                    const cx = 150 + r * Math.cos(rad);
                    const cy = 150 + r * Math.sin(rad);

                    return (
                      <button
                        key={node.label}
                        onClick={() => setActiveCircle(node.label)}
                        style={{
                          position: "absolute",
                          left: cx - 20,
                          top: cy - 20,
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-30 cursor-pointer ${
                          isActive
                            ? "bg-sky-400 text-[#0A0E39] scale-125 shadow-[0_0_20px_rgba(56,189,248,0.8)] border-2 border-white"
                            : "bg-[#0A0E39] text-white/80 border border-white/20 hover:border-sky-400 hover:text-sky-300 hover:scale-110"
                        }`}
                        title={node.label}
                      >
                        <Ico size={16} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: 3 Remaining Pillar Cards */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {circleNodes.slice(3, 6).map((node) => {
                  const Ico = node.icon;
                  const isActive = activeCircle === node.label;
                  return (
                    <motion.div
                      key={node.label}
                      onClick={() => setActiveCircle(node.label)}
                      whileHover={{ scale: 1.02, x: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-l from-indigo-600/30 to-sky-500/20 border-sky-400/60 shadow-lg shadow-sky-500/10"
                          : "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-sky-400" />
                      )}
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isActive ? "bg-sky-400 text-[#0A0E39] shadow-md shadow-sky-400/30" : "bg-white/10 text-white/80"
                        }`}>
                          <Ico size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-base transition-colors ${isActive ? "text-sky-300" : "text-white"}`}>
                              {node.label}
                            </h4>
                            {isActive && (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30">Active</span>
                            )}
                          </div>
                          <p className="text-white/60 text-xs mt-1 leading-relaxed line-clamp-2">
                            {node.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Bottom Glassmorphic Active Focus Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCircle}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-10 max-w-3xl mx-auto text-center bg-white/[0.05] backdrop-blur-xl border border-sky-400/30 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-sky-400/20 blur-2xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-300 text-xs font-bold mb-3 font-mono">
                  <activeNode.icon size={14} /> Spotlight: {activeCircle} Strategy
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  Empowering Teams Through {activeCircle}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
                  {activeNode.desc}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* ── SECTION 3: Global ── */}
        <section className="py-8 md:py-10 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 gradient-text">
                {pageServiceData.sec3Title || "Connecting Businesses and Innovation Worldwide"}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {pageServiceData.sec3Description || "Clarity InfoTech proudly partners with businesses across multiple countries, delivering innovative digital solutions that drive growth and transformation. We write custom software development and enterprise platforms, AI-powered solutions, cloud technologies, and enterprise platforms. We help organisations achieve their goals with scalable, secure, and high-performance products."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => {
                const Ico = stat.icon;
                return (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
                    <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center flex-shrink-0">
                      <Ico size={15} className="text-[#1E67E2]" />
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-[#1E67E2]">{stat.value}</div>
                      <div className="text-gray-500 text-[11px] font-medium leading-tight">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="py-8 px-6 bg-gradient-to-r from-[#1E67E2] to-[#0ea5e9] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">{pageServiceData.ctaTitle || "Ready to Start Your Journey With Us?"}</h2>
            <p className="text-white/80 text-sm mb-7 max-w-lg mx-auto">{pageServiceData.ctaSubtitle || "Let's discuss how we can help your business grow with the right technology and the right team."}</p>
            <a href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#1E67E2] font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm hover:scale-105">
              {pageServiceData.ctaButtonText || "Get In Touch"} <ArrowUp size={14} className="rotate-45" />
            </a>
          </div>
        </section>
      </main>

      <Footer />



      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#1E67E2] hover:bg-blue-600 text-white flex items-center justify-center shadow-xl transition-all">
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
