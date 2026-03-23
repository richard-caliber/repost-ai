"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-lg">
            Repost<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/app"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            App
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-surface-hover transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <Link
            href="/app"
            className="bg-primary hover:bg-primary-hover text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Try Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
