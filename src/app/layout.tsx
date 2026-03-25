import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RepostAI — One Post. Every Platform. 10 Seconds.",
  description:
    "AI-powered content repurposing. Paste once, get optimized posts for Twitter, LinkedIn, Instagram, Reddit, and more.",
  metadataBase: new URL("https://repostai.shop"),
  openGraph: {
    title: "RepostAI — One Post. Every Platform. 10 Seconds.",
    description:
      "AI-powered content repurposing. Paste once, get optimized posts for Twitter, LinkedIn, Instagram, Reddit, and more.",
    url: "https://repostai.shop",
    siteName: "RepostAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepostAI — One Post. Every Platform. 10 Seconds.",
    description:
      "AI-powered content repurposing. Paste once, get optimized posts for Twitter, LinkedIn, Instagram, Reddit, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
