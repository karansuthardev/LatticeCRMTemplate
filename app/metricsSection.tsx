"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SlotNumber from "./components/slotNumber";
import CrmImportCard from "./components/crmImportCard";

export default function MetricsSection() {
  const [apiRequests, setApiRequests] = useState<number>(24819320);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
      setApiRequests((prev) => prev + increment);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full border-b border-zinc-200">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="mx-auto mb-12 flex w-fit flex-col items-center gap-4 text-center">
        <h2 className="text-5xl font-medium tracking-tight text-zinc-700">
          Scale <span className="text-zinc-800">Confidently.</span>
        </h2>
        <p className=" text-center text-lg font-normal tracking-wide text-zinc-600">
          Enterprise infrastructure engineered to support mission-critical sales operations with zero compromise.
        </p>
      </div>

      {/* ── Two Column Grid with Hard Dividers ────────────────────────── */}
      <div className="relative w-full overflow-hidden border-y border-zinc-200 bg-zinc-100">
        {/* Continuous background image behind the entire grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/background_image.webp"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 grid w-full grid-cols-1 divide-y divide-zinc-200 md:grid-cols-2 md:divide-x md:divide-y-0">
          {/* Left Column: Metrics Bento */}
          <div className="flex h-full flex-col divide-y divide-zinc-200">
            {/* Top Row: 2 Cells */}
            <div className="grid flex-1 grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {/* 1. Workflow Executions */}
              <div className="group flex flex-col justify-between bg-zinc-100 p-6 transition-colors duration-300 hover:bg-black/10 sm:p-8">
                <span className="text-sm font-normal text-zinc-600 transition-colors duration-300 group-hover:text-zinc-50">
                  Workflow Executions
                </span>
                <span className="mt-2 text-4xl font-medium tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-50">
                  1.7M+
                </span>
              </div>

              {/* 2. Customer Records Managed */}
              <div className="group flex flex-col justify-between bg-zinc-100 p-6 transition-colors duration-300 hover:bg-black/10 sm:p-8">
                <span className="text-sm font-normal text-zinc-600 transition-colors duration-300 group-hover:text-zinc-50">
                  Customer Records Managed
                </span>
                <span className="mt-2 text-4xl font-medium tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-50">
                  8.6M+
                </span>
              </div>
            </div>

            {/* Middle Row: 2 Cells */}
            <div className="grid flex-1 grid-cols-1 divide-y divide-zinc-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {/* 3. API Requests Processed */}
              <div className="group flex flex-col justify-between bg-zinc-100 p-6 transition-colors duration-300 hover:bg-black/10 sm:p-8">
                <span className="text-sm font-normal text-zinc-600 transition-colors duration-300 group-hover:text-zinc-50">
                  API Requests Processed
                </span>
                <SlotNumber
                  value={apiRequests.toLocaleString()}
                  rowHeight={40}
                  className="mt-2 text-4xl font-medium tracking-tight text-zinc-800 tabular-nums transition-colors duration-300 group-hover:text-zinc-50"
                />
              </div>

              {/* 4. Active Users */}
              <div className="group flex flex-col justify-between bg-zinc-100 p-6 transition-colors duration-300 hover:bg-black/10 sm:p-8">
                <span className="text-sm font-normal text-zinc-600 transition-colors duration-300 group-hover:text-zinc-50">
                  Active Users
                </span>
                <span className="mt-2 text-4xl font-medium tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-50">
                  12,840
                </span>
              </div>
            </div>

            {/* Bottom: Platform Uptime */}
            <div className="group flex flex-1 flex-col justify-between gap-4 bg-zinc-100 p-6 transition-colors duration-300 hover:bg-black/10 sm:p-8">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-normal text-zinc-600 transition-colors duration-300 group-hover:text-zinc-50">
                  Platform Uptime
                </span>
                <span className="text-xs font-normal text-zinc-500 transition-colors duration-300 group-hover:text-zinc-50">
                  in last 7 days
                </span>
              </div>

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <span className="mt-2 text-4xl font-medium tracking-tight text-zinc-800 transition-colors duration-300 group-hover:text-zinc-50">
                    99.6%
                  </span>
                </div>

                {/* Status indicator bars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 50 }).map((_, i) => {
                    const color =
                      i === 14
                        ? "bg-amber-400"
                        : i === 36
                          ? "bg-yellow-400"
                          : "bg-emerald-500";
                    const tooltip =
                      i === 14
                        ? "98.9% - Scheduled maintenance"
                        : i === 36
                          ? "99.2% - Degraded performance"
                          : "100% uptime";

                    return (
                      <span
                        key={i}
                        className={`h-4 w-0.5 rounded-[1px] ${color}`}
                        title={tooltip}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CRM Import Card */}
          <CrmImportCard />
        </div>
      </div>
    </section>
  );
}
