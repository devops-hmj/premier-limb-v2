"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import {
  CANONICAL_URL,
  CONTINUE_READING,
  COST,
  CRITERIA,
  Criterion,
  DEVICES,
  EXPERIENCE,
  FAQ,
  GHL_WEBHOOK_URL,
  MID_CTA,
  PRICING,
  QUALIFICATIONS,
  RED_FLAGS,
  SHORT_ANSWER,
  SOURCES,
  STORAGE_KEY,
  WHY_PREMIER,
} from "./evaluate/data";

/**
 * EvaluateSurgeon — the interactive "How to evaluate a limb lengthening
 * surgeon" page. Faithful React port of the standalone mock
 * `Evaluate_page/evaluate-your-surgeon.html`:
 *   • Client-side only. Scores + notes persist to localStorage; nothing is
 *     sent to the server unless the visitor opts into the email form.
 *   • Static education / FAQ / disclaimer render server-side for SEO.
 *   • Print buttons toggle a body class and window.print() (see evaluate.css).
 *
 * All visual styling comes from the scoped `.est` stylesheet imported by the
 * route (app/evaluate-your-surgeon/evaluate.css). The shared NavV2 + FooterV2
 * chrome is rendered by the route, not here.
 */

type Surgeon = {
  id: string;
  name: string;
  scores: Record<string, number>;
  notes: Record<string, string>;
};

type ActiveTab = string | "dash" | null;

// ---------- score math ----------
function sectionScore(s: Surgeon, phase: 1 | 2) {
  let pts = 0;
  let scored = 0;
  CRITERIA.forEach((c) => {
    if (c.phase === phase && s.scores[c.id]) {
      pts += s.scores[c.id];
      scored++;
    }
  });
  return { pts, scored, max: scored * 5 };
}

function totals(s: Surgeon) {
  const p1 = sectionScore(s, 1);
  const p2 = sectionScore(s, 2);
  return {
    clin: p1,
    exp: p2,
    pts: p1.pts + p2.pts,
    scored: p1.scored + p2.scored,
    max: (p1.scored + p2.scored) * 5,
  };
}

// ---------- shared question-sheet builder (print + copy) ----------
const QUESTION_BLOCKS = [...CRITERIA, PRICING].map((c) => ({
  heading: c.qsHeading,
  questions: c.questions,
}));

export function EvaluateSurgeon() {
  const [surgeons, setSurgeons] = useState<Surgeon[]>([]);
  const [active, setActive] = useState<ActiveTab>(null);
  const [storageOK, setStorageOK] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [printDate, setPrintDate] = useState("");

  // Grow-in animation for the score bars, retriggered per active tab.
  const [reveal, setReveal] = useState(false);

  // ---------- load once (keeps SSR / first client render empty) ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.surgeons)) {
          const loaded: Surgeon[] = parsed.surgeons.map((s: Surgeon) => ({
            ...s,
            notes: s.notes || {},
            scores: s.scores || {},
          }));
          setSurgeons(loaded);
          let next: ActiveTab = parsed.active ?? null;
          if (next && next !== "dash" && !loaded.find((s) => s.id === next)) {
            next = loaded.length ? loaded[0].id : null;
          }
          if (loaded.length && !next) next = loaded[0].id;
          setActive(next);
        }
      }
    } catch {
      setStorageOK(false);
    }
    setHydrated(true);
  }, []);

  // ---------- persist ----------
  useEffect(() => {
    if (!hydrated || !storageOK) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ surgeons, active }));
    } catch {
      /* quota or privacy mode — tool continues in-memory */
    }
  }, [surgeons, active, hydrated, storageOK]);

  // ---------- animate bars on tab change ----------
  useEffect(() => {
    setReveal(false);
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReveal(true)),
    );
    return () => cancelAnimationFrame(r);
  }, [active]);

  // ---------- mutations ----------
  const addSurgeon = useCallback(() => {
    const name = nameInput.trim();
    if (!name) return;
    const s: Surgeon = { id: "s" + Date.now(), name, scores: {}, notes: {} };
    setSurgeons((prev) => [...prev, s]);
    setActive(s.id);
    setNameInput("");
  }, [nameInput]);

  const removeSurgeon = useCallback(
    (id: string) => {
      const s = surgeons.find((x) => x.id === id);
      if (!s) return;
      if (!window.confirm(`Remove "${s.name}" and all scores for this surgeon?`))
        return;
      setSurgeons((prev) => {
        const next = prev.filter((x) => x.id !== id);
        setActive((cur) => (cur === id ? (next.length ? next[0].id : "dash") : cur));
        return next;
      });
    },
    [surgeons],
  );

  const setScore = useCallback((surgeonId: string, critId: string, v: number) => {
    setSurgeons((prev) =>
      prev.map((s) => {
        if (s.id !== surgeonId) return s;
        const scores = { ...s.scores };
        if (scores[critId] === v) delete scores[critId];
        else scores[critId] = v;
        return { ...s, scores };
      }),
    );
  }, []);

  const setNote = useCallback((surgeonId: string, critId: string, text: string) => {
    setSurgeons((prev) =>
      prev.map((s) =>
        s.id === surgeonId ? { ...s, notes: { ...s.notes, [critId]: text } } : s,
      ),
    );
  }, []);

  // ---------- print ----------
  const printQuestions = useCallback(() => {
    document.body.classList.add("print-questions");
    window.print();
    document.body.classList.remove("print-questions");
  }, []);

  const printReport = useCallback(() => {
    setPrintDate(new Date().toLocaleDateString());
    // let the date paint before the print dialog blocks the thread
    requestAnimationFrame(() => {
      document.body.classList.add("print-report");
      window.print();
      document.body.classList.remove("print-report");
    });
  }, []);

  const showDash = active === "dash" || surgeons.length === 0;
  const activeSurgeon =
    !showDash && active ? surgeons.find((s) => s.id === active) : undefined;

  return (
    <div className="est">
      <main id="main">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="est-wrap">
            <span className="est-eyebrow">
              Patient Resource · Surgeon Evaluation Framework
            </span>
            <h1 className="serif-h">
              How to evaluate a <em>limb lengthening surgeon.</em>
            </h1>
            <p className="lede">
              Most patients research limb lengthening for months before their
              first consultation, then walk in without a structured way to
              compare surgeons. This framework fixes that. Score any surgeon
              across 10 clinical and patient experience criteria, compare them
              side by side, and know exactly what to ask before you commit to a
              six-figure procedure.
            </p>
            <div className="notice" role="note">
              <span className="n-icon">Note</span>
              <span>
                Your scores are saved on this device. If you clear your browser
                data or switch devices, you will need to start over. Use the
                email option in the summary section to save a copy.
              </span>
            </div>
            <div className="hero-ctas">
              <a className="btn" href="#tool">
                Start Evaluating Surgeons
              </a>
              <button className="btn btn-ghost" type="button" onClick={printQuestions}>
                Print the Question List
              </button>
            </div>
          </div>
        </section>

        {/* ============ SHORT ANSWER ============ */}
        <section className="short-answer-sec">
          <div className="est-wrap">
            <span className="est-eyebrow">The Short Answer</span>
            <p className="short-answer">{SHORT_ANSWER}</p>
          </div>
        </section>

        {/* ============ EDITORIAL INTRO ============ */}
        <section className="hairline-top">
          <div className="est-wrap">
            <div className="editorial">
              <span className="est-eyebrow">Why These Criteria</span>
              <h2 className="serif-h">
                Choosing a surgeon is the single most consequential decision you
                will make.
              </h2>
              <p>
                Limb lengthening is not a commodity procedure. The device is the
                same across many practices. The outcome is not. What separates
                results is the surgeon: their training, their case volume, their
                ability to manage complications, and the structure of care
                around you for the 6 to 12 months of recovery that follow
                surgery.
              </p>
              <p>
                The criteria in this framework fall into two categories.
                Clinical criteria can be researched and scored before you ever
                speak to a practice: fellowship training, procedure volume,
                device expertise, revision surgery capability, and complication
                management. Patient experience criteria can only be scored after
                a consultation: bedside manner, communication responsiveness,
                thoroughness, your comfort level, and post-op support clarity.
              </p>
              <p>
                Both categories matter. A technically excellent surgeon with an
                unreachable office becomes a problem at week nine of your
                lengthening phase. A warm consultation with a surgeon who has
                never managed a nonunion becomes a problem the moment something
                deviates from plan. The strongest choice is the surgeon who
                scores well across both, and the only way to see that clearly is
                to score every surgeon on the same scale.
              </p>
              <p>
                This tool is free, requires no account, and sends nothing to us.
                Your scores and notes stay in your browser. Use it on every
                surgeon you are considering, including Dr. Basmajian.
              </p>
            </div>
          </div>
        </section>

        {/* ============ QUALIFICATIONS ============ */}
        <section className="hairline-top">
          <div className="est-wrap">
            <div className="editorial">
              <span className="est-eyebrow">{QUALIFICATIONS.eyebrow}</span>
              <h2 className="serif-h">{QUALIFICATIONS.heading}</h2>
              {QUALIFICATIONS.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section className="hairline-top">
          <div className="est-wrap">
            <div className="editorial">
              <span className="est-eyebrow">{EXPERIENCE.eyebrow}</span>
              <h2 className="serif-h">{EXPERIENCE.heading}</h2>
              {EXPERIENCE.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE TOOL ============ */}
        <section id="tool" className="tool">
          <div className="est-wrap">
            <div className="tool-head">
              <div>
                <span className="est-eyebrow">The Evaluation Tool</span>
                <h2 className="serif-h">
                  Score every surgeon on the <em>same scale.</em>
                </h2>
              </div>
              <button
                className="btn btn-ghost btn-sm no-print"
                type="button"
                onClick={printQuestions}
              >
                Print the Question List
              </button>
            </div>

            {!storageOK && (
              <div className="fallback show" role="alert">
                Something went wrong loading your saved data. You can start a new
                evaluation or print the question list from the button above.
              </div>
            )}

            <label htmlFor="surgeon-name" style={{ fontWeight: 600, fontSize: 15 }}>
              Add a surgeon to evaluate
            </label>
            <div className="add-row">
              <input
                type="text"
                id="surgeon-name"
                placeholder="Enter surgeon name"
                maxLength={60}
                autoComplete="off"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSurgeon();
                  }
                }}
              />
              <button className="btn" type="button" onClick={addSurgeon}>
                Add Surgeon
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
              Any label works. A name, a city, or a number. Each surgeon gets the
              full question list, notes space, and scorecard. Everything stays on
              this device.
            </p>

            {surgeons.length > 0 && (
              <div
                className="tabs-bar"
                role="tablist"
                aria-label="Surgeons and summary"
              >
                {surgeons.map((s) => (
                  <button
                    key={s.id}
                    className="tab-btn"
                    type="button"
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={active === s.id}
                    aria-controls={`panel-${s.id}`}
                    onClick={() => setActive(s.id)}
                  >
                    {s.name}
                  </button>
                ))}
                <button
                  className="tab-btn dash-tab"
                  type="button"
                  role="tab"
                  id="tab-dash"
                  aria-selected={active === "dash"}
                  aria-controls="dash-panel"
                  onClick={() => setActive("dash")}
                >
                  Summary Dashboard
                </button>
              </div>
            )}

            {/* --- surgeon panel --- */}
            <div id="panels">
              {activeSurgeon && (
                <SurgeonPanel
                  key={activeSurgeon.id}
                  surgeon={activeSurgeon}
                  reveal={reveal}
                  onScore={setScore}
                  onNote={setNote}
                  onRemove={removeSurgeon}
                />
              )}
            </div>

            {/* --- summary dashboard --- */}
            <div
              id="dash-panel"
              role="tabpanel"
              aria-labelledby="tab-dash"
              hidden={!showDash}
            >
              <div className="panel">
                <div className="panel-top">
                  <h3>Summary dashboard</h3>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    Totals reflect scored criteria only
                  </span>
                </div>

                {surgeons.length === 0 ? (
                  <div className="dash-empty">
                    <p>Add your first surgeon to begin evaluating.</p>
                  </div>
                ) : (
                  <>
                    <div className="dash-scroll">
                      <Dashboard surgeons={surgeons} reveal={reveal} />
                    </div>
                    <ExportBlock surgeons={surgeons} onPrintReport={printReport} />
                  </>
                )}

                <p className="help-line">
                  Having trouble? Call us at{" "}
                  <a href={site.phoneHref}>{site.phone}</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CRITERIA EDUCATION ============ */}
        <section id="criteria-explained" className="hairline-top">
          <div className="est-wrap">
            <span className="est-eyebrow">The Framework, Explained</span>
            <h2 className="serif-h" style={{ fontSize: "clamp(26px,3.6vw,38px)" }}>
              Why each criterion <em>matters.</em>
            </h2>
            <div className="edu-grid">
              {CRITERIA.map((c) => (
                <article className="edu-item" id={`edu-${c.id}`} key={c.id}>
                  <div>
                    <span className="e-num">{c.eNum}</span>
                    <h3>{c.name}</h3>
                  </div>
                  <div className="edu-body">
                    <p>{c.why}</p>
                    <div className="edu-qs">
                      <h3 className="edu-qs-h">{c.qsHeading}</h3>
                      <ul className="qs-list">
                        {c.questions.map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}

              <article className="edu-item" id="edu-pricing">
                <div>
                  <span className="e-num">{PRICING.eNum}</span>
                  <h3>{PRICING.name}</h3>
                </div>
                <div className="edu-body">
                  <p>{PRICING.paragraph}</p>
                  <div className="edu-qs">
                    <h3 className="edu-qs-h">{PRICING.qsHeading}</h3>
                    <ul className="qs-list">
                      {PRICING.questions.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============ MID CTA ============ */}
        <section className="cta-band">
          <div className="est-wrap">
            <p className="serif-h cta-band-text">{MID_CTA.text}</p>
            <Link className="btn" href={MID_CTA.ctaHref}>
              {MID_CTA.ctaText}
            </Link>
          </div>
        </section>

        {/* ============ DEVICES ============ */}
        <section id="devices" className="hairline-top">
          <div className="est-wrap">
            <span className="est-eyebrow">{DEVICES.eyebrow}</span>
            <h2 className="serif-h section-h">{DEVICES.heading}</h2>
            <p className="section-lede">{DEVICES.intro}</p>
            <div className="spec-wrap">
              <table className="spec wide">
                <thead>
                  <tr>
                    {DEVICES.columns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEVICES.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((cell, ci) => (
                        <td key={ci} className={ci === 0 ? "spec-name" : undefined}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="section-note">{DEVICES.note}</p>
          </div>
        </section>

        {/* ============ RED FLAGS ============ */}
        <section id="red-flags" className="hairline-top">
          <div className="est-wrap">
            <span className="est-eyebrow">{RED_FLAGS.eyebrow}</span>
            <h2 className="serif-h section-h">{RED_FLAGS.heading}</h2>
            <p className="section-lede">{RED_FLAGS.intro}</p>
            <ul className="flags">
              {RED_FLAGS.items.map(([title, desc]) => (
                <li className="flag" key={title}>
                  <span className="flag-title">{title}</span>
                  <span className="flag-desc">{desc}</span>
                </li>
              ))}
            </ul>
            <p className="section-note">{RED_FLAGS.note}</p>
          </div>
        </section>

        {/* ============ COST ============ */}
        <section id="cost" className="hairline-top">
          <div className="est-wrap">
            <span className="est-eyebrow">{COST.eyebrow}</span>
            <h2 className="serif-h section-h">{COST.heading}</h2>
            <p className="section-lede">{COST.intro}</p>
            <div className="spec-wrap">
              <table className="spec cost">
                <thead>
                  <tr>
                    {COST.columns.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COST.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            ci === 0 ? "spec-name" : ci === 2 ? "spec-price" : undefined
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="section-note">{COST.note}</p>
            <Link className="section-link" href={COST.linkHref}>
              {COST.linkText} →
            </Link>
          </div>
        </section>

        {/* ============ WHY PREMIER ============ */}
        <section id="why-premier" className="band-cream">
          <div className="est-wrap">
            <span className="est-eyebrow">{WHY_PREMIER.eyebrow}</span>
            <h2 className="serif-h section-h">{WHY_PREMIER.heading}</h2>
            <p className="section-lede">{WHY_PREMIER.intro}</p>
            <ol className="premier-points">
              {WHY_PREMIER.points.map((p, i) => (
                <li className="premier-point" key={i}>
                  <span className="premier-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="premier-text">{p}</span>
                </li>
              ))}
            </ol>
            <div className="premier-closing">
              <p className="serif-h premier-closing-lead">{WHY_PREMIER.closingLead}</p>
              <p className="premier-closing-sub">{WHY_PREMIER.closingSub}</p>
              <Link className="btn" href={WHY_PREMIER.ctaHref}>
                {WHY_PREMIER.ctaText}
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="hairline-top">
          <div className="est-wrap">
            <span className="est-eyebrow">Common Questions</span>
            <h2 className="serif-h" style={{ fontSize: "clamp(26px,3.6vw,38px)" }}>
              Frequently asked <em>questions.</em>
            </h2>
            <div className="faq-list">
              {FAQ.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="faq-body">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DISCLAIMER ============ */}
        <section className="hairline-top">
          <div className="est-wrap">
            <div className="disclaimer">
              <span className="est-eyebrow">Medical Disclaimer</span>
              <p>
                The information on this page is provided for educational
                purposes and does not constitute medical advice. Limb
                lengthening surgery using the PRECICE intramedullary lengthening
                system involves material risks, including but not limited to
                infection, nerve injury, deep vein thrombosis, hardware failure,
                premature consolidation, delayed union or nonunion, joint
                contracture, and outcomes that vary by patient. The PRECICE
                system is FDA-cleared for specific indications, and not all
                patients are candidates. No surgical outcome can be guaranteed.
                Recovery timelines reflect typical ranges and individual
                experiences may vary. Results, candidacy, and surgical planning
                are determined on a case-by-case basis following a personal
                consultation with Dr. Basmajian. Premier Limb Lengthening does
                not establish a patient-physician relationship through this
                website. To discuss whether limb lengthening is appropriate for
                you, schedule a confidential consultation.
              </p>
            </div>
          </div>
        </section>

        {/* ============ SOURCES & FURTHER READING ============ */}
        <section id="sources" className="hairline-top no-print">
          <div className="est-wrap">
            <span className="est-eyebrow">Sources &amp; Further Reading</span>
            <h2 className="serif-h section-h">References</h2>
            <ul className="sources">
              {SOURCES.map((s) => (
                <li className="source" key={s.domain}>
                  <span className="source-name">{s.name}</span>
                  <span className="source-desc">{s.desc}</span>
                  <a
                    className="source-link"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.domain} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ CONTINUE READING ============ */}
        <section id="continue" className="band-cream no-print">
          <div className="est-wrap">
            <span className="est-eyebrow">Continue Reading</span>
            <h2 className="serif-h section-h">Keep going.</h2>
            <div className="continue-grid">
              {CONTINUE_READING.map((g) => (
                <div className="continue-col" key={g.label}>
                  <span className="continue-label">{g.label}</span>
                  <ul>
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href}>{l.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HIDDEN PRINT: REPORT ============ */}
        <section id="print-report-sec">
          <div className="est-wrap">
            <div className="print-report-body">
              <h2>Surgeon Evaluation Comparison</h2>
              <p className="pr-meta">
                Framework by Dr. Hrayr Basmajian, MD, MS · Premier Limb
                Lengthening · premierlimblengthening.com/evaluate-your-surgeon
                {printDate ? ` · Printed ${printDate}` : ""}
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    {surgeons.map((s) => (
                      <th key={s.id}>{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([1, 2] as const).map((phase) => (
                    <PrintReportPhase
                      key={phase}
                      phase={phase}
                      surgeons={surgeons}
                    />
                  ))}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    {surgeons.map((s) => {
                      const t = totals(s);
                      return (
                        <td key={s.id}>
                          <strong>{t.scored ? `${t.pts} / ${t.max}` : "—"}</strong>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
              <div className="pr-edu">
                <h3>What the criteria measure</h3>
                {CRITERIA.map((c) => (
                  <div key={c.id}>
                    <h3>{c.name}</h3>
                    <p>{c.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HIDDEN PRINT: QUESTION SHEET ============ */}
        <section id="print-questions-sec">
          <div className="est-wrap">
            <div className="print-report-body">
              <h2>The Consultation Question List</h2>
              <p className="pr-meta">
                Framework by Dr. Hrayr Basmajian, MD, MS · Premier Limb
                Lengthening · premierlimblengthening.com/evaluate-your-surgeon
              </p>
              <p className="pq-intro">
                Ask these in the same order with every surgeon so the answers are
                comparable. Write each answer on the line beneath the question,
                then score the surgeon in the online tool.
              </p>
              {QUESTION_BLOCKS.map((b) => (
                <div key={b.heading}>
                  <h3 className="pq-h">{b.heading}</h3>
                  <ul className="pq-list">
                    {b.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ================= Surgeon panel =================
function SurgeonPanel({
  surgeon: s,
  reveal,
  onScore,
  onNote,
  onRemove,
}: {
  surgeon: Surgeon;
  reveal: boolean;
  onScore: (surgeonId: string, critId: string, v: number) => void;
  onNote: (surgeonId: string, critId: string, text: string) => void;
  onRemove: (id: string) => void;
}) {
  const t = totals(s);
  const clinPct = t.clin.scored ? (t.clin.pts / (t.clin.scored * 5)) * 100 : 0;
  const expPct = t.exp.scored ? (t.exp.pts / (t.exp.scored * 5)) * 100 : 0;
  const totPct = t.scored ? (t.pts / t.max) * 100 : 0;

  return (
    <div className="panel" id={`panel-${s.id}`} role="tabpanel" aria-labelledby={`tab-${s.id}`}>
      <div className="panel-top">
        <h3>{s.name}</h3>
        <button
          className="remove-link"
          type="button"
          onClick={() => onRemove(s.id)}
        >
          Remove Surgeon
        </button>
      </div>

      {([1, 2] as const).map((phase) => {
        const meta =
          phase === 1
            ? { num: "Phase 01", title: "Clinical criteria", sub: "Scorable from research" }
            : {
                num: "Phase 02",
                title: "Patient experience criteria",
                sub: "Score after your consultation",
              };
        return (
          <div className="phase" key={phase}>
            <div className="phase-hd">
              <span className="p-num">{meta.num}</span>
              <h4>{meta.title}</h4>
              <span className="p-sub">{meta.sub}</span>
            </div>
            {CRITERIA.filter((c) => c.phase === phase).map((c) => (
              <CriterionCard
                key={c.id}
                c={c}
                phase={phase}
                surgeonId={s.id}
                value={s.scores[c.id] || 0}
                note={s.notes[c.id] || ""}
                onScore={onScore}
                onNote={onNote}
              />
            ))}
          </div>
        );
      })}

      <div className="viz" aria-label={`Score summary for ${s.name}`}>
        <div className="viz-row">
          <span className="viz-label">Clinical</span>
          <div className="viz-track">
            <div className="viz-fill" style={{ width: `${reveal ? clinPct : 0}%` }} />
          </div>
          <span className="viz-num">
            {t.clin.pts} / {t.clin.scored * 5 || 25}
          </span>
        </div>
        <div className="viz-row">
          <span className="viz-label">Experience</span>
          <div className="viz-track">
            <div className="viz-fill f-exp" style={{ width: `${reveal ? expPct : 0}%` }} />
          </div>
          <span className="viz-num">
            {t.exp.pts} / {t.exp.scored * 5 || 25}
          </span>
        </div>
        <div className="viz-row">
          <span className="viz-label">Total</span>
          <div className="viz-track">
            <div className="viz-fill f-total" style={{ width: `${reveal ? totPct : 0}%` }} />
          </div>
          <span className="viz-num viz-total-num">
            {t.pts} / {t.max || 50}
          </span>
        </div>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted)",
            marginTop: 12,
            fontFamily: "var(--mono)",
          }}
        >
          {t.scored} of 10 criteria scored. Totals reflect scored criteria only.
        </p>
      </div>
    </div>
  );
}

// ================= Criterion card =================
function CriterionCard({
  c,
  phase,
  surgeonId,
  value,
  note,
  onScore,
  onNote,
}: {
  c: Criterion;
  phase: 1 | 2;
  surgeonId: string;
  value: number;
  note: string;
  onScore: (surgeonId: string, critId: string, v: number) => void;
  onNote: (surgeonId: string, critId: string, text: string) => void;
}) {
  const unscoredExp = phase === 2 && !value ? " unscored-exp" : "";
  return (
    <div className={`crit${unscoredExp}`}>
      <div className="crit-top">
        <span className="crit-name">{c.name}</span>
        {value ? (
          <span className="crit-score-num">{value} / 5</span>
        ) : (
          <span className="crit-score-num unscored">
            {phase === 2 ? "Not yet scored" : "— / 5"}
          </span>
        )}
      </div>
      <div
        className="seg-row"
        role="group"
        aria-label={`Score ${c.name} from 1 to 5`}
      >
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            className="seg"
            data-v={v}
            aria-pressed={value === v}
            aria-label={`Score ${v}: ${c.anchors[v - 1]}`}
            onClick={() => onScore(surgeonId, c.id, v)}
          >
            {v}
          </button>
        ))}
      </div>
      {value ? (
        <div className="anchor-label">{c.anchors[value - 1]}</div>
      ) : phase === 2 ? (
        <div className="anchor-label muted-note">
          Not yet scored — score after consultation
        </div>
      ) : (
        <div className="anchor-label muted-note">
          Select a score to see its definition
        </div>
      )}
      <details className="why qs-block">
        <summary>{c.askLabel}</summary>
        <div className="why-body">
          <ul className="qs-list">
            {c.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </details>
      <details className="why">
        <summary>Why this matters</summary>
        <div className="why-body">{c.why}</div>
      </details>
      <label className="note-label" htmlFor={`note-${surgeonId}-${c.id}`}>
        Their answer, your notes
      </label>
      <textarea
        className="note-field"
        id={`note-${surgeonId}-${c.id}`}
        rows={2}
        maxLength={600}
        placeholder="A few words is enough. Example: fellowship in Scottsdale, 40 cases per year"
        value={note}
        onChange={(e) => onNote(surgeonId, c.id, e.target.value)}
      />
    </div>
  );
}

// ================= Dashboard =================
function Dashboard({ surgeons, reveal }: { surgeons: Surgeon[]; reveal: boolean }) {
  return (
    <table className="dash" role="table" aria-label="Side by side surgeon comparison">
      {/* thead is visually hidden on mobile (cards self-label via data-label)
          but kept in the DOM with roles so screen readers still announce it. */}
      <thead role="rowgroup">
        <tr role="row">
          <th className="rowhead" scope="col" role="columnheader">
            Criterion
          </th>
          {surgeons.map((s) => (
            <th key={s.id} scope="col" role="columnheader">
              {s.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {([1, 2] as const).map((phase) => (
          <DashboardPhase
            key={phase}
            phase={phase}
            surgeons={surgeons}
            reveal={reveal}
          />
        ))}
        <tr className="total-row" role="row">
          <td className="rowhead" role="cell">
            Total score
          </td>
          {surgeons.map((s) => {
            const t = totals(s);
            return (
              <td key={s.id} role="cell" data-label={s.name}>
                {t.scored ? `${t.pts} / ${t.max}` : "—"}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

function DashboardPhase({
  phase,
  surgeons,
  reveal,
}: {
  phase: 1 | 2;
  surgeons: Surgeon[];
  reveal: boolean;
}) {
  return (
    <>
      <tr className="sec-row" role="row">
        <td className="rowhead" role="cell">
          {phase === 1 ? "Clinical criteria" : "Patient experience criteria"}
        </td>
        {surgeons.map((s) => (
          <td key={s.id} role="cell" aria-hidden="true" />
        ))}
      </tr>
      {CRITERIA.filter((c) => c.phase === phase).map((c) => {
        // Per-criterion leader (highest score entered) — a subtle mobile-only
        // comparison cue. Inert on desktop (.cell-leader is unstyled there).
        const max = Math.max(0, ...surgeons.map((s) => s.scores[c.id] || 0));
        return (
          <tr key={c.id} role="row">
            <td className="rowhead" role="cell">
              {c.name}
            </td>
            {surgeons.map((s) => {
              const v = s.scores[c.id];
              const leader = surgeons.length > 1 && !!v && v === max;
              return (
                <td
                  key={s.id}
                  role="cell"
                  data-label={s.name}
                  className={leader ? "cell-leader" : undefined}
                >
                  {v ? (
                    <>
                      <span className="cell-score">{v} / 5</span>
                      <div className="mini-track">
                        <div
                          className="mini-fill"
                          style={{ width: `${reveal ? (v / 5) * 100 : 0}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <span className="cell-unscored">Not yet scored</span>
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
      <tr className="subtotal" role="row">
        <td className="rowhead" role="cell">
          {phase === 1 ? "Clinical subtotal" : "Experience subtotal"}
        </td>
        {surgeons.map((s) => {
          const sec = sectionScore(s, phase);
          return (
            <td key={s.id} role="cell" data-label={s.name}>
              {sec.scored ? `${sec.pts} / ${sec.max}` : "—"}
            </td>
          );
        })}
      </tr>
    </>
  );
}

// ================= Print report phase (rows) =================
function PrintReportPhase({ phase, surgeons }: { phase: 1 | 2; surgeons: Surgeon[] }) {
  return (
    <>
      {CRITERIA.filter((c) => c.phase === phase).map((c) => (
        <tr key={c.id}>
          <td>{c.name}</td>
          {surgeons.map((s) => {
            const v = s.scores[c.id];
            const noteText = s.notes && s.notes[c.id];
            return (
              <td key={s.id}>
                {v ? `${v} / 5 — ${c.anchors[v - 1]}` : "Not yet scored"}
                {noteText ? (
                  <>
                    <br />
                    <em>Notes: {noteText}</em>
                  </>
                ) : null}
              </td>
            );
          })}
        </tr>
      ))}
      <tr>
        <td>
          <strong>
            {phase === 1 ? "Clinical subtotal" : "Experience subtotal"}
          </strong>
        </td>
        {surgeons.map((s) => {
          const sec = sectionScore(s, phase);
          return (
            <td key={s.id}>
              <strong>{sec.scored ? `${sec.pts} / ${sec.max}` : "—"}</strong>
            </td>
          );
        })}
      </tr>
    </>
  );
}

// ================= Export / share / email block =================
function ExportBlock({
  surgeons,
  onPrintReport,
}: {
  surgeons: Surgeon[];
  onPrintReport: () => void;
}) {
  const [canShare, setCanShare] = useState(false);
  const [optEmail, setOptEmail] = useState(false);
  const [optNurture, setOptNurture] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [formMsg, setFormMsg] = useState<{ kind: "ok" | "err" | ""; text: string }>({
    kind: "",
    text: "",
  });

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const shareURL = CANONICAL_URL;

  const summaryText =
    "How to Evaluate a Limb Lengthening Surgeon\n" +
    "A free 10-criterion scoring framework. Score any surgeon, compare side by side, no account needed.\n\n" +
    "Clinical criteria: fellowship training, procedure volume, device expertise, revision surgery capability, complication management.\n" +
    "Patient experience criteria: bedside manner, communication responsiveness, thoroughness, comfort level, post-op support clarity.\n\n" +
    "Free tool with the full question list, notes space, and printable version: " +
    shareURL;

  const questionsText = () => {
    const lines = [
      "The Consultation Question List — Premier Limb Lengthening",
      "Ask these in the same order with every surgeon so the answers are comparable.",
      "",
    ];
    QUESTION_BLOCKS.forEach((b) => {
      lines.push(b.heading.toUpperCase());
      b.questions.forEach((q) => lines.push("- " + q));
      lines.push("");
    });
    lines.push("Interactive scoring tool: " + shareURL);
    return lines.join("\n");
  };

  const resultsPayloadText = () => {
    const lines = [
      "Surgeon Evaluation Results — generated at premierlimblengthening.com/evaluate-your-surgeon",
      "",
    ];
    surgeons.forEach((s) => {
      const t = totals(s);
      lines.push(
        `${s.name} — Total: ${t.scored ? `${t.pts} / ${t.max}` : "not yet scored"}` +
          ` (Clinical ${t.clin.scored ? `${t.clin.pts}/${t.clin.max}` : "—"}, Experience ${
            t.exp.scored ? `${t.exp.pts}/${t.exp.max}` : "—"
          })`,
      );
      CRITERIA.forEach((c) => {
        const v = s.scores[c.id];
        lines.push(
          `  ${c.name}: ${v ? `${v}/5 — ${c.anchors[v - 1]}` : "Not yet scored"}`,
        );
        if (s.notes && s.notes[c.id]) lines.push(`    Notes: ${s.notes[c.id]}`);
      });
      lines.push("");
    });
    return lines.join("\n");
  };

  const showEmailRow = optEmail || optNurture;

  const sendEmail = async () => {
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setFormMsg({
        kind: "err",
        text: "We could not send your results. Check your email address and try again.",
      });
      return;
    }
    const payload = {
      email: value,
      send_results: optEmail,
      educational_opt_in: optNurture,
      results_text: optEmail ? resultsPayloadText() : "",
      source: "surgeon-evaluation-tool",
      page: shareURL,
      utm: (() => {
        try {
          return window.location.search || "";
        } catch {
          return "";
        }
      })(),
    };
    setSending(true);
    try {
      const r = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("send failed");
      setFormMsg({
        kind: "ok",
        text: optEmail
          ? `Sent. Your comparison is on its way to ${value}.`
          : "You are subscribed. The first email arrives shortly.",
      });
    } catch {
      setFormMsg({
        kind: "err",
        text: "We could not send your results. Check your email address and try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="export no-print">
      <h3>Save or share your comparison</h3>
      <p style={{ fontSize: 14, color: "var(--muted)" }}>
        Your scores live on this device only. Print them, email them to
        yourself, or copy the framework to share with someone earlier in their
        research.
      </p>
      <div className="export-grid">
        <div>
          <button
            className="btn"
            type="button"
            style={{ width: "100%" }}
            onClick={onPrintReport}
          >
            Print or Download Comparison
          </button>
          <div className="share-bar">
            <CopyButton
              className="btn btn-ghost btn-sm"
              getText={() => shareURL}
              idle="Copy Link to This Tool"
              done="Link Copied"
            />
            <CopyButton
              className="btn btn-ghost btn-sm"
              getText={() => summaryText}
              idle="Copy Framework as Text"
              done="Copied"
            />
            <CopyButton
              className="btn btn-ghost btn-sm"
              getText={questionsText}
              idle="Copy Question List as Text"
              done="Copied"
            />
            {canShare && (
              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => {
                  navigator
                    .share({
                      title: "How to Evaluate a Limb Lengthening Surgeon",
                      text: "A free 10-criterion framework for comparing limb lengthening surgeons.",
                      url: shareURL,
                    })
                    .catch(() => {});
                }}
              >
                Share
              </button>
            )}
            <span className="share-note">
              Sharing sends the tool link only. Your scores are never included.
            </span>
          </div>
        </div>
        <div>
          <div className="opt">
            <input
              type="checkbox"
              id="opt-email"
              checked={optEmail}
              onChange={(e) => {
                setOptEmail(e.target.checked);
                setFormMsg({ kind: "", text: "" });
              }}
            />
            <label htmlFor="opt-email">
              Email my comparison results to me
              <span className="opt-sub">
                Utility only. Protects your scores if you switch devices or clear
                browser data.
              </span>
            </label>
          </div>
          <div className="opt" style={{ marginTop: 14 }}>
            <input
              type="checkbox"
              id="opt-nurture"
              checked={optNurture}
              onChange={(e) => {
                setOptNurture(e.target.checked);
                setFormMsg({ kind: "", text: "" });
              }}
            />
            <label htmlFor="opt-nurture">
              Send me educational content about evaluating limb lengthening
              surgeons
              <span className="opt-sub">
                Occasional emails that go deeper on each criterion. Unsubscribe
                any time.
              </span>
            </label>
          </div>
          {showEmailRow && (
            <div className="email-row">
              <label className="sr-only" htmlFor="email-input">
                Your email address
              </label>
              <input
                type="email"
                id="email-input"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="btn"
                type="button"
                onClick={sendEmail}
                disabled={sending}
              >
                {sending ? "Sending" : "Send"}
              </button>
            </div>
          )}
          {formMsg.kind && (
            <div className={`form-msg ${formMsg.kind}`} role="status">
              {formMsg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= Copy button =================
function CopyButton({
  className,
  getText,
  idle,
  done,
}: {
  className: string;
  getText: () => string;
  idle: string;
  done: string;
}) {
  const [label, setLabel] = useState(idle);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const fallbackCopy = (text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* no-op */
    }
    document.body.removeChild(ta);
  };

  const handle = () => {
    const text = getText();
    const flash = () => {
      setLabel(done);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setLabel(idle), 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash, () => {
        fallbackCopy(text);
        flash();
      });
    } else {
      fallbackCopy(text);
      flash();
    }
  };

  return (
    <button className={className} type="button" onClick={handle}>
      {label}
    </button>
  );
}
