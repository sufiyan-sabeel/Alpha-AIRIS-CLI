"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  Quote,
  User,
  ThumbsUp,
  Sparkles,
} from "lucide-react";

const testimonials = [
  {
    quote: "Alpha AIRIS-CLI transformed how our team writes and reviews code. The subagent spawning and review mode alone save us hours every sprint.",
    name: "Sarah Chen",
    role: "Engineering Lead, KageOS",
    rating: 5,
  },
  {
    quote: "I've tried every coding agent on the market. The LSP integration and debugger are head and shoulders above the rest — it feels like a real IDE in the terminal.",
    name: "Marcus Rivera",
    role: "Senior Developer, FlowStack",
    rating: 5,
  },
  {
    quote: "The stream rules and tool execution pipeline are incredibly powerful. We built a 12-step CI workflow in a single prompt that used to take a full day of manual setup.",
    name: "Aiko Tanaka",
    role: "DevOps Architect, Nebula CI",
    rating: 5,
  },
  {
    quote: "What sets this apart is the adaptive routing and model selection. It picks the right model for the right task automatically — cost savings have been enormous.",
    name: "David Okonkwo",
    role: "CTO, Prism AI",
    rating: 4,
  },
  {
    quote: "The community around this project is amazing. Real-time telemetry, live debugging, and a workflow that just works. I can't imagine going back to a plain terminal.",
    name: "Elena Voss",
    role: "Open Source Contributor",
    rating: 5,
  },
  {
    quote: "Streaming output with rich terminal formatting makes long-running tasks actually bearable. You can watch the agent think in real time — it's like having a pair programmer.",
    name: "James Park",
    role: "Staff Engineer, NovaTech",
    rating: 5,
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

export default function Testimonials() {
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
            Community voices
          </h2>
          <p className="mt-4 text-lg text-amoled-200 max-w-xl mx-auto">
            Real feedback from developers who rely on Alpha AIRIS-CLI every day.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
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
                {/* Quote mark icon */}
                <div className="mb-4 flex items-center gap-2">
                  <Quote className="h-5 w-5 text-cyan-400/60" strokeWidth={1.5} />
                  <span className="text-xs font-medium uppercase tracking-widest text-cyan-400/40">
                    Testimonial
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-sm leading-relaxed text-gray-300 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-cyan-400 fill-cyan-400/30"
                          : "text-amoled-300"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                {/* User info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <User className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-amoled-200">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: MessageSquare, value: "4.9", label: "Average Rating" },
            { icon: ThumbsUp, value: "2k+", label: "Happy Users" },
            { icon: Sparkles, value: "98%", label: "Would Recommend" },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md px-6 py-4 transition-colors duration-300 hover:border-cyan-400/20 hover:bg-white/[0.06]"
              >
                <StatIcon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                <div>
                  <p className="text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-amoled-200">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
