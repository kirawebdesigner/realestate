import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { developments } from "@/data/properties";

export const metadata: Metadata = {
  title: "Developments",
  description: "Explore sample residential and mixed-use developments across Addis Ababa, including project stories, unit types and starting prices.",
};

export default function DevelopmentsPage() {
  return (
    <>
      <header className="container-site pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="eyebrow text-[#627117]">Signature developments</p>
        <h1 className="page-heading mt-5 max-w-6xl">Projects with a clear sense of place.</h1>
        <p className="lede mt-7">Sample developments presented with the context, unit choices and construction information buyers need.</p>
      </header>
      <div className="container-site pb-24 md:pb-32">
        {developments.map((development, index) => (
          <article id={development.slug} key={development.slug} className="scroll-mt-28 border-t border-[var(--stone)] py-10 md:py-16">
            <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${index % 2 ? "" : ""}`}>
              <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
                <Image src={development.image.src} alt={development.image.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              </div>
              <div className={`lg:col-span-5 ${index % 2 ? "lg:order-1 lg:pr-12" : "lg:pl-12"}`}>
                <div className="flex items-center gap-2 text-xs font-bold text-[#627117]"><Building2 size={16} />{development.type}</div>
                <h2 className="mt-5 font-display text-5xl font-semibold leading-[.9] md:text-7xl">{development.name}</h2>
                <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]"><MapPin size={16} />{development.location}</p>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--muted)]">{development.story}</p>
                <dl className="mt-8 grid gap-5 border-t border-[var(--stone)] pt-6 sm:grid-cols-2">
                  <div><dt className="text-xs font-bold text-[var(--muted)]">Status</dt><dd className="mt-1 text-sm font-extrabold">{development.status}</dd></div>
                  <div><dt className="text-xs font-bold text-[var(--muted)]">Price</dt><dd className="mt-1 text-sm font-extrabold">{development.startingPrice}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">{development.unitTypes.map((unit) => <span key={unit} className="rounded-[var(--radius-control)] border border-[var(--stone)] px-3 py-2 text-xs font-bold">{unit}</span>)}</div>
                <Link href={`/properties?location=${encodeURIComponent(development.location.split(",")[0])}`} className="button-primary mt-8">View Available Units<ArrowRight size={18} /></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
