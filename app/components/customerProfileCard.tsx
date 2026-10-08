"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, easeOut, motion } from "motion/react";

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
                        <ChannelIcon channel={item.channel} />
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
      <p className="text-xs font-normal text-zinc-500">{label}</p>
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

// ── Channel icon (swaps based on channel type) ────────────────────────────────

function ChannelIcon({ channel }: { channel: string }) {
  if (channel === "Call") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        color="currentColor"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z"></path>
      </svg>
    );
  }
  if (channel === "Slack") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        color="currentColor"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        <path
          d="M13 9.25V3.75C13 2.7835 13.7835 2 14.75 2C15.7165 2 16.5 2.7835 16.5 3.75V9.25C16.5 10.2165 15.7165 11 14.75 11C13.7835 11 13 10.2165 13 9.25Z"
          strokeLinecap="round"
        ></path>
        <path
          d="M7.5 20.25V14.75C7.5 13.7835 8.2835 13 9.25 13C10.2165 13 11 13.7835 11 14.75V20.25C11 21.2165 10.2165 22 9.25 22C8.2835 22 7.5 21.2165 7.5 20.25Z"
          strokeLinecap="round"
        ></path>
        <path
          d="M14.75 13L20.25 13C21.2165 13 22 13.7835 22 14.75C22 15.7165 21.2165 16.5 20.25 16.5L14.75 16.5C13.7835 16.5 13 15.7165 13 14.75C13 13.7835 13.7835 13 14.75 13Z"
          strokeLinecap="round"
        ></path>
        <path
          d="M3.75 7.5L9.25 7.5C10.2165 7.5 11 8.2835 11 9.25C11 10.2165 10.2165 11 9.25 11L3.75 11C2.7835 11 2 10.2165 2 9.25C2 8.2835 2.7835 7.5 3.75 7.5Z"
          strokeLinecap="round"
        ></path>
        <path d="M7 3.75C7 4.7165 7.7835 5.5 8.75 5.5H10.5V3.75C10.5 2.7835 9.7165 2 8.75 2C7.7835 2 7 2.7835 7 3.75Z"></path>
        <path d="M17 20.25C17 19.2835 16.2165 18.5 15.25 18.5H13.5V20.25C13.5 21.2165 14.2835 22 15.25 22C16.2165 22 17 21.2165 17 20.25Z"></path>
        <path d="M20.25 7C19.2835 7 18.5 7.7835 18.5 8.75L18.5 10.5H20.25C21.2165 10.5 22 9.7165 22 8.75C22 7.7835 21.2165 7 20.25 7Z"></path>
        <path d="M3.75 17C4.7165 17 5.5 16.2165 5.5 15.25V13.5L3.75 13.5C2.7835 13.5 2 14.2835 2 15.25C2 16.2165 2.7835 17 3.75 17Z"></path>
      </svg>
    );
  }
  // Default: Email
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" />
      <path
        d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
        strokeLinecap="round"
      />
    </svg>
  );
}
