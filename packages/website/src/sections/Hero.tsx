"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Terminal, ChevronDown } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.97,
  },
};

const terminalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-cyan-400/10 blur-[120px] animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] animate-aurora" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-cyan-400/5 blur-[150px] animate-aurora" />
        {/* Particle glow orbs */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-400/60 rounded-full animate-particle-float blur-sm" />
        <div className="absolute top-[60%] right-[15%] w-3 h-3 bg-blue-400/50 rounded-full animate-particle-float blur-sm" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-cyan-400/40 rounded-full animate-particle-float blur-sm" style={{ animationDelay: "4s" }} />
        <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-particle-float blur-sm" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[20%] right-[10%] w-2 h-2 bg-cyan-400/30 rounded-full animate-particle-float blur-sm" style={{ animationDelay: "3s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Terminal mockup floating in background */}
        <motion.div
          className="absolute top-1/4 right-1/4 hidden lg:block w-80 glassmorphism rounded-xl p-4 opacity-60"
          variants={terminalVariants}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="font-mono text-xs text-cyan-400/80 space-y-1.5">
            <div>
              <span className="text-cyan-400">$</span>
              <span className="text-cyan-300"> airis --version</span>
            </div>
            <div className="text-gray-400">alpha-airis-cli v0.1.0</div>
            <div className="mt-2">
              <span className="text-cyan-400">$</span>
              <span className="text-cyan-300"> airis models</span>
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">✓</span> gpt-4o
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">✓</span> claude-3.5-sonnet
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">✓</span> codestral
            </div>
            <div className="mt-2">
              <span className="text-cyan-400">$</span>
              <span className="text-cyan-300"> airis edit src/foo.ts</span>
            </div>
            <div className="text-gray-400">
              <span className="text-cyan-400">|</span> Editing src/foo.ts...
            </div>
            <div className="mt-1 border-t border-white/5 pt-1">
              <span className="text-cyan-400">$</span>
              <span className="text-cyan-300"> airis review</span>
            </div>
            <div className="text-gray-400">
              <span className="text-cyan-400">|</span> Scanning 12 files...
            </div>
            {/* Animated cursor */}
            <span className="inline-block w-2 h-4 bg-cyan-400 animate-blink-caret ml-1 align-middle" />
          </div>
        </motion.div>

        {/* Hero text content */}
        <motion.div variants={itemVariants} className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Alpha AIRIS-CLI
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          A coding agent with the IDE wired in.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              href="#install"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-[#050505] font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Link
              href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 glassmorphism text-gray-300 font-semibold text-sm tracking-wide hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-300"
            >
              <GitBranch className="w-4 h-4" />
              GitHub
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400/60" />
            40+ Providers
          </span>
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400/60" />
            32 Built-in Tools
          </span>
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400/60" />
            AI-Powered Terminal
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-400/60" />
        </motion.div>
      </motion.div>

      {/* Cursor glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.06), transparent 40%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
