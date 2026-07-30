"use client";

import { useEffect } from "react";

export default function SEOMetadata() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("clarity_system_config");
      let title = "Clarity InfoTech | Enterprise Software Engineering & Cloud Solutions";
      let description = "Clarity InfoTech delivers enterprise-grade software engineering, DevOps automation, cloud architecture, and security audit systems with 24/7 reliability.";
      let keywords = "Clarity InfoTech, software engineering, DevOps, cloud architecture, security audit, custom software, React, Next.js";

      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.seoTitle) title = config.seoTitle;
          if (config.seoDescription) description = config.seoDescription;
          if (config.seoKeywords) keywords = config.seoKeywords;
        } catch (e) {
          console.error("Error parsing system config for SEO:", e);
        }
      }

      // Update document title
      document.title = title;

      // Update or create meta description tag
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;

      // Update or create meta keywords tag
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
  }, []);

  return null;
}
