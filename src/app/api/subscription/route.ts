import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customerId");

  if (!customerId) {
    return NextResponse.json({ active: false, plan: null, tier: null });
  }

  try {
    const stripe = getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ active: false, plan: null, tier: null });
    }

    const sub = subscriptions.data[0];
    const price = sub.items.data[0]?.price;
    const interval = price?.recurring?.interval;
    const amount = price?.unit_amount || 0;

    const isAgency = amount >= 2900;
    const tier = isAgency ? "agency" : "pro";

    return NextResponse.json({
      active: true,
      plan: interval === "year" ? "annual" : "monthly",
      tier,
      priceId: price?.id,
    });
  } catch (error: unknown) {
    console.error("Subscription check error:", error);
    return NextResponse.json({ active: false, plan: null, tier: null });
  }
}
