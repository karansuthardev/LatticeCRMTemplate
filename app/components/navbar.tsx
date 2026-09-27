"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [companyOpen, setCompanyOpen] = useState(false);
  
  return (
    <div className="absolute top-0 z-20 w-full backdrop-blur-2xl">
      <div className="relative mx-auto flex max-w-7xl flex-row items-center justify-between border-x border-zinc-200 px-4 py-4">
        <div className="mb-1 flex cursor-pointer flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="24"
            viewBox="0 0 70 40"
            fill="none"
            id="Logo"
          >
            {" "}
            <g id="logomark">
              {" "}
              <path
                d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z"
                fill="var(--color-olive-900)"
              />{" "}
              <path
                d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z"
                fill="var(--color-olive-900)"
              />{" "}
            </g>{" "}
          </svg>
          <p className="text-2xl font-black text-zinc-900">
            La<span className="italic">tt</span>ice
          </p>
        </div>

        <div className="text-md absolute inset-x-0 mx-auto flex h-fit w-fit flex-row items-center gap-4 text-zinc-800">
          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Features</p>
          </div>

          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Product</p>
          </div>

          <div onMouseEnter={() => { setCompanyOpen(true); }} onMouseLeave={()=>{setCompanyOpen(false)}} className="flex h-fit cursor-pointer flex-row items-center gap-1 rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
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
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"></path>
              </svg>
            </div>
            
          </div>

          <div className="h-fit cursor-pointer rounded-xl border-none px-3 py-1 font-medium transition-colors duration-150 hover:bg-zinc-200">
            <p className="">Pricing</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <button className="text-md rounded-2xl border border-zinc-300 bg-transparent px-4 py-1.5 text-zinc-800 transition-colors duration-200 hover:bg-zinc-200">
            <p className="font-medium text-shadow-xs">Sign in</p>
          </button>
          <button className="text-md rounded-2xl border border-indigo-800 bg-indigo-600 px-4 py-1.5 text-zinc-100 shadow-xs transition-colors duration-200 hover:bg-indigo-700">
            <p className="font-medium text-shadow-2xs">Try Demo</p>
          </button>
        </div>
      </div>
    </div>
  );
}
