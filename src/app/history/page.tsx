"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getHistory,
  deleteHistoryEntry,
  clearHistory,
  formatResultAsMarkdown,
  formatResultAsClipboard,
  exportAsContentCalendarCSV,
  HistoryEntry,
} from "@/lib/history";
import { checkSubscription } from "@/lib/subscription";

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function EntryModal({
  entry,
  onClose,
  isPro,
}: {
  entry: HistoryEntry;
  onClose: () => void;
  isPro: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [showProLock, setShowProLock] = useState(false);

  const r = entry.result as Record<string, unknown>;

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(formatResultAsClipboard(r));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadFile(
      formatResultAsMarkdown(entry),
      `repostai-${entry.id}.md`,
      "text/markdown"
    );
  };

  const handleCalendarExport = () => {
    if (!isPro) {
      setShowProLock(true);
      return;
    }
    downloadFile(
      exportAsContentCalendarCSV(entry),
      `repostai-calendar-${entry.id}.csv`,
      "text/csv"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Repost from {new Date(entry.createdAt).toLocaleDateString()}</h3>
            <p className="text-xs text-muted">Tone: {entry.tone} | Platforms: {entry.platforms.join(", ")}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="p-3 rounded-lg bg-surface border border-border">
            <p className="text-xs text-muted mb-1 font-medium">Original Content</p>
            <p className="text-sm whitespace-pre-wrap">{entry.originalText}</p>
          </div>

          {Array.isArray(r.twitter) && r.twitter.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Twitter / X</h4>
              {(r.twitter as string[]).map((t, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface border border-border mb-2">
                  <p className="text-sm whitespace-pre-wrap mb-2">{t}</p>
                  <CopyBtn text={t} />
                </div>
              ))}
            </div>
          )}

          {Array.isArray(r.instagram) && r.instagram.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Instagram</h4>
              {(r.instagram as string[]).map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface border border-border mb-2">
                  <p className="text-sm whitespace-pre-wrap mb-2">{c}</p>
                  <CopyBtn text={c} />
                </div>
              ))}
            </div>
          )}

          {Array.isArray(r.linkedin) && r.linkedin.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">LinkedIn</h4>
              {(r.linkedin as string[]).map((p, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface border border-border mb-2">
                  <p className="text-sm whitespace-pre-wrap mb-2">{p}</p>
                  <CopyBtn text={p} />
                </div>
              ))}
            </div>
          )}

          {(r.email as { subject?: string })?.subject && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Email</h4>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <p className="text-sm whitespace-pre-wrap mb-2">
                  Subject: {(r.email as { subject: string; body: string }).subject}
                  {"\n\n"}
                  {(r.email as { subject: string; body: string }).body}
                </p>
                <CopyBtn text={`Subject: ${(r.email as { subject: string; body: string }).subject}\n\n${(r.email as { subject: string; body: string }).body}`} />
              </div>
            </div>
          )}

          {(r.reddit as { title?: string })?.title && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Reddit</h4>
              <div className="p-3 rounded-lg bg-surface border border-border">
                <p className="text-sm whitespace-pre-wrap mb-2">
                  {(r.reddit as { title: string; body: string }).title}
                  {"\n\n"}
                  {(r.reddit as { title: string; body: string }).body}
                </p>
                <CopyBtn text={`${(r.reddit as { title: string; body: string }).title}\n\n${(r.reddit as { title: string; body: string }).body}`} />
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border p-4 flex flex-wrap gap-2">
          <button onClick={handleCopyAll} className="px-4 py-2 rounded-lg border border-border hover:bg-surface-hover text-sm font-medium transition-colors">
            {copied ? "Copied!" : "Copy All"}
          </button>
          <button onClick={handleDownload} className="px-4 py-2 rounded-lg border border-border hover:bg-surface-hover text-sm font-medium transition-colors">
            Download .md
          </button>
          <button onClick={handleCalendarExport} className="px-4 py-2 rounded-lg border border-border hover:bg-surface-hover text-sm font-medium transition-colors relative">
            Export Calendar
            {!isPro && <span className="ml-1 text-xs text-primary">PRO</span>}
          </button>
        </div>

        {showProLock && (
          <div className="p-4 border-t border-border bg-primary/5">
            <p className="text-sm font-medium text-primary mb-2">Export to content calendar is a Pro feature</p>
            <Link href="/pricing" className="text-sm text-primary hover:underline font-medium">
              Upgrade to Pro - $9/mo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs px-2 py-1 rounded border border-border hover:bg-surface-hover transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
    checkSubscription().then((s) => setIsPro(s.active));
  }, []);

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  const handleClear = () => {
    if (confirm("Delete all history? This cannot be undone.")) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Repost History</h1>
          <p className="text-muted text-sm">All your past reposts, stored locally in your browser.</p>
        </div>
        {history.length > 0 && (
          <button onClick={handleClear} className="text-sm text-red-400 hover:text-red-300 font-medium">
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-muted mb-4">No reposts yet. Go create some!</p>
          <Link href="/app" className="text-primary hover:underline font-medium">
            Start Reposting
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors cursor-pointer group"
              onClick={() => setSelected(entry)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted">
                  {new Date(entry.createdAt).toLocaleDateString()} {new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {entry.tone}
                </span>
              </div>
              <p className="text-sm line-clamp-3 mb-3 leading-relaxed">
                {entry.originalText.slice(0, 150)}{entry.originalText.length > 150 ? "..." : ""}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {entry.platforms.map((p) => (
                    <span key={p} className="text-xs text-muted">
                      {p === "twitter" ? "X" : p === "instagram" ? "IG" : p === "linkedin" ? "LI" : p === "email" ? "Em" : "Rd"}
                    </span>
                  ))}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(entry.id);
                  }}
                  className="text-xs text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <EntryModal
          entry={selected}
          onClose={() => setSelected(null)}
          isPro={isPro}
        />
      )}
    </div>
  );
}
