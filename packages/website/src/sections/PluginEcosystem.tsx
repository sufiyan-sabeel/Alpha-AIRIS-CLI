"use client";

import { motion } from "framer-motion";
import {
  Puzzle,
  Plug,
  Zap,
  Layers,
  Code2,
  Package,
  Blocks,
} from "lucide-react";

const plugins = [
  {
    icon: Puzzle,
    title: "Plugin Marketplace",
    description:
      "Discover, install, and manage plugins from a curated registry with one-click deployment and version management.",
  },
  {
    icon: Plug,
    title: "Integration Capabilities",
    description:
      "Connect to external services, APIs, and data sources with pre-built connectors and custom webhook support.",
  },
  {
    icon: Layers,
    title: "Extension System",
    description:
      "Compose plugins into layered extension stacks that override, augment, or extend core behavior declaratively.",
  },
  {
    icon: Zap,
    title: "Hooks & Events",
    description:
      "React to lifecycle events, tool invocations, and model responses with a lightweight pub/sub hook system.",
  },
  {
    icon: Code2,
    title: "Plugin Development API",
    description:
      "Build plugins with a typed SDK, CLI scaffolding, and hot-reload development mode for rapid iteration.",
  },
  {
    icon: Package,
    title: "Distribution & Sandboxing",
    description:
      "Package plugins as isolated bundles with capability-scoped permissions and secure sandbox execution.",
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

export default function PluginEcosystem() {
  return (
    <section className="relative w-full bg-amoled-950 py-24 px-6 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-[120px]" />
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
            Plugin ecosystem
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            A marketplace, extension system, and dev API for building and
            sharing plugins that extend every capability.
          </p>
        </motion.div>

        {/* Plugin grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {plugins.map((plugin) => {
            const Icon = plugin.icon;
            return (
              <motion.div
                key={plugin.title}
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
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3">
                    {plugin.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {plugin.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
