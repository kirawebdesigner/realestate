import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { cpus: 1 },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/kira/index.html" },
        { source: "/about", destination: "/kira/about/index.html" },
        { source: "/properties", destination: "/kira/properties/index.html" },
        { source: "/property-details", destination: "/kira/property-details/index.html" },
        { source: "/blog", destination: "/kira/blog/index.html" },
        { source: "/blog/home-staging-tips-to-attract-buyers-quickly", destination: "/kira/blog/home-staging-tips-to-attract-buyers-quickly/index.html" },
        { source: "/blog/principles-for-beautiful-buildings", destination: "/kira/blog/principles-for-beautiful-buildings/index.html" },
        { source: "/blog/checklist-for-first-time-home-buyers", destination: "/kira/blog/checklist-for-first-time-home-buyers/index.html" },
        { source: "/2025/10/07/home-staging-tips-to-attract-buyers-quickly", destination: "/kira/blog/home-staging-tips-to-attract-buyers-quickly/index.html" },
        { source: "/kira/2025/10/07/home-staging-tips-to-attract-buyers-quickly", destination: "/kira/blog/home-staging-tips-to-attract-buyers-quickly/index.html" },
        { source: "/2025/10/07/10-principles-for-creating-beautiful-buildings", destination: "/kira/blog/principles-for-beautiful-buildings/index.html" },
        { source: "/kira/2025/10/07/10-principles-for-creating-beautiful-buildings", destination: "/kira/blog/principles-for-beautiful-buildings/index.html" },
        { source: "/2025/10/07/the-ultimate-checklist-for-first-time-home-buyers", destination: "/kira/blog/checklist-for-first-time-home-buyers/index.html" },
        { source: "/kira/2025/10/07/the-ultimate-checklist-for-first-time-home-buyers", destination: "/kira/blog/checklist-for-first-time-home-buyers/index.html" },
        { source: "/our-process", destination: "/kira/our-process/index.html" },
        { source: "/agents", destination: "/kira/agents/index.html" },
        { source: "/services", destination: "/kira/services/index.html" },
        { source: "/service-details", destination: "/kira/service-details/index.html" },
        { source: "/contact", destination: "/kira/contact/index.html" },
        { source: "/terms-and-conditions", destination: "/kira/terms-and-conditions/index.html" },
        { source: "/privacy-policy", destination: "/kira/privacy-policy-2/index.html" },
        { source: "/privacy-policy-2", destination: "/kira/privacy-policy-2/index.html" },
        { source: "/404-error", destination: "/kira/404-error/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
