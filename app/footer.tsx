import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100">
      <div className="mx-auto w-full max-w-7xl border-x border-t border-zinc-200 bg-zinc-100">
        {/* ── Upper Section: Left Brand + Right 3x5 Grid ── */}
        <div className="flex w-full flex-row justify-between">
          {/* Left: Brand & Tagline */}
          <div className="flex flex-1 flex-col justify-between p-4 min-h-full">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="flex w-fit cursor-pointer items-center gap-2 select-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 36 40"
                  fill="none"
                  id="FooterLogo"
                >
                  <g id="logomark">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
                      fill="currentColor"
                      className="text-zinc-900"
                    />
                  </g>
                </svg>
                <span className="text-2xl font-black text-zinc-900">
                  La<span className="mr-px tracking-wide italic">tt</span>ice
                </span>
              </Link>

              <p className="ml-8 text-sm text-zinc-600">
                The Agentic Era of CRMs
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Operational</span>
            </div>
          </div>

          {/* Right: 3x5 Grid (Product, Company, Legal) with x & y dividers squished to right */}
          <div className="flex w-full justify-end overflow-x-auto border-t border-zinc-200 md:w-auto md:border-t-0 md:border-l">
            <div className="grid w-full grid-cols-3 divide-x divide-zinc-200 bg-zinc-100 md:w-auto">
              {/* Column 1: Product */}
              <div className="flex min-w-[130px] flex-col divide-y divide-zinc-200 sm:min-w-[150px] md:min-w-[160px]">
                <div className="flex h-11 items-center bg-zinc-100 px-4 select-none sm:h-12 sm:px-5">
                  <span className="text-sm font-normal text-zinc-600">
                    Product
                  </span>
                </div>
                <Link
                  href="#pricing"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Pricing
                </Link>
                <Link
                  href="#faq"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  FAQ
                </Link>
                <Link
                  href="#features"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Features
                </Link>
                <Link
                  href="#pipeline"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Intelligent Pipeline
                </Link>
              </div>

              {/* Column 2: Company */}
              <div className="flex min-w-[130px] flex-col divide-y divide-zinc-200 sm:min-w-[150px] md:min-w-[160px]">
                <div className="flex h-11 items-center bg-zinc-100 px-4 select-none sm:h-12 sm:px-5">
                  <span className="text-sm font-normal text-zinc-600">
                    Company
                  </span>
                </div>
                <Link
                  href="#about"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  About
                </Link>
                <Link
                  href="#careers"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Careers
                </Link>
                <Link
                  href="#contact"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Contact Us
                </Link>
                {/* Row 5: Empty grid cell to keep 3x5 layout */}
                <div className="h-11 sm:h-12" />
              </div>

              {/* Column 3: Legal */}
              <div className="flex min-w-[130px] flex-col divide-y divide-zinc-200 sm:min-w-[150px] md:min-w-[160px]">
                <div className="flex h-11 items-center bg-zinc-100 px-4 select-none sm:h-12 sm:px-5">
                  <span className="text-sm font-normal text-zinc-600">
                    Legal
                  </span>
                </div>
                <Link
                  href="#privacy"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#terms"
                  className="flex h-11 items-center truncate px-4 text-sm font-normal text-zinc-800 hover:bg-zinc-200/50 hover:text-zinc-950 sm:h-12 sm:px-5"
                >
                  Terms of Service
                </Link>
                {/* Rows 4 & 5: Empty grid cells to keep 3x5 layout */}
                <div className="h-11 sm:h-12" />
                <div className="h-11 sm:h-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-y border-zinc-200 flex items-center p-4 justify-center text-zinc-400 text-sm"> © 2026 Lattice. All rights reserved. </div>
      </div>
    </footer>
  );
}
