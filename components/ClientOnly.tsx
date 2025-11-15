"use client";

import { useEffect, useState } from "react";

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, and before first client render, render nothing.
  if (!mounted) return null;

  return <>{children}</>;
}
