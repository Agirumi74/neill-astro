// ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) console.log("ThemeToggle mounted, theme =", theme);
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        try { localStorage.setItem("theme", next); } catch (e) {}
        setTheme(next);
      }}
      className="fixed top-4 right-20 z-[9999] p-2 rounded-lg border border-border bg-background/90 backdrop-blur-sm text-foreground hover:bg-muted transition-colors duration-200"
    >
      {theme === "dark" ? "☾" : "☀️"}
    </button>
  );
}
