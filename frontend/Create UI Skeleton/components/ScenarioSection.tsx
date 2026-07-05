"use client";

import type { ComponentType } from "react";
import { PlayCircle, Loader2, AlertTriangle, ShieldCheck, MessageSquareText, Brain, ListChecks } from "lucide-react";
import { ScenarioDecision, WorkflowKey, sampleScenario } from "@/lib/mockData";

interface ScenarioSectionProps {
  workflow: WorkflowKey;
  scenarioText: string;
  onScenarioChange: (value: string) => void;
  decision: ScenarioDecision | null;
  isRunning: boolean;
  onRun: () => void;
  hasSkill: boolean;
}

export default function ScenarioSection({
  workflow,
  scenarioText,
  onScenarioChange,
  decision,
  isRunning,
  onRun,
  hasSkill,
}: ScenarioSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Test the skill with a real scenario
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          See how an agent reasons through the generated skill file to reach a decision.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Scenario
            </label>
            <button
              onClick={() => onScenarioChange(sampleScenario[workflow])}
              className="text-xs font-medium text-brand-400 transition hover:text-brand-300"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={scenarioText}
            onChange={(e) => onScenarioChange(e.target.value)}
            placeholder="Describe a real-world situation the agent needs to handle…"
            className="min-h-[220px] flex-1 resize-none rounded-lg border border-white/10 bg-[#0b0d12] p-3.5 text-sm leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-brand-500"
          />

          <button
            onClick={onRun}
            disabled={isRunning || !hasSkill}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running skill…
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                Run Skill
              </>
            )}
          </button>
          {!hasSkill && (
            <p className="mt-3 text-xs text-slate-500">
              Generate a skill file above first, then run a scenario against it.
            </p>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Brain className="h-4 w-4" />
            Agent decision
          </div>

          <div className="flex-1 rounded-lg border border-white/10 bg-[#0b0d12] p-4">
            {decision ? (
              <div className="flex flex-col gap-4 animate-fade-in">
                <Field icon={ListChecks} label="Decision" value={decision.decision} accent />
                <Field icon={Brain} label="Reasoning" value={decision.reasoning} />
                <Field icon={PlayCircle} label="Next action" value={decision.nextAction} />

                <div>
                  <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Escalation status
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        decision.escalation.required
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-emerald-500/15 text-emerald-400"
                      }`}
                    >
                      {decision.escalation.required ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <ShieldCheck className="h-3 w-3" />
                      )}
                      {decision.escalation.required ? "Escalation required" : "No escalation needed"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {decision.escalation.reason}
                  </p>
                </div>

                {decision.messageDraft && (
                  <div>
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <MessageSquareText className="h-3.5 w-3.5" />
                      Message draft
                    </div>
                    <p className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm italic leading-relaxed text-slate-300">
                      &ldquo;{decision.messageDraft}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-slate-600">
                Run a scenario to see the agent&rsquo;s decision, reasoning, and next action.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p
        className={`text-sm leading-relaxed ${
          accent ? "font-semibold text-white" : "text-slate-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
