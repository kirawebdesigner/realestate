import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, Building2, Car, Dumbbell, Fence, LampDesk, MapPin, Maximize2, MessageCircle, ShieldCheck, Sparkles, SquareArrowUp, Zap } from "lucide-react";
import { FavoriteButton } from "@/components/property/favorite-button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGallery } from "@/components/property/property-gallery";
import { ShareButton } from "@/components/property/share-button";
import { VisitForm } from "@/components/property/visit-form";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { getPropertyBySlug, properties } from "@/data/properties";
import type { Amenity } from "@/types/property";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const property = getPropertyBySlug((await params).slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: `${property.shortDescription} Sample ${property.propertyType.toLowerCase()} listing in ${property.neighborhood}, Addis Ababa.`,
    openGraph: { title: property.title, description: property.shortDescription, images: [{ url: property.images[0].src, alt: property.images[0].alt }] },
  };
}

const amenityIcons = {
  shield: ShieldCheck,
  lift: SquareArrowUp,
  garden: Fence,
  power: Zap,
  fitness: Dumbbell,
  concierge: Sparkles,
  balcony: Building2,
  workspace: LampDesk,
};

export default async function PropertyDetailPage({ params }: { params: Params }) {
  const property = getPropertyBySlug((await params).slug);
  if (!property) notFound();

  const similar = properties.filter((item) => item.slug !== property.slug && (item.neighborhood === property.neighborhood || item.propertyType === property.propertyType)).slice(0, 3);
  const whatsappUrl = getWhatsAppUrl(`Hello ${siteConfig.name}, I would like more information about ${property.title}.`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.shortDescription,
    url: `${siteConfig.url}/properties/${property.slug}`,
    image: property.images.map((item) => item.src),
    address: { "@type": "PostalAddress", addressLocality: property.neighborhood, addressRegion: "Addis Ababa", addressCountry: "ET" },
    offers: { "@type": "Offer", priceCurrency: "ETB", price: property.price, availability: "https://schema.org/InStock" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Bedrooms", value: property.bedrooms },
      { "@type": "PropertyValue", name: "Bathrooms", value: property.bathrooms },
      { "@type": "PropertyValue", name: "Area", value: `${property.area} square metres` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-site pt-7">
        <Link href="/properties" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]"><ArrowLeft size={18} />Back to Properties</Link>
        <div className="mt-4"><PropertyGallery images={property.images} title={property.title} /></div>
      </div>

      <div className="container-site grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-20">
        <article className="min-w-0">
          <header className="border-b border-[var(--stone)] pb-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold text-[#627117]">{property.status} / {property.completionStatus}</p>
                <h1 className="mt-3 font-display text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[.86] tracking-[-.045em]">{property.title}</h1>
                <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--muted)]"><MapPin size={17} />{property.neighborhood}, {property.location}</p>
              </div>
              <div className="flex shrink-0 gap-2"><FavoriteButton slug={property.slug} label={property.title} /><ShareButton title={property.title} /></div>
            </div>
            <p className="mt-8 text-2xl font-extrabold">{property.formattedPrice}</p>
            <dl className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-5">
              {property.bedrooms > 0 && <Fact icon={BedDouble} label="Bedrooms" value={property.bedrooms} />}
              <Fact icon={Bath} label="Bathrooms" value={property.bathrooms} />
              <Fact icon={Maximize2} label="Area" value={`${property.area} m²`} />
              <Fact icon={Car} label="Parking" value={property.parking} />
              <Fact icon={Building2} label="Type" value={property.propertyType} />
            </dl>
          </header>

          <section className="py-12">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">A considered place to arrive.</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">{property.description}</p>
          </section>

          <section className="border-y border-[var(--stone)] py-12">
            <h2 className="text-2xl font-extrabold">Key features</h2>
            <div className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {property.features.map((feature) => <div key={feature} className="flex items-start gap-3 text-sm font-semibold"><span className="mt-2 block size-1.5 rounded-full bg-[#627117]" aria-hidden="true" />{feature}</div>)}
            </div>
          </section>

          <section className="py-12">
            <h2 className="text-2xl font-extrabold">Amenities</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {property.amenities.map((amenity) => <AmenityItem key={amenity.name} amenity={amenity} />)}
            </div>
          </section>

          <section className="border-t border-[var(--stone)] py-12">
            <h2 className="text-2xl font-extrabold">Property specifications</h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[["Development", property.development], ["Completion", property.completionStatus], ["Property type", property.propertyType], ["Listing status", property.status], ["Internal area", `${property.area} m²`], ["Parking allocation", `${property.parking} spaces`]].map(([label, value]) => (
                <div key={label} className="rounded-[var(--radius-control)] bg-[var(--surface)] p-5"><dt className="text-xs font-bold text-[var(--muted)]">{label}</dt><dd className="mt-2 text-lg font-extrabold">{value}</dd></div>
              ))}
            </dl>
          </section>

          <section className="border-t border-[var(--stone)] py-12">
            <div className="grid min-h-80 overflow-hidden rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] md:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col justify-center p-7 md:p-10">
                <MapPin size={26} strokeWidth={1.6} />
                <h2 className="mt-6 font-display text-4xl font-semibold">{property.neighborhood}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Addis Ababa, Ethiopia. Exact location and visit directions are provided when a real appointment is confirmed.</p>
                <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(`${property.neighborhood}, Addis Ababa`)}`} target="_blank" rel="noreferrer" className="button-secondary mt-6 w-fit">Open Map</a>
              </div>
              <div className="relative min-h-72 overflow-hidden bg-[#dfe1d7]">
                <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#8f9386_1px,transparent_1px),linear-gradient(90deg,#8f9386_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
                <div className="absolute left-[54%] top-[48%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-lg"><MapPin size={28} /></div>
              </div>
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 grid gap-4">
            <VisitForm propertyTitle={property.title} compact />
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-secondary w-full"><MessageCircle size={18} />WhatsApp Inquiry</a>
          </div>
        </aside>
      </div>

      <section className="border-t border-[var(--stone)] py-20">
        <div className="container-site">
          <div className="flex items-end justify-between gap-5"><h2 className="font-display text-4xl font-semibold md:text-6xl">Similar properties</h2><Link href="/properties" className="hidden text-sm font-bold sm:block">View all</Link></div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{similar.map((item) => <PropertyCard key={item.id} property={item} />)}</div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--stone)] bg-[color:rgb(244_243_238_/_0.96)] p-3 backdrop-blur md:p-4 lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3"><Link href={`/contact?inquiry=site-visit&property=${property.slug}`} className="button-primary">Schedule Visit</Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-secondary">WhatsApp</a></div>
      </div>
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof BedDouble; label: string; value: string | number }) {
  return <div><Icon size={20} strokeWidth={1.6} aria-hidden="true" /><dt className="mt-3 text-xs font-bold text-[var(--muted)]">{label}</dt><dd className="mt-1 text-sm font-extrabold">{value}</dd></div>;
}

function AmenityItem({ amenity }: { amenity: Amenity }) {
  const Icon = amenityIcons[amenity.icon];
  return <div className="flex min-h-20 items-center gap-4 rounded-[var(--radius-control)] border border-[var(--stone)] p-4"><Icon size={22} strokeWidth={1.6} /><span className="text-sm font-bold">{amenity.name}</span></div>;
}
