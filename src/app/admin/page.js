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
  Link,
  Eye,
  EyeOff,
  Lightbulb,
  LogOut,
  Upload,
  Link as LinkIcon
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [verifyingSession, setVerifyingSession] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      setLoginError("Please enter both username and password");
      return;
    }
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthorized(true);
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setLoginError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      try {
        await fetch("/api/admin/logout", { method: "POST" });
        setIsAuthorized(false);
        setUsernameInput("");
        setPasswordInput("");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
  };

  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Admin Credentials Configuration Settings
  const [adminUsernameSetting, setAdminUsernameSetting] = useState("admin");
  const [adminPasswordSetting, setAdminPasswordSetting] = useState("clarityadmin123");
  const [showAdminPasswordSetting, setShowAdminPasswordSetting] = useState(false);

  const fetchAuthSettings = async () => {
    try {
      const res = await fetch("/api/admin/auth-settings");
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUsernameSetting(data.username);
        setAdminPasswordSetting(data.password);
      }
    } catch (err) {
      console.error("Failed to fetch auth settings:", err);
    }
  };

  // Filtering & Searching Inquiries
  const [inquiryFilter, setInquiryFilter] = useState("All");
  const [inquirySearch, setInquirySearch] = useState("");

  // Hero Slides State
  const DEFAULT_HERO_SLIDES = [
    {
      id: 1,
      image: "/office-bg.jpg?v=10",
      title: "Clarity Headquarters",
      subtitle: "Powering Your Technology",
      highlight: "Like It's Our Own",
      description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, and security audit systems. We align our processes with your vision to secure your production environments."
    },
    {
      id: 2,
      image: "/carousel-1.png?v=10",
      title: "Executive Tech Strategy",
      subtitle: "Architecting Your Future",
      highlight: "With Precision",
      description: "Our senior architects design cloud-native strategies and governance frameworks that scale with your business growth across global markets."
    },
    {
      id: 3,
      image: "/carousel-2.png?v=10",
      title: "Software Engineering Hub",
      subtitle: "Building Digital Products",
      highlight: "That Scale & Perform",
      description: "From full-stack web platforms to mobile apps, our agile teams deliver high-quality, maintainable code with rapid deployment cycles and zero downtime."
    },
    {
      id: 4,
      image: "/carousel-3.png?v=10",
      title: "Modern Tech Workstations",
      subtitle: "Infrastructure Built For",
      highlight: "Next-Gen Innovation",
      description: "State-of-the-art workstations and high-performance cloud environments enable our teams to deliver cutting-edge solutions for the most demanding enterprise workloads."
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
    features: [
      { title: "Security", icon: "Shield", description: "To us protection is not just important, it's a necessity. Guarantee your infrastructure's uptime." },
      { title: "Confidence", icon: "ThumbsUp", description: "We provide SLA guarantees and dedicated support so you can rest easy, knowing your environments are safe." },
      { title: "Innovation", icon: "Activity", description: "We utilize cutting-edge AI integrations and cloud-native microservices to drive engineering metrics." }
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
      { label: "Deployments Automated Daily" },
      { label: "Production Uptime Maintained" },
      { label: "Cloud Clusters Configured" },
      { label: "DevOps Frameworks Supported" },
      { label: "System Support & Monitoring" }
    ]
  };
  const [platformsData, setPlatformsData] = useState(DEFAULT_PLATFORMS);
  const [platformsSaveSuccess, setPlatformsSaveSuccess] = useState(false);

  // Services State
  const DEFAULT_SERVICES = {
    badge: "Our Projects",
    heading1: "Empowering Technology through",
    heading2: "Our",
    heading3: "Projects",
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
  const [servicesSaveSuccess, setServicesSaveSuccess] = useState(false);

  // FAQ & Contact Form State
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
    subscribePlaceholder: "Enter email address",
    subscribeButtonText: "Subscribe",
    copyright: "© 2026 Clarity InfoTech / Rain Corraya. All rights reserved.",
    companyLinks: [
      { label: "AWS & GCP Partner", url: "#services" },
      { label: "ISO 27001 Security", url: "#about" },
      { label: "DevOps Association", url: "#services" },
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Terms of Service", url: "/terms-of-service" },
      { label: "Refund Policy", url: "/refund-policy" }
    ],
    navLinks: [
      { label: "Home", url: "#home" },
      { label: "About Us", url: "#about" },
      { label: "Our Projects", url: "#projects" },
      { label: "Our Services", url: "#services" },
      { label: "Contact", url: "#contact" },
      { label: "Admin Portal", url: "/admin" }
    ]
  };
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER);
  const [footerSaveSuccess, setFooterSaveSuccess] = useState(false);

  // About Page State
  const DEFAULT_PAGE_ABOUT = {
    heroBadge: "ABOUT US",
    heroTitle: "About Us",
    heroSubtitle: "Pioneering technology solutions and empowering digital growth since 2016.",
    aboutTitle: "About Clarity InfoTech",
    aboutParagraph1: "Clarity InfoTech is a technology-driven company focused on building innovative digital solutions that help businesses grow, streamline operations, and stay ahead in a fast-changing digital world. We specialize in transforming ideas into practical, scalable, and user-friendly software products that solve real business challenges.",
    aboutParagraph2: "Founded with a vision to combine technology, creativity, and business strategy, Clarity InfoTech works with startups, enterprises, and organizations to deliver high-quality web applications, mobile apps, business platforms, and custom digital solutions. Our team is passionate about creating products that are not only visually modern but also technically strong, reliable, and performance-focused.",
    valuesPill: "03 / CORE PRINCIPLES",
    valuesTitle: "Our Values",
    valuesSubtitle: "The principles that guide everything we build and deliver.",
    valuesBgImage: "",
    valuesCards: [
      { step: "01", title: "Innovation", icon: "Lightbulb", image: "", gradient: "from-sky-400 to-indigo-600", tag: "Future Tech", desc: "We explore new ideas, tools, and cutting-edge frameworks to build future-ready, intelligent digital solutions." },
      { step: "02", title: "Excellence", icon: "Star", image: "", gradient: "from-indigo-500 to-purple-600", tag: "Craftsmanship", desc: "We aim for zero-compromise precision in every project, with extreme attention to detail, performance, and UI usability." },
      { step: "03", title: "Collaboration", icon: "Users", image: "", gradient: "from-blue-500 to-sky-400", tag: "Shared Vision", desc: "We partner closely with clients and cross-functional squads, believing transparent communication creates the best results." },
      { step: "04", title: "Results", icon: "Target", image: "", gradient: "from-purple-500 to-indigo-600", tag: "Measurable Impact", desc: "We focus on building software products that create real, quantifiable business value and empower digital growth." }
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
  const [pageAboutSaveSuccess, setPageAboutSaveSuccess] = useState(false);

  // Our Projects Page State
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
        media: "/carousel-2.png",
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
  const [pageProjectsSaveSuccess, setPageProjectsSaveSuccess] = useState(false);

  // Our Service Page State
  const DEFAULT_PAGE_SERVICE = {
    heroBadge: "OUR SERVICES",
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
    ]
  };
  const [pageServiceData, setPageServiceData] = useState(DEFAULT_PAGE_SERVICE);
  const [pageServiceSaveSuccess, setPageServiceSaveSuccess] = useState(false);

  // Contact Us Page State
  const DEFAULT_PAGE_CONTACT = {
    heroBadge: "CONTACT US",
    heroTitle: "Get In Touch",
    heroSubtitle: "Ready to transform your business with cutting-edge technology? Let's discuss your project and bring your vision to life.",
    formTitlePrefix: "Send Us a",
    formTitleHighlight: "Message",
    officeTitle: "Head Office",
    officeAddress: "PO Box 200388, Doha, Qatar",
    officePhone: "+974 5029 8525, +974 5995 5100",
    officeEmail: "info@clarity-infotech.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115482.38557991349!2d51.44234586524317!3d25.285447333555504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
  };
  const [pageContactData, setPageContactData] = useState(DEFAULT_PAGE_CONTACT);
  const [pageContactSaveSuccess, setPageContactSaveSuccess] = useState(false);

  // Gallery Page State
  const DEFAULT_PAGE_GALLERY = {
    heroBadge: "GALLERY",
    heroTitle: "Our Gallery",
    heroSubtitle: "A visual showcase of our workspace, team milestones, and event highlights.",
    bottomCtaTitle: "Want to create memorable moments with us?",
    bottomCtaSubtitle: "Partner with our software squads or join our growing team of innovators.",
    bottomCtaButtonText: "Get In Touch",
    bottomCtaButtonLink: "/contact",
    stats: [
      { value: "50+", label: "Events & Sprints" },
      { value: "100+", label: "Team Celebrations" },
      { value: "500+", label: "Projects Completed" },
      { value: "15+", label: "Global Tech Hubs" }
    ]
  };
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
  const [pageGalleryData, setPageGalleryData] = useState(DEFAULT_PAGE_GALLERY);
  const [galleryImages, setGalleryImages] = useState(DEFAULT_GALLERY_IMAGES);
  const [pageGallerySaveSuccess, setPageGallerySaveSuccess] = useState(false);
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

  // Legal Pages State
  const DEFAULT_LEGAL_PAGES = {
    privacyTitle: "Privacy Policy",
    privacySubtitle: "Last updated: July 29, 2026",
    privacyContent: `### 1. Introduction
At Clarity InfoTech ("CIT"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

### 2. Information We Collect
We may collect the following types of information:

**Personal Information**
* Name, email address, and phone number
* Company name and job title
* Billing and payment information
* Project type and request details
* Communication preferences

**Technical Information**
* IP address and browser type
* Device information and operating system
* Cookies and usage data
* Pages visited and time spent on our website

### 3. How We Use Your Information
We use the collected information for:
* Providing, maintaining, and improving our services
* Processing transactions and sending confirmations
* Communicating with you about projects, telemetry logs, and updates
* Responding to support requests and inquiries
* Sending tech insights and updates (with your consent)
* Analyzing website usage and optimizing user experience
* Complying with legal obligations

### 4. Information Sharing and Disclosure
We do not sell your personal information. We may share your information with:
* Service providers who assist in our infrastructure operations
* Payment processors for secure transaction handling
* Legal authorities when required by law
* Business partners with your explicit consent

### 5. Cookies and Tracking Technologies
We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences. Disabling cookies may limit certain website functionalities.

### 6. Data Security
We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.

### 7. Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.

### 8. Your Rights
You have the right to:
* Access and receive a copy of your personal information
* Correct inaccurate or incomplete information
* Request deletion of your personal information
* Object to or restrict certain processing activities
* Withdraw consent for marketing communications

### 9. Third-Party Links
Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.

### 10. Children's Privacy
Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.

### 11. Changes to This Privacy Policy
We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of changes by posting the updated policy on our website.

### 12. Contact Us
If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

**Clarity InfoTech**
* **Headquarters**: PO Box 200388, Doha, Qatar.`,
    termsTitle: "Terms and Conditions",
    termsSubtitle: "Last updated: July 29, 2026",
    termsContent: `### 1. Introduction
Welcome to Clarity InfoTech ("CIT", "we", "our", or "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.

### 2. Services
Clarity InfoTech provides enterprise software engineering, DevOps automation, cloud architecture, and security audit systems. Our services include but are not limited to:
* Custom software design and development
* Enterprise web and mobile application engineering
* Cloud infrastructure planning and deployment
* Automation, DevOps and pipeline auditing
* Advanced AI solutions and RAG architecture consulting
* Support and telemetry monitoring systems

### 3. User Obligations
By using our services, you agree to:
* Provide accurate, current, and complete information
* Maintain the confidentiality of your account credentials
* Use our services only for lawful, authorized purposes
* Not infringe on intellectual property or source ownership rights
* Not transmit malicious code, malware, or harmful content

### 4. Intellectual Property
All code, custom designs, architecture models, and project materials created by Clarity InfoTech remain our intellectual property until full payment is received. Upon completion of payment, 100% ownership rights and code source transfer are delivered to the client as per the agreed SLA.

### 5. Payment Terms
Payment terms are established in individual project proposals or milestone agreements. Generally:
* Payment schedules are outlined in project proposals
* Late payments may incur additional transaction charges
* Work may be suspended for non-payment
* Refunds are subject to the terms of individual milestone agreements

### 6. Limitation of Liability
Clarity InfoTech shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service in question.

### 7. Termination
Either party may terminate services with written notice as specified in the project agreement. Upon termination, the client is responsible for payment of all work completed up to the termination date.

### 8. Changes to Terms
We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the updated terms.

### 9. Governing Law
These terms shall be governed by and construed in accordance with the laws of Qatar. Any disputes shall be subject to the exclusive jurisdiction of the courts in Doha, Qatar.

### 10. Contact Information
For questions about these Terms and Conditions, please contact us at info@clarity-infotech.com or visit:

**Clarity InfoTech**
* **Headquarters**: PO Box 200388, Doha, Qatar.`,
    refundTitle: "Refund Policy",
    refundSubtitle: "Last updated: July 29, 2026",
    refundContent: "### 1. Refund Scope\nWe provide high-quality custom software engineering and cloud consulting. Refunds are processed based on milestone deliverables.\n\n### 2. Milestone Payments\nPayment for successfully completed and accepted milestones is non-refundable.\n\n### 3. Project Cancellation\nIf a project is cancelled by the client during development, we reserve the right to bill for all hours worked up to the cancellation notice date."
  };
  const [legalPagesData, setLegalPagesData] = useState(DEFAULT_LEGAL_PAGES);
  const [legalPagesSaveSuccess, setLegalPagesSaveSuccess] = useState(false);

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
  const [headerSaveSuccess, setHeaderSaveSuccess] = useState(false);
  const [availableLogos, setAvailableLogos] = useState([]);
  const [loadingLogos, setLoadingLogos] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");

  // System Configuration State
  const DEFAULT_SEO_DATA = {
    home: {
      title: "Clarity InfoTech | Enterprise Software Engineering & Cloud Solutions",
      description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems with 24/7 reliability.",
      keywords: "Clarity InfoTech, software engineering, DevOps, cloud architecture, security audit, custom software, React, Next.js",
      canonical: "https://clarityinfotech.com",
      slug: "/",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "Clarity InfoTech | Enterprise Software Solutions",
      ogDescription: "Enterprise-grade software engineering, DevOps automation, and security audits.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com",
      ogType: "website",
      twitterTitle: "Clarity InfoTech | Enterprise Software Solutions",
      twitterDescription: "Enterprise-grade software engineering, DevOps automation, and security audits.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Clarity InfoTech Enterprise Software Solutions",
      imageTitle: "Clarity InfoTech Logo",
      imageCaption: "Powering platforms that scale your business.",
      schemaType: "Organization",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Clarity InfoTech",
        "url": "https://clarityinfotech.com",
        "logo": "https://clarityinfotech.com/logo.png",
        "sameAs": [
          "https://linkedin.com/company/clarityinfotech"
        ]
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 1.0,
      sitemapFrequency: "weekly"
    },
    about: {
      title: "About Us | Clarity InfoTech - Premium Software Engineering Squad",
      description: "Learn more about our elite team of engineers, developers, and architects. We help corporations automate systems and scale cloud deployments.",
      keywords: "about clarity, tech engineering team, software development company, Prince Infocity",
      canonical: "https://clarityinfotech.com/about",
      slug: "/about",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "About Us | Clarity InfoTech",
      ogDescription: "Meet our elite team of cloud architects and software engineers.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com/about",
      ogType: "website",
      twitterTitle: "About Us | Clarity InfoTech",
      twitterDescription: "Meet our elite team of cloud architects and software engineers.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Clarity InfoTech Team Collaboration",
      imageTitle: "Clarity Engineers Working",
      imageCaption: "Innovation, wellness, and technical excellence.",
      schemaType: "Organization",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Clarity InfoTech",
        "description": "Learn about our development team and corporate locations in India."
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 0.8,
      sitemapFrequency: "weekly"
    },
    projects: {
      title: "Our Projects & Case Studies | Clarity InfoTech",
      description: "Explore our success stories. From Kubernetes deployments for fintech platforms to security readiness audits for legacy systems.",
      keywords: "case studies, kubernetes migration, cloud security review, portfolio",
      canonical: "https://clarityinfotech.com/services",
      slug: "/services",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "Our Projects & Case Studies | Clarity InfoTech",
      ogDescription: "Explore our real-world cloud migrations and custom platforms.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com/services",
      ogType: "website",
      twitterTitle: "Our Projects & Case Studies | Clarity InfoTech",
      twitterDescription: "Explore our real-world cloud migrations and custom platforms.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Clarity InfoTech Real-World Cloud Migrations",
      imageTitle: "Case Studies and Kubernetes Workloads",
      imageCaption: "Zero-downtime microservices migrations.",
      schemaType: "Service",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Clarity InfoTech Projects",
        "description": "Case studies of enterprise cloud migrations and security audits."
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 0.8,
      sitemapFrequency: "weekly"
    },
    services: {
      title: "Our Services | Software Architecture & DevOps Automation",
      description: "We design high-throughput cloud strategies, automated DevOps pipelines, bespoke web and mobile platforms, and advanced AI systems.",
      keywords: "devops automation, bespoke software, cloud migration, cyber security audit",
      canonical: "https://clarityinfotech.com/our-services",
      slug: "/our-services",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "Our Services | Clarity InfoTech",
      ogDescription: "Bespoke engineering, DevOps automation, cloud architecture, and cybersecurity.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com/our-services",
      ogType: "website",
      twitterTitle: "Our Services | Clarity InfoTech",
      twitterDescription: "Bespoke engineering, DevOps automation, cloud architecture, and cybersecurity.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Bespoke software development & DevOps consultation",
      imageTitle: "Services list grid",
      imageCaption: "Automated pipelines and AI-driven systems.",
      schemaType: "Service",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Bespoke Software Development & DevOps Consultation",
        "provider": {
          "@type": "Organization",
          "name": "Clarity InfoTech"
        }
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 0.9,
      sitemapFrequency: "weekly"
    },
    contact: {
      title: "Contact Us | Reach Clarity InfoTech Squad",
      description: "Get in touch with us to discuss your enterprise workloads. Offices in Prince Infocity, Chennai and Coimbatore, India.",
      keywords: "contact developers, hire software squad, Prince Infocity Chennai, Kandhanchavadi map",
      canonical: "https://clarityinfotech.com/contact",
      slug: "/contact",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "Contact Us | Clarity InfoTech",
      ogDescription: "Reach our software squads and visit our offices in India.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com/contact",
      ogType: "website",
      twitterTitle: "Contact Us | Clarity InfoTech",
      twitterDescription: "Reach our software squads and visit our offices in India.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Prince Infocity Kandhanchavadi Office Location Map",
      imageTitle: "Map coordinates",
      imageCaption: "Visit our headquarters in Chennai.",
      schemaType: "Organization",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Clarity InfoTech",
        "description": "Phone number, email address, physical location, and contact form."
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 0.8,
      sitemapFrequency: "monthly"
    },
    gallery: {
      title: "Gallery | Clarity InfoTech - Media Showcase",
      description: "Explore the visual journey of Clarity InfoTech. Photos, event coverage, highlights, and office environment.",
      keywords: "clarity infotech gallery, photos, tech workspace, corporate showcase",
      canonical: "https://clarityinfotech.com/gallery",
      slug: "/gallery",
      robotsIndex: "index",
      robotsFollow: "follow",
      ogTitle: "Gallery | Clarity InfoTech",
      ogDescription: "Visual gallery and media showcase of Clarity InfoTech.",
      ogImage: "https://clarityinfotech.com/logo.png",
      ogUrl: "https://clarityinfotech.com/gallery",
      ogType: "website",
      twitterTitle: "Gallery | Clarity InfoTech",
      twitterDescription: "Visual gallery and media showcase of Clarity InfoTech.",
      twitterImage: "https://clarityinfotech.com/logo.png",
      twitterCardType: "summary_large_image",
      imageAlt: "Clarity InfoTech Photo Gallery",
      imageTitle: "Gallery and Media Showcase",
      imageCaption: "A visual showcase of our culture and milestones.",
      schemaType: "ImageGallery",
      schemaJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Clarity InfoTech Photo Gallery",
        "description": "Photos of projects, events, and highlights from Clarity InfoTech."
      }, null, 2),
      sitemapInclude: true,
      sitemapPriority: 0.7,
      sitemapFrequency: "weekly"
    },
    privacy: {
      title: "Privacy Policy | Clarity InfoTech CIT",
      description: "Read our corporate Privacy Policy explaining how we secure, process, and safeguard your data.",
      keywords: "privacy policy, cookies tracking, security data retention",
      canonical: "https://clarityinfotech.com/privacy-policy",
      slug: "/privacy-policy",
      robotsIndex: "noindex",
      robotsFollow: "follow",
      schemaJson: "{}",
      sitemapInclude: false,
      sitemapPriority: 0.3,
      sitemapFrequency: "yearly"
    },
    terms: {
      title: "Terms and Conditions | Clarity InfoTech CIT",
      description: "Read our corporate terms and conditions of usage of our cloud services and custom solutions.",
      keywords: "terms and conditions, intellectual property, service SLA",
      canonical: "https://clarityinfotech.com/terms-of-service",
      slug: "/terms-of-service",
      robotsIndex: "noindex",
      robotsFollow: "follow",
      schemaJson: "{}",
      sitemapInclude: false,
      sitemapPriority: 0.3,
      sitemapFrequency: "yearly"
    },
    refund: {
      title: "Refund Policy | Clarity InfoTech",
      description: "Read our corporate refund and milestone cancellation policy.",
      keywords: "refund scope, milestone cancellation",
      canonical: "https://clarityinfotech.com/refund-policy",
      slug: "/refund-policy",
      robotsIndex: "noindex",
      robotsFollow: "follow",
      schemaJson: "{}",
      sitemapInclude: false,
      sitemapPriority: 0.3,
      sitemapFrequency: "yearly"
    }
  };
  const DEFAULT_SYSTEM_CONFIG = {
    smtpEmail: "info@clarity-infotech.com",
    smtpPassword: "ypiz ukra cywo loap",
    smtpHost: "smtp.gmail.com",
    smtpPort: "465",
    smtpEncryption: "SSL",
    smtpDriver: "SMTP (Default)",
    facebookUrl: "#",
    instagramUrl: "#",
    twitterUrl: "#",
    linkedinUrl: "#",
    whatsappUrl: "#",
    seoTitle: "Clarity InfoTech | Enterprise Software Engineering & Cloud Solutions",
    seoDescription: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems with 24/7 reliability.",
    seoKeywords: "Clarity InfoTech, software engineering, DevOps, cloud architecture, security audit, custom software, React, Next.js"
  };
  const [systemConfigData, setSystemConfigData] = useState(DEFAULT_SYSTEM_CONFIG);
  const [seoData, setSeoData] = useState(DEFAULT_SEO_DATA);
  const [seoSelectedPage, setSeoSelectedPage] = useState("home");
  const [seoActiveSubTab, setSeoActiveSubTab] = useState("general");
  const [seoSaveSuccess, setSeoSaveSuccess] = useState(false);
  const [schemaTemplateType, setSchemaTemplateType] = useState("Organization");

  const [systemConfigSaveSuccess, setSystemConfigSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  // Telemetry Controls
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rateLimiting, setRateLimiting] = useState(true);
  const [apiLimit, setApiLimit] = useState(5000);

  // Real-time Console Log Stream Simulation
  const [consoleLogs, setConsoleLogs] = useState([]);
  const logContainerRef = useRef(null);

  const fetchLogos = async () => {
    setLoadingLogos(true);
    try {
      const res = await fetch("/api/logos");
      const data = await res.json();
      if (data.logos) {
        setAvailableLogos(data.logos);
      }
    } catch (err) {
      console.error("Failed to fetch logos:", err);
    } finally {
      setLoadingLogos(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setLogoUploadError("Please select a valid image file (.png, .jpg, .svg, .gif, .webp)");
      return;
    }
    
    setLogoUploadError("");
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/logos", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        updateHeaderLogo(data.url);
        fetchLogos();
      } else {
        setLogoUploadError(data.error || "Upload failed");
      }
    } catch (err) {
      setLogoUploadError("Failed to upload logo");
      console.error(err);
    }
  };

  const deleteLogo = async (filename, e) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;
    try {
      const res = await fetch(`/api/logos?file=${encodeURIComponent(filename)}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        if (headerData.logo === `/logos/${filename}`) {
          updateHeaderLogo("");
        }
        fetchLogos();
      } else {
        alert(data.error || "Failed to delete logo");
      }
    } catch (err) {
      alert("Failed to delete logo");
      console.error(err);
    }
  };

  // Initialize data from localStorage or fallback
  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await fetch("/api/admin/verify");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthorized(true);
          fetchAuthSettings();
        }
      } catch (err) {
        console.error("Session verification failed:", err);
      } finally {
        setVerifyingSession(false);
      }
    };

    if (typeof window !== "undefined") {
      verifySession();
      fetchLogos();
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
        try { setAboutData({ ...DEFAULT_ABOUT, ...JSON.parse(storedAbout) }); } catch { }
      } else {
        localStorage.setItem("clarity_about", JSON.stringify(DEFAULT_ABOUT));
      }

      // Load platforms data
      const storedPlatforms = localStorage.getItem("clarity_platforms");
      if (storedPlatforms) {
        try { setPlatformsData({ ...DEFAULT_PLATFORMS, ...JSON.parse(storedPlatforms) }); } catch { }
      } else {
        localStorage.setItem("clarity_platforms", JSON.stringify(DEFAULT_PLATFORMS));
      }

      // Load services data
      const storedServices = localStorage.getItem("clarity_services");
      if (storedServices) {
        try {
          const parsed = JSON.parse(storedServices);
          setServicesData({ ...DEFAULT_SERVICES, ...parsed, marqueeLogos: parsed.marqueeLogos || DEFAULT_SERVICES.marqueeLogos });
        } catch { }
      } else {
        localStorage.setItem("clarity_services", JSON.stringify(DEFAULT_SERVICES));
      }

      // Load FAQ data
      const storedFaq = localStorage.getItem("clarity_faq");
      if (storedFaq) {
        try { setFaqData({ ...DEFAULT_FAQ, ...JSON.parse(storedFaq) }); } catch { }
      } else {
        localStorage.setItem("clarity_faq", JSON.stringify(DEFAULT_FAQ));
      }

      // Load header data
      const storedHeader = localStorage.getItem("clarity_header");
      if (storedHeader) {
        try {
          const parsed = JSON.parse(storedHeader);
          if (parsed && parsed.links) {
            parsed.links = parsed.links.filter(l => l.label !== "Our Projects");
            if (!parsed.links.some(l => l.url === "/gallery")) {
              parsed.links.push({ id: 6, label: "Gallery", url: "/gallery" });
            }
            parsed.links.forEach(l => {
              const lbl = l.label ? l.label.toLowerCase() : "";
              if (lbl.includes("home")) l.url = "/";
              else if (lbl.includes("about")) l.url = "/about";
              else if (lbl.includes("service")) l.url = "/our-services";
              else if (lbl.includes("gallery")) l.url = "/gallery";
              else if (lbl.includes("contact")) l.url = "/contact";
            });
            const linkOrder = ["/", "/about", "/our-services", "/gallery", "/contact"];
            parsed.links.sort((a, b) => {
              const idxA = linkOrder.indexOf(a.url);
              const idxB = linkOrder.indexOf(b.url);
              return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
            });
            localStorage.setItem("clarity_header", JSON.stringify(parsed));
          }
          setHeaderData({ ...DEFAULT_HEADER, ...parsed });
        } catch { }
      } else {
        localStorage.setItem("clarity_header", JSON.stringify(DEFAULT_HEADER));
      }

      // Load footer data
      const storedFooter = localStorage.getItem("clarity_footer");
      if (storedFooter) {
        try {
          const parsed = JSON.parse(storedFooter);
          const hasRefund = (parsed.companyLinks || []).some(l => l.label.toLowerCase().includes("refund"));
          if (!hasRefund) {
            parsed.companyLinks = DEFAULT_FOOTER.companyLinks;
            localStorage.setItem("clarity_footer", JSON.stringify(parsed));
          }
          setFooterData({ ...DEFAULT_FOOTER, ...parsed });
        } catch { }
      } else {
        localStorage.setItem("clarity_footer", JSON.stringify(DEFAULT_FOOTER));
      }

      // Load About Page data
      const storedPageAbout = localStorage.getItem("clarity_page_about");
      if (storedPageAbout) {
        try { setPageAboutData({ ...DEFAULT_PAGE_ABOUT, ...JSON.parse(storedPageAbout) }); } catch { }
      } else {
        localStorage.setItem("clarity_page_about", JSON.stringify(DEFAULT_PAGE_ABOUT));
      }

      // Load Our Projects Page data
      const storedPageProjects = localStorage.getItem("clarity_page_projects");
      if (storedPageProjects) {
        try { setPageProjectsData({ ...DEFAULT_PAGE_PROJECTS, ...JSON.parse(storedPageProjects) }); } catch { }
      } else {
        localStorage.setItem("clarity_page_projects", JSON.stringify(DEFAULT_PAGE_PROJECTS));
      }

      // Load Our Service Page data
      const storedPageService = localStorage.getItem("clarity_page_service");
      if (storedPageService) {
        try { setPageServiceData({ ...DEFAULT_PAGE_SERVICE, ...JSON.parse(storedPageService) }); } catch { }
      } else {
        localStorage.setItem("clarity_page_service", JSON.stringify(DEFAULT_PAGE_SERVICE));
      }

      // Load Contact Us Page data
      const storedPageContact = localStorage.getItem("clarity_page_contact");
      if (storedPageContact) {
        try { setPageContactData({ ...DEFAULT_PAGE_CONTACT, ...JSON.parse(storedPageContact) }); } catch { }
      } else {
        localStorage.setItem("clarity_page_contact", JSON.stringify(DEFAULT_PAGE_CONTACT));
      }

      // Load Gallery Page data
      const storedPageGallery = localStorage.getItem("clarity_page_gallery");
      if (storedPageGallery) {
        try { 
          let parsed = JSON.parse(storedPageGallery);
          if (parsed.videos && parsed.videos.length > 0 && parsed.videos[0].title === "Cloud Infrastructure & DevOps Automation") {
            parsed.videos[0] = {
              title: "The Secrets of Learning a New Language",
              url: "https://www.youtube.com/embed/NiTsduRreug",
              thumbnail: "https://img.youtube.com/vi/NiTsduRreug/hqdefault.jpg",
              isLocal: false
            };
            localStorage.setItem("clarity_page_gallery", JSON.stringify(parsed));
          }
          setPageGalleryData({ ...DEFAULT_PAGE_GALLERY, ...parsed }); 
        } catch { }
      } else {
        localStorage.setItem("clarity_page_gallery", JSON.stringify(DEFAULT_PAGE_GALLERY));
      }

      const storedGalleryImages = localStorage.getItem("clarity_gallery_images");
      if (storedGalleryImages) {
        try { setGalleryImages(JSON.parse(storedGalleryImages)); } catch { }
      } else {
        localStorage.setItem("clarity_gallery_images", JSON.stringify(DEFAULT_GALLERY_IMAGES));
      }

      const storedGalleryVideos = localStorage.getItem("clarity_gallery_videos_edu");
      if (storedGalleryVideos) {
        try { setGalleryVideos(JSON.parse(storedGalleryVideos)); } catch { }
      }

      // Load Legal Pages data
      const storedLegalPages = localStorage.getItem("clarity_legal_pages");
      if (storedLegalPages) {
        try {
          const parsed = JSON.parse(storedLegalPages);
          setLegalPagesData({ ...DEFAULT_LEGAL_PAGES, ...parsed });
        } catch { }
      } else {
        localStorage.setItem("clarity_legal_pages", JSON.stringify(DEFAULT_LEGAL_PAGES));
      }

      // Load SEO data
      const storedSeoData = localStorage.getItem("clarity_seo_data");
      if (storedSeoData) {
        try {
          const parsed = JSON.parse(storedSeoData);
          setSeoData({ ...DEFAULT_SEO_DATA, ...parsed });
        } catch {
          setSeoData(DEFAULT_SEO_DATA);
        }
      } else {
        localStorage.setItem("clarity_seo_data", JSON.stringify(DEFAULT_SEO_DATA));
        setSeoData(DEFAULT_SEO_DATA);
      }

      // Load System Config data
      const storedSystemConfig = localStorage.getItem("clarity_system_config");
      if (storedSystemConfig) {
        try {
          const parsed = JSON.parse(storedSystemConfig);
          // Overwrite the placeholder email or old tekquora/facebook profile links
          if (
            parsed.smtpEmail === "zubairyakhan48@gmail.com" ||
            parsed.smtpEmail === "your-email@example.com" ||
            (parsed.instagramUrl && parsed.instagramUrl.includes("tekquora")) ||
            (parsed.facebookUrl && parsed.facebookUrl.includes("61585230471650"))
          ) {
            setSystemConfigData(DEFAULT_SYSTEM_CONFIG);
            localStorage.setItem("clarity_system_config", JSON.stringify(DEFAULT_SYSTEM_CONFIG));
          } else {
            setSystemConfigData({ ...DEFAULT_SYSTEM_CONFIG, ...parsed });
          }
        } catch { }
      } else {
        localStorage.setItem("clarity_system_config", JSON.stringify(DEFAULT_SYSTEM_CONFIG));
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
  const handleHeroImageFileUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (isEdit) {
        setEditForm(prev => ({ ...prev, image: dataUrl }));
      } else {
        setNewSlide(prev => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

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
    const updated = (heroSlides || []).map((s, i) => (i === editingSlide ? { ...editForm, id: s.id } : s));
    saveHeroSlides(updated);
    setEditingSlide(null);
    setEditForm({});
  };

  const deleteSlide = (idx) => {
    const slides = heroSlides || [];
    if (slides.length <= 1) return alert("You must keep at least 1 slide.");
    if (!confirm("Delete this slide?")) return;
    const updated = slides.filter((_, i) => i !== idx).map((s, i) => ({
      ...s,
      badge: `0${i + 1} / 0${slides.length - 1} • ${(s.badge || "").split("•")[1]?.trim() || (s.title || "").toUpperCase()}`
    }));
    saveHeroSlides(updated);
    if (editingSlide === idx) cancelEditSlide();
  };

  const moveSlide = (idx, dir) => {
    const slides = heroSlides || [];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= slides.length) return;
    const updated = [...slides];
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    saveHeroSlides(updated);
    if (editingSlide === idx) setEditingSlide(newIdx);
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    const slides = heroSlides || [];
    const total = slides.length + 1;
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
  const updateFeature = (i, key, val) => setAboutData(d => { const f = [...(d.features || [])]; f[i] = { ...f[i], [key]: val }; return { ...d, features: f }; });
  const saveAbout = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_about", JSON.stringify(aboutData));
    setAboutSaveSuccess(true);
    setTimeout(() => setAboutSaveSuccess(false), 2500);
  };
  const resetAbout = () => { if (confirm("Reset About section to defaults?")) { setAboutData(DEFAULT_ABOUT); localStorage.setItem("clarity_about", JSON.stringify(DEFAULT_ABOUT)); } };

  // Platforms CRUD
  const updatePlatformField = (key, val) => setPlatformsData(d => ({ ...d, [key]: val }));
  const updatePlatformStat = (i, key, val) => setPlatformsData(d => { const s = [...(d.stats || [])]; s[i] = { ...s[i], [key]: val }; return { ...d, stats: s }; });
  const addPlatformStat = () => setPlatformsData(d => ({ ...d, stats: [...(d.stats || []), { label: "New Feature" }] }));
  const deletePlatformStat = (i) => setPlatformsData(d => ({ ...d, stats: (d.stats || []).filter((_, idx) => idx !== i) }));
  const savePlatforms = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_platforms", JSON.stringify(platformsData));
    setPlatformsSaveSuccess(true);
    setTimeout(() => setPlatformsSaveSuccess(false), 2500);
  };
  const resetPlatforms = () => { if (confirm("Reset Platforms section to defaults?")) { setPlatformsData(DEFAULT_PLATFORMS); localStorage.setItem("clarity_platforms", JSON.stringify(DEFAULT_PLATFORMS)); } };

  // Services CRUD
  const updateServiceField = (key, val) => setServicesData(d => ({ ...d, [key]: val }));
  const updateServiceCard = (i, key, val) => setServicesData(d => { const c = [...d.cards]; c[i] = { ...c[i], [key]: val }; return { ...d, cards: c }; });
  const addServiceCard = () => setServicesData(d => ({
    ...d,
    cards: [...d.cards, { id: "new-" + Date.now(), title: "New Service", category: "Category", year: "2026", media: "", isVideo: false }]
  }));
  const deleteServiceCard = (i) => setServicesData(d => ({ ...d, cards: d.cards.filter((_, idx) => idx !== i) }));

  const updateMarqueeLogo = (i, val) => setServicesData(d => { 
    const m = [...(d.marqueeLogos || [])]; 
    if (typeof m[i] === 'string') m[i] = { name: m[i], icon: "Code2" };
    m[i] = { ...m[i], name: val }; 
    return { ...d, marqueeLogos: m }; 
  });
  const updateMarqueeLogoIcon = (i, val) => setServicesData(d => { 
    const m = [...(d.marqueeLogos || [])]; 
    if (typeof m[i] === 'string') m[i] = { name: m[i], icon: "Code2" };
    m[i] = { ...m[i], icon: val }; 
    return { ...d, marqueeLogos: m }; 
  });
  const addMarqueeLogo = () => setServicesData(d => ({ ...d, marqueeLogos: [...(d.marqueeLogos || []), { name: "New Partner", icon: "Code2" }] }));
  const deleteMarqueeLogo = (i) => setServicesData(d => ({ ...d, marqueeLogos: (d.marqueeLogos || []).filter((_, idx) => idx !== i) }));

  const saveServices = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_services", JSON.stringify(servicesData));
    
    // Sync to Our Projects Page content so changes apply to the /services page immediately
    const updatedPageProjects = {
      ...pageProjectsData,
      projectsList: (servicesData.cards || []).map(c => {
        // Map display category to filter key if needed
        let catKey = "development";
        const catLower = (c.category || "").toLowerCase();
        if (catLower.includes("cloud") || catLower.includes("infra")) catKey = "cloud";
        else if (catLower.includes("security") || catLower.includes("audit")) catKey = "security";
        else if (catLower.includes("ai") || catLower.includes("analytic")) catKey = "ai";
        
        return {
          id: c.id || "project-" + Date.now() + Math.random(),
          category: catKey,
          title: c.title || "",
          badge: c.category || "Project Showcase",
          description: c.description || "Enterprise software development and system integration.",
          icon: c.icon || "Code2",
          gradient: c.gradient || "from-indigo-500 to-purple-600",
          media: c.media || "/service.mp4",
          isVideo: c.isVideo !== undefined ? c.isVideo : true,
          features: c.features || ["High performance architecture", "Zero downtime scaling"]
        };
      })
    };
    localStorage.setItem("clarity_page_projects", JSON.stringify(updatedPageProjects));
    // Update local state to match
    setPageProjectsData(updatedPageProjects);

    setServicesSaveSuccess(true);
    setTimeout(() => setServicesSaveSuccess(false), 2500);
  };
  const resetServices = () => { if (confirm("Reset Services section to defaults?")) { setServicesData(DEFAULT_SERVICES); localStorage.setItem("clarity_services", JSON.stringify(DEFAULT_SERVICES)); } };

  const handleProjectMediaUpload = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/logos", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        updateProjectCard(i, "media", data.url);
        const isVid = file.type.startsWith("video/") || data.url.endsWith(".mp4") || data.url.endsWith(".webm");
        updateProjectCard(i, "isVideo", isVid);
      }
    } catch (err) {
      console.error("Failed to upload project media:", err);
    }
  };

  const handleServiceCardMediaUpload = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/logos", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        updateServiceCard(i, "media", data.url);
        const isVid = file.type.startsWith("video/") || data.url.endsWith(".mp4") || data.url.endsWith(".webm");
        updateServiceCard(i, "isVideo", isVid);
      }
    } catch (err) {
      console.error("Failed to upload service media:", err);
    }
  };

  // FAQ CRUD
  const updateFaqField = (key, val) => setFaqData(d => ({ ...d, [key]: val }));
  const updateFaqQuestion = (i, key, val) => setFaqData(d => { const q = [...(d.questions || [])]; q[i] = { ...q[i], [key]: val }; return { ...d, questions: q }; });
  const addFaqQuestion = () => setFaqData(d => ({
    ...d,
    questions: [...(d.questions || []), { q: "New Question Title?", a: "Detailed answer text..." }]
  }));
  const deleteFaqQuestion = (i) => setFaqData(d => ({ ...d, questions: (d.questions || []).filter((_, idx) => idx !== i) }));

  const updateInquiryTypeTag = (i, val) => setFaqData(d => { const t = [...(d.inquiryTypes || [])]; t[i] = val; return { ...d, inquiryTypes: t }; });
  const addInquiryTypeTag = () => setFaqData(d => ({ ...d, inquiryTypes: [...(d.inquiryTypes || []), "New Category"] }));
  const deleteInquiryTypeTag = (i) => setFaqData(d => ({ ...d, inquiryTypes: (d.inquiryTypes || []).filter((_, idx) => idx !== i) }));

  const saveFaq = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_faq", JSON.stringify(faqData));
    setFaqSaveSuccess(true);
    setTimeout(() => setFaqSaveSuccess(false), 2500);
  };
  const resetFaq = () => { if (confirm("Reset FAQ section to defaults?")) { setFaqData(DEFAULT_FAQ); localStorage.setItem("clarity_faq", JSON.stringify(DEFAULT_FAQ)); } };

  // Header CRUD
  const updateHeaderLogo = (val) => setHeaderData(d => ({ ...d, logo: val }));
  const updateHeaderLink = (i, key, val) => setHeaderData(d => { const l = [...(d.links || [])]; l[i] = { ...l[i], [key]: val }; return { ...d, links: l }; });
  const addHeaderLink = () => setHeaderData(d => ({ ...d, links: [...(d.links || []), { id: Date.now(), label: "New Link", url: "#" }] }));
  const deleteHeaderLink = (i) => setHeaderData(d => ({ ...d, links: (d.links || []).filter((_, idx) => idx !== i) }));
  const saveHeader = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_header", JSON.stringify(headerData));
    setHeaderSaveSuccess(true);
    setTimeout(() => setHeaderSaveSuccess(false), 2500);
  };
  const resetHeader = () => { if (confirm("Reset Header to defaults?")) { setHeaderData(DEFAULT_HEADER); localStorage.setItem("clarity_header", JSON.stringify(DEFAULT_HEADER)); } };

  // Footer CRUD
  const updateFooterField = (key, val) => setFooterData(d => ({ ...d, [key]: val }));
  const updateCompanyLink = (i, key, val) => setFooterData(d => { const c = [...(d.companyLinks || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, companyLinks: c }; });
  const addCompanyLink = () => setFooterData(d => ({ ...d, companyLinks: [...(d.companyLinks || []), { label: "New Link", url: "#" }] }));
  const deleteCompanyLink = (i) => setFooterData(d => ({ ...d, companyLinks: (d.companyLinks || []).filter((_, idx) => idx !== i) }));

  const updateNavLink = (i, key, val) => setFooterData(d => { const c = [...(d.navLinks || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, navLinks: c }; });
  const addNavLink = () => setFooterData(d => ({ ...d, navLinks: [...(d.navLinks || []), { label: "New Link", url: "#" }] }));
  const deleteNavLink = (i) => setFooterData(d => ({ ...d, navLinks: (d.navLinks || []).filter((_, idx) => idx !== i) }));
  const saveFooter = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_footer", JSON.stringify(footerData));
    setFooterSaveSuccess(true);
    setTimeout(() => setFooterSaveSuccess(false), 2500);
  };
  const resetFooter = () => { if (confirm("Reset Footer to defaults?")) { setFooterData(DEFAULT_FOOTER); localStorage.setItem("clarity_footer", JSON.stringify(DEFAULT_FOOTER)); } };

  // About Page CRUD
  const updatePageAboutField = (key, val) => setPageAboutData(d => ({ ...d, [key]: val }));
  const updatePageAboutCard = (i, key, val) => setPageAboutData(d => { const c = [...(d.valuesCards || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, valuesCards: c }; });
  const addPageAboutCard = () => setPageAboutData(d => ({ ...d, valuesCards: [...(d.valuesCards || []), { step: "0X", title: "New Value", icon: "Star", image: "", gradient: "from-sky-400 to-indigo-600", tag: "Tag", desc: "Description" }] }));
  const deletePageAboutCard = (i) => setPageAboutData(d => ({ ...d, valuesCards: (d.valuesCards || []).filter((_, idx) => idx !== i) }));
  const updatePageAboutWhyList = (i, val) => setPageAboutData(d => { const l = [...(d.whyChooseList || [])]; l[i] = val; return { ...d, whyChooseList: l }; });
  const addPageAboutWhyList = () => setPageAboutData(d => ({ ...d, whyChooseList: [...(d.whyChooseList || []), "New Reason"] }));
  const deletePageAboutWhyList = (i) => setPageAboutData(d => ({ ...d, whyChooseList: (d.whyChooseList || []).filter((_, idx) => idx !== i) }));
  
  const savePageAbout = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_page_about", JSON.stringify(pageAboutData));
    setPageAboutSaveSuccess(true);
    setTimeout(() => setPageAboutSaveSuccess(false), 2500);
  };
  const resetPageAbout = () => { if (confirm("Reset About Page to defaults?")) { setPageAboutData(DEFAULT_PAGE_ABOUT); localStorage.setItem("clarity_page_about", JSON.stringify(DEFAULT_PAGE_ABOUT)); } };

  // Our Projects Page CRUD
  const updatePageProjectsField = (key, val) => setPageProjectsData(d => ({ ...d, [key]: val }));
  const updateProjectCard = (i, key, val) => setPageProjectsData(d => { const c = [...(d.projectsList || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, projectsList: c }; });
  const addProjectCard = () => setPageProjectsData(d => ({
    ...d,
    projectsList: [...(d.projectsList || []), {
      id: "project-" + Date.now(),
      category: "development",
      title: "New Software Engineering Project",
      badge: "Full-Stack & Cloud",
      description: "Description of the innovative digital project and tech stack.",
      icon: "Code2",
      gradient: "from-indigo-500 to-purple-600",
      media: "/service.mp4",
      isVideo: true,
      features: ["Feature 1 detail", "Feature 2 detail"]
    }]
  }));
  const deleteProjectCard = (i) => setPageProjectsData(d => ({ ...d, projectsList: (d.projectsList || []).filter((_, idx) => idx !== i) }));
  
  const updateProjectFeature = (cardIdx, featIdx, val) => setPageProjectsData(d => {
    const cards = [...(d.projectsList || [])];
    const feats = [...(cards[cardIdx].features || [])];
    feats[featIdx] = val;
    cards[cardIdx] = { ...cards[cardIdx], features: feats };
    return { ...d, projectsList: cards };
  });
  const addProjectFeature = (cardIdx) => setPageProjectsData(d => {
    const cards = [...(d.projectsList || [])];
    cards[cardIdx] = { ...cards[cardIdx], features: [...(cards[cardIdx].features || []), "New feature point"] };
    return { ...d, projectsList: cards };
  });
  const deleteProjectFeature = (cardIdx, featIdx) => setPageProjectsData(d => {
    const cards = [...(d.projectsList || [])];
    cards[cardIdx] = { ...cards[cardIdx], features: (cards[cardIdx].features || []).filter((_, fIdx) => fIdx !== featIdx) };
    return { ...d, projectsList: cards };
  });

  const updateWorkflowStep = (i, key, val) => setPageProjectsData(d => { const s = [...(d.workflowSteps || [])]; s[i] = { ...s[i], [key]: val }; return { ...d, workflowSteps: s }; });
  const addWorkflowStep = () => setPageProjectsData(d => ({ ...d, workflowSteps: [...(d.workflowSteps || []), { step: "0X", title: "New Workflow Step", desc: "Description of workflow step." }] }));
  const deleteWorkflowStep = (i) => setPageProjectsData(d => ({ ...d, workflowSteps: (d.workflowSteps || []).filter((_, idx) => idx !== i) }));

  const savePageProjects = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_page_projects", JSON.stringify(pageProjectsData));

    // Sync to Homepage Services section so changes apply to the main landing page immediately
    const updatedServices = {
      ...servicesData,
      cards: (pageProjectsData.projectsList || []).map(c => {
        return {
          id: c.id || "service-" + Date.now() + Math.random(),
          title: c.title || "",
          category: c.badge || "Project Showcase",
          year: c.year || "2026",
          media: c.media || "/service.mp4",
          isVideo: c.isVideo !== undefined ? c.isVideo : true,
          description: c.description || "",
          icon: c.icon || "Code2",
          gradient: c.gradient || "from-indigo-500 to-purple-600",
          features: c.features || []
        };
      })
    };
    localStorage.setItem("clarity_services", JSON.stringify(updatedServices));
    // Update local state to match
    setServicesData(updatedServices);

    setPageProjectsSaveSuccess(true);
    setTimeout(() => setPageProjectsSaveSuccess(false), 2500);
  };
  const resetPageProjects = () => { if (confirm("Reset Our Projects page to defaults?")) { setPageProjectsData(DEFAULT_PAGE_PROJECTS); localStorage.setItem("clarity_page_projects", JSON.stringify(DEFAULT_PAGE_PROJECTS)); } };

  // Our Service Page CRUD
  const updatePageServiceField = (key, val) => setPageServiceData(d => ({ ...d, [key]: val }));
  
  const updateCoreValue = (i, key, val) => setPageServiceData(d => { const c = [...(d.coreValues || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, coreValues: c }; });
  const addCoreValue = () => setPageServiceData(d => ({ ...d, coreValues: [...(d.coreValues || []), { title: "New Value", icon: "Star", desc: "Core principle description." }] }));
  const deleteCoreValue = (i) => setPageServiceData(d => ({ ...d, coreValues: (d.coreValues || []).filter((_, idx) => idx !== i) }));

  const updateServiceCardItem = (i, key, val) => setPageServiceData(d => { const c = [...(d.serviceCards || [])]; c[i] = { ...c[i], [key]: val }; return { ...d, serviceCards: c }; });
  const addServiceCardItem = () => setPageServiceData(d => ({ ...d, serviceCards: [...(d.serviceCards || []), { title: "New Service", icon: "Code2", desc: "Description of service." }] }));
  const deleteServiceCardItem = (i) => setPageServiceData(d => ({ ...d, serviceCards: (d.serviceCards || []).filter((_, idx) => idx !== i) }));

  const updateCircleNodeItem = (i, key, val) => setPageServiceData(d => { const n = [...(d.circleNodes || [])]; n[i] = { ...n[i], [key]: val }; return { ...d, circleNodes: n }; });
  
  const updateStatItem = (i, key, val) => setPageServiceData(d => { const s = [...(d.stats || [])]; s[i] = { ...s[i], [key]: val }; return { ...d, stats: s }; });
  const addStatItem = () => setPageServiceData(d => ({ ...d, stats: [...(d.stats || []), { value: "100+", label: "New Metric", icon: "Globe" }] }));
  const deleteStatItem = (i) => setPageServiceData(d => ({ ...d, stats: (d.stats || []).filter((_, idx) => idx !== i) }));

  const savePageService = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_page_service", JSON.stringify(pageServiceData));
    setPageServiceSaveSuccess(true);
    setTimeout(() => setPageServiceSaveSuccess(false), 2500);
  };
  const resetPageService = () => { if (confirm("Reset Our Service page to defaults?")) { setPageServiceData(DEFAULT_PAGE_SERVICE); localStorage.setItem("clarity_page_service", JSON.stringify(DEFAULT_PAGE_SERVICE)); } };

  // Contact Us Page CRUD
  const updatePageContactField = (key, val) => setPageContactData(d => ({ ...d, [key]: val }));
  const savePageContact = () => {
    localStorage.setItem("clarity_page_contact", JSON.stringify(pageContactData));
    setPageContactSaveSuccess(true);
    setTimeout(() => setPageContactSaveSuccess(false), 2500);
  };
  const resetPageContact = () => { if (confirm("Reset Contact Us page to defaults?")) { setPageContactData(DEFAULT_PAGE_CONTACT); localStorage.setItem("clarity_page_contact", JSON.stringify(DEFAULT_PAGE_CONTACT)); } };

  // Gallery Page CRUD
  const updatePageGalleryField = (key, val) => setPageGalleryData(d => ({ ...d, [key]: val }));
  const updateGalleryImage = (i, key, val) => setGalleryImages(imgs => { const updated = [...imgs]; updated[i] = { ...updated[i], [key]: val }; return updated; });
  const addGalleryImage = () => setGalleryImages(imgs => [...imgs, { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&h=800&q=80", alt: "New Gallery Image", title: "New Moment Title" }]);
  const deleteGalleryImage = (i) => setGalleryImages(imgs => imgs.filter((_, idx) => idx !== i));
  const moveGalleryImage = (i, dir) => setGalleryImages(imgs => {
    const newIdx = i + dir;
    if (newIdx < 0 || newIdx >= imgs.length) return imgs;
    const updated = [...imgs];
    [updated[i], updated[newIdx]] = [updated[newIdx], updated[i]];
    return updated;
  });

  const handleGalleryImageUpload = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/logos", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        updateGalleryImage(i, "url", data.url);
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  const savePageGallery = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_page_gallery", JSON.stringify(pageGalleryData));
    localStorage.setItem("clarity_gallery_images", JSON.stringify(galleryImages));
    localStorage.setItem("clarity_gallery_videos_edu", JSON.stringify(galleryVideos));
    setPageGallerySaveSuccess(true);
    setTimeout(() => setPageGallerySaveSuccess(false), 2500);
  };
  const resetPageGallery = () => {
    if (confirm("Reset Gallery Page to defaults?")) {
      setPageGalleryData(DEFAULT_PAGE_GALLERY);
      setGalleryImages(DEFAULT_GALLERY_IMAGES);
      setGalleryVideos([]);
      localStorage.setItem("clarity_page_gallery", JSON.stringify(DEFAULT_PAGE_GALLERY));
      localStorage.setItem("clarity_gallery_images", JSON.stringify(DEFAULT_GALLERY_IMAGES));
      localStorage.setItem("clarity_gallery_videos_edu", JSON.stringify([]));
    }
  };

  // Gallery Videos CRUD
  const addGalleryVideo = () => setGalleryVideos(v => [...v, { title: "New Video", url: "", thumbnail: "", isLocal: false }]);
  const updateGalleryVideo = (i, key, val) => setGalleryVideos(v => { const n = [...v]; n[i] = { ...n[i], [key]: val }; return n; });
  const deleteGalleryVideo = (i) => setGalleryVideos(v => v.filter((_, idx) => idx !== i));
  const handleGalleryVideoThumbnailUpload = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/logos", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) updateGalleryVideo(i, "thumbnail", data.url);
    } catch (err) { console.error("Failed to upload thumbnail:", err); }
  };
  const handleGalleryVideoFileUpload = async (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/logos", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.url) { updateGalleryVideo(i, "url", data.url); updateGalleryVideo(i, "isLocal", true); }
    } catch (err) { console.error("Failed to upload video:", err); }
  };
  const saveGalleryVideos = () => {
    localStorage.setItem("clarity_gallery_videos_edu", JSON.stringify(galleryVideos));
    setPageGallerySaveSuccess(true);
    setTimeout(() => setPageGallerySaveSuccess(false), 2500);
  };

  // Legal Pages CRUD
  const updateLegalPagesField = (key, val) => setLegalPagesData(d => ({ ...d, [key]: val }));
  const saveLegalPages = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_legal_pages", JSON.stringify(legalPagesData));
    setLegalPagesSaveSuccess(true);
    setTimeout(() => setLegalPagesSaveSuccess(false), 2500);
  };
  const resetLegalPages = () => { if (confirm("Reset all Legal pages to defaults?")) { setLegalPagesData(DEFAULT_LEGAL_PAGES); localStorage.setItem("clarity_legal_pages", JSON.stringify(DEFAULT_LEGAL_PAGES)); } };

  // System Config CRUD
  const updateSystemConfigField = (key, val) => setSystemConfigData(d => ({ ...d, [key]: val }));
  const saveSystemConfig = async () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    localStorage.setItem("clarity_system_config", JSON.stringify(systemConfigData));
    
    // Save Admin Login credentials server-side
    try {
      const res = await fetch("/api/admin/auth-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsernameSetting, password: adminPasswordSetting })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to update admin login credentials settings");
        return;
      }
    } catch (err) {
      console.error("Failed to save auth settings:", err);
      alert("Failed to connect to authentication server settings");
      return;
    }

    setSystemConfigSaveSuccess(true);
    setTimeout(() => setSystemConfigSaveSuccess(false), 2500);
  };
  const resetSystemConfig = () => { 
    if (confirm("Reset System Configuration to defaults?")) { 
      setSystemConfigData(DEFAULT_SYSTEM_CONFIG); 
      localStorage.setItem("clarity_system_config", JSON.stringify(DEFAULT_SYSTEM_CONFIG)); 
      setAdminUsernameSetting("admin");
      setAdminPasswordSetting("clarityadmin123");
    } 
  };

  // ── SEO Management CRUD ──
  const updateSeoField = (keyOrPage, valOrKey, maybeVal) => {
    if (maybeVal !== undefined) {
      setSeoData(d => ({
        ...d,
        [keyOrPage]: {
          ...d[keyOrPage],
          [valOrKey]: maybeVal
        }
      }));
    } else {
      setSeoData(d => ({
        ...d,
        [seoSelectedPage]: {
          ...d[seoSelectedPage],
          [keyOrPage]: valOrKey
        }
      }));
    }
  };

  const renderQuickSeoCard = (pageKey, sectionType = "general") => {
    const pageConfig = seoData[pageKey] || {};
    const validation = getSeoValidation(pageKey);

    // Render custom UI formats for each section
    if (sectionType === "hero") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-805 uppercase tracking-wider">Hero Section Image Alt & Slide SEO</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Hero Slide Settings</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Slides Image Alt Text</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="Alt description for main homepage sliders..."
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Slide Image Title</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                placeholder="Title attributes for slider tags..."
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">These attributes will be bound to all active homepage carousel slide images for image crawler indexation.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Hero SEO Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Hero SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "about_us") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">About Section Image Alt & Heading SEO</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">About Section SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">About Section Illustration Alt Tag</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="e.g. Clarity InfoTech Software Developers Team"
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">About Illustration Image Title</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                placeholder="About Us Image Title attribute..."
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Specifies the crawler indexing parameters for the about section illustration graphic.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("About Section SEO Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save About SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "projects_list") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Project Grid Media Alt & SEO Settings</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Projects SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Project Thumbnail Default Alt Attribute</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="e.g. Enterprise Software Project Case Studies"
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Project Thumbnail Title Tag</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Applies search crawler indexing properties to all project showcase thumbnails.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Projects SEO Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Projects SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "platforms") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Work Culture Gallery Alt & Image SEO</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Culture Gallery SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Gallery Image Alt Attribute Prefix</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="e.g. Clarity Office Culture and Collaboration"
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Gallery Image Title Tag</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Specifies indexing tags for all gallery slides in the Work Culture showcase grid.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Gallery SEO Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Gallery SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "faq") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Contact Office Maps & Form Image SEO</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Contact SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Office Address Maps Illustration Alt</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="e.g. Clarity Office Location Map"
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Maps Graphic Title Tag</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Configures metadata tags bound to office address card graphics and contact page layouts.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Contact Page SEO saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Contact SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "footer") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Footer Logo & Navigation Links Alt Settings</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Footer Logo SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Footer Brand Logo Alt Attribute</label>
              <input
                type="text"
                value={pageConfig.imageAlt || ""}
                onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
                placeholder="e.g. Clarity InfoTech Logo Footer"
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Footer Logo Image Title Tag</label>
              <input
                type="text"
                value={pageConfig.imageTitle || ""}
                onChange={e => updateSeoField(pageKey, "imageTitle", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Injects search crawl parameters specifically bound to the footer logo brand asset.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Footer Logo Alt Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Footer SEO
            </button>
          </div>
        </div>
      );
    }

    if (sectionType === "legal") {
      return (
        <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 pb-3">
            <div className="flex items-center gap-2">
              <Search className="text-[#1E67E2]" size={18} />
              <h3 className="text-sm font-bold text-slate-850 uppercase tracking-wider">Legal Policy Page SEO & Canonical Settings</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600">Legal Policy SEO</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Policy Page SEO Title</label>
              <input
                type="text"
                value={pageConfig.title || ""}
                onChange={e => updateSeoField(pageKey, "title", e.target.value)}
                placeholder="Legal Policy Page SEO Title..."
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Canonical Policy URL Link</label>
              <input
                type="text"
                value={pageConfig.canonical || ""}
                onChange={e => updateSeoField(pageKey, "canonical", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <p className="text-[11px] text-slate-400">Specifies Search Engine Optimization indexation parameters for company disclosure terms and legal forms.</p>
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("Legal Page SEO Settings saved!");
              }}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition"
            >
              Save Legal SEO
            </button>
          </div>
        </div>
      );
    }

    // Default Page-Level Full Card (for general page tabs like Page About, Page Projects, Page Service)
    return (
      <div className="col-span-full w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-150 pb-3">
          <div className="flex items-center gap-2">
            <Search className="text-[#1E67E2]" size={18} />
            <h3 className="text-sm font-bold text-slate-805 uppercase tracking-wider">Page SEO & Image Alt Settings</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
              validation.score > 80 
                ? 'bg-emerald-50 text-emerald-600' 
                : validation.score > 50 
                ? 'bg-amber-50 text-amber-600' 
                : 'bg-red-50 text-red-500'
            }`}>
              SEO Score: ${validation.score}/100
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-semibold mb-1.5 block">SEO Title</label>
            <input
              type="text"
              value={pageConfig.title || ""}
              onChange={e => updateSeoField(pageKey, "title", e.target.value)}
              placeholder="Page SEO Title..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Meta Keywords</label>
            <input
              type="text"
              value={pageConfig.keywords || ""}
              onChange={e => updateSeoField(pageKey, "keywords", e.target.value)}
              placeholder="Keywords separated by commas..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Meta Description</label>
          <textarea
            rows={2}
            value={pageConfig.description || ""}
            onChange={e => updateSeoField(pageKey, "description", e.target.value)}
            placeholder="Meta description for search snippets..."
            className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition resize-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Canonical URL</label>
            <input
              type="text"
              value={pageConfig.canonical || ""}
              onChange={e => updateSeoField(pageKey, "canonical", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Global Image Alt Tag</label>
            <input
              type="text"
              value={pageConfig.imageAlt || ""}
              onChange={e => updateSeoField(pageKey, "imageAlt", e.target.value)}
              placeholder="Image alt attribute..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-[#1E67E2] transition"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
                alert("SEO Settings saved successfully!");
              }}
              className="w-full px-4 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Save SEO Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  const saveSeoData = () => {
    localStorage.setItem("clarity_seo_data", JSON.stringify(seoData));
    setSeoSaveSuccess(true);
    setTimeout(() => setSeoSaveSuccess(false), 2500);
  };

  const resetSeoData = () => {
    if (confirm("Reset SEO settings for all pages to defaults?")) {
      setSeoData(DEFAULT_SEO_DATA);
      localStorage.setItem("clarity_seo_data", JSON.stringify(DEFAULT_SEO_DATA));
    }
  };

  const loadSchemaTemplate = () => {
    let schema = "";
    if (schemaTemplateType === "Organization") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Clarity InfoTech",
        "url": "https://clarityinfotech.com",
        "logo": "https://clarityinfotech.com/logo.png",
        "sameAs": [
          "https://linkedin.com/company/clarityinfotech"
        ]
      }, null, 2);
    } else if (schemaTemplateType === "LocalBusiness") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Clarity InfoTech Office",
        "image": "https://clarityinfotech.com/logo.png",
        "telephone": "9876543210",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "PO Box 200388",
          "addressLocality": "Doha",
          "addressRegion": "Doha",
          "postalCode": "200388",
          "addressCountry": "QA"
        }
      }, null, 2);
    } else if (schemaTemplateType === "Service") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Cloud DevOps & Architecture Engineering",
        "provider": {
          "@type": "Organization",
          "name": "Clarity InfoTech"
        },
        "areaServed": "Global",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Kubernetes Orchestration"
              }
            }
          ]
        }
      }, null, 2);
    } else if (schemaTemplateType === "Product") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Enterprise Telemetry Dashboard",
        "image": "https://clarityinfotech.com/logo.png",
        "description": "High-throughput real-time telemetry metrics tracker.",
        "brand": {
          "@type": "Brand",
          "name": "Clarity InfoTech"
        }
      }, null, 2);
    } else if (schemaTemplateType === "FAQ") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Clarity InfoTech handle scalability audits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our cloud teams conduct monthly infrastructure usage reviews to identify bottlenecks and configure auto-scaling thresholds."
            }
          }
        ]
      }, null, 2);
    } else if (schemaTemplateType === "Article") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Scaling Microservices with Kubernetes: Best Practices",
        "author": {
          "@type": "Person",
          "name": "Rain Corraya"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Clarity InfoTech"
        },
        "datePublished": "2026-07-30"
      }, null, 2);
    } else if (schemaTemplateType === "Event") {
      schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Clarity InfoTech Virtual DevOps Summit 2026",
        "startDate": "2026-11-15T09:00:00+05:30",
        "endDate": "2026-11-15T17:00:00+05:30",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
          "@type": "VirtualLocation",
          "url": "https://clarityinfotech.com/summit"
        },
        "organizer": {
          "@type": "Organization",
          "name": "Clarity InfoTech"
        }
      }, null, 2);
    }

    updateSeoField("schemaJson", schema);
  };

  const generateAiSeo = () => {
    const brand = "Clarity InfoTech";
    let title = "";
    let desc = "";
    let keywords = "";
    let slug = "";
    
    if (seoSelectedPage === "home") {
      title = brand + " | Enterprise Software Engineering & Cloud Solutions";
      desc = brand + " delivers premium enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems with 24/7 reliability.";
      keywords = "clarity infotech, software engineering, cloud solutions, devops, security audit, microservices";
      slug = "/";
    } else if (seoSelectedPage === "about") {
      title = "About Us | " + brand + " - Elite Software Engineering Squad";
      desc = "Learn about " + brand + "'s mission, corporate locations in India, and team of software engineers, cloud architects, and developers.";
      keywords = "about clarity, tech squads, software developers, chennai office, prince infocity";
      slug = "/about";
    } else if (seoSelectedPage === "projects") {
      title = "Our Projects & Case Studies | " + brand;
      desc = "Discover how " + brand + " architected high-throughput Kubernetes systems and achieved SOC2 compliance for legacy enterprise workloads.";
      keywords = "case studies, kubernetes migration, cloud security review, project portfolio";
      slug = "/services";
    } else if (seoSelectedPage === "services") {
      title = "Our Services | Software Architecture & DevOps | " + brand;
      desc = "Scale your business platforms with our custom software design, cloud migration, automated DevOps pipelines, and intelligent AI solutions.";
      keywords = "devops automation, bespoke software development, cloud governance, artificial intelligence";
      slug = "/our-services";
    } else if (seoSelectedPage === "contact") {
      title = "Contact Us | Reach the " + brand + " Squad";
      desc = "Get in touch with our elite developers. Speak to our team at PO Box 200388, Doha, Qatar.";
      keywords = "hire developers, contact engineering squad, doha office phone, software consultation";
      slug = "/contact";
    } else if (seoSelectedPage === "gallery") {
      title = "Gallery | " + brand + " - Media Showcase";
      desc = "Explore the visual journey of " + brand + ". Photos, event coverage, highlights, and office environment.";
      keywords = "clarity infotech gallery, photos, tech workspace, corporate showcase";
      slug = "/gallery";
    } else {
      title = seoSelectedPage.charAt(0).toUpperCase() + seoSelectedPage.slice(1) + " | " + brand;
      desc = "Read our corporate policy page and milestone agreements for " + brand + ".";
      keywords = "terms, privacy, legal pages";
      slug = "/" + seoSelectedPage + "-policy";
    }

    setSeoData(prev => ({
      ...prev,
      [seoSelectedPage]: {
        ...prev[seoSelectedPage],
        title,
        description: desc,
        keywords,
        canonical: "https://clarityinfotech.com" + slug,
        slug,
        ogTitle: title,
        ogDescription: desc,
        ogImage: "https://clarityinfotech.com/logo.png",
        ogUrl: "https://clarityinfotech.com" + slug,
        ogType: "website",
        twitterTitle: title,
        twitterDescription: desc,
        twitterImage: "https://clarityinfotech.com/logo.png",
        twitterCardType: "summary_large_image",
        imageAlt: brand + " - " + title.split("|")[0].trim(),
        imageTitle: brand + " Brand Logo"
      }
    }));
    alert("AI SEO Generation completed! Review the generated tags and click Save.");
  };

  const getSeoValidation = (pageKey) => {
    const config = seoData[pageKey] || {};
    let score = 100;
    const warnings = [];
    const recommendations = [];

    if (!config.title) {
      score -= 25;
      warnings.push("Missing SEO Title");
      recommendations.push("Add a meta title for this page (recommended length: 50-60 characters).");
    } else {
      if (config.title.length < 30) {
        score -= 8;
        warnings.push("Title is too short");
        recommendations.push("Extend title length to at least 30 characters to improve CTR.");
      }
      if (config.title.length > 60) {
        score -= 8;
        warnings.push("Title is too long");
        recommendations.push("Shorten title length below 60 characters to prevent search engine truncation.");
      }
    }

    if (!config.description) {
      score -= 25;
      warnings.push("Missing Meta Description");
      recommendations.push("Add a meta description (recommended length: 120-160 characters).");
    } else {
      if (config.description.length < 80) {
        score -= 8;
        warnings.push("Description is too short");
        recommendations.push("Extend description to at least 80 characters to describe the page accurately.");
      }
      if (config.description.length > 160) {
        score -= 8;
        warnings.push("Description is too long");
        recommendations.push("Shorten description below 160 characters to avoid snippet cutoff.");
      }
    }

    if (!config.keywords) {
      score -= 10;
      warnings.push("Missing Meta Keywords");
      recommendations.push("Add 4-8 relevant keywords separated by commas.");
    }

    if (!config.canonical) {
      score -= 15;
      warnings.push("Missing Canonical URL");
      recommendations.push("Specify a canonical URL to prevent duplicate content indexing issue.");
    } else if (!config.canonical.startsWith("https://")) {
      score -= 5;
      warnings.push("Non-HTTPS Canonical URL");
      recommendations.push("Ensure canonical URL starts with https:// for security protocols.");
    }

    if (!config.imageAlt) {
      score -= 10;
      warnings.push("Missing Image Alt Text");
      recommendations.push("Provide descriptive alt text for page assets to improve image rankings.");
    }

    if (config.schemaJson && config.schemaJson !== "{}") {
      try {
        JSON.parse(config.schemaJson);
      } catch (e) {
        score -= 15;
        warnings.push("Invalid JSON-LD Syntax");
        recommendations.push("Fix the formatting error in the JSON-LD schema config.");
      }
    } else {
      if (pageKey !== "privacy" && pageKey !== "terms" && pageKey !== "refund") {
        score -= 5;
        warnings.push("No Structured Schema");
        recommendations.push("Load a JSON-LD schema template (e.g. Service or Organization) to help crawlers understand your page structure.");
      }
    }

    score = Math.max(0, score);
    return { score, warnings, recommendations };
  };

  const generateAndDownloadSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    Object.keys(seoData).forEach((key) => {
      const page = seoData[key];
      if (page.sitemapInclude !== false) {
        xml += '  <url>\n';
        xml += '    <loc>' + (page.canonical || ('https://clarityinfotech.com' + (page.slug || '/'))) + '</loc>\n';
        xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
        xml += '    <changefreq>' + (page.sitemapFrequency || 'weekly') + '</changefreq>\n';
        xml += '    <priority>' + (page.sitemapPriority || 0.8) + '</priority>\n';
        xml += '  </url>\n';
      }
    });

    xml += '</urlset>';

    const blob = new Blob([xml], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderFormattedContent = (text) => {
    if (!text) return null;
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    return lines.map((line, idx) => {
      const cleanLine = line.trim();
      
      const renderLineContent = (str) => {
        const parts = str.split(/\*\*([^*]+)\*\*/g);
        if (parts.length === 1) return str;
        return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-slate-800">{part}</strong> : part));
      };

      if (cleanLine.startsWith("### ")) {
        const title = cleanLine.substring(4);
        return <h3 key={idx} className="text-sm font-bold text-slate-800 mt-4 mb-1.5 font-sans">{renderLineContent(title)}</h3>;
      }
      if (cleanLine.startsWith("## ")) {
        const title = cleanLine.substring(3);
        return <h2 key={idx} className="text-base font-extrabold text-slate-800 mt-5 mb-2 font-sans">{renderLineContent(title)}</h2>;
      }
      if (cleanLine.startsWith("# ")) {
        const title = cleanLine.substring(2);
        return <h1 key={idx} className="text-lg font-black text-slate-900 mt-6 mb-2.5 font-sans">{renderLineContent(title)}</h1>;
      }
      if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
        const clean = cleanLine.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc list-inside mb-1.5 text-slate-650 text-xs font-sans pl-1">
            {renderLineContent(clean)}
          </li>
        );
      }
      if (cleanLine === "") {
        return <div key={idx} className="h-1.5" />;
      }
      if (cleanLine.startsWith("**") && cleanLine.endsWith("**")) {
        const clean = cleanLine.replace(/\*\*/g, "");
        return <p key={idx} className="text-xs font-bold text-slate-800 mt-3 mb-1.5 font-sans">{clean}</p>;
      }
      return (
        <p key={idx} className="text-xs text-slate-650 leading-relaxed mb-2 font-sans">
          {renderLineContent(line.replace(/\r/g, ""))}
        </p>
      );
    });
  };

  const getTabTitle = (tab) => {
    const titles = {
      "overview": "Dashboard Overview",
      "inquiries": "Inquiries Inbox",
      "hero-slides": "Hero Section",
      "about-us": "About Section",
      "services": "Projects",
      "platforms": "Work Culture",
      "faq": "Contact Us Page",
      "header-links": "Header Logo & Links",
      "footer": "Website Footer",
      "legal-pages": "Legal Pages",
      "page-about": "About Page",
      "page-projects": "Our Projects",
      "page-service": "Our Service",
      "page-gallery": "Gallery Page",
      "page-legal": "Legal Pages",
      "system-config": "System Configuration"
    };
    return titles[tab] || tab.replace("-", " ");
  };

  if (verifyingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw size={36} className="animate-spin text-slate-700" />
          <span className="text-sm font-semibold tracking-wider uppercase text-slate-500">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Soft Neutral Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-300/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-6 flex justify-center">
              <img src="/logo.png" alt="Clarity Logo" className="h-20 w-auto object-contain max-w-[260px]" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Console</h2>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">Please sign in to manage your site configuration</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Username</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
                placeholder="admin"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Password</label>
              <div className="relative">
                <input 
                  type={showAdminPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition flex items-center justify-center cursor-pointer"
                >
                  {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl p-3.5 flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition shadow-lg shadow-slate-900/10 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loggingIn ? <RefreshCw size={14} className="animate-spin text-white" /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased flex">

      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 min-h-screen sticky top-0">
        {/* Brand/Logo */}
        <div className="px-6 border-b border-slate-100 flex items-center justify-between h-[76px]">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Clarity InfoTech Logo"
              className="h-11 w-auto object-contain scale-105"
            />
          </a>
        </div>

                {/* Sidebar Nav links */}
        <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto">
          {/* Analytics Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Analytics</span>
            <div className="space-y-1">
              {[
                { id: "overview", label: "Dashboard", icon: Activity },
                { id: "inquiries", label: "Inquiries Inbox", icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Content</span>
            <div className="space-y-1">
              {[
                { id: "hero-slides", label: "Hero Section", icon: Image },
                { id: "about-us", label: "About Section", icon: Shield },
                { id: "services", label: "Projects", icon: Briefcase },
                { id: "platforms", label: "Work Culture", icon: Layers },
                { id: "faq", label: "Contact Us Page", icon: MessageSquare },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customization Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">Customization</span>
            <div className="space-y-1">
              {[
                { id: "header-links", label: "Header Logo & Links", icon: Link },
                { id: "footer", label: "Website Footer", icon: Globe },
                { id: "legal-pages", label: "Legal Pages", icon: Shield },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <details className="group">
                <summary className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer text-slate-500 hover:bg-slate-50 hover:text-slate-800 list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Pages</span>
                  </div>
                  <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-9 pr-3 py-1 space-y-1">
                  {[
                    { id: "page-about", label: "About Page", icon: FileText },
                    { id: "page-projects", label: "Our Projects", icon: Briefcase },
                    { id: "page-service", label: "Our Service", icon: Layers },
                    { id: "page-gallery", label: "Gallery Page", icon: Image },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                          }`}
                      >
                        <Icon size={14} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>

          {/* System Group */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-3 mb-3">System</span>
            <div className="space-y-1">
              {[
                { id: "system-config", label: "System Configuration", icon: Settings },
                { id: "seo-management", label: "SEO Management", icon: Search },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="px-4 py-2 border-t border-slate-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Bottom Sidebar Copyright */}
        <div className="p-4 border-t border-slate-50">
          <span className="text-[10px] font-medium text-slate-400">Copyright © 2026</span>
          <p className="text-[11px] font-bold text-slate-600">Clarity InfoTech Console</p>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">

        {/* Top Header Panel */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-6 flex items-center justify-between shadow-sm shadow-slate-100/10 h-[76px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-blue-50/50 text-[#1E67E2] rounded-full px-3 py-1 text-xs font-semibold border border-blue-100/50">
                <Settings size={12} />
                <span>Admin Console</span>
                <span className="text-blue-300">/</span>
                <span>{getTabTitle(activeTab)}</span>
              </div>
            </div>
          </div>
           <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-violet-600/20">
                AU
              </div>
              <span className="text-xs font-bold text-slate-700 hidden sm:inline-block">Admin User</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="border-l-4 border-[#1E67E2] pl-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                {activeTab === "overview" ? "Home" : "Edit Section"}
              </span>
              <h1 className="text-2xl font-black text-[#0A0E39] tracking-tight">
                {getTabTitle(activeTab)}
              </h1>
            </div>
            {activeTab === "overview" && (
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-500/10 cursor-pointer">
                <Plus size={14} /> Create Automation
              </button>
            )}
          </div>

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
                <div className="space-y-6">

                  {/* My Automation Analytics Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-[#0A0E39] text-base">My Automation Analytics</h3>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl px-3 py-1.5 text-xs font-medium">
                        <Clock size={13} />
                        <span>07/01/2026 - 07/28/2026</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: "All Time", value: projects.length, label: "Active Projects Showcased", icon: FileText, bg: "bg-blue-50/50 border-blue-100/50 text-blue-600" },
                        { title: "Sent Emails", value: inquiries.length, label: "Open Contact Inquiries", icon: Mail, bg: "bg-purple-50/50 border-purple-100/50 text-purple-600" },
                        { title: "Open Rate", value: inquiries.filter(i => i.status === "Resolved").length, label: "Resolved Lead Messages", icon: CheckCircle, bg: "bg-green-50/50 border-green-100/50 text-green-600" },
                        { title: "Click Rate", value: inquiries.filter(i => i.status === "In Progress").length, label: "Active Lead Inquiries", icon: Clock, bg: "bg-orange-50/50 border-orange-100/50 text-orange-600" }
                      ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                          <div key={idx} className={`p-5 rounded-2xl border ${stat.bg} flex flex-col justify-between h-32`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                <Icon size={14} className="text-slate-600" />
                              </div>
                            </div>
                            <div>
                              <div className="text-3xl font-black text-slate-800 leading-none mb-1">{stat.value}</div>
                              <div className="text-[11px] font-medium text-slate-400">{stat.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">Connect Email Outreach</h4>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                          Connect your account inquiries to our outreach deliverability tools and respond to customer questions instantly.
                        </p>
                      </div>
                      <button className="w-full py-2.5 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-50 transition cursor-pointer">
                        Connect Email
                      </button>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base">Create a new Automation</h4>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                          Use our automation and project showcase builder to publish innovative digital solutions and capture warm leads.
                        </p>
                      </div>
                      <button onClick={() => setActiveTab("services")} className="w-full py-2.5 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-50 transition cursor-pointer">
                        Create Automation
                      </button>
                    </div>
                  </div>                  {/* Charts Area */}
                  <div className="grid lg:grid-cols-12 gap-8 mt-6">
                    {/* Traffic Graph (8 cols) */}
                    <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                      <h3 className="text-base font-bold text-slate-800 tracking-tight mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-[#1E67E2]" />
                        <span>Weekly Traffic Metrics (Requests/Min)</span>
                      </h3>
                      <div className="h-64 flex items-end justify-between relative mt-8 pr-2">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-0 border-t border-slate-100 h-0" />
                        <div className="absolute inset-x-0 top-1/4 border-t border-slate-100 h-0" />
                        <div className="absolute inset-x-0 top-2/4 border-t border-slate-100 h-0" />
                        <div className="absolute inset-x-0 top-3/4 border-t border-slate-100 h-0" />

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
                            <span className="text-[10px] text-blue-600 font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {item.val} req
                            </span>
                            <div
                              className="w-10 sm:w-12 bg-gradient-to-t from-[#1E67E2] via-blue-400 to-sky-400 rounded-t-lg transition-all duration-500 ease-out"
                              style={{ height: `${(item.val / 1100) * 160}px` }}
                            />
                            <span className="text-[11px] text-slate-400 mt-2 font-medium">{item.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Categories Breakdown (4 cols) */}
                    <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                      <h3 className="text-base font-bold text-slate-800 tracking-tight mb-4 flex items-center gap-2">
                        <Shield size={18} className="text-[#1E67E2]" />
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
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                              <span>{sec.label}</span>
                              <span>{sec.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${sec.color} rounded-full`} style={{ width: `${sec.percent}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  
                  </div>
                  {renderQuickSeoCard("home", "general")}
                </div>
              )}

              {/* PAGE ABOUT EDITOR */}
              {activeTab === "page-about" && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="text-[#1E67E2]" size={24} />
                        About Page Content
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage all the text content, sections, and values for the main About Us page.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetPageAbout} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={savePageAbout} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {pageAboutSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {pageAboutSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* HERO SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Hero Section</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Small Badge</label>
                        <input type="text" value={pageAboutData.heroBadge || ""} onChange={e => updatePageAboutField("heroBadge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Title</label>
                        <input type="text" value={pageAboutData.heroTitle || ""} onChange={e => updatePageAboutField("heroTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Subtitle</label>
                        <input type="text" value={pageAboutData.heroSubtitle || ""} onChange={e => updatePageAboutField("heroSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* NARRATIVE SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Narrative Section</h3>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">About Title</label>
                      <input type="text" value={pageAboutData.aboutTitle || ""} onChange={e => updatePageAboutField("aboutTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Paragraph 1</label>
                      <textarea value={pageAboutData.aboutParagraph1 || ""} onChange={e => updatePageAboutField("aboutParagraph1", e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl p-3.5 outline-none focus:border-[#1E67E2] transition resize-none"></textarea>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Paragraph 2</label>
                      <textarea value={pageAboutData.aboutParagraph2 || ""} onChange={e => updatePageAboutField("aboutParagraph2", e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl p-3.5 outline-none focus:border-[#1E67E2] transition resize-none"></textarea>
                    </div>
                  </div>

                  {/* VALUES SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Our Values</h3>
                      <button onClick={addPageAboutCard} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E67E2] rounded-xl text-xs font-bold transition cursor-pointer">
                        <Plus size={13} /> Add Value Card
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Pill Text</label>
                        <input type="text" value={pageAboutData.valuesPill || ""} onChange={e => updatePageAboutField("valuesPill", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Values Title</label>
                        <input type="text" value={pageAboutData.valuesTitle || ""} onChange={e => updatePageAboutField("valuesTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Values Subtitle</label>
                        <input type="text" value={pageAboutData.valuesSubtitle || ""} onChange={e => updatePageAboutField("valuesSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Background Image URL</label>
                        <input type="text" value={pageAboutData.valuesBgImage || ""} onChange={e => updatePageAboutField("valuesBgImage", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" placeholder="/office-bg.jpg" />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                      {(pageAboutData.valuesCards || []).map((card, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 relative">
                          <button onClick={() => deletePageAboutCard(i)} className="absolute top-3 right-3 p-1.5 bg-white text-red-400 hover:text-red-500 rounded-lg border border-slate-200 shadow-sm transition cursor-pointer"><Trash2 size={14} /></button>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pr-8">
                            <div><label className="text-xs text-slate-500 font-semibold block mb-1">Step (e.g. 01)</label><input type="text" value={card.step} onChange={e => updatePageAboutCard(i, "step", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" /></div>
                            <div><label className="text-xs text-slate-500 font-semibold block mb-1">Title</label><input type="text" value={card.title} onChange={e => updatePageAboutCard(i, "title", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" /></div>
                            <div><label className="text-xs text-slate-500 font-semibold block mb-1">Tag</label><input type="text" value={card.tag} onChange={e => updatePageAboutCard(i, "tag", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" /></div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Icon</label>
                              <input
                                type="text"
                                value={card.icon}
                                onChange={e => updatePageAboutCard(i, "icon", e.target.value)}
                                className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Image URL (Optional)</label>
                              <input
                                type="text"
                                value={card.image || ""}
                                placeholder="/card-image.jpg"
                                onChange={e => updatePageAboutCard(i, "image", e.target.value)}
                                className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-semibold block mb-1">Description</label>
                            <input type="text" value={card.desc} onChange={e => updatePageAboutCard(i, "desc", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-600 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* APPROACH SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Approach Section</h3>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Approach Title</label>
                      <input type="text" value={pageAboutData.approachTitle || ""} onChange={e => updatePageAboutField("approachTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Paragraph 1</label>
                      <textarea value={pageAboutData.approachParagraph1 || ""} onChange={e => updatePageAboutField("approachParagraph1", e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl p-3.5 outline-none focus:border-[#1E67E2] transition resize-none"></textarea>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Paragraph 2</label>
                      <textarea value={pageAboutData.approachParagraph2 || ""} onChange={e => updatePageAboutField("approachParagraph2", e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl p-3.5 outline-none focus:border-[#1E67E2] transition resize-none"></textarea>
                    </div>
                  </div>

                  {/* WHY CHOOSE US SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Why Choose Us List</h3>
                      <button onClick={addPageAboutWhyList} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E67E2] rounded-xl text-xs font-bold transition cursor-pointer">
                        <Plus size={13} /> Add Item
                      </button>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Title</label>
                      <input type="text" value={pageAboutData.whyChooseTitle || ""} onChange={e => updatePageAboutField("whyChooseTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                    </div>
                    <div className="space-y-2.5 mt-4">
                      {(pageAboutData.whyChooseList || []).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="text" value={item} onChange={e => updatePageAboutWhyList(i, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2 outline-none focus:border-[#1E67E2] transition" />
                          <button onClick={() => deletePageAboutWhyList(i)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl border border-red-100 transition cursor-pointer"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  
                  </div>
                  {renderQuickSeoCard("about", "page_about")}
                </div>
              )}

              {/* OUR PROJECTS PAGE EDITOR */}
              {activeTab === "page-projects" && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Briefcase className="text-[#1E67E2]" size={24} />
                        Our Projects Page Content
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage all projects, showcase cards, categories, agile workflow steps, and CTA banner for the Our Projects page.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetPageProjects} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={savePageProjects} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {pageProjectsSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {pageProjectsSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* HERO HEADER SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Hero Header Section</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Page Title</label>
                        <input type="text" value={pageProjectsData.heroTitle || ""} onChange={e => updatePageProjectsField("heroTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Page Subtitle</label>
                        <input type="text" value={pageProjectsData.heroSubtitle || ""} onChange={e => updatePageProjectsField("heroSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* PROJECTS SHOWCASE CARDS */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Projects Showcase Cards</h3>
                        <p className="text-xs text-slate-400 mt-1">Manage project cards shown on the Our Projects grid showcase.</p>
                      </div>
                      <button onClick={addProjectCard} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E67E2] rounded-xl text-xs font-bold transition cursor-pointer">
                        <Plus size={13} /> Add Project Card
                      </button>
                    </div>

                    <div className="space-y-6 mt-4">
                      {(pageProjectsData.projectsList || []).map((card, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 relative">
                          <button onClick={() => deleteProjectCard(i)} className="absolute top-4 right-4 p-2 bg-white text-red-400 hover:text-red-500 rounded-xl border border-slate-200 shadow-sm transition cursor-pointer"><Trash2 size={14} /></button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-10">
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Project Title</label>
                              <input type="text" value={card.title} onChange={e => updateProjectCard(i, "title", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Category Filter</label>
                              <select value={card.category} onChange={e => updateProjectCard(i, "category", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2 outline-none focus:border-[#1E67E2] transition">
                                <option value="cloud">Cloud & DevOps (cloud)</option>
                                <option value="development">Software & Mobile (development)</option>
                                <option value="security">Cyber Security (security)</option>
                                <option value="ai">AI & Analytics (ai)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Badge Text</label>
                              <input type="text" value={card.badge} onChange={e => updateProjectCard(i, "badge", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Description</label>
                              <input type="text" value={card.description} onChange={e => updateProjectCard(i, "description", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Media Path (Image or Video)</label>
                              <div className="flex items-center gap-2">
                                <input type="text" value={card.media} onChange={e => updateProjectCard(i, "media", e.target.value)} placeholder="/service.mp4 or URL" className="flex-1 bg-white border border-slate-200 text-xs font-mono text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" />
                                <label className="px-2.5 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border border-indigo-200 flex items-center gap-1">
                                  <Video size={13} /> Upload
                                  <input type="file" accept="video/*,image/*" onChange={e => handleProjectMediaUpload(i, e)} className="hidden" />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                              <input type="checkbox" checked={card.isVideo || false} onChange={e => updateProjectCard(i, "isVideo", e.target.checked)} className="rounded border-slate-300 text-[#1E67E2] focus:ring-[#1E67E2]" />
                              <span>Is Video File</span>
                            </label>
                          </div>

                          {/* LIVE MEDIA / VIDEO PREVIEW DISPLAY */}
                          {card.media && (
                            <div className="flex items-center gap-4 p-3 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md">
                              <div className="w-40 h-24 rounded-xl overflow-hidden bg-black shrink-0 relative border border-slate-700">
                                {(card.isVideo || (card.media && (card.media.endsWith(".mp4") || card.media.endsWith(".webm")))) ? (
                                  <video
                                    src={card.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                ) : (
                                  <img
                                    src={card.media}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                                  {(card.isVideo || (card.media && (card.media.endsWith(".mp4") || card.media.endsWith(".webm")))) ? "🎥 Live Video" : "🖼️ Image"}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-widest block">Admin Live Video Preview</span>
                                <h4 className="text-sm font-bold text-white truncate mt-0.5">{card.title}</h4>
                                <p className="text-xs font-mono text-slate-400 truncate mt-1">{card.media}</p>
                              </div>
                            </div>
                          )}

                          {/* Features list for this card */}
                          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-600">Feature Bullet Points</span>
                              <button onClick={() => addProjectFeature(i)} className="text-[11px] font-bold text-[#1E67E2] hover:underline flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add Feature</button>
                            </div>
                            <div className="space-y-2">
                              {(card.features || []).map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-2">
                                  <input type="text" value={feat} onChange={e => updateProjectFeature(i, fIdx, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                                  <button onClick={() => deleteProjectFeature(i, fIdx)} className="p-1.5 text-red-400 hover:text-red-500 rounded transition cursor-pointer"><Trash2 size={13} /></button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AGILE WORKFLOW SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Agile Workflow Section</h3>
                      <button onClick={addWorkflowStep} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E67E2] rounded-xl text-xs font-bold transition cursor-pointer">
                        <Plus size={13} /> Add Workflow Step
                      </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Badge Text</label>
                        <input type="text" value={pageProjectsData.workflowBadge || ""} onChange={e => updatePageProjectsField("workflowBadge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Title</label>
                        <input type="text" value={pageProjectsData.workflowTitle || ""} onChange={e => updatePageProjectsField("workflowTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Subtitle</label>
                        <input type="text" value={pageProjectsData.workflowSubtitle || ""} onChange={e => updatePageProjectsField("workflowSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>

                    <div className="space-y-4 mt-4">
                      {(pageProjectsData.workflowSteps || []).map((step, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 relative">
                          <button onClick={() => deleteWorkflowStep(i)} className="absolute top-3 right-3 p-1.5 bg-white text-red-400 hover:text-red-500 rounded-lg border border-slate-200 shadow-sm transition cursor-pointer"><Trash2 size={14} /></button>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pr-8">
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Step Number (e.g. 01)</label>
                              <input type="text" value={step.step} onChange={e => updateWorkflowStep(i, "step", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                            <div className="md:col-span-3">
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Step Title</label>
                              <input type="text" value={step.title} onChange={e => updateWorkflowStep(i, "title", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-semibold block mb-1">Step Description</label>
                            <input type="text" value={step.desc} onChange={e => updateWorkflowStep(i, "desc", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM CALL-TO-ACTION SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Bottom Call-to-Action Banner</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Banner Title</label>
                        <input type="text" value={pageProjectsData.ctaTitle || ""} onChange={e => updatePageProjectsField("ctaTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Banner Subtitle</label>
                        <input type="text" value={pageProjectsData.ctaSubtitle || ""} onChange={e => updatePageProjectsField("ctaSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Button Label</label>
                        <input type="text" value={pageProjectsData.ctaButtonText || ""} onChange={e => updatePageProjectsField("ctaButtonText", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  
                  </div>
                  {renderQuickSeoCard("projects", "page_projects")}
                </div>
              )}

              {/* OUR SERVICE PAGE EDITOR */}
              {activeTab === "page-service" && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Layers className="text-[#1E67E2]" size={24} />
                        Our Service Page Content
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage all hero titles, core values, service cards, culture pillars, global stats, and CTA banner for Our Service page.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetPageService} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={savePageService} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {pageServiceSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {pageServiceSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* HERO HEADER SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Hero Header Section</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Small Badge</label>
                        <input type="text" value={pageServiceData.heroBadge || ""} onChange={e => updatePageServiceField("heroBadge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Title</label>
                        <input type="text" value={pageServiceData.heroTitle || ""} onChange={e => updatePageServiceField("heroTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Subtitle</label>
                        <input type="text" value={pageServiceData.heroSubtitle || ""} onChange={e => updatePageServiceField("heroSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 1: BUILDING FUTURE-READY TEAMS */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Section 1: Future-Ready Teams Overview</h3>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Title</label>
                      <input type="text" value={pageServiceData.sec1Title || ""} onChange={e => updatePageServiceField("sec1Title", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Paragraph / Description</label>
                      <textarea value={pageServiceData.sec1Description || ""} onChange={e => updatePageServiceField("sec1Description", e.target.value)} rows={3} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl p-3.5 outline-none focus:border-[#1E67E2] transition resize-none"></textarea>
                    </div>

                    {/* Core Values List */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">Left Column: Core Value Items</span>
                        <button onClick={addCoreValue} className="text-xs font-bold text-[#1E67E2] hover:underline flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add Value Item</button>
                      </div>
                      <div className="space-y-3">
                        {(pageServiceData.coreValues || []).map((val, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 relative">
                            <button onClick={() => deleteCoreValue(i)} className="absolute top-3 right-3 p-1.5 bg-white text-red-400 hover:text-red-500 rounded-lg border border-slate-200 shadow-sm transition cursor-pointer"><Trash2 size={14} /></button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Title</label>
                                <input type="text" value={val.title} onChange={e => updateCoreValue(i, "title", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Icon</label>
                                <select value={val.icon} onChange={e => updateCoreValue(i, "icon", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-1.5 outline-none focus:border-[#1E67E2] transition">
                                  <option value="Lightbulb">Lightbulb</option>
                                  <option value="Users">Users / Team</option>
                                  <option value="TrendingUp">TrendingUp / Growth</option>
                                  <option value="Star">Star</option>
                                  <option value="Globe">Globe</option>
                                </select>
                              </div>
                              <div className="md:col-span-3">
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Description</label>
                                <input type="text" value={val.desc} onChange={e => updateCoreValue(i, "desc", e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-xl px-3 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column Service Cards Grid */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">Right Column: Services Grid Pills</span>
                        <button onClick={addServiceCardItem} className="text-xs font-bold text-[#1E67E2] hover:underline flex items-center gap-1 cursor-pointer"><Plus size={12} /> Add Service Card</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {(pageServiceData.serviceCards || []).map((card, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2 relative">
                            <button onClick={() => deleteServiceCardItem(i)} className="absolute top-3 right-3 p-1.5 bg-white text-red-400 hover:text-red-500 rounded-lg border border-slate-200 shadow-sm transition cursor-pointer"><Trash2 size={14} /></button>
                            <div className="pr-8 space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-xs text-slate-500 font-semibold block mb-1">Title</label>
                                  <input type="text" value={card.title} onChange={e => updateServiceCardItem(i, "title", e.target.value)} className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                                </div>
                                <div>
                                  <label className="text-xs text-slate-500 font-semibold block mb-1">Icon</label>
                                  <input
                                    type="text"
                                    value={card.icon}
                                    onChange={e => updateServiceCardItem(i, "icon", e.target.value)}
                                    placeholder="Lucide icon name (e.g. Code2, Cloud, Cpu)"
                                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Description</label>
                                <input type="text" value={card.desc} onChange={e => updateServiceCardItem(i, "desc", e.target.value)} className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: CULTURE & TEAM IMPACT */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Section 2: Culture & Team Impact Radar</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Badge Text</label>
                        <input type="text" value={pageServiceData.sec2Badge || ""} onChange={e => updatePageServiceField("sec2Badge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Title</label>
                        <input type="text" value={pageServiceData.sec2Title || ""} onChange={e => updatePageServiceField("sec2Title", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Section Subtitle</label>
                        <input type="text" value={pageServiceData.sec2Subtitle || ""} onChange={e => updatePageServiceField("sec2Subtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>

                    {/* Circle Nodes 6 Pillars */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold text-slate-700 block">Radar 6 Pillar Nodes</span>
                      <div className="grid md:grid-cols-2 gap-3">
                        {(pageServiceData.circleNodes || []).map((node, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Pillar Label</label>
                                <input type="text" value={node.label} onChange={e => updateCircleNodeItem(i, "label", e.target.value)} className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500 font-semibold block mb-1">Icon</label>
                                <select value={node.icon} onChange={e => updateCircleNodeItem(i, "icon", e.target.value)} className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition">
                                  <option value="Zap">Zap (Innovation)</option>
                                  <option value="Star">Star (Excellence)</option>
                                  <option value="Heart">Heart (Wellness)</option>
                                  <option value="BookOpen">BookOpen (Learning)</option>
                                  <option value="Handshake">Handshake (Collaboration)</option>
                                  <option value="TrendingUp">TrendingUp (Growth)</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold block mb-1">Description</label>
                              <input type="text" value={node.desc} onChange={e => updateCircleNodeItem(i, "desc", e.target.value)} className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] transition" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: GLOBAL IMPACT & STATS was removed from frontend UI */}
                  {renderQuickSeoCard("services", "page_service")}
                </div>
              )}

              {/* GALLERY PAGE EDITOR */}
              {(activeTab === "gallery" || activeTab === "page-gallery") && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Image className="text-[#1E67E2]" size={24} />
                        Gallery Page Content & Showcase
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage titles, subheadings, and full photo/media items in the infinite marquee gallery showcase.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetPageGallery} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={savePageGallery} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {pageGallerySaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {pageGallerySaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* HERO SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Hero Section Header</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Small Badge</label>
                        <input type="text" value={(pageGalleryData || {}).heroBadge || ""} onChange={e => updatePageGalleryField("heroBadge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Page Title</label>
                        <input type="text" value={(pageGalleryData || {}).heroTitle || ""} onChange={e => updatePageGalleryField("heroTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Subtitle</label>
                        <input type="text" value={(pageGalleryData || {}).heroSubtitle || ""} onChange={e => updatePageGalleryField("heroSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* GALLERY IMAGES MANAGEMENT was removed from frontend UI */}
                  {/* BOTTOM CTA BANNER */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Bottom Call-to-Action Banner</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">CTA Heading</label>
                        <input type="text" value={(pageGalleryData || {}).bottomCtaTitle || ""} onChange={e => updatePageGalleryField("bottomCtaTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">CTA Subtitle</label>
                        <input type="text" value={(pageGalleryData || {}).bottomCtaSubtitle || ""} onChange={e => updatePageGalleryField("bottomCtaSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Button Label</label>
                        <input type="text" value={(pageGalleryData || {}).bottomCtaButtonText || ""} onChange={e => updatePageGalleryField("bottomCtaButtonText", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Button Link</label>
                        <input type="text" value={(pageGalleryData || {}).bottomCtaButtonLink || ""} onChange={e => updatePageGalleryField("bottomCtaButtonLink", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* VIDEO POSTS MANAGEMENT */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2">
                        <Video size={14} /> Video Posts Management ({(galleryVideos || []).length})
                      </h3>
                      <button onClick={addGalleryVideo} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#1E67E2] rounded-xl text-xs font-bold transition cursor-pointer">
                        <Plus size={13} /> Add Video Post
                      </button>
                    </div>

                    {(galleryVideos || []).length === 0 && (
                      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
                        <Video size={36} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-semibold text-slate-500">No video posts yet</p>
                        <p className="text-xs text-slate-400 mt-1">Click "Add Video Post" to add YouTube, local, or other video links</p>
                      </div>
                    )}

                    <div className="space-y-5">
                      {(galleryVideos || []).map((vid, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                          {/* Header row */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Video #{i + 1}</span>
                            <button onClick={() => deleteGalleryVideo(i)} className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg border border-red-100 transition cursor-pointer"><Trash2 size={14} /></button>
                          </div>

                          {/* Title */}
                          <div>
                            <label className="text-xs text-slate-500 font-semibold block mb-1">Video Title</label>
                            <input type="text" value={vid.title} onChange={e => updateGalleryVideo(i, "title", e.target.value)} placeholder="Enter video title..." className="w-full bg-white border border-slate-200 text-sm font-semibold text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                          </div>

                          {/* Section 1: Video URL */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                            <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><LinkIcon size={12} /> Section 1: Video URL (YouTube, Instagram, Facebook, or Local)</p>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={vid.url}
                                onChange={e => updateGalleryVideo(i, "url", e.target.value)}
                                placeholder="e.g. https://www.youtube.com/embed/... or /uploads/video.mp4"
                                className="flex-1 bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition"
                              />
                            </div>
                          </div>

                          {/* Section 2: Thumbnail Upload */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                            <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><Image size={12} /> Section 2: Thumbnail Upload</p>
                            <div className="flex items-center gap-3">
                              <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                {vid.thumbnail ? (
                                  <img src={vid.thumbnail} alt="thumb" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center"><Image size={20} className="text-slate-300" /></div>
                                )}
                              </div>
                              <div className="flex-1 space-y-2">
                                <input
                                  type="text"
                                  value={vid.thumbnail}
                                  onChange={e => updateGalleryVideo(i, "thumbnail", e.target.value)}
                                  placeholder="Or paste image URL instead"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-[#1E67E2] transition"
                                />
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition cursor-pointer border border-indigo-200">
                                  <Upload size={12} /> Upload Thumbnail
                                  <input type="file" accept="image/*" onChange={e => handleGalleryVideoThumbnailUpload(i, e)} className="hidden" />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Section 3: Local Video Upload */}
                          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                            <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5"><Video size={12} /> Section 3: Local Video Upload</p>
                            <div className="flex items-center gap-3">
                              <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0 flex items-center justify-center">
                                {vid.url && (vid.isLocal || vid.url.endsWith(".mp4") || vid.url.endsWith(".webm")) ? (
                                  <video src={vid.url} className="w-full h-full object-cover" muted />
                                ) : (
                                  <Video size={20} className="text-slate-500" />
                                )}
                              </div>
                              <div className="flex-1 space-y-2">
                                <p className="text-[11px] text-slate-500">{vid.url && (vid.isLocal || vid.url.endsWith(".mp4")) ? <span className="text-emerald-600 font-bold">✓ Local video uploaded</span> : "No local video selected"}</p>
                                <p className="text-[10px] text-slate-400">Accepted: MP4, WEBM, MOV • Max 50MB</p>
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition cursor-pointer">
                                  <Upload size={12} /> Upload Video File
                                  <input type="file" accept="video/*" onChange={e => handleGalleryVideoFileUpload(i, e)} className="hidden" />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Live Preview */}
                          {vid.url && (
                            <div className="bg-slate-900 rounded-xl p-3 flex items-center gap-3 border border-slate-800">
                              <div className="w-24 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-slate-700 relative">
                                {vid.thumbnail ? (
                                  <img src={vid.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                                ) : (vid.url.endsWith(".mp4") || vid.url.endsWith(".webm")) ? (
                                  <video src={vid.url} muted className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-slate-800 flex items-center justify-center"><Video size={18} className="text-slate-400" /></div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30"><div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center"><span className="text-black text-[10px] font-bold ml-0.5">▶</span></div></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-widest block">Live Preview</span>
                                <p className="text-xs font-bold text-white truncate mt-0.5">{vid.title}</p>
                                <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{vid.url}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {galleryVideos.length > 0 && (
                      <div className="flex justify-end pt-2">
                        <button onClick={saveGalleryVideos} className="flex items-center gap-2 px-5 py-2.5 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition cursor-pointer">
                          {pageGallerySaveSuccess ? <Check size={15} /> : <Save size={15} />}
                          {pageGallerySaveSuccess ? "Saved!" : "Save Video Posts"}
                        </button>
                      </div>
                    )}
                  </div>

                  {renderQuickSeoCard("gallery", "page_gallery")}
                </div>
              )}


              {/* CONTACT US PAGE EDITOR */}
              {(activeTab === "faq" || activeTab === "contact") && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare className="text-[#1E67E2]" size={24} />
                        Contact Us Page Content
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage hero header, contact form title, head office address, phone, email, and Google Maps embed URL for the Contact page.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetPageContact} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={savePageContact} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {pageContactSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {pageContactSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* HERO HEADER SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Hero Header Section</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Small Badge</label>
                        <input type="text" value={pageContactData.heroBadge || ""} onChange={e => updatePageContactField("heroBadge", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Title</label>
                        <input type="text" value={pageContactData.heroTitle || ""} onChange={e => updatePageContactField("heroTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Hero Subtitle</label>
                        <input type="text" value={pageContactData.heroSubtitle || ""} onChange={e => updatePageContactField("heroSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* FORM HEADER SECTION */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Contact Form Heading</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title Prefix (e.g. Send Us a)</label>
                        <input type="text" value={pageContactData.formTitlePrefix || ""} onChange={e => updatePageContactField("formTitlePrefix", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title Highlight Word (e.g. Message)</label>
                        <input type="text" value={pageContactData.formTitleHighlight || ""} onChange={e => updatePageContactField("formTitleHighlight", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                  </div>

                  {/* HEAD OFFICE & MAP DETAILS */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> Head Office & Google Map Location</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Office Section Title</label>
                        <input type="text" value={pageContactData.officeTitle || ""} onChange={e => updatePageContactField("officeTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Address</label>
                        <input type="text" value={pageContactData.officeAddress || ""} onChange={e => updatePageContactField("officeAddress", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Phone Number</label>
                        <input type="text" value={pageContactData.officePhone || ""} onChange={e => updatePageContactField("officePhone", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Email Address</label>
                        <input type="text" value={pageContactData.officeEmail || ""} onChange={e => updatePageContactField("officeEmail", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Google Maps Embed iframe URL</label>
                      <input type="text" value={pageContactData.mapEmbedUrl || ""} onChange={e => updatePageContactField("mapEmbedUrl", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                    </div>
                  
                  </div>
                  {renderQuickSeoCard("contact", "general")}
                </div>
              )}

              {/* LEGAL PAGES EDITOR */}
              {(activeTab === "legal-pages" || activeTab === "page-legal") && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield className="text-[#1E67E2]" size={24} />
                        Legal & Compliance Pages Content
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage titles, subtitles, and content for Privacy Policy, Terms of Service, and Refund Policy.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetLegalPages} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={saveLegalPages} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {legalPagesSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {legalPagesSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* 1. PRIVACY POLICY */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> 1. Privacy Policy Page</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title</label>
                        <input type="text" value={legalPagesData.privacyTitle || ""} onChange={e => updateLegalPagesField("privacyTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Last Updated Subtitle</label>
                        <input type="text" value={legalPagesData.privacySubtitle || ""} onChange={e => updateLegalPagesField("privacySubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Page Content</label>
                        <textarea rows={10} value={legalPagesData.privacyContent || ""} onChange={e => updateLegalPagesField("privacyContent", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition font-sans whitespace-pre-wrap" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Live Formatted Preview</label>
                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 h-[240px] overflow-y-auto prose prose-slate max-w-none text-slate-650 text-xs leading-relaxed font-sans shadow-inner">
                          {renderFormattedContent(legalPagesData.privacyContent)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. TERMS AND CONDITIONS */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> 2. Terms and Conditions Page</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title</label>
                        <input type="text" value={legalPagesData.termsTitle || ""} onChange={e => updateLegalPagesField("termsTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Last Updated Subtitle</label>
                        <input type="text" value={legalPagesData.termsSubtitle || ""} onChange={e => updateLegalPagesField("termsSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Page Content</label>
                        <textarea rows={10} value={legalPagesData.termsContent || ""} onChange={e => updateLegalPagesField("termsContent", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition font-sans whitespace-pre-wrap" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Live Formatted Preview</label>
                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 h-[240px] overflow-y-auto prose prose-slate max-w-none text-slate-650 text-xs leading-relaxed font-sans shadow-inner">
                          {renderFormattedContent(legalPagesData.termsContent)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. REFUND POLICY */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2"><Edit3 size={14} /> 3. Refund Policy Page</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title</label>
                        <input type="text" value={legalPagesData.refundTitle || ""} onChange={e => updateLegalPagesField("refundTitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Last Updated Subtitle</label>
                        <input type="text" value={legalPagesData.refundSubtitle || ""} onChange={e => updateLegalPagesField("refundSubtitle", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition" />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Page Content</label>
                        <textarea rows={10} value={legalPagesData.refundContent || ""} onChange={e => updateLegalPagesField("refundContent", e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition font-sans whitespace-pre-wrap" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Live Formatted Preview</label>
                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 h-[240px] overflow-y-auto prose prose-slate max-w-none text-slate-650 text-xs leading-relaxed font-sans shadow-inner">
                          {renderFormattedContent(legalPagesData.refundContent)}
                        </div>
                      </div>
                    </div>
                  
                  </div>
                  {renderQuickSeoCard("privacy", "legal")}
                </div>
              )}

              {/* 2. INQUIRIES LIST / INBOX */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">

                  {/* Filter and search row */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 w-full sm:w-auto bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 flex-1 max-w-md">
                      <Search size={18} className="text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={inquirySearch}
                        onChange={(e) => setInquirySearch(e.target.value)}
                        className="bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 outline-none w-full"
                      />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto justify-end">
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-bold shrink-0">
                        <Filter size={12} /> Filter:
                      </span>
                      {["All", "Pending", "In Progress", "Resolved"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setInquiryFilter(status)}
                          className={`px-3.5 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${inquiryFilter === status
                              ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/10"
                              : "bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inquiries Table */}
                  <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                    {filteredInquiries.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 space-y-2">
                        <Mail size={36} className="mx-auto text-slate-300" />
                        <p className="text-sm font-bold text-slate-700">No inquiries found matching your filters.</p>
                        <p className="text-xs text-slate-400">Submit an inquiry on the website home page to see it here.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 bg-slate-50/50 uppercase tracking-wider">
                              <th className="px-6 py-4">Client</th>
                              <th className="px-6 py-4">Inquiry Type</th>
                              <th className="px-6 py-4">Message</th>
                              <th className="px-6 py-4">Date</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredInquiries.map((item) => {
                              const clientName = item.name || (item.firstName || item.lastName ? `${item.firstName || ''} ${item.lastName || ''}`.trim() : item.email ? item.email.split('@')[0] : "Valued Client");
                              const email = item.email || "";
                              const inquiryType = item.service || item.inquiryType || "General Inquiry";
                              const contactDetails = [item.company, item.phone, item.country].filter(Boolean).join(" • ");
                              const displayDate = item.date ? (String(item.date).includes("/") || String(item.date).includes("-") ? String(item.date) : new Date(item.date).toLocaleDateString()) : "Recent";
                              
                              return (
                                <tr key={item.id} className="hover:bg-slate-50/70 transition duration-150 border-b border-slate-100/60">
                                  <td className="px-6 py-4">
                                    <div className="font-extrabold text-slate-900 text-sm">{clientName}</div>
                                    <div className="text-xs font-semibold text-[#1E67E2] mt-0.5">{email}</div>
                                    {contactDetails ? <div className="text-xs font-medium text-slate-500 mt-0.5">{contactDetails}</div> : null}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-[#1E67E2] whitespace-nowrap inline-block">
                                      {inquiryType}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 max-w-xs text-xs font-medium text-slate-700 leading-relaxed truncate" title={item.message}>
                                    {item.message}
                                  </td>
                                  <td className="px-6 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">
                                    {displayDate}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                                      item.status === "unread" || item.status === "New"
                                        ? "bg-[#1E67E2] text-white shadow-md shadow-blue-500/20"
                                        : item.status === "Pending"
                                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                                          : item.status === "In Progress"
                                            ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                    }`}>
                                      {item.status || "New"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <select
                                        value={item.status}
                                        onChange={(e) => updateInquiryStatus(item.id, e.target.value)}
                                        className="bg-white border border-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none text-slate-700 focus:border-[#1E67E2] cursor-pointer"
                                      >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                      </select>
                                      <button
                                        onClick={() => deleteInquiry(item.id)}
                                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg border border-red-100 transition cursor-pointer"
                                        title="Delete Submission"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
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
                      <p className="text-xs text-slate-500 mt-0.5">Changes are instantly reflected on the homepage.</p>
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
                          <h3 className="text-sm font-bold text-indigo-600 flex items-center gap-2"><Plus size={14} /> New Slide</h3>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <label className="text-xs text-white/70 font-semibold mb-1 block">Slide Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Clarity Headquarters"
                                  value={newSlide.title || ""}
                                  onChange={e => setNewSlide(prev => ({ ...prev, title: e.target.value }))}
                                  className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-white/70 font-semibold mb-1 block">Subtitle (Top Line)</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Powering Your Technology"
                                  value={newSlide.subtitle || ""}
                                  onChange={e => setNewSlide(prev => ({ ...prev, subtitle: e.target.value }))}
                                  className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-white/70 font-semibold mb-1 block">Highlight Phrase (Cyan Blue)</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Like It's Our Own"
                                  value={newSlide.highlight || ""}
                                  onChange={e => setNewSlide(prev => ({ ...prev, highlight: e.target.value }))}
                                  className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                />
                              </div>
                            </div>

                            {/* Image Picker */}
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <label className="text-xs text-white/70 font-semibold block">Select Background Image</label>
                                <label className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer active:scale-95">
                                  <Upload size={13} />
                                  <span>Choose File from Computer</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleHeroImageFileUpload(e, false)}
                                  />
                                </label>
                              </div>

                              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                                {[
                                  { url: "/office-bg.jpg?v=10", name: "1. HQ Reception" },
                                  { url: "/carousel-1.png?v=10", name: "2. Exec Strategy" },
                                  { url: "/carousel-2.png?v=10", name: "3. Software Hub" },
                                  { url: "/carousel-3.png?v=10", name: "4. Workstations" },
                                  { url: "/carousel-4.png?v=10", name: "5. Corporate Suite" },
                                  { url: "/hero-flowers.png", name: "6. Floral Lounge" }
                                ].map((imgItem, i) => {
                                  const isSelected = (newSlide.image || "").startsWith(imgItem.url.split("?")[0]);
                                  return (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() => setNewSlide(prev => ({ ...prev, image: imgItem.url }))}
                                      className={`relative rounded-xl overflow-hidden border-2 h-16 group transition cursor-pointer ${
                                        isSelected ? "border-blue-500 ring-2 ring-blue-500/40 scale-105" : "border-slate-300/40 hover:border-blue-400"
                                      }`}
                                      title={imgItem.name}
                                    >
                                      <img src={imgItem.url} alt={imgItem.name} className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                                      {isSelected && (
                                        <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center">
                                          <CheckCircle size={16} className="text-white drop-shadow-md" />
                                        </div>
                                      )}
                                      <span className="absolute bottom-0.5 inset-x-0 text-[8px] font-bold text-white text-center truncate px-0.5 bg-black/60 backdrop-blur-xs">
                                        {imgItem.name}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              <input
                                type="text"
                                placeholder="Or enter custom image URL (e.g. /office-bg.jpg?v=10)"
                                value={newSlide.image || ""}
                                onChange={e => setNewSlide(prev => ({ ...prev, image: e.target.value }))}
                                className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 transition"
                              />
                            </div>

                            <div>
                              <label className="text-xs text-white/70 font-semibold mb-1 block">Description</label>
                              <textarea
                                required
                                rows={2}
                                placeholder="Slide body text shown on the homepage..."
                                value={newSlide.description}
                                onChange={e => setNewSlide(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                              />
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end pt-2">
                            <button type="button" onClick={() => setNewSlideOpen(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-white transition cursor-pointer">Cancel</button>
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
                    {(heroSlides || []).map((slide, idx) => (
                      <motion.div
                        key={slide.id}
                        layout
                        className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden"
                      >
                        {/* Slide Row */}
                        <div className="flex items-center gap-4 p-4">
                          {/* Thumbnail */}
                          <div className="relative flex-shrink-0 w-24 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="w-full h-full object-cover"
                              onError={e => { e.target.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <span className="absolute bottom-1 left-1 text-[9px] font-mono text-white font-bold bg-black/50 px-1 rounded">{idx + 1}</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-800 text-sm truncate">{slide.title}</div>
                            <div className="text-xs text-slate-600 truncate">{slide.subtitle} <span className="text-sky-500 font-bold">{slide.highlight}</span></div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => moveSlide(idx, -1)} disabled={idx === 0}
                              className="p-1.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-25 transition cursor-pointer" title="Move Up">
                              <ChevronUp size={14} />
                            </button>
                            <button onClick={() => moveSlide(idx, 1)} disabled={idx === heroSlides.length - 1}
                              className="p-1.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-25 transition cursor-pointer" title="Move Down">
                              <ChevronDown size={14} />
                            </button>
                            <button
                              onClick={() => editingSlide === idx ? cancelEditSlide() : startEditSlide(idx)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${editingSlide === idx
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
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
                              <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50">
                                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Editing: {slide.title}</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1 block">Slide Name</label>
                                    <input
                                      type="text"
                                      value={editForm.title || ""}
                                      onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                      className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1 block">Subtitle (Top Line)</label>
                                    <input
                                      type="text"
                                      value={editForm.subtitle || ""}
                                      onChange={e => setEditForm(prev => ({ ...prev, subtitle: e.target.value }))}
                                      className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1 block">Highlight Phrase (Cyan Blue)</label>
                                    <input
                                      type="text"
                                      value={editForm.highlight || ""}
                                      onChange={e => setEditForm(prev => ({ ...prev, highlight: e.target.value }))}
                                      className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                    />
                                  </div>
                                </div>

                                {/* Visual Image Picker */}
                                <div>
                                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <label className="text-xs text-slate-500 font-semibold block">Select Background Image</label>
                                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer active:scale-95">
                                      <Upload size={13} />
                                      <span>Choose File from Computer</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleHeroImageFileUpload(e, true)}
                                      />
                                    </label>
                                  </div>

                                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                                    {[
                                      { url: "/office-bg.jpg?v=10", name: "1. HQ Reception" },
                                      { url: "/carousel-1.png?v=10", name: "2. Exec Strategy" },
                                      { url: "/carousel-2.png?v=10", name: "3. Software Hub" },
                                      { url: "/carousel-3.png?v=10", name: "4. Workstations" },
                                      { url: "/carousel-4.png?v=10", name: "5. Corporate Suite" },
                                      { url: "/hero-flowers.png", name: "6. Floral Lounge" }
                                    ].map((imgItem, i) => {
                                      const isSelected = (editForm.image || "").startsWith(imgItem.url.split("?")[0]);
                                      return (
                                        <button
                                          key={i}
                                          type="button"
                                          onClick={() => setEditForm(prev => ({ ...prev, image: imgItem.url }))}
                                          className={`relative rounded-xl overflow-hidden border-2 h-16 group transition cursor-pointer ${
                                            isSelected ? "border-blue-600 ring-2 ring-blue-500/30 scale-105" : "border-slate-200 hover:border-blue-400"
                                          }`}
                                          title={imgItem.name}
                                        >
                                          <img src={imgItem.url} alt={imgItem.name} className="w-full h-full object-cover" />
                                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                                          {isSelected && (
                                            <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                                              <CheckCircle size={16} className="text-white drop-shadow-md" />
                                            </div>
                                          )}
                                          <span className="absolute bottom-0.5 inset-x-0 text-[8px] font-bold text-white text-center truncate px-0.5 bg-black/60 backdrop-blur-xs">
                                            {imgItem.name}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Or enter custom image URL..."
                                    value={editForm.image || ""}
                                    onChange={e => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 transition"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs text-slate-500 font-semibold mb-1 block">Description</label>
                                  <textarea
                                    rows={2}
                                    value={editForm.description || ""}
                                    onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                                  />
                                </div>
                                {/* Live Preview Strip */}
                                <div className="rounded-xl bg-gradient-to-r from-[#0A0E39]/90 to-[#1a1f5e]/60 border border-slate-200 p-4">
                                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Live Preview</div>
                                  <div className="text-sm font-bold text-white">{editForm.subtitle} <span className="text-sky-400">{editForm.highlight}</span></div>
                                  <div className="text-xs text-slate-300 mt-1 line-clamp-2">{editForm.description}</div>
                                </div>
                                <div className="flex gap-3 justify-end">
                                  <button onClick={cancelEditSlide} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition cursor-pointer">Cancel</button>
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
                      className="text-xs text-slate-400 hover:text-red-400 transition cursor-pointer"
                    >
                      Reset to defaults
                    </button>
                  
                  </div>

                  {renderQuickSeoCard("home", "hero")}
                </div>
              )}

              {/* 4. ABOUT US EDITOR */}
              {activeTab === "about-us" && (
                <div className="space-y-6">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">About Us Editor</h2>
                      <p className="text-xs text-slate-500 mt-0.5">All fields are live — edit and hit Save to apply to the homepage.</p>
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
                      <button onClick={resetAbout} className="px-3 py-2 text-xs text-slate-500 hover:text-red-400 border border-slate-200 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                      <button onClick={saveAbout} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                        <Save size={14} /> Save Changes
                      </button>
                    </div>
                  </div>

                  {/* HEADINGS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headings & Badge</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Heading Line 1", key: "heading1", placeholder: "We are the best" },
                        { label: "Heading Line 2 (blue)", key: "heading2", placeholder: "in IT & Software Solutions" },
                        { label: "Badge Text", key: "badge", placeholder: "ABOUT US" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={aboutData[f.key] || ""}
                            onChange={e => updateAboutField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Description</h3>
                    <textarea
                      rows={3}
                      value={aboutData.description || ""}
                      onChange={e => updateAboutField("description", e.target.value)}
                      placeholder="About Us paragraph text..."
                      className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition resize-none"
                    />
                  </div>

                  {/* FEATURE CARDS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Feature Cards</h3>
                    <div className="space-y-3">
                      {(aboutData.features || []).map((feat, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3">Card {i + 1}</div>
                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Title</label>
                              <input
                                type="text"
                                value={feat.title}
                                onChange={e => updateFeature(i, "title", e.target.value)}
                                className="w-full bg-white border border-slate-200 text-sm font-bold text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Icon</label>
                              <input
                                type="text"
                                value={feat.icon}
                                onChange={e => updateFeature(i, "icon", e.target.value)}
                                placeholder="Lucide icon name (e.g. Shield, Cpu, Laptop)"
                                className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Description</label>
                              <textarea
                                rows={2}
                                value={feat.description}
                                onChange={e => updateFeature(i, "description", e.target.value)}
                                className="w-full bg-white border border-slate-200 text-sm text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save footer */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={saveAbout} 
                      className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        aboutSaveSuccess 
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {aboutSaveSuccess ? (
                        <>
                          <CheckCircle size={15} /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>

                  {renderQuickSeoCard("home", "about_us")}
                </div>
              )}

              {/* 5. PLATFORMS & STATS EDITOR */}
              {activeTab === "platforms" && (
                <div className="space-y-6">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Platforms & Stats Editor</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Edit headline, description, and features list.</p>
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
                      <button onClick={resetPlatforms} className="px-3 py-2 text-xs text-slate-500 hover:text-red-400 border border-slate-200 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                      <button onClick={savePlatforms} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                        <Save size={14} /> Save Changes
                      </button>
                    </div>
                  </div>

                  {/* HEADINGS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headline Lines</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Heading Line 1", key: "heading1", placeholder: "Powering Platforms" },
                        { label: "Middle Word", key: "heading2", placeholder: "that" },
                        { label: "Italic Highlight Line", key: "heading3Italic", placeholder: "Scale Your Business" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={platformsData[f.key] || ""}
                            onChange={e => updatePlatformField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Section Subtitle</h3>
                    <textarea
                      rows={3}
                      value={platformsData.description || ""}
                      onChange={e => updatePlatformField("description", e.target.value)}
                      placeholder="Subheading paragraph..."
                      className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                    />
                  </div>

                  {/* FEATURES LIST */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Features</h3>
                      <button onClick={addPlatformStat} className="text-xs font-bold text-[#1E67E2] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                        <Plus size={14} /> Add Feature
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {(platformsData.stats || []).map((stat, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 relative group">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Feature {i + 1}</div>
                            <button onClick={() => deletePlatformStat(i)} className="text-slate-300 hover:text-red-500 transition-colors" title="Delete feature">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={e => updatePlatformStat(i, "label", e.target.value)}
                            placeholder="Feature Text"
                            className="w-full bg-white border border-slate-200 text-xs text-slate-500 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>



                  {/* Save footer */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={savePlatforms} 
                      className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        platformsSaveSuccess 
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {platformsSaveSuccess ? (
                        <>
                          <CheckCircle size={15} /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>

                  {renderQuickSeoCard("home", "platforms")}
                </div>
              )}

              {/* 6. SERVICES & CARDS EDITOR */}
              {activeTab === "services" && (
                <div className="space-y-6">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Projects & Case Studies Editor</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Edit badge, headline, description, partner paragraph, and service cards.</p>
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
                      <button onClick={resetServices} className="px-3 py-2 text-xs text-slate-500 hover:text-red-400 border border-slate-200 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                      <button onClick={saveServices} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                        <Save size={14} /> Save Changes
                      </button>
                    </div>
                  </div>

                  {/* HEADINGS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Headings & Badge</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { label: "Badge Pill Text", key: "badge", placeholder: "Our Projects" },
                        { label: "Heading Line 1 (blue)", key: "heading1", placeholder: "Empowering Technology through" },
                        { label: "Line 2 (gray)", key: "heading2", placeholder: "Our" },
                        { label: "Line 3 (gray)", key: "heading3", placeholder: "Projects" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={servicesData[f.key] || ""}
                            onChange={e => updateServiceField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DESCRIPTION & PARTNER TEXT */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Top Header Description</h3>
                      <textarea
                        rows={3}
                        value={servicesData.description || ""}
                        onChange={e => updateServiceField("description", e.target.value)}
                        placeholder="Header description..."
                        className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                      />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Bottom Partner Paragraph</h3>
                      <textarea
                        rows={3}
                        value={servicesData.partnerText || ""}
                        onChange={e => updateServiceField("partnerText", e.target.value)}
                        placeholder="We partner with ambitious brands..."
                        className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* BOTTOM BUTTON & MARQUEE LOGOS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
                    <div>
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2 mb-3"><Edit3 size={12} /> Bottom Button Text</h3>
                      <input
                        type="text"
                        value={servicesData.buttonText || ""}
                        onChange={e => updateServiceField("buttonText", e.target.value)}
                        placeholder="Let's work together"
                        className="w-full md:w-1/2 bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Briefcase size={12} /> Marquee Partner Names</h3>
                        <button onClick={addMarqueeLogo} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded-lg text-xs font-semibold transition cursor-pointer">
                          <Plus size={13} /> Add Partner
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(servicesData.marqueeLogos || DEFAULT_SERVICES.marqueeLogos).map((logo, i) => {
                          const name = typeof logo === 'string' ? logo : logo.name;
                          const icon = typeof logo === 'string' ? 'Code2' : (logo.icon || 'Code2');
                          return (
                            <div key={i} className="flex flex-col gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                              <input
                                type="text"
                                value={name}
                                onChange={e => updateMarqueeLogo(i, e.target.value)}
                                placeholder="Partner Name"
                                className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                              />
                              <div className="flex gap-2">
                                <select 
                                  value={icon}
                                  onChange={e => updateMarqueeLogoIcon(i, e.target.value)}
                                  className="flex-1 bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2 py-1.5 outline-none focus:border-indigo-500 transition"
                                >
                                  <option value="Code2">Code (&lt;/&gt;)</option>
                                  <option value="Layers">Layers (:::)</option>
                                  <option value="Globe">Globe (O)</option>
                                  <option value="Zap">Zap (Lightning)</option>
                                  <option value="Activity">Activity (Wave)</option>
                                  <option value="Cpu">CPU (Chip)</option>
                                </select>
                                <button onClick={() => deleteMarqueeLogo(i)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition cursor-pointer">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SERVICE CARDS LIST */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Briefcase size={14} /> Service Cards ({servicesData.cards.length})</h3>
                      <button onClick={addServiceCard} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded-lg text-xs font-semibold transition cursor-pointer">
                        <Plus size={13} /> Add Service Card
                      </button>
                    </div>
                    <div className="space-y-4">
                      {servicesData.cards.map((card, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Service Card {i + 1}</span>
                            <button onClick={() => deleteServiceCard(i)} className="p-1 text-red-400 hover:text-red-300 transition cursor-pointer" title="Delete Card">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div className="grid md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1 block">Title</label>
                              <input
                                type="text"
                                value={card.title}
                                onChange={e => updateServiceCard(i, "title", e.target.value)}
                                placeholder="Service Title"
                                className="w-full bg-white border border-slate-200 text-sm font-bold text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1 block">Category / Subtitle</label>
                              <input
                                type="text"
                                value={card.category}
                                onChange={e => updateServiceCard(i, "category", e.target.value)}
                                placeholder="Infrastructure & Security"
                                className="w-full bg-white border border-slate-200 text-xs text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1 block">Year Tag</label>
                              <input
                                type="text"
                                value={card.year}
                                onChange={e => updateServiceCard(i, "year", e.target.value)}
                                placeholder="2026"
                                className="w-full bg-white border border-slate-200 text-xs text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                              />
                            </div>
                          </div>
                           <div className="grid md:grid-cols-3 gap-3 items-center">
                            <div className="md:col-span-2">
                              <label className="text-xs text-slate-500 font-semibold mb-1 block">Media URL (Video .mp4 or Image URL)</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={card.media}
                                  onChange={e => updateServiceCard(i, "media", e.target.value)}
                                  placeholder="/service.mp4 or https://..."
                                  className="flex-1 bg-white border border-slate-200 text-xs font-mono text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                                />
                                <label className="px-2.5 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 border border-indigo-200 flex items-center gap-1">
                                  <Video size={13} /> Upload
                                  <input type="file" accept="video/*,image/*" onChange={e => handleServiceCardMediaUpload(i, e)} className="hidden" />
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500 font-semibold mb-1 block">Media Type</label>
                              <select
                                value={card.isVideo ? "video" : "image"}
                                onChange={e => updateServiceCard(i, "isVideo", e.target.value === "video")}
                                className="w-full bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition cursor-pointer"
                              >
                                <option value="video">🎥 Video (.mp4)</option>
                                <option value="image">🖼️ Static Image</option>
                              </select>
                            </div>
                          </div>

                          {/* LIVE MEDIA / VIDEO PREVIEW DISPLAY */}
                          {card.media && (
                            <div className="flex items-center gap-4 p-3 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-md">
                              <div className="w-40 h-24 rounded-lg overflow-hidden bg-black shrink-0 relative border border-slate-700">
                                {(card.isVideo || (card.media && (card.media.endsWith(".mp4") || card.media.endsWith(".webm")))) ? (
                                  <video
                                    src={card.media}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                ) : (
                                  <img
                                    src={card.media}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                )}
                                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                                  {(card.isVideo || (card.media && (card.media.endsWith(".mp4") || card.media.endsWith(".webm")))) ? "🎥 Live Video" : "🖼️ Image"}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-widest block">Admin Live Video Preview</span>
                                <h4 className="text-xs font-bold text-white truncate mt-0.5">{card.title}</h4>
                                <p className="text-[11px] font-mono text-slate-400 truncate mt-1">{card.media}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save footer */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={saveServices} 
                      className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        servicesSaveSuccess 
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {servicesSaveSuccess ? (
                        <>
                          <CheckCircle size={15} /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>

                  {renderQuickSeoCard("projects", "general")}
                </div>
              )}

              {/* 7. FAQ & CONTACT FORM EDITOR */}
              {activeTab === "faq" && (
                <div className="space-y-6">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">FAQ & Contact Form Editor</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Edit FAQ questions, answers, inquiry categories, and contact card titles.</p>
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
                      <button onClick={resetFaq} className="px-3 py-2 text-xs text-slate-500 hover:text-red-400 border border-slate-200 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                      <button onClick={saveFaq} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                        <Save size={14} /> Save Changes
                      </button>
                    </div>
                  </div>

                  {/* FAQ HEADINGS & QUESTIONS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><HelpCircle size={14} /> FAQ Accordion Headings</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { label: "Title Line 1", key: "heading1", placeholder: "You Have Questions," },
                        { label: "Title Line 2", key: "heading2", placeholder: "We Have Answers" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={faqData[f.key] || ""}
                            onChange={e => updateFaqField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">FAQ Subtitle</label>
                      <textarea
                        rows={2}
                        value={faqData.subtitle || ""}
                        onChange={e => updateFaqField("subtitle", e.target.value)}
                        placeholder="Subtitle paragraph..."
                        className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* FAQ QUESTIONS & ANSWERS LIST */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><HelpCircle size={14} /> Q&A Items ({(faqData.questions || []).length})</h3>
                      <button onClick={addFaqQuestion} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded-lg text-xs font-semibold transition cursor-pointer">
                        <Plus size={13} /> Add Question
                      </button>
                    </div>
                    <div className="space-y-4">
                      {(faqData.questions || []).map((item, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Question {i + 1}</span>
                            <button onClick={() => deleteFaqQuestion(i)} className="p-1 text-red-400 hover:text-red-300 transition cursor-pointer" title="Delete Question">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-semibold mb-1 block">Question Text</label>
                            <input
                              type="text"
                              value={item.q}
                              onChange={e => updateFaqQuestion(i, "q", e.target.value)}
                              placeholder="Question?"
                              className="w-full bg-white border border-slate-200 text-sm font-semibold text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-semibold mb-1 block">Answer Text</label>
                            <textarea
                              rows={2}
                              value={item.a}
                              onChange={e => updateFaqQuestion(i, "a", e.target.value)}
                              placeholder="Detailed answer..."
                              className="w-full bg-white border border-slate-200 text-xs text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CONTACT FORM HEADINGS & INQUIRY PILLS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><MessageSquare size={14} /> Contact Form Card Titles & Categories</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Form Card Title</label>
                        <input
                          type="text"
                          value={faqData.formTitle || ""}
                          onChange={e => updateFaqField("formTitle", e.target.value)}
                          placeholder="Tell Us What You Need"
                          className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Form Card Subtitle</label>
                        <input
                          type="text"
                          value={faqData.formSubtitle || ""}
                          onChange={e => updateFaqField("formSubtitle", e.target.value)}
                          placeholder="Our team is ready to assist..."
                          className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Checkbox Text</label>
                        <input
                          type="text"
                          value={faqData.formCheckboxText || ""}
                          onChange={e => updateFaqField("formCheckboxText", e.target.value)}
                          placeholder="I'd like to receive exclusive tech updates and insights"
                          className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Submit Button Text</label>
                        <input
                          type="text"
                          value={faqData.formSubmitText || ""}
                          onChange={e => updateFaqField("formSubmitText", e.target.value)}
                          placeholder="Submit"
                          className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100 mt-2">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">First Name Placeholder</label>
                        <input type="text" value={faqData.formFirstName || ""} onChange={e => updateFaqField("formFirstName", e.target.value)} placeholder="First Name" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Last Name Placeholder</label>
                        <input type="text" value={faqData.formLastName || ""} onChange={e => updateFaqField("formLastName", e.target.value)} placeholder="Last Name" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Country Placeholder</label>
                        <input type="text" value={faqData.formCountry || ""} onChange={e => updateFaqField("formCountry", e.target.value)} placeholder="Country" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Phone Number Placeholder</label>
                        <input type="text" value={faqData.formPhone || ""} onChange={e => updateFaqField("formPhone", e.target.value)} placeholder="Phone Number" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Email Address Placeholder</label>
                        <input type="text" value={faqData.formEmail || ""} onChange={e => updateFaqField("formEmail", e.target.value)} placeholder="Email Address" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Inquiry Label Text</label>
                        <input type="text" value={faqData.formInquiryLabel || ""} onChange={e => updateFaqField("formInquiryLabel", e.target.value)} placeholder="Type of Inquiry" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Message Placeholder</label>
                        <input type="text" value={faqData.formMessage || ""} onChange={e => updateFaqField("formMessage", e.target.value)} placeholder="Message" className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition" />
                      </div>
                    </div>

                    {/* Inquiry Type Pills Editor */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-slate-500 font-semibold block">Inquiry Type Option Pills ({(faqData.inquiryTypes || []).length})</label>
                        <button type="button" onClick={addInquiryTypeTag} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded text-xs font-semibold transition cursor-pointer">
                          <Plus size={12} /> Add Category
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {(faqData.inquiryTypes || []).map((typeTag, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1.5">
                            <input
                              type="text"
                              value={typeTag}
                              onChange={e => updateInquiryTypeTag(i, e.target.value)}
                              className="w-full bg-transparent border-none text-xs text-slate-700 outline-none px-1"
                            />
                            <button type="button" onClick={() => deleteInquiryTypeTag(i)} className="text-red-400 hover:text-red-300 p-0.5" title="Delete">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Save footer */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={saveFaq} 
                      className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        faqSaveSuccess 
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {faqSaveSuccess ? (
                        <>
                          <CheckCircle size={15} /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>

                </div>
              )}


              {/* HEADER LOGO & LINKS */}
              {activeTab === "header-links" && (
                <div className="space-y-6">
                  {/* Save Status & Action Bar */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-[88px] z-30">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">Header Settings</span>
                        <span className="text-xs text-slate-500">Configure logo & navigation links</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button onClick={resetHeader} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer text-xs font-bold">
                        <RefreshCw size={14} /> Reset
                      </button>
                      <button onClick={saveHeader} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 transition cursor-pointer text-xs font-bold">
                        {headerSaveSuccess ? <Check size={14} className="animate-in zoom-in duration-200" /> : <Save size={14} />}
                        {headerSaveSuccess ? "Saved!" : "Save Changes"}
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12 space-y-8">
                      {/* Logo Section */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                          <Image size={18} className="text-[#1E67E2]" /> Logo Image
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Logo URL Input & File Upload */}
                          <div className="lg:col-span-2 space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Logo URL</label>
                              <input 
                                type="text" 
                                value={headerData.logo} 
                                onChange={(e) => updateHeaderLogo(e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50" 
                                placeholder="/logo.png" 
                              />
                            </div>
                            
                            {/* Upload New Logo */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Upload New Logo to Folder</label>
                              <div className="flex items-center gap-3">
                                <label className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl transition cursor-pointer text-xs font-bold shrink-0">
                                  <Plus size={14} className="text-[#1E67E2]" />
                                  <span>Choose File</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleLogoUpload} 
                                    className="hidden" 
                                  />
                                </label>
                                <span className="text-xs text-slate-400 truncate">
                                  Supports PNG, JPG, SVG, WebP, GIF
                                </span>
                              </div>
                              {logoUploadError && (
                                <p className="text-xs text-red-500 mt-1 font-semibold">{logoUploadError}</p>
                              )}
                            </div>
                          </div>

                          {/* Preview Panel */}
                          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 p-4 h-full min-h-[140px]">
                            <span className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Active Logo Preview</span>
                            <div className="flex-1 flex items-center justify-center min-h-[60px] w-full">
                              {headerData.logo ? (
                                <img src={headerData.logo} alt="Logo Preview" className="max-h-16 object-contain" />
                              ) : (
                                <span className="text-xs text-slate-400">No Image</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Logo Folder Gallery Selection */}
                        <div className="mt-6 border-t border-slate-100 pt-6">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">Select Logo From Folder</label>
                          {loadingLogos ? (
                            <div className="flex items-center gap-2 py-4 justify-center text-xs text-slate-400">
                              <RefreshCw size={14} className="animate-spin text-[#1E67E2]" /> Loading folder contents...
                            </div>
                          ) : availableLogos.length === 0 ? (
                            <p className="text-xs text-slate-400 italic py-2">No logos found in public/logos/ folder.</p>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                              {availableLogos.map((logo) => {
                                const isSelected = headerData.logo === logo.url;
                                return (
                                  <button
                                    key={logo.name}
                                    onClick={() => updateHeaderLogo(logo.url)}
                                    className={`relative flex flex-col items-center justify-between p-3 bg-white rounded-xl border transition-all cursor-pointer h-28 group overflow-hidden ${
                                      isSelected 
                                        ? "border-[#1E67E2] ring-2 ring-[#1E67E2]/25 shadow-sm" 
                                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                                    }`}
                                  >
                                    <div className="flex-1 flex items-center justify-center max-h-12 w-full p-1">
                                      <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
                                    </div>
                                    <span className="text-[10px] text-slate-500 truncate w-full text-center mt-2 font-mono">
                                      {logo.name}
                                    </span>
                                    <button 
                                      onClick={(e) => deleteLogo(logo.name, e)} 
                                      className="absolute top-1.5 left-1.5 bg-white/80 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                                      title="Delete Logo"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                    {isSelected && (
                                      <span className="absolute top-1.5 right-1.5 bg-[#1E67E2] text-white rounded-full p-0.5 shadow-sm">
                                        <Check size={8} strokeWidth={3} />
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                            <Link size={18} className="text-[#1E67E2]" /> Navigation Links
                          </h3>
                          <button onClick={addHeaderLink} className="flex items-center gap-1.5 text-xs font-bold text-[#1E67E2] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
                            <Plus size={14} /> Add Link
                          </button>
                        </div>
                        <div className="space-y-3">
                          {(headerData.links || []).map((link, i) => (
                            <div key={link.id || i} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl relative group">
                              <div className="flex-1 grid grid-cols-2 gap-3">
                                <div>
                                  <input 
                                    type="text" 
                                    value={link.label} 
                                    onChange={(e) => updateHeaderLink(i, 'label', e.target.value)} 
                                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50" 
                                    placeholder="Label (e.g. Home)" 
                                  />
                                </div>
                                <div>
                                  <input 
                                    type="text" 
                                    value={link.url} 
                                    onChange={(e) => updateHeaderLink(i, 'url', e.target.value)} 
                                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E67E2]/50 font-mono" 
                                    placeholder="URL (e.g. /)" 
                                  />
                                </div>
                              </div>
                              <button onClick={() => deleteHeaderLink(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          {(headerData.links || []).length === 0 && (
                            <div className="text-center py-8 text-sm text-slate-400 font-medium">No links added.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  
                  </div>
                  {renderQuickSeoCard("contact", "general")}
                </div>
              )}
              {/* 8. FOOTER EDITOR */}
              {activeTab === "footer" && (
                <div className="space-y-6">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Footer Editor</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Edit taglines, social links, company links, newsletter text, and copyright.</p>
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
                      <button onClick={resetFooter} className="px-3 py-2 text-xs text-slate-500 hover:text-red-400 border border-slate-200 hover:border-red-400/30 rounded-lg transition cursor-pointer">Reset</button>
                      <button onClick={saveFooter} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                        <Save size={14} /> Save Changes
                      </button>
                    </div>
                  </div>

                  {/* TAGLINES */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Left Card Taglines & Social Label</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Tagline Line 1", key: "tagline1", placeholder: "Smarter IT solutions," },
                        { label: "Tagline Line 2", key: "tagline2", placeholder: "powered by enterprise AI." },
                        { label: "Social Section Label", key: "socialLabel", placeholder: "Stay in touch!" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={footerData[f.key] || ""}
                            onChange={e => updateFooterField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SOCIAL LINKS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Link size={12} /> Social Media Link URLs</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Discord URL", key: "discordUrl", placeholder: "https://discord.gg/..." },
                        { label: "X (Twitter) URL", key: "xUrl", placeholder: "https://x.com/..." },
                        { label: "LinkedIn URL", key: "linkedinUrl", placeholder: "https://linkedin.com/..." },
                        { label: "GitHub URL", key: "githubUrl", placeholder: "https://github.com/..." },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={footerData[f.key] || ""}
                            onChange={e => updateFooterField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-xs font-mono text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NAVIGATION LINKS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Globe size={14} /> Navigation Column Links</h3>
                      <button onClick={addNavLink} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded-lg text-xs font-semibold transition cursor-pointer">
                        <Plus size={13} /> Add Link
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(footerData.navLinks || []).map((link, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3">
                          <div className="flex-1 grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={link.label}
                              onChange={e => updateNavLink(i, "label", e.target.value)}
                              placeholder="Link Label"
                              className="bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={e => updateNavLink(i, "url", e.target.value)}
                              placeholder="URL (e.g. #home)"
                              className="bg-white border border-slate-200 text-xs font-mono text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                          </div>
                          <button onClick={() => deleteNavLink(i)} className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded border border-red-500/20 transition cursor-pointer">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COMPANY LINKS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Globe size={14} /> Company Column Links</h3>
                      <button onClick={addCompanyLink} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-600 rounded-lg text-xs font-semibold transition cursor-pointer">
                        <Plus size={13} /> Add Link
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(footerData.companyLinks || []).map((link, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3">
                          <div className="flex-1 grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={link.label}
                              onChange={e => updateCompanyLink(i, "label", e.target.value)}
                              placeholder="Link Label"
                              className="bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={e => updateCompanyLink(i, "url", e.target.value)}
                              placeholder="URL (e.g. #services)"
                              className="bg-white border border-slate-200 text-xs font-mono text-slate-600 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
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
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2"><Edit3 size={12} /> Newsletter & Copyright</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { label: "Newsletter Header", key: "subscribeHeader", placeholder: "Enterprise tech moves fast." },
                        { label: "Newsletter Subheader (bold)", key: "subscribeSubheader", placeholder: "Stay ahead with Clarity." },
                        { label: "Email Placeholder", key: "subscribePlaceholder", placeholder: "Enter email address" },
                        { label: "Button Text", key: "subscribeButtonText", placeholder: "Subscribe" },
                        { label: "Copyright Text", key: "copyright", placeholder: "© 2026 Clarity InfoTech..." },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-500 font-semibold mb-1.5 block">{f.label}</label>
                          <input
                            type="text"
                            value={footerData[f.key] || ""}
                            onChange={e => updateFooterField(f.key, e.target.value)}
                            placeholder={f.placeholder}
                            className="w-full bg-white border border-slate-200 text-sm text-slate-800 rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save footer */}
                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={saveFooter} 
                      className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                        footerSaveSuccess 
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" 
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                      }`}
                    >
                      {footerSaveSuccess ? (
                        <>
                          <CheckCircle size={15} /> Saved Successfully!
                        </>
                      ) : (
                        <>
                          <Save size={15} /> Save All Changes
                        </>
                      )}
                    </button>
                  </div>



                  {renderQuickSeoCard("home", "footer")}
                </div>
              )}

              {/* 9. SYSTEM CONFIGURATION EDITOR */}
              {/* 10. SEO MANAGEMENT SYSTEM EDITOR */}
              {activeTab === "seo-management" && (() => {
                const validation = getSeoValidation(seoSelectedPage);
                const pageConfig = seoData[seoSelectedPage] || {};

                return (
                  <div className="space-y-6">
                    {/* Header Controls Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                          <Search className="text-[#1E67E2]" size={24} />
                          SEO Management System
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                          Configure search engine optimization, canonicals, social meta cards, structured schema markup, and sitemaps dynamically.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        <button onClick={resetSeoData} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap">Reset All</button>
                        <button onClick={generateAndDownloadSitemap} className="px-4 py-2 text-xs font-semibold text-slate-650 hover:text-blue-650 border border-slate-200 hover:border-blue-200 rounded-xl transition cursor-pointer whitespace-nowrap flex items-center gap-1.5">
                          <Globe size={13} /> Download Sitemap
                        </button>
                        <button onClick={saveSeoData} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
                          {seoSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                          {seoSaveSuccess ? "Saved!" : "Save Page SEO"}
                        </button>
                      </div>
                    </div>

                    {/* Split Layout: Configuration Form & Real-time Validation Score */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      
                      {/* Left and Middle Column: Page Config & Sub-tabs */}
                      <div className="lg:col-span-2 space-y-6">
                        
                        {/* Selector card */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Select Website Page</label>
                            <select
                              value={seoSelectedPage}
                              onChange={e => setSeoSelectedPage(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition cursor-pointer"
                            >
                              <option value="home">Homepage (Home)</option>
                              <option value="about">About Us Page (About)</option>
                              <option value="projects">Our Projects Page (Services)</option>
                              <option value="services">Our Services Page (Our-Services)</option>
                              <option value="gallery">Gallery Page (Gallery)</option>
                              <option value="contact">Contact Page (Contact)</option>
                              <option value="privacy">Privacy Policy</option>
                              <option value="terms">Terms of Service</option>
                              <option value="refund">Refund Policy</option>
                            </select>
                          </div>

                          <div className="shrink-0 flex items-end">
                            <button
                              onClick={generateAiSeo}
                              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-[#0ea5e9] hover:from-blue-700 hover:to-sky-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                            >
                              <Sparkles size={14} className="animate-pulse" />
                              Generate SEO
                            </button>
                          </div>
                        </div>

                        {/* Editor tabs */}
                        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                          
                          {/* Inner Tabs header */}
                          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 overflow-x-auto gap-1">
                            {[
                              { id: "general", label: "General Settings" },
                              { id: "social", label: "Social Meta Tags" },
                              { id: "image", label: "Image Alt/SEO" },
                              { id: "schema", label: "Structured Schema" },
                              { id: "sitemap", label: "Sitemap Config" }
                            ].map((subTab) => (
                              <button
                                key={subTab.id}
                                onClick={() => setSeoActiveSubTab(subTab.id)}
                                className={'px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap cursor-pointer ' + (
                                  seoActiveSubTab === subTab.id
                                    ? 'bg-white text-[#1E67E2] shadow-sm border border-slate-200/50'
                                    : 'text-slate-500 hover:text-slate-800'
                                )}
                              >
                                {subTab.label}
                              </button>
                            ))}
                          </div>

                          {/* Editor forms body */}
                          <div className="p-6">
                            
                            {/* GENERAL TAB */}
                            {seoActiveSubTab === "general" && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-xs text-slate-500 font-semibold mb-1.5 block flex justify-between">
                                    <span>SEO Title *</span>
                                    <span className={(pageConfig.title || "").length > 60 || (pageConfig.title || "").length < 30 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
                                      {(pageConfig.title || "").length} / 60 chars
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    value={pageConfig.title || ""}
                                    onChange={e => updateSeoField("title", e.target.value)}
                                    placeholder="Enter page-specific SEO Title..."
                                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs text-slate-500 font-semibold mb-1.5 block flex justify-between">
                                    <span>Meta Description *</span>
                                    <span className={(pageConfig.description || "").length > 160 || (pageConfig.description || "").length < 80 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
                                      {(pageConfig.description || "").length} / 160 chars
                                    </span>
                                  </label>
                                  <textarea
                                    rows={4}
                                    value={pageConfig.description || ""}
                                    onChange={e => updateSeoField("description", e.target.value)}
                                    placeholder="Enter meta description used in search snippets..."
                                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition resize-none"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Meta Keywords</label>
                                  <textarea
                                    rows={2}
                                    value={pageConfig.keywords || ""}
                                    onChange={e => updateSeoField("keywords", e.target.value)}
                                    placeholder="e.g. clarity infotech, software team, DevOps chennai (comma separated)..."
                                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition resize-none"
                                  />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Canonical URL</label>
                                    <input
                                      type="text"
                                      value={pageConfig.canonical || ""}
                                      onChange={e => updateSeoField("canonical", e.target.value)}
                                      placeholder="e.g. https://clarityinfotech.com/about"
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">SEO Slug (URL Path)</label>
                                    <input
                                      type="text"
                                      value={pageConfig.slug || ""}
                                      onChange={e => updateSeoField("slug", e.target.value)}
                                      placeholder="e.g. /about"
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                    />
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Robots Indexing</label>
                                    <select
                                      value={pageConfig.robotsIndex || "index"}
                                      onChange={e => updateSeoField("robotsIndex", e.target.value)}
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition cursor-pointer"
                                    >
                                      <option value="index">Index (Recommended - show in Google)</option>
                                      <option value="noindex">Noindex (Hide page from search results)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Robots Links Follow</label>
                                    <select
                                      value={pageConfig.robotsFollow || "follow"}
                                      onChange={e => updateSeoField("robotsFollow", e.target.value)}
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition cursor-pointer"
                                    >
                                      <option value="follow">Follow (Follow links on page)</option>
                                      <option value="nofollow">Nofollow (Do not crawl page links)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* SOCIAL TAB */}
                            {seoActiveSubTab === "social" && (
                              <div className="space-y-6">
                                {/* Open Graph Section */}
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Globe size={13} /> Open Graph (OG) Facebook Configuration
                                  </h4>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">OG Title</label>
                                      <input
                                        type="text"
                                        value={pageConfig.ogTitle || ""}
                                        onChange={e => updateSeoField("ogTitle", e.target.value)}
                                        placeholder="Social share title..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">OG Image URL</label>
                                      <input
                                        type="text"
                                        value={pageConfig.ogImage || ""}
                                        onChange={e => updateSeoField("ogImage", e.target.value)}
                                        placeholder="URL of share preview image..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">OG Page URL</label>
                                      <input
                                        type="text"
                                        value={pageConfig.ogUrl || ""}
                                        onChange={e => updateSeoField("ogUrl", e.target.value)}
                                        placeholder="Canonical page share link..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">OG Content Type</label>
                                      <input
                                        type="text"
                                        value={pageConfig.ogType || "website"}
                                        onChange={e => updateSeoField("ogType", e.target.value)}
                                        placeholder="e.g. website, article..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">OG Description</label>
                                    <textarea
                                      rows={2}
                                      value={pageConfig.ogDescription || ""}
                                      onChange={e => updateSeoField("ogDescription", e.target.value)}
                                      placeholder="Snippet displayed on social feeds..."
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition resize-none"
                                    />
                                  </div>
                                </div>

                                {/* Twitter Card Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                    <Search size={13} /> Twitter Card Integration
                                  </h4>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Twitter Card Title</label>
                                      <input
                                        type="text"
                                        value={pageConfig.twitterTitle || ""}
                                        onChange={e => updateSeoField("twitterTitle", e.target.value)}
                                        placeholder="Share title for Twitter card..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Twitter Preview Image URL</label>
                                      <input
                                        type="text"
                                        value={pageConfig.twitterImage || ""}
                                        onChange={e => updateSeoField("twitterImage", e.target.value)}
                                        placeholder="Preview image link..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                      />
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Twitter Card Type</label>
                                      <select
                                        value={pageConfig.twitterCardType || "summary_large_image"}
                                        onChange={e => updateSeoField("twitterCardType", e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition cursor-pointer"
                                      >
                                        <option value="summary">Summary Card (Small thumbnail)</option>
                                        <option value="summary_large_image">Summary Card with Large Image</option>
                                        <option value="app">App Card</option>
                                        <option value="player">Player Card (Video player)</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Twitter Card Description</label>
                                      <textarea
                                        rows={1.5}
                                        value={pageConfig.twitterDescription || ""}
                                        onChange={e => updateSeoField("twitterDescription", e.target.value)}
                                        placeholder="Description displayed on Twitter card..."
                                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition resize-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* IMAGE TAB */}
                            {seoActiveSubTab === "image" && (
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                  <Image size={13} /> Dynamic Page Image Alt & Title Configuration
                                </h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Global Image Alt Attribute</label>
                                    <input
                                      type="text"
                                      value={pageConfig.imageAlt || ""}
                                      onChange={e => updateSeoField("imageAlt", e.target.value)}
                                      placeholder="Describe the image content for screen readers..."
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Global Image Title Attribute</label>
                                    <input
                                      type="text"
                                      value={pageConfig.imageTitle || ""}
                                      onChange={e => updateSeoField("imageTitle", e.target.value)}
                                      placeholder="Title attribute for image elements..."
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Global Image Caption / Tooltip</label>
                                  <textarea
                                    rows={3}
                                    value={pageConfig.imageCaption || ""}
                                    onChange={e => updateSeoField("imageCaption", e.target.value)}
                                    placeholder="Image tooltip or caption text block..."
                                    className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition resize-none"
                                  />
                                </div>
                              </div>
                            )}

                            {/* SCHEMA TAB */}
                            {seoActiveSubTab === "schema" && (() => {
                              let isValidJson = true;
                              if (pageConfig.schemaJson && pageConfig.schemaJson.trim() !== "{}") {
                                try {
                                  JSON.parse(pageConfig.schemaJson);
                                } catch (e) {
                                  isValidJson = false;
                                }
                              }
                              return (
                                <div className="space-y-4">
                                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex justify-between items-center border-b border-slate-100 pb-2">
                                    <span className="flex items-center gap-2"><Layers size={13} /> JSON-LD Structured Data Schema</span>
                                    <span className={'text-[10px] font-bold px-2 py-0.5 rounded-full ' + (isValidJson ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500 animate-pulse')}>
                                      {isValidJson ? '✓ JSON Syntax Valid' : '✗ JSON Syntax Invalid'}
                                    </span>
                                  </h4>

                                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
                                    <div className="flex-1">
                                      <label className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Select Schema Template</label>
                                      <select
                                        value={schemaTemplateType}
                                        onChange={e => setSchemaTemplateType(e.target.value)}
                                        className="bg-white border border-slate-200 text-xs text-slate-800 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#1E67E2] cursor-pointer"
                                      >
                                        <option value="Organization">Organization Schema (Logo, Social links)</option>
                                        <option value="LocalBusiness">Local Business Schema (Address, Hours, Map)</option>
                                        <option value="Service">Service Schema (Offered items list)</option>
                                        <option value="Product">Product Schema (Name, Brand, Detail)</option>
                                        <option value="FAQ">FAQ Page Schema (Questions & Answers)</option>
                                        <option value="Article">Article Schema (Publish date, Author)</option>
                                        <option value="Event">Event Schema (Date, online link, Organizer)</option>
                                      </select>
                                    </div>
                                    <div className="shrink-0 flex items-end">
                                      <button
                                        onClick={loadSchemaTemplate}
                                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
                                      >
                                        Load Template
                                      </button>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Custom JSON-LD Payload Editor</label>
                                    <textarea
                                      rows={10}
                                      value={pageConfig.schemaJson || "{}"}
                                      onChange={e => updateSeoField("schemaJson", e.target.value)}
                                      placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Organization"...\n}'
                                      className="w-full bg-slate-900 border border-slate-850 text-emerald-400 font-mono text-xs rounded-xl p-4 outline-none focus:border-emerald-500 transition resize-y"
                                    />
                                  </div>
                                </div>
                              );
                            })()}

                            {/* SITEMAP TAB */}
                            {seoActiveSubTab === "sitemap" && (
                              <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                                  <Globe size={13} /> Sitemap XML & Crawler Settings
                                </h4>

                                <div className="flex items-center justify-between bg-slate-50/50 p-4 border border-slate-150 rounded-2xl">
                                  <div>
                                    <h5 className="text-xs font-bold text-slate-700">Include in Sitemap.xml</h5>
                                    <p className="text-[11px] text-slate-500 mt-0.5">Toggle whether search bots are directed to this page in sitemaps.</p>
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={pageConfig.sitemapInclude !== false}
                                    onChange={e => updateSeoField("sitemapInclude", e.target.checked)}
                                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                                  />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 pt-2">
                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block flex justify-between">
                                      <span>Sitemap Priority Score</span>
                                      <span className="font-bold text-primary">{pageConfig.sitemapPriority || 0.8}</span>
                                    </label>
                                    <input
                                      type="range"
                                      min="0.1"
                                      max="1.0"
                                      step="0.1"
                                      value={pageConfig.sitemapPriority || 0.8}
                                      onChange={e => updateSeoField("sitemapPriority", parseFloat(e.target.value))}
                                      className="w-full accent-[#1E67E2] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                                      <span>0.1 (Low)</span>
                                      <span>0.5</span>
                                      <span>1.0 (High)</span>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Change Frequency</label>
                                    <select
                                      value={pageConfig.sitemapFrequency || "weekly"}
                                      onChange={e => updateSeoField("sitemapFrequency", e.target.value)}
                                      className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition cursor-pointer"
                                    >
                                      <option value="always">Always (Dynamic content updates)</option>
                                      <option value="hourly">Hourly</option>
                                      <option value="daily">Daily</option>
                                      <option value="weekly">Weekly (Standard static content)</option>
                                      <option value="monthly">Monthly</option>
                                      <option value="yearly">Yearly</option>
                                      <option value="never">Never (Archived content)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>

                      </div>

                      {/* Right Column: Dynamic Validation Dashboard */}
                      <div className="space-y-6">
                        
                        {/* Score Circular Gauge */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-4">
                          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Real-Time SEO Score</h3>
                          
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            {/* Inner Circle Track */}
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="72" cy="72" r="62" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                              <circle 
                                cx="72" 
                                cy="72" 
                                r="62" 
                                stroke={validation.score > 80 ? '#10b981' : validation.score > 50 ? '#f59e0b' : '#ef4444'} 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray={2 * Math.PI * 62}
                                strokeDashoffset={2 * Math.PI * 62 * (1 - validation.score / 100)}
                                className="transition-all duration-500 ease-out"
                              />
                            </svg>
                            {/* Center score readout */}
                            <div className="absolute flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-slate-800 leading-none">{validation.score}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">/ 100 Score</span>
                            </div>
                          </div>

                          <div className="text-center">
                            <span className={'text-xs font-extrabold px-3 py-1 rounded-full ' + (
                              validation.score > 80 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : validation.score > 50 
                                ? 'bg-amber-50 text-amber-600' 
                                : 'bg-red-50 text-red-500'
                            )}>
                              {validation.score > 80 ? 'Excellent SEO Health' : validation.score > 50 ? 'Needs Optimization' : 'Poor SEO Status'}
                            </span>
                          </div>
                        </div>

                        {/* Checklist Details */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle size={14} className="text-slate-500" /> Actionable Recommendations
                          </h4>
                          
                          {validation.warnings.length === 0 ? (
                            <div className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-emerald-700 text-xs">
                              <CheckCircle size={15} /> All search checks passed successfully! This page is fully optimized.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {validation.warnings.map((warn, idx) => (
                                <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-1">
                                  <div className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    {warn}
                                  </div>
                                  <p className="text-[11px] text-slate-500 pl-3 leading-relaxed">
                                    {validation.recommendations[idx]}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()}

              {activeTab === "system-config" && (
                <div className="space-y-6">
                  {/* Top header card */}
                  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Settings className="text-[#1E67E2]" size={24} />
                        System Configuration
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Configure system-wide settings, mail service credentials, and social media links.
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={resetSystemConfig} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0">Reset</button>
                      <button onClick={saveSystemConfig} className="px-5 py-2 bg-[#1E67E2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0">
                        {systemConfigSaveSuccess ? <Check size={16} /> : <Save size={16} />}
                        {systemConfigSaveSuccess ? "Saved!" : "Save All Changes"}
                      </button>
                    </div>
                  </div>

                  {/* Console Security & Login Settings */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2">
                      <Shield size={14} /> Console Security & Login Settings
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Console Administrator Username</label>
                        <input
                          type="text"
                          value={adminUsernameSetting}
                          onChange={e => setAdminUsernameSetting(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                          placeholder="admin"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Console Administrator Password</label>
                        <div className="relative">
                          <input
                            type={showAdminPasswordSetting ? "text" : "password"}
                            value={adminPasswordSetting}
                            onChange={e => setAdminPasswordSetting(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 pr-10 outline-none focus:border-[#1E67E2] transition"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowAdminPasswordSetting(!showAdminPasswordSetting)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer flex items-center justify-center"
                          >
                            {showAdminPasswordSetting ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-3.5 text-xs flex items-center gap-2">
                      <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                      <span>
                        <strong>Important:</strong> Changing these login credentials will require you to log in again on the next session using the updated details.
                      </span>
                    </div>
                  </div>

                  {/* Mail Service Configuration */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2">
                      <Mail size={14} /> Mail Service Configuration
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">System Email Address (Sender)</label>
                        <input
                          type="email"
                          value={systemConfigData.smtpEmail || ""}
                          onChange={e => updateSystemConfigField("smtpEmail", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Mail Password / App Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={systemConfigData.smtpPassword || ""}
                            onChange={e => updateSystemConfigField("smtpPassword", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 pr-10 outline-none focus:border-[#1E67E2] transition"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer flex items-center justify-center"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <span className="text-[10px] text-amber-600 flex items-center gap-1 mt-1">
                          <Shield size={10} /> This password is encrypted for security.
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Mail Host</label>
                        <input
                          type="text"
                          value={systemConfigData.smtpHost || ""}
                          onChange={e => updateSystemConfigField("smtpHost", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Mail Port</label>
                        <input
                          type="text"
                          value={systemConfigData.smtpPort || ""}
                          onChange={e => updateSystemConfigField("smtpPort", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Mail Encryption</label>
                        <select
                          value={systemConfigData.smtpEncryption || "TLS"}
                          onChange={e => updateSystemConfigField("smtpEncryption", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        >
                          <option value="TLS">TLS</option>
                          <option value="SSL">SSL</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Mail Driver / Mailer</label>
                        <select
                          value={systemConfigData.smtpDriver || "SMTP (Default)"}
                          onChange={e => updateSystemConfigField("smtpDriver", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        >
                          <option value="SMTP (Default)">SMTP (Default)</option>
                          <option value="Sendmail">Sendmail</option>
                          <option value="Mailgun">Mailgun</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3.5 text-xs flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                      <span>
                        <strong>Configuration Active:</strong> These credentials will be used for all outgoing system emails including approvals and notifications.
                      </span>
                    </div>

                    {/* How to generate App Password Guide */}
                    <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
                      <h4 className="text-xs font-bold text-amber-800 flex items-center gap-2">
                        <Lightbulb size={14} className="text-amber-600" />
                        How to generate a Gmail App Password?
                      </h4>
                      <ol className="text-xs text-amber-700/90 list-decimal list-inside space-y-1.5 leading-relaxed">
                        <li>Go to your <a href="https://myaccount.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Account</a>.</li>
                        <li>Ensure <strong>2-Step Verification</strong> is ON in the Security tab.</li>
                        <li>Go directly to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">App Passwords</a>.</li>
                        <li>Select "Mail" and "Other (Custom name: MCC IGH)".</li>
                        <li>Copy the <strong>16-character code</strong> and paste it above.</li>
                        <li><em>Note: Do not include spaces when pasting; the system will handle it.</em></li>
                      </ol>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E67E2] uppercase tracking-wider flex items-center gap-2">
                      <Globe size={14} /> Social Media Links
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Facebook URL</label>
                        <input
                          type="text"
                          value={systemConfigData.facebookUrl || ""}
                          onChange={e => updateSystemConfigField("facebookUrl", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Instagram URL</label>
                        <input
                          type="text"
                          value={systemConfigData.instagramUrl || ""}
                          onChange={e => updateSystemConfigField("instagramUrl", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">Twitter URL</label>
                        <input
                          type="text"
                          value={systemConfigData.twitterUrl || ""}
                          onChange={e => updateSystemConfigField("twitterUrl", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold mb-1.5 block">LinkedIn URL</label>
                        <input
                          type="text"
                          value={systemConfigData.linkedinUrl || ""}
                          onChange={e => updateSystemConfigField("linkedinUrl", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 font-semibold mb-1.5 block">WhatsApp URL / Number</label>
                      <input
                        type="text"
                        value={systemConfigData.whatsappUrl || ""}
                        onChange={e => updateSystemConfigField("whatsappUrl", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-sm text-slate-800 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#1E67E2] transition"
                      />
                    </div>
                  </div>

                  {renderQuickSeoCard("home", "general")}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>
    </div>
  );
}
