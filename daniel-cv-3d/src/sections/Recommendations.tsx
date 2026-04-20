"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { FileTag, QuoteCard, SectionRule, StencilTitle } from "@/assets";

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
    <section id="recs" style={{ padding: isMobile ? "40px 16px" : "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <FileTag>SEC_05 / PEER FEEDBACK</FileTag>
        <StencilTitle size={96}>RECOMMENDATIONS</StencilTitle>
      </div>
      <SectionRule label="SAMPLE" code={`${QUOTES.length.toString().padStart(2, "0")} QUOTES`} />
      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: isMobile ? 20 : 28,
        }}
      >
        {QUOTES.map((q) => (
          <QuoteCard key={q.code} {...q} />
        ))}
      </div>
    </section>
  );
}
