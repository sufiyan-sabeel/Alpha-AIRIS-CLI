import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sufiyan-sabeel.github.io/Alpha-AIRIS-CLI/"),
  title: "Alpha AIRIS-CLI | KageOS",
  description:
    "A coding agent with the IDE wired in. 40+ providers, 32 built-in tools, AI-powered terminal.",
  keywords: [
    "AI coding agent",
    "CLI tool",
    "KageOS",
    "Alpha AIRIS-CLI",
    "terminal AI",
    "developer tools",
  ],
  authors: [{ name: "Umaiz Sufiyan" }],
  openGraph: {
    title: "Alpha AIRIS-CLI | KageOS",
    description:
      "A coding agent with the IDE wired in. 40+ providers, 32 built-in tools, AI-powered terminal.",
    type: "website",
    url: "https://sufiyan-sabeel.github.io/Alpha-AIRIS-CLI/",
    siteName: "Alpha AIRIS-CLI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha AIRIS-CLI | KageOS",
    description:
      "A coding agent with the IDE wired in. 40+ providers, 32 built-in tools, AI-powered terminal.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-amoled-950 text-amoled-50 antialiased">{children}</body>
    </html>
  );
}
