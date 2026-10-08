"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeOut } from "motion/react";
import {
  PlusIcon,
  ArrowUpIcon,
  RedoIcon,
  MenuDotsIcon,
  LoadingSpinner,
  FileTextIcon,
  ChevronDownIcon,
  DatabaseIcon,
  MailsIcon,
  CallIcon,
  NotesIcon,
  CloseIcon,
} from "../icons";

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

const PROMPT_TEXT = "What are Acme’s biggest concerns about this deal?";

const responseContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const responseLineVariants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

type ChatPhase = "typing" | "thinking" | "collecting" | "answering" | "done";

export default function AgentChatCard() {
  const [phase, setPhase] = useState<ChatPhase>("typing");
  const [hasUserSent, setHasUserSent] = useState(false);
  const [sentPrompt, setSentPrompt] = useState(PROMPT_TEXT);
  const [typedInput, setTypedInput] = useState("");
  const [isSending, setIsSending] = useState(false);
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
  }, [phase, isContextExpanded, hasUserSent]);

  // Sequenced animation loop
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function startCycle() {
      setPhase("typing");
      setHasUserSent(false);
      setSentPrompt(PROMPT_TEXT);
      setTypedInput("");
      setIsSending(false);
      setIsContextExpanded(false);
      setSelectedAttachment(null);
      setShowAttachMenu(false);

      // 1. Typewriter animation character-by-character into input
      for (let i = 1; i <= PROMPT_TEXT.length; i++) {
        timers.push(
          setTimeout(() => {
            setTypedInput(PROMPT_TEXT.slice(0, i));
          }, 350 + i * 26),
        );
      }

      const typingDuration = 350 + PROMPT_TEXT.length * 26;

      // 2. Press send button visual
      timers.push(
        setTimeout(() => {
          setIsSending(true);
        }, typingDuration + 300),
      );

      // 3. Shoot message into chat & start thinking
      timers.push(
        setTimeout(() => {
          setIsSending(false);
          setTypedInput("");
          setHasUserSent(true);
          setPhase("thinking");
        }, typingDuration + 500),
      );

      // 4. Thinking -> Collecting context (shows filenames)
      timers.push(
        setTimeout(() => {
          setPhase("collecting");
        }, typingDuration + 500 + 1300),
      );

      // 5. Collecting -> Answering (shrinks to pill with dropdown, answer streams in)
      timers.push(
        setTimeout(() => {
          setPhase("answering");
        }, typingDuration + 500 + 3200),
      );

      // 6. Answering -> Done
      timers.push(
        setTimeout(() => {
          setPhase("done");
        }, typingDuration + 500 + 4200),
      );

      // 7. Hold for reading, then loop
      timers.push(
        setTimeout(() => {
          startCycle();
        }, typingDuration + 500 + 13000),
      );
    }

    startCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleRedo = () => {
    setHasUserSent(true);
    setPhase("thinking");
    setIsContextExpanded(false);
    setTimeout(() => setPhase("collecting"), 1100);
    setTimeout(() => setPhase("answering"), 2800);
    setTimeout(() => setPhase("done"), 3800);
  };

  const handleSend = () => {
    const textToSend = inputValue.trim() || typedInput.trim() || PROMPT_TEXT;
    setSentPrompt(textToSend);
    setInputValue("");
    setTypedInput("");
    setHasUserSent(true);
    setIsSending(true);
    setTimeout(() => setIsSending(false), 200);
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
        <div className="flex items-center gap-1.5 text-xs font-normal text-zinc-800">
          <span>Agent Chat</span>
        </div>
      </header>

      {/* ── Chat Messages Body ───────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex flex-1 scrollbar-none flex-col gap-3.5 overflow-y-auto p-4"
      >
        {/* User Prompt (animates into thread when sent) */}
        <AnimatePresence>
          {hasUserSent && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="flex justify-end"
            >
              <div className="flex max-w-[85%] flex-col items-end gap-2">
                <div className="rounded-2xl rounded-br-xs bg-zinc-200 px-4 py-2 text-sm font-normal text-zinc-800">
                  {sentPrompt}
                </div>
                <span className="pr-1 text-xs text-zinc-400">
                  Today 10:14 AM
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Agent Response Thread */}
        {hasUserSent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-start gap-2.5"
          >
          <div className="flex flex-1 flex-col gap-2">
            {/* Single Thinking & Collecting Widget (prevents loader remounting) */}
            {(phase === "thinking" || phase === "collecting") && (
              <div className="flex flex-col gap-1 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <LoadingSpinner width={11} height={11} />
                  <span className="font-medium text-zinc-700">
                    {phase === "thinking" ? "Thinking…" : "Collecting context…"}
                  </span>
                </div>

                <AnimatePresence>
                  {phase === "collecting" && (
                    <motion.p
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-5 font-mono text-xs leading-relaxed text-zinc-500"
                    >
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
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Step 3: Shrunk to single first file + dropdown chevron icon */}
            {(phase === "answering" || phase === "done") && (
              <div className="flex flex-col gap-2">
                {/* Simple files container with no bg */}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-zinc-700">
                      <FileTextIcon width={11} height={11} />
                      <span>{contextFiles[0].name}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsContextExpanded((prev) => !prev)}
                      className="flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-700"
                      title={
                        isContextExpanded ? "Collapse files" : "Show all files"
                      }
                    >
                      <motion.span
                        animate={{ rotate: isContextExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <ChevronDownIcon width={11} height={11} />
                      </motion.span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isContextExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-1 overflow-hidden"
                      >
                        {contextFiles.slice(1).map((file) => (
                          <div
                            key={file.name}
                            className="flex items-center gap-1.5 font-mono text-zinc-600"
                          >
                            <FileTextIcon width={11} height={11} />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Final Answer Text */}
                <motion.div
                  variants={responseContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-2 flex flex-col gap-2 text-xs text-zinc-800"
                >
                  <motion.p
                    variants={responseLineVariants}
                    className="leading-relaxed font-medium text-zinc-800"
                  >
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
                  </motion.p>

                  <motion.p
                    variants={responseLineVariants}
                    className="leading-relaxed tracking-wide text-zinc-800"
                  >
                    They’re interested in moving forward, but want confidence
                    that migrating their existing data won’t disrupt operations.
                    The operations team also needs to approve the implementation
                    before they can commit.
                  </motion.p>

                  {/* Highlight callout box */}
                  <motion.div
                    variants={responseLineVariants}
                    className="mt-0.5 rounded-xl tracking-wide text-zinc-800"
                  >
                    <span className="font-medium text-zinc-800">
                      Recommended focus:
                    </span>{" "}
                    Address the migration process and implementation timeline in
                    the next conversation.
                  </motion.div>

                  {/* ── Action Buttons Below Response ────────────────────── */}
                  <motion.div
                    variants={responseLineVariants}
                    className="mt-1 flex items-center justify-between pt-2 text-xs text-zinc-500"
                  >
                    <div className="flex items-center gap-4">
                      {/* Redo Button */}
                      <button
                        type="button"
                        onClick={handleRedo}
                        className="-mx-2 flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-zinc-600 transition-colors duration-150 hover:bg-zinc-200 hover:text-zinc-800 active:scale-95"
                        title="Redo analysis"
                      >
                        <RedoIcon width={12} height={12} />
                        <span>Redo</span>
                      </button>

                      {/* Menu Button (when pressed does nothing) */}
                      <button
                        type="button"
                        onClick={() => {}}
                        className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-800 active:scale-95"
                        title="More options"
                      >
                        <MenuDotsIcon width={12} height={12} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
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
              className="absolute bottom-12 left-2 z-30 flex w-40 flex-col gap-0.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 shadow-xs"
            >
              {[
                { label: "CRM Deal Records", icon: DatabaseIcon },
                { label: "Email History", icon: MailsIcon },
                { label: "Call Transcripts", icon: CallIcon },
                { label: "Meeting Notes", icon: NotesIcon },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setSelectedAttachment(label);
                    setShowAttachMenu(false);
                  }}
                  className="group flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-xs text-zinc-700 hover:bg-zinc-200"
                >
                  <span className="shrink-0 text-zinc-600">
                    <Icon width={12} height={12} />
                  </span>
                  <span className="w-full text-start">{label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Attachment Tag if any */}
        {selectedAttachment && (
          <div className="mb-1 flex items-center gap-1.5 px-1">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-200 px-2 py-1 text-xs text-zinc-700">
              <span className="shrink-0 text-zinc-600">
                {selectedAttachment === "CRM Deal Records" && <DatabaseIcon width={12} height={12} />}
                {selectedAttachment === "Email History" && <MailsIcon width={12} height={12} />}
                {selectedAttachment === "Call Transcripts" && <CallIcon width={12} height={12} />}
                {selectedAttachment === "Meeting Notes" && <NotesIcon width={12} height={12} />}
              </span>
              <span>{selectedAttachment}</span>
              <button
                type="button"
                onClick={() => setSelectedAttachment(null)}
                className="ml-1 text-zinc-400 hover:text-zinc-600"
              >
                <CloseIcon width={12} height={12} />
              </button>
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
          <button
            type="button"
            onClick={() => setShowAttachMenu((prev) => !prev)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-200 ${
              showAttachMenu ? "bg-zinc-200" : "bg-zinc-50"
            }`}
            title="Attach context resources"
          >
            <PlusIcon width={16} height={16} />
          </button>
          {/* Add Icon (+) */}

          {/* Input text */}
          <input
            type="text"
            value={inputValue !== "" ? inputValue : typedInput}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder={
              typedInput
                ? ""
                : "Ask anything about this deal, team, or pipeline…"
            }
            className="flex-1 bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
          />

          {/* Enter / Send Button */}
          <motion.button
            type="button"
            onClick={handleSend}
            animate={
              isSending
                ? { scale: 0.88, backgroundColor: "var(--color-zinc-900)" }
                : { scale: 1, backgroundColor: "var(--color-zinc-800)" }
            }
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-100 transition-colors hover:bg-zinc-700"
            title="Send query"
          >
            <ArrowUpIcon width={12} height={12} />
          </motion.button>
        </div>
      </footer>
    </div>
  );
}


