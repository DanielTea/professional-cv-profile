"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  Chevrons,
  DataStat,
  FileTag,
  SectionRule,
  StencilTitle,
  colors,
  fonts,
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

export function GithubActivity() {
  const [events, setEvents] = useState<GhEvent[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [chartKey, setChartKey] = useState<number>(0);
  const [pulse, setPulse] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    setChartKey(Date.now());

    (async () => {
      try {
        const [u, r, e] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`).then((x) => x.json()),
          fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`).then((x) => x.json()),
        ]);
        const totalStars = Array.isArray(r)
          ? r.reduce((s: number, repo: { stargazers_count?: number }) => s + (repo.stargazers_count ?? 0), 0)
          : 0;
        setStats({
          publicRepos: u?.public_repos ?? 0,
          followers: u?.followers ?? 0,
          following: u?.following ?? 0,
          totalStars,
        });
        setEvents(Array.isArray(e) ? e.slice(0, 8) : []);
      } catch {
        setStats({ publicRepos: 77, followers: 17, following: 20, totalStars: 50 });
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
        line: `${c.sha.slice(0, 7)}  ${c.message.split("\n")[0]}`,
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
    <section id="github" style={{ padding: isMobile ? "40px 16px" : "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
        <div>
          <FileTag>SEC_06 / GITHUB TELEMETRY</FileTag>
          <StencilTitle size={96} underscore>BUILD_LOG</StencilTitle>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          marginTop: 16,
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
              padding: isMobile ? "14px 16px" : "18px 22px",
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
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* Contribution heatmap card */}
        <div
          style={{
            border: `1px solid ${colors.ink}`,
            padding: "16px 18px 18px",
            background: colors.paper,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
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
          <div style={{ mixBlendMode: "multiply" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={chartKey}
              src={`https://ghchart.rshah.org/141518/${USER}?c=${chartKey}`}
              alt="GitHub contribution heatmap"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div
            style={{
              marginTop: 10,
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
            padding: "14px 16px",
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
              marginBottom: 10,
              paddingBottom: 8,
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
              gap: 6,
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
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10 }}>
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
              paddingTop: 10,
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
