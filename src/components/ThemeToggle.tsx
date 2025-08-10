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
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        padding: 8,
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.9)",
      }}
    >
      {theme === "dark" ? "☾" : "☀️"}
    </button>
  );
}
