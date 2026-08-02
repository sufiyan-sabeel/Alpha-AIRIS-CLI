"use client";

import { motion } from "framer-motion";
import {
  Road,
  Flag,
  Clock,
  Zap,
  Rocket,
  Star,
  ChevronRight,
  CircleDot,
} from "lucide-react";

const milestones = [
  {
    icon: Rocket,
    title: "v0.2.0 — Plugin System",
    date: "Q3 2026",
    description:
      "Extensible plugin architecture with community-contributed integrations and custom tool definitions.",
    status: "upcoming",
  },
  {
    icon: Zap,
    title: "Multi-Session Orchestration",
    date: "Q4 2026",
    description:
      "Run and coordinate multiple agent sessions in parallel with shared context and result aggregation.",
    status: "upcoming",
  },
  {
    icon: Star,
    title: "Memory Persistence",
    date: "Q1 2027",
    description:
      "Persistent memory across sessions with intelligent retrieval, summarization, and context management.",
    status: "planned",
  },
  {
    icon: Flag,
    title: "Web Dashboard",
    date: "Q2 2027",
    description:
      "Browser-based dashboard for monitoring agent activity, reviewing outputs, and managing configurations.",
    status: "planned",
  },
  {
    icon: Road,
    title: "Self-Hosted Deployment",
    date: "Q3 2027",
    description:
      "Run Alpha AIRIS-CLI as a persistent service with WebSocket streaming, auth, and team collaboration.",
    status: "exploring",
  },
];

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    icon: Clock,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  planned: {
    label: "Planned",
    icon: Flag,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  exploring: {
    label: "Exploring",
    icon: ChevronRight,
    color: "text-amoled-200",
    bg: "bg-white/[0.04]",
    border: "border-white/10",
  },
};

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function Roadmap() {
  return (
    <section className="relative w-full bg-amoled-950 py-24 px-6 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            The road ahead
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Upcoming features, planned enhancements, and the timeline for
            what&apos;s next.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative flex flex-col items-center"
        >
          {/* Central vertical line */}
          <motion.div
            variants={lineVariants}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(34,211,238,0.3), rgba(59,130,246,0.15))",
            }}
            aria-hidden="true"
          />

          {milestones.map((milestone, i) => {
            const MilestoneIcon = milestone.icon;
            const StatusIcon = statusConfig[milestone.status].icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={milestone.title}
                variants={cardVariants}
                className="relative flex items-center w-full mb-12 last:mb-0"
              >
                {/* Status dot on the line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-10"
                  aria-hidden="true"
                >
                  <CircleDot
                    className={`w-4 h-4 ${
                      milestone.status === "upcoming"
                        ? "text-cyan-400"
                        : milestone.status === "planned"
                          ? "text-blue-400"
                          : "text-amoled-200"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Card */}
                <div
                  className={`relative w-full max-w-md ${
                    isLeft ? "pr-12 text-right" : "pl-12"
                  }`}
                >
                  <div className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/10">
                    {/* Glow border on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(34,211,238,0.08), rgba(59,130,246,0.08))`,
                        boxShadow: `0 0 30px rgba(34,211,238,0.1)`,
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative">
                      {/* Icon + Status badge */}
                      <div
                        className={`flex items-center gap-3 mb-4 ${
                          isLeft ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                          <MilestoneIcon
                            className="h-5 w-5"
                            strokeWidth={1.5}
                          />
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig[milestone.status].color} ${statusConfig[milestone.status].bg} border ${statusConfig[milestone.status].border}`}
                        >
                          <StatusIcon className="w-3 h-3" strokeWidth={1.5} />
                          {statusConfig[milestone.status].label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {milestone.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center gap-2 mb-3">
                        <Clock
                          className="w-3.5 h-3.5 text-gray-500"
                          strokeWidth={1.5}
                        />
                        <span className="text-xs text-gray-500 font-medium">
                          {milestone.date}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}