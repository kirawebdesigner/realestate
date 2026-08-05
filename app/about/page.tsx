import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Handshake, ListChecks, MessageSquareText } from "lucide-react";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how the Kira Real Estate demonstration presents property information, supports buyer journeys and builds trust without unsupported claims.",
};

export default function AboutPage() {
  return (
    <>
      <header className="container-site pt-16 md:pt-24">
        <p className="eyebrow text-[#627117]">A better property conversation</p>
        <h1 className="page-heading mt-5 max-w-6xl">Clarity before pressure. Context before decisions.</h1>
      </header>
      <section className="container-site grid gap-4 pb-24 pt-12 md:grid-cols-12 md:pt-16">
        <div className="relative min-h-[560px] overflow-hidden rounded-[var(--radius-media)] md:col-span-8"><Image src={properties[2].images[0].src} alt={properties[2].images[0].alt} fill priority sizes="(max-width: 768px) 100vw, 67vw" className="object-cover" /></div>
        <div className="flex flex-col justify-end rounded-[var(--radius-media)] bg-[var(--accent)] p-7 text-[var(--accent-ink)] md:col-span-4 md:p-10">
          <h2 className="font-display text-5xl font-semibold leading-[.92]">More useful detail. Fewer unanswered questions.</h2>
          <p className="mt-6 text-sm leading-7">Kira is positioned as a replaceable demonstration brand. The structure is ready for a real company story, property portfolio and operating team.</p>
        </div>
      </section>

      <section className="border-y border-[var(--stone)] bg-[var(--surface)]">
        <div className="container-site section-space grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><h2 className="section-heading">Our mission is simple.</h2><p className="lede mt-7">Help people understand a property well enough to ask better questions and take the next step with confidence.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [Eye, "See the whole picture", "Strong imagery works alongside practical specifications and honest sample status."],
              [ListChecks, "Compare consistently", "Every listing follows the same readable information structure."],
              [MessageSquareText, "Ask without friction", "Phone, form and WhatsApp actions remain close to the decision."],
              [Handshake, "Keep support human", "Site visits and investment questions always lead to a direct conversation."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Eye;
              return <article key={title as string} className="rounded-[var(--radius-media)] border border-[var(--stone)] p-6"><ItemIcon size={25} strokeWidth={1.6} /><h3 className="mt-8 text-lg font-extrabold">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text as string}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="container-site section-space grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)]"><Image src={properties[0].images[2].src} alt={properties[0].images[2].alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
        <div className="lg:pl-12">
          <h2 className="section-heading">Service standards built into the experience.</h2>
          <div className="mt-10 grid gap-7">
            {[["Accurate structure", "Pricing, status and specifications appear in predictable places."], ["Accessible communication", "Every core action has a clear label, keyboard path and mobile equivalent."], ["Honest demonstration", "No fake executives, awards, partnerships or customer claims are used."], ["Replaceable identity", "The central brand configuration can be adapted for a real company quickly."]].map(([title, text]) => <div key={title} className="border-t border-[var(--stone)] pt-5"><h3 className="font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="container-site pb-24 md:pb-32">
        <div className="rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-7 md:p-12 lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div><h2 className="font-display text-5xl font-semibold md:text-7xl">Start with the properties.</h2><p className="lede mt-5">Explore the complete sample collection and see the buyer journey in context.</p></div>
          <Link href="/properties" className="button-primary mt-8 shrink-0 lg:mt-0">Explore Properties<ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
