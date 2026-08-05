"use client";

import { useState, useEffect } from "react";
import { Shield, FileText, ArrowLeft, Sparkles, Globe } from "lucide-react";
import SEOMetadata from "@/components/SEOMetadata";

export default function RefundPolicyPage() {
  const DEFAULT_LEGAL_PAGES = {
    refundTitle: "Refund Policy",
    refundSubtitle: "Last updated: July 29, 2026",
    refundContent: "### 1. Refund Scope\nWe provide high-quality custom software engineering and cloud consulting. Refunds are processed based on milestone deliverables.\n\n### 2. Milestone Payments\nPayment for successfully completed and accepted milestones is non-refundable.\n\n### 3. Project Cancellation\nIf a project is cancelled by the client during development, we reserve the right to bill for all hours worked up to the cancellation notice date."
  };

  const [legalData, setLegalData] = useState(DEFAULT_LEGAL_PAGES);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_legal_pages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.refundContent) {
          setLegalData({ ...DEFAULT_LEGAL_PAGES, ...parsed });
        } else {
          setLegalData(DEFAULT_LEGAL_PAGES);
        }
      } catch {
        setLegalData(DEFAULT_LEGAL_PAGES);
      }
    }
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
    const storedHeader = localStorage.getItem("clarity_header");
    if (storedHeader) {
      try {
        const parsed = JSON.parse(storedHeader);
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
  }, []);

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
        return <h3 key={idx} className="text-base font-bold text-slate-800 mt-6 mb-2.5 font-sans">{renderLineContent(title)}</h3>;
      }
      if (cleanLine.startsWith("## ")) {
        const title = cleanLine.substring(3);
        return <h2 key={idx} className="text-lg font-extrabold text-slate-800 mt-8 mb-3 font-sans">{renderLineContent(title)}</h2>;
      }
      if (cleanLine.startsWith("# ")) {
        const title = cleanLine.substring(2);
        return <h1 key={idx} className="text-xl font-black text-slate-850 mt-10 mb-4 font-sans">{renderLineContent(title)}</h1>;
      }
      if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
        const clean = cleanLine.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc list-inside mb-1.5 text-slate-655 text-sm font-sans pl-1">
            {renderLineContent(clean)}
          </li>
        );
      }
      if (cleanLine === "") {
        return <div key={idx} className="h-2" />;
      }
      if (cleanLine.startsWith("**") && cleanLine.endsWith("**")) {
        const clean = cleanLine.replace(/\*\*/g, "");
        return <p key={idx} className="text-sm font-bold text-slate-800 mt-4 mb-2 font-sans">{clean}</p>;
      }
      return (
        <p key={idx} className="text-sm text-slate-600 leading-relaxed mb-3.5 font-sans">
          {renderLineContent(line.replace(/\r/g, ""))}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col">
      <SEOMetadata pageKey="refund" />
      {/* Navbar */}
      <header className="bg-white border-b border-slate-100 h-16 md:h-20 flex items-center sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={headerData.logo} alt="Clarity InfoTech Logo" className="h-8 md:h-10 w-auto object-contain" />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {headerData.links.map((link) => (
              <a key={link.label} href={link.url} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 md:py-16 grid md:grid-cols-4 gap-8">
        {/* Left Side Navigation */}
        <aside className="md:col-span-1 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-3 mb-2">Legal Policies</span>
          {[
            { label: "Privacy Policy", url: "/privacy-policy", active: false },
            { label: "Terms of Service", url: "/terms-of-service", active: false },
            { label: "Refund Policy", url: "/refund-policy", active: true }
          ].map((item) => (
            <a
              key={item.label}
              href={item.url}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Shield size={14} />
              {item.label}
            </a>
          ))}
          <div className="pt-6">
            <a href="/" className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
              <ArrowLeft size={12} /> Back to Home
            </a>
          </div>
        </aside>

        {/* Right Content Column */}
        <section className="md:col-span-3 bg-white rounded-3xl border border-slate-100 p-8 md:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              <Sparkles size={12} /> Billing
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{legalData.refundTitle}</h1>
            <p className="text-xs text-slate-400 mt-2 font-medium">{legalData.refundSubtitle}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed font-sans">
            {renderFormattedContent(legalData.refundContent)}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 Clarity InfoTech. All rights reserved.</p>
      </footer>
    </div>
  );
}
