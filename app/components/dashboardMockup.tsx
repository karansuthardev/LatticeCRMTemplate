"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function DashboardMockup() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (taskName: string) => {
    setCompletedTasks((currentTasks) =>
      currentTasks.includes(taskName)
        ? currentTasks.filter((name) => name !== taskName)
        : [...currentTasks, taskName],
    );
  };

  return (
    <div className="flex h-full w-full rounded-2xl border border-zinc-200 bg-zinc-100 overflow-hidden text-zinc-800">
      <aside className="flex w-50 shrink-0 flex-col gap-1 bg-zinc-100 px-2 py-3 relative-10">
        <div className="mb-1 flex flex-row items-center justify-between gap-1.5 px-2 py-1">
          <div className="flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 36 40"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
                fill="#1a1a1a"
              />
            </svg>
            <span className="text-sm font-black text-zinc-900">Lattice</span>
          </div>
          <div className="rounded-lg p-0.5 text-zinc-500 hover:text-zinc-600">
            <PanelLeftCloseIcon />
          </div>
        </div>

        {/* Nav items */}
        {[
          { label: "Overview", active: true, icon: HomeIcon },
          { label: "Companies", active: false, icon: BuildingIcon },
          { label: "People", active: false, icon: PersonIcon },
          { label: "Opportunities", active: false, icon: OpportunityIcon },
          { label: "Tasks", active: false, icon: TaskIcon },
          { label: "Notes", active: false, icon: NotesIcon },
          { label: "Workflows", active: false, icon: WorkflowIcon },
          { label: "AI / Agents", active: false, icon: AIIcon },
        ].map(({ label, active, icon: Icon }) => (
          <div
            key={label}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-normal ${
              active
                ? "border border-zinc-200 bg-zinc-50 text-zinc-800"
                : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
            }`}
          >
            <Icon />
            {label}
          </div>
        ))}

        {/* Spacer + Settings */}
        <div className="mt-auto">
          <div className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs font-normal text-zinc-600 hover:bg-zinc-200 hover:text-zinc-700">
            <div className="flex flex-row gap-2">
              <SettingsIcon />
              Settings
            </div>
            <ArrowRightIcon />
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-20 flex flex-1 flex-col ">
        {/* Top bar */}
        <header className="flex h-10 shrink-0 items-center justify-between bg-zinc-100 px-5">
          <div>
            <h1 className="text-sm font-medium text-zinc-900">Overview</h1>
          </div>
          <div className="flex items-baseline gap-2 text-[8px] text-zinc-600">
            <span>Tue, Sep 29, 2026</span>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="mr-1 mb-1 flex-1 overflow-y-auto rounded-2xl shadow-[0px_0px_4px_0.5px_var(--color-zinc-200)] bg-zinc-50 p-2">
          {/* ── KPI cards ── */}
          <div className="mb-2 grid grid-cols-5 gap-2">
            {kpiCards.map((card) => (
              <KpiCard key={card.label} {...card} />
            ))}
          </div>

          {/* ── Row 2: Pipeline + Revenue + Recent activity ── */}
          <div className="mb-2 grid grid-cols-3 gap-2">
            {/* Pipeline */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-700 cursor-pointer">Pipeline</span>
                <div className="-rotate-90 text-zinc-600 cursor-pointer">
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="mt-1">
                <span className="text-md font-medium text-zinc-800">
                  $482,000
                </span>
                <div className="mt-1 mb-4 flex h-1.5 w-full overflow-hidden rounded-full">
                  <div className="bg-amber-500" style={{ width: "18%" }} />
                  <div className="bg-blue-500" style={{ width: "29%" }} />
                  <div className="bg-green-500" style={{ width: "29%" }} />
                  <div className="bg-orange-500" style={{ width: "14%" }} />
                  <div className="bg-indigo-500" style={{ width: "10%" }} />
                </div>
              </div>

              {/* Stage rows */}
              <div className="flex flex-col gap-1">
                {pipelineStages.map((s) => (
                  <div
                    key={s.name}
                    className="-mx-1 flex items-center justify-between rounded-xs px-1 text-[10px] odd:bg-zinc-100"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 rounded-xs"
                        style={{ background: s.color }}
                      />
                      <span className="text-zinc-700">{s.name}</span>
                    </div>

                    <div className="flex flex-row gap-4">
                      <span className="text-zinc-700">{s.value}</span>

                      <div className="flex flex-row gap-1">
                        <span className="text-zinc-700">{s.pct}</span>
                        <span className="text-zinc-500">({s.count})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue chart */}
            <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] text-zinc-700">Revenue</span>
                  <div className="flex flex-row items-center gap-1 text-zinc-600 cursor-pointer">
                    <span className="text-[8px]">Last 6 months</span>
                    <ChevronDownIcon />
                  </div>
                </div>

                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-md font-medium text-zinc-800">
                    $124,000
                  </span>
                  <div className="flex flex-row items-baseline gap-0.5 text-green-600">
                    <div className="h-2.25">
                      <TradeUpIcon />
                    </div>
                    <span className="text-[10px] font-normal">24%</span>
                  </div>
                  <p className="mb-2 text-[8px] text-zinc-600">in last month</p>
                </div>
              </div>
              <RevenueChart />
            </div>

            {/* Recent activity */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-normal text-zinc-700">
                  Recent activity
                </span>
                <div className="flex flex-row items-center gap-1 text-zinc-600 cursor-pointer">
                  <span className="text-[8px]">View all</span>
                  <ChevronDownIcon />
                </div>
              </div>

              <div className="mt-1.5 flex scrollbar-none flex-col gap-2 overflow-y-scroll">
                {recentActivity.map((a) => (
                  <div key={a.name} className="flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8px] font-normal text-white"
                      style={{ background: a.color }}
                    >
                      {a.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-zinc-800">
                        {a.name}
                      </p>
                      <p className="text-[8px] text-zinc-500">{a.action}</p>
                    </div>
                    <span className="shrink-0 text-[8px] text-zinc-500 self-baseline-last">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Row 3: Top opportunities + Upcoming tasks + AI panel ── */}
          <div className="grid grid-cols-3 gap-2">
            {/* Top opportunities */}

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-normal text-zinc-700">
                  Opportunities
                </span>
                <div className="flex flex-row items-center gap-1 text-zinc-600 cursor-pointer">
                  <span className="text-[8px]">View all</span>
                  <ChevronDownIcon />
                </div>
              </div>

              <table className="mt-1.5 w-full">
                <thead>
                  <tr className="text-left text-[8px] text-zinc-500">
                    <th className="pb-1 font-normal"></th>
                    <th className="pb-1 font-normal">Value</th>
                    <th className="pb-1 font-normal ml-2">Stage</th>
                    <th className="pb-1 font-normal">Close</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((o) => (
                    <tr key={o.name} className="">
                      <td className="py-1">
                        <div className="flex items-start gap-1">
                          <div
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-normal text-white"
                            style={{ background: o.color }}
                          >
                            {o.initials}
                          </div>
                          <p className="ml-1 self-center text-[10px] font-medium tracking-tight text-zinc-800">
                            {o.name}{" "}
                            <span className="text-[8px] font-normal text-zinc-500">
                              ({o.company})
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="align-middle text-[8px] text-zinc-700">
                        {o.value}
                      </td>
                      <td className="">
                        <div className="flex h-full w-full flex-col justify-center">
                          <span
                            className="h-fit w-fit rounded px-1 py-0.5 text-[8px]"
                            style={{
                              background: o.stageBg,
                              color: o.stageColor,
                            }}
                          >
                            {o.stage}
                          </span>
                        </div>
                      </td>
                      <td className="self-middle text-[8px] text-zinc-700">
                        {o.close}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upcoming tasks */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-normal text-zinc-700">
                  Upcoming tasks
                </span>
                <div className="flex flex-row items-center gap-1 text-zinc-600 cursor-pointer">
                  <span className="text-[8px]">View all</span>
                  <ChevronDownIcon />
                </div>
              </div>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {tasks.map((t) => {
                  const isCompleted = completedTasks.includes(t.name);

                  return (
                    <div
                      key={t.name}
                      className="flex items-start gap-1.5 border-t border-zinc-50 pt-1.5"
                    >
                      <motion.button
                        type="button"
                        aria-label={`${isCompleted ? "Mark" : "Complete"} ${t.name}`}
                        aria-pressed={isCompleted}
                        className="mt-0.5 flex h-3 w-3 focus:outline-0 shrink-0 items-center justify-center rounded border border-zinc-300"
                        animate={{
                          backgroundColor: isCompleted ? "var(--color-zinc-800)" : "var(--color-zinc-50)",
                          borderColor: isCompleted ? "var(--color-zinc-700)" : "var(--color-zinc-300)",
                        }}
                        onClick={() => toggleTask(t.name)}
                      >
                        <motion.svg
                          viewBox="0 0 10 10"
                          className="h-2 w-2"
                          initial={false}
                          animate={{ opacity: isCompleted ? 1 : 0 }}
                          transition={{duration: 0.2}}
                        >
                          <motion.path
                            d="m2 5 2 2 4-4"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{ pathLength: isCompleted ? 1 : 0 }}
                            transition={{duration: 0.2}}
                          />
                        </motion.svg>
                      </motion.button>
                      <div className="min-w-0 flex-1">
                        <p className="relative w-fit text-[10px] font-medium text-zinc-800">
                          {t.name}
                          <motion.span
                            className="absolute inset-x-0 top-1/2 h-px -mx-px rounded-full origin-left bg-zinc-800"
                            initial={false}
                            animate={{ scaleX: isCompleted ? 1 : 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          />
                        </p>
                        <p className="text-[8px] text-zinc-400">{t.sub}</p>
                      </div>
                      <div className="flex shrink-0 items-baseline gap-1">
                        {/*<span
                          className="text-[8px] font-medium"
                          style={{ color: t.dueColor }}
                        >
                          {t.due}
                        </span>*/}
                        <span
                          className="rounded px-1 py-0.5 text-[8px] font-medium"
                          style={{
                            background: t.priorityBg,
                            color: t.priorityColor,
                          }}
                        >
                          {t.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI / Agents panel */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] font-normal text-zinc-700">
                  Agents
                </span>
                <div className="flex flex-row items-center gap-1 text-zinc-600 cursor-pointer">
                  <span className="text-[8px]">View all</span>
                  <ChevronDownIcon />
                </div>
              </div>

              {/* Lead qualification progress */}
              

              {/* Suggested action */}
              <div className="mb-1 rounded-lg border border-zinc-200 mt-1.5 py-1.75 -mx-2 px-2">
                <p className="text-[9px] font-medium text-zinc-800">
                  Suggested action
                </p>
                <p className="mt-0.5 text-[8px] text-zinc-500">
                  3 high-intent leads are ready for outreach. Would you like to
                  draft personalized messages?
                </p>
                <button className="mt-1.5 rounded-md bg-zinc-800 px-2 py-0.5 text-[8px] font-normal text-white">
                  Review
                </button>
              </div>

              {/* Quick links */}
              <div className="gap-4.5 flex flex-col mt-4">
              {[
                { label: "Automations", sub: "2 workflows running" },
                { label: "Insights", sub: "Revenue up 24% this month" },
                { label: "Agents", sub: "4 active" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex cursor-pointer items-center hover:bg-zinc-200 -m-2 p-2 justify-between rounded-lg border-t border-zinc-50 py-1.5"
                >
                  <div>
                    <p className="text-[9px] font-medium text-zinc-800">
                      {item.label}
                    </p>
                    <p className="text-[8px] text-zinc-500">{item.sub}</p>
                  </div>
                  <div className="text-[10px] text-zinc-600 -rotate-90">
                    <ChevronDownIcon />
                  </div>
                </div>
              ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type kpiCardType = {
  label: string;
  value: string;
  delta: string;
  sub: string;
  up: boolean;
};

const kpiCards: kpiCardType[] = [
  {
    label: "Pipeline value",
    value: "$482,000",
    delta: "+12%",
    sub: "30-day change",
    up: true,
  },
  {
    label: "Open opportunities",
    value: "18",
    delta: "+3",
    sub: "30-day change",
    up: true,
  },
  {
    label: "Earned   this month",
    value: "$124,000",
    delta: "+24%",
    sub: "monthly change",
    up: true,
  },
  {
    label: "Tasks due",
    value: "7",
    delta: "+2",
    sub: "daily change",
    up: false,
  },
  {
    label: "New contacts",
    value: "24",
    delta: "+18%",
    sub: "30-day change",
    up: true,
  },
];

function KpiCard(kpiCard: kpiCardType) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-zinc-600">{kpiCard.label}</span>
      </div>
      <p className="text-lg font-medium text-zinc-800">{kpiCard.value}</p>
      <div className="flex flex-row items-baseline gap-1">
        <div
          className={`flex flex-row items-baseline gap-px ${kpiCard.up ? "text-green-600" : "text-red-500"} `}
        >
          <div className="h-2.25">
            {kpiCard.up ? <TradeUpIcon /> : <TradeDownIcon />}
          </div>

          <p
            className={`font-regular text-[10px] ${kpiCard.up ? "text-green-600" : "text-red-500"}`}
          >
            {kpiCard.delta}
          </p>
        </div>
        <p className="text- text- mt-1 text-[10px] text-zinc-500">
          {kpiCard.sub}
        </p>
      </div>
    </div>
  );
}

const pipelineStages = [
  {
    name: "Lead",
    count: 5,
    value: "$86,000",
    pct: "18%",
    color: "var(--color-amber-500)",
  },
  {
    name: "Qualified",
    count: 6,
    value: "$142,000",
    pct: "29%",
    color: "var(--color-blue-500)",
  },
  {
    name: "Proposal",
    count: 4,
    value: "$142,000",
    pct: "29%",
    color: "var(--color-green-500)",
  },
  {
    name: "Negotiation",
    count: 2,
    value: "$68,000",
    pct: "14%",
    color: "var(--color-orange-500)",
  },
  {
    name: "Won",
    count: 1,
    value: "$82,000",
    pct: "10%",
    color: "var(--color-indigo-500)",
  },
];

const recentActivity = [
  {
    name: "Vercel",
    action: "New note added by Sarah",
    time: "2h ago",
    initials: "V",
    color: "hsl(0 0% 10%)",
  },
  {
    name: "Loom",
    action: "Opportunity moved to Proposal",
    time: "3h ago",
    initials: "L",
    color: "hsl(2 75% 55%)",
  },
  {
    name: "Notion",
    action: "Task completed by you",
    time: "4h ago",
    initials: "N",
    color: "hsl(0 0% 22%)",
  },
  {
    name: "Linear",
    action: "New contact added",
    time: "5h ago",
    initials: "Li",
    color: "hsl(0 0% 14%)",
  },
  {
    name: "Raycast",
    action: "Meeting scheduled",
    time: "6h ago",
    initials: "R",
    color: "hsl(18 100% 50%)",
  },
];

const opportunities = [
  {
    name: "Enterprise Plan",
    company: "Vercel",
    value: "$80,000",
    stage: "Proposal",
    close: "Oct 15",
    initials: "V",
    color: "hsl(0 0% 10%)",
    stageBg: "hsl(45 100% 96%)",
    stageColor: "hsl(32 95% 40%)",
  },
  {
    name: "Platform Expansion",
    company: "Linear",
    value: "$65,000",
    stage: "Negotiation",
    close: "Sep 30",
    initials: "L",
    color: "hsl(0 0% 14%)",
    stageBg: "hsl(20 100% 96%)",
    stageColor: "hsl(20 90% 48%)",
  },
  {
    name: "New Product",
    company: "Notion",
    value: "$52,000",
    stage: "Qualified",
    close: "Oct 12",
    initials: "N",
    color: "hsl(0 0% 22%)",
    stageBg: "hsl(199 89% 96%)",
    stageColor: "hsl(199 70% 38%)",
  },
  {
    name: "Security Upgrade",
    company: "Raycast",
    value: "$38,000",
    stage: "Proposal",
    close: "Oct 20",
    initials: "R",
    color: "hsl(18 100% 50%)",
    stageBg: "hsl(45 100% 96%)",
    stageColor: "hsl(32 95% 40%)",
  },
  {
    name: "Team Plan",
    company: "Loom",
    value: "$28,000",
    stage: "Lead",
    close: "Oct 28",
    initials: "L",
    color: "hsl(2 75% 55%)",
    stageBg: "hsl(210 20% 96%)",
    stageColor: "hsl(215 16% 42%)",
  },
];

const tasks = [
  {
    name: "Follow up with Sarah",
    sub: "Sarah Chen · Vercel",
    due: "Today",
    dueColor: "hsl(0 84% 60%)",
    priority: "High",
    priorityBg: "hsl(0 86% 97%)",
    priorityColor: "hsl(0 72% 51%)",
  },
  {
    name: "Proposal review",
    sub: "Ethan · Linear",
    due: "Tomorrow",
    dueColor: "hsl(38 92% 50%)",
    priority: "Medium",
    priorityBg: "hsl(45 100% 96%)",
    priorityColor: "hsl(32 95% 40%)",
  },
  {
    name: "Send pricing details",
    sub: "Notion",
    due: "Sep 19",
    dueColor: "hsl(220 9% 46%)",
    priority: "Medium",
    priorityBg: "hsl(45 100% 96%)",
    priorityColor: "hsl(32 95% 40%)",
  },
  {
    name: "Schedule product demo",
    sub: "Loom",
    due: "Sep 20",
    dueColor: "hsl(220 9% 46%)",
    priority: "Low",
    priorityBg: "hsl(142 76% 94%)",
    priorityColor: "hsl(142 71% 35%)",
  },
];

// ── Mini SVG revenue chart ────────────────────────────────────────────────────

function RevenueChart() {
  const points = [20, 35, 25, 45, 55, 70, 90];
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const pad = 3; // padding so edge circles aren't clipped
  const w = 180;
  const h = 60;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const step = innerW / (points.length - 1);
  const max = 100;

  const d = points
    .map((p, i) => {
      const x = pad + i * step;
      const y = pad + innerH - (p / max) * innerH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const fill =
    d +
    ` L ${pad + (points.length - 1) * step} ${pad + innerH} L ${pad} ${pad + innerH} Z`;

  const labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const activeValue = activePoint === null ? null : points[activePoint];

  return (
    <div className="relative w-full">
      <div className="relative aspect-[3/1]">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-full w-full"
          preserveAspectRatio="none"
        >
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(64.6% 0.222 41.116)"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="oklch(64.6% 0.222 41.116)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path d={fill} fill="url(#revGrad)" />
        <path
          d={d}
          fill="none"
          stroke="oklch(64.6% 0.222 41.116)"
          strokeWidth="1.5"
        />
        {points.map((p, i) => {
          const x = pad + i * step;
          const y = pad + innerH - (p / max) * innerH;

          return (
            <g
              key={i}
              onMouseEnter={() => setActivePoint(i)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <circle
                cx={x}
                cy={y}
                r="7"
                className="cursor-pointer"
                fill="transparent"
              />
              <circle
                cx={x}
                cy={y}
                r="2"
                fill="oklch(64.6% 0.222 41.116)"
              />
            </g>
          );
        })}
        </svg>
        {activePoint !== null && activeValue !== null && (
          <motion.div
            className="pointer-events-none absolute z-10 rounded bg-zinc-800 px-1.5 py-0.5 text-[8px] font-normal text-white shadow-sm"
            style={{
              left: `${((pad + activePoint * step) / w) * 100}%`,
              top: `${((pad + innerH - (activeValue / max) * innerH) / h) * 100}%`,
              transform: "translate(-50%, calc(-100% - 4px))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            ${activeValue}k
          </motion.div>
        )}
      </div>
      <div className="mt-1 flex justify-between px-0.5">
        {labels.map((l) => (
          <span key={l} className="text-[8px] text-zinc-400">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Sidebar icons (tiny inline SVGs) ─────────────────────────────────────────

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"></path>
      <path d="M16 17H8"></path>
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 9L11 9M8 13L11 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22"
        strokeLinejoin="round"
      ></path>
      <path d="M2 22L22 22" strokeLinecap="round"></path>
      <path
        d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.50012 3.70802C8.19389 3.57422 7.85567 3.5 7.50012 3.5C6.11941 3.5 5.00012 4.61929 5.00012 6C5.00012 6.8178 5.39279 7.54389 5.99988 8"></path>
      <path d="M3.37512 16.5C2.61573 16.5 2.00012 15.8588 2.00012 15.0677C2.00012 13.4585 3.66656 11.8492 6.50012 11.5402"></path>
      <path d="M15.4999 3.70753C15.8061 3.57374 16.1443 3.49951 16.4999 3.49951C17.8806 3.49951 18.9999 4.6188 18.9999 5.99951C18.9999 6.81731 18.6072 7.5434 18.0001 7.99951"></path>
      <path d="M20.6249 16.4995C21.3843 16.4995 21.9999 15.8582 21.9999 15.0672C21.9999 13.458 20.3335 11.8488 17.5001 11.5397"></path>
      <circle cx="12.0001" cy="8.5" r="3"></circle>
      <path d="M12.0001 14.5C8.25012 14.5 6.00012 16.6429 6.00012 18.7857C6.00012 19.7325 6.67169 20.5 7.50012 20.5H16.5001C17.3285 20.5 18.0001 19.7325 18.0001 18.7857C18.0001 16.6429 15.7501 14.5 12.0001 14.5Z"></path>
    </svg>
  );
}
function OpportunityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M15.1312 2.5C14.1462 2.17555 13.0936 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"></path>
      <path
        d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"
        strokeLinejoin="round"
      ></path>
      <path d="M19.5 4.5L12 12M19.5 4.5V2M19.5 4.5H22"></path>
    </svg>
  );
}
function TaskIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12.9961 6L20.9961 6" strokeLinecap="round"></path>
      <path d="M12.9961 12L20.9961 12" strokeLinecap="round"></path>
      <path d="M12.9961 18L20.9961 18" strokeLinecap="round"></path>
      <path
        d="M4.23073 19.3478C4.59827 19.5 5.06421 19.5 5.99609 19.5C6.92798 19.5 7.39392 19.5 7.76146 19.3478C8.25152 19.1448 8.64086 18.7554 8.84385 18.2654C8.99609 17.8978 8.99609 17.4319 8.99609 16.5C8.99609 15.5681 8.99609 15.1022 8.84385 14.7346C8.64086 14.2446 8.25152 13.8552 7.76146 13.6522C7.39392 13.5 6.92798 13.5 5.99609 13.5C5.06421 13.5 4.59827 13.5 4.23073 13.6522C3.74067 13.8552 3.35132 14.2446 3.14833 14.7346C2.99609 15.1022 2.99609 15.5681 2.99609 16.5C2.99609 17.4319 2.99609 17.8978 3.14833 18.2654C3.35132 18.7554 3.74067 19.1448 4.23073 19.3478Z"
        strokeLinejoin="round"
      ></path>
      <path
        d="M2.99609 7.16667C2.99609 7.16667 3.74609 7.16667 4.49609 8.5C4.49609 8.5 6.87845 5.16667 8.99609 4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function NotesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4961 2.00027H9.49609C8.66767 2.00027 7.99609 2.67185 7.99609 3.50027C7.99609 4.3287 8.66767 5.00027 9.49609 5.00027H14.4961C15.3245 5.00027 15.9961 4.3287 15.9961 3.50027C15.9961 2.67185 15.3245 2.00027 14.4961 2.00027Z"></path>
      <path d="M7.99609 15.0003H11.4247M7.99609 11.0003H15.9961"></path>
      <path d="M15.9961 3.50027C17.5496 3.54709 18.4761 3.72035 19.1174 4.36164C19.9961 5.24032 19.9961 6.65451 19.9961 9.4829L19.9961 15.9997C19.9961 18.8282 19.9961 20.2424 19.1174 21.1211C18.2387 21.9997 16.8245 21.9997 13.9961 21.9997L9.99609 21.9997C7.16767 21.9997 5.75346 21.9997 4.87478 21.1211C3.9961 20.2424 3.9961 18.8282 3.99609 15.9998L3.99611 9.48296C3.9961 6.65453 3.9961 5.24031 4.87478 4.36163C5.51606 3.72034 6.44261 3.54708 7.99599 3.50027"></path>
    </svg>
  );
}
function WorkflowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 4C3 2.34533 3.34533 2 5 2H9C10.6547 2 11 2.34533 11 4C11 5.65467 10.6547 6 9 6H5C3.34533 6 3 5.65467 3 4Z"></path>
      <path d="M13 13C13 11.3453 13.3453 11 15 11H19C20.6547 11 21 11.3453 21 13C21 14.6547 20.6547 15 19 15H15C13.3453 15 13 14.6547 13 13Z"></path>
      <path d="M4 20C4 18.3453 4.34533 18 6 18H10C11.6547 18 12 18.3453 12 20C12 21.6547 11.6547 22 10 22H6C4.34533 22 4 21.6547 4 20Z"></path>
      <path
        d="M17 11C17 10.5353 17 10.303 16.9616 10.1098C16.8038 9.31644 16.1836 8.69624 15.3902 8.53843C15.197 8.5 14.9647 8.5 14.5 8.5H9.5C9.03534 8.5 8.80302 8.5 8.60982 8.46157C7.81644 8.30376 7.19624 7.68356 7.03843 6.89018C7 6.69698 7 6.46466 7 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M17 15V16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H12"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function AIIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"></path>
      <path
        d="M7.5 15L9.34189 9.47434C9.43631 9.19107 9.7014 9 10 9C10.2986 9 10.5637 9.19107 10.6581 9.47434L12.5 15M15.5 9V15M8.5 13H11.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"></path>
      <path d="M20.7906 9.15201C21.5969 10.5418 22 11.2366 22 12C22 12.7634 21.5969 13.4582 20.7906 14.848L18.8669 18.1638C18.0638 19.548 17.6623 20.2402 17.0019 20.6201C16.3416 21 15.5402 21 13.9373 21L10.0627 21C8.45982 21 7.6584 21 6.99807 20.6201C6.33774 20.2402 5.93619 19.548 5.13311 18.1638L3.20942 14.848C2.40314 13.4582 2 12.7634 2 12C2 11.2366 2.40314 10.5418 3.20942 9.152L5.13311 5.83621C5.93619 4.45196 6.33774 3.75984 6.99807 3.37992C7.6584 3 8.45982 3 10.0627 3L13.9373 3C15.5402 3 16.3416 3 17.0019 3.37992C17.6623 3.75984 18.0638 4.45197 18.8669 5.83622L20.7906 9.15201Z"></path>
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"></path>
    </svg>
  );
}

function PanelLeftCloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11C21 7.22876 21 5.34315 19.8284 4.17157C18.6569 3 16.7712 3 13 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11Z"></path>
      <path d="M9 3V21"></path>
      <path d="M16 9L14.8918 9.87868C13.6306 10.8787 13 11.3787 13 12C13 12.6213 13.6306 13.1213 14.8918 14.1213L16 15"></path>
    </svg>
  );
}

function TradeUpIcon() {
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
      strokeLinejoin="round"
    >
      <path d="M20 13V8H15"></path>
      <path d="M20 8L15 13C14.1174 13.8826 13.6762 14.3238 13.1346 14.3726C13.045 14.3807 12.955 14.3807 12.8654 14.3726C12.3238 14.3238 11.8826 13.8826 11 13C10.1174 12.1174 9.67615 11.6762 9.13457 11.6274C9.04504 11.6193 8.95496 11.6193 8.86543 11.6274C8.32385 11.6762 7.88256 12.1174 7 13L4 16"></path>
    </svg>
  );
}
function TradeDownIcon() {
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
      strokeLinejoin="round"
    >
      <path d="M20 11V16H15"></path>
      <path d="M20 16L15 11C14.1174 10.1174 13.6762 9.67615 13.1346 9.62737C13.045 9.6193 12.955 9.6193 12.8654 9.62737C12.3238 9.67615 11.8826 10.1174 11 11C10.1174 11.8826 9.67615 12.3238 9.13457 12.3726C9.04504 12.3807 8.95496 12.3807 8.86543 12.3726C8.32385 12.3238 7.88256 11.8826 7 11L4 8"></path>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="8"
      height="8"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
    </svg>
  );
}
