import type { Metadata } from "next";
import { LegalDocument } from "@/components/v2/legal/LegalDocument";
import { site } from "@/lib/site";

import "../v2.css";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Premier Limb Lengthening's commitment to website accessibility, our work toward WCAG 2.1 Level AA, and how to request an accommodation.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement · Premier Limb Lengthening",
    description:
      "Our commitment to an accessible website, our WCAG 2.1 AA goal, and how to reach us for help or accommodations.",
    url: "/accessibility",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const ACCESSIBILITY_BODY = `
## Our Commitment

Premier Limb Lengthening is committed to ensuring that its website is accessible to people with disabilities, including patients and prospective patients who use assistive technology. We want everyone who visits ${site.domain} to be able to read about our care, understand their options, and reach us, regardless of ability or the tools they use to browse the web.

Premier Limb Lengthening is a separate practice from Premier Orthopaedic and Trauma Specialists. Dr. Hrayr Basmajian founded both practices, but Premier Limb Lengthening is its own practice. It is not a division, subsidiary, or part of Premier Orthopaedic and Trauma Specialists. This statement describes the accessibility of the Premier Limb Lengthening website only. References to "we," "us," "our," and "the practice" mean Premier Limb Lengthening.

Accessibility matters to us because our patients come to us with real physical needs, and the web should not be one more barrier. We treat accessibility as part of good care, not an afterthought, and we are glad to hear from you if anything on this site gets in your way.

## Conformance Status

Our conformance target is the Web Content Accessibility Guidelines (WCAG) version 2.1, Level AA. WCAG 2.1 AA is a widely recognized standard for web accessibility and is the common baseline referenced under the Americans with Disabilities Act (ADA) and Section 508. The guidelines are organized around four principles: content should be perceivable, operable, understandable, and robust for the people who use it.

We want to be honest about where we are. We aim to conform to WCAG 2.1 Level AA and are actively working toward full conformance. At present, the website substantially conforms to that standard, and it is partially conformant while we continue to identify and address known issues. We have not claimed perfect conformance, because accessibility is a moving target as content and technology change, and because parts of the site rely on third-party services we do not fully control. Those areas are described under Known Limitations and Third-Party Content below.

## Measures We Take

We have built and continue to maintain this website with accessibility in mind. The measures we take include:

- Using semantic HTML structure and page landmarks so assistive technology can identify navigation, main content, and other regions of each page
- Writing descriptive headings and meaningful link text so that the purpose of a link or section is clear out of context
- Providing alternative text for images that carry meaning, and treating purely decorative images so they do not add noise for screen reader users
- Choosing colors in our design system with sufficient contrast between text and its background for readability
- Supporting keyboard-operable navigation, so the site can be used without a mouse, with a visible focus indicator that shows where you are on the page
- Building responsive layouts that reflow and remain usable when the page is zoomed or viewed on small screens
- Serving self-hosted fonts, which improves performance and privacy and helps text render reliably
- Working toward captions and transcripts for video content so audio and visual information is available in text
- Testing with assistive technology and addressing issues we find as part of our ongoing review

## Compatibility with Browsers and Assistive Technology

This website is designed to work with recent versions of major web browsers, including Chrome, Safari, Firefox, and Edge. It is designed to be compatible with common screen readers, such as NVDA and JAWS on Windows and VoiceOver on macOS and iOS, when those tools are used with a supported browser.

Older browsers, outdated versions of assistive technology, or unusual combinations of the two may produce a degraded experience. If you are able to update your browser or assistive software, that often gives the best results. If updating is not an option for you, please reach out and we will help you get the information you need another way.

## Known Limitations

Despite our efforts, some content on this website may not yet be fully accessible. We want to name those areas plainly rather than hide them.

Some content on this site is embedded from outside vendors, and we do not control how those vendors build their tools. Known areas include:

- The chat widget, provided through the GoHighLevel and LeadConnector platform
- The financing application, which is hosted by our financing partner, CareCredit and Synchrony
- Certain video content on the site

These third-party components may not fully meet WCAG 2.1 Level AA, and their accessibility can change when the vendor updates its software. We monitor these areas, raise issues with the vendors, and work to improve the parts within our control.

If you encounter a barrier anywhere on the site, including in one of these embedded tools, please contact us. We will help you get the information you were looking for or complete the task another way, such as starting a consultation request by phone or email instead of through an online form.

## Third-Party Content

Parts of our website link to or embed services that are operated by other companies, such as our chat provider, our financing partner, and the platform that powers our consultation form. We do not control these services, and we cannot guarantee their accessibility.

We choose vendors we believe serve our patients well, and we encourage them to meet recognized accessibility standards. When a third-party tool creates a barrier for someone using our site, we will work with the vendor and offer you an alternative way to accomplish what you came to do.

## Alternative Formats and Accommodations

If you need information from this website in a different format, or if you would like help completing a consultation request, we will provide a reasonable accommodation at no extra cost to you. Depending on what works best for you, that may include:

- Reviewing information from the site with you over the phone
- Sending you the information by email
- Providing an alternative format on request

You do not need to explain why you need an accommodation. Just let us know what would help, and we will do our best to make it work. To request an accommodation, contact us using any of the methods in the Feedback and How to Reach Us section below.

## Feedback and How to Reach Us

We welcome your feedback on the accessibility of this website. If you run into a barrier, have a suggestion, or need help with anything on the site, please tell us. Your feedback helps us find problems we may have missed and make the site better for everyone.

You can reach us in any of these ways:

- Email: privacy@${site.domain}
- Phone: ${site.phone}
- Fax: (909) 596-4344
- Mailing address: ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}

The privacy@${site.domain} inbox is monitored, and accessibility requests sent there are routed to the right person. When you contact us about accessibility, it helps to include the page or feature involved and a short description of the problem, along with the best way to reach you.

We will acknowledge accessibility feedback within five business days, and we will work to resolve the issue promptly. Some fixes are quick. Others, especially those involving third-party tools, can take longer, and we will keep you informed while we work on them.

## Ongoing Effort

We treat accessibility as ongoing work rather than a one-time project. As we add content, update the design, or change the tools we use, we review the effect on accessibility and look for ways to improve. We also learn from the feedback our visitors send us. Our goal is steady progress toward full WCAG 2.1 Level AA conformance and a site that serves all of our patients well.

## Changes to This Statement

We may update this Accessibility Statement from time to time to reflect changes to our website, our practices, or the law, and to record the progress we make. When we make changes, we will revise the effective date at the top of this page. We encourage you to review this statement periodically so that you know where our accessibility efforts stand and how to reach us for help.
`;

export default function AccessibilityPage() {
  return (
    <LegalDocument
      eyebrow="Legal · Accessibility"
      titleLead="Accessibility"
      titleAccent="Statement"
      lede="Our commitment to an accessible website, our work toward WCAG 2.1 Level AA, and how to reach us for help or an accommodation."
      effectiveDate="June 8, 2026"
      route="/accessibility"
      breadcrumbLabel="Accessibility Statement"
      body={ACCESSIBILITY_BODY}
    />
  );
}
