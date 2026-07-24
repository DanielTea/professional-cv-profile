"use client";
import { useEffect, useRef } from "react";
import { colors, fonts, gradients } from "../tokens";

type Props = {
  label: string;
  value: number; // 0..100
  code?: string;
};

/** Technical capability meter — label, notched track, numeric level.
 *
 * The gradient fill sweeps up to its value the first time the meter scrolls
 * into view: the ink→ember→orange `meter` gradient reads as a level charging
 * to its mark, which is exactly what a capability bar means. It's handled
 * imperatively so the base render stays fully correct with no JS — SSR,
 * a failed hydration, or a browser without IntersectionObserver all paint the
 * meter at its true width immediately. The reveal is also skipped for anyone
 * who prefers reduced motion, and for meters already on screen at load (no
 * collapse-then-refill flash). Worst case is the current static behaviour.
 */
export function StatBar({ label, value, code }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) return;
    // Only animate meters that start below the fold — an on-screen meter is
    // left at its true width so it never flashes empty on load.
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    // Prime to empty without animating the collapse, then charge to value the
    // moment the meter enters the viewport.
    el.style.transition = "none";
    el.style.width = "0%";
    void el.offsetWidth; // force reflow so the reset isn't tweened
    el.style.transition = "width 900ms cubic-bezier(0.22, 1, 0.36, 1)";

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.style.width = `${clamped}%`;
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // Safety net: an instant anchor/programmatic jump can skip a below-fold
    // meter straight past the viewport without an intersection-threshold
    // crossing, which would leave it stuck empty. If any scroll lands the
    // meter at or above the fold, fill it regardless.
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight) reveal();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [clamped]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 60px", gap: 14, alignItems: "center" }}>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: colors.ink,
        }}
      >
        {label}
      </span>
      <div
        style={{
          position: "relative",
          height: 10,
          background: colors.paperDim,
          border: `1px solid ${colors.ink}`,
        }}
      >
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${clamped}%`,
            background: gradients.meter,
          }}
        />
        {/* notch marks every 10% */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(10% - 1px), ${colors.paper} calc(10% - 1px), ${colors.paper} 10%)`,
            mixBlendMode: "difference",
            opacity: 0.35,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          color: colors.inkMute,
          textAlign: "right",
        }}
      >
        {code ?? `${clamped.toString().padStart(3, "0")}`}
      </span>
    </div>
  );
}
