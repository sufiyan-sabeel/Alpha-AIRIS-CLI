import Link from "next/link";
import { GitBranch, MessageCircle, AtSign, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-amoled-950/50 backdrop-blur-xl">
      <div className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-amoled-950 font-bold text-sm">A</span>
              </div>
              <span className="font-mono font-bold text-lg">
                <span className="text-cyan-400">Alpha</span>{" "}
                <span className="text-amoled-50">AIRIS</span>
              </span>
            </Link>
            <p className="text-sm text-amoled-300 leading-relaxed max-w-xs">
              A coding agent with the IDE wired in. Built by KageOS for developers who demand more.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-amoled-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="https://discord.gg/4NMW9cdXZa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-amoled-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:umaiz@sufiyan.dev"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-amoled-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm font-semibold text-amoled-100 mb-4 tracking-wide uppercase">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#features" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="#install" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Install</Link></li>
              <li><Link href="#docs" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Docs</Link></li>
              <li><Link href="#changelog" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-semibold text-amoled-100 mb-4 tracking-wide uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="#architecture" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Architecture</Link></li>
              <li><Link href="#benchmarks" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Benchmarks</Link></li>
              <li><Link href="#roadmap" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Roadmap</Link></li>
              <li><Link href="#faq" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-semibold text-amoled-100 mb-4 tracking-wide uppercase">
              Community
            </h4>
            <ul className="space-y-2.5">
              <li><a href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI" target="_blank" rel="noopener" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">GitHub</a></li>
              <li><a href="https://discord.gg/4NMW9cdXZa" target="_blank" rel="noopener" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Discord</a></li>
              <li><a href="https://sufiyan-sabeel.github.io/Alpha-AIRIS-CLI/" target="_blank" rel="noopener" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">Website</a></li>
              <li><a href="https://www.npmjs.com/package/@airis/airis-coding-agent" target="_blank" rel="noopener" className="text-sm text-amoled-300 hover:text-cyan-400 transition-colors">npm</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-amoled-400">
            © {new Date().getFullYear()} Alpha AIRIS-CLI. Built by Umaiz Sufiyan under the KageOS brand. MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI/blob/main/LICENSE" className="text-xs text-amoled-400 hover:text-cyan-400 transition-colors">License</a>
            <a href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI/blob/main/.github/SECURITY.md" className="text-xs text-amoled-400 hover:text-cyan-400 transition-colors">Security</a>
            <a href="https://github.com/sufiyan-sabeel/Alpha-AIRIS-CLI/blob/main/README.md" className="text-xs text-amoled-400 hover:text-cyan-400 transition-colors">README</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
