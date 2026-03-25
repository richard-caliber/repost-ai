import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    if (key.startsWith("pk_")) {
      throw new Error(
        "STRIPE_SECRET_KEY contains a publishable key (pk_*). Set it to your secret key (sk_*)."
      );
    }
    _stripe = new Stripe(key);
  }
  return _stripe;
}
