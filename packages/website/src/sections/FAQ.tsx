"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Zap,
  Terminal,
  Settings,
  Shield,
  BookOpen,
} from "lucide-react";

const faqs = [
  {
    icon: HelpCircle,
    question: "What is Alpha AIRIS-CLI?",
    answer:
      "Alpha AIRIS-CLI is a coding agent with the IDE wired in. It provides 40+ AI model providers, 32 built-in tools, and intelligent orchestration for software development workflows — all from your terminal.",
  },
  {
    icon: Zap,
    question: "How does the model routing work?",
    answer:
      "The system uses adaptive routing to select the best model based on task complexity, cost constraints, and availability. Simple queries route to fast, cheap models while complex reasoning tasks are directed to capable frontier models.",
  },
  {
    icon: Terminal,
    question: "Can I run code directly from the CLI?",
    answer:
      "Yes. AIRIS-CLI supports sandboxed code execution with real-time output streaming and multi-language support. You can run, debug, and iterate on code without leaving your terminal.",
  },
  {
    icon: Settings,
    question: "How do I configure my providers and tools?",
    answer:
      "Configuration is managed through a simple YAML or environment-based setup. You can add API keys for any of the 40+ supported providers, customize tool permissions, and define default model preferences.",
  },
  {
    icon: Shield,
    question: "Is my data safe?",
    answer:
      "All API calls are made directly from your machine to the provider endpoints. No data is stored on our servers. You maintain full control over your credentials, code, and context at all times.",
  },
  {
    icon: BookOpen,
    question: "Where can I find documentation?",
    answer:
      "Comprehensive documentation is available in the Docs section of the site, covering installation, configuration, tool reference, and advanced workflows. You can also access the CLI help with the --help flag.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-amoled-950 py-24 px-6 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-amoled-200 max-w-xl mx-auto">
            Everything you need to know about Alpha AIRIS-CLI and how to get
            the most out of it.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-4"
        >
          {faqs.map((faq, index) => {
            const FaqIcon = faq.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/20"
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

                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="relative flex w-full items-center gap-4 p-6 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition-colors duration-300 group-hover:bg-cyan-400/20">
                    <FaqIcon className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  <span className="flex-1 text-base font-medium text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-cyan-400/60 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Expandable answer */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="relative px-6 pb-6 pl-[5.25rem]">
                    <div className="h-px w-full bg-white/5 mb-4" />
                    <p className="text-sm leading-relaxed text-amoled-200">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
