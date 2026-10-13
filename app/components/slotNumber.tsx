"use client";

import React, { memo } from "react";
import { motion, easeOut } from "motion/react";

interface SlotNumberProps {
  value: string | number;
  className?: string;
  integerDigits?: number; // Fixed number of integer digits before decimal (pads with '0')
  decimalDigits?: number; // Fixed number of decimal digits after decimal (pads with '0')
  suffix?: string; // Suffix to append
}

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ROW_HEIGHT = 22; // Explicit pixel height matching text-sm leading

// Memoized individual slot reel for a digit position
const SlotReel = memo(function SlotReel({
  char,
  index,
}: {
  char: string;
  index: number;
}) {
  const isDigit = DIGITS.includes(char);

  if (!isDigit) {
    return (
      <span
        style={{ height: `${ROW_HEIGHT}px`, lineHeight: `${ROW_HEIGHT}px` }}
        className="inline-flex items-center justify-center select-none text-zinc-800"
      >
        {char}
      </span>
    );
  }

  const num = parseInt(char, 10);

  return (
    <span
      style={{ height: `${ROW_HEIGHT}px` }}
      className="relative inline-flex overflow-hidden justify-center"
    >
      {/* Invisible natural character placeholder to mirror natural font kerning & spacing */}
      <span
        style={{ height: `${ROW_HEIGHT}px`, lineHeight: `${ROW_HEIGHT}px` }}
        className="invisible select-none opacity-0"
      >
        0
      </span>
      <motion.span
        className="absolute left-0 top-0 flex w-full flex-col"
        animate={{ y: -num * ROW_HEIGHT }}
        transition={{
          duration: 0.42,
          delay: index * 0.025,
          ease: easeOut,
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            style={{ height: `${ROW_HEIGHT}px`, lineHeight: `${ROW_HEIGHT}px` }}
            className="flex w-full items-center justify-center text-center text-zinc-800"
          >
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
});

export default function SlotNumber({
  value,
  className = "",
  integerDigits,
  decimalDigits,
  suffix = "",
}: SlotNumberProps) {
  let stringValue = String(value ?? "");

  // If fixed integer or decimal digits are requested, parse and format with precision
  if (integerDigits !== undefined || decimalDigits !== undefined) {
    // Check if the value has a numeric part (e.g., "75.0%", "2.4 days", "100.0%", "Final")
    const match = stringValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      const numVal = parseFloat(match[1]);
      const rest = match[2];

      if (!isNaN(numVal)) {
        // If decimalDigits specified, format decimal precision
        let formattedNum =
          decimalDigits !== undefined
            ? numVal.toFixed(decimalDigits)
            : String(numVal);

        // Pad integer digits with leading zeros if specified
        if (integerDigits !== undefined) {
          const parts = formattedNum.split(".");
          parts[0] = parts[0].padStart(integerDigits, "0");
          formattedNum = parts.join(".");
        }

        stringValue = `${formattedNum}${rest}`;
      }
    }
  }

  if (suffix && !stringValue.endsWith(suffix)) {
    stringValue = `${stringValue}${suffix}`;
  }

  const chars = stringValue.split("");

  return (
    <div
      style={{
        height: `${ROW_HEIGHT}px`,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
      className={`relative inline-flex items-center tracking-normal select-none ${className}`}
    >
      <div className="flex items-center">
        {chars.map((char, index) => (
          <SlotReel key={`pos-${index}`} char={char} index={index} />
        ))}
      </div>
    </div>
  );
}
