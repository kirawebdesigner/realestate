import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, CalendarDays, ChartNoAxesCombined, CircleDollarSign, Megaphone, MessagesSquare } from "lucide-react";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore sample real estate website services for property sales, residential listings, investment inquiries, marketing and site-visit coordination.",
};

const services = [
  { icon: CircleDollarSign, title: "Property sales", text: "Present individual properties with pricing, specifications, galleries and focused inquiry actions." },
  { icon: Building, title: "Residential listings", text: "Organize apartments, villas, penthouses and townhouses into a searchable local catalog." },
  { icon: ChartNoAxesCombined, title: "Investment consultation", text: "Give investment-focused visitors a distinct route to ask questions and compare relevant units." },
  { icon: Megaphone, title: "Property marketing", text: "Combine architectural photography, editorial copy and clear facts into a convincing project story." },
  { icon: CalendarDays, title: "Site-visit coordination", text: "Collect a preferred property, contact number and date without making visitors navigate away." },
  { icon: MessagesSquare, title: "Buyer inquiry management", text: "Support email, phone, forms and WhatsApp from one consistent property experience." },
];

export default function ServicesPage() {
  return (
    <>
      <header className="container-site grid gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
        <div><p className="eyebrow text-[#627117]">Property website services</p><h1 className="page-heading mt-5">Built to turn attention into inquiry.</h1></div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)]"><Image src={properties[9].images[1].src} alt={properties[9].images[1].alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
      </header>

      <section className="border-y border-[var(--stone)] bg-[var(--surface)]">
        <div className="container-site section-space">
          <h2 className="section-heading max-w-4xl">One coherent system for every property touchpoint.</h2>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="grid grid-cols-[auto_1fr] gap-5 border-t border-[var(--stone)] pt-6">
                <Icon size={26} strokeWidth={1.6} /><div><h3 className="text-xl font-extrabold">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site section-space grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-[var(--radius-media)]"><Image src={properties[3].images[0].src} alt={properties[3].images[0].alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div>
        <div className="flex flex-col justify-end rounded-[var(--radius-media)] bg-[var(--accent)] p-7 text-[var(--accent-ink)] md:p-12">
          <h2 className="font-display text-5xl font-semibold leading-[.92] md:text-6xl">A reusable foundation for a real portfolio.</h2>
          <p className="mt-6 text-sm leading-7">Replace the brand configuration, property data and company story while retaining the working discovery and inquiry system.</p>
          <Link href="/contact?inquiry=Property marketing" className="button-secondary mt-8 w-fit border-[#56620e]">Discuss a Project<ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
