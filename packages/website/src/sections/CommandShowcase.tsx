"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  BookOpen,
  SquarePen,
  Terminal,
  Code2,
  Bug,
  Search,
  ListTodo,
  PenLine,
  GitBranch,
  ClipboardList,
  MessageCircle,
  Link2,
  ShieldCheck,
  RotateCcw,
  Bookmark,
  Clock,
  Lightbulb,
} from "lucide-react";

const commands = [
  {
    name: "read",
    icon: BookOpen,
    description: "Read files and directories with smart context-aware slicing",
  },
  {
    name: "edit",
    icon: SquarePen,
    description: "Apply surgical edits to source files with diff precision",
  },
  {
    name: "bash",
    icon: Terminal,
    description: "Execute shell commands and capture output inline",
  },
  {
    name: "lsp",
    icon: Code2,
    description: "Query language server for diagnostics and completions",
  },
  {
    name: "debug",
    icon: Bug,
    description: "Attach a debugger, set breakpoints, and inspect state",
  },
  {
    name: "search",
    icon: Search,
    description: "Grep across the codebase with regex and glob support",
  },
  {
    name: "task",
    icon: ListTodo,
    description: "Manage and track subtasks within the agent workflow",
  },
  {
    name: "write",
    icon: PenLine,
    description: "Create or overwrite files with generated content",
  },
  {
    name: "ast_edit",
    icon: GitBranch,
    description: "Rewrite code using AST-level pattern matching and transforms",
  },
  {
    name: "todo",
    icon: ClipboardList,
    description: "Scan code for TODO markers and track outstanding work",
  },
  {
    name: "ask",
    icon: MessageCircle,
    description: "Pose a question to the agent and get a contextual answer",
  },
  {
    name: "hub",
    icon: Link2,
    description: "Coordinate with peer agents and share state across sessions",
  },
  {
    name: "checkpoint",
    icon: ShieldCheck,
    description: "Save a named snapshot of the current agent state",
  },
  {
    name: "rewind",
    icon: RotateCcw,
    description: "Roll back the agent to a previous checkpoint",
  },
  {
    name: "retain",
    icon: Bookmark,
    description: "Pin important context so it persists across turns",
  },
  {
    name: "recall",
    icon: Clock,
    description: "Retrieve previously retained context by name or pattern",
  },
  {
    name: "reflect",
    icon: Lightbulb,
    description: "Analyze the agent's reasoning and suggest improvements",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function CommandShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="commands"
      className="relative py-24 bg-amoled-950 noise-bg"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="container-section relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-400/70 mb-4 block">
            / Commands
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-amoled-50 mb-4">
            Command{" "}
            <span className="text-gradient font-mono">Showcase</span>
          </h2>
          <p className="text-amoled-300 max-w-xl mx-auto text-sm leading-relaxed">
            Every tool at your fingertips. From file manipulation to
            cross-agent coordination — the CLI covers the full development
            lifecycle.
          </p>
        </motion.div>

        {/* Command grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {commands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <motion.div
                key={cmd.name}
                variants={cardVariants}
                className="group glass rounded-xl p-5 hover-glow cursor-default transition-all duration-300 border border-white/[0.06] hover:border-cyan-400/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-mono text-sm font-semibold text-amoled-100 tracking-wide">
                    {cmd.name}
                  </span>
                </div>
                <p className="text-xs text-amoled-400 leading-relaxed">
                  {cmd.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
