import {
  Arrow,
  Badge,
  Button,
  Card,
  Eyebrow,
  Input,
  PullQuote,
  Section,
  SectionHead,
  StatGrid,
} from "@/components/primitives";

export function Components() {
  return (
    <Section id="sec-06">
      <SectionHead numeral="vi" label="§ 06 · UI">
        <em>Components.</em>
      </SectionHead>

      <div className="grid grid-cols-1 gap-5">
        {/* ---- Buttons ---- */}
        <Block heading={<>Buttons · <em>hierarchy</em></>} meta="Action › Accent › Spine › Ghost">
          <div className="grid gap-5">
            <Tier label="Tier 01 · Conversion — single primary CTA">
              <Button variant="action" as="a" href="#">
                Appointments <Arrow />
              </Button>
              <Button variant="action" as="a" href="#">
                Schedule Consultation <Arrow />
              </Button>
            </Tier>
            <Tier label="Tier 02 · Interactive accent — phone, secondary action">
              <Button variant="accent" as="a" href="tel:9095964346">
                (909) 596-4346
              </Button>
              <Button variant="accent" as="a" href="#">
                View Pricing <Arrow />
              </Button>
            </Tier>
            <Tier label="Tier 03 · Editorial spine — in-body, low intensity">
              <Button variant="spine" as="a" href="#">
                Learn About Dr. Basmajian <Arrow />
              </Button>
              <Button variant="ghost" as="a" href="#">
                View Pricing <Arrow />
              </Button>
              <Button variant="ink" as="a" href="#">
                Confidential Inquiry <Arrow />
              </Button>
            </Tier>
            <Tier label="In context · on hero overlay (dark ground)">
              <div className="flex items-center gap-4 bg-[#2A2D31] px-7 py-6 flex-wrap">
                {["YT", "IG", "f"].map((s) => (
                  <span
                    key={s}
                    className="w-[30px] h-[30px] rounded-pill bg-paper/10 grid place-items-center text-paper font-mono font-medium text-[14px]"
                  >
                    {s}
                  </span>
                ))}
                <Button variant="action" as="a" href="#" className="ml-2">
                  Appointments
                </Button>
                <Button variant="accent" as="a" href="tel:9095964346">
                  (909) 596-4346
                </Button>
              </div>
            </Tier>
          </div>
        </Block>

        {/* ---- Eyebrows + Stats + Card row ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Block heading={<>Eyebrows</>} meta="Section labels">
            <div className="flex flex-col gap-4">
              <Eyebrow>Why Premier · § 01</Eyebrow>
              <Eyebrow>The Process · § 04</Eyebrow>
              <Eyebrow>Patient Stories · § 08</Eyebrow>
            </div>
          </Block>
          <Block heading={<>Stats</>} meta="Numerical proof">
            <StatGrid
              items={[
                { n: <em>100s</em>, label: "Procedures" },
                { n: "17+", label: "Surgeon Group" },
                { n: <><em>3–6</em>″</>, label: "Height Gain" },
              ]}
            />
          </Block>
          <Block heading={<>Card</>} meta="List item / pillar" className="lg:col-span-1">
            <Card index="№ 01" topLabel="Pillar" heading={<>Surgical <em>Expertise</em></>}>
              Hundreds of limb lengthening procedures performed in trauma,
              cosmetic, and revisional settings by Dr. Hrayr Basmajian.
            </Card>
          </Block>
          <Block heading={<>Pull quote</>} meta="Editorial pull-out">
            <PullQuote
              attribution={<>Marcus T. · Software Engineer · San Francisco · 2026</>}
            >
              His honesty about what to expect — <em>including the hard parts</em> —
              is what convinced me.
            </PullQuote>
          </Block>
          <Block heading={<>Form fields</>} meta="Confidential intake" className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="First and last" />
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Phone" type="tel" placeholder="(___) ___-____" />
              <Input
                label="Procedure of interest"
                hint="Optional — for triage"
                placeholder="e.g. Cosmetic, Revisional"
              />
              <Input
                label="Error example"
                error="This field is required"
                placeholder="Your message"
                className="md:col-span-2"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="action" as="a" href="#">
                Submit Inquiry <Arrow />
              </Button>
              <Button variant="ghost" as="a" href="#">
                Cancel
              </Button>
            </div>
          </Block>
          <Block heading={<>Badges</>} meta="Metadata tokens">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>№ 0142</Badge>
              <Badge variant="outline">Confidential</Badge>
              <Badge variant="dark">v1.1 · 2026</Badge>
            </div>
          </Block>
        </div>
      </div>
    </Section>
  );
}

function Block({
  heading,
  meta,
  children,
  className = "",
}: {
  heading: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface p-10 ${className}`}>
      <div className="flex justify-between items-baseline pb-3.5 mb-7 border-b border-ink">
        <h3 className="font-serif font-medium text-[24px] tracking-[-0.01em] [&_em]:italic [&_em]:text-spine">
          {heading}
        </h3>
        {meta && (
          <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
            {meta}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function Tier({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-muted mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-3.5 items-center">{children}</div>
    </div>
  );
}
