"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Slider } from "./ui/slider";
import { cn } from "@/app/utility/cn";
import {
  ChevronDownIcon,
  EnterIcon,
  MicrophoneIcon,
  OmegaIcon,
  PlusIcon,
  AutoApproveIcon,
  FullAccessIcon,
} from "../icons";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface LatticeModel {
  id: string;
  name: string;
  version?: string;
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
    id: "auto",
    name: "Auto",
    description:
      "Routes requests to the optimal model based on task complexity and context.",
    speed: "Dynamic",
  },
  {
    id: "modula-core",
    name: "Modula Core",
    version: "1.4",
    description:
      "Understands business context, interprets requests, and assists with everyday tasks.",
    speed: "Standard",
  },
  {
    id: "modula-forma",
    name: "Modula Forma",
    version: "2.1",
    description:
      "Analyzes statistics, identifies trends, and transforms data into visualizations.",
    speed: "Fast",
  },
  {
    id: "modula-scribe",
    name: "Modula Scribe",
    version: "1.2",
    description:
      "Interprets text, summarizes meetings, and extracts action items and follow-ups.",
    speed: "Deep",
  },
];

const DEPTH_STEPS = [
  { value: 1, label: "Quick" },
  { value: 2, label: "Standard" },
  { value: 3, label: "Deep" },
  { value: 4, label: "Deep Research" },
];

interface PermissionMode {
  id: "auto-approve" | "full-access";
  label: string;
  subtitle: string;
  icon: React.ComponentType<{
    width?: number | string;
    height?: number | string;
    className?: string;
    strokeWidth?: number | string;
  }>;
}

const PERMISSION_MODES: PermissionMode[] = [
  {
    id: "auto-approve",
    label: "Auto-approve",
    subtitle:
      "Asks for confirmation before modifying records or sending communications.",
    icon: AutoApproveIcon,
  },
  {
    id: "full-access",
    label: "Full access",
    subtitle:
      "Runs all CRM actions, data updates, and workflows without prompting.",
    icon: FullAccessIcon,
  },
];

const PAST_CHATS = [
  { id: 0, title: "Q4 renewal forecast", time: "Today, 2:15 PM" },
  { id: 1, title: "Acme Corp contract audit", time: "Yesterday" },
  { id: 2, title: "SDR outbound cadence", time: "Oct 29" },
];

function CircularProgress({
  value = 56,
  size = 10,
  strokeWidth = 1.5,
  className,
}: {
  value?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("shrink-0 -rotate-90", className)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="stroke-zinc-200"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        className="stroke-emerald-500 transition-[stroke-dashoffset] duration-300 ease-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

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
      layout="position"
      className={cn("pointer-events-none absolute inset-0", bg, rounded)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.16,
        ease: "easeOut",
      }}
    />
  );
}

export function QuickPromptsDropdown({
  isVisible = true,
  onSelectPrompt,
}: {
  isVisible?: boolean;
  onSelectPrompt: (prompt: string) => void;
}) {
  const [promptsExpanded, setPromptsExpanded] = useState<boolean>(false);
  const [hoveredPrompt, setHoveredPrompt] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Store the exact pixel insets required to crop the full box down to the header pill
  const [cropInsets, setCropInsets] = useState({ top: 0, right: 0 });

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current || !headerRef.current) return;
      const fullRect = containerRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();

      // Paddings: p-1 is 4px on each side (8px total)
      const collapsedWidth = headerRect.width + 8;
      const collapsedHeight = headerRect.height + 8;

      setCropInsets({
        right: Math.max(0, fullRect.width - collapsedWidth),
        top: Math.max(0, fullRect.height - collapsedHeight),
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const renderPromptItem = (prompt: string, index: number) => {
    const isHovered = hoveredPrompt === index;
    return (
      <button
        key={index}
        type="button"
        onClick={() => onSelectPrompt(prompt)}
        onMouseEnter={() => setHoveredPrompt(index)}
        className="group text-xxs relative flex w-full cursor-pointer items-center justify-between rounded-xl py-1.5 pr-2 pl-2.5 text-left font-normal text-zinc-500 transition-colors duration-150 ease-out select-none hover:text-zinc-800"
      >
        {/* Unified Hover Container: moving indicator pill and enter icon together */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              layoutId="v2-quick-prompts-indicator"
              layout="position"
              className="pointer-events-none absolute inset-0 flex items-center justify-end rounded-xl bg-zinc-100 pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.16,
                ease: "easeOut",
              }}
            >
              <EnterIcon
                width={11}
                height={11}
                strokeWidth={1.5}
                color="currentColor"
                className="text-zinc-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="relative z-10 truncate leading-snug whitespace-nowrap">
          {prompt}
        </span>

        {/* Space reservation so text never overlaps the icon */}
        <div className="pointer-events-none ml-2 h-3.5 w-3.5 shrink-0 opacity-0" />
      </button>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 6,
            transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
          }}
          className={cn(
            "pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 transition-[filter] duration-200",
            promptsExpanded && "drop-shadow-md",
          )}
        >
          {/*
            Look closely at the geometry:
            When collapsed, the box sits at `bottom-0 left-0`.
            As it expands, the WHOLE container translates upward smoothly while `clipPath`
            unveils the bottom and right edges with a live 16px border radius!
          */}
          <motion.div
            ref={containerRef}
            initial={false}
            animate={{
              clipPath: promptsExpanded
                ? "inset(0px 0px 0px 0px round 16px)"
                : `inset(${cropInsets.top}px ${cropInsets.right}px 0px 0px round 16px)`,
            }}
            transition={{
              duration: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            className={cn(
              "pointer-events-auto w-max rounded-2xl p-1 transition-colors duration-200 ease-out will-change-[clip-path]",
              promptsExpanded
                ? "border border-zinc-100 bg-zinc-50 shadow-md"
                : "border border-transparent bg-transparent shadow-none",
            )}
          >
            {/* Prompts list: Placed ABOVE the title Quick Prompts */}
            <motion.div
              initial={false}
              animate={{
                opacity: promptsExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
              onMouseLeave={() => setHoveredPrompt(null)}
              className={cn(
                "flex w-max flex-col space-y-0.5 pb-0.5",
                !promptsExpanded && "pointer-events-none",
              )}
            >
              {PRE_PROMPTS.map((prompt, idx) => renderPromptItem(prompt, idx))}
            </motion.div>

            {/* Header: Fixed at bottom-left */}
            <div
              ref={headerRef}
              className="group flex w-max cursor-pointer items-center gap-1.5 px-2 py-1 select-none"
              onClick={() => setPromptsExpanded(!promptsExpanded)}
            >
              <span className="text-xxs font-normal whitespace-nowrap text-zinc-400 transition-colors duration-150 ease-out group-hover:text-zinc-800">
                Quick prompts
              </span>
              <div className="pointer-events-none flex shrink-0 items-center justify-center p-0.5 text-zinc-400 transition-colors duration-150 ease-out group-hover:text-zinc-800">
                <motion.div
                  animate={{ rotate: promptsExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ChevronDownIcon width={12} height={12} strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DashboardHomeView() {
  const [selectedModelId, setSelectedModelId] = useState<string>("auto");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const [selectedPermissionId, setSelectedPermissionId] = useState<
    "auto-approve" | "full-access"
  >("auto-approve");
  const [permissionDropdownOpen, setPermissionDropdownOpen] = useState(false);
  const [hoveredPermission, setHoveredPermission] = useState<string | null>(
    null,
  );

  const [usagePopupOpen, setUsagePopupOpen] = useState(false);
  const usageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUsageMouseEnter = () => {
    if (usageTimeoutRef.current) clearTimeout(usageTimeoutRef.current);
    usageTimeoutRef.current = setTimeout(() => {
      setUsagePopupOpen(true);
    }, 400);
  };

  const handleUsageMouseLeave = () => {
    if (usageTimeoutRef.current) clearTimeout(usageTimeoutRef.current);
    usageTimeoutRef.current = setTimeout(() => {
      setUsagePopupOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (usageTimeoutRef.current) clearTimeout(usageTimeoutRef.current);
    };
  }, []);

  const [activeChat, setActiveChat] = useState<number | null>(0);
  const [hoveredChat, setHoveredChat] = useState<number | null>(null);

  const [modelDepth, setModelDepth] = useState<number>(2);
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "lattice"; text: string }>
  >([]);

  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const permissionDropdownRef = useRef<HTMLDivElement>(null);

  const currentModel =
    LATTICE_MODELS.find((m) => m.id === selectedModelId) || LATTICE_MODELS[0];
  const currentPermission =
    PERMISSION_MODES.find((p) => p.id === selectedPermissionId) ||
    PERMISSION_MODES[0];
  const CurrentPermissionIcon = currentPermission.icon;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setModelDropdownOpen(false);
        setHoveredModel(null);
      }
      if (
        permissionDropdownRef.current &&
        !permissionDropdownRef.current.contains(event.target as Node)
      ) {
        setPermissionDropdownOpen(false);
        setHoveredPermission(null);
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
      {/* Center Main Content Area: Relative container with NO scrollable surface */}
      <div className="relative flex h-full w-full flex-1 scrollbar-none flex-col items-center justify-center overflow-hidden px-6">
        {/* Centered Content: Greeting OR Active Conversation */}
        {messages.length === 0 ? (
          <div className="flex -translate-y-6 flex-col items-center justify-center text-center select-none">
            {/*<h1 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-900">
              Hi, Karan
            </h1>
            <p className="mt-1 text-xs font-normal text-zinc-400">
              Overview of your priority deals, pipeline risks, and team cadence.
            </p>*/}
          </div>
        ) : (
          <div className="flex w-full max-w-[480px] flex-1 flex-col justify-end space-y-2 overflow-hidden pt-6 pb-24">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-1 select-none">
              <span className="text-xxs text-zinc-400">Conversation</span>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-xxs cursor-pointer text-zinc-400 transition-[color,transform] duration-150 ease-out hover:text-zinc-700 active:scale-[0.97]"
              >
                Reset
              </button>
            </div>
            <div className="max-h-[calc(100vh-220px)] scrollbar-none space-y-2 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-0.5",
                    m.sender === "user" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-1.5 text-xs leading-relaxed",
                      m.sender === "user"
                        ? "bg-zinc-900 font-normal text-white"
                        : "bg-zinc-100 font-normal text-zinc-800",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Box: Placed Absolutely at Bottom in Center */}
        <div className="pointer-events-auto absolute bottom-3 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 px-6 sm:px-0">
          {/* Chat Window Outer Container */}
          <div className="relative w-full">
            {/* Quick Prompts Extension */}
            <QuickPromptsDropdown
              isVisible={messages.length === 0}
              onSelectPrompt={handleSelectPrompt}
            />

            {/* Stable Prompt Capsule: input and enter button stay rock-solid */}
            <div className="w-full rounded-2xl bg-zinc-100 p-1.5">
              {/* Prompt Input Row */}
              <div className="flex items-center justify-between gap-2 py-0.5 pr-0.5 pl-2">
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
                  className="w-full bg-transparent text-xs font-normal text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                />
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors duration-150 ease-out hover:bg-zinc-200/60 hover:text-zinc-700"
                    title="Voice input"
                    aria-label="Voice input"
                  >
                    <MicrophoneIcon
                      width={13}
                      height={13}
                      strokeWidth={1.5}
                      color="currentColor"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 p-1 px-2 text-zinc-100 shadow-xs duration-150 ease-out hover:bg-zinc-700"
                    title="Send"
                  >
                    <EnterIcon
                      width={12}
                      height={12}
                      strokeWidth={1.75}
                      color="currentColor"
                      className="text-zinc-100"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Prompt Footer Row: Add Button & Permission Mode on Left, Limit & Model Selector on Right */}
            <div className="relative mt-1.5 flex items-center justify-between px-1">
              {/* Left End: Add Icon Button & Permission Mode Selector */}
              <div
                className="flex items-center gap-1"
                ref={permissionDropdownRef}
              >
                <button
                  type="button"
                  className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-md text-zinc-400 transition-colors select-none hover:bg-zinc-100/60 hover:text-zinc-700"
                  title="Add attachment"
                  aria-label="Add attachment"
                >
                  <PlusIcon width={12} height={12} strokeWidth={2} />
                </button>

                {/* Permission Mode Selector Toggle */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPermissionDropdownOpen((prev) => !prev)}
                    className="text-xxs inline-flex h-5 cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-1.5 font-medium text-zinc-500 transition-colors select-none hover:bg-zinc-100/60 hover:text-zinc-800"
                  >
                    <CurrentPermissionIcon
                      width={11}
                      height={11}
                      strokeWidth={1.5}
                      className="shrink-0 text-zinc-400"
                    />
                    <span>{currentPermission.label}</span>
                    <ChevronDownIcon
                      width={10}
                      height={10}
                      strokeWidth={1.5}
                      className={cn(
                        "text-zinc-400 transition-transform",
                        permissionDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Dropdown Menu: Appears UP aligned to left (`left-0 bottom-full mb-1.5`) */}
                  <AnimatePresence>
                    {permissionDropdownOpen && (
                      <motion.div
                        key="permission-dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                        onMouseLeave={() => setHoveredPermission(null)}
                        initial={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.16,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        style={{
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                        className="absolute bottom-full left-0 z-50 mb-1.5 w-60 origin-bottom-left rounded-2xl border border-zinc-200/80 bg-zinc-50 p-1.5 shadow-xl will-change-transform select-none"
                      >
                        <div className="space-y-1">
                          {PERMISSION_MODES.map((mode) => {
                            const isActive = selectedPermissionId === mode.id;
                            const isHovered = hoveredPermission === mode.id;
                            const ModeIcon = mode.icon;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPermissionId(mode.id);
                                  setPermissionDropdownOpen(false);
                                }}
                                onMouseEnter={() =>
                                  setHoveredPermission(mode.id)
                                }
                                onMouseLeave={() => {
                                  if (hoveredPermission === mode.id)
                                    setHoveredPermission(null);
                                }}
                                className={cn(
                                  "group text-xxs relative flex w-full cursor-pointer flex-col rounded-xl p-2 text-left transition-colors select-none",
                                  isActive
                                    ? "bg-zinc-100"
                                    : "hover:text-zinc-800",
                                )}
                              >
                                <AnimatePresence>
                                  {isHovered && (
                                    <HoverIndicator
                                      layoutId="v2-permission-hover-indicator"
                                      rounded="rounded-xl"
                                      isActive={isActive}
                                      bg="bg-zinc-100"
                                    />
                                  )}
                                </AnimatePresence>
                                <div className="relative z-10 flex w-full items-center justify-between">
                                  <div className="flex items-center gap-1.5 font-medium text-zinc-800">
                                    <ModeIcon
                                      width={12}
                                      height={12}
                                      strokeWidth={1.5}
                                      className="shrink-0 text-zinc-500"
                                    />
                                    <span>{mode.label}</span>
                                  </div>
                                  {isActive && (
                                    <span className="text-xxs font-normal text-zinc-400">
                                      Active
                                    </span>
                                  )}
                                </div>
                                <div className="relative z-10 mt-1 pl-4.5 leading-snug font-normal text-zinc-500">
                                  {mode.subtitle}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right End: Grouped Model Selector & Limit Remaining */}
              <div className="flex items-center gap-1" ref={modelDropdownRef}>
                {/* Model Selector Toggle */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                    className="text-xxs inline-flex h-5 cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-1.5 font-medium text-zinc-500 transition-colors select-none hover:bg-zinc-100/60 hover:text-zinc-800"
                  >
                    <span>{currentModel.name}</span>
                    <ChevronDownIcon
                      width={10}
                      height={10}
                      strokeWidth={1.5}
                      className={cn(
                        "text-zinc-400 transition-transform",
                        modelDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Dropdown Menu: Appears UP aligned to right (`right-0 bottom-full mb-1.5`), rounded-2xl with fade + subtle scale */}
                  <AnimatePresence>
                    {modelDropdownOpen && (
                      <motion.div
                        key="model-dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                        onMouseLeave={() => setHoveredModel(null)}
                        initial={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.16,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        style={{
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                        className="absolute right-0 bottom-full z-50 mb-1.5 w-48 origin-bottom-right rounded-2xl border border-zinc-200/80 bg-zinc-50 p-2 shadow-xl will-change-transform"
                      >
                        <div className="space-y-0.5">
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
                                  if (hoveredModel === model.id)
                                    setHoveredModel(null);
                                }}
                                className={cn(
                                  "group text-xxs relative flex w-full cursor-pointer items-center rounded-lg px-2.5 py-1 text-left transition-colors select-none",
                                  isActive
                                    ? "bg-zinc-100"
                                    : "hover:text-zinc-800",
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
                                <span
                                  className={cn(
                                    "relative z-10 flex items-center gap-1.5 font-normal whitespace-nowrap transition-colors duration-150",
                                    isActive
                                      ? "text-zinc-800"
                                      : "text-zinc-700",
                                  )}
                                >
                                  <span>{model.name}</span>
                                  {model.version && (
                                    <>
                                      <span className="text-zinc-400 select-none">
                                        —
                                      </span>
                                      <span className="inline-flex items-center gap-0.5 font-normal text-zinc-600">
                                        <OmegaIcon
                                          width={10}
                                          height={10}
                                          strokeWidth={1.5}
                                          className="shrink-0 text-zinc-600"
                                        />
                                        <span>{model.version}</span>
                                      </span>
                                    </>
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Full-width Divider */}
                        <div className="-mx-2 my-1.5 border-t border-zinc-200/70" />

                        {/* Slider inside dropdown with selected depth value on left */}
                        <div className="flex flex-col gap-1.5 px-2.5 pb-0.5">
                          <div className="text-xxs flex items-center select-none">
                            <span className="font-normal text-zinc-800">
                              {
                                DEPTH_STEPS.find((d) => d.value === modelDepth)
                                  ?.label
                              }
                            </span>
                          </div>
                          <Slider
                            value={modelDepth}
                            min={1}
                            max={4}
                            step={1}
                            onChange={setModelDepth}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Limit Remaining: placed after model selector (hovers with 400ms delay to show limits) */}
                <div className="relative">
                  <button
                    type="button"
                    onMouseEnter={handleUsageMouseEnter}
                    onMouseLeave={handleUsageMouseLeave}
                    onClick={() => setUsagePopupOpen((prev) => !prev)}
                    className="text-xxs inline-flex h-5 cursor-pointer items-center gap-1.5 rounded-md px-1.5 text-zinc-500 transition-colors select-none hover:bg-zinc-100/60 hover:text-zinc-800"
                    aria-label="Usage limits"
                  >
                    <span>56%</span>
                    <CircularProgress value={56} size={10} strokeWidth={1.5} />
                  </button>

                  {/* Usage Limits Popup */}
                  <AnimatePresence>
                    {usagePopupOpen && (
                      <motion.div
                        key="usage-limits-popup"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.16,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        style={{
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                        onMouseEnter={handleUsageMouseEnter}
                        onMouseLeave={handleUsageMouseLeave}
                        className="absolute right-0 bottom-full z-50 mb-1.5 w-56 origin-bottom-right rounded-2xl border border-zinc-200/80 bg-zinc-50 p-3 shadow-xl will-change-transform select-none"
                      >
                        <div className="flex flex-col gap-2.5">
                          {/* 5hr Limit Item */}
                          <div className="flex flex-col gap-1">
                            <div className="text-xxs flex items-center justify-between">
                              <span className="font-normal text-zinc-800">
                                5hr limit
                              </span>
                              <span className="font-normal text-zinc-600">
                                56% left
                              </span>
                            </div>
                            {/* Micro linear progress bar */}
                            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200/70">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
                                style={{ width: "56%" }}
                              />
                            </div>
                            <div className="text-xxs font-normal text-zinc-600">
                              Resets in 2h 14m
                            </div>
                          </div>

                          {/* Full-width Divider */}
                          <div className="-mx-3 border-t border-zinc-200/70" />

                          {/* Weekly Limit Item */}
                          <div className="flex flex-col gap-1">
                            <div className="text-xxs flex items-center justify-between">
                              <span className="font-normal text-zinc-800">
                                Weekly limit
                              </span>
                              <span className="font-normal text-zinc-600">
                                82% left
                              </span>
                            </div>
                            {/* Micro linear progress bar */}
                            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200/70">
                              <div
                                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
                                style={{ width: "82%" }}
                              />
                            </div>
                            <div className="text-xxs font-normal text-zinc-600">
                              Resets Monday at 9:00 AM
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panel: Scaled Down & Calm with Animated Hover Indicators */}
      <aside className="flex w-56 shrink-0 flex-col justify-between border-l border-zinc-100 bg-zinc-50/40 p-4">
        {/* Top: Running Agents */}
        <div>
          <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2 select-none">
            <span className="text-xs font-medium text-zinc-900">
              Running Agents
            </span>
            <span className="text-xxs font-normal text-zinc-400">3 active</span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              {
                title: "Lead Qualifier",
                desc: "Triaging Ramp Enterprise demo",
                active: true,
              },
              {
                title: "Renewal Radar",
                desc: "Scanning 42 accounts",
                active: true,
              },
              { title: "Pipeline Sync", desc: "Synced 4m ago", active: false },
            ].map((agent, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-zinc-200/70 bg-white p-2 transition-colors select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xxs font-medium text-zinc-800">
                    {agent.title}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      agent.active ? "bg-emerald-500" : "bg-zinc-400",
                    )}
                  />
                </div>
                <p className="text-xxs mt-0.5 font-normal text-zinc-400">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Past Chats with Exact Sidebar Highlight Indicator */}
        <div className="border-t border-zinc-200/60 pt-4">
          <div className="flex items-center justify-between pb-2 select-none">
            <span className="text-xs font-medium text-zinc-900">
              Past Chats
            </span>
            <span className="text-xxs font-normal text-zinc-400">History</span>
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
                    "relative flex w-full cursor-pointer flex-col rounded-lg px-2 py-1.5 text-left transition-colors select-none",
                    isActive
                      ? "bg-zinc-200 text-zinc-900"
                      : "text-zinc-600 hover:text-zinc-800",
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
                  <span
                    className={cn(
                      "text-xxs relative z-10 w-full truncate",
                      isActive
                        ? "font-medium text-zinc-900"
                        : "font-normal text-zinc-700",
                    )}
                  >
                    {chat.title}
                  </span>
                  <span
                    className={cn(
                      "text-xxs relative z-10",
                      isActive
                        ? "font-medium text-zinc-600"
                        : "font-normal text-zinc-400",
                    )}
                  >
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
