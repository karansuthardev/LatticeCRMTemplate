"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Slider } from "./ui/slider";
import { cn } from "@/app/utility/cn";
import {
  ChevronDownIcon,
  ArrowUpIcon,
  EnterIcon,
} from "../icons";

interface LatticeModel {
  id: string;
  name: string;
  description: string;
  speed: string;
}

const PRE_PROMPTS = [
  "Which deals need my attention?",
  "Prepare me for my next meeting.",
  "Which customers need a follow-up?",
  "Give me an overview of my sales pipeline.",
  "Show me failed workflow executions.",
  "What has changed in our CRM recently?",
];

const CRM_PROMPT_ANSWERS: Record<string, string> = {
  "Which deals need my attention?":
    "Acme Technologies ($24,000) has had no activity in 12 days during negotiation. Northstar Systems ($18,500) closes in 2 days with no next step scheduled.",
  "Prepare me for my next meeting.":
    "Upcoming at 10:30 AM: Product demo with Acme Technologies (Alex Morgan, 45 minutes) to review enterprise reporting requirements.",
  "Which customers need a follow-up?":
    "Olivia Chen at Meridian Labs needs a follow-up email after yesterday's product demonstration. James Walker at Vertex Cloud is waiting on custom pricing.",
  "Give me an overview of my sales pipeline.":
    "Total pipeline is $186,000 (↑ 12% vs prior 7d) with 8 deals won, 24 new leads added this week, and 6 deals flagged at risk.",
  "Show me failed workflow executions.":
    "New Lead Assignment failed 6 executions (last failure 32 minutes ago). 4 incoming website leads are waiting for owner assignment.",
  "What has changed in our CRM recently?":
    "12m ago: Acme Technologies moved to Negotiation ($24k). 34m ago: Olivia Chen added by Sarah Wilson. 1h ago: Vertex Cloud onboarding completed.",
};

const LATTICE_MODELS: LatticeModel[] = [
  {
    id: "lattice-pulse",
    name: "Lattice Pulse",
    description: "Fast triage & rapid responses",
    speed: "Fast",
  },
  {
    id: "lattice-matrix",
    name: "Lattice Matrix",
    description: "Balanced reasoning & workflow automation",
    speed: "Standard",
  },
  {
    id: "lattice-nexus",
    name: "Lattice Nexus",
    description: "Deep multi-step analysis & revenue planning",
    speed: "Deep",
  },
];

const DEPTH_STEPS = [
  { value: 1, label: "Quick" },
  { value: 2, label: "Standard" },
  { value: 3, label: "Deep" },
];

const PAST_CHATS = [
  { id: 0, title: "Q4 renewal forecast", time: "Today, 2:15 PM" },
  { id: 1, title: "Acme Corp contract audit", time: "Yesterday" },
  { id: 2, title: "SDR outbound cadence", time: "Oct 29" },
];

function HoverIndicator({
  layoutId = "model-hover-indicator",
  rounded = "rounded-lg",
  isActive = false,
  bg = "bg-zinc-100",
}: {
  layoutId?: string;
  rounded?: string;
  isActive?: boolean;
  bg?: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className={cn("absolute inset-0 pointer-events-none", bg, rounded)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        layout: {
          type: "spring",
          bounce: 0.15,
          duration: 0.2,
        },
      }}
    />
  );
}

export default function DashboardHomeView() {
  const [selectedModelId, setSelectedModelId] = useState<string>("lattice-matrix");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const [activeChat, setActiveChat] = useState<number | null>(0);
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  const [modelDepth, setModelDepth] = useState<number>(2);
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "lattice"; text: string }>>([]);

  const modelDropdownRef = useRef<HTMLDivElement>(null);

  const currentModel = LATTICE_MODELS.find((m) => m.id === selectedModelId) || LATTICE_MODELS[1];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setModelDropdownOpen(false);
        setHoveredModel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      {
        sender: "lattice",
        text:
          CRM_PROMPT_ANSWERS[userText] ||
          `Processing with ${currentModel.name} at ${DEPTH_STEPS.find((d) => d.value === modelDepth)?.label} depth.`,
      },
    ]);
    setChatInput("");
  };

  const handleSelectPrompt = (promptText: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: promptText },
      {
        sender: "lattice",
        text:
          CRM_PROMPT_ANSWERS[promptText] ||
          `Processing with ${currentModel.name} at ${DEPTH_STEPS.find((d) => d.value === modelDepth)?.label} depth.`,
      },
    ]);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-zinc-800">
      {/* Center Main Content Area: Centered Greeting & Pre-prompts, Chat Anchored to Bottom */}
      <div className="flex flex-1 flex-col items-center justify-between overflow-y-auto px-6 py-3 scrollbar-thin">
        {/* Centered Content: Greeting & Faded Pre-prompts OR Active Conversation */}
        {messages.length === 0 ? (
          <div className="flex flex-1 w-full max-w-[480px] flex-col items-center justify-center space-y-4 my-auto">
            {/* Centered Header */}
            <div className="flex flex-col items-center text-center select-none">
              <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
                Hi, Karan
              </h1>
              <p className="mt-0.5 text-[11px] font-normal text-zinc-400">
                Overview of your priority deals and team pipeline.
              </p>
            </div>

            {/* Pre-prompts in faded text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full">
              {PRE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPrompt(prompt)}
                  className="group flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[11px] font-normal text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/70 transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] cursor-pointer"
                >
                  <span className="leading-snug">{prompt}</span>
                  <ArrowUpIcon
                    width={10}
                    height={10}
                    strokeWidth={1.5}
                    className="rotate-45 shrink-0 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out ml-1"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 w-full max-w-[480px] flex-col justify-end space-y-2 py-3 overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-100 select-none">
              <span className="text-[10px] text-zinc-400">Conversation</span>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-[10px] text-zinc-400 hover:text-zinc-700 transition-[color,transform] duration-150 ease-out active:scale-[0.97] cursor-pointer"
              >
                Reset
              </button>
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-0.5",
                    m.sender === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-1.5 text-[11px] leading-relaxed max-w-[88%]",
                      m.sender === "user"
                        ? "bg-zinc-900 text-white font-normal"
                        : "bg-zinc-100 text-zinc-800 font-normal"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section: Chat Window Anchored to Bottom */}
        <div className="w-full max-w-[480px] shrink-0 pt-2 pb-1">

          {/* Chat Window Outer Container: border, bg and paddings removed */}
          <div className="relative w-full">
            {/* Prompt widget: border-none, bg-zinc-100 */}
            <div className="flex items-center justify-between gap-3 rounded-full border-none bg-zinc-100 py-1 px-1 transition-colors focus-within:bg-zinc-100/90">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Lattice about deals, pipeline risks, or schedule..."
                className="w-full bg-transparent text-xs pl-2 font-normal text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="flex h-12 w-12 shrink-0 items-center p-1 px-2 justify-center rounded-full bg-zinc-800 border border-zinc-400 text-zinc-100 hover:bg-zinc-700 active:scale-95 duration-150 ease-out cursor-pointer shadow-xs shadow-black"
                title="Send"
              >
                <EnterIcon width={12} height={12} strokeWidth={1.75} color="currentColor" className="text-zinc-100" />
              </button>
            </div>

            {/* Model Menu tag placed AFTER prompt at bottom right */}
            <div className="relative mt-1.5 flex items-center justify-end" ref={modelDropdownRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="inline-flex items-center gap-1 rounded-md bg-transparent border-none px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/60 transition-colors cursor-pointer select-none"
                >
                  <span>{currentModel.name}</span>
                  <ChevronDownIcon
                    width={10}
                    height={10}
                    strokeWidth={1.5}
                    className={cn(
                      "text-zinc-400 transition-transform",
                      modelDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown Menu: Appears UP aligned to right (`right-0 bottom-full mb-1.5`), rounded-2xl */}
                {modelDropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseLeave={() => setHoveredModel(null)}
                    className="absolute right-0 bottom-full mb-1.5 w-48 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl z-50"
                  >
                    <div className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-normal text-zinc-400 select-none">
                      Model
                    </div>
                    <div className="space-y-0.5 mt-0.5">
                      {LATTICE_MODELS.map((model) => {
                        const isActive = selectedModelId === model.id;
                        const isHovered = hoveredModel === model.id;
                        return (
                          <button
                            key={model.id}
                            type="button"
                            onClick={() => setSelectedModelId(model.id)}
                            onMouseEnter={() => setHoveredModel(model.id)}
                            onMouseLeave={() => {
                              if (hoveredModel === model.id) setHoveredModel(null);
                            }}
                            className={cn(
                              "relative flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-left text-[10px] select-none transition-colors cursor-pointer",
                              isActive ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:text-zinc-800"
                            )}
                          >
                            <AnimatePresence>
                              {isHovered && (
                                <HoverIndicator
                                  layoutId="v2-model-hover-indicator"
                                  rounded="rounded-lg"
                                  isActive={isActive}
                                  bg="bg-zinc-100"
                                />
                              )}
                            </AnimatePresence>
                            <span className={cn("relative z-10", isActive ? "font-medium text-zinc-900" : "font-normal text-zinc-700")}>
                              {model.name}
                            </span>
                            <span className={cn("relative z-10 text-[9px]", isActive ? "text-zinc-600" : "text-zinc-400")}>
                              {model.speed}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-zinc-100" />

                    {/* Slider inside dropdown with title showing selected option */}
                    <div className="px-1.5 flex flex-col gap-1.5 pt-0.5">
                      <span className="text-[10px] font-normal text-zinc-500 select-none">
                        {DEPTH_STEPS.find((d) => d.value === modelDepth)?.label}
                      </span>
                      <Slider
                        value={modelDepth}
                        min={1}
                        max={3}
                        step={1}
                        onChange={setModelDepth}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panel: Scaled Down & Calm with Animated Hover Indicators */}
      <aside className="flex w-56 shrink-0 flex-col justify-between border-l border-zinc-100 bg-zinc-50/40 p-4">
        {/* Top: Running Agents */}
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 select-none">
            <span className="text-[11px] font-medium text-zinc-900">
              Running Agents
            </span>
            <span className="text-[10px] font-normal text-zinc-400">
              3 active
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              { title: "Lead Qualifier", desc: "Triaging Ramp Enterprise demo", active: true },
              { title: "Renewal Radar", desc: "Scanning 42 accounts", active: true },
              { title: "Pipeline Sync", desc: "Synced 4m ago", active: false },
            ].map((agent, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-zinc-200/70 bg-white p-2 transition-colors select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-zinc-800">
                    {agent.title}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      agent.active ? "bg-emerald-500" : "bg-zinc-400"
                    )}
                  />
                </div>
                <p className="mt-0.5 text-[9px] font-normal text-zinc-400">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Past Chats with Exact Sidebar Highlight Indicator */}
        <div className="pt-4 border-t border-zinc-200/60">
          <div className="flex items-center justify-between pb-2 select-none">
            <span className="text-[11px] font-medium text-zinc-900">
              Past Chats
            </span>
            <span className="text-[10px] font-normal text-zinc-400">
              History
            </span>
          </div>

          <div
            className="space-y-0.5"
            onMouseLeave={() => setHoveredChat(null)}
          >
            {PAST_CHATS.map((chat) => {
              const isActive = activeChat === chat.id;
              const isHovered = hoveredChat === chat.id;
              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => {
                    setActiveChat(chat.id);
                    setChatInput(`Review details for ${chat.title}`);
                  }}
                  onMouseEnter={() => setHoveredChat(chat.id)}
                  onMouseLeave={() => {
                    if (hoveredChat === chat.id) setHoveredChat(null);
                  }}
                  className={cn(
                    "relative flex w-full flex-col rounded-lg px-2 py-1.5 text-left select-none transition-colors cursor-pointer",
                    isActive ? "bg-zinc-200 text-zinc-900" : "text-zinc-600 hover:text-zinc-800"
                  )}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <HoverIndicator
                        layoutId="v2-past-chats-hover-indicator"
                        rounded="rounded-lg"
                        isActive={isActive}
                      />
                    )}
                  </AnimatePresence>
                  <span className={cn("relative z-10 text-[10px] truncate w-full", isActive ? "font-medium text-zinc-900" : "font-normal text-zinc-700")}>
                    {chat.title}
                  </span>
                  <span className={cn("relative z-10 text-[9px]", isActive ? "text-zinc-600 font-medium" : "text-zinc-400 font-normal")}>
                    {chat.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
