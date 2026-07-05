"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { updateSkill, WorkflowKey } from "@/lib/mockData";

interface UpdateSkillSectionProps {
  workflow: WorkflowKey;
  generatedSkill: string;
  onSkillUpdated: (updatedSkill: string) => void;
}

export default function UpdateSkillSection({
  workflow,
  generatedSkill,
  onSkillUpdated,
}: UpdateSkillSectionProps) {
  const [updateText, setUpdateText] = useState("");
  const [changeLog, setChangeLog] = useState<string[]>([]);

  const handleUpdate = () => {
    if (!updateText.trim()) return;
    const result = updateSkill(generatedSkill, updateText, workflow);
    setChangeLog(result.changeLog);
    onSkillUpdated(result.updatedSkill);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 pb-16">
      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <RefreshCcw className="h-3.5 w-3.5" />
          Optional — keeps it current
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              New company update
            </label>
            <textarea
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="e.g. Refunds above $200 require manager approval instead of $100."
              className="min-h-[100px] flex-1 resize-none rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm leading-relaxed text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-brand-500"
            />
            <button
              onClick={handleUpdate}
              disabled={!updateText.trim()}
              className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Update Skill
            </button>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Change Log
            </label>
            <div className="min-h-[100px] flex-1 rounded-lg border border-white/10 bg-[#0b0d12] p-3">
              {changeLog.length ? (
                <ul className="space-y-1.5">
                  {changeLog.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs leading-relaxed text-slate-400"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600">
                  Describe a change and click Update Skill to see the change log here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
