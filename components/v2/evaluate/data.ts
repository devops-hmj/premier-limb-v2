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
