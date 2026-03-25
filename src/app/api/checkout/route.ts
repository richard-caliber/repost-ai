import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payment system is not configured. Please contact support." },
        { status: 500 }
      );
    }

    if (secretKey.startsWith("pk_")) {
      console.error(
        "STRIPE_SECRET_KEY contains a publishable key (pk_*). It must be a secret key (sk_*)."
      );
      return NextResponse.json(
        { error: "Payment system misconfigured. Please contact support." },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin") || "https://www.repostai.shop";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Internal error";

    // Catch the specific publishable key error from Stripe
    if (
      typeof message === "string" &&
      message.includes("publishable key")
    ) {
      return NextResponse.json(
        {
          error:
            "Payment system misconfigured — using wrong key type. Please contact support.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
