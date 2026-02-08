"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { dpTrace, dpTarget } from "@/lib/traces/dp";

const CELL_W = 52;
const CELL_H = 48;
const GAP = 4;

export default function DpVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = dpTrace;
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
        subtitle={`Computing Fibonacci(${dpTarget}) with bottom-up DP`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center overflow-x-auto">
          <svg
            width={current.table.length * (CELL_W + GAP) + 20}
            height={140}
            className="overflow-visible"
          >
            {current.table.map((val, i) => {
              const x = 10 + i * (CELL_W + GAP);
              const isCurrent = i === current.currentIndex;
              const isDep =
                current.dependencies &&
                (current.dependencies[0] === i ||
                  current.dependencies[1] === i);
              const isFilled = val !== null;

              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={40}
                    width={CELL_W}
                    height={CELL_H}
                    rx={6}
                    fill={
                      isCurrent
                        ? "#22c55e30"
                        : isDep
                        ? "#f59e0b30"
                        : isFilled
                        ? "#2d2d3f"
                        : "#1a1a1a"
                    }
                    stroke={
                      isCurrent
                        ? "#22c55e"
                        : isDep
                        ? "#f59e0b"
                        : isFilled
                        ? "#4b5563"
                        : "#2a2a2a"
                    }
                    strokeWidth={isCurrent || isDep ? 2 : 1}
                    animate={{
                      fill: isCurrent
                        ? "#22c55e30"
                        : isDep
                        ? "#f59e0b30"
                        : isFilled
                        ? "#2d2d3f"
                        : "#1a1a1a",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={x + CELL_W / 2}
                    y={40 + CELL_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-mono font-medium"
                    fill={
                      isCurrent
                        ? "#4ade80"
                        : val !== null
                        ? "#e5e7eb"
                        : "#444"
                    }
                  >
                    {val !== null ? val : "—"}
                  </text>
                  <text
                    x={x + CELL_W / 2}
                    y={30}
                    textAnchor="middle"
                    className="text-[10px] font-mono"
                    fill="#6b7280"
                  >
                    dp[{i}]
                  </text>

                  {isCurrent && (
                    <motion.text
                      x={x + CELL_W / 2}
                      y={108}
                      textAnchor="middle"
                      className="text-xs font-bold"
                      fill="#22c55e"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      computing
                    </motion.text>
                  )}
                  {isDep && !isCurrent && (
                    <text
                      x={x + CELL_W / 2}
                      y={108}
                      textAnchor="middle"
                      className="text-[10px]"
                      fill="#f59e0b"
                    >
                      dependency
                    </text>
                  )}
                </g>
              );
            })}

            {current.dependencies &&
              current.currentIndex !== null &&
              current.dependencies.map((depIdx, di) => {
                const fromX = 10 + depIdx * (CELL_W + GAP) + CELL_W / 2;
                const toX =
                  10 + current.currentIndex! * (CELL_W + GAP) + CELL_W / 2;

                return (
                  <motion.path
                    key={`arrow-${di}`}
                    d={`M ${fromX} ${40} C ${fromX} ${20}, ${toX} ${20}, ${toX} ${40}`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    strokeDasharray="4,2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
          </svg>
        </div>

        <div className="flex justify-center gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded border-2 border-green-500 bg-green-500/20" />
            <span className="text-muted">Computing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded border-2 border-amber-500 bg-amber-500/20" />
            <span className="text-muted">Dependency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded border border-gray-600 bg-[#2d2d3f]" />
            <span className="text-muted">Computed</span>
          </div>
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
