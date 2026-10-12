"use client";

import React from "react";
import Image from "next/image";
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

export function FeatureRow({
  title,
  description,
  card,
  cardWidth = "w-150",
  cardPosition = "right",
}: Omit<FeatureItem, "id">) {
  const isCardLeft = cardPosition === "left";

  const textBlock = (
    <div className="flex h-full w-full flex-col items-start justify-center gap-4 p-8 pb-8">
      <p className="text-4xl font-medium text-zinc-800">{title}</p>
      <p className="text-md font-normal tracking-wide text-pretty text-zinc-600">
        {description}
      </p>
    </div>
  );

  const cardBlock = (
    <div className="relative h-full w-full bg-zinc-100">
      <Image
        alt="bg for card"
        src="/background_image.webp"
        fill
        className="absolute inset-0 h-full w-full shrink-0 object-cover"
      />
      <div
        className={`absolute inset-0 m-auto flex h-110 ${cardWidth} items-center`}
      >
        {card}
      </div>
    </div>
  );

  return (
    <div className="grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden">
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
        <span className="text-zinc-600"> across your workspace,</span> always.
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
        <span className="inline-block text-zinc-600"> strengthen </span>
        <br /> <span className="inline-block text-zinc-600">with better </span>{" "}
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
        <span className="inline-block text-zinc-600"> are </span>
        <br /> <span className="inline-block text-zinc-600">shaped by </span>{" "}
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
        <span className="inline-block text-zinc-600"> informed by </span>
        <br /> <span className="inline-block text-zinc-600">intelligent </span>{" "}
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
    <div className="mt-48 mb-24 flex w-full flex-col items-start justify-start">
      <div className="mb-6 flex w-full flex-col items-center gap-2 px-6 py-4">
        <p className="text-5xl font-medium text-zinc-800">
          Grow with less to manage.
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
