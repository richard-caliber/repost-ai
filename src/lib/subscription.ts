const CUSTOMER_KEY = "repostai_customer_id";
const SUB_CACHE_KEY = "repostai_sub_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface SubStatus {
  active: boolean;
  plan: string | null;
  tier: string | null;
}

export function getCustomerId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CUSTOMER_KEY);
}

export function setCustomerId(id: string): void {
  localStorage.setItem(CUSTOMER_KEY, id);
}

export async function checkSubscription(): Promise<SubStatus> {
  const customerId = getCustomerId();
  if (!customerId) return { active: false, plan: null, tier: null };

  // Check cache
  const cached = localStorage.getItem(SUB_CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return data;
  }

  try {
    const res = await fetch(`/api/subscription?customerId=${customerId}`);
    const data = await res.json();
    const result: SubStatus = { active: data.active, plan: data.plan, tier: data.tier };

    // Cache result
    localStorage.setItem(SUB_CACHE_KEY, JSON.stringify({ data: result, timestamp: Date.now() }));

    return result;
  } catch {
    return { active: false, plan: null, tier: null };
  }
}

export async function openPortal(): Promise<void> {
  const customerId = getCustomerId();
  if (!customerId) return;

  const res = await fetch("/api/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

export async function startCheckout(priceId: string): Promise<void> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const { url, error } = await res.json();
  if (error) throw new Error(error);
  if (url) window.location.href = url;
}
