'use client';
import { useState } from "react";
import { motion, easeOut } from "motion/react";
import { cn } from "../utility/cn";

export default function FaultyButton() {
  const [isHovered, setIsHovered] = useState(false);
  return (<motion.div
    onMouseEnter={() => {
      setIsHovered(true);
    }}
    onMouseLeave={() => {
      setIsHovered(false);
    }}
    animate={{
      boxShadow: isHovered
        ? "0px 0px 10px -2px var(--color-amber-100)"
        : "0px 0px var(--color-amber-100)",
    }}
    className="relative rounded-full text-gray-800 px-4 overflow-hidden py-2 bg-neutral-900"
  >
    <motion.p
      animate={{
        color: isHovered
          ? "var(--color-gray-900)"
          : "var(--color-gray-300)",
      }}
      className="relative z-20"
    >
      faulty button
    </motion.p>
    <motion.div
      initial={{ opacity: 0, filter: "blur(0px)", scale: 0.95 }}
      animate={{
        opacity: isHovered ? [0, 1, 0.7, 0.3, 0.9] : 0,
        filter: isHovered
          ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
          : "blur(4px)",
        scale: isHovered ? [1, 1, 1, 1, 1] : 0.95,
      }}
      transition={{
        duration: 0.3,
        ease: easeOut,
      }}
      className={cn(
        "absolute w-full h-full bg-white inset-0 z-10 rounded-full",
      )}
    ></motion.div>
  </motion.div>);
}