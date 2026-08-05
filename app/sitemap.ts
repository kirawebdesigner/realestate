import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { properties } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/properties", "/developments", "/services", "/about", "/contact"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .8 })),
    ...properties.map((property) => ({ url: `${siteConfig.url}/properties/${property.slug}`, lastModified: new Date(property.createdAt), changeFrequency: "monthly" as const, priority: .7 })),
  ];
}
