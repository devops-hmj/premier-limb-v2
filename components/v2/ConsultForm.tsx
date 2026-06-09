"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * ConsultForm — the consultation request form. Submits to /api/consult, which
 * forwards the lead to the GoHighLevel inbound webhook server-side.
 */
export function ConsultForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      first_name: fd.get("first"),
      last_name: fd.get("last"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city"),
      age: fd.get("age"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      source: "Website consultation form",
    };
    setStatus("submitting");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ink bg-paper p-8 lg:p-10">
        <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-4 inline-flex items-center gap-2.5">
          <span className="inline-block w-[22px] h-px bg-spine" aria-hidden />
          Request Received
        </div>
        <h2 className="font-serif font-normal text-[28px] lg:text-[34px] leading-[1.12] tracking-[-0.01em] text-ink mb-4 max-w-[20ch]">
          Thank you. <em className="italic text-spine">We&rsquo;ll be in touch.</em>
        </h2>
        <p className="text-[15px] leading-[1.65] text-ink-soft max-w-[46ch]">
          Your request reached our team. We respond within one business day. For
          anything urgent, call{" "}
          <a href={site.phoneHref} className="text-spine border-b border-spine">{site.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-ink bg-paper p-8 lg:p-10"
      aria-label="Consultation request"
    >
      <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-5 inline-flex items-center gap-2.5">
        <span className="inline-block w-[22px] h-px bg-spine" aria-hidden />
        Consultation Request
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Field name="first" label="First name" required />
        <Field name="last" label="Last name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Phone" type="tel" required />
        <Field name="city" label="City of residence" />
        <Field name="age" label="Age" type="number" />
      </div>

      <div className="mt-6">
        <label
          htmlFor="message"
          className="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink leading-[1.55] focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors"
          placeholder="Tell us briefly about your goals, timeline, and any prior consultations."
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1.5 w-4 h-4 accent-spine"
        />
        <label htmlFor="consent" className="text-[13px] leading-[1.55] text-ink-soft">
          I consent to be contacted by Premier Limb Lengthening regarding my
          inquiry. My information is private and never sold.
        </label>
      </div>

      {status === "error" && (
        <p className="mt-5 text-[13px] leading-[1.55] text-warn">
          Something went wrong sending your request. Please try again, or call{" "}
          <a href={site.phoneHref} className="underline">{site.phone}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-8 inline-flex items-center gap-3 px-6 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium hover:bg-spine-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send Inquiry"}
        <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2"
      >
        {label}
        {required && <span aria-hidden className="text-spine"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors"
      />
    </div>
  );
}
