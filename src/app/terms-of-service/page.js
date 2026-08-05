"use client";

import { useState, useEffect } from "react";
import { Shield, FileText, ArrowLeft, Sparkles, Globe } from "lucide-react";
import SEOMetadata from "@/components/SEOMetadata";

export default function TermsOfServicePage() {
  const DEFAULT_LEGAL_PAGES = {
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
These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.

### 10. Contact Information
For questions about these Terms and Conditions, please contact us at info@clarity-infotech.com or visit:

**Clarity InfoTech**
* **Headquarters**: PO Box 200388, Doha, Qatar.`
  };

  const [legalData, setLegalData] = useState(DEFAULT_LEGAL_PAGES);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_legal_pages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.termsContent) {
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
      <SEOMetadata pageKey="terms" />
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

          <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed font-sans">
            {renderFormattedContent(legalData.termsContent)}
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
