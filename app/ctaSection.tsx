import React from "react";
import Button from "./components/button";

export default function CtaSection() {
  return (
    <section className="mb-50 flex w-full flex-col items-center justify-center px-4 text-center">
      <h2 className="text-5xl font-medium tracking-tight text-zinc-700 text-pretty text-center">
        Let your CRM <span className="text-zinc-800">do more.</span>
      </h2>

      <div className="mt-8 flex flex-row items-center justify-center gap-4">
        <Button variant="secondary" href="#pricing">
          See Pricing
        </Button>
        <Button variant="primary" href="#demo">
          Try a Demo
        </Button>
      </div>
    </section>
  );
}
