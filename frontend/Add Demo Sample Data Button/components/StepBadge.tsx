"use client";

interface StepBadgeProps {
  number: number;
  label: string;
}

export default function StepBadge({ number, label }: StepBadgeProps) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-300">
        {label}
      </span>
    </div>
  );
}
