import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-screen bg-amoled-950 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
        >
          <span className="text-amoled-950 font-bold text-sm">A</span>
        </motion.div>
        <p className="text-sm text-amoled-300 font-mono">Loading Alpha AIRIS-CLI...</p>
      </motion.div>
    </main>
  );
}
