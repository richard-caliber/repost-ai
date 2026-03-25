"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  startCheckout,
  checkSubscription,
  getRepostUsage,
  incrementRepostCount,
} from "@/lib/subscription";
import {
  saveToHistory,
  formatResultAsClipboard,
  formatResultAsMarkdown,
  exportAsContentCalendarCSV,
  HistoryEntry,
} from "@/lib/history";

const PLATFORMS = [
  { id: "twitter", label: "Twitter / X", icon: "\u{1D54F}" },
  { id: "instagram", label: "Instagram", icon: "\uD83D\uDCF8" },
  { id: "linkedin", label: "LinkedIn", icon: "in" },
  { id: "email", label: "Email", icon: "\u2709" },
  { id: "reddit", label: "Reddit", icon: "\uD83D\uDD17" },
];

const TONES = ["Professional", "Casual", "Witty", "Edgy"];

const PLACEHOLDER_CONTENT = `Example: "We just launched our new AI-powered analytics dashboard. It processes 10M events per second, gives you real-time insights, and costs 70% less than the competition. After 18 months of building in stealth, we're finally live. Here's what we learned..."

Paste your blog post, article, tweet thread, or any content here and hit Repost.`;

interface RepostResult {
  twitter?: string[];
  instagram?: string[];
  linkedin?: string[];
  email?: { subject: string; body: string };
  reddit?: { title: string; body: string };
}

// ── Demo data ──────────────────────────────────────────────────

const DEMO_INPUT =
  "Building a startup is like assembling a plane mid-flight. You don't have all the pieces, the engine is half-built, and passengers are already boarding. But the ones who figure it out in the air are the ones who change the world.";

const DEMO_RESULT: RepostResult = {
  twitter: [
    "Building a startup is like assembling a plane mid-flight.\n\nYou don't have all the pieces. The engine is half-built. Passengers are already boarding.\n\nBut the ones who figure it out in the air? They change the world.",
    "The best founders don't wait until everything is ready.\n\nThey ship, learn, iterate.\n\nPerfection is the enemy of progress.",
    "Hot take: the messiest startups win.\n\nNot because chaos is good — but because speed beats perfection every single time.",
  ],
  instagram: [
    "Building a startup is like assembling a plane mid-flight. \u2708\uFE0F\n\nYou don't have all the pieces. The engine is half-built. And passengers are already boarding.\n\nBut here's the thing \u2014 the founders who figure it out in the air are the ones who change the world. \uD83C\uDF0D\n\nStop waiting for perfect. Start building.\n\n#Startup #Entrepreneurship #BuildInPublic #FounderLife #StartupLife #Business #Motivation #Innovation #Tech #GrowthMindset #Hustle #CEO #StartupFounder #NeverSettle",
  ],
  linkedin: [
    "Building a startup is like assembling a plane mid-flight.\n\nYou don't have all the pieces.\nThe engine is half-built.\nPassengers are already boarding.\n\nBut the founders who figure it out in the air? They're the ones who change the world.\n\nI've seen this pattern again and again: the teams that ship fast, learn faster, and embrace the chaos — they win. Not because chaos is a strategy, but because momentum is.\n\nThe alternative is sitting on the runway, polishing a plane that never takes off.\n\nWhat's one thing you shipped before it was \"ready\"? I'd love to hear the story.\n\n#Startup #Entrepreneurship #Leadership #BuildInPublic #FounderLife",
  ],
  email: {
    subject:
      "The startup advice nobody gives you (but should)",
    body: "Hi there,\n\nI've been thinking about what separates the startups that make it from the ones that don't.\n\nIt's not funding. It's not the idea. It's not even the team.\n\nIt's the willingness to build the plane while flying it.\n\nThe best founders I know didn't wait until everything was perfect. They shipped, broke things, fixed them, and shipped again.\n\nIf you're building something right now and it feels messy — that's normal. That's how it's supposed to feel.\n\nKeep building.\n\n[Read the full post \u2192]\n\nTalk soon.",
  },
  reddit: {
    title:
      "Building a startup is like assembling a plane mid-flight — and that's actually the point",
    body: "I've been building startups for a few years now and the one thing I keep coming back to is this:\n\nYou're never ready. The product is never finished. The market is always shifting.\n\nThe founders who win aren't the ones with the perfect plan. They're the ones who can build, learn, and adapt faster than everyone else.\n\nAnyone else feel like they're constantly assembling the plane while flying it? How do you deal with the uncertainty?",
  },
};

// ── Utility components ─────────────────────────────────────────

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

function CopyAllButton({ result }: { result: RepostResult }) {
  const [copied, setCopied] = useState(false);
  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(
      formatResultAsClipboard(result as Record<string, unknown>)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopyAll}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-surface-hover transition-all font-medium text-sm"
    >
      {copied ? (
        <span className="text-green-400 animate-fade-in">All copied!</span>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy All
        </>
      )}
    </button>
  );
}

function CharCount({ text, max }: { text: string; max?: number }) {
  const len = text.length;
  const over = max && len > max;
  return (
    <span className={`text-xs ${over ? "text-red-400 font-medium" : "text-muted"}`}>
      {len}{max ? `/${max}` : ""} chars{over && " — over limit!"}
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

function PlatformSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
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

function OutputCard({ text, label, maxChars }: { text: string; label?: string; maxChars?: number }) {
  const over = maxChars && text.length > maxChars;
  return (
    <div className={`p-4 rounded-xl border bg-surface hover:bg-surface-hover transition-colors ${over ? "border-red-500/30" : "border-border"}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted font-medium">{label}</span>
          {over && <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-medium">Over limit</span>}
        </div>
      )}
      <p className="text-sm whitespace-pre-wrap mb-3 leading-relaxed">{text}</p>
      <div className="flex items-center justify-between">
        <CharCount text={text} max={maxChars} />
        <CopyButton text={text} />
      </div>
    </div>
  );
}

// ── Platform Stats ─────────────────────────────────────────────

function PlatformStats({ result, platforms }: { result: RepostResult; platforms: string[] }) {
  const stats: { platform: string; label: string; status: string; ok: boolean }[] = [];

  if (result.twitter && platforms.includes("twitter")) {
    const longest = Math.max(...result.twitter.map((t) => t.length));
    const ok = longest <= 280;
    stats.push({
      platform: "Twitter",
      label: `${longest}/280 chars`,
      status: ok ? "within limit" : "over limit",
      ok,
    });
  }

  if (result.linkedin && platforms.includes("linkedin")) {
    const longest = Math.max(...result.linkedin.map((p) => p.length));
    const ok = longest >= 200 && longest <= 3000;
    stats.push({
      platform: "LinkedIn",
      label: `${longest.toLocaleString()} chars`,
      status: ok ? "optimal range" : longest < 200 ? "short" : "long",
      ok,
    });
  }

  if (result.instagram && platforms.includes("instagram")) {
    const allText = result.instagram.join(" ");
    const hashtags = (allText.match(/#\w+/g) || []).length;
    const ok = hashtags >= 5 && hashtags <= 30;
    stats.push({
      platform: "Instagram",
      label: `${hashtags} hashtags`,
      status: ok ? "good range" : hashtags < 5 ? "needs more" : "too many",
      ok,
    });
  }

  if (result.reddit && platforms.includes("reddit")) {
    stats.push({
      platform: "Reddit",
      label: "conversational tone",
      status: "authentic",
      ok: true,
    });
  }

  if (result.email && platforms.includes("email")) {
    const len = (result.email.body || "").length;
    const ok = len >= 100 && len <= 1500;
    stats.push({
      platform: "Email",
      label: `${len} chars`,
      status: ok ? "scannable length" : "review length",
      ok,
    });
  }

  if (stats.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mb-6 animate-fade-in">
      {stats.map((s) => (
        <div
          key={s.platform}
          className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
            s.ok ? "border-green-500/20 bg-green-500/5 text-green-400" : "border-yellow-500/20 bg-yellow-500/5 text-yellow-400"
          }`}
        >
          <span>{s.ok ? "\u2705" : "\u26A0\uFE0F"}</span>
          <span className="font-medium">{s.platform}:</span>
          <span>{s.label} ({s.status})</span>
        </div>
      ))}
    </div>
  );
}

// ── Animated Demo ──────────────────────────────────────────────

function AnimatedDemo({ onTryIt }: { onTryIt: () => void }) {
  const [phase, setPhase] = useState<"typing" | "generating" | "done">("typing");
  const [typedText, setTypedText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypedText(DEMO_INPUT.slice(0, i));
      if (i >= DEMO_INPUT.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setPhase("generating"), 500);
        setTimeout(() => setPhase("done"), 2000);
      }
    }, 15);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="mb-10 p-6 rounded-2xl border border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="text-xs text-muted ml-2">Live Demo</span>
      </div>

      {/* Input area */}
      <div className="p-3 rounded-lg bg-background border border-border mb-4">
        <p className="text-xs text-muted mb-1 font-medium">Input</p>
        <p className="text-sm min-h-[3rem]">
          {typedText}
          {phase === "typing" && <span className="animate-pulse text-primary">|</span>}
        </p>
      </div>

      {/* Generating state */}
      {phase === "generating" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border animate-fade-in">
          <svg className="w-5 h-5 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-primary font-medium">Generating for Twitter, LinkedIn, Instagram...</span>
        </div>
      )}

      {/* Results preview */}
      {phase === "done" && (
        <div className="space-y-3 animate-fade-in">
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary">{"𝕏"} Twitter / X</span>
              <span className="text-xs text-green-400">{"✅"} 247/280 chars</span>
            </div>
            <p className="text-xs text-muted line-clamp-2">{DEMO_RESULT.twitter?.[0]?.slice(0, 120)}...</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary">{"💼"} LinkedIn</span>
              <span className="text-xs text-green-400">{"✅"} optimal range</span>
            </div>
            <p className="text-xs text-muted line-clamp-2">{DEMO_RESULT.linkedin?.[0]?.slice(0, 120)}...</p>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary">{"📸"} Instagram</span>
              <span className="text-xs text-green-400">{"✅"} 14 hashtags</span>
            </div>
            <p className="text-xs text-muted line-clamp-2">{DEMO_RESULT.instagram?.[0]?.slice(0, 120)}...</p>
          </div>

          <button
            onClick={onTryIt}
            className="w-full mt-2 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-colors text-sm"
          >
            Try it yourself — paste any content below
          </button>
        </div>
      )}
    </div>
  );
}

// ── Upsell Banners ─────────────────────────────────────────────

function UpsellBanner({ repostCount }: { repostCount: number }) {
  if (repostCount === 1) {
    return (
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 animate-fade-in">
        <p className="text-sm font-medium text-primary">
          Want to schedule these posts automatically?{" "}
          <Link href="/pricing" className="underline font-semibold">Upgrade to Pro {"🔄"}</Link>
        </p>
      </div>
    );
  }
  if (repostCount === 2) {
    return (
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 animate-fade-in">
        <p className="text-sm font-medium text-primary">
          Pro members save 2+ hours per day on content creation.{" "}
          <Link href="/pricing" className="underline font-semibold">$9/mo {"→"}</Link>
        </p>
      </div>
    );
  }
  return null;
}

// ── Content Calendar Export Button ──────────────────────────────

function CalendarExportButton({
  result,
  originalText,
  tone,
  platforms,
  isPro,
}: {
  result: RepostResult;
  originalText: string;
  tone: string;
  platforms: string[];
  isPro: boolean;
}) {
  const [showLock, setShowLock] = useState(false);

  const handleExport = () => {
    if (!isPro) {
      setShowLock(true);
      return;
    }
    const entry: HistoryEntry = {
      id: "export",
      originalText,
      tone,
      platforms,
      result: result as Record<string, unknown>,
      createdAt: new Date().toISOString(),
    };
    const csv = exportAsContentCalendarCSV(entry);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content-calendar.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-surface-hover transition-all font-medium text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Export Calendar
        {!isPro && <span className="text-xs text-primary font-medium">PRO</span>}
      </button>
      {showLock && !isPro && (
        <div className="absolute top-full left-0 mt-2 p-3 rounded-lg bg-background border border-border shadow-lg z-10 w-64 animate-fade-in">
          <p className="text-sm font-medium mb-1">Export to content calendar</p>
          <p className="text-xs text-muted mb-2">Pro feature — exports CSV with platform, content, char count, hashtags, and suggested post times.</p>
          <Link href="/pricing" className="text-xs text-primary hover:underline font-medium">
            Upgrade to Pro - $9/mo {"→"}
          </Link>
          <button onClick={() => setShowLock(false)} className="block text-xs text-muted mt-1 hover:text-foreground">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

// ── Download Button ────────────────────────────────────────────

function DownloadButton({
  result,
  originalText,
  tone,
  platforms,
}: {
  result: RepostResult;
  originalText: string;
  tone: string;
  platforms: string[];
}) {
  const handleDownload = () => {
    const entry: HistoryEntry = {
      id: "download",
      originalText,
      tone,
      platforms,
      result: result as Record<string, unknown>,
      createdAt: new Date().toISOString(),
    };
    const md = formatResultAsMarkdown(entry);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "repostai-output.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-surface-hover transition-all font-medium text-sm"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download .md
    </button>
  );
}

// ── Results Display ────────────────────────────────────────────

function ResultsDisplay({
  result,
  platforms,
  isDemo,
  originalText,
  tone,
  isPro,
}: {
  result: RepostResult;
  platforms: string[];
  isDemo?: boolean;
  originalText?: string;
  tone?: string;
  isPro?: boolean;
}) {
  return (
    <div>
      {isDemo && (
        <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-primary font-medium">
            Demo output — paste your own content above and hit Repost to generate yours
          </p>
        </div>
      )}

      {!isDemo && <PlatformStats result={result} platforms={platforms} />}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold">
          {isDemo ? "Example output" : "Your repurposed content"}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <CopyAllButton result={result} />
          {!isDemo && originalText && tone && (
            <>
              <DownloadButton result={result} originalText={originalText} tone={tone} platforms={platforms} />
              <CalendarExportButton
                result={result}
                originalText={originalText}
                tone={tone}
                platforms={platforms}
                isPro={isPro || false}
              />
            </>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {result.twitter && platforms.includes("twitter") && result.twitter.length > 0 && (
          <PlatformSection title="Twitter / X" icon="\u{1D54F}">
            {result.twitter.map((tweet, i) => (
              <OutputCard key={i} text={tweet} label={`Tweet ${i + 1}`} maxChars={280} />
            ))}
          </PlatformSection>
        )}

        {result.instagram && platforms.includes("instagram") && result.instagram.length > 0 && (
          <PlatformSection title="Instagram" icon="\uD83D\uDCF8">
            {result.instagram.map((cap, i) => (
              <OutputCard key={i} text={cap} label={`Caption ${i + 1}`} maxChars={2200} />
            ))}
          </PlatformSection>
        )}

        {result.linkedin && platforms.includes("linkedin") && result.linkedin.length > 0 && (
          <PlatformSection title="LinkedIn" icon="\uD83D\uDCBC">
            {result.linkedin.map((post, i) => (
              <OutputCard key={i} text={post} label={`Post ${i + 1}`} maxChars={3000} />
            ))}
          </PlatformSection>
        )}

        {result.email && platforms.includes("email") && (
          <PlatformSection title="Email Newsletter" icon="\u2709\uFE0F">
            <OutputCard text={`Subject: ${result.email.subject}\n\n${result.email.body}`} label="Newsletter Snippet" />
          </PlatformSection>
        )}

        {result.reddit && platforms.includes("reddit") && (
          <PlatformSection title="Reddit" icon="\uD83D\uDD17">
            <OutputCard text={`${result.reddit.title}\n\n${result.reddit.body}`} label="Reddit Post" />
          </PlatformSection>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────

export default function AppPage() {
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [platforms, setPlatforms] = useState<string[]>(PLATFORMS.map((p) => p.id));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RepostResult | null>(null);
  const [error, setError] = useState("");
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(3);
  const [totalReposts, setTotalReposts] = useState(0);
  const [showDemo, setShowDemo] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    checkSubscription().then((sub) => setIsSubscribed(sub.active));
    const usage = getRepostUsage();
    setRemaining(usage.remaining);
    setTotalReposts(usage.count);
  }, []);

  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const scrollToTextarea = () => {
    setShowDemo(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
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

    if (!isSubscribed) {
      const usage = getRepostUsage();
      if (usage.remaining <= 0) {
        setShowLimitModal(true);
        return;
      }
    }

    setError("");
    setLoading(true);
    setResult(null);
    setShowDemo(false);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const custId = localStorage.getItem("repostai_customer_id");
      if (custId) headers["x-customer-id"] = custId;

      const res = await fetch("/api/repost", {
        method: "POST",
        headers,
        body: JSON.stringify({ content, tone: tone.toLowerCase(), platforms }),
      });

      const data = await res.json();

      if (res.status === 429 && !isSubscribed) {
        setRemaining(0);
        setShowLimitModal(true);
        return;
      }

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data.result);

      // Save to history
      saveToHistory({
        originalText: content,
        tone,
        platforms,
        result: data.result,
      });

      // Track usage for free users
      if (!isSubscribed) {
        incrementRepostCount();
        const usage = getRepostUsage();
        setRemaining(usage.remaining);
        setTotalReposts(usage.count);
      } else {
        setTotalReposts((prev) => prev + 1);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ── Rate Limit Modal (3rd repost hit) ── */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl p-8 max-w-lg w-full text-center animate-fade-in">
            <div className="text-4xl mb-4">{"⚡"}</div>
            <h3 className="text-xl font-bold mb-2">You&apos;ve used your 3 free reposts today!</h3>
            <p className="text-muted mb-2 text-sm">
              Upgrade to Pro for unlimited reposts, history, and scheduling.
            </p>
            <p className="text-xs text-primary font-medium mb-6">
              That&apos;s 30 cents a day to save 2+ hours of rewriting.
            </p>
            <div className="space-y-2">
              <button
                onClick={async () => {
                  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL;
                  if (!priceId) { window.location.href = "/pricing"; return; }
                  setCheckoutLoading("pro-annual");
                  try { await startCheckout(priceId); } catch { window.location.href = "/pricing"; }
                }}
                disabled={checkoutLoading === "pro-annual"}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-medium disabled:opacity-50 relative"
              >
                <span className="absolute -top-2 right-4 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">BEST VALUE</span>
                {checkoutLoading === "pro-annual" ? "Redirecting..." : "Pro Annual — $79/yr (Save 27%)"}
              </button>
              <button
                onClick={async () => {
                  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY;
                  if (!priceId) { window.location.href = "/pricing"; return; }
                  setCheckoutLoading("pro-monthly");
                  try { await startCheckout(priceId); } catch { window.location.href = "/pricing"; }
                }}
                disabled={checkoutLoading === "pro-monthly"}
                className="w-full py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium disabled:opacity-50"
              >
                {checkoutLoading === "pro-monthly" ? "Redirecting..." : "Pro Monthly — $9/mo"}
              </button>
              <button
                onClick={() => window.location.href = "/pricing"}
                className="w-full py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium text-sm"
              >
                Agency — $29/mo (team + brand voice + API)
              </button>
              <button
                onClick={() => setShowLimitModal(false)}
                className="text-muted text-sm hover:text-foreground mt-1"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Animated Demo (above the fold) ── */}
      {showDemo && !result && !loading && (
        <AnimatedDemo onTryIt={scrollToTextarea} />
      )}

      {/* ── Input Section ── */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Repost your content</h1>
        <p className="text-muted mb-6">
          Paste any content below and get platform-perfect posts instantly.
        </p>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={PLACEHOLDER_CONTENT}
          className="w-full h-48 p-4 rounded-xl border border-border bg-surface placeholder:text-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Tone</label>
            <div className="flex gap-2 flex-wrap">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-sm px-4 py-2 rounded-lg border transition-all font-medium ${
                    tone === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-surface-hover"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

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

        {!isSubscribed && (
          <div className="mt-4 flex items-center gap-2">
            <div className={`text-sm font-medium ${remaining === 0 ? "text-red-400" : remaining === 1 ? "text-yellow-400" : "text-muted"}`}>
              {remaining}/3 free reposts remaining today
            </div>
            {remaining === 0 && (
              <button onClick={() => setShowLimitModal(true)} className="text-xs text-primary hover:underline font-medium">
                Upgrade
              </button>
            )}
          </div>
        )}

        <button
          onClick={handleRepost}
          disabled={loading}
          className="mt-3 w-full sm:w-auto bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-base px-8 py-3.5 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          ) : (
            "Repost ✨"
          )}
        </button>
      </div>

      {/* ── Loading Skeletons ── */}
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

      {/* ── Real Results ── */}
      {result && !loading && (
        <>
          {/* Upsell banner (free users only) */}
          {!isSubscribed && totalReposts > 0 && totalReposts < 3 && (
            <div className="mb-6">
              <UpsellBanner repostCount={totalReposts} />
            </div>
          )}

          <ResultsDisplay
            result={result}
            platforms={platforms}
            originalText={content}
            tone={tone}
            isPro={isSubscribed}
          />
        </>
      )}

      {/* ── Demo Results (when no real results and demo dismissed) ── */}
      {!result && !loading && !showDemo && (
        <ResultsDisplay result={DEMO_RESULT} platforms={platforms} isDemo />
      )}
    </div>
  );
}
