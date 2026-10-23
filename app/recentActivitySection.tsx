"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "./utility/cn";

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "activity-1",
    title: "Lattice introduces AI-powered pipeline analysis",
    subtitle:
      "Get a clearer picture of lost opportunities, conversion trends, and the bottlenecks holding your sales pipeline back.",
    date: "Oct 12, 2026",
  },
  {
    id: "activity-2",
    title: "Faster workflows, even at scale",
    subtitle:
      "Workflow execution is now faster across large CRM datasets, helping teams process more activity with less waiting.",
    date: "Oct 08, 2026",
  },
  {
    id: "activity-3",
    title: "Understanding why deals don't close",
    subtitle:
      "A closer look at the patterns behind lost opportunities and how sales teams can use pipeline data to make better decisions.",
    date: "Oct 03, 2026",
  },
  {
    id: "activity-4",
    title: "A clearer view of every customer relationship",
    subtitle:
      "The updated activity timeline brings emails, meetings, notes, and key customer interactions into one place.",
    date: "Sep 26, 2026",
  },
  {
    id: "activity-5",
    title: "Lattice opens its public beta",
    subtitle:
      "Lattice is now available to more teams looking for a clearer, more intelligent way to manage customer relationships.",
    date: "Sep 18, 2026",
  },
  {
    id: "activity-6",
    title: "Meet your new AI activity summaries",
    subtitle:
      "Turn long customer histories into concise summaries, with the context your team needs before every conversation.",
    date: "Sep 12, 2026",
  },
  {
    id: "activity-7",
    title: "More control over your workflows",
    subtitle:
      "Build workflows around the way your team works, with more flexible triggers, conditions, and actions.",
    date: "Sep 08, 2026",
  },
  {
    id: "activity-8",
    title: "The hidden cost of a slow pipeline",
    subtitle:
      "Explore how stalled opportunities affect sales performance and which pipeline signals are worth paying attention to.",
    date: "Sep 02, 2026",
  },
  {
    id: "activity-9",
    title: "Customer data that stays in context",
    subtitle:
      "Lattice now brings related people, companies, and opportunities closer together, making customer relationships easier to understand.",
    date: "Aug 27, 2026",
  },
  {
    id: "activity-10",
    title: "Introducing the Lattice developer API",
    subtitle:
      "Connect Lattice with your existing tools and build custom integrations around your team's workflow.",
    date: "Aug 19, 2026",
  },
];

export default function RecentActivitySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(true);
  const [snapAlign, setSnapAlign] = useState<"start" | "end">("start");
  const lastScrollLeft = useRef(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const currentLeft = el.scrollLeft;
    const diff = currentLeft - lastScrollLeft.current;

    // Detect scroll direction:
    // Left-to-right (forward): snap incoming right element to the grid edge (snap-end)
    // Right-to-left (backward): snap incoming left element to the grid edge (snap-start)
    if (diff > 2) {
      if (snapAlign !== "end") setSnapAlign("end");
      lastScrollLeft.current = currentLeft;
    } else if (diff < -2) {
      if (snapAlign !== "start") setSnapAlign("start");
      lastScrollLeft.current = currentLeft;
    }

    updateMask();
  };

  const updateMask = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 4) {
      setShowLeftMask(false);
      setShowRightMask(false);
      return;
    }

    const isAtStart = scrollLeft <= 4;
    const isAtEnd = scrollLeft >= maxScroll - 4;

    setShowLeftMask(!isAtStart);
    setShowRightMask(!isAtEnd);
  };

  useEffect(() => {
    updateMask();
    window.addEventListener("resize", updateMask);
    return () => window.removeEventListener("resize", updateMask);
  }, []);

  return (
    <section className="w-full bg-zinc-100">
      {/* ── Centered Section Title ── */}
      <div className="mb-8 flex w-full flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-medium tracking-tight text-zinc-700 sm:text-5xl">
          Recent <span className="text-zinc-800">Activity.</span>
        </h2>
      </div>

      {/* ── Scrollable Cards with Animated Edge Masks ── */}
      <div className="relative w-full border-y border-zinc-200 bg-zinc-100 overflow-hidden">
        {/* Left Mask Overlay (Scale-X + Fade-In from left edge) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-zinc-100 via-zinc-100/80 to-transparent origin-left transition-all duration-300 ease-out",
            showLeftMask ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
          )}
        />

        {/* Right Mask Overlay (Scale-X + Fade-In from right edge) */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-zinc-100 via-zinc-100/80 to-transparent origin-right transition-all duration-300 ease-out",
            showRightMask ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
          )}
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory divide-x divide-zinc-200 bg-zinc-100"
        >
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "group flex h-[380px] w-[320px] sm:w-[360px] shrink-0 flex-col justify-between p-6 sm:p-8 lg:p-10 transition-colors duration-150 hover:bg-zinc-200/50 cursor-pointer",
                snapAlign === "end" ? "snap-end" : "snap-start",
              )}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium tracking-tight text-zinc-800 transition-colors duration-200 group-hover:text-zinc-950 sm:text-2xl text-pretty">
                  {activity.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-zinc-600 sm:text-base text-pretty">
                  {activity.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-2">
                <span className="text-sm font-normal text-zinc-500">
                  {activity.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
