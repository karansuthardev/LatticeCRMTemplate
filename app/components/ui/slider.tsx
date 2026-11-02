"use client";

import * as React from "react";
import { cn } from "@/app/utility/cn";

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  marks?: { value: number; label: string }[];
  "aria-label"?: string;
}

export function Slider({
  value,
  min = 1,
  max = 3,
  step = 1,
  onChange,
  className,
  disabled = false,
  marks,
  "aria-label": ariaLabel = "Model depth selector",
}: SliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragRatio, setDragRatio] = React.useState<number | null>(null);

  // Target snap ratio based on discrete value (0 to 1)
  const targetRatio = (value - min) / (max - min);

  // Current visual ratio: while dragging, follows mouse exactly; otherwise matches target snap
  const currentRatio = isDragging && dragRatio !== null ? dragRatio : targetRatio;
  const percentage = Math.max(0, Math.min(100, currentRatio * 100));

  const calculateRatioFromPointer = React.useCallback(
    (clientX: number) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return Math.max(0, Math.min(1, ratio));
    },
    []
  );

  const getSteppedValueFromRatio = React.useCallback(
    (ratio: number) => {
      const rawVal = min + ratio * (max - min);
      const steppedVal = Math.round(rawVal / step) * step;
      return Math.max(min, Math.min(max, steppedVal));
    },
    [max, min, step]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);

    const ratio = calculateRatioFromPointer(e.clientX);
    setDragRatio(ratio);
    const stepped = getSteppedValueFromRatio(ratio);
    if (stepped !== value) {
      onChange(stepped);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
    e.preventDefault();
    e.stopPropagation();

    const ratio = calculateRatioFromPointer(e.clientX);
    setDragRatio(ratio);
    const stepped = getSteppedValueFromRatio(ratio);
    if (stepped !== value) {
      onChange(stepped);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragRatio(null);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(max, value + step));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(min, value - step));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  return (
    <div
      className={cn("relative flex w-full select-none flex-col gap-1.5", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          "group relative flex h-4 w-full touch-none items-center cursor-pointer outline-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Track Background */}
        <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-zinc-200">
          <div
            className={cn(
              "h-full bg-zinc-800",
              isDragging ? "transition-none" : "transition-all duration-200 ease-out"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          className={cn(
            "absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-zinc-300 bg-white shadow-xs ring-offset-background",
            isDragging
              ? "scale-110 ring-2 ring-zinc-400/50 transition-none"
              : "transition-all duration-200 ease-out group-hover:scale-105"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>

      {/* Optional Marks (only rendered if explicitly provided) */}
      {marks && marks.length > 0 && (
        <div className="flex w-full justify-between text-[9px] text-zinc-500 px-0.5 select-none font-normal">
          {marks.map((mark) => (
            <span
              key={mark.value}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onChange(mark.value);
              }}
              className={cn(
                "cursor-pointer transition-colors hover:text-zinc-800",
                mark.value === value ? "text-zinc-900 font-medium" : "text-zinc-400 font-normal"
              )}
            >
              {mark.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
