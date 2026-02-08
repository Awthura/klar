"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { mergeSortTrace, mergeSortArray } from "@/lib/traces/mergeSort";

const CELL_W = 48;
const CELL_H = 40;
const GAP = 4;

const depthColors = [
  "#6366f1", // depth 0 - indigo
  "#8b5cf6", // depth 1 - violet
  "#06b6d4", // depth 2 - cyan
  "#10b981", // depth 3 - emerald
];

export default function MergeSortVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = mergeSortTrace;
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

  const totalWidth = mergeSortArray.length * (CELL_W + GAP) + 40;
  const rowHeight = CELL_H + 24;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Sorting [${mergeSortArray.join(", ")}] via recursive splitting and merging`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center overflow-x-auto">
          <svg
            width={totalWidth}
            height={current.arrays.length * rowHeight + 40}
            className="overflow-visible"
          >
            {current.arrays.map((arr, rowIdx) => {
              const rowY = 20 + rowIdx * rowHeight;
              const totalArrWidth = arr.length * (CELL_W + GAP) - GAP;
              const startX = (totalWidth - totalArrWidth) / 2;
              const color = depthColors[Math.min(current.depth, depthColors.length - 1)];

              return (
                <g key={`${rowIdx}-${arr.join(",")}`}>
                  {arr.map((val, cellIdx) => {
                    const x = startX + cellIdx * (CELL_W + GAP);
                    return (
                      <g key={cellIdx}>
                        <motion.rect
                          x={x}
                          y={rowY}
                          width={CELL_W}
                          height={CELL_H}
                          rx={6}
                          fill={`${color}20`}
                          stroke={color}
                          strokeWidth={1.5}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: cellIdx * 0.05 }}
                        />
                        <motion.text
                          x={x + CELL_W / 2}
                          y={rowY + CELL_H / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-mono font-medium"
                          fill="#e5e7eb"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: cellIdx * 0.05 }}
                        >
                          {val}
                        </motion.text>
                      </g>
                    );
                  })}

                  {current.arrays.length > 1 && (
                    <text
                      x={startX - 16}
                      y={rowY + CELL_H / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] font-mono"
                      fill="#6b7280"
                    >
                      {rowIdx + 1}
                    </text>
                  )}
                </g>
              );
            })}

            {current.type === "merge" && (
              <motion.text
                x={totalWidth / 2}
                y={current.arrays.length * rowHeight + 30}
                textAnchor="middle"
                className="text-xs font-medium"
                fill="#10b981"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                merging...
              </motion.text>
            )}
            {current.type === "split" && current.arrays.length > 1 && (
              <motion.text
                x={totalWidth / 2}
                y={current.arrays.length * rowHeight + 30}
                textAnchor="middle"
                className="text-xs font-medium"
                fill="#8b5cf6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                splitting...
              </motion.text>
            )}
          </svg>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <div className="inline-block rounded-lg bg-accent-light/30 px-4 py-2">
            <MathBlock tex={current.mathConcept} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ backgroundColor: depthColors[Math.min(current.depth, depthColors.length - 1)] }}
            />
            Depth {current.depth}
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
