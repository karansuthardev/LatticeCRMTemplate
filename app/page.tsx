import HeroSection from "./heroSection";
import FeaturesSection from "./featuresSection";
import TestimonialSection from "./testimonialSection";
import PipelineSection from "./pipelineSection";
import MetricsSection from "./metricsSection";
import RecentActivitySection from "./recentActivitySection";
import CtaSection from "./ctaSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full font-sans">
      <main className="mx-auto flex gap-50 h-full w-full max-w-7xl scrollbar-none scrollbar-gutter-both flex-col items-center border-x border-zinc-200 bg-zinc-100">
        <HeroSection />
        <FeaturesSection />
        <PipelineSection />
        <MetricsSection />
        <TestimonialSection />
        <RecentActivitySection />
        <CtaSection />
      </main>
    </div>
  );
}
