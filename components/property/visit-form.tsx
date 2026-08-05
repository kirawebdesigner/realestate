"use client";

import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

interface Errors { name?: string; phone?: string; date?: string }

export function VisitForm({ propertyTitle, compact = false }: { propertyTitle: string; compact?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your name.";
    if (!/^\+?[0-9\s-]{9,}$/.test(String(data.get("phone") ?? ""))) next.phone = "Enter a valid phone number.";
    if (!String(data.get("date") ?? "")) next.date = "Choose a preferred date.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-6 text-center" aria-live="polite">
        <CheckCircle2 className="mx-auto text-[var(--success)]" size={34} />
        <h2 className="mt-4 text-xl font-extrabold">Visit request prepared.</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">This demo keeps the request locally. A live site would send it to the property team.</p>
        <button type="button" className="button-secondary mt-5" onClick={() => setIsSubmitted(false)}>Send Another Request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`grid gap-4 ${compact ? "" : "rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-5 md:p-6"}`}>
      <div><p className="text-xs font-bold text-[#627117]">Schedule a visit</p><h2 className="mt-1 text-xl font-extrabold">See {propertyTitle}</h2></div>
      <label className="field"><span>Name</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "visit-name-error" : undefined} />{errors.name && <span id="visit-name-error" className="field-error">{errors.name}</span>}</label>
      <label className="field"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="+251 9..." aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "visit-phone-error" : undefined} />{errors.phone && <span id="visit-phone-error" className="field-error">{errors.phone}</span>}</label>
      <label className="field"><span>Preferred date</span><input name="date" type="date" min={new Date().toISOString().split("T")[0]} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "visit-date-error" : undefined} />{errors.date && <span id="visit-date-error" className="field-error">{errors.date}</span>}</label>
      <button type="submit" className="button-primary w-full"><CalendarCheck size={18} />Request a Visit</button>
      <p className="text-xs leading-5 text-[var(--muted)]">Sample form only. No personal information is sent or stored.</p>
    </form>
  );
}
