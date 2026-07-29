"use client";

import { useState, useEffect } from "react";
import { Shield, FileText, ArrowLeft, Sparkles, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
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
* **Chennai Office**: Prince Infocity 1, 8th Floor, 286/1, OMR, Kandhanchavadi, Chennai, Tamil Nadu-600096, India.
* **Coimbatore Office**: Mikro Grafeio, 1st Floor, 766, 767, Puliakulam Road, Coimbatore, Tamil Nadu-641037, India.`
  };

  const [legalData, setLegalData] = useState(DEFAULT_LEGAL_PAGES);

  useEffect(() => {
    const stored = localStorage.getItem("clarity_legal_pages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.privacyContent && parsed.privacyContent.length >= 500) {
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

  const renderFormattedContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content = line;
      let isBoldLine = false;
      if (content.startsWith("**") && content.endsWith("**")) {
        content = content.replace(/\*\*/g, "");
        isBoldLine = true;
      }

      const renderLineContent = (str) => {
        const parts = str.split(/\*\*([^*]+)\*\*/g);
        if (parts.length === 1) return str;
        return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-slate-800">{part}</strong> : part));
      };

      if (line.startsWith("### ")) {
        const title = line.replace("### ", "");
        return <h3 key={idx} className="text-base font-bold text-slate-800 mt-6 mb-2.5 font-sans">{renderLineContent(title)}</h3>;
      }
      if (line.startsWith("## ")) {
        const title = line.replace("## ", "");
        return <h2 key={idx} className="text-lg font-extrabold text-slate-800 mt-8 mb-3 font-sans">{renderLineContent(title)}</h2>;
      }
      if (line.startsWith("# ")) {
        const title = line.replace("# ", "");
        return <h1 key={idx} className="text-xl font-black text-slate-850 mt-10 mb-4 font-sans">{renderLineContent(title)}</h1>;
      }
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const clean = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc pl-1 mb-1.5 text-slate-650 text-sm font-sans">
            {renderLineContent(clean)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      if (isBoldLine) {
        return <p key={idx} className="text-sm font-bold text-slate-800 mt-4 mb-2 font-sans">{content}</p>;
      }
      return (
        <p key={idx} className="text-sm text-slate-600 leading-relaxed mb-3.5 font-sans">
          {renderLineContent(content)}
        </p>
      );
    });
  };

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
            { label: "Privacy Policy", url: "/privacy-policy", active: true },
            { label: "Terms of Service", url: "/terms-of-service", active: false },
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
              <Sparkles size={12} /> Compliance
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{legalData.privacyTitle}</h1>
            <p className="text-xs text-slate-400 mt-2 font-medium">{legalData.privacySubtitle}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed font-sans">
            {renderFormattedContent(legalData.privacyContent)}
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
