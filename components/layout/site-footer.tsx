import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { demoDisclaimer, siteConfig } from "@/config/site";
import { neighborhoods, propertyTypes } from "@/data/properties";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--graphite)] text-white">
      <div className="container-narrow grid grid-cols-2 gap-8 border-t border-white/10 py-10 md:grid-cols-[1.1fr_.75fr_.8fr_1.2fr] md:gap-10 md:py-12">
        <div className="col-span-2 md:col-span-1"><Link href="/" className="text-xl font-extrabold tracking-[-.05em]">Kira<span className="text-[var(--accent)]">.</span></Link><p className="mt-5 max-w-xs text-xs leading-6 text-white/50">{siteConfig.tagline} A sample property experience built for clear discovery across Addis Ababa.</p></div>
        <FooterColumn title="Utility Pages" links={siteConfig.navigation.slice(0, 4)} />
        <FooterColumn title="Property Types" links={propertyTypes.slice(0, 4).map((type) => ({ label: type, href: `/properties?type=${encodeURIComponent(type)}` }))} />
        <div><h2 className="text-xs font-extrabold">Contact</h2><div className="mt-5 grid gap-2 text-xs leading-5 text-white/50"><a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.address}</p></div><div className="mt-5 flex gap-2"><Social href="https://instagram.com" label="Instagram">IG</Social><Social href="https://facebook.com" label="Facebook">FB</Social><Social href="https://linkedin.com" label="LinkedIn">IN</Social></div></div>
      </div>
      <div className="container-narrow flex flex-col gap-3 border-t border-white/10 py-5 text-[.62rem] leading-5 text-white/40 sm:flex-row sm:items-center sm:justify-between"><p>{demoDisclaimer}</p><p>© {new Date().getFullYear()} {siteConfig.name}</p></div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <div><h2 className="text-xs font-extrabold">{title}</h2><ul className="mt-5 grid gap-2 text-xs text-white/50">{links.map((link) => <li key={link.href}><Link href={link.href} className="inline-flex items-center gap-1 hover:text-white">{link.label}<ArrowUpRight size={9} /></Link></li>)}</ul>{title === "Property Types" && <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[.6rem] text-white/35">{neighborhoods.slice(0, 4).map((place) => <Link key={place} href={`/properties?location=${place}`}>{place}</Link>)}</div>}</div>;
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) { return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-8 place-items-center rounded-full border border-white/15 text-white/60 hover:border-[var(--accent)] hover:text-[var(--accent)]">{children}</a>; }
