import type { Metadata } from "next";
import { NavV2 } from "@/components/v2/NavV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { JsonLd } from "@/components/content/JsonLd";
import { EvaluateSurgeon } from "@/components/v2/EvaluateSurgeon";
import { FAQ } from "@/components/v2/evaluate/data";
import { ORIGIN } from "@/lib/content";
import { breadcrumb, faqPageSchema } from "@/lib/jsonld";

import "./evaluate.css";

const PAGE_URL = `${ORIGIN}/evaluate-your-surgeon`;

export const metadata: Metadata = {
  title: {
    absolute:
      "How to Evaluate a Limb Lengthening Surgeon · Interactive Scoring Tool · Premier Limb Lengthening",
  },
  description:
    "A structured framework for evaluating limb lengthening surgeons. Score any surgeon across 10 clinical and patient experience criteria, compare side by side, and bring the right questions to every consultation. Built by Dr. Hrayr Basmajian, MD, MS.",
  alternates: { canonical: "/evaluate-your-surgeon" },
  openGraph: {
    type: "website",
    url: "/evaluate-your-surgeon",
    siteName: "Premier Limb Lengthening",
    title: "How to Evaluate a Limb Lengthening Surgeon · Free Scoring Tool",
    description:
      "Score any limb lengthening surgeon across 10 clinical and patient experience criteria. Compare surgeons side by side. Free, private, no account required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Evaluate a Limb Lengthening Surgeon · Free Scoring Tool",
    description:
      "Score any limb lengthening surgeon across 10 clinical and patient experience criteria. Free, private, no account required.",
  },
  robots: { index: true, follow: true },
};

/** MedicalWebPage — reviewed by Dr. Basmajian. */
function medicalWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "How to Evaluate a Limb Lengthening Surgeon",
    url: `${PAGE_URL}/`,
    description:
      "A structured 10-criterion framework for evaluating limb lengthening surgeons across clinical qualifications and patient experience factors, with an interactive scoring tool, per-criterion answer notes, and a printable question list.",
    about: {
      "@type": "MedicalProcedure",
      name: "Limb Lengthening Surgery",
      procedureType: "Surgical",
      bodyLocation: "Femur, Tibia",
    },
    reviewedBy: {
      "@type": "Physician",
      name: "Hrayr Basmajian, MD, MS",
      medicalSpecialty: "Orthopedic Surgery",
      jobTitle: ["Founder, Premier Limb Lengthening", "Director, Orthopedic Trauma, PVHMC"],
      hospitalAffiliation: "Pomona Valley Hospital Medical Center",
      alumniOf: [
        "USC/LAC Medical Center",
        "Sonoran Orthopaedic Trauma Surgeons, Scottsdale",
        "Hannover Medical School",
      ],
      knowsLanguage: ["en", "hy", "es"],
      url: `${ORIGIN}/dr-basmajian/`,
      sameAs: [`${ORIGIN}/dr-basmajian/`],
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "Premier Limb Lengthening",
      url: `${ORIGIN}/`,
      telephone: "+1-951-620-5663",
      address: {
        "@type": "PostalAddress",
        streetAddress: "400 N. Mountain Ave. Suite 305",
        addressLocality: "Upland",
        addressRegion: "CA",
        postalCode: "91786",
        addressCountry: "US",
      },
    },
  };
}

/** HowTo — the five-step evaluation process. */
function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Evaluate a Limb Lengthening Surgeon",
    description:
      "A structured process for comparing limb lengthening surgeons using 10 scored criteria across clinical qualifications and patient experience, with consultation questions and answer notes built into each criterion.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Add each surgeon you are considering",
        text: "Enter each surgeon's name in the evaluation tool. Each surgeon gets an independent scorecard containing the full question list, space to record their answers, and a 1 to 5 score for every criterion. A printable version of the question list is available for paper use.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Ask the questions and record each answer",
        text: "Every criterion card contains the questions to ask, or what to notice for observational criteria. Record each surgeon's answer in the notes field on that card, during the consultation or after.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Score clinical criteria from your research",
        text: "Score fellowship training, procedure volume, device expertise, revision capability, and complication management using published information and the answers you recorded.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Score patient experience criteria after each consultation",
        text: "Score bedside manner, communication responsiveness, thoroughness, comfort level, and post-op support clarity once you have met the surgeon and team.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Compare surgeons side by side",
        text: "Review the summary dashboard, compare section subtotals and total scores, and identify what still needs evaluation before deciding.",
      },
    ],
  };
}

/**
 * /evaluate-your-surgeon — interactive surgeon-evaluation scoring tool.
 *
 * The interactive tool is a client component (EvaluateSurgeon); the shared
 * NavV2 + FooterV2 chrome and all schema.org markup are wired here.
 */
export default function EvaluateSurgeonPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          medicalWebPageSchema(),
          howToSchema(),
          faqPageSchema(FAQ.map(({ q, a }) => ({ q, a }))),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Evaluate Your Surgeon", url: "/evaluate-your-surgeon" },
          ]),
        ]}
      />
      <EvaluateSurgeon />
      <FooterV2 />
    </>
  );
}
