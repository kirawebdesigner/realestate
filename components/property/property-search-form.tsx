import Form from "next/form";
import { Search } from "lucide-react";
import { neighborhoods, propertyTypes } from "@/data/properties";

export function PropertySearchForm() {
  return (
    <Form action="/properties" className="grid gap-3 rounded-[var(--radius-media)] border border-[color:rgb(255_255_255_/_0.35)] bg-[color:rgb(251_250_246_/_0.96)] p-4 shadow-[0_24px_60px_rgba(24,28,20,.18)] backdrop-blur-md md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_.8fr_.8fr_.7fr_auto]">
      <SearchSelect name="location" label="Location" options={neighborhoods} />
      <SearchSelect name="type" label="Property type" options={propertyTypes} />
      <SearchInput name="minPrice" label="Minimum price" placeholder="ETB 10M" />
      <SearchInput name="maxPrice" label="Maximum price" placeholder="ETB 35M" />
      <SearchSelect name="bedrooms" label="Bedrooms" options={["1", "2", "3", "4", "5"]} suffix="+" />
      <button type="submit" className="button-primary mt-auto min-h-12"><Search size={18} />Search</button>
    </Form>
  );
}

function SearchSelect({ name, label, options, suffix = "" }: { name: string; label: string; options: readonly string[]; suffix?: string }) {
  return (
    <label className="grid gap-1 text-xs font-bold text-[var(--muted)]">
      {label}
      <select name={name} className="min-h-11 rounded-[var(--radius-control)] bg-transparent text-sm font-semibold text-[var(--ink)] outline-none">
        <option value="">Any</option>
        {options.map((option) => <option key={option} value={option}>{option}{suffix}</option>)}
      </select>
    </label>
  );
}

function SearchInput({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
  return (
    <label className="grid gap-1 text-xs font-bold text-[var(--muted)]">
      {label}
      <input name={name} inputMode="numeric" placeholder={placeholder} className="min-h-11 bg-transparent text-sm font-semibold text-[var(--ink)] outline-none placeholder:text-[#767970]" />
    </label>
  );
}
