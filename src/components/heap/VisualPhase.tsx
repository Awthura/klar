"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { heapTrace, heapInitialArray } from "@/lib/traces/heap";

const NODE_R = 22;
const CELL_W = 48;
const CELL_H = 40;
const GAP = 4;

function getTreePositions(n: number) {
  const positions: { x: number; y: number }[] = [];
  const levels = Math.ceil(Math.log2(n + 1));
  const width = 400;

  for (let i = 0; i < n; i++) {
    const level = Math.floor(Math.log2(i + 1));
    const posInLevel = i - (Math.pow(2, level) - 1);
    const nodesInLevel = Math.pow(2, level);
    const spacing = width / (nodesInLevel + 1);
    positions.push({
      x: spacing * (posInLevel + 1),
      y: 40 + level * 70,
    });
  }
  return positions;
}

export default function HeapVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = heapTrace;
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

  const positions = getTreePositions(current.array.length);
  const treeHeight = positions.length > 0
    ? Math.max(...positions.map((p) => p.y)) + 60
    : 100;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Building a min-heap from [${heapInitialArray.join(", ")}] then extracting min`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        {/* Tree view */}
        <div className="flex justify-center">
          <svg width={420} height={treeHeight} className="overflow-visible">
            {current.array.map((_, i) => {
              if (i === 0) return null;
              const parentIdx = Math.floor((i - 1) / 2);
              if (parentIdx >= current.array.length) return null;
              const p = positions[parentIdx];
              const c = positions[i];
              if (!p || !c) return null;

              return (
                <line
                  key={`edge-${parentIdx}-${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={c.x}
                  y2={c.y}
                  stroke="#4b5563"
                  strokeWidth={1.5}
                />
              );
            })}

            {current.array.map((val, i) => {
              const pos = positions[i];
              if (!pos) return null;
              const isHighlight = current.highlightIndices.includes(i);
              const isSwap =
                current.swapping &&
                (current.swapping[0] === i || current.swapping[1] === i);

              return (
                <g key={i}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R}
                    fill={
                      isSwap
                        ? "#f59e0b30"
                        : isHighlight
                        ? "#818cf830"
                        : "#1a1a1a"
                    }
                    stroke={
                      isSwap ? "#f59e0b" : isHighlight ? "#818cf8" : "#444"
                    }
                    strokeWidth={isSwap ? 2.5 : isHighlight ? 2 : 1.5}
                    animate={{
                      fill: isSwap
                        ? "#f59e0b30"
                        : isHighlight
                        ? "#818cf830"
                        : "#1a1a1a",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold font-mono"
                    fill="#e5e7eb"
                  >
                    {val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Array view */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Array Representation
          </p>
          <div className="flex justify-center">
            <svg
              width={current.array.length * (CELL_W + GAP) + 20}
              height={70}
              className="overflow-visible"
            >
              {current.array.map((val, i) => {
                const x = 10 + i * (CELL_W + GAP);
                const isHighlight = current.highlightIndices.includes(i);
                const isSwap =
                  current.swapping &&
                  (current.swapping[0] === i || current.swapping[1] === i);

                return (
                  <g key={i}>
                    <motion.rect
                      x={x}
                      y={10}
                      width={CELL_W}
                      height={CELL_H}
                      rx={6}
                      fill={
                        isSwap
                          ? "#f59e0b30"
                          : isHighlight
                          ? "#818cf830"
                          : "#1a1a1a"
                      }
                      stroke={
                        isSwap
                          ? "#f59e0b"
                          : isHighlight
                          ? "#818cf8"
                          : "#333"
                      }
                      strokeWidth={isSwap ? 2 : 1}
                    />
                    <text
                      x={x + CELL_W / 2}
                      y={10 + CELL_H / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-mono font-medium"
                      fill="#e5e7eb"
                    >
                      {val}
                    </text>
                    <text
                      x={x + CELL_W / 2}
                      y={60}
                      textAnchor="middle"
                      className="text-[10px] font-mono"
                      fill="#6b7280"
                    >
                      {i}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <div className="inline-block rounded-lg bg-accent-light/30 px-4 py-2">
            <MathBlock tex={current.mathConcept} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="inline-block w-3 h-3 rounded bg-[#f59e0b]" />
            {current.phase === "build" ? "Building" : "Extracting"}
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
