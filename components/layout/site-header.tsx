"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

  return (
    <header className={`sticky top-0 z-40 border-b border-[#f0e4d7] bg-[color:rgb(255_247_237_/_0.94)] backdrop-blur-md transition-all duration-300 ${isCompact ? "py-1.5 shadow-[0_8px_28px_rgb(22_23_28_/_0.05)]" : "py-3"}`}>
      <div className="container-narrow flex min-h-10 items-center justify-between gap-5">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0 text-[1.05rem] font-extrabold tracking-[-.045em]">
          Kira<span className="text-[var(--accent)]">.</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={`text-[.72rem] font-bold transition-colors hover:text-[var(--accent)] ${pathname === item.href ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2"><Link href="/contact?inquiry=site-visit" className="button-primary min-h-9 px-3 text-[.65rem] lg:px-4 lg:text-xs">Contact Us<ArrowUpRight size={13} /></Link><button type="button" className="icon-button lg:hidden" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen((value) => !value)}>{isOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[57px] z-50 h-[calc(100dvh-57px)] bg-[var(--surface)] p-5 lg:hidden">
          <nav aria-label="Mobile navigation" className="container-site flex h-full flex-col">
            <div className="divide-y divide-[var(--stone)] border-y border-[var(--stone)]">
              {siteConfig.navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex min-h-14 items-center justify-between text-xl font-semibold">
                  {item.label}<span aria-hidden="true">Open</span>
                </Link>
              ))}
            </div>
            <Link href="/contact?inquiry=site-visit" onClick={() => setIsOpen(false)} className="button-primary mt-auto w-full">Schedule a Visit</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
