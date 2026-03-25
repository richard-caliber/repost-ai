import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-semibold">
              Repost<span className="text-primary">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <a href="mailto:hello@repostai.shop" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} RepostAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
