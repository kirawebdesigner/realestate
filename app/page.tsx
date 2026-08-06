import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Building2, Building, CalendarCheck, HandCoins, Home, KeyRound, MapPin, Maximize2, MessageCircle, ShieldCheck, Warehouse } from "lucide-react";
import { Reveal } from "@/components/home/reveal";
import { ServiceCarousel } from "@/components/home/service-carousel";
import { PropertySearchForm } from "@/components/property/property-search-form";
import { getWhatsAppUrl } from "@/config/site";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Distinctive Homes Across Addis Ababa",
  description: "Discover Kira Real Estate sample listings, property services and advisor-led home journeys across Addis Ababa.",
};

const propertyKinds = [
  { icon: Building2, title: "Commercial", note: "2 sample spaces" },
  { icon: Warehouse, title: "Warehouse", note: "By inquiry" },
  { icon: Home, title: "Individual Villa", note: "4 residences" },
  { icon: Building, title: "Town House", note: "3 properties" },
];

const advisors = [
  ["Selam Tadesse", "Property advisor", "/images/properties/advisor-1.jpg"],
  ["Noah Bekele", "Residential advisor", "/images/properties/advisor-2.jpg"],
  ["Liya Alem", "Client coordinator", "/images/properties/advisor-3.jpg"],
  ["Dawit Tesfaye", "Property consultant", "/images/properties/advisor-4.jpg"],
  ["Marta Girma", "Site visit coordinator", "/images/properties/advisor-5.jpg"],
  ["Abel Fikru", "Investment inquiries", "/images/properties/advisor-6.jpg"],
];

const articles = [
  ["Buying guide", "Home Staging Tips To Attract Buyers Quickly", "/images/properties/townhouse.jpg"],
  ["Investment", "10 Principles For Comparing Addis Ababa Listings", "/images/properties/villa-exterior.jpg"],
  ["Checklist", "The Complete Checklist For First-Time Home Buyers", "/images/properties/city-tower.jpg"],
];

export default function HomePage() {
  const listings = properties.slice(0, 6);
  const highlights = properties.slice(6, 9);

  return (
    <>
      <section className="overflow-hidden bg-white py-12 md:py-20">
        <div className="container-narrow grid items-center gap-10 md:grid-cols-[.92fr_1.08fr]">
          <Reveal>
            <span className="micro-label">Property discovery, made clearer</span>
            <h1 className="display-title mt-5 text-[clamp(2.85rem,7vw,6.9rem)] uppercase">
              Our best <span className="block text-[var(--accent)]">real estate</span> listings!
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--muted)]">Explore thoughtfully presented homes across Addis Ababa, from refined city apartments to spacious family residences.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/properties" className="button-primary">Explore Properties<ArrowRight size={16} /></Link>
              <Link href="#journey" className="button-secondary">How It Works<ArrowRight size={16} /></Link>
            </div>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-[620px]">
            <div className="hero-k-mask relative aspect-square overflow-hidden bg-[var(--surface-strong)]">
              <Image src="/images/kira-hero.png" alt="Contemporary Kira residence in Addis Ababa" fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" />
            </div>
            <div className="absolute left-[13%] top-[10%] grid size-14 place-items-center rounded-full border-[7px] border-white bg-[var(--graphite)] text-sm font-black text-white shadow-lg">K<span className="text-[var(--accent)]">.</span></div>
            <div className="absolute bottom-[5%] right-[21%] grid size-20 place-items-center rounded-full border-[9px] border-white bg-white shadow-lg"><Home className="text-[var(--accent)]" /></div>
          </Reveal>
        </div>
      </section>

      <PropertySearchForm />

      <section className="warm-section relative overflow-hidden py-14 md:py-28">
        <div className="container-narrow">
          <Reveal className="text-center"><span className="micro-label">Property categories</span><h2 className="display-title mt-4 text-4xl md:text-6xl">Different<br />Kinds Of Real Estate</h2></Reveal>
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[.72fr_1fr_.85fr]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {propertyKinds.map(({ icon: Icon, title, note }) => <Link href={`/properties?type=${encodeURIComponent(title)}`} key={title} className="group flex items-center gap-4"><span className="grid size-11 place-items-center rounded-full border border-[var(--stone)] bg-white group-hover:border-[var(--accent)]"><Icon size={18} /></span><span><strong className="block text-sm">{title}</strong><small className="text-[.65rem] text-[var(--muted)]">{note}</small></span></Link>)}
            </div>
            <div className="circle-image orange-ring relative mx-auto aspect-square w-[min(58vw,250px)] overflow-hidden border-[8px] border-white md:w-[390px]">
              <Image src={properties[3].images[0].src} alt="Bright contemporary apartment interior" fill sizes="390px" className="object-cover" />
            </div>
            <div className="text-center lg:text-left"><span className="micro-label">Chosen with care</span><h3 className="display-title mt-4 text-4xl">Diverse Property Options</h3><p className="mt-4 text-sm leading-7 text-[var(--muted)]">Explore a concise sample collection of apartments, villas and investment properties selected for clarity and variety.</p><Link href="/properties" className="button-secondary mt-6">Explore all<ArrowRight size={16} /></Link></div>
          </div>
        </div>
      </section>

      <section className="warm-section border-t border-white/70 py-14 md:py-24">
        <div className="container-narrow">
          <div className="flex items-end justify-between gap-5"><div><span className="micro-label">Our services</span><h2 className="display-title mt-4 text-5xl md:text-6xl">Our Kira Services</h2></div><span className="hidden text-xs font-bold text-[var(--muted)] sm:block">03 Services</span></div>
          <div className="mt-10"><ServiceCarousel /></div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-28">
        <div className="container-narrow grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr]">
          <Reveal>
            <span className="micro-label">About Kira</span><h2 className="display-title mt-4 text-4xl md:text-6xl">Turning Your Dream Home Into Reality.</h2>
            <div className="mt-7 space-y-6">
              <div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-[var(--accent)]" /><div><h3 className="font-extrabold">Property Management</h3><p className="mt-1 text-sm leading-6 text-[var(--muted)]">Organized presentation and support around each property inquiry.</p></div></div>
              <div className="flex gap-4"><HandCoins className="mt-1 shrink-0 text-[var(--accent)]" /><div><h3 className="font-extrabold">Financing Made Easy</h3><p className="mt-1 text-sm leading-6 text-[var(--muted)]">A practical demonstration of how financing conversations can begin.</p></div></div>
            </div>
            <Link href="/about" className="button-primary mt-7">About Us<ArrowRight size={16} /></Link>
          </Reveal>
          <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[46%_54%_49%_51%/58%_45%_55%_42%] border-[8px] border-white shadow-[0_0_0_5px_var(--accent)]">
            <Image src={properties[2].images[0].src} alt="Modern Addis Ababa family residence" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-white bg-[var(--accent)] text-white"><Home size={20} /></span>
          </Reveal>
        </div>
      </section>

      <section className="warm-section py-14 md:py-28">
        <div className="container-narrow">
          <div className="grid gap-7 md:grid-cols-[1.2fr_.8fr] md:items-end"><div><span className="micro-label">Property listings</span><h2 className="display-title mt-4 text-4xl md:text-6xl">Exclusive Homes: Your<br className="hidden md:block" /> Dream Awaits Today!</h2></div><div><p className="text-sm leading-7 text-[var(--muted)]">Explore sample homes designed for people who value useful details and a simple inquiry journey.</p><Link href="/properties" className="button-primary mt-5">All Properties<ArrowRight size={16} /></Link></div></div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {listings.map((property, index) => <article key={property.id} className="estate-card group"><Link href={`/properties/${property.slug}`} className="block"><div className="relative aspect-[16/10] overflow-hidden"><Image src={property.images[0].src} alt={property.images[0].alt} fill priority={index < 3} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="property-image object-cover" /></div><div className="p-4"><div className="flex items-center justify-between text-[.64rem] text-[var(--muted)]"><span className="inline-flex items-center gap-1"><MapPin size={11} />{property.neighborhood}</span><span>{property.status}</span></div><h3 className="mt-3 text-sm font-extrabold">{property.title}</h3><div className="mt-3 flex gap-4 border-y border-[var(--stone)] py-2 text-[.62rem] text-[var(--muted)]"><span className="inline-flex gap-1"><BedDouble size={11} />{property.bedrooms}</span><span className="inline-flex gap-1"><Bath size={11} />{property.bathrooms}</span><span className="inline-flex gap-1"><Maximize2 size={11} />{property.area}m²</span></div><div className="mt-3 flex items-center justify-between"><strong className="text-sm">{property.formattedPrice}</strong><span className="grid size-7 place-items-center rounded-full bg-[var(--accent)] text-white"><ArrowRight size={12} /></span></div></div></Link></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-28">
        <div className="container-narrow"><Reveal className="text-center"><span className="micro-label">Testimonial</span><h2 className="display-title mt-4 text-4xl md:text-6xl">Clients Really Enjoy<br />The Services We Provide!</h2></Reveal>
          <div className="mt-10 grid overflow-hidden rounded-[16px] bg-[var(--graphite)] text-white lg:grid-cols-[.7fr_1.3fr]">
            <div className="relative min-h-[210px] lg:min-h-[330px]"><Image src={properties[0].images[1].src} alt="Refined apartment interior" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div>
            <div className="flex flex-col justify-center p-8 md:p-12"><span className="font-display text-7xl leading-none">“</span><h3 className="display-title max-w-xl text-3xl md:text-4xl">Home Is Where Your Investment Journey Begins!</h3><p className="mt-5 max-w-xl text-sm leading-7 text-white/60">“The sample journey makes it easy to compare key details, ask a focused question and plan the next step without feeling overwhelmed.”</p><div className="mt-8 flex items-center justify-between"><div><strong className="block text-sm">Sample client story</strong><span className="text-xs text-white/50">Demonstration testimonial</span></div><span className="text-[var(--accent)]">★★★★★</span></div></div>
          </div>
        </div>
      </section>

      <section id="journey" className="warm-section py-14 md:py-28">
        <div className="container-narrow"><div className="text-center"><span className="micro-label">Process</span><h2 className="display-title mt-4 text-5xl md:text-6xl">4 Steps To Be Followed</h2></div><div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[[Building, "Select a House", "Property list"], [MessageCircle, "Call an Agent", "Get in touch"], [KeyRound, "Apply for a Loan", "Learn more"], [CalendarCheck, "Buy a Home", "Site visit"]].map(([Icon, title, cta], index) => { const StepIcon = Icon as typeof Home; return <article key={title as string} className="rounded-[12px] bg-white p-5 text-center md:p-8"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--surface-strong)]"><StepIcon size={22} /></span><span className="step-number mt-7 block">0{index + 1}</span><h3 className="mt-2 text-sm font-extrabold">{title as string}</h3><Link href="/contact" className="mt-5 inline-flex items-center gap-1 text-[.64rem] font-extrabold text-[var(--accent)]">{cta as string}<ArrowRight size={11} /></Link></article>})}
        </div></div>
      </section>

      <section className="bg-white py-14 md:py-28">
        <div className="container-narrow"><div className="text-center"><span className="micro-label">Our team</span><h2 className="display-title mt-4 text-5xl md:text-6xl">Our Real Estate Experts</h2><p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[var(--muted)]">Sample advisor profiles showing how a real company team can be presented.</p></div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">{advisors.map(([name, role, image]) => <article key={name} className="estate-card group"><div className="relative aspect-[4/4.3] overflow-hidden bg-[#edf0ec]"><Image src={image} alt={`Sample advisor profile for ${name}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="property-image object-cover object-top" /></div><div className="flex items-center justify-between p-3"><div><h3 className="text-xs font-extrabold">{name}</h3><p className="mt-1 text-[.58rem] text-[var(--muted)]">{role}</p></div><span className="grid size-7 place-items-center rounded-full bg-[var(--accent)] text-white"><ArrowRight size={11} /></span></div></article>)}</div>
          <div className="mt-8 text-center"><Link href="/contact" className="button-primary">Talk to an advisor<ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:pb-28"><div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(135deg,#193847,#316b78)]" />
        <div className="container-narrow relative grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">{highlights.map((property) => <article key={property.id} className="estate-card"><div className="relative aspect-[16/10]"><Image src={property.images[0].src} alt={property.images[0].alt} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" /><span className="absolute bottom-2 left-2 rounded-full bg-black/65 px-2 py-1 text-[.55rem] font-bold text-white md:bottom-3 md:left-3 md:px-3 md:text-xs">Luxury Home</span></div><div className="p-3 md:p-4"><h3 className="text-xs font-extrabold md:text-sm">{property.title}</h3><p className="mt-1 text-[.58rem] text-[var(--muted)]">{property.neighborhood}, Addis Ababa</p><div className="mt-3 flex flex-col gap-1 md:mt-4 md:flex-row md:items-center md:justify-between"><strong className="text-[.65rem] text-[var(--accent)] md:text-sm">{property.formattedPrice}</strong><span className="text-[.58rem] text-[var(--muted)]">{property.area} m²</span></div><Link href={`/properties/${property.slug}`} className="button-primary mt-3 w-full min-h-9 px-2 text-[.6rem] md:mt-4 md:text-xs">View Details</Link></div></article>)}</div>
      </section>

      <section className="bg-white py-14 md:py-28"><div className="container-narrow"><div className="text-center"><span className="micro-label">Blog & news</span><h2 className="display-title mt-4 text-4xl md:text-6xl">Latest News &amp; Articles</h2></div><div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">{articles.map(([category, title, image]) => <article key={title} className="estate-card"><div className="relative aspect-[16/9]"><Image src={image} alt="Sample real estate article cover" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" /><span className="absolute left-2 top-2 rounded-full bg-[var(--accent)] px-2 py-1 text-[.5rem] font-extrabold text-white md:left-3 md:top-3 md:px-3 md:text-[.58rem]">{category}</span></div><div className="p-3 md:p-4"><h3 className="text-xs font-extrabold leading-4 md:text-sm md:leading-5">{title}</h3><div className="mt-4 flex items-center justify-between border-t border-[var(--stone)] pt-3 text-[.55rem] text-[var(--muted)] md:mt-5 md:text-[.6rem]"><span>Kira editorial</span><span>5 min</span></div></div></article>)}</div><div className="mt-8 text-center"><Link href="/properties" className="button-primary">Read &amp; Explore<ArrowRight size={15} /></Link></div></div></section>

      <section className="bg-[var(--graphite)] pt-20 text-white"><div className="container-narrow rounded-[18px] bg-[var(--accent)] p-7 md:p-12"><div className="flex items-center justify-between gap-8"><h2 className="display-title max-w-lg text-4xl md:text-6xl">Ready To Find Your<br />Dream Home!</h2><Link href="/contact" aria-label="Contact Kira Real Estate" className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-[var(--ink)] transition-transform hover:rotate-45 md:size-20"><ArrowRight size={27} /></Link></div></div><div className="container-narrow flex flex-wrap items-center justify-between gap-5 py-8 text-xs text-white/60"><p>Prefer a quick conversation? Start a WhatsApp inquiry.</p><a href={getWhatsAppUrl("Hello Kira Real Estate, I would like to ask about a sample property.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-white"><MessageCircle size={15} />WhatsApp Inquiry</a></div></section>
    </>
  );
}
