import type { Property } from "@/types/property";

export interface PropertyFilters {
  location: string;
  type: string;
  bedrooms: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  sort: "newest" | "price-low" | "price-high";
}

export const defaultFilters: PropertyFilters = {
  location: "",
  type: "",
  bedrooms: "",
  minPrice: "",
  maxPrice: "",
  status: "",
  sort: "newest",
};

export function filterProperties(items: Property[], filters: PropertyFilters) {
  const min = Number(filters.minPrice) || 0;
  const max = Number(filters.maxPrice) || Number.POSITIVE_INFINITY;
  const bedrooms = Number(filters.bedrooms);

  return items
    .filter((property) => !filters.location || property.neighborhood === filters.location)
    .filter((property) => !filters.type || property.propertyType === filters.type)
    .filter((property) => !filters.bedrooms || property.bedrooms >= bedrooms)
    .filter((property) => property.price >= min && property.price <= max)
    .filter((property) => !filters.status || property.status === filters.status)
    .sort((a, b) => {
      if (filters.sort === "price-low") return a.price - b.price;
      if (filters.sort === "price-high") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export function formatCompactEtb(value: number) {
  return value >= 1_000_000 ? `${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}M` : value.toLocaleString();
}
