// src/hooks/useTheme.js
import { useEffect } from "react";
export function useTheme() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    // Optional: clear any old preference
    try { localStorage.removeItem("theme"); } catch {}
  }, []);
  return { theme: "dark" };
}
