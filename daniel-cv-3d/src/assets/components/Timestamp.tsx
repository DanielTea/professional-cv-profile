"use client";
import { useEffect, useState } from "react";
import { colors, fonts } from "../tokens";

type Props = { label?: string };

/** Live UTC timestamp — small mono line for header/footer chrome. */
export function Timestamp({ label = "UTC" }: Props) {
  const [t, setT] = useState<string>(() => format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      suppressHydrationWarning
      style={{
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.2em",
        color: colors.inkMute,
      }}
    >
      {label} · {t}
    </span>
  );
}

function format(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}
