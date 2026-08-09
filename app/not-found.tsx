import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="relative isolate min-h-[calc(100dvh-9rem)] overflow-hidden bg-[#0b1833] text-white">
      <Image
        src="/images/properties/villa-exterior.jpg"
        alt="Contemporary Kira residence in Addis Ababa"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,15,34,.97)_0%,rgba(6,15,34,.86)_48%,rgba(6,15,34,.38)_100%)]" />

      <div className="container-narrow flex min-h-[calc(100dvh-9rem)] items-center py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.2em] text-[#9fb2ff]">
            <span className="h-px w-8 bg-[#3659d9]" /> Page not found
          </span>
          <p aria-hidden="true" className="mt-5 font-display text-[clamp(7rem,24vw,15rem)] font-bold leading-[.72] tracking-[-.06em] text-white/10">
            404
          </p>
          <h1 className="mt-7 font-display text-5xl font-bold uppercase leading-[.92] tracking-[-.035em] sm:text-7xl">
            This address is<br />not on the map.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            The page may have moved, but your next property is still within reach. Continue with Kira’s curated Addis Ababa listings.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/properties" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#3659d9] px-6 font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-white">
              <Search size={17} aria-hidden="true" /> Browse properties <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 font-bold text-white transition-colors hover:bg-white hover:text-[#0b1833] focus-visible:outline-white">
              <Home size={17} aria-hidden="true" /> Return home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
