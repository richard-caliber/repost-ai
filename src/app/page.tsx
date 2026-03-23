import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full mb-6 font-medium">
            Trusted by 500+ creators
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            One post.
            <br />
            Every platform.
            <br />
            <span className="text-primary">10 seconds.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
            Stop rewriting the same content for Twitter, Instagram, LinkedIn,
            and email. Paste once, get platform-perfect posts instantly.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-lg px-8 py-4 rounded-xl transition-colors font-semibold shadow-lg shadow-primary/25"
          >
            Try Free — No Signup Required
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

      {/* How It Works */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste your content",
                desc: "Drop in any blog post, article, tweet thread, or long-form content.",
              },
              {
                step: "2",
                title: "Choose your platforms",
                desc: "Select which platforms you want to generate for and pick a tone.",
              },
              {
                step: "3",
                title: "Copy & post",
                desc: "Get perfectly formatted posts for every platform. Copy with one click.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="text-center p-8 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-5">
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
              { name: "Twitter / X", count: "5 posts" },
              { name: "Instagram", count: "3 captions" },
              { name: "LinkedIn", count: "2 posts" },
              { name: "Email", count: "1 snippet" },
              { name: "Reddit", count: "1 post" },
            ].map((p) => (
              <div
                key={p.name}
                className="p-6 rounded-xl border border-border bg-surface"
              >
                <div className="font-semibold mb-1">{p.name}</div>
                <div className="text-sm text-primary">{p.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
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
              <div className="text-sm text-muted mb-2">Free</div>
              <div className="text-4xl font-bold mb-4">$0</div>
              <p className="text-sm text-muted mb-6">3 reposts/day</p>
              <Link
                href="/app"
                className="block w-full text-center py-3 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
            <div className="p-8 rounded-2xl border-2 border-primary bg-surface relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Popular
              </div>
              <div className="text-sm text-muted mb-2">Pro</div>
              <div className="text-4xl font-bold mb-4">
                $9<span className="text-lg text-muted">/mo</span>
              </div>
              <p className="text-sm text-muted mb-6">Unlimited reposts</p>
              <Link
                href="/pricing"
                className="block w-full text-center py-3 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors font-medium"
              >
                Upgrade
              </Link>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-surface">
              <div className="text-sm text-muted mb-2">Agency</div>
              <div className="text-4xl font-bold mb-4">
                $29<span className="text-lg text-muted">/mo</span>
              </div>
              <p className="text-sm text-muted mb-6">Team + brand voice</p>
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

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-semibold">
              Repost<span className="text-primary">AI</span>
            </span>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} RepostAI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
