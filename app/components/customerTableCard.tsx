"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

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
        <CursorIcon />
      </motion.div>

      {/* ── Hover Popup Card ────────────────────────────────────── */}
      <motion.div
        animate={{
          scale: isHovered ? 1 : 0.96,
          opacity: isHovered ? 1 : 0,
          translateY: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-10 -left-15 z-20 flex w-75 flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-100 p-4 shadow-2xl"
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
            <ChevronRight />
          </div>
        </div>
        <p className="text-[12px] text-zinc-800">
          Maya is evaluating the CRM for 12-person sales team. Interested in
          pipeline visibility and automation.
        </p>

        <div className="flex flex-col gap-1 text-[12px]">
          <div className="flex flex-row items-center gap-2">
            <ClockIcon />
            <span className="font-medium">Last interaction — Sep 28</span>
          </div>

          <p>
            Reviewed the proposal and asked about workflows and data migration.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-[12px]">
          <div className="flex flex-row items-center gap-2">
            <AIMailIcon />
            <span className="font-medium">Next step</span>
          </div>

          <p>Send migration details and follow up Friday.</p>
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
              <tr className="border-b border-zinc-200 bg-zinc-50 text-[10px] tracking-wide text-zinc-600">
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
                    <td className="px-4 py-2 font-medium text-zinc-700">
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
        <footer className="mt-12 flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-[10px] text-zinc-400">
          <span>Showing 4 of 4 customers</span>
          <span className="text-zinc-500">Real-time Context</span>
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

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C7.52232 2 3.77426 4.94289 2.5 9H5"></path>
      <path d="M12 8V12L14 14"></path>
      <path d="M2 12C2 12.3373 2.0152 12.6709 2.04494 13M9 22C8.6584 21.8876 8.32471 21.7564 8 21.6078M3.20939 17C3.01655 16.6284 2.84453 16.2433 2.69497 15.8462M4.83122 19.3065C5.1369 19.6358 5.46306 19.9441 5.80755 20.2292"></path>
    </svg>
  );
}

function AIMailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="M2 5.5L8.91302 9.41697C11.4616 10.861 12.5384 10.861 15.087 9.41697L22 5.5"></path>
      <path
        d="M21.9842 12.9756C22.0053 11.9899 22.0053 11.0101 21.9842 10.0244C21.9189 6.95886 21.8862 5.42609 20.7551 4.29066C19.6239 3.15523 18.0497 3.11568 14.9012 3.03657C12.9607 2.98781 11.0393 2.98781 9.09882 3.03656C5.95033 3.11566 4.37608 3.15521 3.24495 4.29065C2.11382 5.42608 2.08114 6.95885 2.01576 10.0244C1.99474 11.0101 1.99475 11.9899 2.01577 12.9756C2.08114 16.0412 2.11383 17.5739 3.24496 18.7094C4.37608 19.8448 5.95033 19.8843 9.09883 19.9634C10.404 19.9962 11.7005 20.007 13 19.9957"
        strokeLinecap="round"
      ></path>
      <path d="M18.5 14L18.7579 14.697C19.0961 15.611 19.2652 16.068 19.5986 16.4014C19.932 16.7348 20.389 16.9039 21.303 17.2421L22 17.5L21.303 17.7579C20.389 18.0961 19.932 18.2652 19.5986 18.5986C19.2652 18.932 19.0961 19.389 18.7579 20.303L18.5 21L18.2421 20.303C17.9039 19.389 17.7348 18.932 17.4014 18.5986C17.068 18.2652 16.611 18.0961 15.697 17.7579L15 17.5L15.697 17.2421C16.611 16.9039 17.068 16.7348 17.4014 16.4014C17.7348 16.068 17.9039 15.611 18.2421 14.697L18.5 14Z"></path>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.00005 18C9.00005 18 15 13.5811 15 12C15 10.4188 9 6 9 6"></path>
    </svg>
  );
}
