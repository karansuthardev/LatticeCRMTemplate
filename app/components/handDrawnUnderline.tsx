"use client";

import React, { useState, useEffect } from "react";

export interface HandDrawnUnderlineProps
  extends React.SVGProps<SVGSVGElement> {
  className?: string;
  seed?: number;
}

interface UnderlineStroke {
  path: string;
  strokeWidth: number;
  opacity: number;
}

interface UnderlineData {
  bigLine: UnderlineStroke;
  smallLine: UnderlineStroke;
}

// Pseudo-random generator using Mulberry32 algorithm
function createPrng(seed: number) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateUnderlinePaths(seed: number): UnderlineData {
  const rand = createPrng(seed);
  const totalWidth = 280;

  // ── 1. Bigger Line ──────────────────────────────────────────────────────────
  // Size: 90% to 100% of total width
  const bigRatio = 0.90 + rand() * 0.10;
  const bigWidth = totalWidth * bigRatio;
  const bigStartX = +(rand() * (totalWidth - bigWidth)).toFixed(1);
  const bigEndX = +(bigStartX + bigWidth).toFixed(1);

  // Exactly two endpoints (no third vertex)
  const bigStartY = +(7.5 + (rand() - 0.5) * 3).toFixed(1);
  const bigEndY = +(7.0 + (rand() - 0.5) * 3).toFixed(1);

  // Varying curve values between the two points
  const bigCp1X = +(bigStartX + bigWidth * (0.28 + rand() * 0.12)).toFixed(1);
  const bigCp1Y = +(bigStartY + (rand() - 0.5) * 7).toFixed(1);
  const bigCp2X = +(bigStartX + bigWidth * (0.60 + rand() * 0.12)).toFixed(1);
  const bigCp2Y = +(bigEndY + (rand() - 0.5) * 7).toFixed(1);

  const bigPath = `M${bigStartX} ${bigStartY}C${bigCp1X} ${bigCp1Y} ${bigCp2X} ${bigCp2Y} ${bigEndX} ${bigEndY}`;

  // Thickness: 1 to 1.5 (Tailwind value scale, mapped to stroke)
  const bigTailwindVal = 1.0 + rand() * 0.5;
  const bigStrokeWidth = +(bigTailwindVal * 2.4).toFixed(2);

  // Opacity: 50% to 100%
  const bigOpacity = +(0.50 + rand() * 0.50).toFixed(2);

  // ── 2. Smaller Line ─────────────────────────────────────────────────────────
  // Size: 70% to 100% of total width
  const smallRatio = 0.70 + rand() * 0.30;
  const smallWidth = totalWidth * smallRatio;
  const smallStartX = +(rand() * (totalWidth - smallWidth)).toFixed(1);
  const smallEndX = +(smallStartX + smallWidth).toFixed(1);

  // Exactly two endpoints (no third vertex)
  const smallStartY = +(13.0 + (rand() - 0.5) * 3).toFixed(1);
  const smallEndY = +(12.5 + (rand() - 0.5) * 3).toFixed(1);

  // Varying curve values between the two points
  const smallCp1X = +(smallStartX + smallWidth * (0.30 + rand() * 0.12)).toFixed(1);
  const smallCp1Y = +(smallStartY + (rand() - 0.5) * 7).toFixed(1);
  const smallCp2X = +(smallStartX + smallWidth * (0.62 + rand() * 0.12)).toFixed(1);
  const smallCp2Y = +(smallEndY + (rand() - 0.5) * 7).toFixed(1);

  const smallPath = `M${smallStartX} ${smallStartY}C${smallCp1X} ${smallCp1Y} ${smallCp2X} ${smallCp2Y} ${smallEndX} ${smallEndY}`;

  // Thickness: 0.5 to 1 (Tailwind value scale, mapped to stroke)
  const smallTailwindVal = 0.5 + rand() * 0.5;
  const smallStrokeWidth = +(smallTailwindVal * 2.4).toFixed(2);

  // Opacity: 50% to 100%
  const smallOpacity = +(0.50 + rand() * 0.50).toFixed(2);

  return {
    bigLine: {
      path: bigPath,
      strokeWidth: bigStrokeWidth,
      opacity: bigOpacity,
    },
    smallLine: {
      path: smallPath,
      strokeWidth: smallStrokeWidth,
      opacity: smallOpacity,
    },
  };
}

const DEFAULT_DATA: UnderlineData = generateUnderlinePaths(42);

export default function HandDrawnUnderline({
  className = "",
  seed,
  ...props
}: HandDrawnUnderlineProps) {
  const [data, setData] = useState<UnderlineData>(DEFAULT_DATA);

  useEffect(() => {
    // Generate randomized paths with time-based seed
    const activeSeed = seed ?? Date.now();
    setData(generateUnderlinePaths(activeSeed));
  }, [seed]);

  return (
    <svg
      viewBox="0 0 280 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Bigger Line */}
      <path
        d={data.bigLine.path}
        stroke="currentColor"
        strokeWidth={data.bigLine.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={data.bigLine.opacity}
      />

      {/* Smaller Line */}
      <path
        d={data.smallLine.path}
        stroke="currentColor"
        strokeWidth={data.smallLine.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={data.smallLine.opacity}
      />
    </svg>
  );
}
