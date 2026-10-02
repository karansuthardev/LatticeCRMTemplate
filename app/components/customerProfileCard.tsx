"use client";

import Image from "next/image";
import React from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const profile = {
  name: "Sarah Chen",
  role: "Head of Operations",
  company: "Northstar Labs",
  email: "sarah@northstarlabs.com",
  deal: "Enterprise Plan",
  stage: "Evaluation",
};

const interactions = [
  {
    index: "01",
    title: "Initial interaction",
    channel: "Email",
    date: "Sep 28, 10:42 AM",
    body: "Sarah reached out to evaluate the Enterprise plan for her 40-person operations team.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CustomerProfileCard() {
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
        <div className="flex w-52 shrink-0 flex-col gap-5 p-4">
          {/* Avatar + name */}
          <div className="flex flex-col items-start gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/maya_chen.webp"
                fill
                alt={profile.name}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">{profile.name}</p>
              <p className="text-[11px] text-zinc-500">{profile.role}</p>
              <p className="text-[11px] text-zinc-400">{profile.company}</p>
            </div>
          </div>

          {/* Field list */}
          <div className="flex flex-col gap-3">
            <Field label="Email" value={profile.email} isEmail />
            <Field label="Deal" value={profile.deal} />
            <div className="flex flex-col gap-0.5">
              <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">
                Stage
              </p>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {profile.stage}
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT — interactions ─────────────────────────────── */}
        <div className="flex flex-1 flex-col">
          {/* Section label */}
          <div className="border-b border-zinc-200 px-4 py-2">
            <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">
              Interactions
            </p>
          </div>

          {/* Interaction list */}
          <div className="flex flex-col divide-y divide-zinc-100">
            {interactions.map((item) => (
              <div key={item.index} className="flex flex-col gap-1.5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-zinc-400">
                    {item.index}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-800">
                    {item.title}
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-1 text-[9px] text-zinc-400">
                    <EmailIcon />
                    {item.channel} · {item.date}
                  </span>
                </div>
                <p className="pl-5 text-[11px] leading-relaxed text-zinc-500">
                  {item.body}
                </p>
              </div>
            ))}
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
      <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      {isEmail ? (
        <a
          href={`mailto:${value}`}
          className="truncate text-[11px] text-zinc-600 underline-offset-2 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-[11px] font-medium text-zinc-700">{value}</p>
      )}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5.5L8.91302 9.41697C11.4616 10.861 12.5384 10.861 15.087 9.41697L22 5.5" />
      <path
        d="M21.9842 12.9756C22.0053 11.9899 22.0053 11.0101 21.9842 10.0244C21.9189 6.95886 21.8862 5.42609 20.7551 4.29066C19.6239 3.15523 18.0497 3.11568 14.9012 3.03657C12.9607 2.98781 11.0393 2.98781 9.09882 3.03656C5.95033 3.11566 4.37608 3.15521 3.24495 4.29065C2.11382 5.42608 2.08114 6.95885 2.01576 10.0244C1.99474 11.0101 1.99475 11.9899 2.01577 12.9756C2.08114 16.0412 2.11383 17.5739 3.24496 18.7094C4.37608 19.8448 5.95033 19.8843 9.09883 19.9634C10.404 19.9962 11.7005 20.007 13 19.9957"
        strokeLinecap="round"
      />
    </svg>
  );
}
