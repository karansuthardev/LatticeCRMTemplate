import DashboardMockup from "../components/dashboardMockup";
import Link from "next/link";

export default function OldDashboardPage() {
  return (
    <main className="min-h-screen w-full bg-zinc-100 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-800">
              Archived Hero Dashboard (v1)
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              Original hero mockup preserved for reference.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50"
          >
            ← Back to Home
          </Link>
        </div>
        <div className="w-full shadow-2xl rounded-2xl overflow-hidden border border-zinc-200">
          <DashboardMockup />
        </div>
      </div>
    </main>
  );
}
