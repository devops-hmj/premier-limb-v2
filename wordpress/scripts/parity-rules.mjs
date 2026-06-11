/**
 * parity-rules — debugging helper. Uses CDP CSS.getMatchedStylesForNode to
 * print every CSS rule matching an element (selector, source, declarations),
 * resolving "which rule wins" questions empirically.
 *
 * Usage: node scripts/parity-rules.mjs <url> <selector> [propFilter]
 */
import { chromium } from "playwright";

const [url, selector, propFilter] = process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load", timeout: 45000 });
await page.waitForTimeout(300);

const client = await page.context().newCDPSession(page);
await client.send("DOM.enable");
await client.send("CSS.enable");
const { root } = await client.send("DOM.getDocument");
const { nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector });
if (!nodeId) {
	console.log("no node for", selector);
	process.exit(1);
}
const { matchedCSSRules, inherited } = await client.send("CSS.getMatchedStylesForNode", { nodeId });

function show(rule, origin) {
	const sel = rule.selectorList?.text || "(inline)";
	const props = (rule.style?.cssProperties || [])
		.filter((p) => p.text)
		.filter((p) => !propFilter || p.name.includes(propFilter))
		.map((p) => `${p.name}:${p.value}${p.important ? " !important" : ""}`);
	if (!props.length) return;
	const src = rule.styleSheetId ? "" : "";
	console.log(`[${origin}] ${sel}\n    ${props.join("; ")}`);
}

console.log("=== matched rules (last = highest precedence among ties) ===");
for (const m of matchedCSSRules || []) show(m.rule, m.rule.origin);
console.log("\n=== inherited (font-size etc.) ===");
for (const lvl of (inherited || []).slice(0, 2)) {
	for (const m of lvl.matchedCSSRules || []) show(m.rule, "inh:" + m.rule.origin);
}
await browser.close();
