"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Play,
  Repeat,
  Clock,
  Zap,
  GitBranch,
  ArrowRight,
  RotateCcw,
  Timer,
  Layers,
} from "lucide-react";

const workflowItems = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate complex workflows with visual drag-and-drop builders and reusable templates.",
  },
  {
    icon: GitBranch,
    title: "Pipeline Builder",
    description:
      "Compose multi-step pipelines with branching logic, error handling, and rollback support.",
  },
  {
    icon: Zap,
    title: "Triggers",
    description:
      "Event-driven triggers respond to webhooks, schedules, and state changes in real time.",
  },
  {
    icon: ArrowRight,
    title: "Conditions",
    description:
      "Define conditional routing with rich expression evaluators and dynamic branching.",
  },
  {
    icon: Repeat,
    title: "Loops",
    description:
      "Iterate over datasets and retry failed steps with configurable backoff strategies.",
  },
  {
    icon: Layers,
    title: "Parallel Execution",
    description:
      "Run independent tasks concurrently across isolated workers for maximum throughput.",
  },
  {
    icon: Clock,
    title: "Scheduling",
    description:
      "Precise cron-based scheduling with timezone awareness and dependency-aware execution.",
  },
];

const capabilities = [
  { icon: Play, label: "One-Click Run", desc: "Execute any workflow instantly with a single action." },
  { icon: RotateCcw, label: "Auto-Retry", desc: "Automatic retry with exponential backoff on transient failures." },
  { icon: Timer, label: "Timeouts", desc: "Configurable step timeouts prevent hung pipelines from blocking resources." },
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

export default function Workflow() {
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
            Workflow automation, amplified.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Build, trigger, and orchestrate pipelines with precision.
          </p>
        </motion.div>

        {/* Workflow grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workflowItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
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
                    <ItemIcon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <p className="text-xs text-gray-400 leading-relaxed">
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
