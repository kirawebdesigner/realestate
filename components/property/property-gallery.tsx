"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PropertyImage } from "@/types/property";

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((value) => value === null ? 0 : (value + 1) % images.length);
      if (event.key === "ArrowLeft") setActiveIndex((value) => value === null ? 0 : (value - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [images.length, isOpen]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
        {images.slice(0, 3).map((image, index) => (
          <button key={image.src} type="button" onClick={() => setActiveIndex(index)} className={`group relative min-h-64 overflow-hidden rounded-[var(--radius-media)] text-left ${index === 0 ? "md:col-span-8 md:row-span-2 md:min-h-[620px]" : "md:col-span-4 md:min-h-0"}`} aria-label={`Open image ${index + 1} of ${title}`}>
            <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes={index === 0 ? "(max-width: 768px) 100vw, 67vw" : "(max-width: 768px) 100vw, 33vw"} className="property-image object-cover" />
            {index === 0 && <span className="absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] bg-[color:rgb(251_250_246_/_0.94)] px-4 text-sm font-bold text-[var(--ink)]"><Expand size={17} />View gallery</span>}
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[color:rgb(10_12_10_/_0.96)] p-3 text-white" role="dialog" aria-modal="true" aria-label={`${title} image gallery`}>
          <button ref={closeButton} type="button" className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full border border-white/40 bg-black/30" onClick={() => setActiveIndex(null)} aria-label="Close gallery"><X size={24} /></button>
          <button type="button" className="absolute left-3 z-10 grid size-12 place-items-center rounded-full border border-white/40 bg-black/30 md:left-8" onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)} aria-label="Previous image"><ChevronLeft size={28} /></button>
          <div className="relative h-[82dvh] w-[min(88vw,1500px)]">
            <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button type="button" className="absolute right-3 z-10 grid size-12 place-items-center rounded-full border border-white/40 bg-black/30 md:right-8" onClick={() => setActiveIndex((activeIndex + 1) % images.length)} aria-label="Next image"><ChevronRight size={28} /></button>
          <p className="absolute bottom-4 text-sm">{activeIndex + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
