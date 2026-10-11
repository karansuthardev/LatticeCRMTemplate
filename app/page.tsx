import Image from "next/image";
import HeroSection from "./heroSection";
import FeaturesSection from "./featuresSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full font-sans">
      <main className="mx-auto flex h-full w-full max-w-7xl scrollbar-none scrollbar-gutter-both flex-col items-center border-x border-zinc-200 bg-zinc-100">
        <HeroSection />
        <FeaturesSection />

        {/* ── Testimonial Section ─────────────────────────────────── */}
        <section className="relative w-full items-center justify-center p-24">
          <div className="flex relative z-10 flex-row items-center justify-start gap-10 border border-zinc-200">
            <div className="relative aspect-square size-75 border-r border-zinc-200 bg-zinc-200">
              <Image
                src="/daniel_mercer.webp"
                alt="Daniel Mercer, CEO at Quanta"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right: Testimonial content */}
            <div className="flex h-full flex-1 flex-col items-start justify-between gap-6 p-2">
              <blockquote className="font-serif text-2xl leading-normal font-normal text-pretty text-zinc-700">
                “Quanta has taken a lot of the friction out of our sales
                process. We spend less time chasing updates, piecing together
                customer history, and figuring out what needs attention. Our
                team can focus on selling, follow-ups happen faster, and we’ve
                seen a noticeable improvement in both pipeline velocity and
                conversion.”
              </blockquote>
              <p className="text-2xl font-medium text-zinc-800 ">
                Daniel Mercer, CEO at Quanta
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
