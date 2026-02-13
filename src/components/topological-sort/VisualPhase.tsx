"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import {
  topologicalSortTrace,
  topoNodes,
  topoEdges,
  topoPositions,
} from "@/lib/traces/topologicalSort";

const NODE_R = 22;

export default function TopologicalSortVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = topologicalSortTrace;
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

  const visited = current.visited;
  const inProgress = current.inProgress;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="DFS-based topological sort on a course-prerequisite DAG"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg width={360} height={290} className="overflow-visible">
            <defs>
              <marker
                id="arrowTopo"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
              </marker>
            </defs>

            {topoEdges.map(([from, to], i) => {
              const p1 = topoPositions[from];
              const p2 = topoPositions[to];
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const x1 = p1.x + (dx / dist) * NODE_R;
              const y1 = p1.y + (dy / dist) * NODE_R;
              const x2 = p2.x - (dx / dist) * NODE_R;
              const y2 = p2.y - (dy / dist) * NODE_R;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#4b5563"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowTopo)"
                />
              );
            })}

            {topoNodes.map((node) => {
              const pos = topoPositions[node];
              const isVisited = visited.includes(node);
              const isInProgress = inProgress.includes(node);
              const isCurrent = current.current === node;
              const stackIdx = current.stack.indexOf(node);

              let fill = "#1a1a2e";
              if (isCurrent) fill = "#818cf8";
              else if (isInProgress) fill = "#f59e0b";
              else if (isVisited) fill = "#22c55e";

              let stroke = "#4b5563";
              if (isCurrent) stroke = "#a5b4fc";
              else if (isInProgress) stroke = "#fbbf24";
              else if (isVisited) stroke = "#4ade80";

              return (
                <g key={node}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    animate={{ fill }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold"
                    fill="#e5e7eb"
                  >
                    {node}
                  </text>
                  {stackIdx >= 0 && (
                    <text
                      x={pos.x}
                      y={pos.y - NODE_R - 8}
                      textAnchor="middle"
                      className="text-[10px] font-mono font-bold"
                      fill="#22c55e"
                    >
                      #{stackIdx + 1}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#818cf8]" /> Current
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#f59e0b]" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#22c55e]" /> Finished
          </span>
        </div>

        {current.stack.length > 0 && (
          <div className="flex justify-center">
            <div className="text-xs text-muted">
              Stack: [{current.stack.join(", ")}]
            </div>
          </div>
        )}

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
