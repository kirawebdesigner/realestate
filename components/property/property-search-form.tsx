import Form from "next/form";
import { Search } from "lucide-react";
import { neighborhoods, propertyStatuses, propertyTypes } from "@/data/properties";

const bedroomOptions = [["1", "1 bedroom"], ["2", "2 bedrooms"], ["3", "3 bedrooms"], ["4", "4+ bedrooms"]] as const;

export function PropertySearchForm() {
  return (
    <section className="relative z-10 -mb-8 px-4 md:-mb-10" aria-labelledby="property-finder-title">
      <div className="mx-auto w-full max-w-[1240px] -translate-y-4 rounded-[18px] bg-[#0b1833] p-3 shadow-[0_24px_60px_rgb(11_24_51_/_0.2)] md:-translate-y-8 md:p-4">
        <h2 id="property-finder-title" className="sr-only">Find a property</h2>
        <details className="group md:[&>div]:block md:[&>summary]:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-1 text-white marker:content-none md:hidden">
            <span><span className="block text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9fb2ff]">Property finder</span><span className="mt-1 block text-lg font-extrabold">Find a property</span></span>
            <span className="rounded-[8px] border border-white/20 px-3 py-2 text-xs font-bold group-open:bg-white group-open:text-[#0b1833]">Filters</span>
          </summary>
          <div className="hidden pt-3 group-open:block md:pt-0">
            <Form action="/properties" className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-[1.45fr_1fr_.9fr_1fr_64px]">
          <SearchSelect name="location" label="Location" placeholder="Search by location" options={neighborhoods.map((item) => [item, item] as const)} />
          <SearchSelect name="type" label="Property type" placeholder="Property type" options={propertyTypes.map((item) => [item, item] as const)} />
          <SearchSelect name="bedrooms" label="Bedrooms" placeholder="Any bedrooms" options={bedroomOptions} />
          <SearchSelect name="status" label="Property status" placeholder="Any status" options={propertyStatuses.map((item) => [item, item] as const)} />
          <button type="submit" className="flex min-h-14 items-center justify-center gap-2 rounded-[10px] border border-[#3156d3] bg-[#3156d3] px-5 font-extrabold text-white transition-[background-color,transform] duration-200 hover:bg-[#2648bd] active:scale-[.98] xl:px-0" aria-label="Search properties"><Search size={21} strokeWidth={2} aria-hidden="true" /><span className="xl:sr-only">Search properties</span></button>
            </Form>
          </div>
        </details>
      </div>
    </section>
  );
}

function SearchSelect({ name, label, placeholder, options }: { name: string; label: string; placeholder: string; options: readonly (readonly [string, string])[] }) {
  return <label className="grid min-w-0 gap-1 rounded-[10px] border border-white/15 bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#697586] transition-[border-color,box-shadow] focus-within:border-[#3156d3] focus-within:shadow-[0_0_0_3px_rgb(49_86_211_/_0.18)]">{label}<select name={name} defaultValue="" className="min-h-7 w-full cursor-pointer appearance-auto bg-transparent text-sm font-bold normal-case tracking-normal text-[#0b1220] outline-none"><option value="">{placeholder}</option>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>;
}
