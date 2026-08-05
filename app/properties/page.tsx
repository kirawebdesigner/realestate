import type { Metadata } from "next";
import { PropertyExplorer } from "@/components/property/property-explorer";
import { defaultFilters, type PropertyFilters } from "@/lib/property-filters";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse and filter sample apartments, villas, penthouses, townhouses and commercial properties across Addis Ababa.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function normalizePrice(value: string) {
  const cleaned = value.toUpperCase().replace(/ETB|,/g, "").trim();
  const number = Number.parseFloat(cleaned);
  if (!Number.isFinite(number)) return "";
  return String(cleaned.endsWith("M") ? number * 1_000_000 : number);
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sort = valueOf(params.sort);
  const initialFilters: PropertyFilters = {
    location: valueOf(params.location),
    type: valueOf(params.type),
    bedrooms: valueOf(params.bedrooms),
    minPrice: normalizePrice(valueOf(params.minPrice)),
    maxPrice: normalizePrice(valueOf(params.maxPrice)),
    status: valueOf(params.status),
    sort: sort === "price-low" || sort === "price-high" ? sort : defaultFilters.sort,
  };

  return (
    <>
      <header className="container-site pb-12 pt-16 md:pb-16 md:pt-24">
        <p className="eyebrow text-[#627117]">Property collection</p>
        <h1 className="page-heading mt-5 max-w-5xl">Find the space that fits next.</h1>
        <p className="lede mt-7">Use practical filters to compare sample homes and commercial spaces across Addis Ababa.</p>
      </header>
      <PropertyExplorer initialFilters={initialFilters} />
    </>
  );
}
