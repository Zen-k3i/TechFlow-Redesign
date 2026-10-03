"use client";

import { m as motion } from "motion/react";

/** Filter button with a count; the active one gets a sliding ink pill (`layoutId`, wrap the row in a `LayoutGroup`). */
export function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full border px-3 py-1.5 text-[13px] transition-colors md:px-4 md:py-2 md:text-sm ${
        active ? "border-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/40"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className="absolute inset-0 -z-0 rounded-full bg-ink"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative">
        {label} <span className="eyebrow ml-1 opacity-60">{count}</span>
      </span>
    </button>
  );
}
