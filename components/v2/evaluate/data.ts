/**
 * Evaluate-Your-Surgeon — content data.
 *
 * Single source of truth for the scoring criteria, the "also ask" pricing
 * block, and the FAQ. The interactive tool, the crawlable education section,
 * the printable question sheet, and the page's JSON-LD all read from here.
 *
 * Text is transcribed verbatim from the design mock
 * `Evaluate_page/evaluate-your-surgeon.html` (medical-accuracy rule: no
 * paraphrasing of clinical copy).
 */

export type Criterion = {
  id: string;
  phase: 1 | 2;
  /** Education-section index label, e.g. "Clinical · 01". */
  eNum: string;
  name: string;
  /** Details summary on the scorecard: what the questions are for. */
  askLabel: "Questions to ask" | "What to notice";
  /** 1–5 score anchor definitions. */
  anchors: [string, string, string, string, string];
  /** "Why this matters" long-form rationale. */
  why: string;
  /** Heading over the consultation questions. */
  qsHeading: string;
  questions: string[];
};

export const CRITERIA: Criterion[] = [
  {
    id: "fellowship",
    phase: 1,
    eNum: "Clinical · 01",
    name: "Fellowship training",
    askLabel: "Questions to ask",
    anchors: [
      "No fellowship training in a relevant discipline",
      "Fellowship unrelated to lengthening, deformity correction, or trauma",
      "One fellowship in a related orthopedic discipline",
      "Fellowship training directly relevant to lengthening or deformity correction",
      "Multiple fellowships in orthopedic trauma, deformity correction, or reconstruction",
    ],
    why: "Fellowship training is subspecialty education completed after residency, and it is the clearest signal of a surgeon's depth. Limb lengthening is controlled bone regeneration, and when it deviates from plan it becomes a reconstruction problem: malalignment, delayed union, hardware complications. Surgeons fellowship-trained in orthopedic trauma or deformity correction have spent years managing exactly those problems. A surgeon whose training is unrelated to bone reconstruction is working outside the discipline the procedure belongs to. Ask where the fellowship was completed and in what specialty, then verify it.",
    qsHeading: "What to ask about fellowship training",
    questions: [
      "What fellowship training have you completed, and where?",
      "Was it in orthopedic trauma, deformity correction, or limb reconstruction?",
      "Who trained you in lengthening specifically?",
    ],
  },
  {
    id: "volume",
    phase: 1,
    eNum: "Clinical · 02",
    name: "Procedure volume",
    askLabel: "Questions to ask",
    anchors: [
      "Could not confirm any lengthening case history",
      "Limited caseload, or declined to share numbers when asked",
      "Steady lengthening caseload, numbers shared when asked",
      "High annual volume, specifics offered without prompting",
      "Extensive documented volume across cosmetic, trauma, and revision cases",
    ],
    why: "Surgical outcomes correlate with volume across nearly every orthopedic procedure studied. But raw cosmetic volume is not the full picture. A surgeon whose caseload spans trauma, cosmetic, and revision work has seen bone behave badly in ways a cosmetic-only caseload never produces, and that breadth is what builds complication judgment. A credible surgeon shares their numbers without hesitation. Reluctance to discuss volume, or answers that stay vague after a direct question, is itself information worth scoring.",
    qsHeading: "What to ask about procedure volume",
    questions: [
      "How many lengthening procedures have you performed in total?",
      "How many do you perform per year?",
      "What is your mix of cosmetic, trauma, and revision cases?",
    ],
  },
  {
    id: "device",
    phase: 1,
    eNum: "Clinical · 03",
    name: "Device expertise",
    askLabel: "Questions to ask",
    anchors: [
      "Could not name the nail system or generation used",
      "Uses an older or external system without explaining the choice",
      "Uses a current internal nail system",
      "Uses the current generation and explains device selection for each patient",
      "Full command of the current system, its history, and per-bone selection rationale",
    ],
    why: "Internal lengthening nails have evolved through multiple generations, and the differences are material: lengthening capacity, weight-bearing allowances during the distraction phase, and documented device history including FDA actions on earlier models. A surgeon should be able to name the exact system and generation they implant, explain why they selected it, and speak plainly about the device category's full regulatory history. A surgeon who cannot explain their own hardware, or who dismisses questions about device history, has not earned a high score here.",
    qsHeading: "What to ask about device expertise",
    questions: [
      "Which nail system and generation do you use, and why?",
      "How do you decide between femur and tibia for my height goal?",
      "How do you speak to the device category's history, including earlier generations?",
    ],
  },
  {
    id: "revision",
    phase: 1,
    eNum: "Clinical · 04",
    name: "Revision surgery capability",
    askLabel: "Questions to ask",
    anchors: [
      "Does not accept revision cases",
      "Refers all complications and revisions elsewhere",
      "Handles minor revisions, refers complex cases out",
      "Accepts most revision cases, including failed lengthenings from other practices",
      "Known for taking revision cases other surgeons decline, with reconstruction training to back it",
    ],
    why: "Revision capability is the most revealing criterion on this list. A surgeon who accepts and corrects failed lengthenings from other practices has demonstrated, on the hardest possible cases, the reconstruction skill you are hoping never to need. It also answers a question most patients forget to ask: if my procedure develops a complication, who fixes it? If the answer is a referral to someone else, you are effectively choosing two surgeons and only vetting one. Score highly the surgeon who would handle your worst-case scenario personally.",
    qsHeading: "What to ask about revision surgery capability",
    questions: [
      "Do you accept revision cases from procedures performed elsewhere?",
      "What did your hardest revision cases involve?",
      "If my procedure needed revision, would you perform it yourself?",
    ],
  },
  {
    id: "complication",
    phase: 1,
    eNum: "Clinical · 05",
    name: "Complication management approach",
    askLabel: "Questions to ask",
    anchors: [
      "Dismissed complication questions or claimed they are too rare to plan for",
      "Vague answers, no written protocol",
      "Acknowledged risks and described a general plan",
      "Walked through specific complications and the response to each",
      "Written protocol, named hospital for emergencies, and a direct escalation path",
    ],
    why: "Every honest surgeon will tell you complications happen in limb lengthening: nerve irritation, joint stiffness, delayed bone consolidation, hardware issues. The differentiator is not whether a practice has complications, it is whether they have a system for them. Look for a written protocol, a named hospital that admits their patients in an emergency, and specific answers about how each common complication is detected and treated. A surgeon who waves the question away, or claims complications are too rare to plan for, is describing a practice with no plan.",
    qsHeading: "What to ask about complication management",
    questions: [
      "What complications do you see most, and how do you handle each?",
      "Do you have a written complication protocol I can review?",
      "Which hospital admits your patients if an emergency occurs?",
    ],
  },
  {
    id: "bedside",
    phase: 2,
    eNum: "Experience · 06",
    name: "Bedside manner",
    askLabel: "What to notice",
    anchors: [
      "Rushed, dismissive, or condescending",
      "Polite but distracted, felt like a sales appointment",
      "Professional and courteous",
      "Attentive, unhurried, answered without deflecting",
      "Fully present, direct about hard truths, treated the decision with real weight",
    ],
    why: "You will work with this surgeon and their team for the better part of a year. The consultation is your preview of that relationship. Pay attention to whether the surgeon was present and unhurried, whether hard topics like risks and limits were addressed directly rather than smoothed over, and whether the appointment felt like a clinical evaluation or a sales meeting. A surgeon willing to tell you what you cannot have, including telling you no, is showing you the judgment you want in the operating room.",
    qsHeading: "What to notice about bedside manner",
    questions: [
      "Was the surgeon present and unhurried, or watching the clock?",
      "Were risks and limits addressed directly, or smoothed over?",
      "Did it feel like a clinical evaluation or a sales meeting?",
    ],
  },
  {
    id: "communication",
    phase: 2,
    eNum: "Experience · 07",
    name: "Communication responsiveness",
    askLabel: "Questions to ask",
    anchors: [
      "Could not reach the office or never heard back",
      "Slow responses, had to follow up multiple times",
      "Responded within a reasonable timeframe",
      "Responsive and thorough",
      "Exceptionally accessible, direct communication with surgeon or care team",
    ],
    why: "During active lengthening you adjust the nail daily and questions come up constantly: pain that feels different, a therapy setback, a reading you are unsure about. Response speed stops being a courtesy and becomes a clinical safety factor. Test it before you commit. Note how fast the office answered your first inquiry, how follow-up questions were handled, and whether you can reach the surgeon or care team directly rather than a general voicemail. The pattern you see as a prospective patient is the best predictor of the pattern you will see at week nine.",
    qsHeading: "What to ask about communication responsiveness",
    questions: [
      "Who do I contact with questions during lengthening, and how fast do they respond?",
      "Do I have a direct line to you or your care team?",
      "How are after-hours concerns handled?",
    ],
  },
  {
    id: "thoroughness",
    phase: 2,
    eNum: "Experience · 08",
    name: "Thoroughness answering questions",
    askLabel: "What to notice",
    anchors: [
      "Deflected questions or gave scripted answers",
      "Answered some questions, avoided specifics on risks or numbers",
      "Answered most questions adequately",
      "Answered every question with specifics and welcomed follow-ups",
      "Went beyond what was asked, volunteered risks, showed data unprompted",
    ],
    why: "Bring the question list and count what happens. A strong consultation answers every question with specifics: numbers, timelines, named protocols. A weak one deflects, generalizes, or steers you back to booking. Thoroughness matters because it predicts how the practice will treat your questions after they have your deposit. The best consultations volunteer information you did not know to ask about, including risks. That candor is a scored behavior, not a personality trait.",
    qsHeading: "What to notice about thoroughness",
    questions: [
      "Did every question get a specific answer: numbers, timelines, named protocols?",
      "Did they volunteer risks you did not ask about?",
      "Were follow-up questions welcomed or deflected?",
    ],
  },
  {
    id: "comfort",
    phase: 2,
    eNum: "Experience · 09",
    name: "Comfort level with the surgeon and team",
    askLabel: "What to notice",
    anchors: [
      "Left with doubts or felt pressured",
      "Something felt off, could not identify what",
      "Neutral, no red flags",
      "Confident in the surgeon and staff",
      "Complete trust, would proceed without hesitation",
    ],
    why: "After you have scored the objective criteria, this one captures what the others cannot: whether you trust these specific people with your body and your recovery. Discomfort you cannot name is still data. So is pressure to decide quickly, which has no place in a procedure you have researched for months. Score it plainly and let it carry real weight. Patients who proceed despite unresolved doubt consistently report it was the signal they wish they had respected.",
    qsHeading: "What to notice about comfort level",
    questions: [
      "Would you trust this team on a hard day, not just at the consultation?",
      "Was there any pressure to book quickly?",
      "Is there a doubt you cannot name? Note it anyway.",
    ],
  },
  {
    id: "postop",
    phase: 2,
    eNum: "Experience · 10",
    name: "Post-op support clarity",
    askLabel: "Questions to ask",
    anchors: [
      "No recovery plan discussed",
      "Vague timeline, no specifics on therapy or follow-up",
      "General recovery protocol outlined",
      "Written recovery protocol with therapy schedule and follow-up cadence",
      "Week-by-week protocol, named coordinator, defined escalation path, remote follow-up plan",
    ],
    why: "Surgery is one day. Recovery is 6 to 12 months, and most of the outcome is determined there: therapy consistency, weight-bearing progression, nutrition, follow-up imaging. Before committing, you should be able to describe your own recovery protocol week by week, know who coordinates your therapy schedule, and understand exactly how follow-up works after you return home. A practice that hands you a vague timeline is planning to improvise your recovery. A practice with a written protocol and a named coordinator has done this many times before.",
    qsHeading: "What to ask about post-op support",
    questions: [
      "What does my week-by-week recovery protocol look like?",
      "Who coordinates physical therapy, and how is it scheduled?",
      "What does follow-up look like after I return home?",
    ],
  },
];

export const PRICING = {
  eNum: "Also Ask · Pricing",
  name: "Pricing and structure",
  paragraph:
    "Pricing is not a scored criterion, it is a transparency test. A fully itemized quote covering the implant, hospitalization, anesthesia, therapy, and follow-up care lets you compare offers accurately. A low headline price with unlisted costs is a common source of unexpected expense, and the cost of correcting a failed procedure can exceed the original surgery. Record what each practice includes and what it leaves out.",
  qsHeading: "What to ask about pricing and structure",
  questions: [
    "Is your quote fully itemized: implant, hospitalization, anesthesia, therapy, follow-up?",
    "What costs are not included that I should plan for?",
    "What would a revision or complication cost if one occurred?",
  ],
};

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What questions should I ask a limb lengthening surgeon?",
    a: "Ask about fellowship training, total lengthening procedure volume, which nail system and generation they use, whether they accept revision cases, and their written complication management protocol. Then evaluate responsiveness, thoroughness, and post-op support during the consultation itself. The evaluation tool on this page places every question next to the criterion it informs, with space to record each surgeon's answers, and the full question list can be printed from the page for paper use.",
  },
  {
    q: "How do I choose a limb lengthening surgeon?",
    a: "Compare surgeons on the same criteria rather than on impressions. Score each surgeon on clinical qualifications, including fellowship training, procedure volume, device expertise, revision capability, and complication management, and on patient experience factors, including communication, thoroughness, and post-op support. The surgeon who scores well across both categories is the stronger choice.",
  },
  {
    q: "What credentials should a limb lengthening surgeon have?",
    a: "Board certification in orthopedic surgery is the baseline. Fellowship training in orthopedic trauma, deformity correction, or limb reconstruction indicates the subspecialty depth to manage complications and revisions. Hospital affiliation matters because it determines where you go if something requires emergency care.",
  },
  {
    q: "How many limb lengthening procedures should a surgeon have performed?",
    a: "There is no single threshold, but a surgeon should share their numbers without hesitation. Volume across cosmetic, trauma, and revision cases matters more than cosmetic volume alone, because complication management skill comes from breadth of practice. A surgeon who declines to discuss volume is a signal in itself.",
  },
  {
    q: "Why does revision surgery capability matter when choosing a surgeon?",
    a: "A surgeon who accepts and corrects failed lengthenings from other practices has demonstrated the reconstruction skill to manage the hardest cases. If your own procedure develops a complication, you want to already be in the hands of a surgeon who fixes these problems, rather than one who refers them out.",
  },
  {
    q: "Should I choose a limb lengthening surgeon based on price?",
    a: "Price transparency matters. Price alone does not. A fully itemized quote that includes the implant, hospitalization, anesthesia, therapy, and follow-up care lets you compare offers accurately. A low headline price with unlisted costs is a common source of unexpected expense, and the cost of correcting a failed procedure can exceed the original surgery.",
  },
  {
    q: "What are red flags when choosing a limb lengthening surgeon?",
    a: "Common red flags include refusing to share procedure volume, dismissing complication questions, having no written recovery protocol, declining all revision cases, guaranteeing outcomes, and pressure to book quickly. Limb lengthening is a months-long commitment, and a credible surgeon treats the decision with corresponding weight.",
  },
  {
    q: "Which lengthening device should the surgeon use?",
    a: "For cosmetic lengthening, the current standard is a fully internal magnetic nail such as the PRECICE system, which lengthens inside the bone with no external frame or pins through the skin. Ask which system and generation the surgeon implants, why they selected it, and how they speak to the device category's full history, including the recalled Stryde nail. A surgeon who cannot explain their own hardware has not earned your confidence.",
  },
  {
    q: "How much does limb lengthening cost, and what is included?",
    a: "Cosmetic limb lengthening in the United States is typically a five- to six-figure procedure, and what the quote includes matters more than the headline number. Dr. Basmajian's all-inclusive pricing runs from $75,500 for bilateral femur and $85,500 for bilateral tibia on the proven PRECICE 2 nail, up to $95,500 and $105,500 respectively on the newer PRECICE Max. Combined femur-and-tibia lengthening is $150,000 with PRECICE 2 or $195,000 with PRECICE Max. Consultations are free. Always ask any surgeon for a fully itemized quote and a written list of what is not included, such as travel, accommodation, and hardware removal.",
  },
  {
    q: "What is the recovery timeline for limb lengthening?",
    a: "Lengthening happens at roughly one millimeter per day over about three to four months (the distraction phase), followed by a consolidation phase while the new bone hardens. Most patients return to normal daily activity within three to four months and reach full recovery over six to twelve months, depending on the amount of lengthening and individual healing. Ask any surgeon for a week-by-week protocol and who coordinates your physical therapy.",
  },
  {
    q: "How much taller can you get from limb lengthening?",
    a: "Femur lengthening typically adds up to about 8 cm (roughly 3 inches) and tibia lengthening up to about 5 cm, with a combined femur-and-tibia approach reaching up to roughly 6 inches when staged. The safe amount depends on your anatomy, soft-tissue flexibility, and healing, and is determined case by case at consultation. A responsible surgeon frames every figure as an upper limit, not a promise.",
  },
  {
    q: "Does this tool send my scores to Premier Limb Lengthening?",
    a: "No. All scoring data stays in your browser. Premier Limb Lengthening receives information only if you actively choose to email your results to yourself or opt into educational content, and in those cases it receives only your email address and the results you chose to send.",
  },
];

/** Public production URL used for share/copy actions. */
export const CANONICAL_URL = "https://premierlimblengthening.com/evaluate-your-surgeon/";

/**
 * GHL inbound webhook for the optional email/opt-in form.
 * TODO (Rafael): replace before launch. See GHL_WORKFLOW_SETUP.md.
 */
export const GHL_WEBHOOK_URL = "REPLACE_WITH_GHL_WEBHOOK_URL";

/** localStorage key. Bump the suffix if the persisted shape changes. */
export const STORAGE_KEY = "pll_surgeon_eval_v1";

/* ============================================================
 * Editorial guide content — added to bring the page to parity with the
 * "How to choose a limb lengthening surgeon" preview. All copy de-dashed
 * to honor the brand no-em-dash / no-semicolon rule. Prices come from the
 * canonical lib/pricing-plans.ts (Premier's confirmed 2026 numbers), NOT
 * the preview's separate PRECICE 2 tier. Credentials verified against
 * lib/basmajian.ts.
 * ============================================================ */

/** Featured-snippet TL;DR shown as the first light section under the hero. */
export const SHORT_ANSWER =
  "Choose a limb lengthening surgeon on verifiable qualifications, not marketing: board certification in orthopedic surgery, fellowship training in trauma or deformity correction, high procedure volume, the ability to manage complications and revisions personally, and transparent, itemized pricing. Score every surgeon you are considering on the same criteria, including ours, using the free tool on this page.";

export const QUALIFICATIONS = {
  eyebrow: "Qualifications",
  heading: "What qualifications should a limb lengthening surgeon have?",
  paragraphs: [
    "At minimum, a limb lengthening surgeon should be board-certified in orthopedic surgery and fellowship-trained in orthopedic trauma, deformity correction, or limb reconstruction, the disciplines that manage bone when it heals badly. Verify active state licensure and hospital affiliation, and favor a surgeon who operates personally rather than delegating to residents or fellows.",
    "Board certification by the American Board of Orthopaedic Surgery (ABOS) is the baseline credential. Membership in the American Academy of Orthopaedic Surgeons (AAOS) and the Limb Lengthening and Reconstruction Society (LLRS) signals subspecialty focus. Fellowship training is the differentiator, because limb lengthening is controlled bone regeneration, and when it deviates from plan it becomes a reconstruction problem that only a trauma-trained or deformity-trained surgeon is equipped to solve. Ask where the fellowship was completed and in what specialty, then verify it.",
  ],
};

export const EXPERIENCE = {
  eyebrow: "Experience",
  heading: "How much experience should a limb lengthening surgeon have?",
  paragraphs: [
    "There is no single threshold, but a credible surgeon shares their volume without hesitation and can point to breadth across cosmetic, trauma, and revision cases. Revision capability matters most: a surgeon who corrects failed lengthenings from other practices has proven, on the hardest cases, that they can manage the complication you hope never to have.",
    "Surgical outcomes correlate with volume across nearly every orthopedic procedure studied, but raw cosmetic volume is only part of the picture. Breadth is what builds complication judgment. A surgeon whose caseload spans trauma and revision has seen bone behave in ways a cosmetic-only practice never encounters. Ask how many lengthening procedures they have performed in total and per year, their case mix, and, critically, whether they would personally perform your revision if one were ever needed. If the answer is a referral elsewhere, you are choosing two surgeons and vetting only one.",
  ],
};

export const DEVICES = {
  eyebrow: "Devices",
  heading: "Which lengthening device does the surgeon use, and why?",
  intro:
    "The current standard for cosmetic lengthening is a fully internal magnetic nail, the PRECICE system, which lengthens inside the bone at about one millimeter per day with no external frame and no pins through the skin. Ask which system and generation your surgeon implants, why they chose it, and how they speak to the device category's full history, including the recalled Stryde nail.",
  columns: ["Device", "Type", "Typical lengthening", "Weight-bearing while lengthening", "Status & notes"],
  rows: [
    ["PRECICE 2", "Fully internal magnetic nail", "up to about 8 cm (femur), by segment", "Standard (partial)", "Proven since 2011. The established internal option."],
    ["PRECICE Max", "Fully internal magnetic nail", "up to about 8 cm (femur), by segment", "Accelerated (higher load capacity)", "Current generation. FDA-cleared 2023."],
    ["STRYDE", "Internal magnetic nail (stainless)", "similar to PRECICE", "Marketed as full", "Withdrawn. Reports of bone changes at the nail junction."],
    ["LON (Lengthening Over Nail)", "Hybrid, internal nail plus temporary external fixator", "varies", "Limited during the external phase", "Older technique. Requires an external frame for part of treatment."],
    ["LATN", "Hybrid, external fixator then nailing", "varies", "Limited during the external phase", "Older technique. External frame then conversion to a nail."],
    ["External fixator (Ilizarov / monolateral)", "External frame, pins and wires through skin", "large corrections possible", "Varies", "Time-tested for complex deformity and trauma. Visible frame and pin care."],
  ],
  note:
    "Premier Limb Lengthening Institute uses the fully internal PRECICE system exclusively and has never used the recalled Stryde nail. External fixation is reserved for specific reconstructive cases, not routine cosmetic lengthening. Descriptors above reflect general device categories. Exact capacity and weight-bearing are determined case by case.",
};

export const RED_FLAGS = {
  eyebrow: "Red Flags",
  heading: "Red flags: how to spot an underqualified surgeon",
  intro:
    "The clearest warning signs are a surgeon who will not share procedure volume, dismisses complication questions, keeps no written recovery protocol, declines all revision cases, guarantees outcomes, or pressures you to book quickly. Any one of these is reason to keep looking. This is a months-long commitment, and a credible surgeon treats the decision with corresponding weight.",
  items: [
    ["Vague about volume", "Will not share procedure numbers, or stays general after a direct question."],
    ["Dismisses complications", "Calls them too rare to plan for, with no written protocol you can review."],
    ["Refers revisions out", "Sends every complication or revision to someone else, so you are vetting only half your care."],
    ["Guarantees results", "Promises a specific height gain or a pain-free recovery. No ethical surgeon guarantees a surgical outcome."],
    ["No emergency plan", "Cannot name the hospital that admits their patients if something goes wrong."],
    ["Sales pressure", "Deposit urgency, discounts to decide today, or a consultation that feels like a pitch."],
    ["Cannot explain the hardware", "Cannot name the exact device and generation they implant, or waves off questions about device history."],
    ["Improvised recovery", "Describes a vague timeline instead of a week-by-week protocol with a named care coordinator."],
  ],
  note:
    "A growing share of limb lengthening work in the United States now involves correcting complications from lower-cost procedures performed abroad. A low headline price that omits revision risk and follow-up care is not the saving it appears to be.",
};

export const COST = {
  eyebrow: "Cost",
  heading: "What does limb lengthening cost, and what is included?",
  intro:
    "Cosmetic limb lengthening in the U.S. is typically a five- to six-figure procedure, and what the quote includes matters more than the headline number. Insist on a fully itemized quote (implant, hospitalization, anesthesia, therapy, and follow-up) plus a written list of what is not included. The cost of correcting a failed procedure can exceed the original surgery.",
  columns: ["Procedure", "PRECICE 2", "PRECICE Max (4th gen)"],
  rows: [
    ["Bilateral femur lengthening", "$75,500", "$95,500"],
    ["Bilateral tibia lengthening", "$85,500", "$105,500"],
    ["Combined femur + tibia (staged)", "$150,000", "$195,000"],
  ],
  consultation: { label: "Consultation (virtual or in person)", value: "Free" },
  note:
    "These are Dr. Basmajian's all-inclusive prices. The newer PRECICE Max (4th-generation) nail costs more than the long-proven PRECICE 2, and Dr. Basmajian recommends the device suited to your anatomy and goals. Each bundle covers the implant, OR and surgical fees, anesthesia, 60 to 70 on-site therapy sessions, and 12 to 14 weeks of follow-up care. Billed separately: rotation correction, hardware removal (1 to 2 years post-op), and travel or accommodation. Financing is available through SoFi and CareCredit.",
  linkText: "See the full, current pricing options and financing",
  linkHref: "/limb-lengthening-pricing-options",
};

export const WHY_PREMIER = {
  eyebrow: "Why Premier",
  heading: "Why patients choose Premier Limb Lengthening Institute",
  intro:
    "Premier Limb Lengthening Institute is led by Dr. Hrayr Basmajian, a fellowship-trained orthopedic trauma surgeon who serves as Director of Orthopedic Trauma at one of Los Angeles's busiest trauma centers, teaches other surgeons, and personally manages every case. Reconstruction-level skill paired with concierge-level attention, a combination most cosmetic-only practices cannot offer.",
  points: [
    "Dual fellowship training, including Hannover Medical School, where the internal lengthening nail was pioneered.",
    "Orthopaedic trauma depth, the reconstruction skill to manage, and personally revise, complications.",
    "One surgeon, start to finish. Dr. Basmajian performs your surgery himself. No residents or fellows operating.",
    "Free consultations, virtual or in person, with no obligation.",
    "Clean device history: the fully internal PRECICE system only, never the recalled Stryde nail.",
    "A surgeon's surgeon, recruited from Chair of Trauma at Loma Linda, and teaches other surgeons nationally.",
  ],
  closingLead: "Score us against anyone. Then let's talk.",
  closingSub: "Every consultation is confidential, and there is never pressure to decide.",
  ctaText: "Schedule a Confidential Consultation",
  ctaHref: "/consult",
};

export const MID_CTA = {
  text: "You can score every surgeon in the country, or start with the one who wrote the framework.",
  ctaText: "Schedule a Confidential Consultation",
  ctaHref: "/consult",
};

export const SOURCES = [
  { name: "American Academy of Orthopaedic Surgeons (AAOS), OrthoInfo", desc: "Patient education on limb lengthening and deformity correction.", domain: "orthoinfo.aaos.org", href: "https://orthoinfo.aaos.org" },
  { name: "Limb Lengthening and Reconstruction Society (LLRS)", desc: "Professional society for surgeons who perform limb lengthening and reconstruction.", domain: "llrs.org", href: "https://llrs.org" },
  { name: "U.S. Food & Drug Administration", desc: "510(k) Premarket Notification database, including device clearances for the PRECICE intramedullary lengthening system.", domain: "accessdata.fda.gov", href: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPMN/pmn.cfm" },
  { name: "U.S. National Library of Medicine, MedlinePlus", desc: "Consumer health information.", domain: "medlineplus.gov", href: "https://medlineplus.gov" },
  { name: "Peer-reviewed literature on distraction osteogenesis and magnetic intramedullary lengthening nails", desc: "Indexed in the Journal of Bone & Joint Surgery and via PubMed.", domain: "pubmed.ncbi.nlm.nih.gov", href: "https://pubmed.ncbi.nlm.nih.gov" },
];

export const CONTINUE_READING = [
  {
    label: "Start with the guides",
    links: [
      { text: "Meet Dr. Hrayr Basmajian", href: "/dr-basmajian" },
      { text: "Your surgery: what to expect", href: "/your-surgery" },
      { text: "How much taller can I get?", href: "/your-surgery/how-much-taller-can-i-get-with-limb-lengthening" },
    ],
  },
  {
    label: "Go deeper",
    links: [
      { text: "Are you a good candidate?", href: "/are-you-a-good-candidate-for-limb-lengthening" },
      { text: "Internal vs. external fixation", href: "/fixation-methods-in-limb-lengthening-internal-vs-external" },
      { text: "What you gain, what you risk", href: "/limb-lengthening-what-you-gain-what-you-risk" },
      { text: "Is it covered by insurance?", href: "/is-limb-lengthening-covered-by-insurance" },
    ],
  },
  {
    label: "Ready to talk",
    links: [
      { text: "Pricing options and financing", href: "/limb-lengthening-pricing-options" },
      { text: "Schedule a Confidential Consultation", href: "/consult" },
    ],
  },
];
