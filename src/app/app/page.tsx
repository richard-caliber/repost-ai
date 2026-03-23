"use client";

import { useState } from "react";

const PLATFORMS = [
  { id: "twitter", label: "Twitter / X", icon: "𝕏" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "linkedin", label: "LinkedIn", icon: "in" },
  { id: "email", label: "Email", icon: "✉" },
  { id: "reddit", label: "Reddit", icon: "🔗" },
];

const TONES = ["Professional", "Casual", "Witty", "Edgy"];

interface RepostResult {
  twitter?: string[];
  instagram?: string[];
  linkedin?: string[];
  email?: { subject: string; body: string };
  reddit?: { title: string; body: string };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-surface-hover transition-all font-medium shrink-0"
    >
      {copied ? (
        <span className="text-green-400 animate-fade-in">Copied!</span>
      ) : (
        "Copy"
      )}
    </button>
  );
}

function CharCount({ text, max }: { text: string; max?: number }) {
  const len = text.length;
  const over = max && len > max;
  return (
    <span className={`text-xs ${over ? "text-red-400" : "text-muted"}`}>
      {len}
      {max ? `/${max}` : ""} chars
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
      <div className="h-4 w-24 bg-border rounded animate-skeleton" />
      <div className="h-3 w-full bg-border rounded animate-skeleton" />
      <div className="h-3 w-3/4 bg-border rounded animate-skeleton" />
      <div className="h-3 w-5/6 bg-border rounded animate-skeleton" />
    </div>
  );
}

function PlatformSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function OutputCard({
  text,
  label,
  maxChars,
}: {
  text: string;
  label?: string;
  maxChars?: number;
}) {
  return (
    <div className="p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors">
      {label && (
        <div className="text-xs text-muted mb-2 font-medium">{label}</div>
      )}
      <p className="text-sm whitespace-pre-wrap mb-3 leading-relaxed">
        {text}
      </p>
      <div className="flex items-center justify-between">
        <CharCount text={text} max={maxChars} />
        <CopyButton text={text} />
      </div>
    </div>
  );
}

export default function AppPage() {
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [platforms, setPlatforms] = useState<string[]>(
    PLATFORMS.map((p) => p.id)
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RepostResult | null>(null);
  const [error, setError] = useState("");
  const [showLimitModal, setShowLimitModal] = useState(false);

  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleRepost = async () => {
    if (content.trim().length < 10) {
      setError("Please paste at least 10 characters of content.");
      return;
    }
    if (platforms.length === 0) {
      setError("Select at least one platform.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/repost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          tone: tone.toLowerCase(),
          platforms,
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setShowLimitModal(true);
        return;
      }

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data.result);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Rate Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Free limit reached!</h3>
            <p className="text-muted mb-6">
              You&apos;ve used your 3 free reposts for today. Upgrade to Pro for
              unlimited reposts.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLimitModal(false)}
                className="flex-1 py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium"
              >
                Maybe later
              </button>
              <a
                href="/pricing"
                className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-medium text-center"
              >
                Upgrade to Pro
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Repost your content</h1>
        <p className="text-muted mb-6">
          Paste any content below and get platform-perfect posts instantly.
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your blog post, article, tweet thread, or any content here..."
          className="w-full h-48 p-4 rounded-xl border border-border bg-surface placeholder:text-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          {/* Tone */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tone</label>
            <div className="flex gap-2 flex-wrap">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-sm px-4 py-2 rounded-lg border transition-all font-medium ${
                    tone === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-surface-hover"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="text-sm font-medium mb-2 block">Platforms</label>
            <div className="flex gap-2 flex-wrap">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`text-sm px-4 py-2 rounded-lg border transition-all font-medium ${
                    platforms.includes(p.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-surface-hover text-muted"
                  }`}
                >
                  <span className="mr-1.5">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleRepost}
          disabled={loading}
          className="mt-6 w-full sm:w-auto bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-base px-8 py-3.5 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            "Repost ✨"
          )}
        </button>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="space-y-8">
          {platforms.map((p) => (
            <div key={p} className="space-y-3">
              <div className="h-6 w-32 bg-border rounded animate-skeleton" />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-10">
          {result.twitter &&
            platforms.includes("twitter") &&
            result.twitter.length > 0 && (
              <PlatformSection title="Twitter / X" icon="𝕏">
                {result.twitter.map((tweet, i) => (
                  <OutputCard
                    key={i}
                    text={tweet}
                    label={`Tweet ${i + 1}`}
                    maxChars={280}
                  />
                ))}
              </PlatformSection>
            )}

          {result.instagram &&
            platforms.includes("instagram") &&
            result.instagram.length > 0 && (
              <PlatformSection title="Instagram" icon="📸">
                {result.instagram.map((cap, i) => (
                  <OutputCard
                    key={i}
                    text={cap}
                    label={`Caption ${i + 1}`}
                  />
                ))}
              </PlatformSection>
            )}

          {result.linkedin &&
            platforms.includes("linkedin") &&
            result.linkedin.length > 0 && (
              <PlatformSection title="LinkedIn" icon="💼">
                {result.linkedin.map((post, i) => (
                  <OutputCard
                    key={i}
                    text={post}
                    label={`Post ${i + 1}`}
                  />
                ))}
              </PlatformSection>
            )}

          {result.email && platforms.includes("email") && (
            <PlatformSection title="Email Newsletter" icon="✉️">
              <OutputCard
                text={`Subject: ${result.email.subject}\n\n${result.email.body}`}
                label="Newsletter Snippet"
              />
            </PlatformSection>
          )}

          {result.reddit && platforms.includes("reddit") && (
            <PlatformSection title="Reddit" icon="🔗">
              <OutputCard
                text={`${result.reddit.title}\n\n${result.reddit.body}`}
                label="Reddit Post"
              />
            </PlatformSection>
          )}
        </div>
      )}
    </div>
  );
}
