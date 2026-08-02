"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Models", href: "#models" },
  { label: "Plugins", href: "#plugins" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Install", href: "#install" },
  { label: "Docs", href: "#docs" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-section flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Alpha AIRIS-CLI home">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
            <Terminal className="w-4 h-4 text-amoled-950" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tight">
            <span className="text-cyan-400">Alpha</span>{" "}
            <span className="text-amoled-50">AIRIS</span>
            <span className="text-amoled-300 text-sm ml-1">CLI</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-amoled-200 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium hover:bg-cyan-400/20 transition-all duration-200"
          >
            GitHub
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-amoled-200 hover:text-cyan-400 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass-strong mt-2 mx-4 rounded-xl p-4 animate-slide-up">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-amoled-200 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium text-center"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
