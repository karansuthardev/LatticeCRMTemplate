"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeOut } from "motion/react";

interface ContextFile {
  name: string;
  source: string;
  detail: string;
}

const contextFiles: ContextFile[] = [
  {
    name: "deal_activity.log",
    source: "Deal activity",
    detail: "12 interactions reviewed",
  },
  {
    name: "recent_call.txt",
    source: "Recent call",
    detail: "Acme mentioned concerns about implementation time.",
  },
  {
    name: "email_history.eml",
    source: "Email history",
    detail: "Asked about migration from their current CRM.",
  },
  {
    name: "meeting_notes.md",
    source: "Meeting notes",
    detail: "Decision depends on the operations team's approval.",
  },
];

type ChatPhase = "thinking" | "collecting" | "answering" | "done";

export default function AgentChatCard() {
  const [phase, setPhase] = useState<ChatPhase>("thinking");
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(
    null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when chat updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [phase, isContextExpanded]);

  // Sequenced animation loop
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function startCycle() {
      setPhase("thinking");
      setIsContextExpanded(false);
      setSelectedAttachment(null);
      setShowAttachMenu(false);

      // 1. Thinking -> Collecting context (shows filenames)
      timers.push(
        setTimeout(() => {
          setPhase("collecting");
        }, 1300),
      );

      // 2. Collecting -> Answering (shrinks to pill with dropdown, answer streams in)
      timers.push(
        setTimeout(() => {
          setPhase("answering");
        }, 3200),
      );
      //
      //       // 3. Answering -> Done
      //       timers.push(
      //         setTimeout(() => {
      //           setPhase("done");
      //         }, 4200)
      //       );
      //
      //       // 4. Hold for reading, then loop
      //       timers.push(
      //         setTimeout(() => {
      //           startCycle();
      //         }, 12500)
      //       );
    }

    startCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleRedo = () => {
    setPhase("thinking");
    setIsContextExpanded(false);
    setTimeout(() => setPhase("collecting"), 1100);
    setTimeout(() => setPhase("answering"), 2800);
    setTimeout(() => setPhase("done"), 3800);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
    handleRedo();
  };

  return (
    <div className="relative flex h-110 w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xl">
      {/* ── Window Header ─────────────────────────────────────────── */}
      <header className="relative flex shrink-0 items-center justify-center border-b border-zinc-200 bg-zinc-100 px-4 py-2.5">
        <div className="absolute left-4 flex flex-row gap-1">
          <div className="h-3 w-3 rounded-full border border-red-600 bg-red-500" />
          <div className="h-3 w-3 rounded-full border border-yellow-600 bg-yellow-500" />
          <div className="h-3 w-3 rounded-full border border-green-600 bg-green-500" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-800">
          <span>Agent Chat</span>
        </div>
      </header>

      {/* ── Chat Messages Body ───────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex flex-1 scrollbar-none flex-col gap-3.5 overflow-y-auto p-4"
      >
        {/* User Prompt */}
        <div className="flex justify-end">
          <div className="flex max-w-[85%] flex-col items-end gap-1">
            <div className="rounded-2xl rounded-br-xs bg-zinc-200 px-4 py-2 text-xs font-medium text-zinc-800">
              What are Acme’s biggest concerns about this deal?
            </div>
            <span className="pr-1 text-[9px] text-zinc-400">
              Today 10:14 AM
            </span>
          </div>
        </div>

        {/* AI Agent Response Thread */}
        <div className="flex items-start gap-2.5">
          <div className="flex flex-1 flex-col gap-2">
            {/* Step 1: "Thinking..." */}
            {phase === "thinking" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex w-fit items-center gap-2 rounded-xl text-[10px] text-zinc-700"
              >
                <LoadingSpinner />
                <span>Thinking…</span>
              </motion.div>
            )}

            {/* Step 2: "Collecting context from [filenames]..." */}
            {phase === "collecting" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-1 rounded-xl  text-[10px]"
              >
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span className="font-medium text-zinc-700">
                    Collecting context…
                  </span>
                </div>
                <p className="pl-5 font-mono text-[10px] leading-relaxed text-zinc-500">
                  <span className="font-normal text-zinc-700">
                    deal_activity.log
                  </span>
                  ,{" "}
                  <span className="font-normal text-zinc-700">
                    recent_call.txt
                  </span>
                  ,{" "}
                  <span className="font-normal text-zinc-700">
                    email_history.eml
                  </span>
                  ,{" "}
                  <span className="font-normal text-zinc-700">
                    meeting_notes.md
                  </span>
                </p>
              </motion.div>
            )}

            {/* Step 3: Shrunk to single first file + dropdown chevron icon */}
            {(phase === "answering" || phase === "done") && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {/* Expanded Context List */}
                  <button
                    type="button"
                    onClick={() => setIsContextExpanded((prev) => !prev)}
                    className="flex w-fit items-center gap-2 rounded-lg  py-1 text-[10px] font-medium text-zinc-600 "
                  >
                    <FileTextIcon />
                    <span className="font-mono text-[10px] text-zinc-800">
                      {contextFiles[0].name}
                    </span>
                    <span className="text-[10px] font-normal text-zinc-400">
                      +{contextFiles.length - 1} files
                    </span>
                    <motion.span
                      animate={{ rotate: isContextExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-0.5 text-zinc-500"
                    >
                      <ChevronDownIcon />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isContextExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-2 shadow-2xs"
                      >
                        <div className="flex flex-col divide-y divide-zinc-100 text-[10px]">
                          {contextFiles.map((file) => (
                            <div
                              key={file.name}
                              className="flex flex-col gap-0.5 py-1.5 first:pt-0.5 last:pb-0.5"
                            >
                              <div className="flex items-center gap-1.5 font-mono font-medium text-zinc-700">
                                <FileTextIcon />
                                <span>{file.name}</span>
                                <span className="font-sans text-[9px] text-zinc-400">
                                  · {file.source}
                                </span>
                              </div>
                              <p className="pl-4 text-zinc-500">
                                {file.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Final Answer Text */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(6px)", y: 4 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-2  text-xs text-zinc-800 mt-2"
                >
                  <p className="leading-relaxed font-medium text-zinc-800">
                    Acme’s main concerns are{" "}
                    <span className="font-medium text-zinc-800">
                      implementation time
                    </span>
                    ,{" "}
                    <span className="font-medium text-zinc-800">
                      data migration
                    </span>
                    , and{" "}
                    <span className="font-medium text-zinc-800">
                      internal approval
                    </span>
                    .
                  </p>

                  <p className="text-[10px] leading-relaxed tracking-wide  text-zinc-800">
                    They’re interested in moving forward, but want confidence
                    that migrating their existing data won’t disrupt operations.
                    The operations team also needs to approve the implementation
                    before they can commit.
                  </p>

                  {/* Highlight callout box */}
                  <div className="mt-0.5 rounded-xl tracking-wide text-[10px] text-zinc-800">
                    <span className="font-medium text-zinc-800">
                      Recommended focus:
                    </span>{" "}
                    Address the migration process and implementation timeline in
                    the next conversation.
                  </div>

                  {/* ── Action Buttons Below Response ────────────────────── */}
                  <div className="mt-1 flex items-center justify-between pt-2 text-[10px] text-zinc-500">
                    
                    <div className="flex items-center gap-1.5">
                      {/* Redo Button */}
                      <button
                        type="button"
                        onClick={handleRedo}
                        className="flex items-center gap-1 rounded-md  bg-zinc-200 px-2 py-1 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-800 active:scale-95"
                        title="Redo analysis"
                      >
                        <RedoIcon />
                        <span>Redo</span>
                      </button>

                      {/* Menu Button (when pressed does nothing) */}
                      <button
                        type="button"
                        onClick={() => {}}
                        className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-800 active:scale-95"
                        title="More options"
                      >
                        <MenuDotsIcon />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Message Input Panel ───────────────────────────── */}
      <footer className="relative shrink p-2">
        {/* Attachment Popup Menu when Add is pressed */}
        <AnimatePresence>
          {showAttachMenu && (
            <motion.div
              initial={{ opacity: 0, y: 4, x: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 4,
                x: -4,
                scale: 0.97,
                transition: { duration: 0.1, ease: easeOut },
              }}
              transition={{ duration: 0.15, ease: easeOut }}
              className="absolute bottom-14 left-4 z-30 flex w-40 flex-col gap-0.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 shadow-xs"
            >
              {[
                "CRM Deal Records",
                "Email History",
                "Call Transcripts",
                "Meeting Notes",
              ].map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => {
                    setSelectedAttachment(res);
                    setShowAttachMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-[10px] text-zinc-700 hover:bg-zinc-200"
                >
                  <span className="w-full text-start">{res}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Attachment Tag if any */}
        {selectedAttachment && (
          <div className="mb-1 flex items-center gap-1.5 px-1">
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-200 px-2 py-1 text-[10px] text-zinc-700">
              <span>{selectedAttachment}</span>
              <button
                type="button"
                onClick={() => setSelectedAttachment(null)}
                className="ml-1 text-zinc-400 hover:text-zinc-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  color="currentColor"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-Linejoin="round"
                >
                  <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"></path>
                </svg>
              </button>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-2 py-2">
          <button
            type="button"
            onClick={() => setShowAttachMenu((prev) => !prev)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-200 ${
              showAttachMenu ? "bg-zinc-200" : "bg-zinc-50"
            }`}
            title="Attach context resources"
          >
            <PlusIcon />
          </button>
          {/* Add Icon (+) */}

          {/* Input text */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask anything about this deal, team, or pipeline…"
            className="flex-1 bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
          />

          {/* Enter / Send Button */}
          <button
            type="button"
            onClick={handleSend}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-100 transition-transform hover:bg-zinc-700 active:scale-95"
            title="Send query"
          >
            <ArrowUpIcon />
          </button>
        </div>
      </footer>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function PlusIcon() {
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
      <path d="M12.001 5.00003V19.002"></path>
      <path d="M19.002 12.002L4.99998 12.002"></path>
    </svg>
  );
}

function ArrowUpIcon() {
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
      <path d="M8.87038 6.13264L14.7327 4.19538C18.033 3.10476 19.6831 2.55945 20.5579 3.43426C21.4327 4.30907 20.8874 5.95922 19.7968 9.25953L17.8595 15.1218C16.6236 18.8619 16.0056 20.7319 14.8796 20.9603C14.6411 21.0087 14.3955 21.0129 14.1549 20.9727C13.019 20.7832 12.3132 18.9359 10.9016 15.2413C10.6328 14.5376 10.4983 14.1858 10.2574 13.9127C10.2018 13.8497 10.1424 13.7903 10.0795 13.7348C9.80638 13.4938 9.45455 13.3594 8.75089 13.0906C5.05627 11.679 3.20896 10.9732 3.01945 9.83727C2.97931 9.59669 2.98353 9.35108 3.03189 9.11259C3.26025 7.98657 5.13029 7.36859 8.87038 6.13264Z"></path>
      <path d="M12.8008 11.1865L15.498 8.48926"></path>
    </svg>
  );
}

function RedoIcon() {
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
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 12a9 9 0 0 0 15 6.7L21 16" />
    </svg>
  );
}

function MenuDotsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="currentColor"
    >
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin text-zinc-500"
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-500"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
