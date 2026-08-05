"use client";

import { Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { properties, neighborhoods, propertyStatuses, propertyTypes } from "@/data/properties";
import { defaultFilters, filterProperties, type PropertyFilters } from "@/lib/property-filters";
import { PropertyCard } from "./property-card";

export function PropertyExplorer({ initialFilters }: { initialFilters: PropertyFilters }) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const firstDrawerField = useRef<HTMLSelectElement>(null);
  const visibleProperties = useMemo(() => filterProperties(properties, filters), [filters]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    firstDrawerField.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  function updateFilter<Key extends keyof PropertyFilters>(key: Key, value: PropertyFilters[Key]) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const params = new URLSearchParams();
    Object.entries(next).forEach(([name, item]) => {
      if (item && !(name === "sort" && item === "newest")) params.set(name, item);
    });
    router.replace(`/properties${params.size ? `?${params}` : ""}`, { scroll: false });
  }

  function clearFilters() {
    setFilters(defaultFilters);
    router.replace("/properties", { scroll: false });
  }

  return (
    <div className="container-site pb-24">
      <div className="flex flex-col gap-5 border-b border-[var(--stone)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--muted)]" aria-live="polite">{visibleProperties.length} sample {visibleProperties.length === 1 ? "property" : "properties"}</p>
          <h2 className="mt-1 text-2xl font-extrabold">Refine your shortlist</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="button-secondary lg:hidden" onClick={() => setIsDrawerOpen(true)}><SlidersHorizontal size={18} />Filters</button>
          <label className="sr-only" htmlFor="sort-properties">Sort properties</label>
          <select id="sort-properties" className="control w-auto min-w-44" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value as PropertyFilters["sort"])}>
            <option value="newest">Newest first</option>
            <option value="price-low">Lowest price</option>
            <option value="price-high">Highest price</option>
          </select>
          <div className="flex rounded-[var(--radius-control)] border border-[var(--stone-dark)] p-1" aria-label="Property view">
            <ViewButton label="Grid view" active={view === "grid"} onClick={() => setView("grid")}><Grid2X2 size={18} /></ViewButton>
            <ViewButton label="List view" active={view === "list"} onClick={() => setView("list")}><List size={19} /></ViewButton>
          </div>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block" aria-label="Property filters">
          <div className="sticky top-24">
            <div className="flex items-center justify-between"><h2 className="font-extrabold">Filters</h2><button type="button" onClick={clearFilters} className="text-sm font-bold text-[#627117] hover:underline">Clear all</button></div>
            <FilterFields filters={filters} updateFilter={updateFilter} />
          </div>
        </aside>

        <section aria-label="Property results">
          {visibleProperties.length ? (
            <div className={view === "grid" ? "grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-7"}>
              {visibleProperties.map((property, index) => <PropertyCard key={property.id} property={property} view={view} priority={index < 3} />)}
            </div>
          ) : (
            <div className="grid min-h-96 place-items-center rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-8 text-center">
              <div>
                <SlidersHorizontal className="mx-auto" size={34} aria-hidden="true" />
                <h2 className="mt-5 font-display text-4xl font-semibold">No exact match yet.</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">Try widening the price range or clearing one of your filters.</p>
                <button type="button" className="button-primary mt-6" onClick={clearFilters}>Clear Filters</button>
              </div>
            </div>
          )}
        </section>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-[color:rgb(17_20_16_/_0.56)]" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[min(92vw,420px)] overflow-y-auto bg-[var(--canvas)] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 id="filter-drawer-title" className="text-xl font-extrabold">Filter properties</h2>
              <button type="button" className="icon-button" onClick={() => setIsDrawerOpen(false)} aria-label="Close filter drawer"><X size={20} /></button>
            </div>
            <FilterFields filters={filters} updateFilter={updateFilter} firstRef={firstDrawerField} />
            <div className="sticky bottom-0 mt-8 grid grid-cols-2 gap-3 bg-[var(--canvas)] py-4">
              <button type="button" className="button-secondary" onClick={clearFilters}>Clear</button>
              <button type="button" className="button-primary" onClick={() => setIsDrawerOpen(false)}>Show {visibleProperties.length}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterFields({ filters, updateFilter, firstRef }: { filters: PropertyFilters; updateFilter: <Key extends keyof PropertyFilters>(key: Key, value: PropertyFilters[Key]) => void; firstRef?: React.RefObject<HTMLSelectElement | null> }) {
  return (
    <div className="mt-6 grid gap-5">
      <FilterSelect ref={firstRef} label="Location" value={filters.location} options={neighborhoods} onChange={(value) => updateFilter("location", value)} />
      <FilterSelect label="Property type" value={filters.type} options={propertyTypes} onChange={(value) => updateFilter("type", value)} />
      <FilterSelect label="Bedrooms" value={filters.bedrooms} options={["1", "2", "3", "4", "5"]} onChange={(value) => updateFilter("bedrooms", value)} suffix="+" />
      <div className="grid grid-cols-2 gap-3">
        <FilterInput label="Minimum price" value={filters.minPrice} onChange={(value) => updateFilter("minPrice", value)} placeholder="10M" />
        <FilterInput label="Maximum price" value={filters.maxPrice} onChange={(value) => updateFilter("maxPrice", value)} placeholder="35M" />
      </div>
      <FilterSelect label="Status" value={filters.status} options={propertyStatuses} onChange={(value) => updateFilter("status", value)} />
    </div>
  );
}

function FilterSelect({ label, value, options, onChange, suffix = "", ref }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void; suffix?: string; ref?: React.Ref<HTMLSelectElement> }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select ref={ref} value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => <option key={option} value={option}>{option}{suffix}</option>)}
      </select>
    </label>
  );
}

function FilterInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="field"><span>{label}</span><input inputMode="numeric" value={value} onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))} placeholder={placeholder} /></label>;
}

function ViewButton({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} aria-pressed={active} onClick={onClick} className={`grid size-10 place-items-center rounded-[6px] ${active ? "bg-[var(--ink)] text-[var(--surface)]" : "text-[var(--muted)]"}`}>{children}</button>;
}
