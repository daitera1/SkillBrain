"use client";

import { useState } from "react";
import { Copy, Check, Wand2, FileText, Loader2 } from "lucide-react";
import {
  WorkflowKey,
  workflowOptions,
  sampleKnowledge,
} from "@/lib/mockData";

interface WorkspaceSectionProps {
  workflow: WorkflowKey;
  onWorkflowChange: (value: WorkflowKey) => void;
  knowledgeText: string;
  onKnowledgeChange: (value: string) => void;
  generatedSkill: string;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function WorkspaceSection({
  workflow,
  onWorkflowChange,
  knowledgeText,
  onKnowledgeChange,
  generatedSkill,
  isGenerating,
  onGenerate,
}: WorkspaceSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleLoadSample = () => {
    onKnowledgeChange(sampleKnowledge[workflow]);
  };

  const handleCopy = async () => {
    if (!generatedSkill) return;
    try {
      await navigator.clipboard.writeText(generatedSkill);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — no-op for demo purposes
    }
  };

  return (
    <section id="workspace" className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Build a skill from your company knowledge
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Pick a workflow, paste in what you know, and generate an executable skill file.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Workflow type
          </label>
          <select
            value={workflow}
            onChange={(e) => onWorkflowChange(e.target.value as WorkflowKey)}
            className="mb-5 w-full rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-brand-500"
          >
            {workflowOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Company knowledge
            </label>
            <button
              onClick={handleLoadSample}
              className="text-xs font-medium text-brand-400 transition hover:text-brand-300"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={knowledgeText}
            onChange={(e) => onKnowledgeChange(e.target.value)}
            placeholder="Paste Slack threads, wiki pages, SOPs, or anything describing how this workflow actually gets done…"
            className="min-h-[220px] flex-1 resize-none rounded-lg border border-white/10 bg-[#0b0d12] p-3.5 text-sm leading-relaxed text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-brand-500"
          />

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating skill file…
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Skill File
              </>
            )}
          </button>
        </div>

        {/* Right column */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <FileText className="h-4 w-4" />
              Generated skill file
            </div>
            <button
              onClick={handleCopy}
              disabled={!generatedSkill}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy skill
                </>
              )}
            </button>
          </div>

          <div className="min-h-[300px] flex-1 overflow-auto rounded-lg border border-white/10 bg-[#0b0d12] p-4">
            {generatedSkill ? (
              <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-slate-300">
                {generatedSkill}
              </pre>
            ) : (
              <div className="flex h-full min-h-[260px] items-center justify-center text-center text-sm text-slate-600">
                Your generated skill file will appear here.
                <br />
                Load a sample and click Generate to see it in action.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
