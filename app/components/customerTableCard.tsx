"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { easeOut, motion } from "motion/react";
import { CursorIcon, ClockIcon, AIMailIcon, ChevronRight } from "../icons";

interface CustomerRecord {
  customer: string;
  role: string;
  company: string;
  status: "Active" | "Negotiation" | "Proposal" | "Qualified";
}

const customerData: CustomerRecord[] = [
  {
    customer: "Maya Chen",
    role: "Head of Growth",
    company: "Northstar",
    status: "Active",
  },
  {
    customer: "Daniel Brooks",
    role: "Founder",
    company: "Arc Labs",
    status: "Negotiation",
  },
  {
    customer: "Sofia Martin",
    role: "Product Lead",
    company: "Linearity",
    status: "Proposal",
  },
  {
    customer: "Ethan Cole",
    role: "CEO",
    company: "Brightside",  
    status: "Qualified",
  },
];

type Phase = "idle" | "moving" | "hovering" | "leaving";

export default function CustomerTableCard() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setPhase("idle");
      timers.push(setTimeout(() => setPhase("moving"), 800));
      timers.push(setTimeout(() => setPhase("hovering"), 1900));
      timers.push(setTimeout(() => setPhase("leaving"), 4400));
      timers.push(setTimeout(() => runCycle(), 5500));
    }

    runCycle();

    return () => timers.forEach(clearTimeout);
  }, []);

  const isHovered = phase === "hovering";

  return (
    <div className="relative inset-0 m-auto h-fit w-fit">
      {/* ── Animated cursor ────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 text-zinc-800 drop-shadow-md"
        style={{ willChange: "transform" }}
        animate={
          phase === "idle" || phase === "leaving"
            ? { x: 0, y: 10, opacity: 1 }
            : { x: -160, y: -55, opacity: 1 }
        }
        transition={{
          x: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
          y: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.2 },
        }}
      >
        <CursorIcon width={18} height={18} />
      </motion.div>

      {/* ── Hover Popup Card ────────────────────────────────────── */}
      <motion.div
        animate={{
          scale: isHovered ? 1 : 0.96,
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="pointer-events-none absolute -top-10 -left-15 z-20 flex w-75 flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-100 p-4 shadow-xl"
      >
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-row gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={"/maya_chen.webp"}
                fill
                alt="profile pic"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-zinc-800">Maya Chen</p>
              <p className="text-xs text-zinc-600">
                Head of Growth at Northstar
              </p>
            </div>
          </div>
          <div className="self-center text-zinc-600">
            <ChevronRight width={14} height={14} />
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          Maya is evaluating the CRM for 12-person sales team. Interested in
          pipeline visibility and automation.
        </p>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex flex-row items-center gap-2">
            <ClockIcon width={14} height={14} />
            <span className="font-medium">Last interaction — Sep 28</span>
          </div>

          <p className="text-zinc-600">
            Reviewed the proposal and asked about workflows and data migration.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex flex-row items-center gap-2">
            <AIMailIcon width={14} height={14} />
            <span className="font-medium">Next step</span>
          </div>

          <p className="text-zinc-600">Send migration details and follow up Friday.</p>
        </div>
      </motion.div>

      {/* ── Main Table Card ────────────────────────────────────── */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl">
        {/* ── Card Header ─────────────────────────────────────────── */}
        <header className="relative flex items-center justify-center gap-4 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
          <div className="absolute left-4 flex flex-row gap-1">
            <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500 hover:bg-red-600" />
            <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500 hover:bg-yellow-600" />
            <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500 hover:bg-green-600" />
          </div>
          <p className="text-xs font-medium text-zinc-800">Customer Profiles</p>
        </header>

        {/* ── Table Content ───────────────────────────────────────── */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-xs tracking-wide text-zinc-600">
                <th className="px-4 py-2 font-normal">Customer</th>
                <th className="px-4 py-2 font-normal">Role</th>
                <th className="px-4 py-2 font-normal">Company</th>
                <th className="px-4 py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {customerData.map((row) => {
                const isMaya = row.customer === "Maya Chen";
                return (
                  <tr
                    key={row.customer}
                    className={`transition-colors ${
                      isMaya && isHovered
                        ? "bg-zinc-200/80"
                        : "hover:bg-zinc-100/60"
                    }`}
                  >
                    {/* Customer */}
                    <td className="px-4 py-2">
                      <span className="font-medium text-zinc-800">
                        {row.customer}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-2 text-zinc-600">{row.role}</td>

                    {/* Company */}
                    <td className="px-4 py-2 font-normal text-zinc-700">
                      {row.company}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-2">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="mt-12 flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-600">
          <span>Showing 4 of 4 customers</span>
          <span className="text-zinc-600">Real-time Context</span>
        </footer>
      </div>
    </div>
  );
}

// ── Status badge sub-component ────────────────────────────────────────────────

function StatusBadge({
  status,
}: {
  status: "Active" | "Negotiation" | "Proposal" | "Qualified";
}) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700",
    Negotiation: "bg-amber-100 text-amber-700",
    Proposal: "bg-blue-100 text-blue-700",
    Qualified: "bg-violet-100 text-violet-700",
  };
  const dotStyles = {
    Active: "bg-emerald-500",
    Negotiation: "bg-amber-500",
    Proposal: "bg-blue-500",
    Qualified: "bg-violet-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-normal ${styles[status]}`}
    >
      {status}
    </span>
  );
}


