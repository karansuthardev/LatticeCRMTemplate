"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <div className="sticky top-0 z-100 w-full bg-zinc-100/90 backdrop-blur-xs">
      <div className="relative mx-auto flex max-w-7xl flex-row items-center justify-between border-x border-zinc-200 px-4 py-4">
        <div className="mb-1 flex cursor-pointer flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 36 40"
            fill="none"
            id="Logo"
          >
            <g id="logomark">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
                fill="var(--color-olive-900)"
              />
            </g>
          </svg>
          <p className="text-2xl font-black text-zinc-900">
            La<span className="italic mr-px tracking-wide">tt</span>ice
          </p>
        </div>

        <div className="text-sm absolute inset-x-0 mx-auto flex h-fit w-fit flex-row items-center gap-4 text-zinc-800 mix">
          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Features</p>
          </div>

          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Product</p>
          </div>

          <div
            onMouseEnter={() => {
              setCompanyOpen(true);
            }}
            onMouseLeave={() => {
              setCompanyOpen(false);
            }}
            className="flex h-fit cursor-pointer flex-row items-center gap-1 rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200"
          >
            <p className="">Company</p>
            <div className="mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                color="currentColor"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
              </svg>
            </div>

            <div></div>
          </div>

          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Pricing</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <button className="text-sm rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-1.5 text-zinc-800 transition-colors duration-200 hover:bg-zinc-200">
            <p className="font-medium text-shadow-xs">Sign in</p>
          </button>
          <button className="text-sm rounded-xl border border-orange-800 bg-orange-600 px-4 py-1.5 text-zinc-100 shadow-xs transition-colors duration-200 hover:bg-orange-700">
            <p className="font-medium text-shadow-2xs">Try Demo</p>
          </button>
        </div>
      </div>
    </div>
  );
}
