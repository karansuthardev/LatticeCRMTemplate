"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utility/cn";
import {
  HomeIcon,
  InboxIcon,
  TasksIcon,
  MeetingsIcon,
  FileNotesIcon,
  DatabaseRecordsIcon,
  AllRecordsTableIcon,
  UsersRoundedIcon,
  BuildingCompanyIcon,
  DealIcon,
  WorkflowsIcon,
  PlayTriangleIcon,
  DraftWorkflowIcon,
  ReportsIcon,
  ChevronDownIcon,
  CommandIcon,
  PanelLeftCloseIcon,
  LatticeLogoIcon,
} from "../icons";

interface DashboardV2Props {
  className?: string;
}

function HoverIndicator({
  rounded = "rounded-lg",
  isActive = false,
}: {
  rounded?: string;
  isActive?: boolean;
}) {
  return (
    <motion.div
      layoutId="v2-sidebar-hover-indicator"
      className={cn("absolute inset-0 bg-zinc-200 pointer-events-none", rounded)}
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

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ComponentType<{
    width?: number | string;
    height?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  activeItem: string;
  hoveredItem: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  badge?: React.ReactNode;
  isSubItem?: boolean;
}

function NavItem({
  id,
  label,
  icon: Icon,
  activeItem,
  hoveredItem,
  onSelect,
  onHover,
  badge,
  isSubItem = false,
}: NavItemProps) {
  const isActive = activeItem === id;
  const isHovered = hoveredItem === id;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => {
        if (hoveredItem === id) onHover(null);
      }}
      className={cn(
        "relative flex w-full items-center justify-between select-none",
        isSubItem
          ? "rounded-md px-2 py-1 text-[10px]"
          : "rounded-lg px-2.5 py-1.5 text-xs",
        isActive ? "bg-zinc-200 text-zinc-800" : "text-zinc-600"
      )}
    >
      <AnimatePresence>
        {isHovered && (
          <HoverIndicator
            rounded={isSubItem ? "rounded-md" : "rounded-lg"}
            isActive={isActive}
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex items-center gap-2.5 min-w-0 leading-none">
        <Icon
          width={isSubItem ? 14 : 16}
          height={isSubItem ? 14 : 16}
          strokeWidth={1.5}
          className={cn(
            "shrink-0",
            isActive ? "text-zinc-700" : "text-zinc-500"
          )}
        />
        <span className="truncate leading-none">{label}</span>
      </div>
      {badge && <span className="relative z-10 flex items-center leading-none">{badge}</span>}
    </button>
  );
}

// Top Primary Navigation
const PRIMARY_NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    badge: <span className="text-[10px] text-zinc-400">3</span>,
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: InboxIcon,
    badge: <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />,
  },
  { id: "tasks", label: "Tasks", icon: TasksIcon },
  { id: "meetings", label: "Meetings", icon: MeetingsIcon },
  { id: "notes", label: "Notes", icon: FileNotesIcon },
];

// Records Sub-items
const RECORD_SUB_ITEMS = [
  { id: "all-records", label: "All records", icon: AllRecordsTableIcon },
  { id: "people", label: "People", icon: UsersRoundedIcon },
  { id: "companies", label: "Companies", icon: BuildingCompanyIcon },
  { id: "deals", label: "Deals", icon: DealIcon },
];

// Workflows Sub-items
const WORKFLOW_SUB_ITEMS = [
  { id: "all-workflows", label: "All workflows", icon: WorkflowsIcon },
  { id: "active-workflows", label: "Active", icon: PlayTriangleIcon },
  { id: "draft-workflows", label: "Drafts", icon: DraftWorkflowIcon },
];

export default function DashboardV2({ className }: DashboardV2Props) {
  const [activeItem, setActiveItem] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [recordsOpen, setRecordsOpen] = useState(true);
  const [workflowsOpen, setWorkflowsOpen] = useState(true);

  return (
    <div
      className={cn(
        "relative flex h-[620px] w-[1100px] max-w-full flex-col rounded-2xl border border-zinc-200 bg-zinc-100 shadow-2xl overflow-hidden text-zinc-800",
        className
      )}
    >
      {/* Header */}
      <div className="relative flex h-8 w-full shrink-0 items-center justify-center border-b border-zinc-200 px-4">
        {/* Mac window controls */}
        <div className="absolute left-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
        </div>

        {/* Center title */}
        <span className="text-xs font-medium text-zinc-500 select-none">
          Lattice
        </span>
      </div>

      {/* Body: Left Sidebar (no border-right) + Content Area */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className="flex w-56 shrink-0 flex-col gap-1 px-3 pt-2.5 pb-3"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {/* Workspace / Brand Switcher Header at top */}
          <div
            className="mb-2 flex items-center justify-between px-1"
            onMouseEnter={() => setHoveredItem(null)}
          >
            <button
              type="button"
              className="flex items-center gap-2 select-none group cursor-pointer"
            >
              {/* Square container with bg-zinc-900 and white/zinc-50 Lattice logo */}
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-900 shadow-2xs">
                <LatticeLogoIcon width={14} height={14} color="#fafafa" />
              </div>

              {/* Generic text name */}
              <span className="text-xs font-medium text-zinc-800 tracking-tight">
                Lattice
              </span>

              {/* Arrow down to say it's switchable */}
              <ChevronDownIcon
                width={14}
                height={14}
                strokeWidth={2}
                className="text-zinc-600 transition-colors group-hover:text-zinc-800"
              />
            </button>

            {/* Sidebar close icon */}
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              title="Close sidebar"
            >
              <PanelLeftCloseIcon width={16} height={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Search bar */}
          <div className="mb-2" onMouseEnter={() => setHoveredItem(null)}>
            <div className="group flex items-center gap-2 rounded-lg border border-zinc-200 bg-transparent px-2.5 py-1.5 text-xs text-zinc-600 transition-colors duration-200 focus-within:bg-zinc-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-zinc-500"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-zinc-600 placeholder:text-zinc-600 focus:text-zinc-800 focus:placeholder:text-zinc-400 focus:outline-none transition-colors duration-200"
              />
              <span className="flex items-center gap-0.5 rounded px-1 py-0.5 text-[10px] text-zinc-600 bg-zinc-200 select-none">
                <CommandIcon width={10} height={10} strokeWidth={2} />
                <span>K</span>
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-1 flex-col gap-0.5 pr-0.5">
            {/* Primary Nav: Home, Inbox, Tasks, Meetings, Notes */}
            {PRIMARY_NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                badge={item.badge}
                activeItem={activeItem}
                hoveredItem={hoveredItem}
                onSelect={setActiveItem}
                onHover={setHoveredItem}
              />
            ))}

            {/* Records Section (All records, People, Companies, Deals) */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setRecordsOpen(!recordsOpen)}
                onMouseEnter={() => setHoveredItem("records-header")}
                onMouseLeave={() => {
                  if (hoveredItem === "records-header") setHoveredItem(null);
                }}
                className="relative flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs select-none text-zinc-600"
              >
                <AnimatePresence>
                  {hoveredItem === "records-header" && <HoverIndicator />}
                </AnimatePresence>
                <div className="relative z-10 flex items-center gap-2.5 min-w-0">
                  <DatabaseRecordsIcon
                    width={16}
                    height={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-zinc-500"
                  />
                  <span className="truncate">Records</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "relative z-10 text-zinc-500 transition-transform duration-200",
                    recordsOpen && "rotate-90"
                  )}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {recordsOpen && (
                <div className="mt-0.5 mb-1.5 ml-4 flex flex-col gap-0.5 border-l border-zinc-200/70 pl-2">
                  {RECORD_SUB_ITEMS.map((subItem) => (
                    <NavItem
                      key={subItem.id}
                      id={subItem.id}
                      label={subItem.label}
                      icon={subItem.icon}
                      isSubItem
                      activeItem={activeItem}
                      hoveredItem={hoveredItem}
                      onSelect={setActiveItem}
                      onHover={setHoveredItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Workflows Section (All workflows, Active, Drafts) */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setWorkflowsOpen(!workflowsOpen)}
                onMouseEnter={() => setHoveredItem("workflows-header")}
                onMouseLeave={() => {
                  if (hoveredItem === "workflows-header") setHoveredItem(null);
                }}
                className="relative flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs select-none text-zinc-600"
              >
                <AnimatePresence>
                  {hoveredItem === "workflows-header" && <HoverIndicator />}
                </AnimatePresence>
                <div className="relative z-10 flex items-center gap-2.5 min-w-0">
                  <WorkflowsIcon
                    width={16}
                    height={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-zinc-500"
                  />
                  <span className="truncate">Workflows</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "relative z-10 text-zinc-500 transition-transform duration-200",
                    workflowsOpen && "rotate-90"
                  )}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {workflowsOpen && (
                <div className="mt-0.5 mb-1.5 ml-4 flex flex-col gap-0.5 border-l border-zinc-200/70 pl-2">
                  {WORKFLOW_SUB_ITEMS.map((subItem) => (
                    <NavItem
                      key={subItem.id}
                      id={subItem.id}
                      label={subItem.label}
                      icon={subItem.icon}
                      isSubItem
                      activeItem={activeItem}
                      hoveredItem={hoveredItem}
                      onSelect={setActiveItem}
                      onHover={setHoveredItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Reports */}
            <NavItem
              id="reports"
              label="Reports"
              icon={ReportsIcon}
              activeItem={activeItem}
              hoveredItem={hoveredItem}
              onSelect={setActiveItem}
              onHover={setHoveredItem}
            />
          </nav>

          {/* User Profile / Settings at Bottom of Sidebar */}
          <div className="mt-auto pt-2" onMouseEnter={() => setHoveredItem(null)}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-1.5 transition-colors select-none text-left hover:bg-zinc-200"
            >
              <div className="flex items-center gap-2.5 min-w-0 leading-none">
                {/* Profile Avatar (Circular with outline - size 6 / 24px) */}
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-200 ring-1 ring-zinc-200 shadow-2xs">
                  <Image
                    src="/karansuthar.webp"
                    alt="Karan Suthar"
                    fill
                    sizes="48px"
                    quality={95}
                    className="object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="min-w-0 text-left flex items-center">
                  <span className="truncate text-xs font-normal text-zinc-800 leading-none">
                    Karan Suthar
                  </span>
                </div>
              </div>

              {/* Single Chevron icon (12px) */}
              <div className="shrink-0 text-zinc-500 flex items-center">
                <ChevronDownIcon width={12} height={12} strokeWidth={2} />
              </div>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-2">
          <div className="h-full w-full rounded-xl bg-white/50 border border-zinc-200/60 p-4">
            {/* Ready for the specific view content */}
          </div>
        </main>
      </div>
    </div>
  );
}
