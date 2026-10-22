
"use client"; // Client-side component
import Link from "next/link"; // For navigation
import { motion } from "framer-motion"; // For animation

// Hero section at the top of the page
export default function HeroSection() {
  return (
    <section className="w-full flex justify-center px-4">
      {/* Animated glassy card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl border-2 border-[#00FF41] bg-[radial-gradient(600px_400px_at_0%_0%,#00FF41_0%,rgba(0,143,17,0.7)_40%,rgba(13,2,8,0.92)_70%),radial-gradient(600px_400px_at_100%_100%,#00FF41_0%,rgba(0,143,17,0.7)_40%,rgba(13,2,8,0.92)_70%)] backdrop-blur-md shadow-[0_0_32px_#00FF41,0_0_0_4px_#00FF41] w-full max-w-[840px] min-h-[21dvh] p-4 sm:p-6 overflow-hidden"
        style={{ minHeight: "140px" }}
      >
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-1/3 pointer-events-none z-0" style={{background: "linear-gradient(180deg,rgba(120,180,255,0.18) 0%,rgba(255,255,255,0) 100%)"}}></div>
        {/* Main hero content */}
        <div className="relative z-10 w-full flex flex-col items-center p-3 sm:p-6 lg:p-9 text-center">
          {/* Intro text */}
          <p className="text-xs sm:text-sm text-[var(--muted)] mb-2 italic font-light">Hi, my name is</p>
          {/* Name and title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-[var(--fg)]">
            Nicolas Soria, I am a Full Stack Developer in training
          </h1>
          {/* Description */}
          <p className="mt-4 max-w-3xl text-[var(--fg)]/85 px-4">
            I build modern, accessible web experiences. Currently exploring
            frontend engineering and AI-powered workflows.
          </p>

          {/* Projects button and location */}
          <div className="mt-6 flex flex-col items-center justify-center gap-0">
            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-block bg-[#00FF41]/80 text-white font-bold px-4 py-2 rounded-md border border-white/20 backdrop-blur-lg shadow-[0_0_2px_#00FF41/25] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00FF41]/20 hover:shadow-[0_0_8px_#00FF41/60,0_0_2px_#00FF41/40] hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,rgba(0,255,65,0.85) 60%,rgba(255,255,255,0.18) 100%)",
                  WebkitBackdropFilter: "blur(12px)",
                  backdropFilter: "blur(12px)",
                }}
              >
                View Projects
              </Link>
            </div>
            <span className="mt-3 text-xs text-[var(--muted)] font-light">Based in Utah  Open to internships</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
