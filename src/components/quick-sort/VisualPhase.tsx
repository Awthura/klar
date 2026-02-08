"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { quickSortTrace, quickSortArray } from "@/lib/traces/quickSort";

const CELL_W = 64;
const CELL_H = 48;
const GAP = 4;

export default function QuickSortVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = quickSortTrace;
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
        subtitle={`Sorting [${quickSortArray.join(", ")}] via pivot partitioning`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg
            width={current.array.length * (CELL_W + GAP) + 20}
            height={160}
            className="overflow-visible"
          >
            {current.array.map((val, i) => {
              const x = 10 + i * (CELL_W + GAP);
              const isSorted = current.sorted.includes(i);
              const isPivot = i === current.pivotIndex;
              const inRange =
                current.activeRange &&
                i >= current.activeRange[0] &&
                i <= current.activeRange[1];

              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={40}
                    width={CELL_W}
                    height={CELL_H}
                    rx={6}
                    fill={
                      isSorted
                        ? "#22c55e20"
                        : isPivot
                        ? "#f59e0b"
                        : inRange
                        ? "#2d2d3f"
                        : "#1a1a1a"
                    }
                    stroke={
                      isSorted
                        ? "#4ade80"
                        : isPivot
                        ? "#fbbf24"
                        : inRange
                        ? "#4b5563"
                        : "#2a2a2a"
                    }
                    strokeWidth={isPivot ? 2 : 1}
                    animate={{
                      fill: isSorted
                        ? "#22c55e20"
                        : isPivot
                        ? "#f59e0b"
                        : inRange
                        ? "#2d2d3f"
                        : "#1a1a1a",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.text
                    x={x + CELL_W / 2}
                    y={40 + CELL_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-mono font-medium"
                    fill={isPivot ? "#1a1a1a" : isSorted ? "#4ade80" : "#e5e7eb"}
                  >
                    {val}
                  </motion.text>
                  <text
                    x={x + CELL_W / 2}
                    y={32}
                    textAnchor="middle"
                    className="text-[10px] font-mono"
                    fill="#6b7280"
                  >
                    {i}
                  </text>

                  {isPivot && (
                    <motion.text
                      x={x + CELL_W / 2}
                      y={112}
                      textAnchor="middle"
                      className="text-xs font-bold"
                      fill="#f59e0b"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      pivot
                    </motion.text>
                  )}

                  {isSorted && !isPivot && (
                    <text
                      x={x + CELL_W / 2}
                      y={112}
                      textAnchor="middle"
                      className="text-[10px]"
                      fill="#4ade80"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}

            {current.activeRange && (
              <>
                <line
                  x1={10 + current.activeRange[0] * (CELL_W + GAP)}
                  y1={130}
                  x2={
                    10 +
                    current.activeRange[1] * (CELL_W + GAP) +
                    CELL_W
                  }
                  y2={130}
                  stroke="#818cf8"
                  strokeWidth={2}
                  strokeDasharray="4,2"
                />
                <text
                  x={
                    10 +
                    ((current.activeRange[0] + current.activeRange[1]) / 2) *
                      (CELL_W + GAP) +
                    CELL_W / 2
                  }
                  y={146}
                  textAnchor="middle"
                  className="text-[10px] font-mono"
                  fill="#818cf8"
                >
                  active range
                </text>
              </>
            )}
          </svg>
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
