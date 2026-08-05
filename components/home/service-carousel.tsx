"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const services = [
  { title: "Property Presentation", text: "Editorial listings, useful specifications and confident buyer journeys.", image: "/images/properties/modern-exterior.jpg" },
  { title: "Residential Advisory", text: "Clear property comparison for homes across Addis Ababa.", image: "/images/properties/villa-exterior.jpg" },
  { title: "Site Visit Coordination", text: "A direct path from browsing to a well-prepared property visit.", image: "/images/properties/city-tower.jpg" },
];

export function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const move = (direction: number) => setIndex((value) => (value + direction + services.length) % services.length);
  const item = services[index];

  return (
    <div className="grid items-end gap-7 lg:grid-cols-[.82fr_1.18fr]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-white sm:aspect-[5/4] lg:aspect-[4/5]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={item.image} className="absolute inset-0" initial={reduce ? false : { opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -35 }} transition={{ duration: .42, ease: [.16, 1, .3, 1] }}>
            <Image src={item.image} alt={`${item.title} sample architectural property`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="pb-2">
        <p className="text-xs font-bold text-[var(--accent)]">0{index + 1} / 0{services.length}</p>
        <h3 className="display-title mt-4 text-4xl md:text-5xl">{item.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">{item.text}</p>
        <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold">Explore service <ArrowRight size={15} /></Link>
        <div className="mt-10 flex gap-2">
          <button className="icon-button bg-white" onClick={() => move(-1)} aria-label="Previous service"><ArrowLeft size={17} /></button>
          <button className="icon-button bg-white" onClick={() => move(1)} aria-label="Next service"><ArrowRight size={17} /></button>
        </div>
      </div>
    </div>
  );
}
