import type { Metadata } from "next";
import { LegalDocument } from "@/components/v2/legal/LegalDocument";
import { site } from "@/lib/site";

import "../v2.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of use for the Premier Limb Lengthening website, including our medical disclaimer, individual-results notice, and SMS text messaging program terms.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · Premier Limb Lengthening",
    description:
      "Website terms of use, medical disclaimer, and SMS text messaging terms for Premier Limb Lengthening.",
    url: "/terms",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const TERMS_BODY = `
## Acceptance of These Terms

These Terms of Service, which we also call the Terms, are a binding agreement between you and ${site.name}. They govern your access to and use of the website at ${site.domain} and any related pages, forms, and features that link to these Terms, all of which we call the Website.

By accessing or using the Website, you confirm that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy, which is available at /privacy and is incorporated into these Terms by reference. If you do not agree to these Terms, please do not access or use the Website.

You must be at least 18 years of age, or the age of majority in your jurisdiction, to use the Website or to submit any information through it. If you use the Website on behalf of another person or an organization, you represent that you have the authority to accept these Terms on their behalf.

## About Premier Limb Lengthening

${site.name} is a cosmetic and reconstructive limb-lengthening surgery practice founded by Dr. Hrayr Basmajian. Our office is located at ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}, in San Bernardino County, California.

${site.name} is a separate and independent medical practice. Dr. Basmajian founded both ${site.name} and Premier Orthopaedic and Trauma Specialists, but ${site.name} is not a division, subsidiary, affiliate, or part of Premier Orthopaedic and Trauma Specialists. These Terms bind ${site.name} only. References in these Terms to we, us, our, the practice, or ${site.name} mean ${site.name} alone.

### What the Website is

The Website is an informational and marketing resource for people interested in cosmetic and reconstructive limb lengthening. Through the Website we provide the following.

- General educational content about limb-lengthening procedures, recovery, and related topics.
- Information about Dr. Basmajian and the practice.
- Pricing information and information about financing options.
- A consultation request form through which you can ask to be contacted.

### What the Website is not

The Website has clear limits. Please keep the following in mind.

- The Website is not a patient portal and is not part of an electronic health record system.
- The Website does not provide medical care, diagnosis, treatment, or a second opinion online.
- Submitting the consultation request form does not enroll you as a patient and does not begin any course of treatment.

## No Medical Advice

The content on the Website is provided for general informational and educational purposes only. It is not medical advice and is not a substitute for professional medical evaluation, diagnosis, or treatment by a qualified physician who has examined you and reviewed your individual medical history.

Reading the Website, contacting us, or submitting the consultation request form does not create a physician-patient relationship between you and Dr. Basmajian or ${site.name}. A physician-patient relationship is formed only after you complete a formal consultation and are accepted as a patient of the practice, and after any required agreements are signed.

You should never disregard professional medical advice or delay seeking it because of something you have read on the Website. Always consult a qualified physician or other licensed health professional with any questions you may have about a medical condition or treatment. Decisions about limb-lengthening surgery should be made together with your treating physician based on your individual circumstances.

> EMERGENCY NOTICE. Do not use the Website, the consultation form, the chat widget, or text messaging for medical emergencies. If you are experiencing a medical emergency, call 911 immediately or go to the nearest emergency department. These channels are not monitored around the clock and are not designed for urgent or time-sensitive medical needs.

## Individual Results and Testimonials

Limb-lengthening outcomes vary from patient to patient. Results depend on many factors, including your anatomy, your overall health, the procedure performed, your adherence to the recovery and physical-therapy plan, and other individual circumstances. We cannot and do not promise any specific result.

Any statistics, height ranges, timelines, recovery descriptions, before-and-after references, photographs, reviews, or testimonials presented on the Website reflect individual experiences. Please keep the following in mind.

- Individual experiences are not a prediction, promise, or guarantee of the results you will achieve.
- Ranges and averages are provided for general educational purposes and may not apply to your case.
- Patient testimonials and any patient images are published with the patient's authorization and remain the experience of that individual patient.

Your own candidacy, expected results, and risks can only be determined through a formal evaluation with Dr. Basmajian.

## Use of the Website

### License to use

Subject to your compliance with these Terms, ${site.name} grants you a limited, revocable, non-exclusive, non-transferable license to access and view the Website for your own personal, non-commercial, informational use. We reserve all rights not expressly granted to you.

### Acceptable use

When you use the Website, you agree that you will not do any of the following.

- Use the Website for any unlawful purpose or in violation of any applicable law or regulation.
- Scrape, crawl, harvest, data-mine, or use automated means to collect information or content from the Website.
- Interfere with, disrupt, overload, or attempt to gain unauthorized access to the Website, its servers, or any connected systems or networks.
- Reverse engineer, decompile, or attempt to derive the source code of any part of the Website, except to the extent this restriction is prohibited by law.
- Introduce any virus, malware, or other harmful code, or attempt to probe, scan, or test the vulnerability of the Website.
- Impersonate any person or entity, or misrepresent your affiliation with any person or entity.
- Copy, reproduce, distribute, modify, or create derivative works from the Website or its content except as expressly permitted in these Terms.
- Use the Website in any way that could damage, disable, or impair it, or interfere with any other party's use of it.

We may suspend or terminate your access to the Website at any time, without notice, if we reasonably believe you have violated these Terms.

## Consultation Requests and Communications

The consultation request form and the chat widget on the Website let you ask the practice to contact you. Please understand the following before you submit information.

- Submitting the form or using the chat widget is a request to be contacted. It is not an appointment, is not a guarantee of treatment, and is not an offer or guarantee of acceptance as a patient.
- We may decline to provide services to any individual at our discretion and consistent with applicable law.
- You should not submit emergency information, detailed medical history, or highly sensitive personal information through the form or the chat widget. These channels are not intended for that purpose.

You agree that any information you provide through the Website is true, accurate, and current to the best of your knowledge, and that you will not submit information on behalf of another person without that person's permission. By submitting your contact information, you agree that we, or a service provider acting on our behalf, may contact you using the contact details you provide, including by phone, email, and text message as described in the SMS and Text Messaging Terms below.

## SMS and Text Messaging Terms

This section describes the ${site.name} text messaging program. Please read it carefully. It is part of these Terms.

### The program

The ${site.name} text messaging program lets the practice communicate with you by text message about your interest in our services and your care.

### Opt-in and consent

By providing your mobile telephone number and opting in, for example by checking the consent box on our consultation request form or by texting us first, you agree to receive recurring automated text messages from ${site.name} at the mobile number you provide. These messages are sent through our messaging provider and may include the following.

- Consultation scheduling and confirmations.
- Appointment reminders.
- Treatment and recovery coordination.
- Billing and care updates.
- Replies to questions or inquiries you send to us.

Any promotional or marketing text messages require a separate opt-in. We will not send you promotional or marketing texts unless you have separately agreed to receive them.

### Consent is not a condition

Your consent to receive text messages is not a condition of purchasing any service or of receiving care from ${site.name}. You can ask to receive communications by other means.

### Frequency, rates, and delivery

A few important points about how the program works.

- Message frequency varies based on your interaction with the practice.
- Message and data rates may apply, depending on your mobile plan and carrier.
- Carriers are not liable for delayed or undelivered messages.
- Supported carriers may change, and we are not responsible for messages that are not delivered due to carrier limitations, device settings, or other factors outside our control.

### How to opt out or get help

You are always in control of these messages.

- To opt out, reply STOP to any text message from us at any time. After you reply STOP you will receive a one-time confirmation message, and then you will receive no further text messages from the program.
- For help, reply HELP to any text message, or contact us at ${site.phone} or privacy@premierlimblengthening.com.

> Message and data rates may apply. Message frequency varies. Reply STOP to cancel at any time. Reply HELP for help, or contact ${site.name} at ${site.phone} or privacy@premierlimblengthening.com. Carriers are not liable for delayed or undelivered messages.

### Mobile information and privacy

How we collect, use, and protect your mobile information is described in our Privacy Policy at /privacy. As stated in that policy, your mobile information, including your phone number and consent, is not shared with third parties or affiliates for their marketing or promotional purposes. Mobile information is used only to operate the messaging program and to communicate with you, including through service providers that help us send messages on our behalf.

## Intellectual Property

The Website and all of its content, including the text, articles, page layouts, graphics, photographs, illustrations, video, audio, the ${site.name} name, logos, and other trademarks, service marks, and trade dress, are owned by ${site.name} or its licensors. This content is protected by United States and international copyright, trademark, and other intellectual-property laws.

Your limited license to use the Website does not transfer any ownership rights to you. In particular, you agree to the following.

- You may not use the ${site.name} name, logos, or other marks without our prior written permission.
- You may not copy, reproduce, republish, distribute, display, modify, or create derivative works from any part of the Website except as expressly permitted in these Terms or with our prior written consent.
- Any third-party names, logos, or marks that appear on the Website are the property of their respective owners and are used for identification only.

If you believe that content on the Website infringes your intellectual-property rights, please contact us at privacy@premierlimblengthening.com so we can review your concern.

## Third-Party Links and Services

The Website may contain links to, or integrations with, websites, applications, and services operated by third parties. These include, among others, the following.

- Our financing partner, CareCredit, a Synchrony company, for patient financing.
- Our messaging and customer-relationship platform provider, GoHighLevel, also known as LeadConnector, which powers our lead form, chat widget, and text messaging.
- The third-party HIPAA-eligible telehealth platform we use for virtual consultations.
- Other third-party sites and services we may reference for your convenience.

These links and integrations are provided for your convenience only. Please keep the following in mind.

- We do not control and are not responsible for the content, products, services, security, or practices of any third-party site or service.
- The inclusion of a link or integration does not imply our endorsement of the third party.
- Your use of any third-party site or service is governed by that third party's own terms of service and privacy policy, not by these Terms.
- When you leave the Website to visit a third-party site or service, you do so at your own risk.

We encourage you to review the terms and privacy policies of any third party before you use its site or service.

## Disclaimer of Warranties

THE WEBSITE AND ALL CONTENT, MATERIALS, AND FEATURES ON IT ARE PROVIDED ON AN AS IS AND AS AVAILABLE BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.

To the fullest extent permitted by law, ${site.name} disclaims all warranties relating to the Website, including the following.

- The implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.
- Any warranty that the information on the Website is accurate, complete, reliable, current, or error-free.
- Any warranty that the Website will be uninterrupted, secure, or free of viruses or other harmful components.

You assume full responsibility for your use of the Website and any reliance you place on its content. Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you. Nothing in this section disclaims the professional standard of care owed within an actual physician-patient relationship, which is governed by applicable law and not by these Terms.

## Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ${site.name.toUpperCase()}, ITS OWNERS, PHYSICIANS, EMPLOYEES, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE WEBSITE. This includes, without limitation, damages for lost profits, lost data, or loss of goodwill, whether based on warranty, contract, tort, or any other legal theory, and whether or not we have been advised of the possibility of such damages.

The following limits on the disclaimer above apply.

- Some jurisdictions do not allow the limitation or exclusion of liability for certain types of damages, so some of the limitations above may not apply to you.
- Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable law.
- This section relates to your use of the Website only. It does not limit, waive, or affect the professional standard of care, or any liability arising from that standard of care, owed within an actual physician-patient relationship, which is governed by applicable law.

## Indemnification

You agree to defend, indemnify, and hold harmless ${site.name}, together with its owners, physicians, employees, contractors, and service providers, from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, that arise out of or relate to any of the following.

- Your misuse of the Website.
- Your violation of these Terms.
- Your violation of any applicable law or of the rights of any third party.
- Any information you submit through the Website that is false, inaccurate, or submitted without proper authority.

We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate with us.

## Privacy

Your use of the Website is also governed by our Privacy Policy, which is available at /privacy and is incorporated into these Terms by reference. The Privacy Policy explains how we collect, use, and protect information through the Website, including how we handle mobile information for the text messaging program described above.

${site.name} is a HIPAA covered entity. Protected health information that we hold as part of an actual treatment relationship is handled in accordance with the federal Health Insurance Portability and Accountability Act, applicable California medical-privacy law, and our Notice of Privacy Practices, rather than under these Terms. Information you submit through the public Website, such as a consultation request, is handled as described in the Privacy Policy.

## Governing Law and Disputes

These Terms, and any dispute arising out of or relating to them or to your use of the Website, are governed by the laws of the State of California, without regard to its conflict-of-laws rules.

You agree to the following regarding any dispute.

- The exclusive venue for any dispute that is not otherwise resolved will be the state and federal courts located in San Bernardino County, California, and you consent to the personal jurisdiction of those courts.
- Before filing any formal action, you agree to first attempt to resolve the dispute informally by contacting us at privacy@premierlimblengthening.com or ${site.phone}, and to allow us a reasonable period to respond and attempt a resolution.

This section governs disputes about the Website and these Terms. It does not govern any medical malpractice or professional-liability claim arising from an actual physician-patient relationship, which is subject to its own applicable law.

## Changes to These Terms

We may update or revise these Terms from time to time to reflect changes to the Website, to our practices, or to applicable law. When we do, we will update the effective date shown on this page. Material changes may be communicated through the Website or by other reasonable means.

Your continued access to or use of the Website after the updated Terms take effect means that you accept the revised Terms. We encourage you to review this page periodically so that you are aware of the current Terms.

## Miscellaneous

A few final provisions apply to these Terms.

- Severability. If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or removed to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
- Entire agreement. These Terms, together with the Privacy Policy and any other terms expressly incorporated by reference, are the entire agreement between you and ${site.name} regarding your use of the Website, and they supersede any prior agreements on that subject.
- No waiver. Our failure to enforce any provision of these Terms is not a waiver of that provision or of our right to enforce it later.
- Assignment. You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, reorganization, or transfer of the practice.
- Headings. The headings in these Terms are provided for convenience only and do not affect the interpretation of any provision.

## Contact Us

If you have questions about these Terms, the text messaging program, or the Website, please contact us.

${site.name}
${site.address.street}
${site.address.city}, ${site.address.state} ${site.address.zip}

- Phone: ${site.phone}
- Fax: (909) 596-4344
- Email: privacy@premierlimblengthening.com
- Website: ${site.domain}
`;

// NOTE (pre-launch / counsel): a mandatory binding-arbitration clause, a
// class-action waiver, and a monetary liability cap were intentionally left
// out for launch. Governing law is California, venue is San Bernardino County,
// with an informal-resolution-first step. Revisit with counsel if the practice
// later wants arbitration or a liability cap.
export default function TermsOfServicePage() {
  return (
    <LegalDocument
      eyebrow="Legal · Terms"
      titleLead="Terms of"
      titleAccent="Service"
      lede="The rules for using the Premier Limb Lengthening website, written in plain English, covering our medical disclaimer, individual-results notice, and text messaging program."
      effectiveDate="June 8, 2026"
      route="/terms"
      breadcrumbLabel="Terms of Service"
      body={TERMS_BODY}
    />
  );
}
