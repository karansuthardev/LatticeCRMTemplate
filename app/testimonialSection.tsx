import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section className="relative w-full items-center justify-center p-24 my-24">
      <div className="relative z-10 flex flex-row items-center justify-start gap-10 border border-zinc-300">
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
          <blockquote className="text-xl leading-normal font-normal text-pretty text-zinc-800">
            “Quanta has taken a lot of the friction out of our sales
            process. We spend less time chasing updates, piecing together
            customer history, and figuring out what needs attention. Our
            team can focus on selling, follow-ups happen faster, and we’ve
            seen a noticeable improvement in both pipeline velocity and
            conversion.”
          </blockquote>
          <p className="text-2xl font-medium text-zinc-800">
            Daniel Mercer, CEO at Quanta
          </p>
        </div>
      </div>
    </section>
  );
}
