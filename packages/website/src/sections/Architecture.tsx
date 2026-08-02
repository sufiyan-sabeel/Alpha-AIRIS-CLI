"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  GitBranch,
  Wrench,
  Brain,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Sparkles,
  Radio,
  Cpu,
} from "lucide-react";

const layers = [
  {
    icon: MessageSquare,
    title: "User Input",
    desc: "Natural language commands, structured prompts, and interactive queries enter the system.",
    color: "from-cyan-400 to-blue-400",
    iconColor: "text-cyan-400",
  },
  {
    icon: GitBranch,
    title: "Orchestrator",
    desc: "Intent parsing, task decomposition, and routing decisions determine the execution path.",
    color: "from-blue-400 to-blue-500",
    iconColor: "text-blue-400",
  },
  {
    icon: Wrench,
    title: "Tool Execution",
    desc: "32 built-in tools execute in parallel or sequence — file ops, shell, search, and more.",
    color: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-300",
  },
  {
    icon: Brain,
    title: "Model API",
    desc: "40+ providers with intelligent model selection, cost optimization, and fallback routing.",
    color: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-300",
  },
  {
    icon: ArrowRight,
    title: "Response",
    desc: "Streaming, formatted output delivered back to the user with rich terminal rendering.",
    color: "from-cyan-400 to-blue-400",
    iconColor: "text-cyan-400",
  },
];

const capabilities = [
  { icon: Zap, label: "Parallel Execution", desc: "Run multiple tools concurrently for maximum throughput." },
  { icon: Shield, label: "Error Recovery", desc: "Automatic retries, fallback models, and graceful degradation." },
  { icon: Layers, label: "Context Management", desc: "Persistent memory across sessions with smart truncation." },
  { icon: Sparkles, label: "Streaming Output", desc: "Real-time token streaming with rich terminal formatting." },
  { icon: Radio, label: "Live Telemetry", desc: "Observability hooks for latency, cost, and usage tracking." },
  { icon: Cpu, label: "Adaptive Routing", desc: "Model selection based on task complexity and cost constraints." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const flowVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const dotVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function Architecture() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-amoled-900 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            AI Agent architecture
          </h2>
          <p className="text-amoled-200 text-lg max-w-xl mx-auto">
            A layered pipeline that routes intent, executes tools, and delivers
            streaming responses through intelligent model selection.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center gap-0"
        >
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                variants={itemVariants}
                className="relative flex flex-col items-center w-full"
              >
                {/* Glassmorphism card */}
                <div className="relative group w-full max-w-md p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-500 hover:bg-white/[0.06] hover:border-cyan-400/20 hover:shadow-cyan-400/10 hover:shadow-lg">
                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, rgba(34,211,238,0.08), rgba(59,130,246,0.08))`,
                      boxShadow: `0 0 30px rgba(34,211,238,0.1)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start gap-4">
                    {/* Icon circle */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {layer.title}
                      </h3>
                      <p className="text-sm text-amoled-200 leading-relaxed">
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connecting line + animated flow dot */}
                {i < layers.length - 1 && (
                  <motion.div
                    variants={flowVariants}
                    className="relative flex flex-col items-center"
                    style={{ height: "48px" }}
                  >
                    {/* Vertical line */}
                    <div
                      className="absolute left-1/2 w-px h-full"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(59,130,246,0.15))",
                      }}
                      aria-hidden="true"
                    />

                    {/* Animated flow dot */}
                    <motion.div
                      variants={dotVariants}
                      className="relative z-10 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"
                      animate={{
                        y: [0, 48, 0],
                        opacity: [1, 0.4, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      aria-hidden="true"
                    >
                      {/* Dot glow */}
                      <div className="absolute inset-[-4px] rounded-full bg-cyan-400/20 blur-md" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Key capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-amoled-200 mb-8">
            Key capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const CapIcon = cap.icon;
              return (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] hover:border-cyan-400/15 transition-all duration-400"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CapIcon
                      className="w-4 h-4 text-cyan-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-semibold text-white">
                      {cap.label}
                    </span>
                  </div>
                  <p className="text-xs text-amoled-200 leading-relaxed">
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
