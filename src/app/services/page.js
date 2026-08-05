"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import {
  Cloud,
  Code2,
  Shield,
  Zap,
  Smartphone,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Globe,
  Cpu,
  Layers,
  Lock,
  Terminal,
  Activity,
  Award,
  Clock,
  Sparkles,
  Share2
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import ClarityNetworkGlobe from "@/components/ClarityNetworkGlobe";
import DynamicIcon from "@/components/DynamicIcon";

import * as LucideIcons from "lucide-react";

export default function ServicesPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/our-services");
  }, [router]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "Our Projects Case Studies",
    imageTitle: "Clarity InfoTech Projects"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.projects) {
            setSeoConfig(config.projects);
          }
        } catch (e) { }
      }
    }
  }, []);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const [isScrolled, setIsScrolled] = useState(false);

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


  const DEFAULT_PAGE_PROJECTS = {
    heroTitle: "Our Projects",
    heroSubtitle: "Exploring cutting-edge software solutions, cloud architecture, and digital transformations.",
    projectsList: [
      {
        id: "cloud-devops",
        category: "cloud",
        title: "Cloud & DevOps Architecture",
        badge: "Infrastructure & Security",
        description: "Enterprise-grade multi-cloud orchestration, automated CI/CD pipelines, Kubernetes clustering, and 24/7 SLA infrastructure monitoring.",
        icon: "Cloud",
        gradient: "from-sky-400 to-indigo-600",
        media: "/service.mp4",
        isVideo: true,
        features: [
          "AWS, GCP & Azure Multi-Cloud Architecture",
          "Automated CI/CD Release Pipelines",
          "Kubernetes & Docker Containerization",
          "Zero-Downtime Infrastructure Scaling"
        ]
      },
      {
        id: "software-engineering",
        category: "development",
        title: "Custom Software Engineering",
        badge: "Web & Mobile Platforms",
        description: "High-performance full-stack web applications, REST/GraphQL microservices, and modern database architectures engineered for extreme concurrency.",
        icon: "Code2",
        gradient: "from-indigo-500 to-purple-600",
        media: "/service1.mp4",
        isVideo: true,
        features: [
          "Next.js, React & Node.js Architecture",
          "Microservices & Serverless Functions",
          "High-Concurrency Relational & NoSQL DBs",
          "100% IP Codebase Ownership Transfer"
        ]
      },
      {
        id: "cyber-security",
        category: "security",
        title: "Cyber Security & Auditing",
        badge: "Threat Defense & Uptime",
        description: "Continuous vulnerability assessments, ISO 27001 compliance auditing, encrypted data pipelines, and real-time DevSecOps threat defense.",
        icon: "Shield",
        gradient: "from-purple-600 to-pink-600",
        media: "/service2.mp4",
        isVideo: true,
        features: [
          "ISO 27001 Compliance Audit Reports",
          "Penetration Testing & Vulnerability Fixes",
          "Encrypted End-to-End API Pipelines",
          "24/7 Threat Detection & Incident Response"
        ]
      },
      {
        id: "ai-consulting",
        category: "ai",
        title: "AI Integration & IT Consulting",
        badge: "Automation & Strategy",
        description: "Empower legacy platforms with custom LLM integrations, automated workflow engines, predictive analytics, and enterprise AI roadmaps.",
        icon: "Zap",
        gradient: "from-cyan-400 to-blue-600",
        media: "/service3.mp4",
        isVideo: true,
        features: [
          "Custom Enterprise LLM & RAG Integration",
          "Automated AI Workflow Engines",
          "Predictive Business Intelligence Models",
          "Executive Tech Strategy & Architecture"
        ]
      },
      {
        id: "mobile-dev",
        category: "development",
        title: "Mobile App Development",
        badge: "iOS & Android Solutions",
        description: "Native and cross-platform mobile apps with buttery smooth UI, offline synchronization, and secure biometric authentication.",
        icon: "Smartphone",
        gradient: "from-emerald-400 to-teal-600",
        media: "/carousel-3.png",
        isVideo: false,
        features: [
          "React Native & iOS/Android Native Code",
          "Offline Data Sync & Caching",
          "Biometric & Zero-Trust Authentication",
          "App Store & Play Store Deployment"
        ]
      },
      {
        id: "data-analytics",
        category: "ai",
        title: "Data Analytics & Big Data",
        badge: "Intelligence & Dashboards",
        description: "Transform raw data streams into real-time visual dashboards, automated data pipelines, and executive forecasting analytics.",
        icon: "BarChart3",
        gradient: "from-orange-400 to-red-600",
        media: "/carousel-4.png",
        isVideo: false,
        features: [
          "Real-Time ETL & Streaming Data Pipelines",
          "Executive Interactive Analytics Dashboards",
          "Machine Learning Forecasting Models",
          "Data Warehouse Architecture (Snowflake, BigQuery)"
        ]
      }
    ],
    workflowBadge: "AGILE WORKFLOW",
    workflowTitle: "How We Deliver Value",
    workflowSubtitle: "A transparent, high-velocity engineering workflow designed for rapid enterprise execution.",
    workflowSteps: [
      { step: "01", title: "Discovery & Architecture Audit", desc: "We evaluate your system architecture, codebase, and infrastructure goals to draft a zero-friction engineering roadmap." },
      { step: "02", title: "Dedicated Squad Allocation", desc: "We assemble a specialized team of senior developers, cloud engineers, and security leads dedicated to your sprint goals." },
      { step: "03", title: "CI/CD & DevSecOps Deployment", desc: "Automated pipelines, unit testing, and containerized deployments ensure code is pushed safely and continuously to production." },
      { step: "04", title: "SLA Monitoring & Optimization", desc: "Post-launch 24/7 telemetry monitoring, infrastructure scaling, and performance optimizations keep your applications highly available." }
    ],
    ctaTitle: "Need a Custom Enterprise Solution?",
    ctaSubtitle: "Talk to our senior architects to get a tailored engineering proposal, timeline estimate, and SLA scope.",
    ctaButtonText: "Schedule Technical Consultation"
  };

  const [pageProjectsData, setPageProjectsData] = useState(DEFAULT_PAGE_PROJECTS);

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
      } catch { }
    }

    const storedProjects = localStorage.getItem("clarity_page_projects");
    if (storedProjects) {
      try { setPageProjectsData({ ...DEFAULT_PAGE_PROJECTS, ...JSON.parse(storedProjects) }); } catch { }
    }
  }, []);

  const getIconComponent = (iconName) => {
    if (iconName === "Cloud") return Cloud;
    if (iconName === "Code2") return Code2;
    if (iconName === "Shield") return Shield;
    if (iconName === "Zap") return Zap;
    if (iconName === "Smartphone") return Smartphone;
    if (iconName === "BarChart3") return BarChart3;
    return Code2;
  };

  const servicesList = pageProjectsData.projectsList || DEFAULT_PAGE_PROJECTS.projectsList;

  const filteredServices = activeCategory === "all"
    ? servicesList
    : servicesList.filter(s => s.category === activeCategory);

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Architecture Audit",
      description: "We evaluate your system architecture, codebase, and infrastructure goals to draft a zero-friction engineering roadmap."
    },
    {
      step: "02",
      title: "Dedicated Squad Allocation",
      description: "We assemble a specialized team of senior developers, cloud engineers, and security leads dedicated to your sprint goals."
    },
    {
      step: "03",
      title: "Agile CI/CD Engineering",
      description: "Rapid bi-weekly release cycles backed by automated unit testing, code reviews, and continuous performance tuning."
    },
    {
      step: "04",
      title: "Production Release & 24/7 SLA",
      description: "Zero-downtime deployment followed by round-the-clock infrastructure monitoring and dedicated technical support."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F8FC] text-[#0F1631] font-sans antialiased selection:bg-indigo-600/20 selection:text-indigo-600">
      <SEOMetadata pageKey="projects" />

      {/* 1. NAVBAR - ALWAYS 100% TRANSPARENT WITH DYNAMIC CONTRAST TEXT */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center h-16 md:h-20 ${isScrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full overflow-visible">

          {/* Prominent High-Res Brand Logo */}
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
              const isActive = link.label === "Our Services";
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
                  const isActive = link.label === "Our Services";
                  return (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-lg transition-colors ${link.label === "Our Services" ? "text-sky-400 font-bold" : "text-white/80 hover:text-white"
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
              {pageProjectsData.heroTitle || "Our Services"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light font-sans"
            >
              {pageProjectsData.heroSubtitle || "Exploring cutting-edge software solutions, cloud architecture, and digital transformations."}
            </motion.p>
          </div>
        </section>

        {/* 3. FEATURED SERVICES GRID */}
        <section className="py-8 md:py-12 px-6 max-w-7xl mx-auto text-left">

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { id: "all", label: "All Services" },
              { id: "cloud", label: "Cloud & DevOps" },
              { id: "development", label: "Software & Mobile" },
              { id: "security", label: "Cyber Security" },
              { id: "ai", label: "AI & Data Analytics" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                    : "bg-white text-slate-600 hover:text-indigo-600 border border-slate-200"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => {
              const IconComp = LucideIcons[service.icon] || LucideIcons.Code2;
              return (
                <motion.div
                  key={service.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/40 flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    {/* Media Header (Video or Image) */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                      {service.isVideo ? (
                        <video
                          src={service.media}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                      ) : (
                        <img
                          src={service.media}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E39]/80 via-transparent to-transparent" />

                    </div>

                    {/* Card Content */}
                    <div className="p-7">
                      <h3 className="font-extrabold text-2xl text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors font-sans">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                        {service.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                        {(service.features || []).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                            <CheckCircle2 size={15} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </section>

        {/* 4. AGILE WORKFLOW & ENGAGEMENT PROCESS */}
        <section className="py-10 md:py-12 px-6 bg-slate-50 border-t border-b border-slate-200/70 relative text-left">
          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="inline-block bg-indigo-50 text-indigo-600 border border-indigo-200/80 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider uppercase mb-4 shadow-sm">
                {pageProjectsData.workflowBadge || "AGILE WORKFLOW"}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-600 to-indigo-800 mb-4">
                {pageProjectsData.workflowTitle || "How We Deliver Value"}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-light max-w-xl mx-auto">
                {pageProjectsData.workflowSubtitle || "A transparent, high-velocity engineering workflow designed for rapid enterprise execution."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(pageProjectsData.workflowSteps || processSteps).map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-7 border border-slate-200/70 shadow-lg shadow-slate-200/40 relative overflow-hidden"
                >
                  <span className="font-mono text-3xl font-black text-indigo-600/20 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-extrabold text-xl text-slate-800 mb-3 font-sans">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.desc || step.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. CALL TO ACTION BANNER */}
        <section className="py-20 md:py-28 bg-[#0A0E39] text-white relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
              {pageProjectsData.ctaTitle || "Need a Custom Enterprise Solution?"}
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              {pageProjectsData.ctaSubtitle || "Talk to our senior architects to get a tailored engineering proposal, timeline estimate, and SLA scope."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {pageProjectsData.ctaButtonText || "Schedule Technical Consultation"}
                <ArrowRight size={20} />
              </a>
            </div>
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
