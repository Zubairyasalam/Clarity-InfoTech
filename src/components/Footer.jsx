"use client";

import { useState, useEffect } from "react";

const DEFAULT_FOOTER = {
  tagline1: "Smarter IT solutions,",
  tagline2: "powered by enterprise AI.",
  socialLabel: "Stay in touch!",
  discordUrl: "#",
  xUrl: "#",
  linkedinUrl: "#",
  githubUrl: "#",
  instagramUrl: "#",
  whatsappUrl: "#",
  copyright: "© 2026 Clarity InfoTech / Rain Corraya. All rights reserved.",
  companyLinks: [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms of Service", url: "/terms-of-service" },
    { label: "Refund Policy", url: "/refund-policy" }
  ],
  navLinks: [
    { label: "Home", url: "/" },
    { label: "About Us", url: "/about" },
    { label: "Our Services", url: "/our-services" },
    { label: "Gallery", url: "/gallery" },
    { label: "Contact", url: "/contact" }
  ]
};

export default function Footer() {
  const [footerData, setFooterData] = useState(DEFAULT_FOOTER);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_footer");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed) {
            if (parsed.navLinks) {
              parsed.navLinks = parsed.navLinks.filter(l => l.label !== "Our Projects" && l.label !== "Admin Portal");
              if (!parsed.navLinks.some(l => l.url === "/gallery")) {
                parsed.navLinks.push({ label: "Gallery", url: "/gallery" });
              }
              parsed.navLinks.forEach(l => {
                const lbl = l.label ? l.label.toLowerCase() : "";
                if (lbl.includes("home")) l.url = "/";
                else if (lbl.includes("about")) l.url = "/about";
                else if (lbl.includes("service")) l.url = "/our-services";
                else if (lbl.includes("gallery")) l.url = "/gallery";
                else if (lbl.includes("contact")) l.url = "/contact";
              });
              const linkOrder = ["/", "/about", "/our-services", "/gallery", "/contact"];
              parsed.navLinks.sort((a, b) => {
                const idxA = linkOrder.indexOf(a.url);
                const idxB = linkOrder.indexOf(b.url);
                return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
              });
            }
            if (parsed.companyLinks) {
              parsed.companyLinks = parsed.companyLinks.filter(l => 
                !["AWS & GCP Partner", "ISO 27001 Security", "DevOps Association"].includes(l.label)
              );
            }
            localStorage.setItem("clarity_footer", JSON.stringify(parsed));
            setFooterData(parsed);
          }
          // Dynamically read social URLs from clarity_system_config if available
          const storedSysConfig = localStorage.getItem("clarity_system_config");
          if (storedSysConfig) {
            try {
              const sysConfig = JSON.parse(storedSysConfig);
              if (sysConfig.facebookUrl) parsed.facebookUrl = sysConfig.facebookUrl;
              if (sysConfig.instagramUrl) parsed.instagramUrl = sysConfig.instagramUrl;
              if (sysConfig.twitterUrl) parsed.xUrl = sysConfig.twitterUrl;
              if (sysConfig.linkedinUrl) parsed.linkedinUrl = sysConfig.linkedinUrl;
            } catch (e) {}
          }
          
          setFooterData({ ...DEFAULT_FOOTER, ...parsed });
        } catch { }
      } else {
        localStorage.setItem("clarity_footer", JSON.stringify(DEFAULT_FOOTER));
      }
    }
  }, []);

  return (
    <section className="footer-section bg-white py-12 px-6 overflow-hidden text-left relative w-full">
      <style>{`
        .footer-wrapper {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 16px;
          align-items: stretch;
          position: relative;
          z-index: 10;
        }
        .footer-left {
          position: relative;
          min-height: 340px;
          border-radius: 28px;
          padding: 32px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(21, 76, 189, 0.25);
          background: #1e4fc0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .footer-left-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .footer-tagline-container {
          margin-top: auto;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .footer-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 19px;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.45;
        }
        .footer-tagline span {
          color: rgba(255, 255, 255, 0.65);
        }
        .footer-social-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .footer-social-label {
          font-family: 'Caveat', cursive;
          font-size: 18px;
          font-weight: 700;
          color: #000000 !important;
          letter-spacing: 0.3px;
        }
        .footer-social-icons {
          display: flex;
          gap: 7px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #0e1014;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          cursor: pointer;
        }
        .social-icon:hover {
          background: #000000;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.45);
        }
        .footer-right {
          background: #f0f1f5;
          border-radius: 28px;
          padding: 40px;
          overflow: visible;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .footer-lucky-graphic {
          position: absolute;
          top: -80px;
          right: 40px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .lucky-cube {
          width: 180px;
          height: 180px;
          border-radius: 22px;
          transform: rotate(-10deg);
          background: linear-gradient(135deg, #5b9ffb 0%, #1e5dd7 55%, #1448be 100%);
          box-shadow: inset 3px 3px 8px rgba(255,255,255,0.35), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(20,72,200,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lucky-text-row {
          display: flex;
          gap: 6px;
          align-items: center;
          transform: rotate(-4deg);
          margin-top: 4px;
        }
        .lucky-arrow {
          width: 22px;
          height: 22px;
          color: #9ca3af;
        }
        .lucky-text {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          font-weight: 600;
          color: #9ca3af;
          white-space: nowrap;
        }
        .footer-right-top {
          display: flex;
          gap: 72px;
          padding-top: 8px;
        }
        .footer-col-title {
          font-family: 'Caveat', cursive;
          font-size: 24px;
          font-weight: 600;
          font-style: italic;
          color: #9ca3af;
          margin-bottom: 18px;
        }
        .footer-col a {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col a:hover {
          color: #1f65d6;
        }
        .footer-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 48px;
        }
        .footer-copyright {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #9ca3af;
        }
        .footer-cta-mini {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-cta-mini h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.45;
        }
        .footer-cta-mini h4 strong {
          display: block;
          font-size: 19px;
          font-weight: 700;
          color: #111827;
        }
        .footer-subscribe-row {
          width: 310px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          display: flex;
        }
        .footer-subscribe-row input {
          flex: 1;
          padding: 11px 14px;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #111827;
        }
        .footer-subscribe-row input::placeholder {
          color: #9ca3af;
        }
        .footer-subscribe-row button {
          padding: 11px 22px;
          background: #111214;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          box-shadow: 0 6px 20px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .footer-subscribe-row button:hover {
          background: #000000;
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.35);
        }
        .footer-watermark {
          max-width: 720px;
          margin: 0 auto;
          pointer-events: none;
          user-select: none;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
          line-height: 0;
          opacity: 0.75;
        }
        .footer-watermark svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .footer-watermark text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          fill: rgba(0, 0, 0, 0.04);
        }
        @media (max-width: 860px) {
          .footer-wrapper {
            grid-template-columns: 1fr;
          }
          .footer-left {
            min-height: auto;
            gap: 40px;
          }
        }
        @media (max-width: 560px) {
          .footer-right {
            padding: 24px;
          }
          .footer-nav-cols {
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .footer-subscribe-row {
            width: 100%;
          }
          .footer-lucky-graphic {
            right: 12px;
            top: -60px;
          }
          .lucky-cube {
            width: 130px;
            height: 130px;
          }
        }
      `}</style>

      <div className="footer-wrapper">
        {/* Left Card */}
        <div className="footer-left">
          <video className="footer-left-video" autoPlay muted loop playsInline preload="auto">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>

          <div className="footer-logo">
            <img
              src="/logo.png"
              alt="Clarity InfoTech Logo"
              className="h-12 w-auto object-contain brightness-200 contrast-125 filter"
            />
          </div>

          <div className="footer-tagline-container">
            <div className="footer-tagline">
              {footerData.tagline1 || "Smarter IT solutions,"}<br />
              <span>{footerData.tagline2 || "powered by enterprise AI."}</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="footer-right">
          {/* Watermark SVG */}
          <div className="footer-watermark" aria-hidden="true">
            <svg id="watermarkSvg" viewBox="62 95 876 175" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <text id="watermarkText" x="500" y="240" textAnchor="middle" fontSize="210">Clarity</text>
            </svg>
          </div>



          {/* Top Navigation Cols */}
          <div className="footer-right-top">
            <div className="footer-nav-cols flex gap-16 md:gap-24">
              <div className="footer-col">
                <div className="footer-col-title">Navigation</div>
                {(footerData.navLinks || DEFAULT_FOOTER.navLinks).map((item, idx) => {
                  let href = item.url || "/";
                  const lbl = item.label ? item.label.toLowerCase() : "";
                  if (lbl.includes("home")) href = "/";
                  else if (lbl.includes("about")) href = "/about";
                  else if (lbl.includes("service")) href = "/our-services";
                  else if (lbl.includes("gallery")) href = "/gallery";
                  else if (lbl.includes("contact")) href = "/contact";
                  return (
                    <a key={idx} href={href}>
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="footer-col">
                <div className="footer-col-title">Company</div>
                {(footerData.companyLinks || DEFAULT_FOOTER.companyLinks).map((item, idx) => {
                  let href = item.url || "#";
                  if (item.label.toLowerCase().includes("privacy")) href = "/privacy-policy";
                  if (item.label.toLowerCase().includes("terms")) href = "/terms-of-service";
                  if (item.label.toLowerCase().includes("refund")) href = "/refund-policy";
                  return (
                    <a key={idx} href={href}>{item.label}</a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              {footerData.copyright || "© 2026 Clarity InfoTech / Rain Corraya. All rights reserved."}
            </div>

            <div className="footer-social-row flex items-center gap-3">
              <span className="footer-social-label text-[#111827]">{footerData.socialLabel || "Stay in touch!"}</span>
              <div className="footer-social-icons flex gap-2">
                {/* Discord */}
                <a href={footerData.discordUrl || "#"} className="social-icon" aria-label="Discord">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a href={footerData.xUrl || "#"} className="social-icon" aria-label="X">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href={footerData.linkedinUrl || "#"} className="social-icon" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                {/* GitHub */}
                <a href={footerData.githubUrl || "#"} className="social-icon" aria-label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href={footerData.instagramUrl || "#"} className="social-icon" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href={footerData.whatsappUrl || "#"} className="social-icon" aria-label="WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
