"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen bg-amoled-950 text-amoled-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold text-cyan-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-3">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">An unexpected error occurred. Please try again or return home.</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 px-6 py-3 text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400/30"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-medium text-amoled-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            <Home className="w-4 h-4" strokeWidth={1.5} />
            Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
