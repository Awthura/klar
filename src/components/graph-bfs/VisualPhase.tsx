"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import {
  graphBfsTrace,
  graphNodes,
  graphEdges,
} from "@/lib/traces/graphBfs";

const NODE_R = 24;

const distanceColors = [
  "#6366f1", // dist 0
  "#8b5cf6", // dist 1
  "#06b6d4", // dist 2
  "#10b981", // dist 3
];

export default function GraphBfsVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = graphBfsTrace;
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

  const getNodePos = (id: string) => graphNodes.find((n) => n.id === id)!;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="BFS traversal from node A — watch the queue and distance layers"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg width={400} height={440} className="overflow-visible">
            {/* Edges */}
            {graphEdges.map((edge) => {
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

            {/* Nodes */}
            {graphNodes.map((node) => {
              const isVisited = current.visited.includes(node.id);
              const isCurrent = current.current === node.id;
              const isDiscovered = current.discoveredThisStep.includes(node.id);
              const dist = current.distances[node.id];
              const color =
                dist !== undefined
                  ? distanceColors[Math.min(dist, distanceColors.length - 1)]
                  : "#333";

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={isVisited ? `${color}30` : "#1a1a1a"}
                    stroke={isVisited ? color : "#444"}
                    strokeWidth={isCurrent ? 3 : isDiscovered ? 2.5 : 1.5}
                    animate={{
                      fill: isVisited ? `${color}30` : "#1a1a1a",
                      stroke: isVisited ? color : "#444",
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
                  {dist !== undefined && (
                    <text
                      x={node.x}
                      y={node.y + NODE_R + 14}
                      textAnchor="middle"
                      className="text-[10px] font-mono"
                      fill={color}
                    >
                      d={dist}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Queue visualization */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Queue (FIFO)
          </p>
          <div className="flex items-center gap-1 min-h-[44px]">
            {current.queue.length === 0 ? (
              <span className="text-xs text-muted italic">empty</span>
            ) : (
              <>
                <span className="text-xs text-muted mr-1">front</span>
                {current.queue.map((id, i) => {
                  const dist = current.distances[id];
                  const color =
                    dist !== undefined
                      ? distanceColors[Math.min(dist, distanceColors.length - 1)]
                      : "#555";
                  return (
                    <motion.div
                      key={`${id}-${i}`}
                      className="rounded-lg border px-3 py-1.5 text-sm font-mono font-medium"
                      style={{
                        borderColor: color,
                        backgroundColor: `${color}20`,
                        color: "#e5e7eb",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      {id}
                    </motion.div>
                  );
                })}
                <span className="text-xs text-muted ml-1">back</span>
              </>
            )}
          </div>
        </div>

        {/* Distance layer legend */}
        <div className="flex gap-4 flex-wrap text-xs">
          {distanceColors.map((color, d) => (
            <div key={d} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted">Layer {d} (d={d})</span>
            </div>
          ))}
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
