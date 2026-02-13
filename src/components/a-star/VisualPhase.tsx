"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { aStarTrace, aStarGrid } from "@/lib/traces/aStar";

const CELL = 56;
const GAP = 3;
const ROWS = 5;
const COLS = 5;

export default function AStarVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = aStarTrace;
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
        subtitle="A* pathfinding on a 5×5 grid with obstacles"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg
            width={COLS * (CELL + GAP) + 20}
            height={ROWS * (CELL + GAP) + 20}
            className="overflow-visible"
          >
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: COLS }).map((_, c) => {
                const nodeId = r * 5 + c;
                const x = 10 + c * (CELL + GAP);
                const y = 10 + r * (CELL + GAP);
                const isObstacle = aStarGrid[r][c] === 1;
                const isInOpen = current.openSet.includes(nodeId);
                const isInClosed = current.closedSet.includes(nodeId);
                const isCurrent = current.current === nodeId;
                const isOnPath = current.path.includes(nodeId);
                const isStart = nodeId === 0;
                const isGoal = nodeId === 24;

                let fill = "#1a1a2e";
                if (isObstacle) fill = "#374151";
                else if (isOnPath) fill = "#22c55e";
                else if (isCurrent) fill = "#818cf8";
                else if (isInOpen) fill = "#3b82f6";
                else if (isInClosed) fill = "#1e3a5f";

                let stroke = "#2a2a3a";
                if (isOnPath) stroke = "#4ade80";
                else if (isCurrent) stroke = "#a5b4fc";
                else if (isInOpen) stroke = "#60a5fa";
                else if (isStart || isGoal) stroke = "#f59e0b";

                return (
                  <g key={nodeId}>
                    <motion.rect
                      x={x}
                      y={y}
                      width={CELL}
                      height={CELL}
                      rx={6}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isStart || isGoal || isOnPath ? 2 : 1}
                      animate={{ fill }}
                      transition={{ duration: 0.3 }}
                    />
                    {isObstacle ? (
                      <text
                        x={x + CELL / 2}
                        y={y + CELL / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-lg"
                        fill="#6b7280"
                      >
                        ×
                      </text>
                    ) : (
                      <>
                        <text
                          x={x + CELL / 2}
                          y={y + CELL / 2 - 6}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-[9px] font-mono"
                          fill={isOnPath || isCurrent ? "#fff" : "#9ca3af"}
                        >
                          {isStart ? "S" : isGoal ? "G" : `${r},${c}`}
                        </text>
                        {current.fScore[nodeId] !== undefined && (
                          <text
                            x={x + CELL / 2}
                            y={y + CELL / 2 + 10}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[9px] font-mono font-bold"
                            fill={isOnPath || isCurrent ? "#fff" : "#d1d5db"}
                          >
                            f={current.fScore[nodeId]}
                          </text>
                        )}
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </div>

        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#3b82f6]" /> Open
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#1e3a5f]" /> Closed
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#818cf8]" /> Current
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#22c55e]" /> Path
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-[#374151]" /> Wall
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
