import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Use the Kira Real Estate demonstration contact form to request sample property information, investment guidance or a site visit.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const inquiryParam = single(params.inquiry);
  const initialInquiry = inquiryParam === "site-visit" ? "Site visit" : inquiryParam || "General inquiry";
  const initialProperty = single(params.property);

  return (
    <>
      <header className="container-site pb-14 pt-16 md:pt-24">
        <p className="eyebrow text-[#627117]">Start a conversation</p>
        <h1 className="page-heading mt-5 max-w-5xl">Tell us what you want to explore.</h1>
        <p className="lede mt-7">Use this realistic sample flow to request property details, a visit or an investment conversation.</p>
      </header>
      <section className="container-site grid gap-12 pb-24 lg:grid-cols-[.75fr_1.25fr] xl:gap-20">
        <aside>
          <div className="grid gap-6 border-t border-[var(--ink)] pt-6">
            <ContactItem icon={Phone} label="Phone" value={siteConfig.phone} href={`tel:${siteConfig.phoneHref}`} />
            <ContactItem icon={Mail} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactItem icon={MessageCircle} label="WhatsApp" value={siteConfig.whatsapp} href={getWhatsAppUrl("Hello Kira Real Estate, I would like to make an inquiry.")} external />
            <ContactItem icon={MapPin} label="Office" value={siteConfig.address} />
            <ContactItem icon={Clock3} label="Hours" value={siteConfig.officeHours} />
          </div>
        </aside>
        <ContactForm initialInquiry={initialInquiry} initialProperty={initialProperty} />
      </section>

      <section className="container-site pb-24 md:pb-32">
        <div className="grid min-h-[420px] overflow-hidden rounded-[var(--radius-media)] border border-[var(--stone)] bg-[#dfe1d7] md:grid-cols-[.7fr_1.3fr]">
          <div className="relative min-h-72 overflow-hidden">
            <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(#8f9386_1px,transparent_1px),linear-gradient(90deg,#8f9386_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />
            <div className="absolute left-[58%] top-[48%] grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] shadow-lg"><MapPin size={28} /></div>
          </div>
          <div className="flex flex-col justify-center bg-[var(--surface)] p-7 md:p-12">
            <h2 className="font-display text-5xl font-semibold md:text-6xl">A central Addis Ababa starting point.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">The office address and hours are sample content. A real implementation can connect this section to an approved map provider and verified location.</p>
            <a href="https://www.openstreetmap.org/search?query=Bole%20Road%20Addis%20Ababa" target="_blank" rel="noreferrer" className="button-secondary mt-7 w-fit">Open Map</a>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon: Icon, label, value, href, external = false }: { icon: typeof Phone; label: string; value: string; href?: string; external?: boolean }) {
  const content = <><Icon size={21} strokeWidth={1.6} /><div><p className="text-xs font-bold text-[var(--muted)]">{label}</p><p className="mt-1 text-sm font-extrabold leading-6">{value}</p></div></>;
  return href ? <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="grid min-h-14 grid-cols-[auto_1fr] items-start gap-4 hover:text-[#627117]">{content}</a> : <div className="grid min-h-14 grid-cols-[auto_1fr] items-start gap-4">{content}</div>;
}
