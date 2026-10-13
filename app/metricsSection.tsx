"use client";

import React from "react";

export default function MetricsSection() {
  return (
    <section className="mb-32 w-full border-b border-zinc-200">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="mx-auto mt-20 mb-12 flex w-fit flex-col items-center gap-4 px-4 text-center">
        <h2 className="text-5xl font-medium tracking-tight leading-[1] text-zinc-800">
          Scale with{" "}
          <span className="italic font-medium text-orange-600">
            Confidence.
          </span>
        </h2>
        <p className="max-w-xl text-center text-md font-medium tracking-wide text-zinc-500">
          Enterprise infrastructure engineered to support mission-critical sales operations with zero compromise.
        </p>
      </div>

      {/* ── Two Column Grid with Hard Dividers ────────────────────────── */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 border-y border-zinc-200 bg-zinc-100">
        {/* Left Column: Metrics Bento */}
        <div className="flex flex-col divide-y divide-zinc-200">
          {/* Top Row: 2 Cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
            {/* 1. Workflow Executions */}
            <div className="flex flex-col justify-between p-6 sm:p-8 transition-colors duration-200 hover:bg-zinc-200/30">
              <span className="text-xs font-normal text-zinc-600">
                Workflow Executions
              </span>
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-800">
                  1.7M+
                </span>
                <span className="text-xs font-normal text-zinc-500">
                  Automated tasks executed seamlessly
                </span>
              </div>
            </div>

            {/* 2. Customer Records Managed */}
            <div className="flex flex-col justify-between p-6 sm:p-8 transition-colors duration-200 hover:bg-zinc-200/30">
              <span className="text-xs font-normal text-zinc-600">
                Customer Records Managed
              </span>
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-800">
                  8.6M+
                </span>
                <span className="text-xs font-normal text-zinc-500">
                  Synced across real-time integrations
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row: 2 Cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
            {/* 3. API Requests Processed */}
            <div className="flex flex-col justify-between p-6 sm:p-8 transition-colors duration-200 hover:bg-zinc-200/30">
              <span className="text-xs font-normal text-zinc-600">
                API Requests Processed
              </span>
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-800">
                  24.8M+
                </span>
                <span className="text-xs font-normal text-zinc-500">
                  Sub-50ms global response latency
                </span>
              </div>
            </div>

            {/* 4. Active Users */}
            <div className="flex flex-col justify-between p-6 sm:p-8 transition-colors duration-200 hover:bg-zinc-200/30">
              <span className="text-xs font-normal text-zinc-600">
                Active Users
              </span>
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-800">
                  12,840
                </span>
                <span className="text-xs font-normal text-zinc-500">
                  Revenue and ops professionals daily
                </span>
              </div>
            </div>
          </div>

          {/* Bottom: Platform Uptime */}
          <div className="flex flex-col gap-4 p-6 sm:p-8 transition-colors duration-200 hover:bg-zinc-200/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-zinc-600">
                Platform Uptime
              </span>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-800">
                  99.98%
                </span>
                <span className="text-xs font-normal text-zinc-500">
                  High availability SLA across all global regions
                </span>
              </div>

              {/* Status indicator bars */}
              <div className="flex flex-col items-start sm:items-end gap-1.5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-4 w-1 rounded-[1px] ${
                        i === 17 ? "bg-amber-400" : "bg-emerald-500"
                      }`}
                      title={i === 17 ? "99.92% - Scheduled maintenance" : "100% uptime"}
                    />
                  ))}
                </div>
                <span className="text-xs font-normal text-zinc-500">
                  Past 90 days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Kept empty for now */}
        <div className="relative min-h-[460px] w-full bg-zinc-50/40" />
      </div>
    </section>
  );
}
