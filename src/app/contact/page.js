"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  Globe,
  Share2
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import HeroBannerSlider from "@/components/HeroBannerSlider";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const [seoConfig, setSeoConfig] = useState({
    imageAlt: "Contact Clarity InfoTech",
    imageTitle: "Clarity InfoTech Doha Office Location Map"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.contact) {
            setSeoConfig(config.contact);
          }
        } catch (e) { }
      }
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    otherService: "",
    message: "",
    recaptcha: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 400) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.recaptcha) {
      alert("Please verify the reCAPTCHA checkbox before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      let smtpConfig = null;
      try {
        const storedConfig = localStorage.getItem("clarity_system_config");
        if (storedConfig) {
          smtpConfig = JSON.parse(storedConfig);
        }
      } catch (e) {}

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, smtpConfig }),
      });

      const data = await res.json();

      // Push new inquiry to clarity_inquiries localStorage
      const newInquiry = {
        id: "inq-" + Date.now(),
        name: formData.name,
        email: formData.email,
        company: formData.company || "N/A",
        service: formData.service === "Other" && formData.otherService ? formData.otherService : formData.service,
        message: formData.message,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: "unread",
        priority: "high"
      };
      try {
        const storedInqs = localStorage.getItem("clarity_inquiries");
        const parsed = storedInqs ? JSON.parse(storedInqs) : [];
        localStorage.setItem("clarity_inquiries", JSON.stringify([newInquiry, ...parsed]));
      } catch { }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          otherService: "",
          message: "",
          recaptcha: false,
        });
      }, 4000);
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
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

  useEffect(() => {
    const storedHeader = localStorage.getItem("clarity_header");
    if (storedHeader) {
      try {
        const parsed = JSON.parse(storedHeader);
        if (parsed && parsed.links) {
          const originalStr = JSON.stringify(parsed);
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
          const newStr = JSON.stringify(parsed);
          if (newStr !== originalStr) {
            localStorage.setItem("clarity_header", newStr);
          }
          setHeaderData(parsed);
        }
      } catch { }
    }

    const storedContact = localStorage.getItem("clarity_page_contact");
    if (storedContact) {
      try {
        const parsed = JSON.parse(storedContact);
        setPageContactData({ ...DEFAULT_PAGE_CONTACT, ...parsed });
      } catch { }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-navy font-sans flex flex-col relative overflow-x-hidden selection:bg-sky-400 selection:text-white">
      <SEOMetadata pageKey="contact" />
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {headerData.links.map((link) => {
              const isActive = link.label === "Contact";
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

          {/* Mobile Menu Button */}
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
                      link.label === "Contact" ? "text-indigo-600 font-bold" : "text-slate-700 hover:text-indigo-600"
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
        {/* 2. HERO SLIDER BANNER SECTION */}
        <HeroBannerSlider
          slides={[
            {
              id: 1,
              title: "Ready to Transform",
              highlight: "Your Business?",
              description: "Ready to transform your business with cutting-edge technology? Let's discuss your project and bring your vision to life.",
              buttonText: "Send Us a Message",
              buttonLink: "#recaptcha",
              slideLabel: "Get In Touch",
              image: "/carousel-1.png"
            },
            {
              id: 2,
              title: "Get In Touch With",
              highlight: "Our Engineering Squad",
              description: "Our software engineering team will review your message and get back to you within 24 hours.",
              buttonText: "Fill Contact Form",
              buttonLink: "#recaptcha",
              slideLabel: "Squad Support",
              image: "/carousel-2.png"
            },
            {
              id: 3,
              title: "Head Office & Global",
              highlight: "Client Support",
              description: "PO Box 200388, Doha, Qatar | Direct phone and email support for enterprise clients worldwide.",
              buttonText: "Head Office Info",
              buttonLink: "#office-info",
              slideLabel: "Doha HQ",
              image: "/carousel-3.png"
            },
            {
              id: 4,
              title: "Start Your Project",
              highlight: "With Clarity InfoTech",
              description: "Reach out today to discuss custom software development, cloud migration, AI models, or security audits.",
              buttonText: "Contact Us Now",
              buttonLink: "#recaptcha",
              slideLabel: "Start Project",
              image: "/carousel-4.png"
            }
          ]}
          seoConfig={seoConfig}
          badge={pageContactData.heroBadge || "CONTACT US"}
        />

        {/* 3. CONTACT FORM CARD SECTION */}
        <section className="px-4 sm:px-6 max-w-4xl mx-auto relative z-20 py-10 sm:py-16 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100/80"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 font-sans">
              {pageContactData.formTitlePrefix || "Send Us a"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {pageContactData.formTitleHighlight || "Message"}
              </span>
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-800 my-6"
              >
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-1">Message Sent Successfully!</h3>
                <p className="text-sm text-emerald-700">
                  Thank you for reaching out. Our engineering team will review your message and get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2 font-sans">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans shadow-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2 font-sans">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans shadow-xs"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2 font-sans">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans shadow-xs"
                    />
                  </div>

                  {/* Project Type / Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2 font-sans">
                      Project Type / Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans appearance-none cursor-pointer shadow-xs"
                    >
                      <option value="" className="bg-white text-slate-900">Select a service</option>
                      <option value="Web Development" className="bg-white text-slate-900">Web Development</option>
                      <option value="Mobile Apps" className="bg-white text-slate-900">Mobile Apps</option>
                      <option value="Cloud Services" className="bg-white text-slate-900">Cloud & DevOps Services</option>
                      <option value="AI Solutions" className="bg-white text-slate-900">Enterprise AI & RAG</option>
                      <option value="Cybersecurity" className="bg-white text-slate-900">Cybersecurity Audit</option>
                      <option value="Data Analytics" className="bg-white text-slate-900">Data Analytics</option>
                      <option value="Other" className="bg-white text-slate-900">Other</option>
                    </select>
                    {formData.service === "Other" && (
                      <div className="mt-3">
                        <input
                          type="text"
                          required
                          placeholder="Please specify"
                          value={formData.otherService}
                          onChange={(e) => setFormData({ ...formData, otherService: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans shadow-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details / Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2 font-sans">
                    Project Details / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you'd like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans resize-none shadow-xs"
                  />
                </div>

                {/* Bottom Row: reCAPTCHA & Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                  {/* reCAPTCHA Widget Box */}
                  <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-300 rounded-xl w-full sm:w-auto">
                    <input
                      type="checkbox"
                      id="recaptcha"
                      checked={formData.recaptcha}
                      onChange={(e) => setFormData({ ...formData, recaptcha: e.target.checked })}
                      className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="recaptcha" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                      I'm not a robot
                    </label>
                    <div className="ml-4 flex flex-col items-center justify-center text-[9px] text-slate-500 leading-tight">
                      <svg className="w-5 h-5 text-blue-500 mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                      reCAPTCHA
                    </div>
                  </div>

                  {/* Send Message Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={16} />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-4 text-center font-medium">{error}</p>}
              </form>
            )}
          </motion.div>
        </section>

        {/* 4. HEAD OFFICE & MAP SECTION */}
        <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100/80 grid md:grid-cols-2"
          >
            {/* Left Info Column */}
            <div className="p-8 sm:p-10 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                  {pageContactData.officeTitle || "Head Office"}
                </h3>
              </div>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Address</span>
                    <span>{pageContactData.officeAddress || "PO Box 200388, Doha, Qatar"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Phone</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {(pageContactData.officePhone || "+974 5029 8525, +974 5995 5100")
                        .split(",")
                        .map((phoneNum, idx, arr) => {
                          const trimmed = phoneNum.trim();
                          return (
                            <span key={idx} className="inline-flex items-center">
                              <a
                                href={`tel:${trimmed.replace(/\s+/g, '')}`}
                                className="hover:text-blue-600 transition-colors cursor-pointer select-text font-medium"
                              >
                                {trimmed}
                              </a>
                              {idx < arr.length - 1 && <span className="text-slate-400 mr-1.5">,</span>}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Email</span>
                    <a href={`mailto:${pageContactData.officeEmail}`} className="hover:text-blue-600 transition-colors">
                      {pageContactData.officeEmail || "info@clarity-infotech.com"}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Column */}
            <div className="h-64 md:h-full min-h-[300px] w-full relative bg-slate-100">
              <iframe
                title="Clarity InfoTech Head Office Map"
                src={pageContactData.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115482.38557991349!2d51.44234586524317!3d25.285447333555504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-xl flex items-center justify-center hover:bg-indigo-500 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
