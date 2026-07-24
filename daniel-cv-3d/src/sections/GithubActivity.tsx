"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  ArrowUpRight,
  Chevrons,
  DataStat,
  FileTag,
  SectionRule,
  StencilTitle,
  colors,
  fonts,
  gradients,
  space,
} from "@/assets";

type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { sha: string; message: string }[];
    ref?: string;
    ref_type?: string;
    action?: string;
  };
};

type Stats = {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
};

const USER = "DanielTea";

// Curated baseline shown when the live GitHub numbers can't be trusted (see the
// rate-limit note in the effect below). Never render a zero we don't believe —
// on a CV, "0 Public Repos / 0 Stars" reads as an empty profile, not an outage.
const FALLBACK_STATS: Stats = {
  publicRepos: 77,
  followers: 17,
  following: 20,
  totalStars: 50,
};

// The live commit stream renders raw commit-message text from GitHub, which can
// carry emoji (🚀, ✅, 🤖 …). Strip emoji/pictographs so none render on the CV,
// then tidy the whitespace they leave behind.
const EMOJI_RE =
  /[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2300}-\u{23FF}\u{2122}\u{2139}\u{203C}\u{2049}\u{20E3}\u{FE00}-\u{FE0F}\u{200D}]/gu;

function stripEmoji(s: string): string {
  return s.replace(EMOJI_RE, "").replace(/\s{2,}/g, " ").trim();
}

export function GithubActivity() {
  const [events, setEvents] = useState<GhEvent[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartKey, setChartKey] = useState<number>(0);
  const [chartFailed, setChartFailed] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setChartKey(Date.now());

    (async () => {
      try {
        const [uRes, rRes, eRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`),
        ]);
        // Unauthenticated api.github.com allows only 60 requests/hour per IP, and
        // answers over-limit requests with HTTP 403 + a JSON *error* body — that
        // resolves, it doesn't throw, so the catch below never sees it. Gate on
        // res.ok (and the expected shape) or a rate-limited visitor gets 0/0/0/0.
        const u = uRes.ok ? await uRes.json() : null;
        const r = rRes.ok ? await rRes.json() : null;
        const e = eRes.ok ? await eRes.json() : null;

        // Only overwrite the curated baseline with numbers we actually received.
        const gotUser = u && typeof u.public_repos === "number";
        const totalStars = Array.isArray(r)
          ? r.reduce((s: number, repo: { stargazers_count?: number }) => s + (repo.stargazers_count ?? 0), 0)
          : null;
        setStats(
          gotUser
            ? {
                publicRepos: u.public_repos,
                followers: u.followers ?? FALLBACK_STATS.followers,
                following: u.following ?? FALLBACK_STATS.following,
                totalStars: totalStars ?? FALLBACK_STATS.totalStars,
              }
            : FALLBACK_STATS
        );
        setEvents(Array.isArray(e) ? e.slice(0, 8) : []);
      } catch {
        setStats(FALLBACK_STATS);
        setEvents([]);
      }
    })();

    const blink = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(blink);
  }, []);

  const liveEntries = (events ?? []).flatMap((ev): { when: string; repo: string; line: string }[] => {
    const when = new Date(ev.created_at).toISOString().replace("T", " ").slice(0, 19);
    if (ev.type === "PushEvent" && ev.payload.commits?.length) {
      return ev.payload.commits.slice(0, 1).map((c) => ({
        when,
        repo: ev.repo.name,
        line: `${c.sha.slice(0, 7)}  ${stripEmoji(c.message.split("\n")[0])}`,
      }));
    }
    if (ev.type === "CreateEvent") {
      return [{ when, repo: ev.repo.name, line: `create ${ev.payload.ref_type ?? ""} ${ev.payload.ref ?? ""}`.trim() }];
    }
    if (ev.type === "WatchEvent") {
      return [{ when, repo: ev.repo.name, line: "starred" }];
    }
    if (ev.type === "PullRequestEvent") {
      return [{ when, repo: ev.repo.name, line: `pr ${ev.payload.action ?? "event"}` }];
    }
    return [];
  });

  return (
    <section id="github" style={{ padding: isMobile ? `${space.xl}px ${space.md}px` : `${space.xxl}px`, maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: space.lg, gap: space.md, flexWrap: "wrap" }}>
        <div>
          <FileTag>SEC_06 / GITHUB TELEMETRY</FileTag>
          <StencilTitle size={96} underscore>BUILD_LOG</StencilTitle>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: space.sm }}>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.orange,
              opacity: pulse ? 1 : 0.25,
              transition: "opacity 120ms linear",
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            Live · @{USER}
          </span>
        </div>
      </div>

      <SectionRule label="STATS" code="GITHUB.COM/API/V3" />

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          border: `1px solid ${colors.ink}`,
          marginTop: space.md,
        }}
      >
        {[
          { k: "Public Repos", v: stats ? stats.publicRepos : "—" },
          { k: "Stars Earned", v: stats ? stats.totalStars : "—" },
          { k: "Followers", v: stats ? stats.followers : "—" },
          { k: "Following", v: stats ? stats.following : "—" },
        ].map((s, i) => (
          <div
            key={s.k}
            style={{
              padding: isMobile ? `${space.md}px` : `${space.lg}px`,
              borderRight: isMobile
                ? i % 2 === 0
                  ? `1px solid ${colors.ink}`
                  : undefined
                : i < 3
                  ? `1px solid ${colors.ink}`
                  : undefined,
              borderTop: isMobile && i >= 2 ? `1px solid ${colors.ink}` : undefined,
            }}
          >
            <DataStat value={s.v} label={s.k} size={isMobile ? "md" : "lg"} />
          </div>
        ))}
      </div>

      {/* Heatmap + live commits */}
      <div
        style={{
          marginTop: space.lg,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: space.lg,
          alignItems: "stretch",
        }}
      >
        {/* Contribution heatmap card */}
        <div
          style={{
            border: `1px solid ${colors.ink}`,
            padding: `${space.md}px ${space.lg}px ${space.lg}px`,
            background: colors.paper,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: space.sm,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.inkMute,
              }}
            >
              // CONTRIBUTION MATRIX · 52W
            </span>
            <Chevrons count={3} size={12} />
          </div>
          {chartKey !== 0 && !chartFailed ? (
            // Aspect-ratio box reserves the chart's footprint while it loads,
            // so the card doesn't collapse and re-expand on slow connections.
            <div style={{ aspectRatio: "722 / 112", mixBlendMode: "multiply" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/141518/${USER}?c=${chartKey}`}
                alt="GitHub contribution heatmap"
                onError={() => setChartFailed(true)}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          ) : (
            // Pre-mount placeholder / offline fallback: gradient field at the
            // chart's aspect ratio so the card never shows a broken image.
            <div
              style={{
                aspectRatio: "722 / 112",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${gradients.mesh}, ${colors.paperDim}`,
                border: `1px dashed ${colors.grid}`,
              }}
            >
              {chartFailed ? (
                <a
                  href={`https://github.com/${USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: colors.inkSoft,
                    textDecoration: "none",
                    padding: space.sm,
                    textAlign: "center",
                  }}
                >
                  ＞ matrix feed offline · view on github.com/{USER}{" "}
                  <ArrowUpRight />
                  <span className="dt-sr-only"> (opens in new tab)</span>
                </a>
              ) : (
                <span
                  aria-hidden
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: colors.inkMute,
                  }}
                >
                  ＞ syncing matrix …
                </span>
              )}
            </div>
          )}
          <div
            style={{
              marginTop: space.sm,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            <span>52 weeks</span>
            <span>ghchart.rshah.org</span>
            <span>@{USER}</span>
          </div>
        </div>

        {/* Live commits feed */}
        <div
          style={{
            border: `1px solid ${colors.ink}`,
            background: colors.ink,
            color: colors.paper,
            padding: `${space.md}px`,
            display: "flex",
            flexDirection: "column",
            minHeight: 220,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: space.sm,
              paddingBottom: space.sm,
              borderBottom: `1px dashed ${colors.paperDim}`,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              // LIVE COMMIT STREAM
            </span>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: "0.2em",
                color: colors.orange,
              }}
            >
              ● REC
            </span>
          </div>

          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              lineHeight: 1.55,
              display: "flex",
              flexDirection: "column",
              gap: space.xs,
              overflow: "hidden",
            }}
          >
            {events === null && (
              <span style={{ color: colors.inkMute }}>
                ＞ connecting to github.com/api/v3 …
              </span>
            )}
            {events && liveEntries.length === 0 && (
              <span style={{ color: colors.paperDim }}>
                ＞ no recent public events — private org work only.
              </span>
            )}
            {liveEntries.map((e, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: space.sm }}>
                <span style={{ color: colors.orange }}>{e.when.slice(5, 16)}</span>
                <span style={{ color: colors.paper }}>
                  <span style={{ color: colors.paperDim }}>{e.repo}</span>{" "}
                  <span style={{ color: colors.paper }}>{e.line}</span>
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: space.sm,
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: colors.paperDim,
            }}
          >
            SOURCE · GITHUB EVENTS API · POLL ON LOAD
          </div>
        </div>
      </div>
    </section>
  );
}
