"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65, ease: [.16, 1, .3, 1] }}>
      {children}
    </motion.div>
  );
}
