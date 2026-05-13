import { Arrow, Button, Container } from "@/components/primitives";
import { site } from "@/lib/site";

type CtaBannerProps = {
  /** Headline copy — wrap a word in <em> for italic-cream accent. */
  headline?: React.ReactNode;
  /** Body line under the headline. */
  body?: React.ReactNode;
  /** Primary CTA target. Defaults to /consult. */
  primaryHref?: string;
  primaryLabel?: string;
  /** Whether to render the phone-call secondary action. */
  showPhone?: boolean;
};

/**
 * CtaBanner — full-bleed spine-blue strip with a closing consultation prompt.
 * Used at the end of every content page. Visual cousin of the homepage
 * ClosingCta but more compact and reusable.
 */
export function CtaBanner({
  headline = (
    <>
      A consultation, not a sales call. <em>Talk to Dr. Basmajian.</em>
    </>
  ),
  body = "In-person or virtual appointments available for patients nationwide.",
  primaryHref = "/consult",
  primaryLabel = "Schedule a Confidential Consultation",
  showPhone = true,
}: CtaBannerProps) {
  return (
    <section className="bg-spine text-paper border-t border-spine-deep">
      <Container className="py-section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="max-w-prose">
            <h2 className="font-serif font-medium text-[clamp(1.75rem,3vw,3rem)] leading-[1.04] tracking-[-0.02em] [&_em]:italic [&_em]:text-cream [text-wrap:balance]">
              {headline}
            </h2>
            {body && (
              <p className="mt-4 font-serif italic text-t-l text-paper/85 leading-[1.5]">
                {body}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Button variant="action" as="a" href={primaryHref}>
              {primaryLabel} <Arrow />
            </Button>
            {showPhone && (
              <Button variant="accent" as="a" href={site.phoneHref}>
                Call {site.phone}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
