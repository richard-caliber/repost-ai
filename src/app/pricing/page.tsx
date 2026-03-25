"use client";

import Link from "next/link";
import { useState } from "react";
import { startCheckout, getCustomerId, openPortal } from "@/lib/subscription";

const tiers = [
  {
    name: "Starter",
    priceMonthly: "$0",
    priceAnnual: "$0",
    periodMonthly: "",
    periodAnnual: "",
    monthlyEquivalent: "",
    billedNote: "",
    description: "Perfect for trying it out",
    features: [
      "3 reposts per day",
      "All platforms included",
      "All tone options",
      "No signup required",
    ],
    cta: "Start Free",
    href: "/app",
    highlight: false,
    priceEnvMonthly: undefined as string | undefined,
    priceEnvAnnual: undefined as string | undefined,
  },
  {
    name: "Pro",
    priceMonthly: "$9",
    priceAnnual: "$79",
    periodMonthly: "/mo",
    periodAnnual: "/yr",
    monthlyEquivalent: "$6.58/mo",
    billedNote: "billed $79/yr",
    description: "For creators who post daily",
    features: [
      "Unlimited reposts",
      "All platforms included",
      "All tone options",
      "Priority generation speed",
      "History & saved outputs",
    ],
    cta: "Upgrade to Pro",
    href: null,
    highlight: true,
    priceEnvMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
    priceEnvAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL,
  },
  {
    name: "Agency",
    priceMonthly: "$29",
    priceAnnual: "$249",
    periodMonthly: "/mo",
    periodAnnual: "/yr",
    monthlyEquivalent: "$20.75/mo",
    billedNote: "billed $249/yr",
    description: "For teams managing multiple brands",
    features: [
      "Everything in Pro",
      "5 team members",
      "Custom brand voice profiles",
      "Bulk generation",
      "API access",
      "Priority support",
    ],
    cta: "Upgrade to Agency",
    href: null,
    highlight: false,
    priceEnvMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_MONTHLY,
    priceEnvAnnual: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY_ANNUAL,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const customerId = typeof window !== "undefined" ? getCustomerId() : null;

  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string | null | undefined, planName: string) => {
    if (!priceId) {
      setError("Checkout is not configured yet. Please contact support.");
      return;
    }
    setError(null);
    setLoading(planName);
    try {
      await startCheckout(priceId);
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto mb-8">
          Start free. Upgrade when you need more. No hidden fees.
        </p>

        {/* Annual/Monthly Toggle */}
        <div className="inline-flex items-center gap-1 bg-surface border-2 border-border rounded-full p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              !annual
                ? "bg-primary text-white shadow-md"
                : "text-muted hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              annual
                ? "bg-primary text-white shadow-md"
                : "text-muted hover:text-foreground"
            }`}
          >
            Annual
            <span className="ml-1.5 text-xs opacity-80">Save up to 28%</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-8 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-8 rounded-2xl ${
              tier.highlight
                ? "border-2 border-primary bg-surface relative"
                : "border border-border bg-surface"
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
              <p className="text-sm text-muted">{tier.description}</p>
            </div>

            {annual && tier.monthlyEquivalent ? (
              <div className="mb-2">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-muted line-through">
                    {tier.priceMonthly}/mo
                  </span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    Save {tier.name === "Pro" ? "27%" : "28%"}
                  </span>
                </div>
                <span className="text-5xl font-bold">{tier.monthlyEquivalent.replace("/mo", "")}</span>
                <span className="text-muted">/mo</span>
                <p className="text-xs text-primary font-medium mt-1">
                  {tier.billedNote}
                </p>
              </div>
            ) : (
              <div className="mb-2">
                <span className="text-5xl font-bold">
                  {annual ? tier.priceAnnual : tier.priceMonthly}
                </span>
                <span className="text-muted">
                  {annual ? tier.periodAnnual : tier.periodMonthly}
                </span>
              </div>
            )}

            {(!annual || !tier.monthlyEquivalent) && <div className="mb-4" />}
            {annual && tier.monthlyEquivalent && <div className="mb-2" />}

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm"
                >
                  <svg
                    className="w-4 h-4 text-primary shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {tier.href ? (
              <Link
                href={tier.href}
                className="block w-full text-center py-3 rounded-lg font-medium transition-colors border border-border hover:bg-surface-hover"
              >
                {tier.cta}
              </Link>
            ) : (
              <button
                onClick={() =>
                  handleCheckout(
                    annual ? tier.priceEnvAnnual : tier.priceEnvMonthly,
                    tier.name
                  )
                }
                disabled={loading === tier.name}
                className={`block w-full text-center py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  tier.highlight
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "border border-border hover:bg-surface-hover"
                }`}
              >
                {loading === tier.name ? "Redirecting..." : tier.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted">
          Payments powered by Stripe. Cancel anytime.
        </p>
        {customerId && (
          <button
            onClick={() => openPortal()}
            className="text-primary text-sm hover:underline mt-2"
          >
            Manage Subscription
          </button>
        )}
      </div>
    </div>
  );
}
