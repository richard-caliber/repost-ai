import Link from "next/link";
import { Footer } from "@/components/Footer";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Solopreneur",
    quote:
      "I used to spend my entire Sunday rewriting content for each platform. Now I paste once and I'm done in 10 seconds. Genuinely life-changing.",
  },
  {
    name: "Marcus T.",
    role: "Agency Marketer",
    quote:
      "We manage 12 client accounts. RepostAI cut our content repurposing time by 80%. The tone matching is scarily accurate.",
  },
  {
    name: "Jess L.",
    role: "Content Creator",
    quote:
      "The Instagram captions with hashtags alone are worth it. I went from 3 posts a week to daily across all platforms.",
  },
];

const faqs = [
  {
    q: "Can't ChatGPT do this?",
    a: "ChatGPT gives you generic rewrites. RepostAI knows each platform's character limits, hashtag rules, and tone. It's purpose-built.",
  },
  {
    q: "Will it sound like AI?",
    a: "You choose the tone: Professional, Casual, Witty, Edgy. It matches YOUR voice, not robot voice.",
  },
  {
    q: "Why not just copy-paste the same thing everywhere?",
    a: "LinkedIn penalises duplicate content. Twitter has 280 chars. Instagram needs hashtags. Each platform has rules. RepostAI knows them all.",
  },
  {
    q: "$9/month seems steep",
    a: "That's 30 cents a day to save 2+ hours of rewriting. Your time is worth more.",
  },
  {
    q: "Is the free tier actually useful?",
    a: "3 full reposts per day, forever. No signup, no credit card. Just paste and go.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animate-hero-gradient pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center relative">
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
            Most creators spend 2 hours rewriting content for Twitter, LinkedIn,
            Instagram, and email. RepostAI does it in one click.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-lg px-8 py-4 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25 animate-pulse-glow"
          >
            Repurpose Your First Post Free — No Signup
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <p className="text-sm text-muted mt-4">
            3 free reposts per day. No credit card needed.
          </p>
        </div>
      </section>

      {/* Social Proof — Testimonials */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl border border-border bg-surface"
              >
                <p className="text-sm leading-relaxed mb-4 text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
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

      {/* Most People Believe */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Most people believe you need to write unique content for every
            platform...
          </h2>
          <p className="text-lg text-muted mb-6 leading-relaxed">
            The truth? The best creators write <strong className="text-foreground">ONCE</strong> and
            repurpose everywhere. The only difference is format and tone.
          </p>
          <p className="text-lg text-primary font-medium">
            RepostAI handles the reformatting. You keep creating.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-muted text-center mb-16 max-w-xl mx-auto">
            Three steps. Ten seconds. Every platform covered.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste any content",
                desc: "Blog post, tweet thread, article, newsletter — drop it in and we'll handle the rest.",
                icon: "📋",
              },
              {
                step: "2",
                title: "Pick platforms & tone",
                desc: "Choose which platforms you want. Select Professional, Casual, Witty, or Edgy tone.",
                icon: "🎯",
              },
              {
                step: "3",
                title: "Copy & post in 10 seconds",
                desc: "Get perfectly formatted posts for every platform. One-click copy. Done.",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-8 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Every platform, one click
          </h2>
          <p className="text-muted mb-12 max-w-xl mx-auto">
            RepostAI generates optimised content for each platform&apos;s unique
            format and audience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Twitter / X", count: "5 posts", icon: "𝕏" },
              { name: "Instagram", count: "3 captions", icon: "📸" },
              { name: "LinkedIn", count: "2 posts", icon: "💼" },
              { name: "Email", count: "1 snippet", icon: "✉️" },
              { name: "Reddit", count: "1 post", icon: "🔗" },
            ].map((p) => (
              <div
                key={p.name}
                className="p-6 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors"
              >
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-semibold mb-1">{p.name}</div>
                <div className="text-sm text-primary">{p.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple pricing
          </h2>
          <p className="text-muted mb-12">
            Start free. Upgrade when you&apos;re ready.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="text-sm text-muted mb-2">Starter</div>
              <div className="text-4xl font-bold mb-1">$0</div>
              <p className="text-sm text-muted mb-6">3 reposts/day, all platforms</p>
              <Link
                href="/app"
                className="block w-full text-center py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
            <div className="p-8 rounded-2xl border-2 border-primary bg-surface relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
              <div className="text-sm text-muted mb-2">Pro</div>
              <div className="text-4xl font-bold mb-1">
                $9<span className="text-lg text-muted">/mo</span>
              </div>
              <p className="text-xs text-primary mb-4">
                or $6.58/mo billed annually at $79/yr — save 27%
              </p>
              <p className="text-sm text-muted mb-6">Unlimited reposts, priority speed</p>
              <Link
                href="/pricing"
                className="block w-full text-center py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-medium"
              >
                Upgrade
              </Link>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="text-sm text-muted mb-2">Agency</div>
              <div className="text-4xl font-bold mb-1">
                $29<span className="text-lg text-muted">/mo</span>
              </div>
              <p className="text-xs text-primary mb-4">
                or $20.75/mo billed annually at $249/yr — save 28%
              </p>
              <p className="text-sm text-muted mb-6">Team + brand voice + API</p>
              <Link
                href="/pricing"
                className="block w-full text-center py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Objection Crusher FAQ */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Got questions?
          </h2>
          <p className="text-muted text-center mb-12">
            We&apos;ve heard them all. Here are the honest answers.
          </p>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl border border-border bg-surface"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  &ldquo;{faq.q}&rdquo;
                </h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to stop rewriting?
          </h2>
          <p className="text-muted mb-8">
            Paste your first piece of content and see the magic. No signup, no
            credit card.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-lg px-8 py-4 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25 animate-pulse-glow"
          >
            Repurpose Your First Post Free
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
