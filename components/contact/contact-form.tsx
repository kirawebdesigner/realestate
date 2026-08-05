"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { properties } from "@/data/properties";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export function ContactForm({ initialInquiry = "General inquiry", initialProperty = "" }: { initialInquiry?: string; initialProperty?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your full name.";
    if (!/^\+?[0-9\s-]{9,}$/.test(String(data.get("phone") ?? ""))) next.phone = "Enter a valid phone number.";
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (String(data.get("message") ?? "").trim().length < 10) next.message = "Add at least 10 characters so the team can understand your request.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="grid min-h-[540px] place-items-center rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-8 text-center" aria-live="polite">
        <div>
          <CheckCircle2 size={46} className="mx-auto text-[var(--success)]" />
          <h2 className="mt-6 font-display text-5xl font-semibold">Your inquiry is ready.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">This demonstration does not send personal information. A production connection would route the inquiry to the real property team.</p>
          <button type="button" className="button-primary mt-7" onClick={() => setIsSubmitted(false)}>Start Another Inquiry</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-[var(--radius-media)] border border-[var(--stone)] bg-[var(--surface)] p-5 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" autoComplete="name" error={errors.name} />
        <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+251 9..." error={errors.phone} />
      </div>
      <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="Optional if you prefer phone" error={errors.email} />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field"><span>Inquiry type</span><select name="inquiryType" defaultValue={initialInquiry}><option>General inquiry</option><option>Site visit</option><option>Property information</option><option>Investment inquiry</option><option>Property marketing</option></select></label>
        <label className="field"><span>Property interest</span><select name="propertyInterest" defaultValue={initialProperty}><option value="">Not selected</option>{properties.map((property) => <option key={property.slug} value={property.slug}>{property.title}</option>)}</select></label>
      </div>
      <fieldset>
        <legend className="field-label">Preferred contact method</legend>
        <div className="mt-3 flex flex-wrap gap-4">
          {["Phone", "Email", "WhatsApp"].map((method, index) => <label key={method} className="inline-flex min-h-11 cursor-pointer items-center gap-2"><input type="radio" name="preferredContact" value={method} defaultChecked={index === 0} className="size-4 accent-[#627117]" /> <span className="text-sm font-semibold">{method}</span></label>)}
        </div>
      </fieldset>
      <label className="field"><span>How can we help?</span><textarea name="message" placeholder="Tell us which property, timing or service you would like to discuss." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span id="message-error" className="field-error">{errors.message}</span>}</label>
      <button type="submit" className="button-primary w-full sm:w-fit"><Send size={18} />Prepare Inquiry</button>
      <p className="text-xs leading-5 text-[var(--muted)]">Sample form only. No personal information is sent or stored.</p>
    </form>
  );
}

function Field({ label, name, error, ...inputProps }: { label: string; name: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return <label className="field"><span>{label}</span><input name={name} {...inputProps} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />{error && <span id={errorId} className="field-error">{error}</span>}</label>;
}
