"use client";
import { easeOut, motion } from "motion/react";
import AccordionWrapper from "./components/accordionWrapper";
import { useEffect, useState } from "react";
import { cn } from "./utility/cn";

export default function Home() {
  const faqs = [
    {
      title: "How does it work?",
      subtitle:
        "A single workspace where your team can manage customers, conversations, deals, and follow-ups without switching between different tools, keeping your entire sales process organized and easy to understand.",
    },
    {
      title: "Who is it for?",
      subtitle:
        "Built for modern teams that are growing quickly and need a CRM that keeps customer relationships organized without adding unnecessary complexity, configuration, or another system everyone has to learn.",
    },
    {
      title: "Can I try it?",
      subtitle:
        "Explore the entire workflow before making a commitment, from adding your first customer to managing active deals and understanding exactly how everything fits into your team's daily work.",
    },
    {
      title: "Can I import data?",
      subtitle:
        "Bring your existing contacts, companies, and deals into your workspace in one place, so your team can start working immediately without spending days rebuilding information you already have.",
    },
    {
      title: "Can my team use it?",
      subtitle:
        "Give everyone involved in your customer workflow their own workspace, permissions, and visibility, while keeping the entire team aligned around customers, conversations, deals, and everything that needs attention.",
    },
  ];

  return (
    <div className="h-screen w-full bg-zinc-100 font-sans">
      <main className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-center border-x border-neutral-900 border-zinc-200 bg-zinc-100 px-16 py-32"></main>
    </div>
  );
}
