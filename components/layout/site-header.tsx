"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setIsCompact(latest > 48));

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navigation = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-40 bg-[#f3f5f8] px-3 transition-all duration-300 md:px-6 ${isCompact ? "py-2 shadow-[0_8px_28px_rgb(11_24_51_/_0.08)]" : "py-4"}`}>
      <div className="mx-auto flex min-h-16 max-w-[1400px] items-center gap-5 rounded-full border border-[#dfe3ea] bg-white px-5 shadow-[0_18px_45px_rgb(11_24_51_/_0.08)] md:px-7">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="flex shrink-0 items-baseline gap-2 text-xl font-extrabold tracking-[-.055em] text-[#0b1833]">
          Kira <span className="text-[.58rem] font-extrabold uppercase tracking-[.15em] text-[#3659d9]">Real Estate</span>
        </Link>

        <span className="ml-3 hidden h-6 w-px bg-[#dfe3ea] lg:block" aria-hidden="true" />
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`text-sm font-semibold transition-colors hover:text-[#3659d9] ${pathname === item.href ? "text-[#3659d9]" : "text-[#0b1833]"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a href={`tel:${siteConfig.phoneHref}`} className="mr-2 hidden text-sm font-semibold text-[#0b1833] xl:block">Call us: <span className="border-b border-[#3659d9]">{siteConfig.phone}</span></a>
          <Link href="/properties" aria-label="Search properties" className="hidden size-11 place-items-center rounded-full bg-[#3659d9] text-white transition-transform hover:scale-105 lg:grid"><Search size={20} /></Link>
          <Link href="/contact?inquiry=site-visit" className="hidden min-h-11 items-center justify-center rounded-full bg-[#3659d9] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex">Schedule a visit</Link>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-[#dfe3ea] bg-white text-[#0b1833] lg:hidden" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((value) => !value)}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[80px] z-50 h-[calc(100dvh-80px)] bg-[#f3f5f8] p-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="container-site flex h-full flex-col">
            <div className="overflow-hidden rounded-2xl border border-[#dfe3ea] bg-white px-5 shadow-xl">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex min-h-14 items-center justify-between border-b border-[#e6e9ef] text-lg font-semibold text-[#0b1833] last:border-0">
                  {item.label}<span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <Link href="/contact?inquiry=site-visit" onClick={() => setIsOpen(false)} className="mt-auto inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[#3659d9] font-bold text-white">Schedule a visit</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
