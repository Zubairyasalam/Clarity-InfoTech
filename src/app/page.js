"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  useReducedMotion,
  animate
} from "motion/react";
import {
  Shield,
  ThumbsUp,
  Activity,
  Menu,
  X,
  ArrowRight,
  Star,
  Mail,
  Phone,
  Cloud,
  Lock,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Code2,
  Layers,
  Globe,
  Zap,
  Cpu,
  Check
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import DynamicIcon from "@/components/DynamicIcon";

// Reusable Typewriter Component (Scroll-triggered Character Reveal)
function Typewriter({ text, delay = 0, speed = 0.015, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10px" });

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const characters = text.split("");

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={parentVariants}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Reusable Animated Counter Component (Scroll-triggered Value Count-up)
function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix;
          }
        }
      });
    }
  }, [inView, value, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// Parallax Floating Black Square Component for Case Studies Header
function ParallaxFloatingSquare({ sq, index, targetRef }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)]);
  const smoothY = useSpring(rawY, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        left: `${sq.x}%`,
        top: `${sq.y}%`,
        width: `${sq.size}px`,
        height: `${sq.size}px`,
        y: smoothY,
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3 + index * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3
      }}
      className="absolute bg-primary/20 border border-primary/20 rounded-sm"
    />
  );
}

// Interactive Case Study Card Component with Pixel Dissolve & Magnetic Squares
function CaseStudyCardItem({ card, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 80, damping: 18, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rows = 8;
  const cols = 12;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[16/10] overflow-hidden bg-black cursor-pointer rounded-none border border-slate-200/80 shadow-sm"
    >
      {/* Background Media (Video or Image) */}
      {card.isVideo ? (
        <video
          src={card.media}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={card.media || card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Plus Button (top right) */}
      <div className="absolute right-4 top-4 z-20 flex h-7 w-7 items-center justify-center border border-white/40 text-xs text-white font-sans rounded-none bg-black/20 backdrop-blur-sm">
        +
      </div>

      {/* Info Plate (bottom left - Sharp Edge Box matching Image 2) */}
      <div className="absolute bottom-0 left-0 z-20 w-[48%] min-w-[210px] max-w-[65%] bg-white px-4 py-3 text-left rounded-none shadow-none font-sans border-r border-t border-slate-100">
        <h3 className="text-sm sm:text-base font-bold leading-snug text-slate-900 font-sans tracking-tight">
          {card.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-xs font-sans">
          <span className="text-slate-500 font-medium">{card.category}</span>
          <span className="font-bold text-slate-900">{card.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "Clarity InfoTech Software Solutions",
    imageTitle: "Clarity InfoTech"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.home) {
            setSeoConfig(config.home);
          }
        } catch (e) { }
      }
    }
  }, []);

  // Monitor Scroll for Navbar Glassmorphism & Floating Scroll Top Button
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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Watermark SVG measurement effect for Kresna Footer
  useEffect(() => {
    function fitWatermark() {
      const svg = document.getElementById('watermarkSvg');
      const text = document.getElementById('watermarkText');
      if (!svg || !text) return;
      try {
        const bbox = text.getBBox();
        svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      } catch (e) { }
    }
    if (typeof document !== 'undefined') {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(fitWatermark);
      } else {
        window.addEventListener('load', fitWatermark);
      }
      window.addEventListener('resize', fitWatermark);
      fitWatermark();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', fitWatermark);
      }
    };
  }, []);

  // Navbar Items
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

  const servicesRef = useRef(null);

  // Floating Squares Data for Case Studies Header
  const headerSquares = [
    { x: 6, y: 20, size: 12 },
    { x: 12, y: 32, size: 8 },
    { x: 8, y: 44, size: 6 },
    { x: 88, y: 18, size: 10 },
    { x: 92, y: 30, size: 14 },
    { x: 85, y: 42, size: 7 },
    { x: 90, y: 52, size: 5 },
    { x: 14, y: 56, size: 5 },
  ];

  // ── Services Section Data & State ──────────────────────────────────────────
  const DEFAULT_SERVICES = {
    badge: "Our Services",
    heading1: "Empowering Technology through",
    heading2: "Our",
    heading3: "Services",
    description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud-native security, and dedicated IT consulting for modern digital transformations.",
    partnerText: "We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes -- turning their identity, website, and messaging into one focused engine for growth.",
    buttonText: "Let's work together",
    marqueeLogos: [
      { name: "Codecraft_", icon: "Code2" },
      { name: "ennLabs", icon: "Layers" },
      { name: "GlobalBank", icon: "Globe" },
      { name: "45 Degrees°", icon: "Zap" },
      { name: "AlphaWave", icon: "Activity" },
      { name: "Biosynthesis", icon: "Cpu" }
    ],
    cards: [
      {
        id: "cloud-devops",
        title: "Cloud & DevOps Architecture",
        category: "Infrastructure & Security",
        year: "2026",
        media: "/service.mp4",
        isVideo: true
      },
      {
        id: "software-engineering",
        title: "Custom Software Engineering",
        category: "Web & Mobile Platforms",
        year: "2026",
        media: "/service1.mp4",
        isVideo: true
      },
      {
        id: "cyber-security",
        title: "Cyber Security & Auditing",
        category: "Threat Defense & Uptime",
        year: "2025",
        media: "/service2.mp4",
        isVideo: true
      },
      {
        id: "ai-consulting",
        title: "AI Integration & IT Consulting",
        category: "Automation & Strategy",
        year: "2025",
        media: "/service3.mp4",
        isVideo: true
      }
    ]
  };

  const [servicesData, setServicesData] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_services");
      if (stored) {
        try { setServicesData(JSON.parse(stored)); } catch { }
      } else {
        localStorage.setItem("clarity_services", JSON.stringify(DEFAULT_SERVICES));
      }
    }
  }, []);

  // ── FAQ & Contact Section Data & State ─────────────────────────────────────
  const DEFAULT_FAQ = {
    heading1: "You Have Questions,",
    heading2: "We Have Answers",
    subtitle: "Discover clear answers to common enterprise software, cloud infrastructure, and security availability questions.",
    formTitle: "Tell Us What You Need",
    formSubtitle: "Our team is ready to assist you with every detail, big or small.",
    formFirstName: "First Name",
    formLastName: "Last Name",
    formCountry: "Country",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formInquiryLabel: "Type of Inquiry",
    formMessage: "Message",
    formCheckboxText: "I'd like to receive exclusive tech updates and insights",
    formSubmitText: "Submit",
    inquiryTypes: ["Cloud & DevOps", "Software Dev", "Cyber Security", "AI Consulting", "Others"],
    questions: [
      {
        q: "What is covered under standard system SLAs?",
        a: "Standard SLA protection typically covers microservices downtime, server infrastructure reliability, security patch releases, and routine platform maintenance."
      },
      {
        q: "Who maintains ownership of the custom codebase?",
        a: "You retain 100% intellectual property ownership of the codebase upon final project delivery. All source codes are transferred to your enterprise repository."
      },
      {
        q: "How does Clarity InfoTech handle scalability audits?",
        a: "Our cloud teams conduct monthly infrastructure usage reviews to identify bottlenecks and configure auto-scaling thresholds, ensuring optimal cost-to-performance efficiency."
      }
    ]
  };

  const [faqData, setFaqData] = useState(DEFAULT_FAQ);

  // Case Studies Data
  const caseStudiesData = (servicesData.cards && servicesData.cards.length > 0
    ? servicesData.cards
    : DEFAULT_SERVICES.cards
  ).map((card, idx) => ({
    ...card,
    magneticSquares: card.magneticSquares || [
      { x: 5, y: 30, size: 16 },
      { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 },
      { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 },
      { x: 78, y: 60, size: 6 }
    ]
  }));

  // Marquee Client Logos
  const originalMarqueeLogos = [
    {
      name: "Codecraft_",
      icon: (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 4 1 9 6 14" />
          <polyline points="16 4 21 9 16 14" />
          <line x1="13" y1="2" x2="9" y2="16" />
        </svg>
      )
    },
    {
      name: "ennLabs",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          {[3, 10, 17].map(x => [3, 10, 17].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}
        </svg>
      )
    },
    {
      name: "GlobalBank",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="9" />
          <circle cx="11" cy="11" r="4" />
        </svg>
      )
    },
    {
      name: "45 Degrees°",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="16" x2="16" y2="2" />
          <polyline points="7 2 16 2 16 11" />
        </svg>
      )
    },
    {
      name: "AlphaWave",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="9" />
          <path d="M5 11Q8 7 11 11Q14 15 17 11" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      name: "Biosynthesis",
      icon: (
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="0" y1="3" x2="24" y2="3" />
          <line x1="6" y1="9" x2="24" y2="9" />
          <line x1="0" y1="15" x2="18" y2="15" />
        </svg>
      )
    },
    {
      name: "Boltshift",
      icon: (
        <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
          <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
        </svg>
      )
    },
    {
      name: "Clandestine",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
          <rect x="7.5" y="0" width="3" height="18" />
          <rect x="0" y="7.5" width="18" height="3" />
        </svg>
      )
    }
  ];

  // Hero Section: Default slides (fallback when localStorage is empty)
  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      image: "/office-bg.jpg?v=10",
      title: "Clarity Headquarters",
      subtitle: "Powering Your Technology",
      highlight: "Like It's Our Own",
      description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, and security audit systems. We align our processes with your vision to secure your production environments.",
      buttonText: "Explore IT Solutions",
      buttonLink: "#services",
      category: "Enterprise Lobby & Executive Suite",
      badge: "01 / 04 • ENTERPRISE HQ"
    },
    {
      id: 2,
      image: "/carousel-1.png?v=10",
      title: "Executive Tech Strategy",
      subtitle: "Architecting Your Future",
      highlight: "With Precision",
      description: "Our senior architects design cloud-native strategies and governance frameworks that scale with your business growth across global markets.",
      buttonText: "View Our Solutions",
      buttonLink: "#solutions",
      category: "Architecture & Cloud Planning",
      badge: "02 / 04 • STRATEGY & GOVERNANCE"
    },
    {
      id: 3,
      image: "/carousel-2.png?v=10",
      title: "Software Engineering Hub",
      subtitle: "Building Digital Products",
      highlight: "That Scale & Perform",
      description: "From full-stack web platforms to mobile apps, our agile teams deliver high-quality, maintainable code with rapid deployment cycles and zero downtime.",
      buttonText: "Our Services",
      buttonLink: "#services",
      category: "Full-Stack & DevOps Experts",
      badge: "03 / 04 • AGILE DEVELOPMENT"
    },
    {
      id: 4,
      image: "/carousel-3.png?v=10",
      title: "Modern Tech Workstations",
      subtitle: "Infrastructure Built For",
      highlight: "Next-Gen Innovation",
      description: "State-of-the-art workstations and high-performance cloud environments enable our teams to deliver cutting-edge solutions for the most demanding enterprise workloads.",
      buttonText: "Contact Us",
      buttonLink: "#contact",
      category: "High-Performance Infrastructure",
      badge: "04 / 04 • WORKSPACE & INNOVATION"
    }
  ];

  // Dynamic hero slides state — loaded from localStorage
  const [heroSlides, setHeroSlides] = useState(DEFAULT_HERO_SLIDES);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  // Load hero slides from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_hero_slides");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHeroSlides(parsed);
          }
        } catch (e) {
          // fallback to defaults silently
        }
      } else {
        // Seed localStorage with defaults
        localStorage.setItem("clarity_hero_slides", JSON.stringify(DEFAULT_HERO_SLIDES));
      }
    }
  }, []);

  // ── About Us Section ──────────────────────────────────────────────────────
  const DEFAULT_ABOUT = {
    badge: "ABOUT US",
    heading1: "We are the best",
    heading2: "in IT & Software Solutions",
    description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems. We align our processes with your vision to secure your production environments with 24/7 reliability.",
    stats: [
      { value: "3485+", label: "Projects Done" },
      { value: "426+", label: "Clients" },
      { value: "281+", label: "Running Projects" }
    ],
    features: [
      { title: "Security", icon: "Shield", description: "To us protection is not just important, it's a necessity. Guarantee your infrastructure's uptime." },
      { title: "Confidence", icon: "ThumbsUp", description: "We provide SLA guarantees and dedicated support so you can rest easy, knowing your environments are safe." },
      { title: "Innovation", icon: "Activity", description: "We utilize cutting-edge AI integrations and cloud-native microservices to drive engineering metrics." }
    ]
  };

  const [aboutData, setAboutData] = useState(DEFAULT_ABOUT);

  // ── Platforms & Stats Section ─────────────────────────────────────────────
  const DEFAULT_PLATFORMS = {
    heading1: "Powering Platforms",
    heading2: "that",
    heading3Italic: "Scale Your Business",
    description: "For over a decade, the region's most demanding corporate enterprises have relied on our custom cloud infrastructures and skilled engineering squads to deploy code efficiently and reduce system downtime.",
    stats: [
      { value: 500, suffix: "K+", label: "Deployments Automated Daily" },
      { value: 99.9, decimals: 1, suffix: "%", label: "Production Uptime Maintained" },
      { value: 50, suffix: "+", label: "Cloud Clusters Configured" },
      { value: 15, suffix: "+", label: "DevOps Frameworks Supported" },
      { value: 24, suffix: "/7", label: "System Support & Monitoring" }
    ],
    gallery: [
      { id: 1, src: "/carousel-1.png?v=2", label: "Executive Suite" },
      { id: 2, src: "/carousel-2.png?v=2", label: "Tech Team" },
      { id: 3, src: "/carousel-3.png?v=2", label: "Modern Workstation" },
      { id: 4, src: "/carousel-4.png?v=2", label: "Executive Boardroom" },
      { id: 5, src: "/office-bg.jpg?v=4", label: "Office HQ" }
    ]
  };

  const [platformsData, setPlatformsData] = useState(DEFAULT_PLATFORMS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAbout = localStorage.getItem("clarity_about");
      if (storedAbout) {
        try {
          setAboutData(JSON.parse(storedAbout));
        } catch (e) {
          // fallback silently
        }
      } else {
        localStorage.setItem("clarity_about", JSON.stringify(DEFAULT_ABOUT));
      }

      const storedPlatforms = localStorage.getItem("clarity_platforms");
      if (storedPlatforms) {
        try {
          setPlatformsData(JSON.parse(storedPlatforms));
        } catch (e) {
          // fallback silently
        }
      } else {
        localStorage.setItem("clarity_platforms", JSON.stringify(DEFAULT_PLATFORMS));
      }

      const storedFaq = localStorage.getItem("clarity_faq");
      if (storedFaq) {
        try {
          setFaqData(JSON.parse(storedFaq));
        } catch (e) {
          // fallback silently
        }
      } else {
        localStorage.setItem("clarity_faq", JSON.stringify(DEFAULT_FAQ));
      }
    }
  }, []);



  const paginate = (newDirection) => {
    setSlideDirection(newDirection);
    setActiveSlide((prev) => (prev + newDirection + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (isAutoPlayPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlayPaused, activeSlide]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // Parallax Scroll Effect for Hero Image
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 60]);

  // Trust Cards Data
  const trustCards = [
    {
      icon: Shield,
      title: "Security",
      desc: "To us protection is not just important, it's a necessity. Guarantee your infrastructure's uptime.",
    },
    {
      icon: ThumbsUp,
      title: "Confidence",
      desc: "We provide SLA guarantees and dedicated support so you can rest easy, knowing your environments are safe.",
    },
    {
      icon: Activity,
      title: "Innovation",
      desc: "We utilize cutting-edge AI integrations and cloud-native microservices to drive engineering metrics.",
    },
  ];

  // Trust Rating count up logic
  const countRef = useRef(null);
  const isCountInView = useInView(countRef, { once: true, margin: "-100px" });
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (isCountInView) {
      let start = 0;
      const end = 4.8;
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setRatingCount(end);
          clearInterval(timer);
        } else {
          setRatingCount(Math.round(start * 10) / 10);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isCountInView]);

  // Feature Cards Section Data
  const featureCards = [
    {
      tag: "Get a Quote",
      title: "Project Estimation",
      desc: "Call or email for a free project timeline and technical software estimate.",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
    },
    {
      tag: "Client Console",
      title: "Client Dashboard",
      desc: "Access active repository metrics, manage releases, submit feature requests, and view development stats.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    },
    {
      tag: "Security Audit",
      title: "Systems Inspection",
      desc: "What to check during performance audits, architectural reviews, and vulnerability reports.",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Accordion & Inquiry State
  const [activeFaq, setActiveFaq] = useState(0);
  const [inquiryType, setInquiryType] = useState("Cloud & DevOps");

  // Logo Mask Image Carousel State
  const [activeLogoSlide, setActiveLogoSlide] = useState(0);
  const logoCarouselImages = platformsData.gallery && platformsData.gallery.length > 0
    ? platformsData.gallery
    : DEFAULT_PLATFORMS.gallery;

  useEffect(() => {
    if (!logoCarouselImages.length) return;
    const timer = setInterval(() => {
      setActiveLogoSlide((prev) => (prev + 1) % logoCarouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [logoCarouselImages.length]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInquiry = {
      id: Date.now(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      country: formData.get("country") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email"),
      inquiryType: inquiryType,
      message: formData.get("message"),
      date: new Date().toISOString(),
      status: "Pending",
    };
    const existing = JSON.parse(localStorage.getItem("clarity_inquiries") || "[]");
    existing.push(newInquiry);
    localStorage.setItem("clarity_inquiries", JSON.stringify(existing));
    e.currentTarget.reset();
    alert("Inquiry submitted successfully! Our team will contact you shortly.");
  };

  const faqs = faqData.questions && faqData.questions.length > 0
    ? faqData.questions
    : DEFAULT_FAQ.questions;

  // Reusable scroll animation transition presets
  const fadeUpVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Social Links mapping with custom SVGs
  const socialLinks = [
    {
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://twitter.com"
    },
    {
      svg: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: "https://linkedin.com"
    },
    {
      svg: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      url: "https://instagram.com"
    }
  ];

  return (
    <div className="relative min-h-screen bg-offwhite text-navy font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <SEOMetadata pageKey="home" />

      {/* PINNED WHITE NAVBAR */}
      <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200/80 flex items-center h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full flex items-center justify-between h-full overflow-visible">
          {/* Logo */}
          <a href="#" className="flex items-center group h-full overflow-visible relative">
            <img
              src={headerData.logo}
              alt={seoConfig.imageAlt || "Clarity InfoTech Logo"}
              title={seoConfig.imageTitle || "Clarity InfoTech"}
              className="w-auto h-8 sm:h-10 md:h-10 lg:h-12 object-contain transition-all duration-300 group-hover:scale-105 filter brightness-90 contrast-200 drop-shadow-sm"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "Home";
              return (
                <a
                  key={link.id}
                  href={link.url}
                  className={`px-4 py-2 font-bold text-sm transition-colors duration-200 ${isActive ? "text-indigo-600 font-extrabold" : "text-slate-800 hover:text-indigo-600"}`}
                >{link.label}</a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-150 text-slate-800"
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
              className="md:hidden border-t border-gray-100 bg-white w-full overflow-hidden absolute top-full left-0 shadow-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {headerData.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-semibold text-base transition-colors ${
                      link.label === "Home" ? "text-indigo-600 font-bold" : "text-slate-700 hover:text-indigo-600"
                    }`}
                  >{link.label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="w-full">

        {/* 2. HERO SECTION WITH SWIPABLE 4 IMAGES */}
        <section
          id="home"
          className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden min-h-screen flex items-center text-white select-none"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          {/* Swipable 4-Image Hero Background Slider */}
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
                  src={heroSlides[activeSlide].image}
                  alt={seoConfig.imageAlt ? `${seoConfig.imageAlt} - ${heroSlides[activeSlide].title}` : heroSlides[activeSlide].title}
                  title={seoConfig.imageTitle ? `${seoConfig.imageTitle} - ${heroSlides[activeSlide].title}` : heroSlides[activeSlide].title}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Full-width Base Vertical Gradient for smooth top & bottom blending */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0A0E39]/70 via-[#0A0E39]/40 to-[#0A0E39]/80 pointer-events-none z-10" />
            {/* Soft Dark Smoky Scrim Gradient Fade from Right to Left for text legibility */}
            <div className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-[#0A0E39]/95 via-[#0A0E39]/75 to-transparent pointer-events-none z-10" />
          </div>

          {/* Left & Right High-Visibility Brand Blue Navigation Chevron Buttons with Glowing Aura */}
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

          {/* Hero Content & Dynamic Slide Badge */}
          <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center w-full relative z-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              <motion.h1
                key={`title-${activeSlide}`}
                variants={fadeUpVariant}
                className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-white mb-5 drop-shadow-2xl font-sans text-center"
              >
                <span>{heroSlides[activeSlide]?.subtitle || "Powering Your"}</span>
                <span className="text-sky-400 font-black block mt-2 drop-shadow-md">
                  {heroSlides[activeSlide]?.highlight || "Our Own"}
                </span>
              </motion.h1>

              <motion.p
                key={`desc-${activeSlide}`}
                variants={fadeUpVariant}
                className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed font-normal drop-shadow-lg max-w-2xl mx-auto text-center font-sans"
              >
                {heroSlides[activeSlide]?.description || "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, and security audit systems."}
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Interactive Slide Indicators & Thumbnail Pill Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setSlideDirection(index > activeSlide ? 1 : -1);
                    setActiveSlide(index);
                  }}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${isActive
                    ? "bg-white text-navy shadow-lg scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/15"
                    }`}
                >
                  <span className="font-mono">0{index + 1}</span>
                  {isActive && (
                    <span className="hidden sm:inline font-sans text-[11px] font-bold tracking-tight">
                      {slide.title}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeSlideIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. ABOUT US SECTION (Shifted Up with Larger Typography & Animations) */}
        <section id="about" className="pt-16 md:pt-20 pb-20 md:pb-28 bg-white relative overflow-hidden text-left z-20">
          {/* Left Side Large Background Circle Curve with Scale Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="absolute -left-40 sm:-left-60 top-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] rounded-full bg-gradient-to-br from-primary/10 via-blue-400/5 to-transparent border border-primary/10 pointer-events-none -z-0"
          />

          {/* Right Side Decorative Graphic Arc & Orbs matching Image 1 & 2 */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full border border-primary/20 pointer-events-none hidden lg:flex items-center justify-center translate-x-1/4">
            {/* Inner soft blur circle */}
            <div className="w-72 h-72 sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-primary/10 via-blue-400/5 to-transparent blur-2xl" />

            {/* Small Top Floating Accent Dot */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-8 w-5 h-5 rounded-full bg-primary/70 shadow-md shadow-primary/30"
            />

            {/* Large 3D Floating Sphere Orb matching Image 1 & Image 2 */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 left-16 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary via-indigo-600 to-[#0A0E39] shadow-2xl shadow-primary/50 border border-white/20"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

            {/* Left Column (6 cols): Text & Stats Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.15 } }
              }}
              className="lg:col-span-6 flex flex-col justify-center items-start text-left my-auto relative z-10"
            >
              {/* Subtitle Badge with accent line */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="flex items-center gap-3 text-primary font-extrabold text-sm sm:text-base uppercase tracking-widest mb-4 font-sans"
              >
                <span className="w-8 h-[2.5px] bg-primary inline-block rounded-full" />
                {aboutData.badge || "ABOUT US"}
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, x: -35, y: 15 },
                  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="font-extrabold text-2.5xl sm:text-3.5xl lg:text-4xl leading-[1.18] tracking-tight mb-5 font-sans"
              >
                <span className="text-navy block">{aboutData.heading1}</span>
                <span className="text-primary block">{aboutData.heading2}</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -35, y: 15 },
                  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-sm sm:text-base text-navy/70 leading-relaxed mb-7 max-w-xl font-normal font-sans"
              >
                {aboutData.description}
              </motion.p>


            </motion.div>

            {/* Right Column (6 cols): 3 Staggered Cards */}
            <div className="lg:col-span-6 relative">
              {/* Stacked Cards Container */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } }
                }}
                className="relative z-10 flex flex-col gap-6 max-w-md mx-auto lg:ml-auto lg:mr-0"
              >
                {/* Dynamic Feature Cards */}
                {(aboutData.features || []).map((feat, i) => {
                  const offsets = ["ml-0", "ml-4 sm:ml-12", "ml-0 sm:ml-2"];
                  return (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: 45, y: 20 },
                        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
                      }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`relative bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-navy/5 border border-navy/5 transition-all duration-300 ${offsets[i] || "ml-0"}`}
                    >
                      <span className="absolute -top-4 left-5 text-4xl sm:text-5xl font-black text-navy/15 select-none font-sans">{i + 1}</span>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <DynamicIcon name={feat.icon} size={24} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xl text-navy mb-1.5 font-sans">{feat.title}</h3>
                          <p className="text-navy/60 text-sm leading-relaxed font-normal font-sans">{feat.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

          </div>
        </section>

        {/* ==========================================
            3. SOLUTIONS SECTION (Black Section)
            ========================================== */}
        <section
          id="solutions"
          className="bg-black text-white py-16 md:py-24 w-full border-t border-white/10 overflow-x-hidden relative text-left"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">

              {/* Left Column (7 cols) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
                }}
                className="lg:col-span-7 flex flex-col justify-start"
              >
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 leading-[1.15] text-white font-sans max-w-full">
                  <Typewriter text={platformsData.heading1 || "Powering Platforms"} delay={0} speed={0.012} />
                  <br />
                  <Typewriter text={`${platformsData.heading2 || "that"} `} delay={0.25} speed={0.012} />
                  <span className="font-dm-serif italic font-normal text-white">
                    <Typewriter text={platformsData.heading3Italic || "Scale Your Business"} delay={0.35} speed={0.012} />
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-xl whitespace-normal mb-12 font-sans">
                  <Typewriter
                    text={platformsData.description || "For over a decade, the region's most demanding corporate enterprises have relied on our custom cloud infrastructures and skilled engineering squads to deploy code efficiently and reduce system downtime."}
                    delay={0.1}
                    speed={0.012}
                  />
                </p>

                {/* Curved Box Cards Grid for 5 Sentences */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {(platformsData.stats || []).map((st, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`relative group bg-white/5 hover:bg-white/10 border border-white/15 hover:border-sky-400/60 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-lg hover:shadow-[0_8px_30px_rgba(56,189,248,0.25)] transition-all duration-300 flex items-center gap-3.5`}
                    >
                      {/* Decorative Ambient Soft Light in Curved Box */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Glowing Icon Container */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-600/30 border border-sky-400/40 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-sky-300 transition-all duration-300 shadow-inner">
                        <Check size={18} strokeWidth={2.5} className="text-sky-300 group-hover:text-white transition-colors" />
                      </div>

                      {/* Sentence Text inside Curved Box */}
                      <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white tracking-wide font-sans leading-snug">
                        {st.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column: Clean Multi-Layered Clarity 'C' Emblem (matching Image 2) */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.04, rotate: 2 }}
                  className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square origin-center overflow-hidden transition-transform duration-300"
                  style={{
                    filter: "drop-shadow(0 0 35px rgba(56, 189, 248, 0.4)) drop-shadow(0 0 15px rgba(37, 99, 235, 0.3))"
                  }}
                >
                  {/* Layer 1: Outer Ring (Deep Navy / Dark Blue Gradient) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#060D3B] via-[#0D2380] to-[#1A45C8]"
                    style={{
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 81.82 18.18 A 45 45 0 1 0 81.82 81.82 A 6 6 0 0 0 73.33 73.33 A 33 33 0 1 1 73.33 26.67 A 6 6 0 0 0 81.82 18.18 Z'/%3E%3C/svg%3E")`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 81.82 18.18 A 45 45 0 1 0 81.82 81.82 A 6 6 0 0 0 73.33 73.33 A 33 33 0 1 1 73.33 26.67 A 6 6 0 0 0 81.82 18.18 Z'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />

                  {/* Layer 2: Middle Ring (Vibrant Royal Blue Gradient) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0B2BB5] via-[#1E5ED7] to-[#2563EB]"
                    style={{
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 71.92 28.08 A 31 31 0 1 0 71.92 71.92 A 5 5 0 0 0 64.85 64.85 A 21 21 0 1 1 64.85 35.15 A 5 5 0 0 0 71.92 28.08 Z'/%3E%3C/svg%3E")`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 71.92 28.08 A 31 31 0 1 0 71.92 71.92 A 5 5 0 0 0 64.85 64.85 A 21 21 0 1 1 64.85 35.15 A 5 5 0 0 0 71.92 28.08 Z'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />

                  {/* Layer 3: Inner Core Ring (Bright Cyan / Sky Blue Gradient) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0284C7] via-[#00A3FF] to-[#38BDF8]"
                    style={{
                      WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 63.44 36.56 A 19 19 0 1 0 63.44 63.44 A 5 5 0 0 0 56.36 56.36 A 9 9 0 1 1 56.36 43.64 A 5 5 0 0 0 63.44 36.56 Z'/%3E%3C/svg%3E")`,
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M 63.44 36.56 A 19 19 0 1 0 63.44 63.44 A 5 5 0 0 0 56.36 56.36 A 9 9 0 1 1 56.36 43.64 A 5 5 0 0 0 63.44 36.56 Z'/%3E%3C/svg%3E")`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. PROJECTS / CASE STUDIES SECTION (SERVICES PAGE UI) */}
        <section
          id="services"
          ref={servicesRef}
          className="relative bg-white text-black overflow-hidden border-t border-b border-black/10"
        >
          <style>{`
            @keyframes marqueeProjects {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .marquee-projects {
              animation: marqueeProjects 28s linear infinite;
            }
            .marquee-projects:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Top Area (Header with floating squares) */}
          <div className="relative px-6 pb-8 pt-12 sm:pt-16 lg:pt-20">
            {/* Parallax Floating Black Squares Layer */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {headerSquares.map((sq, idx) => (
                <ParallaxFloatingSquare key={idx} sq={sq} index={idx} targetRef={servicesRef} />
              ))}
            </div>

            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto max-w-4xl text-center"
            >
              <span className="mb-6 inline-block bg-primary/10 text-primary border border-primary/30 px-6 py-2.5 text-sm sm:text-base font-bold tracking-wide rounded-full shadow-md shadow-primary/10 font-sans">
                {servicesData.badge || "Our Services"}
              </span>
              <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight font-sans mb-4">
                <span className="text-primary font-medium">{servicesData.heading1 || "Empowering Technology through"} </span>
                <span className="text-black/40">{servicesData.heading2 || "Our"}</span>
                <br />
                <span className="text-black/40">{servicesData.heading3 || "Services"}</span>
              </h2>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-black/60 font-normal leading-relaxed font-sans">
                {servicesData.description || "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud-native security, and dedicated IT consulting for modern digital transformations."}
              </p>
            </motion.div>
          </div>

          {/* Case Study Cards (2x2 grid) */}
          <div className="mx-auto max-w-5xl px-6 pb-14 sm:px-8 lg:px-12">
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudiesData.map((card, idx) => (
                <CaseStudyCardItem key={card.id} card={card} index={idx} />
              ))}
            </div>
          </div>

          {/* Footer Area */}
          <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              {/* Left side */}
              <div className="max-w-md text-left">
                <p className="text-[14px] leading-[1.7] text-black/60 font-sans">
                  {servicesData.partnerText || "We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes -- turning their identity, website, and messaging into one focused engine for growth."}
                </p>
                <div className="mt-6">
                  <button type="button" className="group flex items-end cursor-pointer border-none bg-transparent p-0">
                    <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white group-hover:bg-black/85 transition-colors font-sans">
                      {servicesData.buttonText || "Let's work together"}
                    </span>
                    <span className="mb-6 group-hover:mb-9 flex h-6 w-6 items-center justify-center bg-black transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                        <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right side infinite marquee */}
              <div className="flex-1 overflow-hidden md:ml-12 border-t border-black/10 md:border-t-0 pt-6 md:pt-0">
                <div className="overflow-hidden py-5">
                  <div className="marquee-projects flex w-max">
                    {[...(servicesData.marqueeLogos || DEFAULT_SERVICES.marqueeLogos), ...(servicesData.marqueeLogos || DEFAULT_SERVICES.marqueeLogos)].map((logo, idx) => {
                      const name = typeof logo === 'string' ? logo : logo.name;
                      const iconName = typeof logo === 'string' ? 'Code2' : (logo.icon || 'Code2');
                      
                      let IconComponent;
                      if (iconName === 'Code2') IconComponent = Code2;
                      else if (iconName === 'Layers') IconComponent = Layers;
                      else if (iconName === 'Globe') IconComponent = Globe;
                      else if (iconName === 'Zap') IconComponent = Zap;
                      else if (iconName === 'Activity') IconComponent = Activity;
                      else if (iconName === 'Cpu') IconComponent = Cpu;
                      else IconComponent = Code2;

                      return (
                        <div key={idx} className="flex shrink-0 items-center gap-2.5 px-8">
                          <span className="text-black"><IconComponent size={20} strokeWidth={2.5} /></span>
                          <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80 font-sans">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-12" />
        </section>

        {/* 6. FAQ & "TELL US WHAT YOU NEED" SPLIT SECTION */}
        <section id="contact" className="relative py-20 md:py-28 bg-[#151b2e] text-white overflow-hidden">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <img
              src="/office-bg.jpg?v=3"
              alt="Office Architecture"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1631]/95 via-[#0F1631]/90 to-[#0F1631]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">

            {/* Left Side: "You Have Questions, We Have Answers" Title & FAQ Accordion (7 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeUpVariant}
              className="lg:col-span-7 flex flex-col justify-start text-left"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-3.5xl font-semibold tracking-tight text-white mb-3 font-sans leading-[1.2]">
                {faqData.heading1 || "You Have Questions,"}<br />
                <span className="text-white/80 font-normal">{faqData.heading2 || "We Have Answers"}</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-lg mb-6 font-sans font-light">
                {faqData.subtitle || "Discover clear answers to common enterprise software, cloud infrastructure, and security availability questions."}
              </p>

              {/* FAQ Accordion List (NO location, NO social media, NO email, NO contact) */}
              <div className="flex flex-col gap-3 w-full max-w-lg">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${activeFaq === idx ? "bg-white/10 border-white/30 shadow-lg" : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 sm:py-3.5 text-left font-medium text-xs sm:text-sm text-white cursor-pointer"
                    >
                      <span className="pr-3">{faq.q}</span>
                      <motion.span
                        animate={shouldReduceMotion ? {} : { rotate: activeFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`text-base font-bold flex-shrink-0 ${activeFaq === idx ? "text-primary" : "text-white/50"}`}
                      >
                        {activeFaq === idx ? "−" : "+"}
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-xs sm:text-[13px] text-white/70 leading-relaxed border-t border-white/10 pt-2.5 font-light">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Floating White "Tell Us What You Need" Form Card (5 cols) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeUpVariant}
              className="lg:col-span-5 bg-white text-navy rounded-2xl p-5 sm:p-6 shadow-xl text-left border border-white/20"
            >
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-navy mb-1 font-sans">
                {faqData.formTitle || "Tell Us What You Need"}
              </h3>
              <p className="text-xs text-navy/55 leading-relaxed mb-4 font-sans">
                {faqData.formSubtitle || "Our team is ready to assist you with every detail, big or small."}
              </p>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-2.5">
                {/* 2-Col Grid: First Name & Last Name */}
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={faqData.formFirstName || "First Name"}
                    required
                    className="w-full bg-[#f8fafc] border border-navy/15 px-3.5 py-2 rounded-full text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={faqData.formLastName || "Last Name"}
                    required
                    className="w-full bg-[#f8fafc] border border-navy/15 px-3.5 py-2 rounded-full text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>

                {/* 2-Col Grid: Country & Phone Number */}
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    name="country"
                    placeholder={faqData.formCountry || "Country"}
                    className="w-full bg-[#f8fafc] border border-navy/15 px-3.5 py-2 rounded-full text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={faqData.formPhone || "Phone Number"}
                    className="w-full bg-[#f8fafc] border border-navy/15 px-3.5 py-2 rounded-full text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans"
                  />
                </div>

                {/* Email Address */}
                <input
                  type="email"
                  name="email"
                  placeholder={faqData.formEmail || "Email Address"}
                  required
                  className="w-full bg-[#f8fafc] border border-navy/15 px-3.5 py-2 rounded-full text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans"
                />

                {/* Type of Inquiry Selectable Pills */}
                <div className="mt-0.5">
                  <label className="block text-[11px] font-semibold text-navy/60 mb-1.5 font-sans">{faqData.formInquiryLabel || "Type of Inquiry"}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(faqData.inquiryTypes || ["Cloud & DevOps", "Software Dev", "Cyber Security", "AI Consulting", "Others"]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setInquiryType(item)}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${inquiryType === item
                          ? "bg-navy text-white shadow-sm"
                          : "bg-[#f8fafc] text-navy/70 border border-navy/10 hover:border-navy/30"
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <textarea
                  name="message"
                  rows={2.5}
                  placeholder={faqData.formMessage || "Message"}
                  required
                  className="w-full bg-[#f8fafc] border border-navy/15 p-3 rounded-xl text-xs text-navy placeholder-navy/40 focus:outline-none focus:border-primary transition-colors font-sans resize-none mt-0.5"
                ></textarea>

                {/* Checkbox */}
                <div className="flex items-center gap-2 my-0.5">
                  <input
                    type="checkbox"
                    id="techUpdatesCheck"
                    className="w-3.5 h-3.5 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="techUpdatesCheck" className="text-[10.5px] sm:text-[11px] text-navy/60 cursor-pointer font-sans">
                    {faqData.formCheckboxText || "I'd like to receive exclusive tech updates and insights"}
                  </label>
                </div>

                {/* Rounded Full Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-navy hover:bg-primary text-white font-semibold py-2.5 rounded-full transition-all duration-300 shadow-md shadow-navy/10 text-xs sm:text-sm font-sans cursor-pointer mt-0.5"
                >
                  {faqData.formSubmitText || "Submit"}
                </button>
              </form>
            </motion.div>

          </div>
        </section>

      </main>

      <Footer />

      {/* Login / Signup Modal with 3D Rotating Network Globe */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Floating Brand Blue Scroll To Top Button with Neon Glow Aura Effect */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center group"
          >
            {/* Outer Pulsing Glow Aura */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600 animate-ping opacity-35 blur-md pointer-events-none" />

            {/* Ambient Backlight Glow Effect */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 opacity-80 blur-md group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />

            {/* Glowing Circular Button */}
            <motion.button
              whileHover={{ scale: 1.1, translateY: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white border-2 border-sky-300/90 shadow-[0_0_25px_rgba(37,99,235,0.85),0_0_50px_rgba(56,189,248,0.6)] transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={26} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
