"use client";

import { useState } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";
import CodeBlock from "@/components/shared/CodeBlock";
import { mergeSortCode, mergeSortBridge } from "@/lib/traces/mergeSort";

export default function MergeSortCodePhase() {
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [highlightedMathIdx, setHighlightedMathIdx] = useState<number | null>(null);

  const highlightLines = highlightedLine
    ? [highlightedLine]
    : highlightedMathIdx !== null
    ? [mergeSortBridge[highlightedMathIdx].codeLine]
    : [];

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={3}
        title="The Code"
        subtitle="Mapping divide-and-conquer to recursive Python"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              Mathematical Formulation
            </h3>
            <div className="space-y-2">
              {mergeSortBridge.map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 cursor-pointer transition-colors ${
                    highlightedMathIdx === idx || highlightedLine === item.codeLine
                      ? "border-accent bg-accent-light/30"
                      : "border-card-border hover:border-accent/50"
                  }`}
                  onMouseEnter={() => setHighlightedMathIdx(idx)}
                  onMouseLeave={() => setHighlightedMathIdx(null)}
                >
                  <MathBlock tex={item.math} />
                  <p className="text-xs text-muted mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
              Python Implementation
            </h3>
            <CodeBlock
              code={mergeSortCode}
              highlightLines={highlightLines}
              onLineHover={(line) => {
                setHighlightedLine(line);
                if (line) {
                  const idx = mergeSortBridge.findIndex((b) => b.codeLine === line);
                  setHighlightedMathIdx(idx >= 0 ? idx : null);
                } else {
                  setHighlightedMathIdx(null);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
