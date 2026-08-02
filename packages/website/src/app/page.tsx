import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Architecture from "@/sections/Architecture";
import ModelProviders from "@/sections/ModelProviders";
import PluginEcosystem from "@/sections/PluginEcosystem";
import Workflow from "@/sections/Workflow";
import Benchmarks from "@/sections/Benchmarks";
import Install from "@/sections/Install";
import DocsPreview from "@/sections/DocsPreview";
import Roadmap from "@/sections/Roadmap";
import GitHubStats from "@/sections/GitHubStats";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Alpha AIRIS-CLI | KageOS",
  description:
    "A coding agent with the IDE wired in. 40+ providers, 32 built-in tools, AI-powered terminal.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-amoled-950 text-amoled-50">
      <Navigation />
      <Hero />
      <Features />
      <Architecture />
      <ModelProviders />
      <PluginEcosystem />
      <Workflow />
      <Benchmarks />
      <Install />
      <DocsPreview />
      <Roadmap />
      <GitHubStats />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
