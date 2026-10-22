"use client";

import { useEffect, useState } from "react";

export default function PageFade({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Delay mounting to allow CSS animation to run on first paint
    const t = setTimeout(() => setMounted(true), 8);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page-fade flex-1 flex flex-col min-h-0 min-w-0 ${mounted ? "" : "opacity-0"}`}>{children}</div>
  );
}
