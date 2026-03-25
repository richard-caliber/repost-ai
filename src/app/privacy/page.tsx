import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RepostAI",
  description: "How RepostAI handles your data, payments, and content.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted mb-8">Last updated: 25 March 2026</p>

      <div className="prose prose-sm space-y-6 text-foreground/90">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. What We Collect</h2>
          <p className="text-muted leading-relaxed">
            When you use RepostAI, we collect the content you paste into the tool for the sole purpose of generating repurposed posts. We do not store your input content after generation is complete. If you create an account or subscribe, we collect your email address and Stripe customer ID to manage your subscription.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
          <p className="text-muted leading-relaxed">
            Your pasted content is sent to our AI provider (OpenAI) to generate platform-optimised posts. This content is processed in real time and is not stored on our servers. We use your email and payment information exclusively for subscription management and transactional communications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Payments</h2>
          <p className="text-muted leading-relaxed">
            All payments are processed by Stripe. We never see or store your full credit card number. Stripe&apos;s privacy policy governs how your payment data is handled. You can manage your subscription and payment methods through our Stripe-powered customer portal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Cookies &amp; Local Storage</h2>
          <p className="text-muted leading-relaxed">
            We use browser localStorage to remember your subscription status, theme preference, and daily usage count. We do not use third-party tracking cookies. No personal data is shared with advertisers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
          <p className="text-muted leading-relaxed">
            Input content is not retained after processing. If you use the History feature (Pro plan), your generated outputs are stored locally in your browser. Subscription data is retained for as long as your account is active. You can request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Third-Party Services</h2>
          <p className="text-muted leading-relaxed">
            We use the following third-party services: OpenAI (content generation), Stripe (payment processing), and Vercel (hosting). Each service has its own privacy policy governing data handling.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
          <p className="text-muted leading-relaxed">
            You have the right to access, correct, or delete your personal data. You may cancel your subscription at any time through the customer portal. To request data deletion, contact us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
          <p className="text-muted leading-relaxed">
            For privacy-related questions or data requests, contact us at{" "}
            <a href="mailto:hello@repostai.shop" className="text-primary hover:underline">
              hello@repostai.shop
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
