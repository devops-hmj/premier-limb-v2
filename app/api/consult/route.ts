import { NextResponse } from "next/server";

/**
 * /api/consult — forwards consultation-form submissions to the GoHighLevel
 * (LeadConnector) inbound webhook server-side. Running the POST here (not from
 * the browser) keeps the webhook URL out of the client bundle and avoids CORS.
 */
const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/phtZd7gP6nirg5miTxkV/webhook-trigger/4c8ab9e6-1669-4149-a987-dc0788f3eb85";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic guard: require an email or phone so we don't forward empty spam.
    if (!data?.email && !data?.phone) {
      return NextResponse.json({ ok: false, error: "missing contact" }, { status: 400 });
    }

    const res = await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        submitted_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
