import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/cn";

/**
 * Prose — renders scraped markdown body verbatim into design-system-aware HTML.
 *
 * The rendered tree uses our editorial typography: serif h2/h3 with italic
 * spine accent, sans body, mono labels, hairline rules between sections.
 * No CMS-style "prose" plugin: every element is mapped explicitly so the
 * output stays inside the design system's voice.
 *
 * Tradeoff: react-markdown adds ~30 KB gzipped but keeps the rendering
 * deterministic + secure + GFM-compliant. Worth it.
 */
type ProseProps = {
  children: string;
  className?: string;
  /** When true, skip the first paragraph of the body — used by the
   *  Service-Sub template where the first paragraph is hoisted into the
   *  page deck. */
  skipFirstParagraph?: boolean;
};

export function Prose({ children, className, skipFirstParagraph = false }: ProseProps) {
  // The scraped markdown uses Setext-style headings (line of === or ---).
  // remark-gfm + the default parser handle that correctly. The strip
  // below is only to deduplicate the page <h1> when present.
  let body = children;
  if (skipFirstParagraph) {
    // Drop the first plain paragraph. Skip past any image/heading/hr first.
    const lines = body.split(/\r?\n/);
    let i = 0;
    while (i < lines.length && /^(\s*$|#|!\[|---|\*\s+\*)/.test(lines[i] ?? "")) i++;
    let j = i;
    while (j < lines.length && lines[j]?.trim() !== "") j++;
    body = [...lines.slice(0, i), ...lines.slice(j)].join("\n").trim();
  }

  return (
    <div className={cn("prose-pll", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null, // page <h1> rendered by the template header instead
          h2: ({ children }) => (
            <h2
              id={toSlug(children)}
              className="
                scroll-mt-24
                font-serif font-medium text-d-m mt-12 mb-5
                leading-[1.15] tracking-[-0.01em]
                [&_em]:italic [&_em]:text-spine
              "
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={toSlug(children)}
              className="
                scroll-mt-24
                font-serif font-medium text-d-s mt-8 mb-3
                leading-[1.2] tracking-[-0.005em]
                [&_em]:italic [&_em]:text-spine
              "
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-serif italic font-medium text-[20px] mt-6 mb-2 leading-[1.25] text-spine">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-t-l text-ink-soft leading-[1.7] mb-5">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-ink">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-6 flex flex-col gap-2 list-none pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 flex flex-col gap-2 list-decimal pl-6 marker:text-spine marker:font-mono">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="grid grid-cols-[auto_1fr] gap-3 items-baseline text-t-l text-ink-soft leading-[1.65]">
              <span aria-hidden className="text-spine font-mono text-[10.5px] mt-1.5">
                ·
              </span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 surface-wash px-7 py-6 font-serif italic text-[20px] leading-[1.5] text-ink [&_em]:not-italic [&_em]:text-spine">
              {children}
            </blockquote>
          ),
          hr: () => <div className="my-10 rule-hair" />,
          // Embedded markdown images point at legacy wp-content/uploads/
          // URLs that aren't reachable from this deployment. Suppressing
          // them entirely until real assets get wired in.
          img: () => null,
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto border border-ink">
              <table className="w-full border-collapse text-t-m">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-paper-warm border-b border-ink font-mono text-eyebrow tracking-eyebrow uppercase">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="text-left p-3">{children}</th>,
          td: ({ children }) => (
            <td className="p-3 border-b border-rule text-ink-soft">{children}</td>
          ),
          code: ({ children }) => (
            <code className="font-mono text-[13px] bg-paper-warm px-1.5 py-0.5">
              {children}
            </code>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

function toSlug(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props: { children?: React.ReactNode } }).props;
    return extractText(props.children);
  }
  return "";
}
