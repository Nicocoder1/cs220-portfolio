import type { ReactElement } from "react";

import HeroSection from "./components/HeroSection";
import AnimatedSection from "./components/AnimatedSection";
import Link from "next/link";

export default function Home(): ReactElement {
  return (
    <main className="scroll-smooth flex-1 flex flex-col justify-center min-h-0 min-w-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 w-full">
        <AnimatedSection id="home" aria-label="Home">
          <HeroSection />
        </AnimatedSection>
      </div>
    </main>
  );
}

