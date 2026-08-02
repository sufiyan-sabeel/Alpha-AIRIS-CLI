"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { Terminal } from "lucide-react";

export default function CLIDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const commands = [
    {
      cmd: "airis --version",
      output: "alpha-airis-cli v0.1.0",
      steps: 15,
      duration: 1.2,
      typingDelay: 0.3,
      outputDelay: 1.6,
    },
    {
      cmd: "airis models",
      output: ["✓ gpt-4o", "✓ claude-3.5-sonnet", "✓ codestral"],
      steps: 12,
      duration: 1.0,
      typingDelay: 2.0,
      outputDelay: 3.1,
    },
    {
      cmd: "airis edit src/foo.ts",
      output: ["| Editing src/foo.ts..."],
      steps: 21,
      duration: 1.4,
      typingDelay: 3.5,
      outputDelay: 5.0,
    },
    {
      cmd: "airis review",
      output: ["| Scanning 12 files..."],
      steps: 12,
      duration: 0.8,
      typingDelay: 5.5,
      outputDelay: 6.4,
    },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#050505] overflow-hidden">
      <style>{`
        @keyframes cli-typing {
          from { max-width: 0; }
          to { max-width: 300px; }
        }
        @keyframes cli-blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes cli-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cli-typing {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          max-width: 0;
          border-right: 2px solid #22d3ee;
          padding-right: 4px;
        }
        .cli-cursor {
          display: inline-block;
          width: 2px;
          height: 1.15em;
          background: #22d3ee;
          margin-left: 1px;
          vertical-align: text-bottom;
          animation: cli-blink 0.75s step-end infinite;
        }
        .cli-output {
          opacity: 0;
          animation: cli-fade-in 0.4s ease forwards;
          animation-delay: var(--output-delay, 0s);
          padding-left: 1.5rem;
        }
        .cli-prompt {
          color: #22d3ee;
          margin-right: 0.5rem;
          user-select: none;
        }
      `}</style>

      {/* Background glow effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-400/5 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Watch the CLI come alive. Type commands, see instant results.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-gray-500">
              terminal — alpha-airis-cli
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            {commands.map((cmd, i) => (
              <div key={i} className="mb-2">
                {/* Command line */}
                <div className="flex items-baseline">
                  <span className="cli-prompt">$</span>
                  <span
                    className="cli-typing text-cyan-300"
                    style={{
                      animation: `cli-typing ${cmd.duration}s steps(${cmd.steps}, end) forwards`,
                      animationDelay: `${cmd.typingDelay}s`,
                      animationFillMode: "forwards",
                    } as React.CSSProperties}
                  >
                    {cmd.cmd}
                  </span>
                  <span className="cli-cursor" />
                </div>

                {/* Output lines */}
                {Array.isArray(cmd.output) ? (
                  cmd.output.map((line, j) => (
                    <div
                      key={j}
                      className="cli-output text-gray-400"
                      style={{
                        "--output-delay": `${cmd.outputDelay + j * 0.35}s`,
                      } as React.CSSProperties}
                    >
                      {line}
                    </div>
                  ))
                ) : (
                  <div
                    className="cli-output text-gray-400"
                    style={{
                      "--output-delay": `${cmd.outputDelay}s`,
                    } as React.CSSProperties}
                  >
                    {cmd.output}
                  </div>
                )}
              </div>
            ))}

            {/* Final blinking cursor */}
            <div className="flex items-baseline mt-2">
              <span className="cli-prompt">$</span>
              <span className="cli-cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
