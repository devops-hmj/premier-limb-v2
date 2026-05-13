/**
 * JsonLd — emits a <script type="application/ld+json"> tag with the given
 * schema.org object(s). Stringified with stable JSON.stringify and injected
 * via dangerouslySetInnerHTML.
 *
 * Accepts a single object or an array. Each element renders as a separate
 * <script> tag (Google + LLMs both handle either).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
