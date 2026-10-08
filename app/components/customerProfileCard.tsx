"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { ChannelIcon } from "../icons";

// ── Data ──────────────────────────────────────────────────────────────────────

const profile = {
  name: "Sarah Chen",
  role: "Head of Operations",
  company: "Northstar Labs",
  email: "sarah@northstarlabs.com",
  deal: "Enterprise Plan",
  stage: "Evaluation",
};

const allInteractions = [
  {
    index: "01",
    title: "Initial interaction",
    channel: "Email",
    date: "Sep 28, 10:42 AM",
    body: "Sarah reached out to evaluate the Enterprise plan for her 40-person operations team.",
  },
  {
    index: "02",
    title: "Call",
    channel: "Call",
    date: "Sep 30, 2:15 PM",
    body: "Discussed team requirements, implementation timeline, and reporting needs. Sarah wants to begin next month.",
  },
  {
    index: "03",
    title: "Email",
    channel: "Email",
    date: "Oct 1, 9:18 AM",
    body: "Sarah confirmed that the team is ready to move forward and asked about onboarding.",
  },
  {
    index: "04",
    title: "Message",
    channel: "Slack",
    date: "Oct 2, 11:06 AM",
    body: "Sarah shared their current workflow and confirmed that the team uses Slack for internal communication.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomerProfileCard() {
  // How many interactions are currently visible
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      // Start with just the first item
      setVisibleCount(1);

      // Add items one by one, 1.2s apart
      allInteractions.forEach((_, i) => {
        if (i === 0) return; // already visible
        timers.push(
          setTimeout(() => {
            setVisibleCount(i + 1);
          }, i * 1400),
        );
      });

      // After all are shown, hold for 2s then reset
      const holdMs = (allInteractions.length - 1) * 1400 + 2000;
      timers.push(setTimeout(() => runCycle(), holdMs));
    }

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const visibleItems = allInteractions.slice(0, visibleCount).reverse();

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl">
      {/* ── Window chrome ────────────────────────────────────────── */}
      <header className="relative flex shrink-0 items-center justify-center border-b border-zinc-200 bg-zinc-100 px-4 py-2">
        <div className="absolute left-4 flex flex-row gap-1">
          <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500" />
          <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500" />
          <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500" />
        </div>
        <p className="text-xs font-medium text-zinc-800">Customer Profile</p>
      </header>

      {/* ── Two-column body ──────────────────────────────────────── */}
      <div className="flex flex-1 divide-x divide-zinc-200">
        {/* ── LEFT — customer details ──────────────────────────── */}
        <div className="flex w-56 shrink-0 flex-col gap-6 p-4 ite">
          {/* Avatar + name */}
          <div className="flex flex-row items-start gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                src="/maya_chen.webp"
                fill
                alt={profile.name}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-px">
              <p className="text-sm font-medium text-zinc-800">
                {profile.name}
              </p>
              <div className="text-normal flex flex-col text-xs mt-1">
                <p className="text-zinc-600">{profile.role}</p>
                <p className="text-zinc-600">at {profile.company}</p>
              </div>
            </div>
          </div>

          {/* Field list */}
          <div className="mb-18 flex flex-col gap-4">
            <Field label="Email" value={profile.email} isEmail />
            <div className="flex flex-row items-end gap-4">
              <Field label="Deal" value={profile.deal} />
              <span className="-my-0.5 inline-flex w-fit items-baseline gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {profile.stage}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT — interactions ─────────────────────────────── */}
        <div className="flex h-80 flex-1 flex-col overflow-hidden">
          <div className="flex h-full scrollbar-none flex-col overflow-y-scroll">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.index}
                  layout="position"
                  initial={{
                    opacity: 1,
                    scaleX: 0.95,
                    filter: "blur(4px)",
                    y: -4,
                  }}
                  animate={{ opacity: 1, scaleX: 1, filter: "blur(0px)", y: 0 }}
                  exit={{
                    opacity: 0,
                    scaleX: 0.95,
                    filter: "blur(4px)",
                    y: -4,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.66, 0.99, 0.66, 0.99],
                  }}
                  className={`flex flex-col gap-2 px-4 py-4 ${
                    index !== 0 ? "border-t border-zinc-200" : ""
                  } first:border-t-0`}
                >
                  <div className="flex h-fit items-center justify-between">
                    <span className="text-xs font-medium text-zinc-800">
                      {item.title}
                    </span>
                    <div className="flex shrink-0 items-center gap-2 text-xs whitespace-nowrap text-zinc-600">
                      <div className="flex flex-row gap-1 items-center">
                        <ChannelIcon channel={item.channel} width={12} height={12} />
                        <p className="whitespace-nowrap">{item.channel}</p>
                      </div>
                      <p className="whitespace-nowrap">{item.date}</p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 text-normal text-pretty">{item.body}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  isEmail,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs font-normal text-zinc-600">{label}</p>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="text-xs text-zinc-700 underline-offset-2 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs font-normal text-zinc-700">{value}</p>
      )}
    </div>
  );
}


