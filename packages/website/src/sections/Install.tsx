"use client";

import { motion } from "framer-motion";
import {
  Download,
  Terminal,
  CheckCircle,
  Shield,
  Zap,
  ArrowRight,
  MonitorSmartphone,
} from "lucide-react";

const installCommands = [
  {
    label: "curl",
    cmd: "curl -fsSL https://raw.githubusercontent.com/sufiyan-sabeel/Alpha-AIRIS-CLI/main/scripts/install.sh | sh",
    description: "macOS · Linux via script",
  },
  {
    label: "bun",
    cmd: "bun install -g @airis/airis-coding-agent",
    description: "Recommended — fastest path",
  },
  {
    label: "brew",
    cmd: "brew install sufiyan-sabeel/tap/airis",
    description: "Install via Homebrew",
  },
  {
    label: "powershell",
    cmd: "irm https://raw.githubusercontent.com/sufiyan-sabeel/Alpha-AIRIS-CLI/main/scripts/install.ps1 | iex",
    description: "Windows (PowerShell)",
  },
];

const platforms = [
  {
    icon: Shield,
    title: "Linux",
    description: "Full support on Ubuntu 22.04+, Debian 12+, Fedora 38+, and Arch Linux.",
    color: "from-cyan-400 to-blue-400",
  },
  {
    icon: Shield,
    title: "macOS",
    description: "Native support on macOS 14+. Works with Apple Silicon and Intel.",
    color: "from-blue-400 to-blue-500",
  },
  {
    icon: Shield,
    title: "Windows",
    description: "Windows 11 support via WSL2 or native PowerShell installation.",
    color: "from-cyan-500 to-blue-500",
  },
];

const quickStartSteps = [
  {
    icon: Download,
    title: "Install the CLI",
    description: "Run one of the install commands above for your platform.",
  },
  {
    icon: Terminal,
    title: "Initialize",
    description: "Run airis init to scaffold your project configuration.",
  },
  {
    icon: Zap,
    title: "Execute",
    description: "Run airis to start coding with AI-powered assistance.",
  },
  {
    icon: CheckCircle,
    title: "Done",
    description: "Your project is set up and ready to go.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const commandVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Install() {
  return (
    <section className="relative w-full bg-amoled-950 py-24 px-6 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Get started in seconds
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Install the CLI, pick your platform, and start building with AI-powered
            coding agents.
          </p>
        </motion.div>

        {/* Install commands */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <Terminal className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">Install commands</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {installCommands.map((item) => (
              <motion.div
                key={item.label}
                variants={commandVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 transition-colors duration-300 hover:border-cyan-400/20"
              >
                {/* Card glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.04) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <Terminal className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <div className="mb-3 text-xs font-mono uppercase tracking-widest text-cyan-400/70">
                    {item.label}
                  </div>

                  <code className="block text-sm font-mono text-gray-300 bg-amoled-900/50 rounded-lg px-3 py-2 border border-white/5">
                    {item.cmd}
                  </code>

                  <p className="mt-3 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform support */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <MonitorSmartphone className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">Platform support</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <motion.div
                key={platform.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 transition-colors duration-300 hover:border-cyan-400/20"
              >
                {/* Card glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.04) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <MonitorSmartphone className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3">
                    {platform.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {platform.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick start guide */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <Zap className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            <h3 className="text-xl font-medium text-white">Quick start guide</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 transition-colors duration-300 hover:border-cyan-400/20"
              >
                {/* Card glow border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.04) 100%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <step.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <div className="mb-2 text-xs font-mono uppercase tracking-widest text-cyan-400/70">
                    Step {i + 1}
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>

                  {i < quickStartSteps.length - 1 && (
                    <div className="mt-4 flex items-center gap-2 text-cyan-400/50">
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      <span className="text-xs font-mono">Next</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}