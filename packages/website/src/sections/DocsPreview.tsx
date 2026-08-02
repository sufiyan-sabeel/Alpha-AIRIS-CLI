"use client";

import { motion } from "framer-motion";
import {
  Book,
  Code2,
  Search,
  Layers,
  Terminal,
  BookOpen,
  Zap,
} from "lucide-react";

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Quick-start guide to install, configure, and run the SDK in minutes.",
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Complete API documentation with type definitions, parameters, and return values.",
  },
  {
    icon: Terminal,
    title: "Code Examples",
    description: "Practical code snippets for common workflows, integrations, and edge cases.",
  },
  {
    icon: Search,
    title: "Search & Explore",
    description: "Find exactly what you need across all guides, references, and tutorials.",
  },
];

const codeBlockLines = [
  { prefix: "import", content: " { Airis } from '@airis/sdk';", highlight: false },
  { prefix: "", content: "", highlight: false },
  { prefix: "const", content: " client = new Airis({", highlight: false },
  { prefix: "  ", content: "apiKey: process.env.AIRIS_KEY,", highlight: false },
  { prefix: "  ", content: "model: 'airis-v2',", highlight: false },
  { prefix: "});", content: "", highlight: false },
  { prefix: "", content: "", highlight: false },
  { prefix: "const", content: " result = await client.run({", highlight: false },
  { prefix: "  ", content: "prompt: 'Explain quantum computing',", highlight: true },
  { prefix: "  ", content: "stream: true,", highlight: false },
  { prefix: "});", content: "", highlight: false },
  { prefix: "", content: "", highlight: false },
  { prefix: "for await", content: " (const chunk of result) {", highlight: false },
  { prefix: "  ", content: "console.log(chunk.text);", highlight: true },
  { prefix: "}", content: "", highlight: false },
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

const blockVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

export default function DocsPreview() {
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
            Documentation preview
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            API reference, code examples, and a getting started guide — all in one place.
          </p>
        </motion.div>

        {/* Doc sections grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {docSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
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
                    <SectionIcon className="h-6 w-6" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-3">
                    {section.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {section.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Code preview block */}
        <motion.div
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative group rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-colors duration-300 hover:border-cyan-400/20"
        >
          {/* Glow border on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.04) 100%)",
              boxShadow: "0 0 30px rgba(34,211,238,0.1)",
            }}
            aria-hidden="true"
          />

          {/* Code block header */}
          <div className="relative flex items-center gap-3 px-6 py-4 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs text-gray-500 font-mono">getting-started.ts</span>
            <div className="ml-auto flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs text-cyan-400/70">TypeScript</span>
            </div>
          </div>

          {/* Code block content */}
          <div className="relative px-6 py-5 font-mono text-sm leading-relaxed">
            <div className="flex gap-8">
              {/* Line numbers */}
              <div className="flex flex-col items-end select-none text-gray-600 min-w-[2rem]">
                {codeBlockLines.map((_, i) => (
                  <span key={i} className="inline-block w-full text-right">
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* Code content */}
              <div className="flex-1 space-y-1">
                {codeBlockLines.map((line, i) => (
                  <div
                    key={i}
                    className={`inline-block w-full ${line.highlight ? "text-cyan-400" : "text-gray-400"}`}
                  >
                    {line.prefix && (
                      <span className="text-gray-600">{line.prefix}</span>
                    )}
                    {line.content && (
                      <span className={line.highlight ? "text-cyan-400" : "text-gray-400"}>
                        {line.content}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom features row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Layers, label: "Type-safe", desc: "Full TypeScript definitions shipped with the package." },
            { icon: Book, label: "Guides", desc: "Step-by-step tutorials for every integration pattern." },
            { icon: Zap, label: "Fast setup", desc: "Get running in under five minutes with zero config." },
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] hover:border-cyan-400/15 transition-all duration-400"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ItemIcon className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}