"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { sectionTag } from "@/lib/sectionIndex";
import { FileTag, QuoteCard, SectionRule, StencilTitle, space } from "@/assets";

const QUOTES = [
  {
    quote:
      "Daniel has a deep understanding of software architectures and knows how to build them from scratch. Great knowledge of cutting-edge technologies — and knows how and when to use them.",
    author: "Can Pinar",
    role: "Founder & CEO",
    org: "Cytolytics",
    code: "R-01",
  },
  {
    quote:
      "Constantly proves his great expertise in machine learning and cloud architecture. A proactive, solution-oriented colleague driven by creativity and curiosity for current trends.",
    author: "Christoph Meier",
    role: "AI & Analytics Strategy",
    org: "Automotive",
    code: "R-02",
  },
  {
    quote:
      "A very good software developer with a broad knowledge of big data architectures. Always up to date — and great at finding creative solutions to the various obstacles along the way.",
    author: "Andreas Waßmus",
    role: "AI Consultant",
    org: "Data Science",
    code: "R-03",
  },
  {
    quote:
      "A very broad technical background combined with remarkable passion for data science. He pushed the products forward with an eye for detail and great curiosity for the latest trends.",
    author: "David Sebastian Schlepps",
    role: "Head of AI Academy",
    org: "AI Leadership",
    code: "R-04",
  },
  {
    quote:
      "A very inspiring personality, full of ideas and with a broad technical background. Daniel is able to deliver and prototype software products extremely quickly — he has internalized the agile mindset.",
    author: "Tobias Grosse-Puppendahl",
    role: "Data & AI Architect",
    org: "",
    code: "R-05",
  },
  {
    quote:
      "A creative mindset and a very special passion for the future of artificial intelligence. He is not only talking — he is doing things.",
    author: "Dr. Jan Feiling",
    role: "Product",
    org: "Helsing",
    code: "R-06",
  },
  {
    quote:
      "Extremely reliable and open-minded. Deep technical skills and practical experience in managing complex projects. Would I work with Daniel again? Yes, of course.",
    author: "Tobias Oberrauch",
    role: "Managing Director",
    org: "",
    code: "R-07",
  },
];

export function Recommendations() {
  const isMobile = useIsMobile();
  return (
    <section id="recs" aria-labelledby="recs-title" style={{ padding: isMobile ? `${space.xl}px ${space.md}px` : `${space.xxl}px`, maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: space.lg }}>
        <FileTag>{sectionTag("recs")}</FileTag>
        <StencilTitle id="recs-title" size={96}>RECOMMENDATIONS</StencilTitle>
      </div>
      <SectionRule label="SAMPLE" code={`${QUOTES.length.toString().padStart(2, "0")} QUOTES`} />
      <ul
        role="list"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginTop: space.xl,
          display: "grid",
          // The target is the readable 45–75 character band, and a fixed
          // two-track grid only hit it at the width it was checked at. Two
          // `1fr` columns split whatever they are given, so the measure fell
          // as the viewport narrowed rather than the column count doing it:
          // 56 characters at 1280px (as intended), but 42 at 1024px and 30 at
          // 800px — narrower than the 45 floor, a quote broken over six stubby
          // lines. Below the breakpoint the opposite failed: `1fr` gave the
          // card the full content width, reaching 75 characters by 768px.
          // auto-fit with a 470px floor makes the column count the thing that
          // responds — it drops to one track until two can each still carry a
          // real line — and the 560px cap stops that single track from running
          // long. The floor is derived, not picked: 470px is the narrowest
          // card whose 16px display quote still clears 45 characters.
          // The cap is the other half of that arithmetic. An auto-fit track
          // takes its MAX wherever there is room, so the cap — not the floor —
          // decides when a second column appears: two tracks need
          // 2 × cap + the 34px gap of content width. At 560px that lands at
          // 1154px, inside the 1170px content box of a 1280px desktop, so the
          // canonical desktop width keeps the two-column wall it has today
          // (now at 55 characters). A larger cap quietly loses it — 620px
          // pushes the second column out to a 1384px viewport and leaves 1280
          // as a single tall stack.
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(470px, 560px))",
          justifyContent: "center",
          // Below the breakpoint the floor would overflow a 375px screen, so
          // the same cap goes on the list instead of the track. It never binds
          // on a phone; it catches the 560–768px band, where `1fr` alone had
          // stretched the quote to 75 characters.
          maxWidth: isMobile ? 560 : undefined,
          marginInline: isMobile ? "auto" : undefined,
          gap: isMobile ? space.lg : space.xl,
        }}
      >
        {/* Real <ul>/<li> semantics, as the press wall already uses: assistive
            tech announces "list, 7 items" instead of a run of anonymous
            articles, and the count matches the "07 QUOTES" rule above. The
            explicit role="list" above is what makes that true in Safari —
            WebKit drops list semantics from a list-style: none <ul>. */}
        {QUOTES.map((q) => (
          <li key={q.code} style={{ display: "flex" }}>
            <QuoteCard {...q} />
          </li>
        ))}
      </ul>
    </section>
  );
}
