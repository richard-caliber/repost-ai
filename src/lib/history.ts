const HISTORY_KEY = "repostai_history";

export interface HistoryEntry {
  id: string;
  originalText: string;
  tone: string;
  platforms: string[];
  result: Record<string, unknown>;
  createdAt: string; // ISO string
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: Omit<HistoryEntry, "id" | "createdAt">): HistoryEntry {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
  };
  history.unshift(newEntry);
  // Keep max 100 entries
  if (history.length > 100) history.length = 100;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function getHistoryEntry(id: string): HistoryEntry | null {
  return getHistory().find((e) => e.id === id) || null;
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function formatResultAsMarkdown(entry: HistoryEntry): string {
  const lines: string[] = [];
  lines.push(`# RepostAI Output`);
  lines.push(`**Date:** ${new Date(entry.createdAt).toLocaleDateString()}`);
  lines.push(`**Tone:** ${entry.tone}`);
  lines.push(`**Platforms:** ${entry.platforms.join(", ")}`);
  lines.push("");
  lines.push("## Original Content");
  lines.push(entry.originalText);
  lines.push("");

  const r = entry.result as Record<string, unknown>;

  if (Array.isArray(r.twitter) && r.twitter.length) {
    lines.push("## Twitter / X");
    (r.twitter as string[]).forEach((t, i) => {
      lines.push(`### Tweet ${i + 1}`);
      lines.push(t);
      lines.push("");
    });
  }

  if (Array.isArray(r.instagram) && r.instagram.length) {
    lines.push("## Instagram");
    (r.instagram as string[]).forEach((c, i) => {
      lines.push(`### Caption ${i + 1}`);
      lines.push(c);
      lines.push("");
    });
  }

  if (Array.isArray(r.linkedin) && r.linkedin.length) {
    lines.push("## LinkedIn");
    (r.linkedin as string[]).forEach((p, i) => {
      lines.push(`### Post ${i + 1}`);
      lines.push(p);
      lines.push("");
    });
  }

  const email = r.email as { subject?: string; body?: string } | undefined;
  if (email?.subject) {
    lines.push("## Email Newsletter");
    lines.push(`**Subject:** ${email.subject}`);
    lines.push("");
    lines.push(email.body || "");
    lines.push("");
  }

  const reddit = r.reddit as { title?: string; body?: string } | undefined;
  if (reddit?.title) {
    lines.push("## Reddit");
    lines.push(`**Title:** ${reddit.title}`);
    lines.push("");
    lines.push(reddit.body || "");
    lines.push("");
  }

  return lines.join("\n");
}

export function formatResultAsClipboard(result: Record<string, unknown>): string {
  const parts: string[] = [];
  const r = result;

  if (Array.isArray(r.twitter) && r.twitter.length) {
    parts.push("=== TWITTER / X ===");
    (r.twitter as string[]).forEach((t, i) => parts.push(`Tweet ${i + 1}:\n${t}`));
  }
  if (Array.isArray(r.instagram) && r.instagram.length) {
    parts.push("\n=== INSTAGRAM ===");
    (r.instagram as string[]).forEach((c, i) => parts.push(`Caption ${i + 1}:\n${c}`));
  }
  if (Array.isArray(r.linkedin) && r.linkedin.length) {
    parts.push("\n=== LINKEDIN ===");
    (r.linkedin as string[]).forEach((p, i) => parts.push(`Post ${i + 1}:\n${p}`));
  }
  const email = r.email as { subject?: string; body?: string } | undefined;
  if (email?.subject) {
    parts.push("\n=== EMAIL ===");
    parts.push(`Subject: ${email.subject}\n\n${email.body}`);
  }
  const reddit = r.reddit as { title?: string; body?: string } | undefined;
  if (reddit?.title) {
    parts.push("\n=== REDDIT ===");
    parts.push(`${reddit.title}\n\n${reddit.body}`);
  }

  return parts.join("\n\n");
}

export function exportAsContentCalendarCSV(entry: HistoryEntry): string {
  const rows: string[][] = [["Platform", "Content", "Character Count", "Hashtags", "Suggested Post Time"]];
  const r = entry.result as Record<string, unknown>;

  const extractHashtags = (text: string): string => {
    const tags = text.match(/#\w+/g);
    return tags ? tags.join(" ") : "";
  };

  const escapeCSV = (str: string): string => {
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  if (Array.isArray(r.twitter)) {
    (r.twitter as string[]).forEach((t) => {
      rows.push(["Twitter / X", escapeCSV(t), String(t.length), extractHashtags(t), "8:00 AM / 12:00 PM / 5:00 PM"]);
    });
  }
  if (Array.isArray(r.instagram)) {
    (r.instagram as string[]).forEach((c) => {
      rows.push(["Instagram", escapeCSV(c), String(c.length), extractHashtags(c), "11:00 AM / 2:00 PM / 7:00 PM"]);
    });
  }
  if (Array.isArray(r.linkedin)) {
    (r.linkedin as string[]).forEach((p) => {
      rows.push(["LinkedIn", escapeCSV(p), String(p.length), extractHashtags(p), "7:30 AM / 12:00 PM / 5:30 PM"]);
    });
  }
  const email = r.email as { subject?: string; body?: string } | undefined;
  if (email?.subject) {
    const full = `Subject: ${email.subject}\n\n${email.body}`;
    rows.push(["Email", escapeCSV(full), String(full.length), "", "Tuesday/Thursday 10:00 AM"]);
  }
  const reddit = r.reddit as { title?: string; body?: string } | undefined;
  if (reddit?.title) {
    const full = `${reddit.title}\n\n${reddit.body}`;
    rows.push(["Reddit", escapeCSV(full), String(full.length), "", "Monday 9:00 AM / Saturday 10:00 AM"]);
  }

  return rows.map((row) => row.join(",")).join("\n");
}
