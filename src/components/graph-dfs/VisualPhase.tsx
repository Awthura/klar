"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { graphDfsTrace, dfsNodes, dfsEdges } from "@/lib/traces/graphDfs";

const NODE_R = 24;

const depthColors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function GraphDfsVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = graphDfsTrace;
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

  const getNodePos = (id: string) => dfsNodes.find((n) => n.id === id)!;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="DFS traversal from node A — watch the recursive stack"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg width={400} height={440} className="overflow-visible">
            {dfsEdges.map((edge) => {
              const s = getNodePos(edge.source);
              const t = getNodePos(edge.target);
              const isTraversed = current.edges.some(
                ([a, b]) =>
                  (a === edge.source && b === edge.target) ||
                  (a === edge.target && b === edge.source)
              );

              return (
                <motion.line
                  key={`${edge.source}-${edge.target}`}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={isTraversed ? "#818cf8" : "#333"}
                  strokeWidth={isTraversed ? 2.5 : 1.5}
                  animate={{
                    stroke: isTraversed ? "#818cf8" : "#333",
                    strokeWidth: isTraversed ? 2.5 : 1.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {dfsNodes.map((node) => {
              const isVisited = current.visited.includes(node.id);
              const isCurrent = current.current === node.id;
              const stackIdx = current.stack.indexOf(node.id);
              const color =
                stackIdx >= 0
                  ? depthColors[Math.min(stackIdx, depthColors.length - 1)]
                  : "#333";

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={isVisited ? `${color}30` : "#1a1a1a"}
                    stroke={isCurrent ? "#f59e0b" : isVisited ? color : "#444"}
                    strokeWidth={isCurrent ? 3 : 1.5}
                    animate={{
                      fill: isVisited ? `${color}30` : "#1a1a1a",
                      stroke: isCurrent ? "#f59e0b" : isVisited ? color : "#444",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold"
                    fill={isVisited ? "#e5e7eb" : "#666"}
                  >
                    {node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Call Stack (LIFO)
          </p>
          <div className="flex items-center gap-1 min-h-[44px]">
            {current.stack.length === 0 ? (
              <span className="text-xs text-muted italic">empty</span>
            ) : (
              <>
                <span className="text-xs text-muted mr-1">bottom</span>
                {current.stack.map((id, i) => {
                  const color =
                    depthColors[Math.min(i, depthColors.length - 1)];
                  return (
                    <motion.div
                      key={`${id}-${i}`}
                      className="rounded-lg border px-3 py-1.5 text-sm font-mono font-medium"
                      style={{
                        borderColor: color,
                        backgroundColor: `${color}20`,
                        color: "#e5e7eb",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      {id}
                    </motion.div>
                  );
                })}
                <span className="text-xs text-muted ml-1">top</span>
              </>
            )}
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
