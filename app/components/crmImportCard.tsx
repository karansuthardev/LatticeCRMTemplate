"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CursorIcon, FolderIcon, CheckIcon } from "../icons";

// ── CRM Brand Definitions ───────────────────────────────────────────────────

export interface CrmBrand {
  id: string;
  name: string;
  recordsCount: number;
  recordsLabel: string;
  renderIcon: () => React.ReactNode;
}

const CRM_BRANDS: CrmBrand[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    recordsCount: 38420,
    recordsLabel: "38,420 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-[#00A1E0]">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.61.1 2.78 1.49 2.78 3.1 0 1.73-1.41 2.86-3 2.86z" />
      </svg>
    ),
  },
  {
    id: "hubspot",
    name: "HubSpot",
    recordsCount: 24650,
    recordsLabel: "24,650 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-[#FF7A59]">
        <path d="M17.4 8.8V6.2a2.2 2.2 0 1 0-1.7 0v2.6a5.2 5.2 0 0 0-2.9 1.5L7.7 7.2a2.3 2.3 0 1 0-1.1 1.3l5 3a5.2 5.2 0 0 0-.2 1.5c0 .6.1 1.1.3 1.6l-2.4 1.4a2 2 0 1 0 .9 1.4l2.5-1.5a5.2 5.2 0 1 0 4.7-9.1zm-.8-3.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM5.5 8.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4.1 10.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm7-4.6a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z" />
      </svg>
    ),
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    recordsCount: 18910,
    recordsLabel: "18,910 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0">
        <circle cx="12" cy="12" r="11" fill="#00B341" />
        <path
          d="M9 7h3.8a3.5 3.5 0 0 1 0 7H11v3.5H9V7zm2 2v3h1.8a1.5 1.5 0 0 0 0-3H11z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    recordsCount: 14280,
    recordsLabel: "14,280 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="#E42527" />
        <rect x="13" y="3" width="8" height="8" rx="2" fill="#009A44" />
        <rect x="3" y="13" width="8" height="8" rx="2" fill="#0077C8" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="#F8B133" />
      </svg>
    ),
  },
  {
    id: "zendesk",
    name: "Zendesk",
    recordsCount: 29800,
    recordsLabel: "29,800 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-[#03363D]">
        <path d="M12 4.5l-8 8h8v-8zm0 15l8-8h-8v8zm-8 0a4 4 0 0 1 4-4h4v4H4zm16-15a4 4 0 0 1-4 4h-4v-4h8z" />
      </svg>
    ),
  },
  {
    id: "attio",
    name: "Attio",
    recordsCount: 11540,
    recordsLabel: "11,540 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-zinc-900">
        <path d="M12 3L3 18h5l4-7 4 7h5L12 3zm0 6.5l2 3.5h-4l2-3.5z" />
      </svg>
    ),
  },
  {
    id: "close",
    name: "Close",
    recordsCount: 8760,
    recordsLabel: "8,760 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-zinc-900">
        <circle cx="12" cy="12" r="10" fill="#18181B" />
        <path
          d="M8 12.5l2.5 2.5L16 9.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: "notion",
    name: "Notion",
    recordsCount: 16350,
    recordsLabel: "16,350 records",
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-zinc-900">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.458-.699c.513 0 .42-.373.187-.606L16.48 1.83C15.827 1.224 15.08 1 14.1 1.047L3.153 1.84c-.606.046-.7.42-.466.746l1.772 1.622zm.98 3.545v13.62c0 .886.466 1.213 1.586 1.12l13.137-.793c1.026-.047 1.213-.607 1.213-1.447V6.82c0-.746-.373-1.073-1.12-1.027l-13.603.84c-.84.047-1.213.373-1.213 1.12zm12.316.513c.093.374 0 .747-.373.793l-.84.14v10.31c-.42.233-.886.373-1.353.373-.7 0-1.026-.233-1.632-1.026l-4.527-7.045v6.999l1.4.28c.047.373-.186.746-.56.746H6.792c-.093-.373 0-.746.374-.793l.933-.14V9.615l-1.306-.094c-.047-.373.187-.746.56-.746h3.498l4.807 7.278V9.475l-1.166-.233c-.047-.373.187-.746.56-.746h3.298z" />
      </svg>
    ),
  },
];

// Long repeat track for seamless continuous forward scroll
const TOTAL_TRACK_ITEMS = 80;
const CAROUSEL_ITEMS = Array.from({ length: TOTAL_TRACK_ITEMS }).map(
  (_, i) => CRM_BRANDS[i % CRM_BRANDS.length],
);

const CARD_WIDTH = 132;
const CARD_GAP = 10;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP; // 142px

type AnimationPhase =
  | "SCROLL_TO_TARGET"
  | "AT_TARGET"
  | "CURSOR_APPROACH"
  | "DRAGGING"
  | "DROPPED"
  | "PROCESSING"
  | "SUCCESS";

export default function CrmImportCard() {
  const [containerWidth, setContainerWidth] = useState<number>(480);

  // Target item index along the track (starts around middle of track for bidirectional movement)
  const [targetIndex, setTargetIndex] = useState<number>(36);
  const [phase, setPhase] = useState<AnimationPhase>("SCROLL_TO_TARGET");

  // Track position offset
  const [trackOffset, setTrackOffset] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 280,
    y: 160,
  });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [processedPercent, setProcessedPercent] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const currentBrand = CAROUSEL_ITEMS[targetIndex] || CRM_BRANDS[0];

  // Helper to compute center offset for any card index
  const getOffsetForIndex = (index: number, width: number) => {
    return width / 2 - (index * CARD_STRIDE + CARD_WIDTH / 2);
  };

  // Measure container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setContainerWidth(w);
        setTrackOffset(getOffsetForIndex(targetIndex, w));
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Main animation state machine
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "SCROLL_TO_TARGET") {
      setProcessedPercent(0);
      setIsClicking(false);

      // Smoothly ease out to the already-decided target card
      const finalOffset = getOffsetForIndex(targetIndex, containerWidth);
      setTrackOffset(finalOffset);

      // Slower, more deliberate scroll deceleration
      timer = setTimeout(() => {
        setPhase("AT_TARGET");
      }, 1900);
    } else if (phase === "AT_TARGET") {
      // Pause at the target card so user registers it before cursor starts moving in
      timer = setTimeout(() => {
        setPhase("CURSOR_APPROACH");
      }, 700);
    } else if (phase === "CURSOR_APPROACH") {
      const startCardX = (containerWidth - CARD_WIDTH) / 2;
      const startCardY = (carouselRef.current?.offsetTop ?? 0) + 4;

      setCursorPos({ x: startCardX + CARD_WIDTH / 2, y: startCardY + 16 });

      // Cursor moves toward card and hovers, then clicks after a gentle beat
      timer = setTimeout(() => {
        setIsClicking(true); // Grab card
        setPhase("DRAGGING");
      }, 1000);
    } else if (phase === "DRAGGING") {
      const dropCardX = (containerWidth - CARD_WIDTH) / 2;
      const dropCardY =
        (dropRef.current?.offsetTop ?? 120) +
        ((dropRef.current?.offsetHeight ?? 175) - 42) / 2 +
        14;

      setCursorPos({ x: dropCardX + CARD_WIDTH / 2, y: dropCardY + 16 });

      timer = setTimeout(() => {
        setIsClicking(false);
        setPhase("DROPPED");
      }, 1250);
    } else if (phase === "DROPPED") {
      // Card lands in window, pause before processing begins
      timer = setTimeout(() => {
        setPhase("PROCESSING");
      }, 550);
    } else if (phase === "PROCESSING") {
      // Ensure progress bar explicitly starts from 0%
      setProcessedPercent(0);

      // Realistic, steady progress increments extended by 500ms
      const p1 = setTimeout(() => setProcessedPercent(35), 500);
      const p2 = setTimeout(() => setProcessedPercent(70), 1250);
      const p3 = setTimeout(() => setProcessedPercent(100), 2050);

      timer = setTimeout(() => {
        setPhase("SUCCESS");
      }, 2500);

      return () => {
        clearTimeout(timer);
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(p3);
      };
    } else if (phase === "SUCCESS") {
      // Let success state breathe for 2.8s, then pick next target in either direction (left-to-right or right-to-left)
      timer = setTimeout(() => {
        // Random distance: 2 to 4 cards
        const distance = Math.floor(Math.random() * 3) + 2;
        // 50% chance forward (right-to-left visual scroll), 50% chance backward (left-to-right visual scroll)
        const direction = Math.random() > 0.5 ? 1 : -1;
        let nextIndex = targetIndex + distance * direction;

        // Keep target safely within the central track zone [12, TOTAL_TRACK_ITEMS - 12]
        if (nextIndex >= TOTAL_TRACK_ITEMS - 12) {
          nextIndex = targetIndex - distance;
        } else if (nextIndex <= 12) {
          nextIndex = targetIndex + distance;
        }

        setTargetIndex(nextIndex);
        setPhase("SCROLL_TO_TARGET");
      }, 2800);
    }

    return () => clearTimeout(timer);
  }, [phase, targetIndex, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-zinc-100 p-6 select-none"
    >
      {/* ── Card Header ────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between">
        <h3 className="text-lg font-medium text-zinc-800">
          Switch to Lattice, hassle-free.
        </h3>
      </div>

      {/* ── Main Showcase Area ─────────────────────────────────────────── */}
      <div className="relative mt-4 flex flex-1 flex-col justify-between gap-4">
        {/* 1. Carousel Track with Pre-decided Target & Ease-Out Scroll */}
        <div
          ref={carouselRef}
          className="relative w-full shrink-0 overflow-hidden py-1"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex items-center gap-2.5"
            animate={{ x: trackOffset }}
            transition={{
              x: {
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1], // Gentle, natural easeOut curve
              },
            }}
          >
            {CAROUSEL_ITEMS.map((brand, idx) => {
              const isTargetCard = idx === targetIndex;
              // Only highlight when the cursor has arrived and is hovering over the card
              const isCursorHovering =
                isTargetCard && phase === "CURSOR_APPROACH";

              return (
                <div
                  key={`${brand.id}-${idx}`}
                  style={{ width: `${CARD_WIDTH}px` }}
                  className={`relative shrink-0 opacity-100 transition-all duration-300 ${
                    isCursorHovering ? "scale-[1.02]" : "scale-100"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all duration-300 ${
                      isCursorHovering
                        ? "border-zinc-400 bg-zinc-50 shadow-xs"
                        : "border-zinc-200 bg-zinc-50"
                    }`}
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 p-1">
                      {brand.renderIcon()}
                    </div>
                    <span className="truncate text-xs font-medium text-zinc-800">
                      {brand.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 2. Dragged Card Clone Attached to Cursor */}
        <AnimatePresence>
          {phase === "DRAGGING" && (
            <motion.div
              initial={{
                x: (containerWidth - CARD_WIDTH) / 2,
                y: (carouselRef.current?.offsetTop ?? 0) + 4,
                scale: 1.02,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: (containerWidth - CARD_WIDTH) / 2,
                y:
                  (dropRef.current?.offsetTop ?? 120) +
                  ((dropRef.current?.offsetHeight ?? 175) - 42) / 2 +
                  14,
                scale: 1.03,
                rotate: -2,
                opacity: 1,
              }}
              exit={{
                scale: 0.45,
                opacity: 0,
                filter: "blur(2px)",
                transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] },
              }}
              transition={{
                x: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.3 },
                rotate: { duration: 0.35 },
                opacity: { duration: 0.25 },
              }}
              style={{ width: `${CARD_WIDTH}px` }}
              className="pointer-events-none absolute z-40 drop-shadow-md"
            >
              <div className="flex items-center gap-2 rounded-xl border border-zinc-400 bg-zinc-50 px-3 py-2 shadow-xs">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 p-1">
                  {currentBrand.renderIcon()}
                </div>
                <span className="truncate text-xs font-medium text-zinc-800">
                  {currentBrand.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Lower Section: Lattice Import Window */}
        <div
          ref={dropRef}
          className={`relative flex min-h-[175px] w-full flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 transition-shadow duration-300 ${
            phase === "DRAGGING" ? "shadow-md" : "shadow-xs"
          }`}
        >
          {/* Window Title Bar */}
          <header className="relative flex shrink-0 items-center justify-center border-b border-zinc-200/80 bg-zinc-100 px-4 py-2">
            <div className="absolute left-3.5 flex flex-row gap-1">
              <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500" />
              <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500" />
              <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500" />
            </div>

            <p className="text-xs font-medium text-zinc-800">
              Import to Lattice
            </p>
          </header>

          {/* Window Body (Drop Area) */}
          <div className="relative flex flex-1 flex-col items-center justify-center p-5 text-center">
            <AnimatePresence mode="wait">
              {/* Phase: DEFAULT / READY / DRAGGING */}
              {(phase === "SCROLL_TO_TARGET" ||
                phase === "AT_TARGET" ||
                phase === "CURSOR_APPROACH" ||
                phase === "DRAGGING" ||
                phase === "DROPPED") && (
                <motion.div
                  key="drop-idle"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.05,
                      },
                    },
                    exit: {
                      opacity: 0,
                      filter: "blur(6px)",
                      y: -6,
                      transition: { duration: 0.25, ease: "easeIn" },
                    },
                  }}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex size-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-100 text-zinc-500"
                  >
                    <FolderIcon width={20} height={20} strokeWidth={1.5} />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span className="text-sm font-medium text-zinc-700">
                      {phase === "DRAGGING"
                        ? `Release to import into Lattice`
                        : "Drop CRM source into Lattice"}
                    </span>
                    <span className="text-xs text-zinc-400">
                      Auto-maps contacts, deals & pipelines
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Phase: PROCESSING */}
              {phase === "PROCESSING" && (
                <motion.div
                  key="processing"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.05,
                      },
                    },
                    exit: {
                      opacity: 0,
                      filter: "blur(6px)",
                      y: -6,
                      transition: { duration: 0.25, ease: "easeIn" },
                    },
                  }}
                  className="flex w-full flex-col items-center justify-center gap-3 py-1"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-1 shadow-2xs">
                      {currentBrand.renderIcon()}
                    </div>
                    <span className="text-sm font-medium text-zinc-800">
                      Importing {currentBrand.name} into Lattice...
                    </span>
                  </motion.div>

                  {/* Progress bar */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="relative h-1.5 w-52 overflow-hidden rounded-full bg-zinc-100"
                  >
                    <motion.div
                      className="h-full rounded-full bg-zinc-800"
                      initial={{ width: "0%" }}
                      animate={{ width: `${processedPercent}%` }}
                      transition={{ ease: "easeInOut", duration: 0.45 }}
                    />
                  </motion.div>

                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="text-xs font-normal text-zinc-400"
                  >
                    Parsing {currentBrand.recordsLabel}...
                  </motion.span>
                </motion.div>
              )}

              {/* Phase: SUCCESS */}
              {phase === "SUCCESS" && (
                <motion.div
                  key="success"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.09,
                        delayChildren: 0.05,
                      },
                    },
                    exit: {
                      opacity: 0,
                      filter: "blur(6px)",
                      y: -6,
                      transition: { duration: 0.25, ease: "easeIn" },
                    },
                  }}
                  className="flex w-full flex-col items-center justify-center gap-2.5 py-1"
                >
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 12,
                        filter: "blur(4px)",
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        scale: 1,
                        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-zinc-800 shadow-2xs"
                  >
                    <CheckIcon
                      width={20}
                      height={20}
                      strokeWidth={1.5}
                      animate
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span className="text-base font-medium text-zinc-800">
                      Data imported
                    </span>
                    <span className="text-xs font-normal text-zinc-500">
                      {currentBrand.recordsLabel} synced to Lattice
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Autonomous Cursor Icon */}
        <motion.div
          className="pointer-events-none absolute z-50 text-zinc-900 drop-shadow-md"
          animate={{
            x: cursorPos.x,
            y: cursorPos.y,
            opacity:
              phase === "CURSOR_APPROACH" || phase === "DRAGGING" ? 1 : 0,
            scale: isClicking ? 0.85 : 1,
          }}
          transition={{
            x: {
              duration: phase === "DRAGGING" ? 1.15 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: phase === "DRAGGING" ? 1.15 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: { duration: 0.25 },
            scale: { duration: 0.18 },
          }}
        >
          <CursorIcon width={22} height={22} fill="white" stroke="#18181b" />
        </motion.div>
      </div>
    </div>
  );
}
