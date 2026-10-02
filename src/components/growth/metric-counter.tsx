"use client";

import { CountUp } from "../site/reveal";

/**
 * A large figure, for use inside a <dl>, that counts up when first seen ("1 240", "$4.80", "38%", "×3,4"), with its label.
 * The real value stays in the HTML for screen readers and crawlers.
 */
export function MetricCounter({ value, label, className = "", valueClassName = "text-(--accent)" }: { value: string; label: string | null; className?: string; valueClassName?: string }) {
  return (
    // Inside a <dl>: the label is the term, the figure its description; the figure is shown first.
    <div className={`flex flex-col-reverse ${className}`}>
      {label && <dt className="mt-3 text-sm text-white/55">{label}</dt>}
      <dd className={`font-serif text-6xl leading-none tracking-[-0.02em] md:text-7xl ${valueClassName}`}>
        <CountUp value={value} />
      </dd>
    </div>
  );
}
