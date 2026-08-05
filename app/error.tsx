"use client";

import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-site grid min-h-[65dvh] place-items-center py-16 text-center">
      <div><p className="eyebrow text-[var(--error)]">Something went wrong</p><h1 className="mt-5 font-display text-6xl font-semibold">This page needs another try.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">The rest of the demo is still available. Retry this view or return through the main navigation.</p><button type="button" onClick={reset} className="button-primary mt-7"><RotateCcw size={18} />Try Again</button></div>
    </div>
  );
}
