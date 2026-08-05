"use client";

import { useEffect } from "react";

// Preconfigured defaults for each page key
const FALLBACK_SEO_DATA = {
  home: {
    title: "Clarity InfoTech | Enterprise Software Engineering & Cloud Solutions",
    description: "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems with 24/7 reliability.",
    keywords: "Clarity InfoTech, software engineering, DevOps, cloud architecture, security audit, custom software, React, Next.js",
    canonical: "https://clarityinfotech.com",
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
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Clarity InfoTech",
      "url": "https://clarityinfotech.com",
      "logo": "https://clarityinfotech.com/logo.png"
    }, null, 2)
  },
  about: {
    title: "About Us | Clarity InfoTech - Premium Software Engineering Squad",
    description: "Learn more about our elite team of engineers, developers, and architects. We help corporations automate systems and scale cloud deployments.",
    keywords: "about clarity, tech engineering team, software development company, Prince Infocity",
    canonical: "https://clarityinfotech.com/about",
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
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Clarity InfoTech",
      "description": "Learn about our development team and corporate locations in India."
    }, null, 2)
  },
  projects: {
    title: "Our Projects & Case Studies | Clarity InfoTech",
    description: "Explore our success stories. From Kubernetes deployments for fintech platforms to security readyness audits for legacy systems.",
    keywords: "case studies, kubernetes migration, cloud security review, portfolio",
    canonical: "https://clarityinfotech.com/services",
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
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Clarity InfoTech Projects",
      "description": "Case studies of enterprise cloud migrations and security audits."
    }, null, 2)
  },
  services: {
    title: "Our Services | Software Architecture & DevOps Automation",
    description: "We design high-throughput cloud strategies, automated DevOps pipelines, bespoke web and mobile platforms, and advanced AI systems.",
    keywords: "devops automation, bespoke software, cloud migration, cyber security audit",
    canonical: "https://clarityinfotech.com/our-services",
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
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Bespoke Software Development & DevOps Consultation",
      "provider": {
        "@type": "Organization",
        "name": "Clarity InfoTech"
      }
    }, null, 2)
  },
  gallery: {
    title: "Gallery | Clarity InfoTech - Media Showcase",
    description: "Explore the visual journey of Clarity InfoTech. Photos, event coverage, highlights, and office environment.",
    keywords: "clarity infotech gallery, photos, tech workspace, corporate showcase",
    canonical: "https://clarityinfotech.com/gallery",
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
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Clarity InfoTech Photo Gallery",
      "description": "Photos of projects, events, and highlights from Clarity InfoTech."
    }, null, 2)
  },
  contact: {
    title: "Contact Us | Reach Clarity InfoTech Squad",
    description: "Get in touch with us to discuss your enterprise workloads. Headquarters at PO Box 200388, Doha, Qatar.",
    keywords: "contact developers, hire software squad, PO Box 200388 Doha Qatar, Doha office",
    canonical: "https://clarityinfotech.com/contact",
    robotsIndex: "index",
    robotsFollow: "follow",
    ogTitle: "Contact Us | Clarity InfoTech",
    ogDescription: "Reach our software squads at our headquarters in PO Box 200388, Doha, Qatar.",
    ogImage: "https://clarityinfotech.com/logo.png",
    ogUrl: "https://clarityinfotech.com/contact",
    ogType: "website",
    twitterTitle: "Contact Us | Clarity InfoTech",
    twitterDescription: "Reach our software squads and visit our offices in India.",
    twitterImage: "https://clarityinfotech.com/logo.png",
    twitterCardType: "summary_large_image",
    schemaJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Clarity InfoTech",
      "description": "Phone number, email address, physical location, and contact form."
    }, null, 2)
  },
  privacy: {
    title: "Privacy Policy | Clarity InfoTech CIT",
    description: "Read our corporate Privacy Policy explaining how we secure, process, and safeguard your data.",
    keywords: "privacy policy, cookies tracking, security data retention",
    canonical: "https://clarityinfotech.com/privacy-policy",
    robotsIndex: "noindex",
    robotsFollow: "follow",
    schemaJson: "{}"
  },
  terms: {
    title: "Terms and Conditions | Clarity InfoTech CIT",
    description: "Read our corporate terms and conditions of usage of our cloud services and custom solutions.",
    keywords: "terms and conditions, intellectual property, service SLA",
    canonical: "https://clarityinfotech.com/terms-of-service",
    robotsIndex: "noindex",
    robotsFollow: "follow",
    schemaJson: "{}"
  },
  refund: {
    title: "Refund Policy | Clarity InfoTech",
    description: "Read our corporate refund and milestone cancellation policy.",
    keywords: "refund scope, milestone cancellation",
    canonical: "https://clarityinfotech.com/refund-policy",
    robotsIndex: "noindex",
    robotsFollow: "follow",
    schemaJson: "{}"
  }
};

export default function SEOMetadata({ pageKey = "home" }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let pageConfig = FALLBACK_SEO_DATA[pageKey] || FALLBACK_SEO_DATA.home;
      
      const stored = localStorage.getItem("clarity_seo_data");
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config[pageKey]) {
            pageConfig = { ...pageConfig, ...config[pageKey] };
          }
        } catch (e) {
          console.error("Error parsing SEO data:", e);
        }
      }

      // Helper function to set or update meta tag
      const setMetaTag = (attrName, attrValue, content) => {
        let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attrName, attrValue);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content || "");
      };

      // 1. Basic SEO Metadata
      document.title = pageConfig.title || "";
      setMetaTag("name", "description", pageConfig.description);
      setMetaTag("name", "keywords", pageConfig.keywords);

      // 2. Canonical URL
      if (pageConfig.canonical) {
        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (!canonicalEl) {
          canonicalEl = document.createElement("link");
          canonicalEl.setAttribute("rel", "canonical");
          document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute("href", pageConfig.canonical);
      }

      // 3. Robots
      const robotsIndex = pageConfig.robotsIndex || "index";
      const robotsFollow = pageConfig.robotsFollow || "follow";
      setMetaTag("name", "robots", `${robotsIndex}, ${robotsFollow}`);

      // 4. Open Graph
      if (pageConfig.ogTitle) setMetaTag("property", "og:title", pageConfig.ogTitle);
      if (pageConfig.ogDescription) setMetaTag("property", "og:description", pageConfig.ogDescription);
      if (pageConfig.ogImage) setMetaTag("property", "og:image", pageConfig.ogImage);
      if (pageConfig.ogUrl) setMetaTag("property", "og:url", pageConfig.ogUrl);
      if (pageConfig.ogType) setMetaTag("property", "og:type", pageConfig.ogType);

      // 5. Twitter Card
      if (pageConfig.twitterTitle) setMetaTag("name", "twitter:title", pageConfig.twitterTitle);
      if (pageConfig.twitterDescription) setMetaTag("name", "twitter:description", pageConfig.twitterDescription);
      if (pageConfig.twitterImage) setMetaTag("name", "twitter:image", pageConfig.twitterImage);
      if (pageConfig.twitterCardType) setMetaTag("name", "twitter:card", pageConfig.twitterCardType);

      // 6. JSON-LD Structured Data
      let oldJsonLd = document.getElementById(`jsonld-${pageKey}`);
      if (oldJsonLd) {
        oldJsonLd.remove();
      }

      if (pageConfig.schemaJson && pageConfig.schemaJson.trim() !== "{}") {
        try {
          // Verify it's valid JSON
          JSON.parse(pageConfig.schemaJson);
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.id = `jsonld-${pageKey}`;
          script.innerHTML = pageConfig.schemaJson;
          document.head.appendChild(script);
        } catch (err) {
          console.error("Invalid JSON-LD format in SEO config:", err);
        }
      }
    }
  }, [pageKey]);

  return null;
}
