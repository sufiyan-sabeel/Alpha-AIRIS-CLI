"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  FileCode,
  Bug,
  GitBranch,
  Bot,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Code Execution",
    description: "Run code instantly in isolated sandboxes with real-time output streaming and multi-language support.",
  },
  {
    icon: FileCode,
    title: "LSP Integration",
    description: "Deep language server protocol support for autocompletion, diagnostics, and inline documentation.",
  },
  {
    icon: Bug,
    title: "Debugger",
    description: "Step through code with breakpoints, watch expressions, and a fully interactive debugging terminal.",
  },
  {
    icon: GitBranch,
    title: "Stream Rules",
    description: "Define transformation pipelines that process stdout/stderr streams with composable rule chains.",
  },
  {
    icon: Bot,
    title: "Subagents",
    description: "Spawn autonomous AI subagents to handle parallel tasks, each with its own context and tool access.",
  },
  {
    icon: Eye,
    title: "Review Mode",
    description: "Diff-aware review sessions that surface changes, suggest improvements, and enforce style contracts.",
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

export default function Features() {
  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 overflow-hidden">
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
            Every tool, benchmaxxed.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Six powerful capabilities, each engineered to accelerate your workflow.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
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
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                  <feature.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-medium text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
