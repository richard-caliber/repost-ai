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

const PLACEHOLDER_CONTENT = `Example: "We just launched our new AI-powered analytics dashboard. It processes 10M events per second, gives you real-time insights, and costs 70% less than the competition. After 18 months of building in stealth, we're finally live. Here's what we learned..."

Paste your blog post, article, tweet thread, or any content here and hit Repost.`;

interface RepostResult {
  twitter?: string[];
  instagram?: string[];
  linkedin?: string[];
  email?: { subject: string; body: string };
  reddit?: { title: string; body: string };
}

const DEMO_RESULT: RepostResult = {
  twitter: [
    "We just launched an AI analytics dashboard that processes 10M events/sec at 70% less cost.\n\n18 months of stealth mode. Now we're live.\n\nHere's the thread on what we learned 🧵",
    "Lesson 1: Don't build what you can buy.\n\nWe wasted 4 months building our own ingestion pipeline. Then we found one that worked better in a weekend.\n\nFocus on your differentiator.",
    "Lesson 2: Real-time isn't a feature — it's an expectation.\n\nEvery dashboard we tested had 15-30 min delays. Users don't wait. They leave.\n\nWe made real-time the default, not the upgrade.",
  ],
  instagram: [
    "18 months of building in stealth. Today we finally go live. 🚀\n\nOur new AI-powered analytics dashboard:\n→ 10M events per second\n→ Real-time insights\n→ 70% cheaper than competitors\n\nThe journey taught us more than we expected. Swipe for the full story.\n\n#AI #Analytics #SaaS #Startup #Launch #TechStartup #DataAnalytics #ProductLaunch #BuildInPublic #StartupLife",
  ],
  linkedin: [
    "After 18 months of building in stealth, we just launched our AI-powered analytics dashboard.\n\nHere's what makes it different:\n\n→ Processes 10M events per second\n→ Real-time insights (not 15-minute delays)\n→ 70% less expensive than alternatives\n\nBut the product isn't the real story. The lessons are.\n\nWe learned that real-time isn't a premium feature anymore — it's table stakes. We learned to buy what we could and only build our differentiator. And we learned that 18 months of stealth is about 12 months too long.\n\nIf you're building a data product right now, I'd love to share more of what worked (and what didn't).\n\n#AI #Analytics #Startup #ProductLaunch #DataScience",
  ],
  email: {
    subject: "We just launched — and here's what 18 months of stealth taught us",
    body: "Hi there,\n\nAfter 18 months of building behind closed doors, our AI-powered analytics dashboard is officially live.\n\nThe highlights:\n- Processes 10M events per second\n- Real-time insights (no more waiting)\n- 70% cheaper than what you're probably using now\n\nBut honestly, the product is only half the story. The real value is in what we learned building it.\n\nIf you're curious about the lessons (including the 4 months we wasted building something that already existed), check out our launch post.\n\n[Read the full story →]\n\nTalk soon.",
  },
  reddit: {
    title: "We built an AI analytics dashboard that processes 10M events/sec — here's what 18 months of stealth mode taught us",
    body: "Hey everyone,\n\nJust launched our product after 18 months of building. It's an AI-powered analytics dashboard — real-time, handles 10M events/sec, and costs about 70% less than the big names.\n\nNot here to pitch — just wanted to share some honest lessons:\n\n1. We wasted 4 months building an ingestion pipeline from scratch. Should've bought one off the shelf. Build your differentiator, buy everything else.\n\n2. Real-time is table stakes now. Every dashboard we tested had 15-30 min delays. Users just leave.\n\n3. 18 months in stealth was too long. We should've shipped an ugly MVP at month 6.\n\nHappy to answer questions about the tech stack, the build process, or the business side. AMA.",
  },
};

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
    const parts: string[] = [];

    if (result.twitter?.length) {
      parts.push("=== TWITTER / X ===");
      result.twitter.forEach((t, i) => parts.push(`Tweet ${i + 1}:\n${t}`));
    }
    if (result.instagram?.length) {
      parts.push("\n=== INSTAGRAM ===");
      result.instagram.forEach((c, i) => parts.push(`Caption ${i + 1}:\n${c}`));
    }
    if (result.linkedin?.length) {
      parts.push("\n=== LINKEDIN ===");
      result.linkedin.forEach((p, i) => parts.push(`Post ${i + 1}:\n${p}`));
    }
    if (result.email) {
      parts.push("\n=== EMAIL ===");
      parts.push(`Subject: ${result.email.subject}\n\n${result.email.body}`);
    }
    if (result.reddit) {
      parts.push("\n=== REDDIT ===");
      parts.push(`${result.reddit.title}\n\n${result.reddit.body}`);
    }

    await navigator.clipboard.writeText(parts.join("\n\n"));
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
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
      {len}
      {max ? `/${max}` : ""} chars
      {over && " — over limit!"}
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
  const over = maxChars && text.length > maxChars;
  return (
    <div
      className={`p-4 rounded-xl border bg-surface hover:bg-surface-hover transition-colors ${
        over ? "border-red-500/30" : "border-border"
      }`}
    >
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted font-medium">{label}</span>
          {over && (
            <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-medium">
              Over limit
            </span>
          )}
        </div>
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

function ResultsDisplay({
  result,
  platforms,
  isDemo,
}: {
  result: RepostResult;
  platforms: string[];
  isDemo?: boolean;
}) {
  return (
    <div>
      {isDemo && (
        <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-primary font-medium">
            Demo output — paste your own content above and hit Repost to
            generate yours
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {isDemo ? "Example output" : "Your repurposed content"}
        </h2>
        <CopyAllButton result={result} />
      </div>

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
                  maxChars={2200}
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
                  maxChars={3000}
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
          placeholder={PLACEHOLDER_CONTENT}
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

      {/* Real Results */}
      {result && !loading && (
        <ResultsDisplay result={result} platforms={platforms} />
      )}

      {/* Demo Results (show when no real results and not loading) */}
      {!result && !loading && (
        <ResultsDisplay
          result={DEMO_RESULT}
          platforms={platforms}
          isDemo
        />
      )}
    </div>
  );
}
