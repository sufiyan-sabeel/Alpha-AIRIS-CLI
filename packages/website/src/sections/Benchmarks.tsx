"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  Gauge,
  TrendingUp,
  Zap,
  Clock,
  BarChart3,
  Activity,
  Target,
} from "lucide-react";

const metrics = [
  {
    icon: Zap,
    label: "Token Generation",
    value: 1240,
    suffix: " tok/s",
    description: "Tokens generated per second across all models",
    color: "from-cyan-400 to-blue-400",
    iconColor: "text-cyan-400",
  },
  {
    icon: Clock,
    label: "Avg Response Time",
    value: 340,
    suffix: " ms",
    description: "Mean time to first token",
    color: "from-blue-400 to-blue-500",
    iconColor: "text-blue-400",
  },
  {
    icon: Activity,
    label: "Throughput",
    value: 89,
    suffix: " req/s",
    description: "Concurrent requests handled per second",
    color: "from-cyan-500 to-blue-500",
    iconColor: "text-cyan-300",
  },
  {
    icon: Target,
    label: "Accuracy",
    value: 97,
    suffix: "%",
    description: "Task completion accuracy across benchmarks",
    color: "from-blue-500 to-indigo-500",
    iconColor: "text-blue-300",
  },
];

const comparisons = [
  {
    icon: Gauge,
    label: "Response Latency",
    baseline: "820 ms",
    optimized: "340 ms",
    improvement: "58% faster",
    pct: 58,
    color: "cyan",
  },
  {
    icon: BarChart3,
    label: "Token Output",
    baseline: "680 tok/s",
    optimized: "1240 tok/s",
    improvement: "82% faster",
    pct: 82,
    color: "blue",
  },
  {
    icon: TrendingUp,
    label: "Throughput",
    baseline: "42 req/s",
    optimized: "89 req/s",
    improvement: "112% faster",
    pct: 75,
    color: "cyan",
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

const statCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-semibold text-white"
    >
      {value}
      <span className="text-cyan-400">{suffix}</span>
    </motion.span>
  );
}

export default function Benchmarks() {
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
            Benchmarks
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Measured performance across response times, throughput, and token
            generation speed.
          </p>
        </motion.div>

        {/* Key metrics grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={statCardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 0 30px rgba(34, 211, 238, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <MetricIcon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <div className="mb-2">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>

                  <h3 className="text-sm font-medium text-white mb-1">
                    {metric.label}
                  </h3>

                  <p className="text-xs leading-relaxed text-gray-400">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-amoled-200 mb-8">
            Performance comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisons.map((comp, i) => {
              const CompIcon = comp.icon;
              return (
                <motion.div
                  key={comp.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 transition-colors duration-300 hover:border-cyan-400/20"
                >
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
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                        <CompIcon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-medium text-white">
                        {comp.label}
                      </h4>
                    </div>

                    {/* Before / After rows */}
                    <div className="space-y-3 mb-5">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Baseline</span>
                          <span className="text-gray-300 font-mono">
                            {comp.baseline}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gray-500/40"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Optimized</span>
                          <span className="text-cyan-400 font-mono">
                            {comp.optimized}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-cyan-400/60"
                            style={{ width: `${comp.pct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Improvement badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1">
                      <TrendingUp className="h-3 w-3 text-cyan-400" />
                      <span className="text-xs font-semibold text-cyan-400">
                        {comp.improvement}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Throughput breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
              <Gauge className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-white">
              Throughput breakdown
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Input processing", value: 72, color: "bg-cyan-400" },
              { label: "Model inference", value: 89, color: "bg-blue-400" },
              { label: "Output streaming", value: 95, color: "bg-cyan-300" },
              { label: "Tool execution", value: 64, color: "bg-blue-500" },
              { label: "Context management", value: 78, color: "bg-cyan-500" },
              { label: "Response formatting", value: 88, color: "bg-blue-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="text-sm text-gray-400 w-36 flex-shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
                <span className="text-sm font-mono text-white w-10 text-right">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
