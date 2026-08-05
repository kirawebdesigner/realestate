import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container-site grid min-h-[65dvh] place-items-center py-16 text-center">
      <div><p className="eyebrow text-[#627117]">Page not found</p><h1 className="mt-5 font-display text-6xl font-semibold md:text-8xl">This address is not listed.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">Return to the complete property collection and continue browsing.</p><Link href="/properties" className="button-primary mt-7"><ArrowLeft size={18} />Browse Properties</Link></div>
    </div>
  );
}
