"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Key,
  Server,
  Sparkles,
  Cpu,
  Globe,
  Lock,
  Zap,
  Terminal,
  Code,
  Database,
  Rocket,
} from "lucide-react";

const categories = [
  {
    id: "frontier",
    label: "Frontier APIs",
    icon: Cloud,
  },
  {
    id: "coding",
    label: "Coding Plans",
    icon: Code,
  },
  {
    id: "selfhosted",
    label: "Self-hosted",
    icon: Server,
  },
];

const providers = {
  frontier: [
    {
      name: "OpenAI",
      auth: "API Key",
      authIcon: Key,
      description: "GPT-4o, GPT-4 Turbo, o1, and o3 models with full function calling and vision support.",
    },
    {
      name: "Anthropic",
      auth: "API Key",
      authIcon: Key,
      description: "Claude 3.5 Sonnet, Claude 3 Opus, and Claude 3 Haiku with long context windows.",
    },
    {
      name: "Google",
      auth: "API Key",
      authIcon: Key,
      description: "Gemini 2.5 Pro and Gemini 1.5 Ultra with multimodal reasoning and tool use.",
    },
    {
      name: "DeepSeek",
      auth: "API Key",
      authIcon: Key,
      description: "DeepSeek V3 and DeepSeek Coder with competitive reasoning and coding performance.",
    },
  ],
  coding: [
    {
      name: "GitHub Copilot",
      auth: "OAuth",
      authIcon: Lock,
      description: "AI-powered code completion and chat directly inside the GitHub ecosystem.",
    },
    {
      name: "Cursor",
      auth: "API Key",
      authIcon: Key,
      description: "AI-first code editor with integrated model selection and diff-aware editing.",
    },
    {
      name: "Windsurf",
      auth: "API Key",
      authIcon: Key,
      description: "Autonomous coding agent that writes, edits, and refactors across entire codebases.",
    },
    {
      name: "Codeium",
      auth: "API Key",
      authIcon: Key,
      description: "Free AI code completion with multi-language support and IDE integration.",
    },
  ],
  selfhosted: [
    {
      name: "Ollama",
      auth: "Local",
      authIcon: Server,
      description: "Run Llama 3, Mistral, and Phi models locally with no API key required.",
    },
    {
      name: "LM Studio",
      auth: "Local",
      authIcon: Server,
      description: "Desktop app for browsing, downloading, and running local LLMs with a GUI.",
    },
    {
      name: "vLLM",
      auth: "Local",
      authIcon: Server,
      description: "High-throughput LLM serving engine with PagedAttention and continuous batching.",
    },
    {
      name: "llama.cpp",
      auth: "Local",
      authIcon: Server,
      description: "C++ inference library for running GGUF quantized models on any hardware.",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
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

const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const tabIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function ModelProviders() {
  const [activeTab, setActiveTab] = useState("frontier");

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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            40+ providers, one /model away
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Switch between frontier APIs, coding-focused plans, and self-hosted
            engines — all from the same terminal.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-1 mb-10 rounded-xl bg-white/[0.03] border border-white/[0.06] p-1 backdrop-blur-sm"
        >
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
                aria-label={`Switch to ${cat.label} providers`}
              >
                <CatIcon className="w-4 h-4" strokeWidth={1.5} />
                {cat.label}
              </button>
            );
          })}

          {/* Animated indicator */}
          <motion.div
            layoutId="tabIndicator"
            className="absolute top-1 bottom-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20"
            initial={false}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            style={{
              left: "calc(33.33% * 0)",
              width: "calc(33.33% - 4px)",
            }}
          />
        </motion.div>

        {/* Provider cards with smooth tab transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {providers[activeTab as keyof typeof providers].map(
                (provider) => {
                  const AuthIcon = provider.authIcon;
                  return (
                    <motion.div
                      key={provider.name}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 0 30px rgba(34,211,238,0.15), 0 0 60px rgba(59,130,246,0.08)",
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
                        {/* Auth badge */}
                        <div className="mb-4 flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-400">
                            <AuthIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                          </div>
                          <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                            {provider.auth}
                          </span>
                        </div>

                        {/* Provider name */}
                        <h3 className="text-base font-semibold text-white mb-2">
                          {provider.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-gray-400">
                          {provider.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#install"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/10 border border-cyan-400/20 px-6 py-3 text-sm font-medium text-cyan-400 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/10"
          >
            <Rocket className="w-4 h-4" strokeWidth={1.5} />
            Get started with /model
          </a>
        </motion.div>
      </div>
    </section>
  );
}