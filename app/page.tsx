import HeroSection from "./heroSection";
import Image from "next/image";
import ContactsTableCard from "./components/contactsTableCard";
import CustomerTableCard from "./components/customerTableCard";
import CustomerProfileCard from "./components/customerProfileCard";
import AgentChatCard from "./components/agentChatCard";

export default function Home() {
  return (
    <div className="min-h-screen w-full font-sans">
      <main className="mx-auto flex h-full w-full max-w-7xl scrollbar-none scrollbar-gutter-both flex-col items-center border-x border-zinc-200 bg-zinc-100">
        <HeroSection />

        <div className="mt-24 mb-200 flex w-full flex-col items-start justify-start">
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
            <div className="grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden">
              <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8 pb-8">
                <p className="text-4xl font-medium text-zinc-800">
                  Consistent data
                  <span className="text-zinc-600">
                    {" "}
                    across your workspace,
                  </span>{" "}
                  always.
                </p>
                <p className="text-md font-normal tracking-wide text-pretty text-zinc-600">
                  Automatically organize records, fill missing information, and
                  keep your data consistent.
                </p>
              </div>
              <div className="relative h-full w-full bg-zinc-100">
                <Image
                  alt="bg for card"
                  src={"/background_image.webp"}
                  fill
                  className="absolute inset-0 h-full w-full shrink-0 object-cover"
                />
                <div className="absolute inset-0 m-auto flex h-110 w-150 items-center">
                  <ContactsTableCard />
                </div>
              </div>
            </div>

            <div className="grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden">
              <div className="relative h-full w-full bg-zinc-100">
                <Image
                  alt="bg for card"
                  src={"/background_image.webp"}
                  fill
                  className="absolute inset-0 h-full w-full shrink-0 object-cover"
                />
                <div className="absolute inset-0 m-auto flex h-110 w-150 items-center">
                  <CustomerTableCard />
                </div>
              </div>
              <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8 pb-8">
                <p className="text-4xl font-medium text-zinc-800">
                  Customer relations{" "}
                  <span className="inline-block text-zinc-600">
                    {" "}
                    strengthen{" "}
                  </span>
                  <br />{" "}
                  <span className="inline-block text-zinc-600">
                    with better{" "}
                  </span>{" "}
                  context.
                </p>
                <p className="text-md font-normal tracking-wide text-pretty text-zinc-600">
                  Get instant customer summaries, complete interaction history,
                  email recaps, and meeting insights.
                </p>
              </div>
            </div>

            <div className="grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden">
              <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8 pb-8">
                <p className="text-4xl font-medium text-zinc-800">
                  Informed decisions{" "} 
                  <span className="inline-block text-zinc-600">
                    {" "}
                    are{" "}
                  </span>
                  <br />{" "}
                  <span className="inline-block text-zinc-600">
                    shaped by{" "}
                  </span>{" "}
                  reliable data.
                </p>
                <p className="text-md font-normal tracking-wide text-pretty text-zinc-600">
                  Keep customer records current with every interaction, preserving accurate context across your entire team.
                </p>
              </div>
              <div className="relative h-full w-full bg-zinc-100">
                <Image
                  alt="bg for card"
                  src={"/background_image.webp"}
                  fill
                  className="absolute inset-0 h-full w-full shrink-0 object-cover"
                />
                <div className="absolute inset-0 m-auto flex h-110 w-140 items-center">
                  <CustomerProfileCard />
                </div>
              </div>
            </div>

            <div className="grid h-120 w-full grid-cols-2 grid-rows-1 divide-x divide-zinc-200 overflow-hidden">
              <div className="relative h-full w-full bg-zinc-100">
                <Image
                  alt="bg for card"
                  src={"/background_image.webp"}
                  fill
                  className="absolute inset-0 h-full w-full shrink-0 object-cover"
                />
                <div className="absolute inset-0 m-auto flex h-110 w-140 items-center">
                  <AgentChatCard />
                </div>
              </div>
              <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8 pb-8">
                <p className="text-4xl font-medium text-zinc-800">
                  Decision clarity{" "}
                  <span className="inline-block text-zinc-600">
                    {" "}
                    informed by{" "}
                  </span>
                  <br />{" "}
                  <span className="inline-block text-zinc-600">
                    intelligent{" "}
                  </span>{" "}
                  insights.
                </p>
                <p className="text-md font-normal tracking-wide text-pretty text-zinc-600">
                  Ask anything about your business and get answers grounded in
                  your CRM data and customer context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
