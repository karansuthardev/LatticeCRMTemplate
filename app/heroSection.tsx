"use client";

import { cn } from "./utility/cn";
import Image from "next/image";
import DashboardMockup from "./components/dashboardMockup";
import BrandLogoGrid from "./components/brandLogoGrid";

export default function HeroSection() {
  return (
    <div className=" flex flex-col items-center w-full pt-32">
      <div className="flex flex-row items-center gap-1 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 text-zinc-600 shadow-md hover:bg-zinc-100">
        <p className="text-sm font-medium">Just shipped Automated Follow-ups</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          color="currentColor"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"></path>
        </svg>
      </div>

      <h1 className="font-regular mt-14 text-6xl font-medium tracking-tighter">
        The{" "}
        <span className="font-serif text-7xl font-semibold italic">
          Agentic Era
        </span>{" "}
        of CRMs
      </h1>
      <h2 className="text-md mt-4 text-center align-middle font-medium tracking-wide text-zinc-500">
        Agentic CRM that keeps your customer data organized,
        <br />
        your pipeline moving, and routine work handled.
      </h2>

      <div className="mt-10 flex flex-row gap-4">
        <button className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-1.5 text-sm text-zinc-800 shadow-sm transition-colors duration-200 hover:bg-zinc-200">
          <p className="font-medium text-shadow-xs">Sign in</p>
        </button>
        <button className="rounded-xl border border-orange-800 bg-orange-600 px-4 py-1.5 text-sm text-zinc-100 shadow-sm transition-colors duration-200 hover:bg-orange-700">
          <p className="font-medium text-shadow-2xs">Try Demo</p>
        </button>
      </div>

      <div className="relative mt-24 border-y w-full h-180 overflow-hidden border-zinc-200">

        <Image
                  src={"/background_image.webp"}
                  loading="eager"
                  alt="hero image background object-cover"
                  className="relative z-10"
                  fill
                />

        <div className="absolute inset-0 z-50 m-auto flex h-fit w-fit flex-col justify-center rounded-2xl mx-12 shadow-2xl">
          <DashboardMockup />
        </div>
      </div>
      <BrandLogoGrid />
    </div>
  );
}
