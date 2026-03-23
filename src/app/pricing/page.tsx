import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
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
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    description: "For creators who post daily",
    features: [
      "Unlimited reposts",
      "All platforms included",
      "All tone options",
      "Priority generation speed",
      "History & saved outputs",
    ],
    cta: "Upgrade to Pro",
    href: "#",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$29",
    period: "/mo",
    description: "For teams managing multiple brands",
    features: [
      "Everything in Pro",
      "5 team members",
      "Custom brand voice profiles",
      "Bulk generation",
      "API access",
      "Priority support",
    ],
    cta: "Contact Us",
    href: "#",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto">
          Start free. Upgrade when you need more. No hidden fees.
        </p>
      </div>

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
            <div className="mb-6">
              <span className="text-5xl font-bold">{tier.price}</span>
              <span className="text-muted">{tier.period}</span>
            </div>
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
            <Link
              href={tier.href}
              className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
                tier.highlight
                  ? "bg-primary hover:bg-primary-hover text-white"
                  : "border border-border hover:bg-surface-hover"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-muted">
          Payments powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
