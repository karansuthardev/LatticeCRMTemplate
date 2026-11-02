"use client";

import React from "react";
import { motion, type Transition } from "motion/react";

// 8 active slots across 2 rows (Row 1: 3 slots, Row 2: 5 slots) cycling all 15 brands
const row1Sequences = [
  [LogoVeyra, LogoZentro, LogoAveniq],
  [LogoKintaro, LogoCaligo, LogoCorvex],
  [LogoNuvora, LogoRovik, LogoLumora],
];

const row2Sequences = [
  [LogoTandemly, LogoElvora, LogoVeyra],
  [LogoObliq, LogoTessera, LogoKintaro],
  [LogoMeridian, LogoBrinex, LogoNuvora],
  [LogoZentro, LogoAveniq, LogoTandemly],
  [LogoCaligo, LogoCorvex, LogoObliq],
];

// Helper to generate keyframe arrays for 3 sequential logo slots in a 100% timeline
function getSlotAnimation(slotIndex: number, numSlots = 3) {
  const opacity: number[] = [];
  const y: number[] = [];
  const scale: number[] = [];
  const filter: string[] = [];
  const times: number[] = [];

  for (let i = 0; i < numSlots; i++) {
    const isCurrent = i === slotIndex;
    const startT = i / numSlots;
    const holdT = startT + (1 / numSlots) * 0.76;
    const exitT = startT + (1 / numSlots) * 0.94;

    times.push(startT, holdT, exitT);
    opacity.push(isCurrent ? 1 : 0, isCurrent ? 1 : 0, 0);
    y.push(isCurrent ? 0 : 4, isCurrent ? 0 : 4, 4);
    scale.push(isCurrent ? 1 : 0.95, isCurrent ? 1 : 0.95, 0.95);
    filter.push(
      isCurrent ? "blur(0px)" : "blur(8px)",
      isCurrent ? "blur(0px)" : "blur(8px)",
      "blur(8px)",
    );
  }

  // Close loop back to 1.0 time
  times.push(1);
  const isFirstSlot = slotIndex === 0;
  opacity.push(isFirstSlot ? 1 : 0);
  y.push(isFirstSlot ? 0 : 4);
  scale.push(isFirstSlot ? 1 : 0.95);
  filter.push(isFirstSlot ? "blur(0px)" : "blur(8px)");

  return { opacity, y, scale, filter, times };
}

export default function BrandLogoGrid() {
  const transition: Transition = {
    duration: 20,
    ease: "linear",
    repeat: Infinity,
  };

  // Row-by-row cascade: Row 1 finishes its stagger first, then Row 2 starts sequentially
  const STAGGER_STEP = 0.45;
  const ROW1_TOTAL_SLOTS = 3;

  return (
    <div className="flex w-full flex-col divide-y divide-zinc-200 border-b border-zinc-200">
      {/* ── Row 1: "Trusted by 40+ brands." (Cols 1-2) + 3 Logo Slots (Cols 3-5) ── */}
      <div className="grid w-full grid-cols-5 divide-x divide-zinc-200">
        <div className="col-span-2 flex h-20 items-center justify-center px-6 bg-zinc-100 text-center">
          <p className="text-base text-zinc-800">
            Trusted by 40+ brands.
          </p>
        </div>

        {row1Sequences.map((sequence, colIndex) => (
          <div
            key={`row1-${colIndex}`}
            className="group relative col-span-1 flex h-20 w-full items-center justify-center overflow-hidden cursor-pointer"
          >
            {sequence.map((LogoComponent, slotIndex) => {
              const anim = getSlotAnimation(slotIndex, sequence.length);

              return (
                <motion.div
                  key={slotIndex}
                  animate={{
                    opacity: anim.opacity,
                    y: anim.y,
                    scale: anim.scale,
                    filter: anim.filter,
                  }}
                  transition={{
                    ...transition,
                    times: anim.times,
                    delay: colIndex * STAGGER_STEP,
                  }}
                  className="absolute inset-0 m-auto h-fit w-fit opacity-0"
                >
                  <div className="grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                    <LogoComponent />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Row 2: 5 Logo Slots (Starts only after Row 1 finishes) ── */}
      <div className="grid w-full grid-cols-5 divide-x divide-zinc-200">
        {row2Sequences.map((sequence, colIndex) => (
          <div
            key={`row2-${colIndex}`}
            className="group relative col-span-1 flex h-20 w-full items-center justify-center overflow-hidden cursor-pointer"
          >
            {sequence.map((LogoComponent, slotIndex) => {
              const anim = getSlotAnimation(slotIndex, sequence.length);

              return (
                <motion.div
                  key={slotIndex}
                  animate={{
                    opacity: anim.opacity,
                    y: anim.y,
                    scale: anim.scale,
                    filter: anim.filter,
                  }}
                  transition={{
                    ...transition,
                    times: anim.times,
                    delay: ROW1_TOTAL_SLOTS * STAGGER_STEP + colIndex * STAGGER_STEP,
                  }}
                  className="absolute inset-0 m-auto h-fit w-fit opacity-0"
                >
                  <div className="grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                    <LogoComponent />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 1. Veyra (AI / Data) — Sharp, geometric mark ──────────────────────────────
function LogoVeyra() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Veyra"
    >
      <g id="logomark">
        <path d="M14 2L26 8L14 14L2 8L14 2Z" fill="#3B82F6" />
        <path d="M2 8L14 14V28L2 22V8Z" fill="#1D4ED8" />
        <path d="M14 14L26 8V22L14 28V14Z" fill="#2563EB" />
        <path d="M14 14L20 11L14 21L8 11L14 14Z" fill="#60A5FA" opacity="0.8" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Veyra
      </text>
    </svg>
  );
}

// ── 2. Kintaro (Developer Tools) — Compact, technical symbol ───────────────────
function LogoKintaro() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="142"
      height="32"
      viewBox="0 0 142 32"
      fill="none"
      aria-label="Kintaro"
    >
      <g id="logomark">
        <rect x="2" y="3" width="24" height="24" rx="6" fill="#EA580C" />
        <path
          d="M10 10L6 15L10 20"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 10L22 15L18 20"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9L13 21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Kintaro
      </text>
    </svg>
  );
}

// ── 3. Nuvora (Cloud Infrastructure) — Layered, abstract mark ─────────────────
function LogoNuvora() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="142"
      height="32"
      viewBox="0 0 142 32"
      fill="none"
      aria-label="Nuvora"
    >
      <g id="logomark">
        <path
          d="M6 8C6 6.34315 7.34315 5 9 5H21C22.6569 5 24 6.34315 24 8C24 9.65685 22.6569 11 21 11H9C7.34315 11 6 9.65685 6 8Z"
          fill="#818CF8"
        />
        <path
          d="M3 15C3 13.3431 4.34315 12 6 12H24C25.6569 12 27 13.3431 27 15C27 16.6569 25.6569 18 24 18H6C4.34315 18 3 16.6569 3 15Z"
          fill="#6366F1"
        />
        <path
          d="M8 22C8 20.3431 9.34315 19 11 19H19C20.6569 19 22 20.3431 22 22C22 23.6569 20.6569 25 19 25H11C9.34315 25 8 23.6569 8 22Z"
          fill="#4338CA"
        />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Nuvora
      </text>
    </svg>
  );
}

// ── 4. Tandemly (Collaboration SaaS) — Interlocking shapes ────────────────────
function LogoTandemly() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="155"
      height="32"
      viewBox="0 0 155 32"
      fill="none"
      aria-label="Tandemly"
    >
      <g id="logomark">
        <path
          d="M10 6C6.68629 6 4 8.68629 4 12V18C4 21.3137 6.68629 24 10 24C13.3137 24 16 21.3137 16 18V12C16 8.68629 13.3137 6 10 6Z"
          stroke="#10B981"
          strokeWidth="3.2"
          fill="none"
        />
        <path
          d="M18 6C14.6863 6 12 8.68629 12 12V18C12 21.3137 14.6863 24 18 24C21.3137 24 24 21.3137 24 18V12C24 8.68629 21.3137 6 18 6Z"
          stroke="#059669"
          strokeWidth="3.2"
          fill="none"
        />
        <circle cx="14" cy="15" r="2" fill="#047857" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Tandemly
      </text>
    </svg>
  );
}

// ── 5. Obliq (Cybersecurity) — Angular, asymmetric symbol ─────────────────────
function LogoObliq() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="32"
      viewBox="0 0 130 32"
      fill="none"
      aria-label="Obliq"
    >
      <g id="logomark">
        <path
          d="M14 2L26 8V18C26 23.5 19 28 14 30C14 30 14 2 14 2Z"
          fill="#E11D48"
        />
        <path
          d="M14 2L2 8V18C2 23.5 9 28 14 30C14 30 14 2 14 2Z"
          fill="#9F1239"
        />
        <path
          d="M7 6L21 24"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Obliq
      </text>
    </svg>
  );
}

// ── 6. Meridian (Fintech) — Precise, structured geometry ──────────────────────
function LogoMeridian() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="32"
      viewBox="0 0 150 32"
      fill="none"
      aria-label="Meridian"
    >
      <g id="logomark">
        <circle
          cx="14"
          cy="15"
          r="11"
          stroke="#0284C7"
          strokeWidth="2.5"
          fill="none"
        />
        <ellipse
          cx="14"
          cy="15"
          rx="5.5"
          ry="11"
          stroke="#0369A1"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="14"
          y1="4"
          x2="14"
          y2="26"
          stroke="#0284C7"
          strokeWidth="2"
        />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Meridian
      </text>
    </svg>
  );
}

// ── 7. Zentro (Business Intelligence) — Radiant analytical focal prism ────────
function LogoZentro() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Zentro"
    >
      <g id="logomark">
        <path d="M4 6H24L10 18H24V24H4L18 12H4V6Z" fill="#7C3AED" />
        <circle cx="21" cy="9" r="2.5" fill="#C4B5FD" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Zentro
      </text>
    </svg>
  );
}

// ── 8. Caligo (Privacy Technology) — Cryptographic cipher vault ───────────────
function LogoCaligo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Caligo"
    >
      <g id="logomark">
        <rect
          x="3"
          y="4"
          width="22"
          height="22"
          rx="5"
          stroke="#0D9488"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M8 15C8 11.5 11 9 14 9C17 9 20 11.5 20 15C20 18.5 17 21 14 21C11 21 8 18.5 8 15Z"
          fill="#14B8A6"
          opacity="0.3"
        />
        <circle cx="14" cy="15" r="3" fill="#0D9488" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Caligo
      </text>
    </svg>
  );
}

// ── 9. Rovik (Fintech) — Intersecting dynamic upward wealth delta ─────────────
function LogoRovik() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Rovik"
    >
      <g id="logomark">
        <path d="M4 24L14 7L24 24H18L14 16L10 24H4Z" fill="#D97706" />
        <path d="M11 24L14 19L17 24H11Z" fill="#F59E0B" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Rovik
      </text>
    </svg>
  );
}

// ── 10. Elvora (HR Technology) — Organic flourishing team petal nexus ─────────
function LogoElvora() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Elvora"
    >
      <g id="logomark">
        <circle cx="14" cy="9" r="5" fill="#F43F5E" />
        <circle cx="8" cy="20" r="5" fill="#FB7185" />
        <circle cx="20" cy="20" r="5" fill="#E11D48" />
        <circle cx="14" cy="16.5" r="2.2" fill="white" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Elvora
      </text>
    </svg>
  );
}

// ── 11. Tessera (Data Management) — Isometric mosaic block array ──────────────
function LogoTessera() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="145"
      height="32"
      viewBox="0 0 145 32"
      fill="none"
      aria-label="Tessera"
    >
      <g id="logomark">
        <rect x="3" y="4" width="9" height="9" rx="2.5" fill="#0891B2" />
        <rect x="15" y="4" width="9" height="9" rx="2.5" fill="#06B6D4" />
        <rect x="3" y="16" width="9" height="9" rx="2.5" fill="#0E7490" />
        <rect x="15" y="16" width="9" height="9" rx="2.5" fill="#22D3EE" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Tessera
      </text>
    </svg>
  );
}

// ── 12. Brinex (Logistics Technology) — Convergent directional route vectors ──
function LogoBrinex() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="135"
      height="32"
      viewBox="0 0 135 32"
      fill="none"
      aria-label="Brinex"
    >
      <g id="logomark">
        <path
          d="M4 15L14 4L24 15L14 26L4 15Z"
          stroke="#2563EB"
          strokeWidth="2.5"
          fill="none"
        />
        <path d="M14 9V21M9 15H19" stroke="#60A5FA" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Brinex
      </text>
    </svg>
  );
}

// ── 13. Aveniq (Workflow Automation) — Infinite algorithmic mobius pipeline ───
function LogoAveniq() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="32"
      viewBox="0 0 140 32"
      fill="none"
      aria-label="Aveniq"
    >
      <g id="logomark">
        <path
          d="M8 11C5 11 3 13 3 15.5C3 18 5 20 8 20C12 20 15 11 19 11C22 11 24 13 24 15.5C24 18 22 20 19 20C15 20 12 11 8 11Z"
          stroke="#C026D3"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="8" cy="15.5" r="1.8" fill="#E879F9" />
        <circle cx="19" cy="15.5" r="1.8" fill="#E879F9" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Aveniq
      </text>
    </svg>
  );
}

// ── 14. Corvex (Network Infrastructure) — Distributed mesh node topology ───────
function LogoCorvex() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="32"
      viewBox="0 0 140 32"
      fill="none"
      aria-label="Corvex"
    >
      <g id="logomark">
        <path
          d="M14 4L24 10V21L14 27L4 21V10L14 4Z"
          stroke="#475569"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="14" cy="15.5" r="3" fill="#0EA5E9" />
        <line x1="14" y1="4" x2="14" y2="12.5" stroke="#0EA5E9" strokeWidth="1.5" />
        <line x1="4" y1="21" x2="11.5" y2="17" stroke="#0EA5E9" strokeWidth="1.5" />
        <line x1="24" y1="21" x2="16.5" y2="17" stroke="#0EA5E9" strokeWidth="1.5" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Corvex
      </text>
    </svg>
  );
}

// ── 15. Lumora (Marketing Technology) — Multifaceted luminous prism beacon ────
function LogoLumora() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="145"
      height="32"
      viewBox="0 0 145 32"
      fill="none"
      aria-label="Lumora"
    >
      <g id="logomark">
        <path d="M14 2L17.5 11.5L27 15L17.5 18.5L14 28L10.5 18.5L1 15L10.5 11.5L14 2Z" fill="#F59E0B" />
        <path d="M14 7L16 13L22 15L16 17L14 23L12 17L6 15L12 13L14 7Z" fill="#FDE68A" />
      </g>
      <text
        x="36"
        y="22"
        fill="#27272a"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        fontSize="19"
        fontWeight="600"
        letterSpacing="-0.03em"
      >
        Lumora
      </text>
    </svg>
  );
}
