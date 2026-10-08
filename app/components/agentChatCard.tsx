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
                  <LoadingSpinner />
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
                      <FileTextIcon />
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
                        <ChevronDownIcon />
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
                            <FileTextIcon />
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
                        <RedoIcon />
                        <span>Redo</span>
                      </button>

                      {/* Menu Button (when pressed does nothing) */}
                      <button
                        type="button"
                        onClick={() => {}}
                        className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-800 active:scale-95"
                        title="More options"
                      >
                        <MenuDotsIcon />
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
                    <Icon />
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
                {selectedAttachment === "CRM Deal Records" && <DatabaseIcon />}
                {selectedAttachment === "Email History" && <MailsIcon />}
                {selectedAttachment === "Call Transcripts" && <CallIcon />}
                {selectedAttachment === "Meeting Notes" && <NotesIcon />}
              </span>
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
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"></path>
                </svg>
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
            <PlusIcon />
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
            <ArrowUpIcon />
          </motion.button>
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
      width="12"
      height="12"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 7.99976H18C19.4142 7.99976 20.1213 7.99976 20.5607 7.56042C21 7.12108 21 6.41397 21 4.99976V3.49976"></path>
      <path d="M3 11.9998C3 7.02919 7.0293 2.99976 12 2.99976C15.571 2.99976 18.0948 4.73029 20 7.08347M21 11.9998C21 16.9703 16.9707 20.9998 12 20.9998C8.42904 20.9998 5.90524 19.2692 4 16.916"></path>
      <path d="M7.5 15.9998H6C4.58579 15.9998 3.87868 15.9998 3.43934 16.4391C3 16.8784 3 17.5855 3 18.9998V20.4998"></path>
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
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z"></path>
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

function DatabaseIcon() {
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
    >
      <path d="M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z"></path>
      <path d="M3 12H21" strokeLinecap="round" strokeLinejoin="round"></path>
      <path
        d="M11 7.5L17 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.125 7.5H7M7.25 7.5C7.25 7.63807 7.13807 7.75 7 7.75C6.86193 7.75 6.75 7.63807 6.75 7.5C6.75 7.36193 6.86193 7.25 7 7.25C7.13807 7.25 7.25 7.36193 7.25 7.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M11 16.5L17 16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.125 16.5H7M7.25 16.5C7.25 16.6381 7.13807 16.75 7 16.75C6.86193 16.75 6.75 16.6381 6.75 16.5C6.75 16.3619 6.86193 16.25 7 16.25C7.13807 16.25 7.25 16.3619 7.25 16.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function MailsIcon() {
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
      <path d="M13 3H16C18.8284 3 20.2426 3 21.1213 3.87868C22 4.75736 22 6.17157 22 9C22 11.8284 22 13.2426 21.1213 14.1213C20.2426 15 18.8284 15 16 15H13C10.1716 15 8.75736 15 7.87868 14.1213C7 13.2426 7 11.8284 7 9C7 6.17157 7 4.75736 7.87868 3.87868C8.75736 3 10.1716 3 13 3Z"></path>
      <path d="M17 17.9358C16.9036 18.9318 16.6857 19.6022 16.1933 20.1025C15.3102 21 13.8888 21 11.0459 21H8.0306C5.18775 21 3.76632 21 2.88316 20.1025C2 19.2051 2 17.7606 2 14.8717C2 11.9828 2 10.5383 2.88316 9.64085C3.18449 9.33464 3.54848 9.1329 4.0102 9"></path>
      <path d="M21.7585 6.12671L17.587 8.31597C16.083 9.1053 15.331 9.49996 14.5 9.49996C13.6691 9.49996 12.917 9.1053 11.413 8.31597L7.24152 6.12671"></path>
    </svg>
  );
}

function CallIcon() {
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
    >
      <path d="M9.1585 5.71217L8.75584 4.80619C8.49256 4.21382 8.36092 3.91762 8.16405 3.69095C7.91732 3.40688 7.59571 3.19788 7.23592 3.08779C6.94883 2.99994 6.6247 2.99994 5.97645 2.99994C5.02815 2.99994 4.554 2.99994 4.15597 3.18223C3.68711 3.39696 3.26368 3.86322 3.09497 4.35054C2.95175 4.76423 2.99278 5.18937 3.07482 6.03964C3.94815 15.0901 8.91006 20.052 17.9605 20.9254C18.8108 21.0074 19.236 21.0484 19.6496 20.9052C20.137 20.7365 20.6032 20.3131 20.818 19.8442C21.0002 19.4462 21.0002 18.972 21.0002 18.0237C21.0002 17.3755 21.0002 17.0514 20.9124 16.7643C20.8023 16.4045 20.5933 16.0829 20.3092 15.8361C20.0826 15.6393 19.7864 15.5076 19.194 15.2443L18.288 14.8417C17.6465 14.5566 17.3257 14.414 16.9998 14.383C16.6878 14.3533 16.3733 14.3971 16.0813 14.5108C15.7762 14.6296 15.5066 14.8543 14.9672 15.3038C14.4304 15.7511 14.162 15.9748 13.834 16.0946C13.5432 16.2009 13.1588 16.2402 12.8526 16.1951C12.5071 16.1442 12.2426 16.0028 11.7135 15.7201C10.0675 14.8404 9.15977 13.9327 8.28011 12.2867C7.99738 11.7576 7.85602 11.4931 7.80511 11.1476C7.75998 10.8414 7.79932 10.457 7.90554 10.1662C8.02536 9.83822 8.24905 9.5698 8.69643 9.03294C9.14586 8.49362 9.37058 8.22396 9.48939 7.91885C9.60309 7.62688 9.64686 7.31234 9.61719 7.00042C9.58618 6.67446 9.44362 6.3537 9.1585 5.71217Z"></path>
    </svg>
  );
}

function NotesIcon() {
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
      <path d="M10 11H13.5M10 7H17"></path>
      <path d="M13 2H12.5C8.72877 2 6.84314 2 5.67157 3.17158C4.5 4.34315 4.5 6.22877 4.5 10V14C4.5 17.7712 4.5 19.6569 5.67157 20.8284C6.84315 22 8.72876 22 12.5 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22877 21 4.34315 19.8284 3.17157C18.6569 2 16.7712 2 13 2Z"></path>
      <path d="M6 6H3M6 12H3M6 18H3"></path>
    </svg>
  );
}
