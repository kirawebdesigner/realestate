import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, Building2, MapPin, Maximize2 } from "lucide-react";
import type { Property } from "@/types/property";
import { FavoriteButton } from "./favorite-button";

export function PropertyCard({ property, view = "grid", priority = false }: { property: Property; view?: "grid" | "list"; priority?: boolean }) {
  if (view === "list") return <PropertyListCard property={property} />;

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-[var(--radius-media)] bg-[var(--surface-strong)]">
        <Link href={`/properties/${property.slug}`} className="property-link block aspect-[4/3]" aria-label={`View ${property.title}`}>
          <Image src={property.images[0].src} alt={property.images[0].alt} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="property-image object-cover" />
        </Link>
        <FavoriteButton slug={property.slug} label={property.title} className="absolute right-3 top-3" />
      </div>
      <div className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><MapPin size={14} />{property.neighborhood}, {property.location}</div>
            <h3 className="mt-2 text-xl font-bold tracking-tight"><Link href={`/properties/${property.slug}`} className="hover:text-[var(--accent)]">{property.title}</Link></h3>
          </div>
          <ArrowUpRight size={20} className="mt-1 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </div>
        <p className="mt-3 text-lg font-extrabold">{property.formattedPrice}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--stone)] pt-4 text-xs font-semibold text-[var(--muted)]">
          {property.bedrooms > 0 && <span className="inline-flex items-center gap-1.5"><BedDouble size={15} />{property.bedrooms} bed</span>}
          <span className="inline-flex items-center gap-1.5"><Bath size={15} />{property.bathrooms} bath</span>
          <span className="inline-flex items-center gap-1.5"><Maximize2 size={15} />{property.area} m²</span>
          <span className="inline-flex items-center gap-1.5"><Building2 size={15} />{property.propertyType}</span>
        </div>
      </div>
    </article>
  );
}

function PropertyListCard({ property }: { property: Property }) {
  return (
    <article className="grid gap-5 border-b border-[var(--stone)] pb-7 md:grid-cols-[320px_1fr]">
      <Link href={`/properties/${property.slug}`} className="property-link relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] md:aspect-auto md:min-h-56">
        <Image src={property.images[0].src} alt={property.images[0].alt} fill sizes="(max-width: 768px) 100vw, 320px" className="property-image object-cover" />
      </Link>
      <div className="flex min-w-0 flex-col py-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[var(--muted)]">{property.neighborhood} / {property.propertyType}</p>
            <h3 className="mt-2 text-2xl font-bold"><Link href={`/properties/${property.slug}`}>{property.title}</Link></h3>
          </div>
          <FavoriteButton slug={property.slug} label={property.title} />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">{property.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <p className="text-lg font-extrabold">{property.formattedPrice}</p>
          <p className="text-sm font-semibold text-[var(--muted)]">{property.bedrooms ? `${property.bedrooms} bed / ` : ""}{property.bathrooms} bath / {property.area} m²</p>
        </div>
      </div>
    </article>
  );
}
