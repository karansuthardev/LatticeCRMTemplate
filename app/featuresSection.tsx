"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "motion/react";
import { cn } from "./utility/cn";
import ContactsTableCard from "./components/contactsTableCard";
import CustomerTableCard from "./components/customerTableCard";
import CustomerProfileCard from "./components/customerProfileCard";
import AgentChatCard from "./components/agentChatCard";

export interface FeatureItem {
  id: string;
  title: React.ReactNode;
  description: string;
  card: React.ReactNode;
  cardWidth?: string;
  cardPosition?: "left" | "right";
}

// ── Motion Variants (shadcn/ui animation standards) ───────────────────────────

const EASE_CURVE = [0.22, 1, 0.36, 1] as const;

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const textItemVariants: Variants = {
  hidden: (x: number) => ({
    opacity: 0,
    x,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_CURVE,
    },
  },
};

const cardMotionVariants: Variants = {
  hidden: (x: number) => ({
    opacity: 0,
    x,
    filter: "blur(6px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.15, // Staggered: illustration arrives right after the title & subtitle
      ease: EASE_CURVE,
    },
  },
};

export interface FeatureRowProps extends Omit<FeatureItem, "id"> {
  className?: string;
}

export function FeatureRow({
  title,
  description,
  card,
  cardWidth = "w-150",
  cardPosition = "right",
  className,
}: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { amount: 0.75, once: true });

  const isCardLeft = cardPosition === "left";

  // Subtle 10px translation:
  // Illustration on right: elements come from center (text: +10, card: -10)
  // Illustration on left: elements come to center from outside (card: -10, text: +10)
  const textInitialX = 10;
  const cardInitialX = -10;

  const textBlock = (
    <motion.div
      variants={textContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex h-full w-full flex-col items-start justify-center gap-4 p-8 pb-8"
    >
      <motion.p
        custom={textInitialX}
        variants={textItemVariants}
        className="text-4xl font-medium text-zinc-800"
      >
        {title}
      </motion.p>
      <motion.p
        custom={textInitialX}
        variants={textItemVariants}
        className="text-md font-normal tracking-wide text-pretty text-zinc-600"
      >
        {description}
      </motion.p>
    </motion.div>
  );

  const cardBlock = (
    <div className="relative h-full w-full bg-zinc-100">
      <Image
        alt="bg for card"
        src="/background_image.webp"
        fill
        className="absolute inset-0 h-full w-full shrink-0 object-cover"
      />
      <motion.div
        custom={cardInitialX}
        variants={cardMotionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`absolute inset-0 m-auto flex h-110 ${cardWidth} items-center`}
      >
        {React.isValidElement(card)
          ? React.cloneElement(
              card as React.ReactElement<{ inView?: boolean }>,
              { inView: isInView },
            )
          : card}
      </motion.div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={cn(
        "grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden",
        className,
      )}
    >
      {isCardLeft ? (
        <>
          {cardBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {cardBlock}
        </>
      )}
    </div>
  );
}

const features: FeatureItem[] = [
  {
    id: "contacts-table",
    title: (
      <>
        Consistent data
        <span className="text-zinc-700"> across your workspace,</span> always.
      </>
    ),
    description:
      "Automatically organize records, fill missing information, and keep your data consistent.",
    card: <ContactsTableCard />,
    cardWidth: "w-150",
    cardPosition: "right",
  },
  {
    id: "customer-table",
    title: (
      <>
        Customer relations{" "}
        <span className="inline-block text-zinc-700"> strengthen </span>
        <br /> <span className="inline-block text-zinc-700">with better </span>{" "}
        context.
      </>
    ),
    description:
      "Get instant customer summaries, complete interaction history, email recaps, and meeting insights.",
    card: <CustomerTableCard />,
    cardWidth: "w-150",
    cardPosition: "left",
  },
  {
    id: "customer-profile",
    title: (
      <>
        Informed decisions{" "}
        <span className="inline-block text-zinc-700"> are </span>
        <br /> <span className="inline-block text-zinc-700">shaped by </span>{" "}
        reliable data.
      </>
    ),
    description:
      "Keep customer records current with every interaction, preserving accurate context across your entire team.",
    card: <CustomerProfileCard />,
    cardWidth: "w-140",
    cardPosition: "right",
  },
  {
    id: "agent-chat",
    title: (
      <>
        Decision clarity{" "}
        <span className="inline-block text-zinc-700"> informed by </span>
        <br /> <span className="inline-block text-zinc-700">intelligent </span>{" "}
        insights.
      </>
    ),
    description:
      "Ask anything about your business and get answers grounded in your CRM data and customer context.",
    card: <AgentChatCard />,
    cardWidth: "w-140",
    cardPosition: "left",
  },
];

export default function FeaturesSection() {
  return (
    <div className=" flex w-full flex-col items-start justify-start">
      <div className="mb-10 flex w-full flex-col items-center gap-2 mx-auto ">
        <p className="text-5xl font-medium text-zinc-700">
          Grow with {" "}
          <span className="text-zinc-800">less to manage.</span>
        </p>
        <p className="text-md text-lg font-normal text-zinc-500">
          AI handles the busywork across your CRM, so your team can focus on
          customers, deals, and growth.
        </p>
      </div>

      <div className="w-full divide-y divide-zinc-200 border-y border-zinc-200">
        {features.map((feature) => (
          <FeatureRow
            key={feature.id}
            title={feature.title}
            description={feature.description}
            card={feature.card}
            cardWidth={feature.cardWidth}
            cardPosition={feature.cardPosition}
          />
        ))}
      </div>
    </div>
  );
}
