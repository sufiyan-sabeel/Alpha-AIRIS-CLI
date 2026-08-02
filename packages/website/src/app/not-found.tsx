"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-amoled-950 text-amoled-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6"
        >
          <Search className="w-10 h-10 text-cyan-400" strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 px-6 py-3 text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400/30"
          >
            <Home className="w-4 h-4" strokeWidth={1.5} />
            Go Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
