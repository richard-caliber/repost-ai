import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getStripe } from "@/lib/stripe";

const DAILY_LIMIT = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 24 * 60 * 60 * 1000,
    });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: DAILY_LIMIT - entry.count };
}

function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 10000);
}

const SYSTEM_PROMPT = `You are RepostAI, a content repurposing engine. Given a piece of content and a tone, generate platform-optimised versions.

Rules per platform:
- Twitter/X: Max 280 characters per tweet. Punchy, engaging. Use line breaks for readability. No hashtags unless the tone is casual.
- Instagram: Caption style with heavy hashtag usage (8-15 relevant hashtags). Emoji-friendly. Include a call to action.
- LinkedIn: Professional and insightful. Longer form. Start with a hook. Use line breaks between paragraphs. No hashtags in body, add 3-5 at the end.
- Email Newsletter: Include a subject line. Keep it concise and scannable. Include one clear CTA. Format as plain text.
- Reddit: Conversational and authentic. Title + body format. No marketing speak. Add value. Be genuine.

You MUST respond with valid JSON matching this exact structure (no markdown, no code fences):
{
  "twitter": ["tweet1", "tweet2", "tweet3", "tweet4", "tweet5"],
  "instagram": ["caption1", "caption2", "caption3"],
  "linkedin": ["post1", "post2"],
  "email": { "subject": "Subject line", "body": "Email body" },
  "reddit": { "title": "Post title", "body": "Post body" }
}`;

export async function POST(req: NextRequest) {
  // Kill switch
  if (process.env.DISABLE_API === "true") {
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: 503 }
    );
  }

  // Validate API key
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your-key-here") {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  // Check if subscriber (bypass rate limit)
  const customerId = req.headers.get("x-customer-id");
  let isSubscriber = false;
  if (customerId && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = getStripe();
      const subs = await stripe.subscriptions.list({ customer: customerId, status: "active", limit: 1 });
      isSubscriber = subs.data.length > 0;
    } catch {
      // Fall through to rate limit
    }
  }

  try {
    const body = await req.json();
    const { content, tone, platforms } = body;

    if (!content || typeof content !== "string" || content.trim().length < 10) {
      return NextResponse.json(
        { error: "Content must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Rate limit (free users only) — checked after input validation
    // so invalid requests don't consume the limit
    const ip = getClientIP(req);
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed && !isSubscriber) {
      return NextResponse.json(
        {
          error: "rate_limited",
          message:
            "You've hit your free limit! Upgrade to Pro for unlimited reposts.",
        },
        { status: 429 }
      );
    }

    const sanitized = sanitizeInput(content);
    const enabledPlatforms = platforms || [
      "twitter",
      "instagram",
      "linkedin",
      "email",
      "reddit",
    ];
    const selectedTone = tone || "professional";

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Tone: ${selectedTone}\nPlatforms to generate for: ${enabledPlatforms.join(", ")}\n\nContent to repurpose:\n${sanitized}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const raw = completion.choices[0]?.message?.content || "";

    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result, remaining });
  } catch (error: unknown) {
    console.error("Repost API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
