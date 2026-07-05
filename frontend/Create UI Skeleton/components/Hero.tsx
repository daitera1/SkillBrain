"use client";

import { Brain, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 px-6 pb-20 pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:44px_44px] opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
          <Brain className="h-3.5 w-3.5 text-brand-400" />
          Company Brain for AI Agents
        </div>

        <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          SkillBrain
          <Sparkles className="h-8 w-8 text-brand-400 sm:h-10 sm:w-10" />
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-medium text-slate-200 sm:text-xl">
          Turn scattered company knowledge into executable AI skills.
        </p>

        <p className="mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
          Not a document chatbot — a living map of how company work gets done.
        </p>

        <a
          href="#workspace"
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
        >
          Try it below
        </a>
      </div>
    </section>
  );
}
