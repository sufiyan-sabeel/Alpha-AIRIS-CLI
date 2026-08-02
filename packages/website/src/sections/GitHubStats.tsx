"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  Star,
  GitFork,
  Users,
  TrendingUp,
  Activity,
  Award,
  Heart,
} from "lucide-react";

const stats = [
  {
    icon: Star,
    label: "Stars",
    value: "12.4K",
    description: "GitHub stars across all repositories",
  },
  {
    icon: GitFork,
    label: "Forks",
    value: "847",
    description: "Community forks and contributions",
  },
  {
    icon: Users,
    label: "Contributors",
    value: "156",
    description: "Active contributors this quarter",
  },
  {
    icon: Activity,
    label: "Commits",
    value: "3.2K",
    description: "Commits this month",
  },
  {
    icon: Award,
    label: "Releases",
    value: "48",
    description: "Stable releases to date",
  },
  {
    icon: Heart,
    label: "Community",
    value: "2.1K",
    description: "Community members and supporters",
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

export default function GitHubStats() {
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
            GitHub stats
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Community-driven development with thousands of stars, contributors,
            and commits across the codebase.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
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
                    <StatIcon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <div className="mb-1">
                    <span className="text-3xl md:text-4xl font-semibold text-white">
                      {stat.value}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom highlight bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
            <span className="text-sm text-gray-300">
              <span className="text-white font-semibold">+34%</span> star growth
              this quarter
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3">
            <GitBranch className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
            <span className="text-sm text-gray-300">
              <span className="text-white font-semibold">Open source</span>{" "}
              under MIT license
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
