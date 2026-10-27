"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon, TrendUpIcon, TrendDownIcon } from "./icons";

const AUTO_SCROLL_DURATION = 6000; // 6 seconds auto-scroll timer

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  conversionRate: {
    value: string;
    change: string;
    subtext: string;
  };
  salesCycle: {
    value: string;
    change: string;
    subtext: string;
  };
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "CEO & Co-founder",
    company: "Vance Systems",
    image: "/marcus_vance.jpg",
    quote:
      "Lattice has taken a lot of the friction out of our sales process. We spend less time chasing updates, piecing together customer history, and figuring out what needs attention. Our team can focus on selling, follow-ups happen faster, and we’ve seen a noticeable improvement in pipeline velocity.",
    conversionRate: {
      value: "42.8%",
      change: "+14.6%",
      subtext: "lead to client",
    },
    salesCycle: {
      value: "18 days",
      change: "-12 days",
      subtext: "avg. deal close time",
    },
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "VP of Revenue Operations",
    company: "Stratum Dynamics",
    image: "/elena_rostova.jpg",
    quote:
      "Before automating our pipelines, deals would sit untouched for days before an AE noticed. Lattice flags bottlenecks immediately and prepares follow-ups automatically. Our team closes more qualified accounts every month with significantly less manual CRM hygiene.",
    conversionRate: {
      value: "38.2%",
      change: "+11.4%",
      subtext: "lead to client",
    },
    salesCycle: {
      value: "15 days",
      change: "-9 days",
      subtext: "avg. deal close time",
    },
  },
  {
    id: "aravind-patel",
    name: "Aravind Patel",
    role: "Head of Global Sales",
    company: "Meridian Labs",
    image: "/aravind_patel.jpg",
    quote:
      "The automatic deal triage and lead enrichment transformed our SDR productivity. Reps know exactly who to reach out to each morning with full contextual intelligence, which halved our ramp time and accelerated deal velocity across every territory.",
    conversionRate: {
      value: "47.5%",
      change: "+18.2%",
      subtext: "lead to client",
    },
    salesCycle: {
      value: "14 days",
      change: "-11 days",
      subtext: "avg. deal close time",
    },
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Chief Operating Officer",
    company: "Kinetic Velocity",
    image: "/sarah_jenkins.jpg",
    quote:
      "Connecting our disparate CRM data into Lattice gave leadership immediate, unskewed visibility into true deal stages. It eliminated forecast guesswork and cut our sales cycle by almost two weeks in our very first quarter.",
    conversionRate: {
      value: "51.0%",
      change: "+16.8%",
      subtext: "lead to client",
    },
    salesCycle: {
      value: "12 days",
      change: "-14 days",
      subtext: "avg. deal close time",
    },
  },
  {
    id: "carlos-mendez",
    name: "Carlos Mendez",
    role: "VP of Growth & Strategy",
    company: "Vanguard Partners",
    image: "/carlos_mendez.jpg",
    quote:
      "Our win rate skyrocketed once we automated inbound routing and multi-channel follow-ups. Prospects get touched within minutes instead of hours, keeping buyer intent at peak engagement when it matters most.",
    conversionRate: {
      value: "44.3%",
      change: "+13.9%",
      subtext: "lead to client",
    },
    salesCycle: {
      value: "16 days",
      change: "-8 days",
      subtext: "avg. deal close time",
    },
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [timerKey, setTimerKey] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    setTimerKey((k) => k + 1); // Reset timer on manual click
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    setTimerKey((k) => k + 1); // Reset timer on manual click
  };

  // Auto-scroll effect: advances to next testimonial every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setTimerKey((k) => k + 1);
    }, AUTO_SCROLL_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full border-b border-zinc-200 bg-zinc-100">
      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="mx-auto mb-12 flex w-fit flex-col items-center gap-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-700 text-pretty">
          Real impact on <span className="text-zinc-800">real businesses.</span>
        </h2>
      </div>

      <div className="relative w-full border-t border-zinc-200">
        <div className="grid w-full grid-cols-1 sm:h-[440px] lg:h-[440px] lg:grid-cols-12 lg:divide-x lg:divide-zinc-200">
          
          {/* ── First Column: Image (B&W default, color on hover, smooth cross-fade) ─── */}
          <div className="group/img relative hidden lg:flex h-[320px] sm:h-[380px] lg:h-full w-full items-center justify-center overflow-hidden bg-zinc-200 lg:col-span-3 cursor-pointer">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={current.image}
                  alt={`${current.name}, ${current.role} at ${current.company}`}
                  fill
                  priority
                  className="object-cover object-center grayscale contrast-[1.05] transition-all duration-500 ease-out group-hover/img:grayscale-0 group-hover/img:contrast-100"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Second Column: Testimonial & Person Info ────────────── */}
          <div className="flex h-full flex-col justify-between p-8 sm:p-0 sm:pt-10 lg:p-10 lg:col-span-6 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-full flex-col justify-between gap-6 sm:gap-0 lg:gap-6"
              >
                {/* Quote */}
                <blockquote className="min-h-[190px] sm:min-h-0 sm:flex-1 sm:px-10 sm:pb-6 lg:p-0 text-lg sm:text-xl font-normal leading-relaxed text-zinc-800 text-pretty line-clamp-8 sm:line-clamp-none">
                  “{current.quote}”
                </blockquote>

                {/* Mobile Metrics Row */}
                <div className="flex divide-x divide-zinc-200 -mx-8 sm:mx-0 border-y sm:border-b-0 border-zinc-200 lg:hidden">
                  <div className="flex flex-1 flex-col items-center md:items-start justify-center px-8 sm:px-10 py-5">
                    <span className="text-xs font-normal text-zinc-500">
                      Conversion Rate
                    </span>
                    <div className="flex flex-col items-center gap-1 mt-2 md:flex-row md:items-baseline md:justify-start md:gap-3">
                      <span className="text-[clamp(1.25rem,7vw,1.875rem)] font-medium tracking-tight text-zinc-800">
                        {current.conversionRate.value}
                      </span>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <TrendUpIcon width={16} height={16} strokeWidth={1.75} className="shrink-0" />
                        <span className="text-sm font-medium">{current.conversionRate.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-center md:items-start justify-center px-5 sm:px-10 py-5">
                    <span className="text-xs font-normal text-zinc-500">
                      Avg. Sales Cycle
                    </span>
                    <div className="flex flex-col items-center gap-1 mt-2 md:flex-row md:items-baseline md:justify-start md:gap-3">
                      <span className="text-[clamp(1.25rem,7vw,1.875rem)] font-medium tracking-tight text-zinc-800">
                        {current.salesCycle.value.replace(" days", "D")}
                      </span>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <TrendDownIcon width={16} height={16} strokeWidth={1.75} className="shrink-0" />
                        <span className="text-sm font-medium">{current.salesCycle.change}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Info & Tablet Arrow Controls Bar */}
                <div className="flex items-stretch justify-between sm:border-t sm:border-zinc-200 lg:border-t-0">
                  <div className="flex items-center gap-3 sm:px-10 sm:py-5 lg:p-0">
                    {/* Small square avatar - mobile & tablet */}
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded lg:hidden">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover object-center"
                        sizes="44px"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-medium text-zinc-900">
                        {current.name}
                      </span>
                      <span className="text-sm font-normal text-zinc-500">
                        {current.role}, {current.company}
                      </span>
                    </div>
                  </div>

                  {/* Tablet Arrow Controls - Square buttons filling full height */}
                  <div className="hidden sm:grid lg:hidden grid-cols-2 divide-x divide-zinc-200 border-l border-zinc-200 self-stretch shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="group flex aspect-square h-full items-center justify-center bg-zinc-100 transition-colors hover:bg-zinc-200/70 active:bg-zinc-200 cursor-pointer"
                    >
                      <ArrowLeftIcon
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                        className="text-zinc-600 transition-transform duration-100 ease-out group-hover:-translate-x-0.5 group-hover:text-zinc-900 active:scale-95"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="group relative flex aspect-square h-full items-center justify-center overflow-hidden bg-zinc-100 transition-colors hover:bg-zinc-200/70 active:bg-zinc-200 cursor-pointer"
                    >
                      <ArrowRightIcon
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                        className="text-zinc-600 transition-transform duration-100 ease-out group-hover:translate-x-0.5 group-hover:text-zinc-900 active:scale-95"
                      />
                      {/* Tablet autoscroll progress line */}
                      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-1 bg-transparent z-10">
                        <motion.div
                          key={`tablet-timer-${currentIndex}-${timerKey}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: AUTO_SCROLL_DURATION / 1000,
                            ease: "linear",
                          }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Third Column: Three Rows (2 Metrics + Controls) ──────── */}
          <div className="hidden lg:grid h-full grid-rows-3 divide-y divide-zinc-200 lg:col-span-3">
            
            {/* Row 1: Conversion Rate Metric */}
            <div className="flex flex-col justify-center p-6 bg-zinc-100">
              <span className="text-sm font-normal text-zinc-600">
                Conversion Rate
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`conv-${current.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-baseline justify-between gap-3 mt-4"
                >
                  <span className="text-5xl font-medium tracking-tight text-zinc-800">
                    {current.conversionRate.value}
                  </span>
                  
                  {/* Unbadged trend increment with new TrendUpIcon */}
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <TrendUpIcon width={22} height={22} strokeWidth={1.75} className="shrink-0" />
                    <span className="text-lg font-medium tracking-tight">
                      {current.conversionRate.change}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Row 2: Avg Sales Cycle Metric */}
            <div className="flex flex-col justify-center p-6  bg-zinc-100">
              <span className="text-sm font-normal text-zinc-600">
                Avg. Sales Cycle
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`cycle-${current.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-baseline justify-between gap-3 mt-4"
                >
                  <span className="text-5xl font-medium tracking-tight text-zinc-800">
                    {current.salesCycle.value}
                  </span>

                  {/* Unbadged trend decrement with new TrendDownIcon */}
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <TrendDownIcon width={22} height={22} strokeWidth={1.75} className="shrink-0" />
                    <span className="text-lg font-medium tracking-tight">
                      {current.salesCycle.change}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Row 3: Split Button Container (Each half is a button, same height as rows 1 & 2) */}
            <div className="grid grid-cols-2 divide-x divide-zinc-200 h-full">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="group flex h-full w-full items-center justify-center bg-zinc-100 transition-colors duration-200 hover:bg-zinc-200/70 active:bg-zinc-200 cursor-pointer"
              >
                <ArrowLeftIcon
                  width={28}
                  height={28}
                  strokeWidth={1.5}
                  className="text-zinc-600 transition-transform duration-100 ease-out group-hover:-translate-x-1 group-hover:text-zinc-900 active:scale-95 group-active:scale-95"
                />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-100 transition-colors duration-200 hover:bg-zinc-200/70 active:bg-zinc-200 cursor-pointer"
              >
                <ArrowRightIcon
                  width={28}
                  height={28}
                  strokeWidth={1.5}
                  className="text-zinc-600 transition-transform duration-100 ease-out group-hover:translate-x-1 group-hover:text-zinc-900 active:scale-95 group-active:scale-95"
                />

                {/* Auto-scroll progress timer line at the bottom of the next button */}
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-1 bg-transparent z-10">
                  <motion.div
                    key={`timer-${currentIndex}-${timerKey}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTO_SCROLL_DURATION / 1000,
                      ease: "linear",
                    }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </button>
            </div>

          </div>

          {/* Auto-scroll progress line spanning the bottom of the whole section on mobile only */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-1 bg-zinc-200 sm:hidden overflow-hidden z-10">
            <motion.div
              key={`progress-full-${currentIndex}-${timerKey}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTO_SCROLL_DURATION / 1000,
                ease: "linear",
              }}
              className="h-full bg-orange-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
