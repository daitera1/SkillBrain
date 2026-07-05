"use client";

import { ClipboardList, Cpu, FlaskConical } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Input fragmented knowledge",
    description:
      "Paste in the messy Slack threads, wiki pages, and tribal knowledge that describe how a workflow actually works.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Generate executable skill",
    description:
      "SkillBrain distills it into a structured skill file — trigger, decision rules, steps, escalation policy, tools.",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Test with real scenario",
    description:
      "Throw a real-world scenario at it and watch an agent reason through the skill file to a concrete decision.",
  },
];

export default function StepsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-5 sm:grid-cols-3">
        {steps.map(({ icon: Icon, step, title, description }) => (
          <div
            key={step}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-500/30 hover:bg-white/[0.05]"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs text-slate-600">{step}</span>
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
