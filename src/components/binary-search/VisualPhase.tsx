"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import {
  binarySearchTrace,
  binarySearchArray,
  binarySearchTarget,
} from "@/lib/traces/binarySearch";

const CELL_WIDTH = 64;
const CELL_HEIGHT = 48;
const GAP = 4;

export default function BinarySearchVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = binarySearchTrace;
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
        subtitle={`Searching for ${binarySearchTarget} in a sorted array`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg
            width={binarySearchArray.length * (CELL_WIDTH + GAP) + 20}
            height={180}
            className="overflow-visible"
          >
            {binarySearchArray.map((val, i) => {
              const x = 10 + i * (CELL_WIDTH + GAP);
              const isEliminated = current.eliminated.includes(i);
              const isMid = i === current.mid;
              const isLo = i === current.lo;
              const isHi = i === current.hi;
              const isInRange =
                i >= current.lo && i <= current.hi && !isEliminated;
              const isFound =
                current.comparison === "equal" && isMid;

              return (
                <g key={i}>
                  <motion.rect
                    x={x}
                    y={40}
                    width={CELL_WIDTH}
                    height={CELL_HEIGHT}
                    rx={6}
                    fill={
                      isFound
                        ? "#22c55e"
                        : isMid
                        ? "#818cf8"
                        : isEliminated
                        ? "#1f1f1f"
                        : isInRange
                        ? "#2d2d3f"
                        : "#1a1a1a"
                    }
                    stroke={
                      isFound
                        ? "#4ade80"
                        : isMid
                        ? "#a5b4fc"
                        : isInRange
                        ? "#4b5563"
                        : "#2a2a2a"
                    }
                    strokeWidth={isMid || isFound ? 2 : 1}
                    animate={{
                      opacity: isEliminated ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.text
                    x={x + CELL_WIDTH / 2}
                    y={40 + CELL_HEIGHT / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-mono font-medium"
                    fill={isEliminated ? "#555" : "#e5e7eb"}
                    animate={{ opacity: isEliminated ? 0.4 : 1 }}
                  >
                    {val}
                  </motion.text>
                  <text
                    x={x + CELL_WIDTH / 2}
                    y={32}
                    textAnchor="middle"
                    className="text-[10px] font-mono"
                    fill="#6b7280"
                  >
                    {i}
                  </text>

                  <AnimatePresence>
                    {isLo && !isEliminated && (
                      <motion.g
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <text
                          x={x + CELL_WIDTH / 2}
                          y={112}
                          textAnchor="middle"
                          className="text-xs font-bold"
                          fill="#f59e0b"
                        >
                          lo
                        </text>
                        <line
                          x1={x + CELL_WIDTH / 2}
                          y1={96}
                          x2={x + CELL_WIDTH / 2}
                          y2={104}
                          stroke="#f59e0b"
                          strokeWidth={2}
                        />
                        <polygon
                          points={`${x + CELL_WIDTH / 2 - 4},${104} ${x + CELL_WIDTH / 2 + 4},${104} ${x + CELL_WIDTH / 2},${96}`}
                          fill="#f59e0b"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isMid && !isEliminated && (
                      <motion.g
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <text
                          x={x + CELL_WIDTH / 2}
                          y={136}
                          textAnchor="middle"
                          className="text-xs font-bold"
                          fill="#818cf8"
                        >
                          mid
                        </text>
                        <line
                          x1={x + CELL_WIDTH / 2}
                          y1={96}
                          x2={x + CELL_WIDTH / 2}
                          y2={126}
                          stroke="#818cf8"
                          strokeWidth={2}
                          strokeDasharray="3,2"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isHi && !isEliminated && (
                      <motion.g
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <text
                          x={x + CELL_WIDTH / 2}
                          y={160}
                          textAnchor="middle"
                          className="text-xs font-bold"
                          fill="#ef4444"
                        >
                          hi
                        </text>
                        <line
                          x1={x + CELL_WIDTH / 2}
                          y1={96}
                          x2={x + CELL_WIDTH / 2}
                          y2={150}
                          stroke="#ef4444"
                          strokeWidth={2}
                          strokeDasharray="3,2"
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
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
