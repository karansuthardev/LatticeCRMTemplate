"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, easeOut } from "motion/react";
import { AIIcon, CursorIcon } from "./icons";
import SlotNumber from "./components/slotNumber";

// ── Types & Data ──────────────────────────────────────────────────────────────

export interface PipelineStageData {
  id: string;
  step: string;
  name: string;
  clients: number;
  conversion: string | null;
  lost: number | null;
  avgDuration: string;
  benchmark: string;
  durationStatus: "Optimal" | "Bottleneck" | "Slow";
  isTopDrop?: boolean;
  isBottleneck?: boolean;
  isWon?: boolean;
  dropOffRate?: string;
  nextStageName?: string;
  topLossReasons: { reason: string; share: number }[];
  diagnosis: string;
  solution: string;
  segmentImpact: string;
}

const STAGES: PipelineStageData[] = [
  {
    id: "new-leads",
    step: "01",
    name: "New leads",
    clients: 1248,
    conversion: null,
    lost: null,
    avgDuration: "2.4 days",
    benchmark: "2.0d target",
    durationStatus: "Optimal",
    nextStageName: "Contacted",
    dropOffRate: "25.0%",
    topLossReasons: [
      { reason: "No response", share: 48 },
      { reason: "Invalid contact details", share: 29 },
      { reason: "Not a fit", share: 23 },
    ],
    diagnosis:
      "Outreach response decays sharply after 24 hours. Lead enrichment lacks upfront domain deliverability verification.",
    solution:
      "Trigger automated multi-channel sequences within 15 minutes of form fill and integrate real-time email verification.",
    segmentImpact:
      "Startups have highest bounce rate (34%) due to unverified mailboxes.",
  },
  {
    id: "contacted",
    step: "02",
    name: "Contacted",
    clients: 936,
    conversion: "75.0%",
    lost: 312,
    avgDuration: "4.8 days",
    benchmark: "3.5d target",
    durationStatus: "Slow",
    nextStageName: "Discovery call",
    dropOffRate: "37.6%",
    topLossReasons: [
      { reason: "No response after outreach", share: 42 },
      { reason: "Not interested", share: 34 },
      { reason: "No budget", share: 24 },
    ],
    diagnosis:
      "Outreach follow-up relies on generic agency feature pitches rather than quantifiable client benchmarks.",
    solution:
      "Tailor outreach sequences by vertical with 2 relevant case studies and an interactive ROI estimation calculator.",
    segmentImpact:
      "E-commerce leads drop fast without immediate seasonal proof points.",
  },
  {
    id: "discovery",
    step: "03",
    name: "Discovery call",
    clients: 584,
    conversion: "62.4%",
    lost: 352,
    avgDuration: "3.2 days",
    benchmark: "3.0d target",
    durationStatus: "Optimal",
    isTopDrop: true,
    nextStageName: "Proposal sent",
    dropOffRate: "44.2%",
    topLossReasons: [
      { reason: "Budget mismatch", share: 36 },
      { reason: "Project not prioritized", share: 33 },
      { reason: "Chose another agency", share: 31 },
    ],
    diagnosis:
      "Single largest drop-off in the pipeline. Discovery calls conclude without mutual budget alignment, causing sticker shock when proposals land.",
    solution:
      "Introduce a pre-qualification budget checkpoint before discovery booking, and frame deliverables in modular milestone tiers.",
    segmentImpact:
      "SaaS mid-market leads drop most when pricing is not anchored early.",
  },
  {
    id: "proposal",
    step: "04",
    name: "Proposal sent",
    clients: 326,
    conversion: "55.8%",
    lost: 258,
    avgDuration: "8.6 days",
    benchmark: "4.0d target",
    durationStatus: "Bottleneck",
    isBottleneck: true,
    nextStageName: "Negotiation",
    dropOffRate: "43.6%",
    topLossReasons: [
      { reason: "Proposal too expensive", share: 39 },
      { reason: "Competitor selected", share: 35 },
      { reason: "Scope mismatch", share: 26 },
    ],
    diagnosis:
      "Turnaround time from discovery to proposal averages 8.6 days, giving competitors leeway to pitch and sign first.",
    solution:
      "Compress proposal generation to under 48 hours using pre-built scope libraries and automated price calculator models.",
    segmentImpact:
      "Competitors close 35% of lost deals due to faster proposal turnaround.",
  },
  {
    id: "negotiation",
    step: "05",
    name: "Negotiation",
    clients: 184,
    conversion: "56.4%",
    lost: 142,
    avgDuration: "11.3 days",
    benchmark: "6.0d target",
    durationStatus: "Bottleneck",
    isBottleneck: true,
    nextStageName: "Closed won",
    dropOffRate: "47.8%",
    topLossReasons: [
      { reason: "Lost to competitor", share: 41 },
      { reason: "Contract terms", share: 32 },
      { reason: "Project cancelled", share: 27 },
    ],
    diagnosis:
      "Negotiations drag for 11.3 days primarily around custom legal redlines and rigid payment milestone terms.",
    solution:
      "Provide pre-approved standard mutual MSAs and offer a 7-day fast-track incentive for standard terms sign-off.",
    segmentImpact:
      "Enterprise deals stall on procurement terms; self-serve terms cut lag by 6 days.",
  },
  {
    id: "closed-won",
    step: "06",
    name: "Closed won",
    clients: 96,
    conversion: "52.2%",
    lost: 88,
    avgDuration: "Final",
    benchmark: "28d total cycle",
    durationStatus: "Optimal",
    isWon: true,
    dropOffRate: "00.0",
    topLossReasons: [{ reason: "Target cohort completed", share: 100 }],
    diagnosis:
      "96 closed deals won out of 1,248 starting cohort leads (7.7% end-to-end win rate). Deals won faster had 3.4x higher contract value.",
    solution:
      "Focus sales capacity on Professional Services and qualified SaaS tiers, which showed 2.1x higher conversion retention.",
    segmentImpact:
      "Professional services delivered highest cohort retention at 20.2% win rate.",
  },
];

// Exact positions matched to latest layout:
// 1. New leads: Top left (x: 95, y: 70)
// 2. Contacted: Lower mid-left (x: 275, y: 220) [Selected by default]
// 3. Discovery call: Upper mid-left (x: 445, y: 70)
// 4. Proposal sent: Low right-center (x: 560, y: 500)
// 5. Negotiation: Mid right (x: 660, y: 250)
// 6. Closed won: Top right (x: 825, y: 65)
const INITIAL_POSITIONS: Record<string, { x: number; y: number }> = {
  "new-leads": { x: 50, y: 50 },
  contacted: { x: 275, y: 200 },
  discovery: { x: 500, y: 50 },
  proposal: { x: 725, y: 500 },
  negotiation: { x: 850, y: 250 },
  "closed-won": { x: 1050, y: 50 },
};

function buildCurvedConnectorPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Single unified, continuous control offset with zero branch jumps:
  // Smoothly scales with distance while guaranteeing a stable 45px tangent clearance at both pins
  const offset = Math.max(Math.abs(dx) * 0.4 + Math.abs(dy) * 0.15, 45);

  const cp1x = x1 + offset;
  const cp2x = x2 - offset;

  // If cards are horizontally aligned at the exact same height and dragged backwards (dx < 0),
  // smoothly provide gentle vertical clearance so the loop doesn't collapse into a flat line.
  // When dx >= 0, vLift is strictly 0. At dx = 0, vLift is 0 with a continuous derivative.
  const vFactor = Math.max(0, -dx) * Math.max(0, 1 - Math.abs(dy) / 60);
  const vLift = Math.min(vFactor * 0.35, 60);

  const cp1y = y1 - vLift;
  const cp2y = y2 - vLift;

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
}

function getInitialConnector(idx: number) {
  const stage1 = STAGES[idx];
  const stage2 = STAGES[idx + 1];
  const pos1 = INITIAL_POSITIONS[stage1.id];
  const pos2 = INITIAL_POSITIONS[stage2.id];

  // Exact pin centers: card width (185px) and pin center height (top-11 + 6px = 50px)
  const x1 = pos1.x + 185;
  const y1 = pos1.y + 50;
  const x2 = pos2.x;
  const y2 = pos2.y + 50;

  const pathD = buildCurvedConnectorPath(x1, y1, x2, y2);

  return {
    d: pathD,
    x1,
    y1,
    x2,
    y2,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PipelineSection() {
  const [selectedStageId, setSelectedStageId] = useState<string>("contacted");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [positions, setPositions] =
    useState<Record<string, { x: number; y: number }>>(INITIAL_POSITIONS);
  const [activeDraggingId, setActiveDraggingId] = useState<string | null>(null);

  const currentPositionsRef = useRef<Record<string, { x: number; y: number }>>({
    ...INITIAL_POSITIONS,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const inputPinRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const outputPinRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const pathRefs = useRef<Record<number, SVGPathElement | null>>({});
  const glowRefs = useRef<Record<number, SVGPathElement | null>>({});
  const startNodeRefs = useRef<Record<number, SVGCircleElement | null>>({});
  const endNodeRefs = useRef<Record<number, SVGCircleElement | null>>({});

  const dragStateRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    startCardX: number;
    startCardY: number;
    pointerId: number;
    hasMoved: boolean;
  } | null>(null);

  const selectedStage =
    STAGES.find((s) => s.id === selectedStageId) ?? STAGES[0];

  // ── Ultra-responsive Live SVG Connector Updater ───────────────────────────
  const updateConnectingLines = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();

    for (let i = 0; i < STAGES.length - 1; i++) {
      const stage1 = STAGES[i];
      const stage2 = STAGES[i + 1];

      const pin1 = outputPinRefs.current[stage1.id];
      const pin2 = inputPinRefs.current[stage2.id];
      const card1 = cardRefs.current[stage1.id];
      const card2 = cardRefs.current[stage2.id];

      if (!card1 || !card2) continue;

      let x1: number;
      let y1: number;
      let x2: number;
      let y2: number;

      if (pin1 && pin2) {
        const p1 = pin1.getBoundingClientRect();
        const p2 = pin2.getBoundingClientRect();
        x1 = p1.left + p1.width / 2 - canvasRect.left;
        y1 = p1.top + p1.height / 2 - canvasRect.top;
        x2 = p2.left + p2.width / 2 - canvasRect.left;
        y2 = p2.top + p2.height / 2 - canvasRect.top;
      } else {
        const r1 = card1.getBoundingClientRect();
        const r2 = card2.getBoundingClientRect();
        x1 = r1.right - canvasRect.left;
        y1 = r1.top + 44 - canvasRect.top;
        x2 = r2.left - canvasRect.left;
        y2 = r2.top + 44 - canvasRect.top;
      }

      const pathD = buildCurvedConnectorPath(x1, y1, x2, y2);

      pathRefs.current[i]?.setAttribute("d", pathD);
      glowRefs.current[i]?.setAttribute("d", pathD);
      startNodeRefs.current[i]?.setAttribute("cx", String(x1));
      startNodeRefs.current[i]?.setAttribute("cy", String(y1));
      endNodeRefs.current[i]?.setAttribute("cx", String(x2));
      endNodeRefs.current[i]?.setAttribute("cy", String(y2));
    }
  }, []);

  // ── Drag & Drop Event Handlers (Direct DOM tracking for 120fps sync) ─────
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    registerUserInteraction();

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("[data-no-drag]")) {
      return;
    }

    const cardEl = cardRefs.current[id];
    if (!cardEl || !canvasRef.current) return;

    try {
      cardEl.setPointerCapture(e.pointerId);
    } catch {}

    const curPos = currentPositionsRef.current[id] ?? INITIAL_POSITIONS[id];

    dragStateRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      startCardX: curPos.x,
      startCardY: curPos.y,
      pointerId: e.pointerId,
      hasMoved: false,
    };

    setActiveDraggingId(id);
    setSelectedStageId(id);
  };

  const handlePointerMove = (id: string, e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    if (!drag || drag.id !== id) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.hasMoved && Math.hypot(dx, dy) > 3) {
      drag.hasMoved = true;
    }

    if (!drag.hasMoved) return;

    const canvas = canvasRef.current;
    const cardEl = cardRefs.current[id];
    if (!canvas || !cardEl) return;

    const canvasW = canvas.clientWidth;
    const canvasH = canvas.clientHeight;
    const cardW = cardEl.offsetWidth;
    const cardH = cardEl.offsetHeight;

    const minX = 8;
    const maxX = Math.max(minX, canvasW - cardW - 8);
    const minY = 8;
    const maxY = Math.max(minY, canvasH - cardH - 8);

    const clampedX = Math.max(minX, Math.min(maxX, drag.startCardX + dx));
    const clampedY = Math.max(minY, Math.min(maxY, drag.startCardY + dy));

    cardEl.style.left = `${clampedX}px`;
    cardEl.style.top = `${clampedY}px`;
    currentPositionsRef.current[id] = { x: clampedX, y: clampedY };

    // Update lines synchronously in the exact same event
    updateConnectingLines();
  };

  const handlePointerUp = (id: string, e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    if (!drag || drag.id !== id) return;

    const cardEl = cardRefs.current[id];
    if (cardEl) {
      try {
        cardEl.releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (drag.hasMoved) {
      const finalPos = currentPositionsRef.current[id] || {
        x: drag.startCardX,
        y: drag.startCardY,
      };
      setPositions((prev) => ({
        ...prev,
        [id]: finalPos,
      }));
    }

    // Always ensure selected stage is set to this card
    setSelectedStageId(id);

    dragStateRef.current = null;
    setActiveDraggingId(null);
    updateConnectingLines();
  };

  // ── Auto-Guided Illustration Cursor State ────────────────────────────────
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorPos, setCursorPos] = useState({
    x: INITIAL_POSITIONS["contacted"].x + 92,
    y: INITIAL_POSITIONS["contacted"].y + 40,
  });
  const [isClicking, setIsClicking] = useState(false);

  const isUserInteractingRef = useRef(false);
  const userInactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoLoopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(
    Math.max(0, STAGES.findIndex((s) => s.id === "contacted"))
  );

  // Notify any user interaction: pause auto cursor & reset 30s resumption timer
  const registerUserInteraction = useCallback(() => {
    isUserInteractingRef.current = true;
    setCursorVisible(false);
    setIsClicking(false);

    if (autoLoopTimerRef.current) {
      clearTimeout(autoLoopTimerRef.current);
      autoLoopTimerRef.current = null;
    }

    if (userInactivityTimerRef.current) {
      clearTimeout(userInactivityTimerRef.current);
    }

    // Resume illustration cursor 30 seconds after last user interaction
    userInactivityTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      setCursorVisible(true);
    }, 30000);
  }, []);

  // Update currentIndexRef whenever user picks a stage so auto-cursor resumes from where left off
  useEffect(() => {
    const idx = STAGES.findIndex((s) => s.id === selectedStageId);
    if (idx !== -1) {
      currentIndexRef.current = idx;
    }
  }, [selectedStageId]);

  // Main autonomous illustration animation loop
  useEffect(() => {
    if (!cursorVisible) return;

    let isCancelled = false;

    const scheduleNextStep = () => {
      if (isCancelled || isUserInteractingRef.current) return;

      // Advance to next stage in cycle
      const nextIndex = (currentIndexRef.current + 1) % STAGES.length;
      currentIndexRef.current = nextIndex;
      const nextStage = STAGES[nextIndex];
      const targetCardPos =
        currentPositionsRef.current[nextStage.id] ?? INITIAL_POSITIONS[nextStage.id];

      // Move cursor to center of target stage card
      setCursorPos({
        x: targetCardPos.x + 92,
        y: targetCardPos.y + 40,
      });

      // After gliding across (1.2s), trigger click action
      autoLoopTimerRef.current = setTimeout(() => {
        if (isCancelled || isUserInteractingRef.current) return;

        setIsClicking(true);
        setSelectedStageId(nextStage.id);

        // Release click visual after 220ms
        autoLoopTimerRef.current = setTimeout(() => {
          if (isCancelled || isUserInteractingRef.current) return;
          setIsClicking(false);

          // Rest at card for 2.6s before navigating to next card
          autoLoopTimerRef.current = setTimeout(() => {
            scheduleNextStep();
          }, 2600);
        }, 220);
      }, 1200);
    };

    // Initial trigger
    autoLoopTimerRef.current = setTimeout(scheduleNextStep, 1500);

    return () => {
      isCancelled = true;
      if (autoLoopTimerRef.current) {
        clearTimeout(autoLoopTimerRef.current);
      }
    };
  }, [cursorVisible]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (userInactivityTimerRef.current) clearTimeout(userInactivityTimerRef.current);
      if (autoLoopTimerRef.current) clearTimeout(autoLoopTimerRef.current);
    };
  }, []);

  // Initial layout and container resize observer
  useEffect(() => {
    updateConnectingLines();
    const timer = setTimeout(updateConnectingLines, 60);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      updateConnectingLines();
    });
    ro.observe(canvas);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [updateConnectingLines]);

  return (
    <section className="mb-32 w-full border-b border-zinc-200">
      {/* ── Section Header & Canvas Controls ──────────────────────── */}
      <div className="mx-auto mt-12 mb-10 flex w-fit flex-col gap-6 ">
        <div className="flex flex-col items-center justify-between gap-px">
          <h2 className="text-5xl font-medium tracking-tight leading-[1] text-zinc-800">
            Pipeline<span className="italic font-medium text-orange-600"> Intelligence.</span> 
          </h2>
          <p className="text-md mt-4 text-center font-medium tracking-wide text-zinc-500 ">
            Improve sales conversions with an intelligent pipeline that 
            identifies bottlenecks and missed opportunities.
          </p>
        </div>
      </div>

      {/* ── Full Width Interactive Canvas Container (No window wrapper) ──── */}
      <div className="relative w-full border-y border-zinc-200 bg-zinc-100/50">
        {/* Subtle Canvas Info Strip */}

        {/* Full width canvas surface */}
        <div className="relative w-full scrollbar-none overflow-x-auto">
          <div
            ref={canvasRef}
            className="relative h-[720px] w-full min-w-[1240px] overflow-hidden bg-zinc-50/70 p-4 select-none"
            style={{
              backgroundImage: `radial-gradient(var(--color-zinc-300) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            {/* ── Dynamic Geometric SVG Connector Lines ───────────── */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ zIndex: 1 }}
            >
              {STAGES.map((stage, idx) => {
                if (idx === STAGES.length - 1) return null;
                const nextStage = STAGES[idx + 1];
                const initialPath = getInitialConnector(idx);
                const isConnectedToSelected =
                  stage.id === selectedStageId ||
                  nextStage.id === selectedStageId;

                return (
                  <g key={`${stage.id}-to-${nextStage.id}`}>
                    {/* Connecting line path: orange when connected to selected card, neutral zinc otherwise */}
                    <path
                      ref={(el) => {
                        glowRefs.current[idx] = el;
                      }}
                      d={initialPath.d}
                      fill="none"
                      stroke={
                        isConnectedToSelected
                          ? "var(--color-orange-500)"
                          : "var(--color-zinc-300)"
                      }
                      strokeWidth={isConnectedToSelected ? "2" : "1.5"}
                      strokeLinecap="round"
                      className="transition-colors duration-200"
                    />

                    {/* Start node circle */}
                    <circle
                      ref={(el) => {
                        startNodeRefs.current[idx] = el;
                      }}
                      cx={initialPath.x1}
                      cy={initialPath.y1}
                      r={isConnectedToSelected ? "3.5" : "3"}
                      fill={
                        isConnectedToSelected
                          ? "var(--color-orange-500)"
                          : "var(--color-zinc-400)"
                      }
                      className="transition-colors duration-200"
                    />

                    {/* End node circle */}
                    <circle
                      ref={(el) => {
                        endNodeRefs.current[idx] = el;
                      }}
                      cx={initialPath.x2}
                      cy={initialPath.y2}
                      r={isConnectedToSelected ? "3.5" : "3"}
                      fill={
                        isConnectedToSelected
                          ? "var(--color-orange-500)"
                          : "var(--color-zinc-400)"
                      }
                      className="transition-colors duration-200"
                    />
                  </g>
                );
              })}
            </svg>

            {/* ── Draggable Stage Cards ───────────────────────────── */}
            {STAGES.map((stage, idx) => {
              const pos = positions[stage.id] ?? INITIAL_POSITIONS[stage.id];
              const isSelected = selectedStageId === stage.id;
              const isHovered = hoveredCardId === stage.id;
              const isDragging = activeDraggingId === stage.id;
              const isIncomingConnected =
                idx > 0 &&
                (stage.id === selectedStageId ||
                  STAGES[idx - 1]?.id === selectedStageId);
              const isOutgoingConnected =
                idx < STAGES.length - 1 &&
                (stage.id === selectedStageId ||
                  STAGES[idx + 1]?.id === selectedStageId);

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    cardRefs.current[stage.id] = el;
                  }}
                  onPointerDown={(e) => handlePointerDown(stage.id, e)}
                  onPointerMove={(e) => handlePointerMove(stage.id, e)}
                  onPointerUp={(e) => handlePointerUp(stage.id, e)}
                  onPointerCancel={(e) => handlePointerUp(stage.id, e)}
                  onMouseEnter={() => setHoveredCardId(stage.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    width: 185,
                    touchAction: "none",
                    zIndex: isDragging
                      ? 35
                      : isSelected
                        ? 30
                        : isHovered
                          ? 25
                          : 10,
                  }}
                  className={`group relative cursor-grab rounded-2xl border border-zinc-200 bg-zinc-100 transition-shadow select-none active:cursor-grabbing ${
                    isSelected || isHovered ? "shadow-lg" : "shadow-md"
                  } ${isDragging ? "cursor-grabbing shadow-2xl" : ""}`}
                >
                  {/* Dedicated Outline Container */}
                  {idx === 0 ? (
                    <div
                      className={`pointer-events-none absolute -inset-[4px] rounded-[20px] border-2 transition-colors duration-200 ${
                        isSelected ? "border-orange-500" : "border-blue-800"
                      }`}
                    />
                  ) : idx === STAGES.length - 1 ? (
                    <div
                      className={`pointer-events-none absolute -inset-[4px] rounded-[20px] border-2 transition-colors duration-200 ${
                        isSelected ? "border-orange-500" : "border-green-700"
                      }`}
                    />
                  ) : (
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          key="selected-outline"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: easeOut }}
                          className="pointer-events-none absolute -inset-[4px] rounded-[20px] border-2 border-orange-500"
                        />
                      )}
                    </AnimatePresence>
                  )}
                  
                  {/* Left Connection Port (Incoming) */}
                  {idx > 0 && (
                    <div
                      ref={(el) => {
                        inputPinRefs.current[stage.id] = el;
                      }}
                      className={`pointer-events-none absolute top-11 -left-1.5 h-3 w-3 rounded-full shadow-xs transition-colors ${
                        isIncomingConnected
                          ? "border border-orange-300 bg-orange-50"
                          : "border border-zinc-300 bg-zinc-100"
                      }`}
                      title="Incoming stage connector"
                    />
                  )}

                  {/* Right Connection Port (Outgoing) */}
                  {idx < STAGES.length - 1 && (
                    <div
                      ref={(el) => {
                        outputPinRefs.current[stage.id] = el;
                      }}
                      className={`pointer-events-none absolute top-11 -right-1.5 h-3 w-3 rounded-full shadow-xs transition-colors ${
                        isOutgoingConnected
                          ? "border border-orange-300 bg-orange-50"
                          : "border border-zinc-300 bg-zinc-100"
                      }`}
                      title="Outgoing stage connector"
                    />
                  )}

                  {/* Card Header */}
                  <div className="flex items-center p-4 justify-between border-b border-zinc-200/80 pb-2">
                    <span className="text-xs font-medium text-zinc-800">
                      {stage.name}
                    </span>
                  </div>

                  {/* Client Count & Compact Metrics */}
                  <div className="flex flex-col p-4 gap-1">
                    <div className="flex items-baseline justify-start gap-2">
                      <span className="text-2xl font-medium tracking-tight text-zinc-800">
                        {stage.clients.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-600">clients</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs text-zinc-600">
                      <span>Avg cycle</span>
                      <span className="font-medium text-zinc-800">
                        {stage.avgDuration}
                      </span>
                    </div>

                    {stage.conversion && (
                      <div className="flex items-center justify-between text-xs text-zinc-600">
                        <span>Conv. rate</span>
                        <span className="font-medium text-zinc-800">
                          {stage.conversion}
                        </span>
                      </div>
                    )}

                    {stage.lost !== null && (
                      <div className="flex items-center justify-between text-xs text-zinc-600">
                        <span>Drop-off</span>
                        <span className="font-medium text-zinc-800">
                          -{stage.lost}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ── Auto-Guided Illustration Cursor ─────────────────── */}
            <motion.div
              className="pointer-events-none absolute z-50 text-zinc-900 drop-shadow-md"
              animate={{
                x: cursorPos.x,
                y: cursorPos.y,
                opacity: cursorVisible ? 1 : 0,
                scale: isClicking ? 0.88 : 1,
              }}
              transition={{
                x: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
                y: { duration: 1.15, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.3, ease: easeOut },
                scale: { duration: 0.16, ease: easeOut },
              }}
            >
              <CursorIcon width={22} height={22} fill="white" stroke="#18181b" />
            </motion.div>
          </div>

          {/* ── Static Bottom-Left Stage Intelligence Details Card ────────── */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-40 w-160 max-w-[calc(100%-32px)]">
            <div className="pointer-events-auto overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100 shadow-xl backdrop-blur-md">
              {/* Header with Stage Tab Switcher */}
              <div className="flex items-center gap-1 border-b border-zinc-200 bg-zinc-100/90 p-2 overflow-x-auto scrollbar-none">
                {STAGES.map((stage) => {
                  const isTabSelected = selectedStageId === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => {
                        registerUserInteraction();
                        setSelectedStageId(stage.id);
                      }}
                      className={`relative flex items-center justify-center rounded-lg px-2.5 py-2 text-xs font-medium transition-colors select-none whitespace-nowrap cursor-pointer ${
                        isTabSelected
                          ? "text-zinc-800"
                          : "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-200/50"
                      }`}
                    >
                      {isTabSelected && (
                        <motion.div
                          layoutId="active-stage-tab"
                          className="absolute inset-0 rounded-lg bg-white shadow-xs border border-zinc-200/80"
                          initial={{ scaleX: 1 }}
                          animate={{ scaleX: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.28,
                            ease: easeOut,
                          }}
                        />
                      )}
                      <span className="relative z-10">{stage.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Body: Split into 2 columns - Left: Stats, Right: AI root cause & recommended solution */}
              <div className="p-4 text-xs">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Left Column: Stats */}
                  <div className="flex flex-col gap-2">
                    {/* 1. Stage Conversion & AVG Duration: Two individual horizontal containers */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1 rounded-xl border-zinc-200 border p-3">
                        <span className="text-xs text-zinc-600">
                          Stage conversion
                        </span>
                        <div className="h-[22px] flex items-center">
                          <SlotNumber
                            integerDigits={3}
                            decimalDigits={1}
                            value={selectedStage.conversion ?? "100.0%"}
                            className="text-sm font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 rounded-xl border-zinc-200 border p-3">
                        <span className="text-xs text-zinc-600">
                          AVG duration
                        </span>
                        <div className="h-[22px] flex items-center">
                          <SlotNumber
                            integerDigits={2}
                            decimalDigits={1}
                            value={selectedStage.avgDuration}
                            className="text-sm font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Lost at stage: Title with numbers, Bar, and Reasons with color swatch + percentage */}
                    <div className="flex flex-col gap-1 mt-2">
                      {/* Title: Lost at stage with numbers displayed after title */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-600">
                          Lost at stage
                        </span>
                        <div className="flex items-center gap-1 text-xs font-medium text-zinc-800">
                          <SlotNumber
                            integerDigits={3}
                            value={selectedStage.lost ?? 0}
                            className="text-xs font-medium text-zinc-800"
                          />
                          <span className="text-zinc-600">(</span>
                          <SlotNumber
                            integerDigits={2}
                            decimalDigits={1}
                            suffix="%"
                            value={selectedStage.dropOffRate?.replace("%", "") ?? "0.0"}
                            className="text-xs font-medium text-zinc-800"
                          />
                          <span className="text-zinc-600">)</span>
                          <span className="text-xs text-zinc-600 font-normal ml-0.5">clients</span>
                        </div>
                      </div>

                      {/* One single segmented bar */}
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-zinc-200">
                        {[
                          "bg-orange-500",
                          "bg-zinc-700",
                          "bg-zinc-400",
                          "bg-zinc-300",
                        ].map((color, idx) => {
                          const item = selectedStage.topLossReasons[idx];
                          const targetWidth = item ? item.share : 0;
                          return (
                            <motion.div
                              key={`segment-${idx}`}
                              animate={{
                                width: `${targetWidth}%`,
                                opacity: targetWidth > 0 ? 1 : 0,
                              }}
                              transition={{ duration: 0.35, ease: easeOut }}
                              className={`h-full shrink-0 ${color}`}
                              title={item ? `${item.reason}: ${item.share}%` : ""}
                            />
                          );
                        })}
                      </div>

                      {/* Below the bar: Title on left, square color indicator + percentage on right */}
                      <div className="flex flex-col gap-1.5 pt-2">
                        <AnimatePresence mode="popLayout" initial={false}>
                          {selectedStage.topLossReasons.map((item, idx) => {
                            const squareColors = [
                              "bg-orange-500",
                              "bg-zinc-700",
                              "bg-zinc-400",
                              "bg-zinc-300",
                            ];
                            const squareColor =
                              squareColors[idx % squareColors.length];

                            return (
                              <motion.div
                                key={`reason-row-${idx}`}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 2 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                exit={{
                                  opacity: 0,
                                  filter: "blur(4px)",
                                  y: -2,
                                  transition: { duration: 0.2, ease: easeOut },
                                }}
                                transition={{ duration: 0.25, ease: easeOut }}
                                className="flex items-center justify-between"
                              >
                                <div className="min-w-0 flex-1 pr-2">
                                  <AnimatePresence mode="wait">
                                    <motion.span
                                      key={`${selectedStage.id}-${item.reason}`}
                                      initial={{ opacity: 0, filter: "blur(3px)" }}
                                      animate={{
                                        opacity: 1,
                                        filter: "blur(0px)",
                                        transition: { duration: 0.2, ease: easeOut },
                                      }}
                                      exit={{
                                        opacity: 0,
                                        filter: "blur(3px)",
                                        transition: { duration: 0.15, ease: easeOut },
                                      }}
                                      className="block truncate text-xs font-normal text-zinc-800"
                                    >
                                      {item.reason}
                                    </motion.span>
                                  </AnimatePresence>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <SlotNumber
                                    integerDigits={3}
                                    suffix="%"
                                    value={item.share}
                                    className="text-xs font-medium text-zinc-800"
                                  />
                                  <span
                                    className={`h-2.5 w-2.5 shrink-0 rounded-[2px] ${squareColor}`}
                                  />
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: AI Root-Cause Diagnosis & Recommended Solution */}
                  <div className="flex flex-col gap-2.5">
                    {/* 3. AI Root-Cause Diagnosis */}
                    <div className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-2.5 ">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-800">
                        <span>Reason</span>
                        <AIIcon height={16} width={16} />
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={selectedStage.id}
                          initial={{ opacity: 0, filter: "blur(3px)" }}
                          animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: { duration: 0.2, ease: easeOut },
                          }}
                          exit={{
                            opacity: 0,
                            filter: "blur(3px)",
                            transition: { duration: 0.15, ease: easeOut },
                          }}
                          className="text-xs leading-relaxed font-normal text-zinc-600"
                        >
                          {selectedStage.diagnosis}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {/* 4. Strategic Business Solution */}
                    <div className="flex flex-col gap-1 rounded-xl border border-zinc-200  p-2.5 ">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-800">
                        <span>Recommended Solution</span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={selectedStage.id}
                          initial={{ opacity: 0, filter: "blur(3px)" }}
                          animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: { duration: 0.2, ease: easeOut },
                          }}
                          exit={{
                            opacity: 0,
                            filter: "blur(3px)",
                            transition: { duration: 0.15, ease: easeOut },
                          }}
                          className="text-xs leading-relaxed font-normal text-zinc-600"
                        >
                          {selectedStage.solution}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
