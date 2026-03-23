"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.customerId) {
          localStorage.setItem("repostai_customer_id", data.customerId);
          localStorage.setItem("repostai_sub_active", "true");
          localStorage.removeItem("repostai_sub_cache");
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4 animate-pulse">⚡</div>
        <p className="text-muted">Confirming your subscription...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted mb-6">We couldn&apos;t verify your payment. Please contact support.</p>
        <Link href="/pricing" className="text-primary hover:underline">
          Back to pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-6xl mb-4">🚀</div>
      <h1 className="text-3xl font-bold mb-3">Welcome to Pro!</h1>
      <p className="text-muted text-lg mb-8">Unlimited reposts unlocked. Time to create.</p>
      <Link
        href="/app"
        className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-xl transition-colors"
      >
        Start Reposting
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Suspense fallback={<div className="text-center"><div className="text-5xl mb-4 animate-pulse">⚡</div><p className="text-muted">Loading...</p></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
