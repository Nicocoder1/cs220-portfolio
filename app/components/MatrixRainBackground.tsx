"use client";
import { useEffect, useRef } from "react";


const MATRIX_COLORS = {
  base: "#0D0208",
  trail: "#003B00",
  glyph: "#008F11",
  glow: "#00FF41",
};

const RAIN_SPEED = 0.1; // 0.3 (slow) to 1.0 (fast)
const STEADY_STATE_DENSITY = 0.5; // Fraction of columns that keep re-dropping once they finish their first fall. 1 = stays as busy as the opening wave forever; lower = sparser afterward.
const COOLDOWN_FRAMES: [number, number] = [120, 400]; // How many frames a column sits idle before it's eligible to drop again

function getRandomGlyph() {
  const glyphs = "アァカサタナハマヤャラェケセテネゴゾドボポヴ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

export default function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;

    // Responsive sizing
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain setup
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    // All columns start active so the first wave falls together; once a
    // column reaches the bottom it either keeps going (STEADY_STATE_DENSITY
    // chance) or goes idle for a random cooldown, thinning the rain out.
    const active = Array(columns).fill(true);
    const cooldown = Array(columns).fill(0);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = MATRIX_COLORS.base;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.8;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        if (!active[i]) {
          cooldown[i] -= 1;
          if (cooldown[i] <= 0) {
            active[i] = true;
            drops[i] = 0;
          }
          continue;
        }

        // Brightest glyph
        ctx.fillStyle = MATRIX_COLORS.glow;
        ctx.shadowColor = MATRIX_COLORS.glow;
        ctx.shadowBlur = 8;
        const glyph = getRandomGlyph();
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);

        // Trail
        ctx.fillStyle = MATRIX_COLORS.glyph;
        ctx.shadowBlur = 0;
        for (let t = 1; t < 4; t++) {
          const trailGlyph = getRandomGlyph();
          ctx.globalAlpha = 0.5 - t * 0.12;
          ctx.fillText(trailGlyph, i * fontSize, (drops[i] - t) * fontSize);
        }
        ctx.globalAlpha = 0.8;

        // Move drop
        if (canvas && drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          if (Math.random() < STEADY_STATE_DENSITY) {
            drops[i] = 0;
          } else {
            active[i] = false;
            cooldown[i] = Math.floor(
              COOLDOWN_FRAMES[0] + Math.random() * (COOLDOWN_FRAMES[1] - COOLDOWN_FRAMES[0])
            );
          }
        }
        drops[i] += (Math.random() * 1.5 + 0.8) * RAIN_SPEED;
      }
    }

    function animate() {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Fallback for reduced motion
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {prefersReducedMotion ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(to bottom, #0D0208, #003B00, #008F11)",
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          width={typeof window !== "undefined" ? window.innerWidth : 1920}
          height={typeof window !== "undefined" ? window.innerHeight : 1080}
          style={{
            display: "block",
            width: "100vw",
            height: "100vh",
            background: MATRIX_COLORS.base,
          }}
        />
      )}
    </div>
  );
}
