"use client";

import { SearchX, Map, Bot } from "lucide-react";

const cards = [
  {
    icon: SearchX,
    title: "Not document search",
    description:
      "SkillBrain doesn't just retrieve paragraphs and hope an LLM stitches them together. It distills scattered knowledge into a structured, decision-ready format.",
  },
  {
    icon: Map,
    title: "Living workflow map",
    description:
      "Every skill file captures how work actually happens — triggers, rules, escalation paths — and can be updated as the company's processes evolve.",
  },
  {
    icon: Bot,
    title: "Agent-ready skills",
    description:
      "Output is structured for execution, not just reading — an agent can load a skill file and act on it directly, no re-interpretation required.",
  },
];

export default function WhySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Why this is Company Brain
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          A fundamentally different approach to capturing institutional knowledge.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
