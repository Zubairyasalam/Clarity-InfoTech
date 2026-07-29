"use client";

import { useState, useEffect } from "react";
import { Shield, FileText, ArrowLeft, Sparkles, Globe } from "lucide-react";

export default function TermsOfServicePage() {
  const DEFAULT_LEGAL_PAGES = {
    termsTitle: "Terms of Service",
    termsSubtitle: "Last updated: July 29, 2026",
    termsContent: "### 1. Terms of Engagement\nBy accessing and engaging Clarity InfoTech, you agree to comply with and be bound by these Terms of Service.\n\n### 2. Intellectual Property\nUpon final project completion and full payment receipt, 100% intellectual property ownership of the custom codebase is transferred to your organization.\n\n### 3. Limitation of Liability\nIn no event shall we be liable for any indirect, incidental, or consequential damages resulting from platform downtime or telemetry outages."
  };

  const [legalData, setLegalData] = useState(DEFAULT_LEGAL_PAGES);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_legal_pages");
    if (stored) {
      try { setLegalData({ ...DEFAULT_LEGAL_PAGES, ...JSON.parse(stored) }); } catch { }
    }
  }, []);

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
  useEffect(() => {
    const storedHeader = localStorage.getItem("clarity_header");
    if (storedHeader) {
      try { setHeaderData(JSON.parse(storedHeader)); } catch { }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col">
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
            { label: "Terms of Service", url: "/terms-of-service", active: true },
            { label: "Refund Policy", url: "/refund-policy", active: false }
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
              <Sparkles size={12} /> Terms
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{legalData.termsTitle}</h1>
            <p className="text-xs text-slate-400 mt-2 font-medium">{legalData.termsSubtitle}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {legalData.termsContent}
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
