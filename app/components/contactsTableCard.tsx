"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Data types ────────────────────────────────────────────────────────────────

interface ContactRecord {
  company: {
    name: string;
    initial: string;
    color: string;
    bgColor: string;
  };
  contact: {
    name: string;
    initials?: string;
  } | null;
  email: string | null;
  status: "Lead" | "Customer" | "Prospect" | null;
  industry: string | null;
}

// The "filled" values that replace each dash
const filledData: {
  [companyName: string]: {
    contact?: { name: string; initials: string };
    email?: string;
    status?: "Lead" | "Customer" | "Prospect";
    industry?: string;
  };
} = {
  "Acme Inc.": {
    email: "sarah@acme.com",
    industry: "SaaS",
  },
  Northstar: {
    contact: { name: "James Liu", initials: "JL" },
    status: "Customer",
    industry: "FinTech",
  },
  "Linear Labs": {
    contact: { name: "Alex Kim", initials: "AK" },
    email: "alex@linearlabs.dev",
  },
  "Orbit Systems": {
    email: "maya@orbit.dev",
    status: "Customer",
  },
  "Vercel Labs": {
    contact: { name: "Daniel Wu", initials: "DW" },
    status: "Prospect",
    industry: "Cloud Infra",
  },
};

const tableData: ContactRecord[] = [
  {
    company: {
      name: "Acme Inc.",
      initial: "A",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
    },
    contact: { name: "Sarah Chen", initials: "SC" },
    email: null,
    status: "Lead",
    industry: null,
  },
  {
    company: {
      name: "Northstar",
      initial: "N",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    contact: null,
    email: "james@northstar.io",
    status: null,
    industry: null,
  },
  {
    company: {
      name: "Linear Labs",
      initial: "L",
      color: "text-violet-700",
      bgColor: "bg-violet-100",
    },
    contact: null,
    email: null,
    status: "Lead",
    industry: "Developer Tools",
  },
  {
    company: {
      name: "Orbit Systems",
      initial: "O",
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
    },
    contact: { name: "Maya Patel", initials: "MP" },
    email: null,
    status: null,
    industry: "SaaS",
  },
  {
    company: {
      name: "Vercel Labs",
      initial: "V",
      color: "text-zinc-800",
      bgColor: "bg-zinc-200",
    },
    contact: null,
    email: "daniel@vlabs.com",
    status: null,
    industry: null,
  },
];

// ── Animation phases ──────────────────────────────────────────────────────────
// idle     → cursor sitting at center
// moving   → cursor gliding to button
// clicking → button press visual
// filled   → data blurs in, cursor fades

type Phase = "idle" | "moving" | "clicking" | "filled";

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactsTableCard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [targetPos, setTargetPos] = useState({ x: 200, y: 105 });
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Measure dynamic button coordinates (+5px, +5px inside button from top-left) relative to card center
  useEffect(() => {
    function updateTargetPos() {
      if (cardRef.current && buttonRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;

        setTargetPos({
          x: buttonRect.left + 5 - centerX,
          y: buttonRect.top + 5 - centerY,
        });
      }
    }

    updateTargetPos();
    window.addEventListener("resize", updateTargetPos);
    return () => window.removeEventListener("resize", updateTargetPos);
  }, []);

  // Coordinate the timeline — loops forever
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setPhase("idle");

      timers.push(setTimeout(() => setPhase("moving"), 1200));
      timers.push(setTimeout(() => setPhase("clicking"), 2400));
      timers.push(setTimeout(() => setPhase("filled"), 2750));
      // hold the filled state for 2.5s, then restart
      timers.push(setTimeout(() => runCycle(), 5250));
    }

    runCycle();

    return () => timers.forEach(clearTimeout);
  }, []);

  const isOptimized = phase === "filled";
  const isClicking = phase === "clicking";

  return (
    <div
      ref={cardRef}
      className="relative flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl"
    >
      {/* ── Animated cursor ────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 text-zinc-800 drop-shadow-md"
        style={{ willChange: "transform" }}
        animate={
          phase === "idle"
            ? { x: 0, y: 0, opacity: 1 }
            : phase === "moving" || phase === "clicking"
              ? {
                  x: targetPos.x,
                  y: targetPos.y,
                  opacity: 1,
                }
              : {
                  x: targetPos.x,
                  y: targetPos.y,
                  opacity: 0,
                }
        }
        transition={{
          x: { duration: phase === "idle" ? 0 : 1.0, ease: [0.4, 0, 0.2, 1] },
          y: { duration: phase === "idle" ? 0 : 1.0, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: phase === "idle" ? 0 : 0.35 },
        }}
      >
        <CursorIcon />
      </motion.div>

      {/* ── Card Header ─────────────────────────────────────────── */}
      <header className="relative flex items-center justify-center gap-4 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
        <div className="absolute left-4 flex flex-row gap-1">
          <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500 hover:bg-red-600" />
          <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500 hover:bg-yellow-600" />
          <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500 hover:bg-green-600" />
        </div>
        <p className="text-xs font-medium text-zinc-800">Active Contacts</p>
      </header>

      {/* ── Table Content ───────────────────────────────────────── */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-[10px] tracking-wide text-zinc-600">
              <th className="px-4 py-2 font-normal">Company</th>
              <th className="px-4 py-2 font-normal">Contact</th>
              <th className="px-4 py-2 font-normal">Email</th>
              <th className="px-4 py-2 font-normal">Status</th>
              <th className="px-4 py-2 font-normal">Industry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {tableData.map((row, rowIdx) => {
              const filled = filledData[row.company.name];
              const stagger = rowIdx * 0.12;

              // Whether this specific cell was originally empty
              const contactEmpty = row.contact === null;
              const emailEmpty = row.email === null;
              const statusEmpty = row.status === null;
              const industryEmpty = row.industry === null;

              // Resolved values (always present for layout)
              const contactVal = contactEmpty && filled?.contact
                ? filled.contact
                : row.contact ?? { name: "—", initials: "" };
              const emailVal = emailEmpty && filled?.email
                ? filled.email
                : row.email ?? "—";
              const statusVal = statusEmpty && filled?.status
                ? filled.status
                : row.status;
              const industryVal = industryEmpty && filled?.industry
                ? filled.industry
                : row.industry ?? "—";

              // For cells that were empty: show dash when not optimized, show filled when optimized
              // For cells that already had data: always show normally

              return (
                <tr
                  key={row.company.name}
                  className="transition-colors hover:bg-zinc-100/60"
                >
                  {/* Company — always present */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-800">
                        {row.company.name}
                      </span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-2">
                    {contactEmpty ? (
                      <div className="relative">
                        {/* Dash — always in DOM, fades out */}
                        <motion.span
                          className="text-zinc-400"
                          animate={{
                            opacity: isOptimized ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <DashIcon />
                        </motion.span>
                        {/* Filled value — always in DOM, blurs in */}
                        <motion.div
                          className="absolute inset-0 flex items-center gap-1.5"
                          animate={{
                            opacity: isOptimized ? 1 : 0,
                            filter: isOptimized ? "blur(0px)" : "blur(8px)",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: isOptimized ? stagger : 0,
                            ease: "easeOut",
                          }}
                        >
                          <span className="text-zinc-700">
                            {contactVal && typeof contactVal === "object" && "name" in contactVal ? contactVal.name : ""}
                          </span>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-700">
                          {row.contact!.name}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-2">
                    {emailEmpty ? (
                      <div className="relative">
                        <motion.span
                          className="text-zinc-400"
                          animate={{
                            opacity: isOptimized ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <DashIcon />
                        </motion.span>
                        <motion.a
                          href={`mailto:${emailVal}`}
                          className="absolute inset-0 flex items-center text-zinc-700 underline-offset-3 hover:text-zinc-600 hover:underline"
                          animate={{
                            opacity: isOptimized ? 1 : 0,
                            filter: isOptimized ? "blur(0px)" : "blur(8px)",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: isOptimized ? stagger + 0.05 : 0,
                            ease: "easeOut",
                          }}
                        >
                          {emailVal}
                        </motion.a>
                      </div>
                    ) : (
                      <a
                        href={`mailto:${row.email}`}
                        className="text-zinc-700 underline-offset-3 hover:text-zinc-600 hover:underline"
                      >
                        {row.email}
                      </a>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    {statusEmpty ? (
                      <div className="relative">
                        <motion.span
                          className="text-zinc-400"
                          animate={{
                            opacity: isOptimized ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <DashIcon />
                        </motion.span>
                        <motion.span
                          className="absolute inset-0 flex items-center"
                          animate={{
                            opacity: isOptimized ? 1 : 0,
                            filter: isOptimized ? "blur(0px)" : "blur(8px)",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: isOptimized ? stagger + 0.08 : 0,
                            ease: "easeOut",
                          }}
                        >
                          {statusVal && <StatusBadge status={statusVal} />}
                        </motion.span>
                      </div>
                    ) : (
                      <StatusBadge status={row.status!} />
                    )}
                  </td>

                  {/* Industry */}
                  <td className="px-4 py-2">
                    {industryEmpty ? (
                      <div className="relative">
                        <motion.span
                          className="text-zinc-400"
                          animate={{
                            opacity: isOptimized ? 0 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <DashIcon />
                        </motion.span>
                        <motion.span
                          className="absolute inset-0 flex items-center"
                          animate={{
                            opacity: isOptimized ? 1 : 0,
                            filter: isOptimized ? "blur(0px)" : "blur(8px)",
                          }}
                          transition={{
                            duration: 0.5,
                            delay: isOptimized ? stagger + 0.1 : 0,
                            ease: "easeOut",
                          }}
                        >
                          <span className="inline-block rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-600">
                            {industryVal}
                          </span>
                        </motion.span>
                      </div>
                    ) : (
                      <span className="inline-block rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] text-zinc-600">
                        {row.industry}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mt-12 flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 pr-2 py-2 text-[10px] text-zinc-400">
        <span>Showing 5 of 5</span>
        <motion.button
          ref={buttonRef}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-200 hover:bg-zinc-700"
          animate={
            isClicking
              ? { scale: 0.99, background: "var(--color-zinc-700)" }
              : { scale: 1, background: "var(--color-zinc-800)" }
          }
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          Optimize Data
        </motion.button>
      </footer>
    </div>
  );
}

// ── Status badge sub-component ────────────────────────────────────────────────

function StatusBadge({ status }: { status: "Lead" | "Customer" | "Prospect" }) {
  const styles = {
    Lead: "bg-amber-100 text-amber-700",
    Customer: "bg-emerald-100 text-emerald-700",
    Prospect: "bg-blue-100 text-blue-700",
  };
  const dotStyles = {
    Lead: "bg-amber-500",
    Customer: "bg-emerald-500",
    Prospect: "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CursorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      color="currentColor"
      fill="var(--color-zinc-100)"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    >
      <path d="M5.10772 14.3857L5.58594 7.91256C5.61875 7.46854 5.64642 7.05187 5.67232 6.66186C5.85017 3.98379 5.94481 2.55876 7.04807 2.10979C8.15132 1.66082 9.2022 2.61969 11.1771 4.42168C11.4647 4.68413 11.772 4.96446 12.1018 5.26093L16.9102 9.58273C18.2626 10.7983 18.9389 11.4062 18.9934 11.9885C19.0309 12.3882 18.9067 12.7862 18.6489 13.0924C18.2733 13.5385 17.3734 13.6473 15.5737 13.8647C14.8156 13.9563 14.4365 14.0021 14.2073 14.2038C14.0479 14.344 13.9376 14.5321 13.8925 14.7404C13.8277 15.0399 13.9707 15.3964 14.2567 16.1095L15.7394 19.8058C15.9107 20.2328 15.9963 20.4464 15.995 20.6429C15.9932 20.9078 15.8865 21.1609 15.6986 21.3462C15.5591 21.4837 15.3471 21.57 14.9232 21.7425C14.4993 21.915 14.2873 22.0013 14.0921 22C13.8292 21.9982 13.5778 21.8907 13.3939 21.7015C13.2574 21.561 13.1717 21.3475 13.0004 20.9204L11.5177 17.2241C11.2317 16.5111 11.0887 16.1545 10.8355 15.9844C10.6595 15.8662 10.4503 15.8081 10.239 15.8187C9.935 15.834 9.63074 16.0663 9.02224 16.5308C7.57763 17.6337 6.85532 18.1851 6.27746 18.1269C5.88085 18.0871 5.51701 17.8877 5.26831 17.574C4.90595 17.1169 4.9732 16.2065 5.10772 14.3857Z" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="12"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12L21.5002 12" />
    </svg>
  );
}
