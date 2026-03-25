import Link from "next/link";
import { Footer } from "@/components/Footer";

const steps = [
  {
    num: "1",
    title: "Paste your content",
    desc: "Drop in any blog post, tweet, article, or newsletter. One piece of content is all you need.",
  },
  {
    num: "2",
    title: "Pick your platforms & tone",
    desc: "Choose Twitter, LinkedIn, Instagram, Email, Reddit. Set your vibe: Professional, Casual, Witty, or Edgy.",
  },
  {
    num: "3",
    title: "Get every post in 10 seconds",
    desc: "Platform-optimised posts with correct character counts, hashtags, and formatting. Copy with one click.",
  },
];

const features = [
  {
    icon: "🔁",
    title: "5 platforms, 1 click",
    desc: "Twitter threads, Instagram captions with hashtags, LinkedIn posts, email snippets, Reddit posts.",
  },
  {
    icon: "🎯",
    title: "Tone matching",
    desc: "Not generic AI slop. Choose Professional, Casual, Witty, or Edgy — it matches YOUR voice.",
  },
  {
    icon: "📊",
    title: "Platform stats",
    desc: "See character counts, hashtag counts, and guideline compliance for every platform instantly.",
  },
  {
    icon: "📅",
    title: "Content calendar export",
    desc: "Export all posts as a CSV with suggested posting times. Plug into any scheduler.",
  },
  {
    icon: "📜",
    title: "Full history",
    desc: "Every repost saved. Search, copy, download as markdown. Never lose a post again.",
  },
  {
    icon: "⚡",
    title: "10 second generation",
    desc: "Paste, click, done. What used to take 2 hours now takes less time than making coffee.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Solopreneur",
    quote: "I used to spend my entire Sunday rewriting content for each platform. Now I paste once and I'm done in 10 seconds.",
  },
  {
    name: "Marcus T.",
    role: "Agency Marketer",
    quote: "We manage 12 client accounts. RepostAI cut our content repurposing time by 80%. The tone matching is scarily accurate.",
  },
  {
    name: "Jess L.",
    role: "Content Creator",
    quote: "The Instagram captions with hashtags alone are worth it. I went from 3 posts a week to daily across all platforms.",
  },
  {
    name: "David R.",
    role: "Newsletter Writer",
    quote: "I write one newsletter and RepostAI turns it into a week of social content. The ROI is insane.",
  },
];

export default function ForCreatorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animate-hero-gradient pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
            Join creators who save 2+ hours per day
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            One Post.
            <br />
            Every Platform.
            <br />
            <span className="text-primary">10 Seconds.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
            Stop spending 2 hours rewriting the same content for Twitter, LinkedIn, Instagram, and email.
            RepostAI does it in one click — with the right tone, hashtags, and character count for each platform.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-lg px-8 py-4 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25 animate-pulse-glow"
          >
            Try It Free — No Signup Required
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-muted mt-4">3 free reposts per day. No credit card needed.</p>
        </div>
      </section>

      {/* How It Works — Animated Steps */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How it works</h2>
          <p className="text-muted text-center mb-16 max-w-lg mx-auto">
            Three steps. Ten seconds. Done.
          </p>

          {/* Animated demo mockup */}
          <div className="max-w-3xl mx-auto mb-16 p-6 rounded-2xl border border-border bg-surface">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-muted ml-2">repostai.shop/app</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-background border border-border">
                <p className="text-xs text-muted mb-1">Input</p>
                <p className="text-sm">&ldquo;We just launched our AI analytics dashboard. 10M events/sec, real-time insights, 70% cheaper...&rdquo;</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">Professional</span>
                <span className="text-xs text-muted">|</span>
                <span className="text-xs text-muted">Twitter + LinkedIn + Instagram</span>
              </div>
              <div className="grid gap-2">
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-primary mb-1 font-medium">Twitter / X</p>
                  <p className="text-xs text-muted">&ldquo;We just launched an AI analytics dashboard that processes 10M events/sec at 70% less cost...&rdquo;</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-primary mb-1 font-medium">LinkedIn</p>
                  <p className="text-xs text-muted">&ldquo;After 18 months of building in stealth, we just launched our AI-powered analytics dashboard...&rdquo;</p>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-xs text-primary mb-1 font-medium">Instagram</p>
                  <p className="text-xs text-muted">&ldquo;18 months of building in stealth. Today we finally go live. #AI #Analytics #SaaS...&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center p-8 rounded-2xl border border-border bg-surface">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything you need to repurpose like a pro
          </h2>
          <p className="text-muted text-center mb-12 max-w-lg mx-auto">
            Built for creators who want to grow on every platform without the grind.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Math */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Do the math</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
              <h3 className="font-semibold text-lg mb-3 text-red-400">Without RepostAI</h3>
              <ul className="text-sm text-muted space-y-2 text-left">
                <li>2+ hours/day rewriting content</li>
                <li>Inconsistent posting schedule</li>
                <li>Wrong character counts, missing hashtags</li>
                <li>Mental fatigue from platform switching</li>
                <li>= 60+ hours/month wasted</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <h3 className="font-semibold text-lg mb-3 text-green-400">With RepostAI</h3>
              <ul className="text-sm text-muted space-y-2 text-left">
                <li>10 seconds per repost</li>
                <li>Daily content on every platform</li>
                <li>Platform-optimised formatting</li>
                <li>More time creating, less time reformatting</li>
                <li>= $9/mo (30 cents/day)</li>
              </ul>
            </div>
          </div>
          <p className="text-lg text-primary font-medium">
            That&apos;s 30 cents a day to save 2+ hours of rewriting.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What creators are saying
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-border bg-surface">
                <p className="text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start free, upgrade when you&apos;re ready</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="text-sm text-muted mb-2">Free</div>
              <div className="text-4xl font-bold mb-1">$0</div>
              <p className="text-sm text-muted mb-6">3 reposts/day, forever</p>
              <Link href="/app" className="block w-full text-center py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium">
                Get Started
              </Link>
            </div>
            <div className="p-8 rounded-2xl border-2 border-primary bg-surface relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <div className="text-sm text-muted mb-2">Pro</div>
              <div className="text-4xl font-bold mb-1">$9<span className="text-lg text-muted">/mo</span></div>
              <p className="text-xs text-primary mb-4">or $6.58/mo billed annually at $79/yr — save 27%</p>
              <p className="text-sm text-muted mb-6">Unlimited reposts + history + priority speed</p>
              <Link href="/pricing" className="block w-full text-center py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-medium">
                Upgrade
              </Link>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="text-sm text-muted mb-2">Agency</div>
              <div className="text-4xl font-bold mb-1">$29<span className="text-lg text-muted">/mo</span></div>
              <p className="text-xs text-primary mb-4">or $20.75/mo billed annually at $249/yr — save 28%</p>
              <p className="text-sm text-muted mb-6">Team + brand voice + API</p>
              <Link href="/pricing" className="block w-full text-center py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop rewriting. Start reposting.
          </h2>
          <p className="text-muted mb-8">
            Paste your first piece of content and see the magic. No signup, no credit card.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-lg px-8 py-4 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25 animate-pulse-glow"
          >
            Repurpose Your First Post Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
