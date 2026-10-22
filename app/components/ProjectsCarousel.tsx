"use client"; // This is a client-side component
import { useState, useRef, useEffect } from "react"; // React hooks
import { projects } from "../data/projects"; // Project data
import ProjectCard from "./ProjectCard"; // Card component
import { motion } from "framer-motion"; // Animation

const CARD_COUNT = projects.length; // How many projects

// Helper for looping carousel
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

// Shortest signed distance (in slots) from centerIdx to idx, wrapping around
// the ends of the array. e.g. with 4 projects, the item "behind" centerIdx
// reports -1 rather than +3, so it slides in from the correct side.
function getOffset(idx: number, centerIdx: number, count: number) {
  const half = Math.floor(count / 2);
  return mod(idx - centerIdx + half, count) - half;
}

// Card size shrinks to fit narrow (phone) viewports so the carousel never
// overflows the screen horizontally; spacing scales with it so neighbor
// cards still peek in from the sides.
function getCardMetrics(viewportWidth: number) {
  const size = Math.max(220, Math.min(400, viewportWidth - 96));
  const spacing = Math.round(size * 0.75);
  return { size, spacing };
}

export default function ProjectsCarousel() {
  const [centerIdx, setCenterIdx] = useState(0); // Which card is in the middle
  const touchStartX = useRef<number | null>(null); // For swipe
  const [{ size: cardSize, spacing: cardSpacing }, setMetrics] = useState(() => getCardMetrics(400));

  useEffect(() => {
    const update = () => setMetrics(getCardMetrics(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Move carousel left
  const moveLeft = () => setCenterIdx((idx) => mod(idx - 1, CARD_COUNT));
  // Move carousel right
  const moveRight = () => setCenterIdx((idx) => mod(idx + 1, CARD_COUNT));

  // Start swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  // End swipe and move
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) moveLeft();
    else if (delta < -40) moveRight();
    touchStartX.current = null;
  };

  // Render carousel
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full flex items-center justify-center" style={{ minHeight: cardSize }}>
        {/* Left arrow button */}
        <button
          aria-label="Previous project"
          onClick={moveLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-[#00FF41] rounded-full p-2 shadow hover:bg-black/60 transition"
        >
          &#8592;
        </button>
        {/* All cards live in the same relative container the whole time;
            only their animated x offset changes, so Framer Motion can
            actually tween between positions instead of swapping content. */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: cardSize }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, idx) => {
            const offset = getOffset(idx, centerIdx, CARD_COUNT);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1; // only show center + immediate neighbors

            return (
              <motion.div
                key={project.title}
                animate={{
                  x: offset * cardSpacing,
                  scale: isCenter ? 1 : 0.75,
                  opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -cardSize / 2,
                  marginLeft: -cardSize / 2,
                  width: cardSize,
                  height: cardSize,
                  zIndex: isCenter ? 2 : 1,
                }}
                className={isCenter ? "" : "pointer-events-none"}
              >
                <ProjectCard {...project} />
              </motion.div>
            );
          })}
        </div>
        {/* Right arrow button */}
        <button
          aria-label="Next project"
          onClick={moveRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-[#00FF41] rounded-full p-2 shadow hover:bg-black/60 transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
