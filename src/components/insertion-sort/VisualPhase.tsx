"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { insertionSortTrace, insertionSortArray } from "@/lib/traces/insertionSort";

const CELL_WIDTH = 64;
const CELL_HEIGHT = 48;
const GAP = 4;

export default function InsertionSortVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = insertionSortTrace;
  const current = trace[step];

  const handleStepChange = useCallback(
    (s: number) => {
      if (s === -1) {
        setStep((prev) => Math.min(prev + 1, trace.length - 1));
      } else {
        setStep(s);
      }
    },
    [trace.length]
  );

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Sorting [${insertionSortArray.join(", ")}] by inserting each element into the sorted prefix`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg
            width={current.array.length * (CELL_WIDTH + GAP) + 20}
            height={160}
            className="overflow-visible"
          >
            {current.array.map((val, i) => {
              const x = 10 + i * (CELL_WIDTH + GAP);
              const isSorted = i < current.sortedBoundary;
              const isCurrent = i === current.currentIndex;
              const isComparing = i === current.comparingIndex;
              const isFullySorted = current.sortedBoundary === current.array.length;

              let fill = "#1a1a2e";
              if (isFullySorted) fill = "#22c55e";
              else if (isCurrent) fill = "#818cf8";
              else if (isComparing) fill = "#f59e0b";
              else if (isSorted) fill = "#2d3a2d";

              let stroke = "#2a2a3a";
              if (isFullySorted) stroke = "#4ade80";
              else if (isCurrent) stroke = "#a5b4fc";
              else if (isComparing) stroke = "#fbbf24";
              else if (isSorted) stroke = "#4ade80";

              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={40}
                    width={CELL_WIDTH}
                    height={CELL_HEIGHT}
                    rx={6}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent || isComparing || isFullySorted ? 2 : 1}
                    animate={{ fill }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={x + CELL_WIDTH / 2}
                    y={40 + CELL_HEIGHT / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-mono font-medium"
                    fill="#e5e7eb"
                  >
                    {val}
                  </text>
                  <text
                    x={x + CELL_WIDTH / 2}
                    y={32}
                    textAnchor="middle"
                    className="text-[10px] font-mono"
                    fill="#6b7280"
                  >
                    {i}
                  </text>

                  {/* Sorted boundary marker */}
                  {i === current.sortedBoundary - 1 && !isFullySorted && (
                    <line
                      x1={x + CELL_WIDTH + GAP / 2}
                      y1={35}
                      x2={x + CELL_WIDTH + GAP / 2}
                      y2={95}
                      stroke="#4ade80"
                      strokeWidth={2}
                      strokeDasharray="4,3"
                    />
                  )}

                  {/* Current element pointer */}
                  {isCurrent && !isFullySorted && (
                    <g>
                      <text
                        x={x + CELL_WIDTH / 2}
                        y={115}
                        textAnchor="middle"
                        className="text-xs font-bold"
                        fill="#818cf8"
                      >
                        key
                      </text>
                      <line
                        x1={x + CELL_WIDTH / 2}
                        y1={96}
                        x2={x + CELL_WIDTH / 2}
                        y2={106}
                        stroke="#818cf8"
                        strokeWidth={2}
                      />
                      <polygon
                        points={`${x + CELL_WIDTH / 2 - 4},${106} ${x + CELL_WIDTH / 2 + 4},${106} ${x + CELL_WIDTH / 2},${96}`}
                        fill="#818cf8"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded border-2 border-[#4ade80] bg-[#2d3a2d]" /> Sorted
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#818cf8]" /> Key
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#f59e0b]" /> Comparing
          </span>
        </div>

        <div className="flex justify-center">
          <div className="inline-block rounded-lg bg-accent-light/30 px-4 py-2">
            <MathBlock tex={current.mathConcept} />
          </div>
        </div>

        <StepControls
          currentStep={step}
          totalSteps={trace.length}
          onStepChange={handleStepChange}
          description={current.description}
        />
      </div>
    </section>
  );
}
