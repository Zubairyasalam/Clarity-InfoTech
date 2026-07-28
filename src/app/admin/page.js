"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Shield,
  Mail,
  FileText,
  Terminal,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
  Filter,
  Search,
  Check,
  AlertTriangle,
  RefreshCw,
  Image,
  Edit3,
  Save,
  X,
  ChevronUp,
  ChevronDown,
  Monitor,
  Layers,
  Sparkles,
  Briefcase,
  Video,
  HelpCircle,
  MessageSquare,
  Globe,
  Link
} from "lucide-react";

// Pre-populated Inquiry Mock Data
const INITIAL_INQUIRIES = [
  {
    id: 101,
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "s.jenkins@enterprise.com",
    phone: "+1 (555) 234-5678",
    country: "United States",
    inquiryType: "Cloud & DevOps",
    message: "We need an architectural review of our current AWS infrastructure. We are experiencing latency spikes in our European regions during peak hours.",
    date: new Date(Date.now() - 4 * 3600000).toISOString(),
    status: "Pending"
  },
  {
    id: 102,
    firstName: "Akihiro",
    lastName: "Sato",
    email: "sato@tokyotech.jp",
    phone: "+81 3 5555 0192",
    country: "Japan",
    inquiryType: "Cyber Security",
    message: "Seeking ISO 27001 readiness audit and penetration testing services for our financial trading platform.",
    date: new Date(Date.now() - 24 * 3600000).toISOString(),
    status: "In Progress"
  },
  {
    id: 103,
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus@datalink.co",
    phone: "+44 20 7946 0958",
    country: "United Kingdom",
    inquiryType: "Software Dev",
    message: "Looking to build a custom real-time telemetry dashboard. Prefer React/Next.js stack with high-throughput WebSockets integration.",
    date: new Date(Date.now() - 48 * 3600000).toISOString(),
    status: "Resolved"
  }
];

// Pre-populated Case Studies
const INITIAL_PROJECTS = [
  {
    id: 1,
    tag: "Case Study • Cloud Infrastructure",
    title: "Scale Engineering Integration",
    desc: "Architected a multi-region Kubernetes cluster handling 4.5M requests/sec with automated failovers and real-time monitoring.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    tag: "Case Study • Security Audit",
    title: "Global Compliance Review",
    desc: "Achieved zero vulnerability reports across 12 legacy cloud microservices while enforcing SOC2 compliance rules.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
  }
];

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filtering & Searching Inquiries
  const [inquiryFilter, setInquiryFilter] = useState("All");
  const [inquirySearch, setInquirySearch] = useState("");

  // Hero Slides State
  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      image: "/office-bg.jpg?v=10",
      title: "Clarity Headquarters",
      subtitle: "Powering Your Technology Like It's",
      highlight: "Our Own",
      description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, and security audit systems. We align our processes with your vision to secure your production environments.",
      buttonText: "Explore IT Solutions",
      buttonLink: "#services",
      badge: "01 / 04 • ENTERPRISE HQ"
    },
    {
      id: 2,
      image: "/carousel-1.png?v=10",
      title: "Executive Tech Strategy",
      subtitle: "Architecting Your Future With",
      highlight: "Precision",
      description: "Our senior architects design cloud-native strategies and governance frameworks that scale with your business growth across global markets.",
      buttonText: "View Our Solutions",
      buttonLink: "#solutions",
      badge: "02 / 04 • STRATEGY & GOVERNANCE"
    },
    {
      id: 3,
      image: "/carousel-2.png?v=10",
      title: "Software Engineering Hub",
      subtitle: "Building Products That",
      highlight: "Last Forever",
      description: "From full-stack web platforms to mobile apps, our agile teams deliver high-quality, maintainable code with rapid deployment cycles and zero downtime.",
      buttonText: "Our Services",
      buttonLink: "#services",
      badge: "03 / 04 • AGILE DEVELOPMENT"
    },
    {
      id: 4,
      image: "/carousel-3.png?v=10",
      title: "Modern Tech Workstations",
      subtitle: "Infrastructure Built For",
      highlight: "Innovation",
      description: "State-of-the-art workstations and high-performance cloud environments enable our teams to deliver cutting-edge solutions for the most demanding enterprise workloads.",
      buttonText: "Contact Us",
      buttonLink: "#contact",
      badge: "04 / 04 • WORKSPACE & INNOVATION"
    }
  ];

  const [heroSlides, setHeroSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null); // null = not editing, number = index being edited
  const [editForm, setEditForm] = useState({});
  const [newSlideOpen, setNewSlideOpen] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    highlight: "",
    description: "",
    buttonText: "Explore IT Solutions",
    buttonLink: "#services",
    image: "/office-bg.jpg?v=10",
    badge: ""
  });
  const [heroSaveSuccess, setHeroSaveSuccess] = useState(false);

  // About Us State
  const DEFAULT_ABOUT = {
    badge: "ABOUT US",
    heading1: "We are the best",
    heading2: "in IT & Software Solutions",
    description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems. We align our processes with your vision to secure your production environments with 24/7 reliability.",
    stats: [
      { value: "3485+", label: "Projects Done" },
      { value: "426+",  label: "Clients" },
      { value: "281+",  label: "Running Projects" }
    ],
    features: [
      { title: "Security",   icon: "Shield",   description: "To us protection is not just important, it's a necessity. Guarantee your infrastructure's uptime." },
      { title: "Confidence", icon: "ThumbsUp",  description: "We provide SLA guarantees and dedicated support so you can rest easy, knowing your environments are safe." },
      { title: "Innovation", icon: "Activity",  description: "We utilize cutting-edge AI integrations and cloud-native microservices to drive engineering metrics." }
    ]
  };
  const [aboutData, setAboutData] = useState(DEFAULT_ABOUT);
  const [aboutSaveSuccess, setAboutSaveSuccess] = useState(false);

  // Platforms State
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
  const [platformsSaveSuccess, setPlatformsSaveSuccess] = useState(false);

  // Services State
  const DEFAULT_SERVICES = {
    badge: "Our Services",
    heading1: "Empowering Technology through",
    heading2: "Our",
    heading3: "Services",
    description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud-native security, and dedicated IT consulting for modern digital transformations.",
    partnerText: "We partner with ambitious brands that are ready to move beyond fragmented visuals and shallow quick fixes -- turning their identity, website, and messaging into one focused engine for growth.",
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
  const [servicesSaveSuccess, setServicesSaveSuccess] = useState(false);

  // FAQ & Contact Form State
  const DEFAULT_FAQ = {
    heading1: "You Have Questions,",
    heading2: "We Have Answers",
    subtitle: "Discover clear answers to common enterprise software, cloud infrastructure, and security availability questions.",
    formTitle: "Tell Us What You Need",
    formSubtitle: "Our team is ready to assist you with every detail, big or small.",
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
  const [faqSaveSuccess, setFaqSaveSuccess] = useState(false);

  // Footer State
  const DEFAULT_FOOTER = {
    tagline1: "Smarter IT solutions,",
    tagline2: "powered by enterprise AI.",
    socialLabel: "Stay in touch!",
    discordUrl: "#",
    xUrl: "#",
    linkedinUrl: "#",
    githubUrl: "#",
    subscribeHeader: "Enterprise tech moves fast.",
    subscribeSubheader: "Stay ahead with Clarity.",
    copyright: "© 2026 Clarity InfoTech / Rain Corraya. All rights reserved.",
    companyLinks: [
      { label: "AWS & GCP Partner", url: "#services" },
      { label: "ISO 27001 Security", url: "#about" },
      { label: "DevOps Association", url: "#services" },
      { label: "Privacy Policy", url: "#" },
      { label: "Terms of Condition", url: "#" }
    ]
  };
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER);
  const [footerSaveSuccess, setFooterSaveSuccess] = useState(false);

  // Telemetry Controls
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rateLimiting, setRateLimiting] = useState(true);
  const [apiLimit, setApiLimit] = useState(5000);
  
  // Real-time Console Log Stream Simulation
  const [consoleLogs, setConsoleLogs] = useState([]);
  const logContainerRef = useRef(null);

  // Initialize data from localStorage or fallback
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedInquiries = localStorage.getItem("clarity_inquiries");
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      } else {
        localStorage.setItem("clarity_inquiries", JSON.stringify(INITIAL_INQUIRIES));
        setInquiries(INITIAL_INQUIRIES);
      }

      const storedProjects = localStorage.getItem("clarity_projects");
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        localStorage.setItem("clarity_projects", JSON.stringify(INITIAL_PROJECTS));
        setProjects(INITIAL_PROJECTS);
      }

      // Load hero slides
      const storedHeroSlides = localStorage.getItem("clarity_hero_slides");
      if (storedHeroSlides) {
        try {
          setHeroSlides(JSON.parse(storedHeroSlides));
        } catch { setHeroSlides(DEFAULT_HERO_SLIDES); }
      } else {
        localStorage.setItem("clarity_hero_slides", JSON.stringify(DEFAULT_HERO_SLIDES));
        setHeroSlides(DEFAULT_HERO_SLIDES);
      }

      // Load about data
      const storedAbout = localStorage.getItem("clarity_about");
      if (storedAbout) {
        try { setAboutData(JSON.parse(storedAbout)); } catch {}
      } else {
        localStorage.setItem("clarity_about", JSON.stringify(DEFAULT_ABOUT));
      }

      // Load platforms data
      const storedPlatforms = localStorage.getItem("clarity_platforms");
      if (storedPlatforms) {
        try { setPlatformsData(JSON.parse(storedPlatforms)); } catch {}
      } else {
        localStorage.setItem("clarity_platforms", JSON.stringify(DEFAULT_PLATFORMS));
      }

      // Load services data
      const storedServices = localStorage.getItem("clarity_services");
      if (storedServices) {
        try { setServicesData(JSON.parse(storedServices)); } catch {}
      } else {
        localStorage.setItem("clarity_services", JSON.stringify(DEFAULT_SERVICES));
      }

      // Load FAQ data
      const storedFaq = localStorage.getItem("clarity_faq");
      if (storedFaq) {
        try { setFaqData(JSON.parse(storedFaq)); } catch {}
      } else {
        localStorage.setItem("clarity_faq", JSON.stringify(DEFAULT_FAQ));
      }

      // Load footer data
      const storedFooter = localStorage.getItem("clarity_footer");
      if (storedFooter) {
        try { setFooterData(JSON.parse(storedFooter)); } catch {}
      } else {
        localStorage.setItem("clarity_footer", JSON.stringify(DEFAULT_FOOTER));
      }
    }
  }, []);

  // Simulating Live Telemetry Logs
  useEffect(() => {
    const endpoints = [
      "GET /api/v1/telemetry",
      "POST /api/v1/inquiry/submit",
      "GET /api/v1/health/system",
      "POST /api/v1/auth/session-renew",
      "GET /_next/static/chunks/main.js",
      "GET /api/v1/metrics/traffic"
    ];
    
    const messages = [
      "DB Query execution took 4ms",
      "SSL verification matched client signature",
      "Turbopack dynamic hot-reload active",
      "Kubernetes pod-west-3 autoscale event triggered",
      "Redis cache hit - serving telemetry payload",
      "WAF block rule 402 bypassed by whitelist"
    ];

    const generateLog = () => {
      const now = new Date().toLocaleTimeString();
      const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const status = Math.random() > 0.92 ? 500 : 200;
      const responseTime = Math.floor(Math.random() * 220) + 12;
      
      const newLog = `[${now}] ${randomEndpoint} - ${status} - ${responseTime}ms - ${randomMsg}`;
      setConsoleLogs((prev) => {
        const nextLogs = [...prev, newLog];
        return nextLogs.slice(-100); // keep last 100 logs
      });
    };

    // Initial logs fill
    for (let i = 0; i < 8; i++) {
      generateLog();
    }

    const interval = setInterval(generateLog, 2200);
    return () => clearInterval(interval);
  }, []);

  // Autoscroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Handle Inquiry Status Update
  const updateInquiryStatus = (id, nextStatus) => {
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status: nextStatus } : item
    );
    setInquiries(updated);
    localStorage.setItem("clarity_inquiries", JSON.stringify(updated));
  };

  // Handle Inquiry Delete
  const deleteInquiry = (id) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const filtered = inquiries.filter((item) => item.id !== id);
      setInquiries(filtered);
      localStorage.setItem("clarity_inquiries", JSON.stringify(filtered));
    }
  };

  // Handle Project Creation
  const handleAddProject = (e) => {
    e.preventDefault();
    const created = {
      ...newProject,
      id: Date.now()
    };
    const nextProjects = [...projects, created];
    setProjects(nextProjects);
    localStorage.setItem("clarity_projects", JSON.stringify(nextProjects));
    setNewProject({
      title: "",
      tag: "Case Study • Software Dev",
      desc: "",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
    });
    alert("New case study added successfully!");
  };

  // Hero Slides CRUD
  const saveHeroSlides = (updated) => {
    setHeroSlides(updated);
    localStorage.setItem("clarity_hero_slides", JSON.stringify(updated));
    setHeroSaveSuccess(true);
    setTimeout(() => setHeroSaveSuccess(false), 2500);
  };

  const startEditSlide = (idx) => {
    setEditingSlide(idx);
    setEditForm({ ...heroSlides[idx] });
  };

  const cancelEditSlide = () => {
    setEditingSlide(null);
    setEditForm({});
  };

  const saveEditSlide = () => {
    const updated = heroSlides.map((s, i) => (i === editingSlide ? { ...editForm, id: s.id } : s));
    saveHeroSlides(updated);
    setEditingSlide(null);
    setEditForm({});
  };

  const deleteSlide = (idx) => {
    if (heroSlides.length <= 1) return alert("You must keep at least 1 slide.");
    if (!confirm("Delete this slide?")) return;
    const updated = heroSlides.filter((_, i) => i !== idx).map((s, i) => ({
      ...s,
      badge: `0${i + 1} / 0${heroSlides.length - 1} • ${s.badge.split("•")[1]?.trim() || s.title.toUpperCase()}`
    }));
    saveHeroSlides(updated);
    if (editingSlide === idx) cancelEditSlide();
  };

  const moveSlide = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= heroSlides.length) return;
    const updated = [...heroSlides];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    saveHeroSlides(updated);
    if (editingSlide === idx) setEditingSlide(newIdx);
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    const total = heroSlides.length + 1;
    const added = {
      ...newSlide,
      id: Date.now(),
      badge: newSlide.badge || `0${total} / 0${total} • ${newSlide.title.toUpperCase()}`
    };
    saveHeroSlides([...heroSlides, added]);
    setNewSlide({
      title: "", subtitle: "", highlight: "", description: "",
      buttonText: "Explore IT Solutions", buttonLink: "#services",
      image: "/office-bg.jpg?v=10", badge: ""
    });
    setNewSlideOpen(false);
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((item) => {
    const matchesFilter = inquiryFilter === "All" || item.status === inquiryFilter;
    const matchesSearch =
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      item.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (item.message || "").toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // About Us CRUD — always-editable, save on button click
  const updateAboutField = (key, val) => setAboutData(d => ({ ...d, [key]: val }));
  const updateStat = (i, key, val) => setAboutData(d => { const s = [...d.stats]; s[i] = { ...s[i], [key]: val }; return { ...d, stats: s }; });
  const updateFeature = (i, key, val) => setAboutData(d => { const f = [...d.features]; f[i] = { ...f[i], [key]: val }; return { ...d, features: f }; });
  const saveAbout = () => {
    localStorage.setItem("clarity_about", JSON.stringify(aboutData));
    setAboutSaveSuccess(true);
    setTimeout(() => setAboutSaveSuccess(false), 2500);
  };
  const resetAbout = () => { if (confirm("Reset About section to defaults?")) { setAboutData(DEFAULT_ABOUT); localStorage.setItem("clarity_about", JSON.stringify(DEFAULT_ABOUT)); }};

  // Platforms CRUD
  const updatePlatformField = (key, val) => setPlatformsData(d => ({ ...d, [key]: val }));
  const updatePlatformStat = (i, key, val) => setPlatformsData(d => { const s = [...d.stats]; s[i] = { ...s[i], [key]: val }; return { ...d, stats: s }; });
  const updateGalleryItem = (i, key, val) => setPlatformsData(d => { const g = [...d.gallery]; g[i] = { ...g[i], [key]: val }; return { ...d, gallery: g }; });
  const addGalleryItem = () => setPlatformsData(d => ({ ...d, gallery: [...d.gallery, { id: Date.now(), src: "/office-bg.jpg", label: "New Slide" }] }));
  const deleteGalleryItem = (i) => setPlatformsData(d => ({ ...d, gallery: d.gallery.filter((_, idx) => idx !== i) }));
  const savePlatforms = () => {
    localStorage.setItem("clarity_platforms", JSON.stringify(platformsData));
    setPlatformsSaveSuccess(true);
    setTimeout(() => setPlatformsSaveSuccess(false), 2500);
  };
  const resetPlatforms = () => { if (confirm("Reset Platforms section to defaults?")) { setPlatformsData(DEFAULT_PLATFORMS); localStorage.setItem("clarity_platforms", JSON.stringify(DEFAULT_PLATFORMS)); }};

  // Services CRUD
  const updateServiceField = (key, val) => setServicesData(d => ({ ...d, [key]: val }));
  const updateServiceCard = (i, key, val) => setServicesData(d => { const c = [...d.cards]; c[i] = { ...c[i], [key]: val }; return { ...d, cards: c }; });
  const addServiceCard = () => setServicesData(d => ({
    ...d,
    cards: [...d.cards, { id: `card-${Date.now()}`, title: "New Service", category: "Solutions & Engineering", year: "2026", media: "/service.mp4", isVideo: true }]
  }));
  const deleteServiceCard = (i) => setServicesData(d => ({ ...d, cards: d.cards.filter((_, idx) => idx !== i) }));
  const saveServices = () => {
    localStorage.setItem("clarity_services", JSON.stringify(servicesData));
    setServicesSaveSuccess(true);
    setTimeout(() => setServicesSaveSuccess(false), 2500);
  };
  const resetServices = () => { if (confirm("Reset Services section to defaults?")) { setServicesData(DEFAULT_SERVICES); localStorage.setItem("clarity_services", JSON.stringify(DEFAULT_SERVICES)); }};

  // FAQ CRUD
  const updateFaqField = (key, val) => setFaqData(d => ({ ...d, [key]: val }));
  const updateFaqQuestion = (i, key, val) => setFaqData(d => { const q = [...d.questions]; q[i] = { ...q[i], [key]: val }; return { ...d, questions: q }; });
  const addFaqQuestion = () => setFaqData(d => ({
    ...d,
    questions: [...d.questions, { q: "New Question Title?", a: "Detailed answer text..." }]
  }));
  const deleteFaqQuestion = (i) => setFaqData(d => ({ ...d, questions: d.questions.filter((_, idx) => idx !== i) }));

  const updateInquiryTypeTag = (i, val) => setFaqData(d => { const t = [...d.inquiryTypes]; t[i] = val; return { ...d, inquiryTypes: t }; });
  const addInquiryTypeTag = () => setFaqData(d => ({ ...d, inquiryTypes: [...d.inquiryTypes, "New Category"] }));
  const deleteInquiryTypeTag = (i) => setFaqData(d => ({ ...d, inquiryTypes: d.inquiryTypes.filter((_, idx) => idx !== i) }));

  const saveFaq = () => {
    localStorage.setItem("clarity_faq", JSON.stringify(faqData));
    setFaqSaveSuccess(true);
    setTimeout(() => setFaqSaveSuccess(false), 2500);
  };
  const resetFaq = () => { if (confirm("Reset FAQ section to defaults?")) { setFaqData(DEFAULT_FAQ); localStorage.setItem("clarity_faq", JSON.stringify(DEFAULT_FAQ)); }};

  // Footer CRUD
  const updateFooterField = (key, val) => setFooterData(d => ({ ...d, [key]: val }));
  const updateCompanyLink = (i, key, val) => setFooterData(d => { const c = [...d.companyLinks]; c[i] = { ...c[i], [key]: val }; return { ...d, companyLinks: c }; });
  const addCompanyLink = () => setFooterData(d => ({ ...d, companyLinks: [...d.companyLinks, { label: "New Link", url: "#" }] }));
  const deleteCompanyLink = (i) => setFooterData(d => ({ ...d, companyLinks: d.companyLinks.filter((_, idx) => idx !== i) }));
  const saveFooter = () => {
    localStorage.setItem("clarity_footer", JSON.stringify(footerData));
    setFooterSaveSuccess(true);
    setTimeout(() => setFooterSaveSuccess(false), 2500);
  };
  const resetFooter = () => { if (confirm("Reset Footer to defaults?")) { setFooterData(DEFAULT_FOOTER); localStorage.setItem("clarity_footer", JSON.stringify(DEFAULT_FOOTER)); }};

  return (
    <div className="min-h-screen bg-[#07091e] text-white font-sans antialiased">
      
      {/* Top Header Panel */}
      <header className="border-b border-white/10 bg-[#0c0e2b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition duration-150">
              <ArrowLeft size={16} />
            </a>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Clarity InfoTech
              </h1>
              <p className="text-xs text-white/50">Core Console / Enterprise Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/20 rounded-full text-xs text-[#10b981]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>Telemetry Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Core Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto gap-2">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "inquiries", label: `Inquiries (${inquiries.length})`, icon: Mail },
            { id: "hero-slides", label: `Hero Slides (${heroSlides.length})`, icon: Monitor },
            { id: "about-us", label: "About Us", icon: Shield },
            { id: "platforms", label: "Platforms & Stats", icon: Layers },
            { id: "services", label: "Services & Cards", icon: Briefcase },
            { id: "faq", label: "FAQ & Contact Form", icon: HelpCircle },
            { id: "footer", label: "Footer", icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-400 bg-white/5"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/2"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* 1. OVERVIEW / ANALYTICS */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                
                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { title: "Total Inquiries", value: inquiries.length, icon: Mail, color: "from-blue-500 to-cyan-400" },
                    { title: "Active Projects", value: projects.length, icon: FileText, color: "from-indigo-500 to-purple-500" },
                    { title: "System Status", value: maintenanceMode ? "Maintenance" : "Online", icon: Shield, color: "from-emerald-500 to-teal-400", isText: true },
                    { title: "System Load", value: "0.22% (API)", icon: Activity, color: "from-pink-500 to-rose-400", isText: true }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b ${stat.color}`} />
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm font-medium text-white/50">{stat.title}</span>
                          <Icon size={20} className="text-white/40 group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        <div className="text-2xl font-bold tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/30 mt-2 flex items-center gap-1.5">
                          <RefreshCw size={10} className="animate-spin-slow" />
                          <span>Real-time dynamic telemetry</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Charts Area */}
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Traffic Graph (8 cols) */}
                  <div className="lg:col-span-8 bg-[#0c0e2b] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-base font-semibold tracking-tight mb-4 flex items-center gap-2">
                      <Activity size={18} className="text-indigo-400" />
                      <span>Weekly Traffic Metrics (Requests/Min)</span>
                    </h3>
                    <div className="h-64 flex items-end justify-between relative mt-8 pr-2">
                      {/* Grid lines */}
                      <div className="absolute inset-x-0 top-0 border-t border-white/5 h-0" />
                      <div className="absolute inset-x-0 top-1/4 border-t border-white/5 h-0" />
                      <div className="absolute inset-x-0 top-2/4 border-t border-white/5 h-0" />
                      <div className="absolute inset-x-0 top-3/4 border-t border-white/5 h-0" />
                      
                      {/* Fake Chart Bars */}
                      {[
                        { day: "Mon", val: 420 },
                        { day: "Tue", val: 560 },
                        { day: "Wed", val: 820 },
                        { day: "Thu", val: 990 },
                        { day: "Fri", val: 680 },
                        { day: "Sat", val: 320 },
                        { day: "Sun", val: 280 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 group">
                          <span className="text-[10px] text-indigo-400 font-semibold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {item.val} req
                          </span>
                          <div 
                            className="w-10 sm:w-12 bg-gradient-to-t from-indigo-600 via-indigo-400 to-sky-400 rounded-t-lg transition-all duration-500 ease-out"
                            style={{ height: `${(item.val / 1100) * 160}px` }}
                          />
                          <span className="text-[11px] text-white/50 mt-2 font-medium">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Categories Breakdown (4 cols) */}
                  <div className="lg:col-span-4 bg-[#0c0e2b] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-base font-semibold tracking-tight mb-4 flex items-center gap-2">
                      <Shield size={18} className="text-purple-400" />
                      <span>Inquiry Sectors</span>
                    </h3>
                    <div className="space-y-4 mt-6">
                      {[
                        { label: "Cloud & DevOps", percent: 45, color: "bg-blue-500" },
                        { label: "Software Development", percent: 30, color: "bg-indigo-500" },
                        { label: "Cyber Security", percent: 15, color: "bg-purple-500" },
                        { label: "AI Consulting", percent: 10, color: "bg-pink-500" }
                      ].map((sec, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-white/70">
                            <span>{sec.label}</span>
                            <span>{sec.percent}%</span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${sec.color} rounded-full`} style={{ width: `${sec.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. INQUIRIES LIST / INBOX */}
            {activeTab === "inquiries" && (
              <div className="space-y-6">
                
                {/* Filter and search row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0c0e2b] p-4 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Search size={18} className="text-white/40" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="bg-transparent border-none text-sm text-white placeholder-white/40 outline-none w-full"
                    />
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto justify-end">
                    <span className="text-xs text-white/50 flex items-center gap-1 font-medium shrink-0">
                      <Filter size={12} /> Filter:
                    </span>
                    {["All", "Pending", "In Progress", "Resolved"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setInquiryFilter(status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                          inquiryFilter === status
                            ? "bg-indigo-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiries Table */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl overflow-hidden">
                  {filteredInquiries.length === 0 ? (
                    <div className="p-12 text-center text-white/40 space-y-2">
                      <Mail size={36} className="mx-auto text-white/20" />
                      <p className="text-sm font-semibold">No inquiries found matching your filters.</p>
                      <p className="text-xs text-white/30">Submit an inquiry on the website home page to see it here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-xs font-semibold text-white/50 bg-white/2 uppercase tracking-wider">
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Inquiry Type</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                          {filteredInquiries.map((item) => (
                            <tr key={item.id} className="hover:bg-white/2 transition duration-150">
                              <td className="px-6 py-4">
                                <div className="font-semibold text-white">{item.firstName} {item.lastName}</div>
                                <div className="text-xs text-white/40">{item.email}</div>
                                <div className="text-xs text-white/40">{item.phone} • {item.country}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-medium text-indigo-300">
                                  {item.inquiryType}
                                </span>
                              </td>
                              <td className="px-6 py-4 max-w-xs truncate text-white/80" title={item.message}>
                                {item.message}
                              </td>
                              <td className="px-6 py-4 text-xs text-white/40">
                                {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  item.status === "Pending"
                                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                    : item.status === "In Progress"
                                    ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                    : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <select
                                    value={item.status}
                                    onChange={(e) => updateInquiryStatus(item.id, e.target.value)}
                                    className="bg-[#07091e] border border-white/20 text-xs rounded px-2 py-1 outline-none text-white focus:border-indigo-500 cursor-pointer"
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                  </select>
                                  <button
                                    onClick={() => deleteInquiry(item.id)}
                                    className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded border border-red-500/25 transition cursor-pointer"
                                    title="Delete Submission"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 3. HERO SLIDES EDITOR */}
            {activeTab === "hero-slides" && (
              <div className="space-y-6">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Hero Carousel Manager</h2>
                    <p className="text-xs text-white/40 mt-0.5">Changes are instantly reflected on the homepage.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {heroSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button
                      onClick={() => setNewSlideOpen((o) => !o)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
                    >
                      <Plus size={15} />
                      Add Slide
                    </button>
                  </div>
                </div>

                {/* Add New Slide Form */}
                <AnimatePresence>
                  {newSlideOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <form onSubmit={handleAddSlide} className="bg-indigo-950/50 border border-indigo-500/30 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2"><Plus size={14} /> New Slide</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { label: "Slide Title (Bottom Nav Label)", key: "title", placeholder: "e.g. Clarity Headquarters" },
                            { label: "Badge Text", key: "badge", placeholder: "e.g. 05 / 05 • ENTERPRISE HQ" },
                            { label: "Subtitle (top line)", key: "subtitle", placeholder: "e.g. Powering Your Technology" },
                            { label: "Highlight Word (sky-blue)", key: "highlight", placeholder: "e.g. Our Own" },
                            { label: "Button Text", key: "buttonText", placeholder: "Explore IT Solutions" },
                            { label: "Button Link", key: "buttonLink", placeholder: "#services" },
                            { label: "Background Image URL", key: "image", placeholder: "/office-bg.jpg" },
                          ].map(f => (
                            <div key={f.key}>
                              <label className="text-xs text-white/50 font-semibold mb-1 block">{f.label}</label>
                              <input
                                type="text"
                                required={["title","subtitle","highlight"].includes(f.key)}
                                placeholder={f.placeholder}
                                value={newSlide[f.key] || ""}
                                onChange={e => setNewSlide(prev => ({ ...prev, [f.key]: e.target.value }))}
                                className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label className="text-xs text-white/50 font-semibold mb-1 block">Description</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Slide body text shown on the homepage..."
                            value={newSlide.description}
                            onChange={e => setNewSlide(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                          />
                        </div>
                        <div className="flex gap-3 justify-end">
                          <button type="button" onClick={() => setNewSlideOpen(false)} className="px-4 py-2 text-sm text-white/60 hover:text-white transition cursor-pointer">Cancel</button>
                          <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                            <Save size={14} /> Save Slide
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slides List */}
                <div className="space-y-4">
                  {heroSlides.map((slide, idx) => (
                    <motion.div
                      key={slide.id}
                      layout
                      className="bg-[#0c0e2b] border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {/* Slide Row */}
                      <div className="flex items-center gap-4 p-4">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0 w-24 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute bottom-1 left-1 text-[9px] font-mono text-white/70 font-bold">{idx + 1}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{slide.title}</div>
                          <div className="text-xs text-sky-400 truncate">{slide.subtitle} <span className="text-white/40">→</span> {slide.highlight}</div>
                          <div className="text-xs text-white/40 truncate mt-0.5">{slide.badge}</div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => moveSlide(idx, -1)} disabled={idx === 0}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-25 transition cursor-pointer" title="Move Up">
                            <ChevronUp size={14} />
                          </button>
                          <button onClick={() => moveSlide(idx, 1)} disabled={idx === heroSlides.length - 1}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-25 transition cursor-pointer" title="Move Down">
                            <ChevronDown size={14} />
                          </button>
                          <button
                            onClick={() => editingSlide === idx ? cancelEditSlide() : startEditSlide(idx)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              editingSlide === idx
                                ? "bg-white/10 text-white"
                                : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40"
                            }`}
                          >
                            {editingSlide === idx ? <><X size={12} /> Close</> : <><Edit3 size={12} /> Edit</>}
                          </button>
                          <button
                            onClick={() => deleteSlide(idx)}
                            className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded border border-red-500/20 transition cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Inline Edit Form */}
                      <AnimatePresence>
                        {editingSlide === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 p-5 space-y-4 bg-[#08091f]">
                              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Editing: {slide.title}</h4>
                              <div className="grid md:grid-cols-2 gap-4">
                                {[
                                  { label: "Slide Title (Nav Label)", key: "title" },
                                  { label: "Badge Text", key: "badge" },
                                  { label: "Subtitle (Top Line)", key: "subtitle" },
                                  { label: "Highlight Word (sky-blue)", key: "highlight" },
                                  { label: "Button Text", key: "buttonText" },
                                  { label: "Button Link", key: "buttonLink" },
                                  { label: "Background Image URL", key: "image" },
                                ].map(f => (
                                  <div key={f.key}>
                                    <label className="text-xs text-white/40 font-semibold mb-1 block">{f.label}</label>
                                    <input
                                      type="text"
                                      value={editForm[f.key] || ""}
                                      onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                                      className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div>
                                <label className="text-xs text-white/40 font-semibold mb-1 block">Description</label>
                                <textarea
                                  rows={3}
                                  value={editForm.description || ""}
                                  onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                  className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                                />
                              </div>
                              {/* Live Preview Strip */}
                              <div className="rounded-xl bg-gradient-to-r from-[#0A0E39]/90 to-[#1a1f5e]/60 border border-white/10 p-4">
                                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-2">Preview</div>
                                <div className="text-xs text-sky-300 font-mono mb-1">{editForm.badge}</div>
                                <div className="text-sm font-bold text-white">{editForm.subtitle} <span className="text-sky-400">{editForm.highlight}</span></div>
                                <div className="text-xs text-white/60 mt-1 line-clamp-2">{editForm.description}</div>
                                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 rounded-full text-xs font-semibold text-white">{editForm.buttonText} →</div>
                              </div>
                              <div className="flex gap-3 justify-end">
                                <button onClick={cancelEditSlide} className="px-4 py-2 text-sm text-white/60 hover:text-white transition cursor-pointer">Cancel</button>
                                <button onClick={saveEditSlide} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                                  <Save size={14} /> Save Changes
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Reset button */}
                <div className="text-right">
                  <button
                    onClick={() => { if (confirm("Reset all slides to defaults?")) saveHeroSlides(DEFAULT_HERO_SLIDES); }}
                    className="text-xs text-white/30 hover:text-red-400 transition cursor-pointer"
                  >
                    Reset to defaults
                  </button>
                </div>

              </div>
            )}

            {/* 4. ABOUT US EDITOR */}
            {activeTab === "about-us" && (
              <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">About Us Editor</h2>
                    <p className="text-xs text-white/40 mt-0.5">All fields are live — edit and hit Save to apply to the homepage.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {aboutSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button onClick={resetAbout} className="px-3 py-2 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                    <button onClick={saveAbout} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* HEADINGS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headings & Badge</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Heading Line 1", key: "heading1", placeholder: "We are the best" },
                      { label: "Heading Line 2 (blue)", key: "heading2", placeholder: "in IT & Software Solutions" },
                      { label: "Badge Text", key: "badge", placeholder: "ABOUT US" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={aboutData[f.key] || ""}
                          onChange={e => updateAboutField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Description</h3>
                  <textarea
                    rows={3}
                    value={aboutData.description || ""}
                    onChange={e => updateAboutField("description", e.target.value)}
                    placeholder="About Us paragraph text..."
                    className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition resize-none"
                  />
                </div>

                {/* STATS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {aboutData.stats.map((stat, i) => (
                      <div key={i} className="bg-[#07091e] border border-white/10 rounded-xl p-4 space-y-2">
                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Stat {i + 1}</div>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={e => updateStat(i, "value", e.target.value)}
                          placeholder="e.g. 3485+"
                          className="w-full bg-[#0c0e2b] border border-white/10 text-lg font-black text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => updateStat(i, "label", e.target.value)}
                          placeholder="e.g. Projects Done"
                          className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white/60 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* FEATURE CARDS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Feature Cards</h3>
                  <div className="space-y-3">
                    {aboutData.features.map((feat, i) => (
                      <div key={i} className="bg-[#07091e] border border-white/10 rounded-xl p-4">
                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-3">Card {i + 1}</div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1.5 block">Title</label>
                            <input
                              type="text"
                              value={feat.title}
                              onChange={e => updateFeature(i, "title", e.target.value)}
                              className="w-full bg-[#0c0e2b] border border-white/10 text-sm font-bold text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1.5 block">Icon</label>
                            <select
                              value={feat.icon}
                              onChange={e => updateFeature(i, "icon", e.target.value)}
                              className="w-full bg-[#0c0e2b] border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition cursor-pointer"
                            >
                              <option value="Shield">🛡️  Shield</option>
                              <option value="ThumbsUp">👍  ThumbsUp</option>
                              <option value="Activity">📈  Activity</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1.5 block">Description</label>
                            <textarea
                              rows={2}
                              value={feat.description}
                              onChange={e => updateFeature(i, "description", e.target.value)}
                              className="w-full bg-[#0c0e2b] border border-white/10 text-sm text-white/70 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save footer */}
                <div className="flex justify-end pt-2">
                  <button onClick={saveAbout} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>

              </div>
            )}

            {/* 5. PLATFORMS & STATS EDITOR */}
            {activeTab === "platforms" && (
              <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Platforms & Stats Editor</h2>
                    <p className="text-xs text-white/40 mt-0.5">Edit headline, description, 5 metric counters, and masked gallery images.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {platformsSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button onClick={resetPlatforms} className="px-3 py-2 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                    <button onClick={savePlatforms} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* HEADINGS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headline Lines</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Heading Line 1", key: "heading1", placeholder: "Powering Platforms" },
                      { label: "Middle Word", key: "heading2", placeholder: "that" },
                      { label: "Italic Highlight Line", key: "heading3Italic", placeholder: "Scale Your Business" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={platformsData[f.key] || ""}
                          onChange={e => updatePlatformField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Section Subtitle</h3>
                  <textarea
                    rows={3}
                    value={platformsData.description || ""}
                    onChange={e => updatePlatformField("description", e.target.value)}
                    placeholder="Subheading paragraph..."
                    className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                  />
                </div>

                {/* 5 METRICS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> 5 Metric Counters</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {platformsData.stats.map((stat, i) => (
                      <div key={i} className="bg-[#07091e] border border-white/10 rounded-xl p-4 space-y-2">
                        <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Metric {i + 1}</div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={stat.value}
                            onChange={e => updatePlatformStat(i, "value", e.target.value)}
                            placeholder="Value"
                            className="w-1/2 bg-[#0c0e2b] border border-white/10 text-base font-black text-white rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition"
                          />
                          <input
                            type="text"
                            value={stat.suffix || ""}
                            onChange={e => updatePlatformStat(i, "suffix", e.target.value)}
                            placeholder="Suffix (e.g. K+)"
                            className="w-1/2 bg-[#0c0e2b] border border-white/10 text-xs font-mono text-indigo-300 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={e => updatePlatformStat(i, "label", e.target.value)}
                          placeholder="Label"
                          className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white/60 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* MASKED LOGO GALLERY */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Image size={14} /> Masked 'C' Logo Carousel Images</h3>
                    <button onClick={addGalleryItem} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-xs font-semibold transition cursor-pointer">
                      <Plus size={13} /> Add Image
                    </button>
                  </div>
                  <div className="space-y-3">
                    {platformsData.gallery.map((imgItem, i) => (
                      <div key={i} className="flex items-center gap-4 bg-[#07091e] border border-white/10 rounded-xl p-3">
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                          <img src={imgItem.src} alt={imgItem.label} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={imgItem.src}
                            onChange={e => updateGalleryItem(i, "src", e.target.value)}
                            placeholder="Image URL"
                            className="bg-[#0c0e2b] border border-white/10 text-xs text-white rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 transition"
                          />
                          <input
                            type="text"
                            value={imgItem.label}
                            onChange={e => updateGalleryItem(i, "label", e.target.value)}
                            placeholder="Label (e.g. Executive Suite)"
                            className="bg-[#0c0e2b] border border-white/10 text-xs text-white/70 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                        <button onClick={() => deleteGalleryItem(i)} className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded border border-red-500/20 transition cursor-pointer" title="Delete Image">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save footer */}
                <div className="flex justify-end pt-2">
                  <button onClick={savePlatforms} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>

              </div>
            )}

            {/* 6. SERVICES & CARDS EDITOR */}
            {activeTab === "services" && (
              <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Services & Case Studies Editor</h2>
                    <p className="text-xs text-white/40 mt-0.5">Edit badge, headline, description, partner paragraph, and service cards.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {servicesSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button onClick={resetServices} className="px-3 py-2 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                    <button onClick={saveServices} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* HEADINGS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headings & Badge</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { label: "Badge Pill Text", key: "badge", placeholder: "Our Services" },
                      { label: "Heading Line 1 (blue)", key: "heading1", placeholder: "Empowering Technology through" },
                      { label: "Line 2 (gray)", key: "heading2", placeholder: "Our" },
                      { label: "Line 3 (gray)", key: "heading3", placeholder: "Services" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={servicesData[f.key] || ""}
                          onChange={e => updateServiceField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* DESCRIPTION & PARTNER TEXT */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Top Header Description</h3>
                    <textarea
                      rows={3}
                      value={servicesData.description || ""}
                      onChange={e => updateServiceField("description", e.target.value)}
                      placeholder="Header description..."
                      className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>
                  <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Bottom Partner Paragraph</h3>
                    <textarea
                      rows={3}
                      value={servicesData.partnerText || ""}
                      onChange={e => updateServiceField("partnerText", e.target.value)}
                      placeholder="We partner with ambitious brands..."
                      className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>
                </div>

                {/* SERVICE CARDS LIST */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Briefcase size={14} /> Service Cards ({servicesData.cards.length})</h3>
                    <button onClick={addServiceCard} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-xs font-semibold transition cursor-pointer">
                      <Plus size={13} /> Add Service Card
                    </button>
                  </div>
                  <div className="space-y-4">
                    {servicesData.cards.map((card, i) => (
                      <div key={i} className="bg-[#07091e] border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Service Card {i + 1}</span>
                          <button onClick={() => deleteServiceCard(i)} className="p-1 text-red-400 hover:text-red-300 transition cursor-pointer" title="Delete Card">
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1 block">Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={e => updateServiceCard(i, "title", e.target.value)}
                              placeholder="Service Title"
                              className="w-full bg-[#0c0e2b] border border-white/10 text-sm font-bold text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1 block">Category / Subtitle</label>
                            <input
                              type="text"
                              value={card.category}
                              onChange={e => updateServiceCard(i, "category", e.target.value)}
                              placeholder="Infrastructure & Security"
                              className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white/70 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1 block">Year Tag</label>
                            <input
                              type="text"
                              value={card.year}
                              onChange={e => updateServiceCard(i, "year", e.target.value)}
                              placeholder="2026"
                              className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white/70 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3 items-center">
                          <div className="md:col-span-2">
                            <label className="text-xs text-white/40 font-semibold mb-1 block">Media URL (Video .mp4 or Image URL)</label>
                            <input
                              type="text"
                              value={card.media}
                              onChange={e => updateServiceCard(i, "media", e.target.value)}
                              placeholder="/service.mp4 or https://..."
                              className="w-full bg-[#0c0e2b] border border-white/10 text-xs font-mono text-white/80 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 font-semibold mb-1 block">Media Type</label>
                            <select
                              value={card.isVideo ? "video" : "image"}
                              onChange={e => updateServiceCard(i, "isVideo", e.target.value === "video")}
                              className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition cursor-pointer"
                            >
                              <option value="video">🎥 Video (.mp4)</option>
                              <option value="image">🖼️ Static Image</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save footer */}
                <div className="flex justify-end pt-2">
                  <button onClick={saveServices} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>

              </div>
            )}

            {/* 7. FAQ & CONTACT FORM EDITOR */}
            {activeTab === "faq" && (
              <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">FAQ & Contact Form Editor</h2>
                    <p className="text-xs text-white/40 mt-0.5">Edit FAQ questions, answers, inquiry categories, and contact card titles.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {faqSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button onClick={resetFaq} className="px-3 py-2 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                    <button onClick={saveFaq} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* FAQ HEADINGS & QUESTIONS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><HelpCircle size={14} /> FAQ Accordion Headings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: "Title Line 1", key: "heading1", placeholder: "You Have Questions," },
                      { label: "Title Line 2", key: "heading2", placeholder: "We Have Answers" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={faqData[f.key] || ""}
                          onChange={e => updateFaqField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-white/40 font-semibold mb-1.5 block">FAQ Subtitle</label>
                    <textarea
                      rows={2}
                      value={faqData.subtitle || ""}
                      onChange={e => updateFaqField("subtitle", e.target.value)}
                      placeholder="Subtitle paragraph..."
                      className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>
                </div>

                {/* FAQ QUESTIONS & ANSWERS LIST */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><HelpCircle size={14} /> Q&A Items ({faqData.questions.length})</h3>
                    <button onClick={addFaqQuestion} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-xs font-semibold transition cursor-pointer">
                      <Plus size={13} /> Add Question
                    </button>
                  </div>
                  <div className="space-y-4">
                    {faqData.questions.map((item, i) => (
                      <div key={i} className="bg-[#07091e] border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Question {i + 1}</span>
                          <button onClick={() => deleteFaqQuestion(i)} className="p-1 text-red-400 hover:text-red-300 transition cursor-pointer" title="Delete Question">
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <div>
                          <label className="text-xs text-white/40 font-semibold mb-1 block">Question Text</label>
                          <input
                            type="text"
                            value={item.q}
                            onChange={e => updateFaqQuestion(i, "q", e.target.value)}
                            placeholder="Question?"
                            className="w-full bg-[#0c0e2b] border border-white/10 text-sm font-semibold text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-white/40 font-semibold mb-1 block">Answer Text</label>
                          <textarea
                            rows={2}
                            value={item.a}
                            onChange={e => updateFaqQuestion(i, "a", e.target.value)}
                            placeholder="Detailed answer..."
                            className="w-full bg-[#0c0e2b] border border-white/10 text-xs text-white/70 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CONTACT FORM HEADINGS & INQUIRY PILLS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><MessageSquare size={14} /> Contact Form Card Titles & Categories</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/40 font-semibold mb-1.5 block">Form Card Title</label>
                      <input
                        type="text"
                        value={faqData.formTitle || ""}
                        onChange={e => updateFaqField("formTitle", e.target.value)}
                        placeholder="Tell Us What You Need"
                        className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-semibold mb-1.5 block">Form Card Subtitle</label>
                      <input
                        type="text"
                        value={faqData.formSubtitle || ""}
                        onChange={e => updateFaqField("formSubtitle", e.target.value)}
                        placeholder="Our team is ready to assist..."
                        className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type Pills Editor */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-white/40 font-semibold block">Inquiry Type Option Pills ({faqData.inquiryTypes.length})</label>
                      <button onClick={addInquiryTypeTag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded text-xs font-semibold transition cursor-pointer">
                        <Plus size={12} /> Add Category
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {faqData.inquiryTypes.map((typeTag, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-[#07091e] border border-white/10 rounded-lg p-1.5">
                          <input
                            type="text"
                            value={typeTag}
                            onChange={e => updateInquiryTypeTag(i, e.target.value)}
                            className="w-full bg-transparent border-none text-xs text-white outline-none px-1"
                          />
                          <button onClick={() => deleteInquiryTypeTag(i)} className="text-red-400 hover:text-red-300 p-0.5" title="Delete">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save footer */}
                <div className="flex justify-end pt-2">
                  <button onClick={saveFaq} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>

              </div>
            )}

            {/* 8. FOOTER EDITOR */}
            {activeTab === "footer" && (
              <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Footer Editor</h2>
                    <p className="text-xs text-white/40 mt-0.5">Edit taglines, social links, company links, newsletter text, and copyright.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {footerSaveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle size={13} /> Saved to homepage!
                      </motion.div>
                    )}
                    <button onClick={resetFooter} className="px-3 py-2 text-xs text-white/40 hover:text-red-400 border border-white/10 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                    <button onClick={saveFooter} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>

                {/* TAGLINES */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Left Card Taglines & Social Label</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Tagline Line 1", key: "tagline1", placeholder: "Smarter IT solutions," },
                      { label: "Tagline Line 2", key: "tagline2", placeholder: "powered by enterprise AI." },
                      { label: "Social Section Label", key: "socialLabel", placeholder: "Stay in touch!" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={footerData[f.key] || ""}
                          onChange={e => updateFooterField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SOCIAL LINKS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Link size={12} /> Social Media Link URLs</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Discord URL", key: "discordUrl", placeholder: "https://discord.gg/..." },
                      { label: "X (Twitter) URL", key: "xUrl", placeholder: "https://x.com/..." },
                      { label: "LinkedIn URL", key: "linkedinUrl", placeholder: "https://linkedin.com/..." },
                      { label: "GitHub URL", key: "githubUrl", placeholder: "https://github.com/..." },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={footerData[f.key] || ""}
                          onChange={e => updateFooterField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-xs font-mono text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* COMPANY LINKS */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Globe size={14} /> Company Column Links</h3>
                    <button onClick={addCompanyLink} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-xs font-semibold transition cursor-pointer">
                      <Plus size={13} /> Add Link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {footerData.companyLinks.map((link, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#07091e] border border-white/10 rounded-xl p-3">
                        <div className="flex-1 grid md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={link.label}
                            onChange={e => updateCompanyLink(i, "label", e.target.value)}
                            placeholder="Link Label"
                            className="bg-[#0c0e2b] border border-white/10 text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={e => updateCompanyLink(i, "url", e.target.value)}
                            placeholder="URL (e.g. #services)"
                            className="bg-[#0c0e2b] border border-white/10 text-xs font-mono text-white/70 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                        <button onClick={() => deleteCompanyLink(i)} className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded border border-red-500/20 transition cursor-pointer">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NEWSLETTER & COPYRIGHT */}
                <div className="bg-[#0c0e2b] border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Newsletter & Copyright</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Newsletter Header", key: "subscribeHeader", placeholder: "Enterprise tech moves fast." },
                      { label: "Newsletter Subheader (bold)", key: "subscribeSubheader", placeholder: "Stay ahead with Clarity." },
                      { label: "Copyright Text", key: "copyright", placeholder: "© 2026 Clarity InfoTech..." },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/40 font-semibold mb-1.5 block">{f.label}</label>
                        <input
                          type="text"
                          value={footerData[f.key] || ""}
                          onChange={e => updateFooterField(f.key, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-[#07091e] border border-white/15 text-sm text-white rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save footer */}
                <div className="flex justify-end pt-2">
                  <button onClick={saveFooter} className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer">
                    <Save size={15} /> Save All Changes
                  </button>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </main>

    </div>
  );
}
