# HIPAA Compliance Audit — Premier Limb Lengthening Website

**Auditor:** Senior HIPAA-compliant Web/Dev Consultant
**Audit date:** 2026-05-15
**Scope:** Public-facing marketing site (Next.js 15 App Router) — routes under `/v2/*`, including the homepage, contact form, pricing, surgeon bio, journal articles, and shared layout/chrome.
**Status of site:** Pre-launch. Forms are stubbed (`action="#"`), no analytics/tracking pixels are wired in yet, and privacy/terms/accessibility pages do not exist. This is the best possible time to fix what's below — before traffic, before PHI starts moving.

> **Reading this document:** Findings are graded **CRITICAL / HIGH / MEDIUM / LOW**, each with a *What's there now*, a *Why it's a problem*, and a *What to change* recommendation. A consolidated **action checklist** sits at the end.

---

## Executive Summary

The site, as built, is a marketing brochure that **collects PHI without the legal scaffolding around it**. Premier Limb Lengthening is a HIPAA Covered Entity (a healthcare provider that transmits electronic health information for billing/treatment). Once an identifiable person submits the consultation form — even just name + email + "I'm interested in tibia lengthening for revision of a failed Turkey surgery" — that submission becomes **PHI**, and every downstream system that touches it must be covered by a BAA, encrypted, logged, and retained per Premier's record-retention policy.

**Top five risks today:**

1. **Consultation form posts to nowhere** (`action="#"`) — the moment it's wired up, it must hit a HIPAA-compliant endpoint with a BAA. No BAA = direct violation when a real submission lands.
2. **Privacy Policy, Terms, and Notice of Privacy Practices (NPP) don't exist.** The footer links to `/v2/privacy`, `/v2/terms`, `/v2/accessibility` — none of these routes are implemented. HIPAA *requires* a conspicuously posted NPP for any covered entity with a website.
3. **Testimonials likely lack written HIPAA Authorizations.** Three patient quotes (Marcus T. / David R. / James K. with city + profession) are reidentifying combinations; HIPAA §164.508 requires a *specific, signed* authorization to publish, even with a first-name-and-initial format.
4. **Patient X-ray image (`/dr-xray.jpg`) and patient-facing hero video (`/video/dr-hero.mp4`)** — if these depict real patients or contain identifiable imaging, they require Authorization plus de-identification per §164.514 Safe Harbor.
5. **No tracking-technology governance.** No analytics today, but the site is unprotected against the standard "let's add GA4 and Meta Pixel" request that follows launch. Per HHS OCR's December 2022 / March 2024 guidance, tracking pixels on healthcare sites that capture user interactions (form intent, page views about specific conditions) are PHI disclosures and require BAAs.

The fixes are not heroic. They are policy, process, and roughly 1–2 sprints of development work. Details below.

---

## 1. PHI Collection & Form Handling

### 1.1 Consultation form — `app/v2/contact/page.tsx`  · **CRITICAL**

**What's there now:**
- Fields: `first`, `last`, `email`, `phone`, `city`, `age`, free-text `message` ("Tell us briefly about your goals, timeline, and any prior consultations").
- `method="post"` `action="#"` — no real endpoint.
- A single consent checkbox: *"I consent to be contacted by Premier Limb Lengthening regarding my inquiry. My information is private and never sold."*

**Why it's a problem:**
- The combination of **name + DOB-equivalent (age) + city + email + phone + medical-intent narrative** is unambiguously PHI under §160.103. The free-text field invites users to disclose conditions, prior surgeries, complications, and protected diagnoses.
- The consent text is **marketing-grade**, not HIPAA-grade. It is *not* a Notice of Privacy Practices acknowledgement, not an Authorization for use/disclosure, and contains no language about how the data is stored, who can access it, retention period, breach notification rights, or the patient's right to request access/amendment.
- "Never sold" is not equivalent to "not used for marketing." HIPAA distinguishes them and requires Authorization for marketing use of PHI.
- No CAPTCHA / bot protection — easy to abuse, and abuse-floods can mask real submissions or create false PHI records.
- No declared TLS posture, no encryption-at-rest disclosure, no data minimization (do we *need* `age` and `city` before consult, or is that nice-to-have data accumulation?).

**What to change:**
1. **Wire the form to a HIPAA-compliant endpoint** — options:
   - Form processor under BAA: **Formstack HIPAA, Jotform HIPAA, Paubox Forms, Foyer, or Tebra/Kareo intake**.
   - Custom backend on AWS/GCP/Azure with a signed BAA, TLS 1.2+, AES-256 at rest, IAM-scoped access, audit logging (CloudTrail/equivalent), and 6-year retention per §164.530(j).
2. **Replace the consent block** with three discrete items:
   - Link to **Notice of Privacy Practices** (mandatory).
   - Acknowledgement: *"I understand this form transmits health-related information to Premier Limb Lengthening for the purpose of scheduling a consultation. My information will be treated as Protected Health Information under HIPAA."*
   - Optional separate checkbox for marketing follow-up (e.g., newsletters). Marketing must be opt-in **separately** and is revocable.
3. **Reduce required fields.** Make `age`, `city`, and the message *optional* at the inquiry stage; collect details in the actual consultation. Data minimization is a HIPAA Security Rule principle (§164.306(b)).
4. **Add a discreet pre-form banner**: *"Please do not submit emergency medical concerns through this form. Call 911 or your local emergency department."*
5. **Add CAPTCHA** (hCaptcha or Cloudflare Turnstile — Turnstile is preferred, less invasive and covers basic abuse).
6. **Confirmation page** must NOT echo the submitted PHI back in the URL or in plaintext analytics.
7. **Email confirmations** to the patient must not contain PHI unless sent via an encrypted channel (Paubox, Virtru, or "we will contact you" without details).

**Code locations:**
- [app/v2/contact/page.tsx:56-110](app/v2/contact/page.tsx#L56-L110) — form markup
- [app/v2/contact/page.tsx:97-101](app/v2/contact/page.tsx#L97-L101) — consent text

### 1.2 Phone / Fax exposure  · **MEDIUM**

**What's there now:**
- `(909) 461-4984` and fax `(909) 596-4344` appear in the footer, hero, contact card, and FinalCTA.
- "Call (909) 461-4984 for an immediate response" copy invites verbal PHI disclosure to whoever picks up.

**Why it's a problem:**
- Not a website code issue, but a workforce-training issue HIPAA holds the covered entity responsible for. Anyone answering the published line is a workforce member receiving PHI.
- Fax remains a HIPAA-tolerated channel, but misdials are the #1 source of inadvertent disclosure violations.

**What to change:**
- Confirm front-desk / coordinator team have completed HIPAA training and have a signed Confidentiality Agreement.
- Confirm fax cover sheet contains the standard HIPAA confidentiality footer.
- Consider replacing the fax number on the public site with "Fax available upon request" — there is no marketing benefit to publishing it.

---

## 2. Testimonials & Patient Stories

### 2.1 Homepage testimonials — `components/v2/Testimonials.tsx`  · **HIGH**

**What's there now:**
Three quotes attributed as:
- *"Marcus T. — Software Engineer · San Francisco"* — "I gained 3 inches and my only regret is not doing it sooner."
- *"David R. — Finance · New York"* — describes concierge experience.
- *"James K. — Revision Patient · Texas"* — *"I had a failed surgery in Turkey and was terrified to try again… I'm walking normally again."*

**Why it's a problem:**
- **First-name + last-initial format is NOT de-identification under HIPAA Safe Harbor (§164.514(b)).** Combined with profession + city + procedure + outcome + treatment date, these are reasonably re-identifiable individuals.
- Marcus + "Software Engineer in SF who got 3" of limb lengthening" is identifying. James K. + "failed Turkey surgery, Texas" is *very* identifying.
- Publishing a patient outcome — even an anonymized one — without a **signed Authorization (§164.508)** that specifically permits website use is a disclosure violation.
- A HIPAA-compliant authorization for marketing must:
  1. Describe the PHI to be used (the quote, the photo if any, the diagnosis disclosed).
  2. State who may receive it (Premier's website, social, ad platforms).
  3. State an expiration date or event.
  4. Disclose the patient's right to revoke in writing.
  5. State whether Premier received financial compensation for the disclosure (testimonial incentives).

**What to change:**
1. **For every published testimonial, obtain a written HIPAA Marketing Authorization on file.** Store the signed document with retention of at least 6 years from expiration.
2. **De-identify more aggressively** — drop the city and profession unless the patient explicitly authorized them. Use first name only OR first-and-last initial. If the patient *wants* their full name and city used and signed for it, that's their right.
3. **Remove specific medical history claims that the patient has not authorized.** The "failed surgery in Turkey" quote is a disclosure of a specific medical event — needs explicit, granular Authorization.
4. **Add an honest-results disclaimer**: *"Patient testimonials represent individual experiences. Outcomes vary. Testimonials are published with the patient's written authorization."*
5. **For any before/after photos** (the page hints at `#ba` "See Before & After Results"): require a separate, photo-specific Authorization. Photos of body parts that include identifying tattoos/scars/birthmarks are PHI.

**Code locations:**
- [components/v2/Testimonials.tsx:3-42](components/v2/Testimonials.tsx#L3-L42)

### 2.2 Aggregate statistics  · **LOW**

**What's there now:**
- *"Hundreds of procedures performed"*, *"50+ states & countries served"*, *"17+ surgeon group"*.

**Why it's a problem:**
- Aggregate, non-identifiable, no patient PHI — these are fine *for HIPAA*.
- Two adjacent concerns are **FTC truth-in-advertising** and **state medical-board advertising rules**:
  - "Hundreds" is vague enough to be defensible.
  - "50+ states & countries" implies practice across state lines; check that Dr. Basmajian's licensure permits patient consultations (telemedicine) in each named jurisdiction, or soften to "Patients from 50+ states and countries have traveled to us in Pomona, California for treatment."

**What to change:**
- Audit telemedicine licensure before claiming multi-state service.
- Keep aggregate stats; do not add granular outcomes (e.g., "97% satisfaction" without a defensible study).

---

## 3. Tracking, Analytics & Third-Party Scripts

### 3.1 Current state  · **N/A (good — for now)**

**What's there now:**
- No Google Analytics, no GTM, no Meta Pixel, no LinkedIn Insight, no Hotjar, no FullStory, no chat widgets.
- Only third-party script is the inline `<script type="application/ld+json">` for schema.org metadata — not a tracker.
- The mention of "ghl-form-styles.css" in the repo suggests **GoHighLevel CRM** was contemplated for forms. GHL is **not HIPAA-compliant by default**; it requires their HIPAA-tier plan and a BAA.

**Why this matters anyway:**
- HHS OCR's **December 1, 2022 Bulletin** (reaffirmed March 2024) clarified that tracking technologies on a regulated entity's user-authenticated pages **and** unauthenticated pages that address specific health conditions/treatments **are disclosures of PHI** when they capture IP, device ID, page URL, or form interaction.
- This site addresses specific conditions (limb-length discrepancy, revision surgery, cosmetic limb lengthening). Page-view data alone, combined with IP, is reasonably PHI.
- Adding GA4 / Meta Pixel post-launch without a BAA + IP-anonymization + consent banner would create immediate exposure.

**What to change (before launch):**
1. **Adopt a tracking-technology policy** that pre-approves only HIPAA-aware providers:
   - **Google Analytics 4** is allowed only with: IP anonymization, Google Signals disabled, no User-ID feature, no Enhanced Measurement on form events, and a Data Processing Amendment. Even then, OCR's position is that GA4 on healthcare sites is risky. Consider **server-side GTM** or **Plausible / Fathom / Matomo (self-hosted)** instead — all natively privacy-respecting.
   - **Meta Pixel / TikTok Pixel / LinkedIn Insight**: **prohibited** on this site without explicit Authorization for marketing disclosure — those platforms will not sign a BAA for health data and HHS has been explicit in enforcement.
   - **Chat widgets** (Intercom, Drift, etc.): only with BAA. Most consumer-grade chats won't sign.
2. **Cookie consent banner**: implement an opt-in (not opt-out) consent banner that defaults all non-essential cookies to OFF. EU patients (GDPR), California residents (CCPA/CPRA), and HIPAA-overlap all converge on this requirement. Recommended: **Cookiebot, Osano, or a lightweight in-house banner** that integrates with Google Consent Mode v2.
3. **Document a Tracking Technology Inventory** — a list of every script that runs on the production site, the data it collects, the legal basis, and whether a BAA exists. Re-review quarterly.
4. **Forbid third-party fonts/CDNs that log IPs without anonymization.** The site uses `next/font` — good, that self-hosts. Don't switch to Google Fonts CDN later.

### 3.2 Embedded media  · **LOW**

**What's there now:**
- Hero video `/video/dr-hero.mp4` and library video files are self-hosted in `/public`.

**Why this is good:**
- Self-hosted video does not phone home to YouTube/Vimeo trackers. Keep it that way.
- If you must embed YouTube later, use `youtube-nocookie.com` and lazy-load only on user interaction.

---

## 4. Privacy Policy, Terms, NPP & Disclaimers

### 4.1 Missing legal pages  · **CRITICAL**

**What's there now:**
- Footer links `Privacy Policy`, `Terms`, `Accessibility` to `/v2/privacy`, `/v2/terms`, `/v2/accessibility`.
- **None of these routes exist** ([components/v2/FooterV2.tsx:55-60](components/v2/FooterV2.tsx#L55-L60)). They will 404 in production.
- No Notice of Privacy Practices (NPP) anywhere on the site.
- No HIPAA Authorization template offered.
- No "Your HIPAA Rights" page describing patient rights (access, amendment, accounting of disclosures, restriction request, confidential communication).

**Why it's a problem:**
- HIPAA §164.520(c)(3) requires covered entities that maintain a website that provides information about services or benefits to **prominently post the NPP** and make it available electronically.
- Without a Privacy Policy + Terms + NPP, you are simultaneously violating HIPAA, CCPA/CPRA disclosure rules, GDPR (if EU traffic), and ADA requirements.

**What to change:**
1. **Build the four mandatory pages** before any production launch:
   - `/privacy` — General Privacy Policy (covers website-level data: cookies, analytics, form submissions for non-PHI use).
   - `/notice-of-privacy-practices` — HIPAA NPP. Include: how PHI is used and disclosed for TPO (Treatment, Payment, Operations), patient rights, contact info for the Privacy Officer, effective date, complaints process (Premier + HHS OCR).
   - `/terms` — Terms of Use (covers content disclaimers, IP, liability limitations, governing law).
   - `/accessibility` — WCAG 2.1 AA compliance statement + contact for accommodations.
2. **Link the NPP from the footer**, the contact form (above the submit button), and any patient-portal login screen.
3. **Surface the Privacy Officer**: HIPAA requires a designated Privacy Officer and contact info on the NPP. Display a real email like `privacy@premierlimblengthening.com` (route to the Privacy Officer's inbox; ensure encryption at rest).
4. **Templates** — do not paste a generic privacy policy. Have counsel or a HIPAA-specialty provider (e.g., Compliancy Group, Accountable HQ, HIPAA One) draft Premier-specific documents.

### 4.2 Site-wide medical disclaimer  · **MEDIUM**

**What's there now:**
- Pricing page footer mentions: *"No hidden fees…"* and outcome statements like *"Results are permanent"*, *"Gain up to 3–6 inches"*, *"Femur lengthening typically adds 2–3 inches."*
- FAQ contains specific outcome claims and recovery timelines.

**Why it's a problem:**
- These are *medical claims* and *outcome promises*. FTC and state medical-board guidelines require:
  - A truthful, substantiated basis for each claim.
  - A clearly visible disclaimer that **individual results vary** and that the content is **not medical advice**.
- "Results are permanent" is technically true for height gain but should be qualified ("once bone consolidates and the nail is removed, the achieved height is anatomic and permanent — barring trauma").

**What to change:**
1. Add a persistent **site-wide medical disclaimer** to the footer:
   > *The content on this website is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Individual results vary. Always seek the advice of a qualified physician.*
2. Add a **per-page outcome disclaimer** on Results, Pricing, and Testimonials sections (small but visible).
3. Review all "100%", "always", "permanent", and "guaranteed" language for substantiation.
4. Consider adding a **Medical Advisory Board / Reviewed-by** byline on journal articles, with reviewer and review date (also boosts E-E-A-T for SEO without compliance risk).

### 4.3 "Confidential consultation" language  · **LOW**

- The phrase appears in multiple CTAs ("Schedule a Confidential Consultation"). This is marketing language with HIPAA implications — it implies an enforceable confidentiality posture. Ensure operational practices (intake calls, virtual-consult platform) actually deliver "confidential," and link the term to the NPP so the user can understand what "confidential" means under HIPAA.

---

## 5. Media & Imagery — PHI in Photos and Video

### 5.1 X-ray image  · **HIGH**

**What's there now:**
- `/public/dr-xray.jpg` used in the Concierge aside ([components/v2/Concierge.tsx:91-96](components/v2/Concierge.tsx#L91-L96)) with alt text *"Dr. Hrayr Basmajian reviewing an X-ray of a patient's femur"*.

**Why it's a problem:**
- If the X-ray is a **real patient image**, it is PHI. HIPAA Safe Harbor (§164.514(b)) requires removal of 18 identifiers — for radiographic imaging that includes any embedded DICOM metadata (patient name, MRN, study date, institution).
- Even with metadata stripped, a unique implant orientation + bone morphology + visible date stamp on the film can re-identify.

**What to change:**
1. Confirm the X-ray's provenance:
   - **Stock/illustrative** → fine, add a small caption: *"Illustrative imaging. Not an actual patient X-ray."*
   - **Premier's de-identified case** → strip ALL embedded metadata, blur any identifiers in the corner of the film, obtain Authorization on file.
2. Apply the same scrutiny to any future before/after photos, intra-op stills, MRI/CT slices, or radiographic content.

### 5.2 Hero video & background footage  · **HIGH**

**What's there now:**
- `/public/video/dr-hero.mp4` — autoplay hero video (HeroStage). Wireframe described it as *"Dr. Basmajian consulting with patient + aspirational SoCal B-roll."*
- `/public/Limb-Lenghthening_Video.mp4` (note the typo — separately, fix the filename) and `/public/PLL-video-horizontal.mp4` are also in the repo.

**Why it's a problem:**
- If the video shows identifiable patients (face, distinctive tattoo, name on a chart in the background), each patient must have signed a media-specific HIPAA Authorization AND a model release.
- B-roll of clinic interiors must not show whiteboards, monitors, or paperwork containing patient names or MRNs (the most common video compliance failure).

**What to change:**
1. Inventory every video asset. For each, document:
   - Are real patients visible? → Need Authorization.
   - Is any clinic environmental detail showing PHI in the background? → Re-edit or blur.
2. Use only actors/staff, or patients with active written authorization.
3. Add a caption track for ADA compliance (also good SEO).

### 5.3 Other images  · **LOW**

- `dr-picture.jpg`, `Dr-ig-pic.jpg`, `FAAOS-Badge-150x150.png` — Dr. Basmajian + badge. No patient PHI. Fine, assuming Dr. Basmajian has consented to use of his likeness (employment agreement typically covers this).

---

## 6. Third-Party Integrations & Data Flows

### 6.1 Telehealth / "secure video"  · **HIGH**

**What's there now:**
- Multiple sections promise *"Initial consultation via secure video"* and *"Post-op check-ins from home"* (Concierge, Contact, AEO boilerplate).

**Why it's a problem:**
- "Secure" must be backed by a HIPAA-eligible platform. **FaceTime, consumer Zoom, Google Meet (free), WhatsApp, and SMS video are NOT HIPAA-compliant by default**.
- Acceptable platforms with BAA: **Zoom for Healthcare, Doxy.me, Updox, Spruce, OhMD, eVisit, athenaTelehealth, Epic MyChart video**.

**What to change:**
- Confirm which platform Premier uses and that a BAA is on file.
- Add a footnote on the consult/contact page: *"Virtual consultations are conducted on [Platform], a HIPAA-compliant telehealth service. A BAA is in place."*

### 6.2 CareCredit / financing  · **MEDIUM**

**What's there now:**
- Pricing component and Financing component reference CareCredit (`"Financing available through CareCredit. As low as $1,200/month with approved credit."`).
- Footer link to `/v2/pricing#financing`.

**Why it's a problem:**
- CareCredit is a **third-party financial entity**. If Premier shares PHI (treatment type, diagnosis) to support a credit application, that's a disclosure for payment purposes. HIPAA permits this under TPO (Treatment-Payment-Operations) without Authorization, **but** a BAA is required because CareCredit acts as a Business Associate when processing healthcare-linked transactions.
- If a credit application form is iframed or co-branded on Premier's site, that iframe carries the same tracking-tech concerns as §3.

**What to change:**
- Confirm a BAA with Synchrony/CareCredit exists.
- Do NOT iframe CareCredit's application — link out via a clear `target="_blank" rel="noopener noreferrer"` and a brief "You are leaving the Premier website" interstitial.

### 6.3 Hosting & infrastructure  · **HIGH (assumption-based)**

**What's there now:**
- Next.js 15 App Router. Hosting target not declared in the repo, but `next.config.mjs` has `poweredByHeader: false` (good).
- No `vercel.json`, no `netlify.toml`, no Dockerfile — deploy target is undefined.

**Why it matters:**
- Premier needs a **BAA with the hosting provider** if any PHI traverses the host:
  - **Vercel** — does NOT sign a BAA on standard tiers. PHI cannot be processed on Vercel Hobby/Pro. Vercel Enterprise may offer a BAA — confirm in writing.
  - **Netlify** — same; standard tiers no BAA.
  - **AWS Amplify / AWS direct** — BAA available via AWS Business Associate Addendum.
  - **Google Cloud Run / GCP** — BAA available.
  - **Azure App Service** — BAA available.
- For a marketing site, the simplest split is: host the static marketing site anywhere; route the **form submission** to a HIPAA-compliant backend (a separate API on AWS/GCP/Azure with BAA). PHI never sits on the marketing host.

**What to change:**
- Decide and document: which provider hosts what, where PHI lives, BAA in hand.
- Add a "Subprocessors" appendix to the Privacy Policy listing every vendor that touches PHI.

### 6.4 CDN, image optimization, fonts  · **LOW**

- `next/font` self-hosts the typefaces — good.
- Next.js `<Image>` uses default optimization — runs on the host. If the host is Vercel without BAA, this is acceptable for marketing imagery (no PHI), but never feed patient X-rays through it without confirming the BAA chain.

---

## 7. SEO, Indexability & Inadvertent Disclosure

### 7.1 Mixed robots posture  · **MEDIUM**

**What's there now:**
- [app/robots.ts](app/robots.ts) — disallows `/api/`, `/_next/`, `/design-system`.
- Most v2 sub-pages set `robots: { index: false, follow: false }` in metadata: contact, about, dr-basmajian, journal, pricing, slug articles.
- Only `/v2` (homepage) is indexable.

**Why it matters:**
- Inconsistent posture is suspicious — *why* is the doctor's bio noindex? If accidental, you're SEO-invisible for branded searches.
- For HIPAA: any page that might inadvertently expose PHI (e.g., a future testimonial archive, a real patient story page) must be noindex'd. *But* unindexed ≠ private; search engines crawl despite noindex sometimes. **Real PHI must be authenticated, not just noindex'd.**

**What to change:**
- Decide intentionally per page. Recommended: index the marketing site (homepage, pricing, dr-basmajian, journal, articles, your-surgery). Keep `/contact` noindex if it's primarily a form (low SEO value; reduces spam-form abuse).
- Authenticate any future "patient portal," "before/after gallery," or "case study" pages behind login + MFA + audit log. Never put PHI on a public URL behind a UUID and call it "secure" — that's security through obscurity and not HIPAA-compliant.

### 7.2 JSON-LD structured data  · **LOW**

- [lib/jsonld.ts](lib/jsonld.ts) emits MedicalBusiness, Physician, MedicalProcedure, ItemList. All aggregate, no PHI. Fine. Good for E-E-A-T.

### 7.3 Form action stub  · **CRITICAL (already covered above)**

- `action="#"` means the form currently does nothing. A user submitting is harmless today but **the day this is wired up to anything other than a HIPAA-compliant endpoint, you have a violation**. Treat this as a release-blocker.

---

## 8. Security Posture (HIPAA Security Rule §164.306–318)

These items aren't visible in the marketing repo but are required HIPAA controls every Premier system that touches PHI must have:

| Control | Required by | Status |
|---|---|---|
| Risk Analysis (§164.308(a)(1)) | All CEs | **Required annually.** Document a Security Risk Assessment using HHS SRA Tool or equivalent. |
| Workforce HIPAA training | §164.530(b) | **Required.** Document every workforce member's training within 30 days of hire + annually. |
| Access controls + unique user IDs | §164.312(a) | **Required** on any system holding PHI. |
| Audit logs | §164.312(b) | **Required** — every read/write of PHI. |
| Encryption at rest + in transit | §164.312(a)(2)(iv), §164.312(e) | **Addressable, but de facto required.** AES-256 at rest, TLS 1.2+ in transit. |
| Backup + disaster recovery | §164.308(a)(7) | **Required.** Test restoration at least annually. |
| Breach notification plan | §164.400–414 | **Required.** Patients notified within 60 days; HHS notified within 60 days (≥500 affected) or annually (<500). |
| BAA inventory | §164.502(e), §164.504(e) | Every vendor that touches PHI. |
| Designated Privacy Officer & Security Officer | §164.530(a), §164.308(a)(2) | Named individuals on file. |
| Sanction policy | §164.308(a)(1)(ii)(C) | Documented consequences for workforce violations. |

---

## 9. Consolidated Action Checklist

### Must do before any production launch (release-blockers)

- [ ] **Build `/privacy`, `/terms`, `/accessibility`, `/notice-of-privacy-practices` pages** with content drafted by counsel.
- [ ] **Replace form `action="#"`** with a HIPAA-compliant endpoint (Formstack HIPAA / Jotform HIPAA / custom backend with BAA).
- [ ] **Rewrite the consent block** on the contact form (3 separate items: NPP acknowledgement, HIPAA treatment, optional marketing opt-in).
- [ ] **Add an emergency disclaimer** above the contact form.
- [ ] **Obtain signed HIPAA Marketing Authorizations for every published testimonial.** Remove or re-anonymize quotes that cannot be backed by a signed authorization.
- [ ] **Confirm the X-ray and hero video assets** are either stock illustrative content (label them) or supported by Authorization + de-identification.
- [ ] **Sign BAAs** with: hosting provider (if PHI traverses), form processor, telehealth platform, CareCredit/Synchrony, email provider (if email confirmations sent), and CRM (if any).
- [ ] **Designate Privacy Officer & Security Officer** with contact emails published on the NPP.
- [ ] **Add site-wide medical disclaimer** to the footer.
- [ ] **Add `mailto:privacy@premierlimblengthening.com`** and breach-reporting language to the NPP.

### High priority — within 30 days of launch

- [ ] **Implement consent-banner / cookie management** (Cookiebot / Osano / in-house) defaulted to opt-out for non-essential cookies.
- [ ] **Adopt tracking-technology policy** before adding any analytics. Default to Plausible or self-hosted Matomo. Forbid Meta Pixel.
- [ ] **CAPTCHA on the contact form** (Cloudflare Turnstile preferred).
- [ ] **Add per-page outcome disclaimers** on Pricing, Results, Testimonials, FAQ.
- [ ] **Confirm telehealth platform** is HIPAA-eligible and a BAA is signed.
- [ ] **Confirm multi-state telemedicine licensure** before claiming "50+ states served" — or soften the claim.

### Operational / ongoing

- [ ] **Annual Risk Analysis** (HHS SRA Tool).
- [ ] **Annual workforce HIPAA training**, tracked in an LMS.
- [ ] **Quarterly review** of subprocessors and BAA inventory.
- [ ] **Quarterly tracking-tech audit** — verify no new pixels/scripts have been added without approval.
- [ ] **Backup restoration test** at least annually.
- [ ] **Document breach-notification runbook** and test it tabletop-style annually.

---

## 10. Files Touched in This Audit

For traceability, here are the files this audit reviewed:

- [app/layout.tsx](app/layout.tsx)
- [app/v2/page.tsx](app/v2/page.tsx)
- [app/v2/contact/page.tsx](app/v2/contact/page.tsx) — **form**
- [app/v2/about/page.tsx](app/v2/about/page.tsx)
- [app/v2/pricing/page.tsx](app/v2/pricing/page.tsx)
- [app/v2/dr-basmajian/page.tsx](app/v2/dr-basmajian/page.tsx)
- [app/v2/journal/page.tsx](app/v2/journal/page.tsx)
- [app/v2/your-surgery/page.tsx](app/v2/your-surgery/page.tsx)
- [app/v2/[slug]/page.tsx](app/v2/[slug]/page.tsx)
- [app/robots.ts](app/robots.ts)
- [components/v2/HomePage.tsx](components/v2/HomePage.tsx)
- [components/v2/HeroStage.tsx](components/v2/HeroStage.tsx) — **hero video**
- [components/v2/Article.tsx](components/v2/Article.tsx)
- [components/v2/Bio.tsx](components/v2/Bio.tsx) — **portrait**
- [components/v2/Concierge.tsx](components/v2/Concierge.tsx) — **X-ray image**
- [components/v2/Testimonials.tsx](components/v2/Testimonials.tsx) — **patient quotes**
- [components/v2/Pricing.tsx](components/v2/Pricing.tsx)
- [components/v2/Results.tsx](components/v2/Results.tsx)
- [components/v2/FaqV2.tsx](components/v2/FaqV2.tsx)
- [components/v2/FinalCta.tsx](components/v2/FinalCta.tsx)
- [components/v2/NavV2.tsx](components/v2/NavV2.tsx)
- [components/v2/FooterV2.tsx](components/v2/FooterV2.tsx) — **broken legal links**
- [components/v2/Pillars.tsx](components/v2/Pillars.tsx)
- [components/v2/Candidate.tsx](components/v2/Candidate.tsx)
- [components/v2/Process.tsx](components/v2/Process.tsx)
- [components/content/JsonLd.tsx](components/content/JsonLd.tsx)
- [lib/jsonld.ts](lib/jsonld.ts)
- [lib/site.ts](lib/site.ts)
- [next.config.mjs](next.config.mjs)
- [package.json](package.json)
- [public/](public/) — image and video assets
- [scraped_content/](scraped_content/) — article content sources

---

## 11. Final Note

This audit covers the **website only**. A complete HIPAA program for Premier Limb Lengthening also requires:

- A Security Risk Assessment of EHR, scheduling, billing, fax, and email systems.
- BAA inventory across **all** vendors (not just web).
- Workforce training & sanction documentation.
- Patient-facing forms (intake, financial responsibility, NPP acknowledgement) in clinic.
- Physical and administrative safeguards at the Pomona office.

Engage a HIPAA compliance partner (Compliancy Group, Accountable HQ, HIPAA One) or HIPAA-experienced counsel to operationalize the full program. The website is one piece of a larger compliance picture.

— end of audit —
