"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import {
  dijkstraTrace,
  dijkstraNodes,
  dijkstraEdges,
} from "@/lib/traces/dijkstra";

const NODE_R = 24;

export default function DijkstraVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = dijkstraTrace;
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

  const getNodePos = (id: string) => dijkstraNodes.find((n) => n.id === id)!;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Dijkstra's algorithm from source A — greedy relaxation with a priority queue"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg width={420} height={340} className="overflow-visible">
            {dijkstraEdges.map((edge) => {
              const s = getNodePos(edge.source);
              const t = getNodePos(edge.target);
              const isRelaxed =
                current.relaxedEdge &&
                current.relaxedEdge[0] === edge.source &&
                current.relaxedEdge[1] === edge.target;
              const sourceVisited = current.visited.includes(edge.source);
              const targetVisited = current.visited.includes(edge.target);
              const bothVisited = sourceVisited && targetVisited;

              const mx = (s.x + t.x) / 2;
              const my = (s.y + t.y) / 2;
              const dx = t.x - s.x;
              const dy = t.y - s.y;
              const len = Math.sqrt(dx * dx + dy * dy);
              const nx = -dy / len;
              const ny = dx / len;
              const labelX = mx + nx * 12;
              const labelY = my + ny * 12;

              return (
                <g key={`${edge.source}-${edge.target}`}>
                  <motion.line
                    x1={s.x}
                    y1={s.y}
                    x2={t.x}
                    y2={t.y}
                    stroke={
                      isRelaxed ? "#22c55e" : bothVisited ? "#818cf8" : "#333"
                    }
                    strokeWidth={isRelaxed ? 3 : bothVisited ? 2 : 1.5}
                    animate={{
                      stroke: isRelaxed
                        ? "#22c55e"
                        : bothVisited
                        ? "#818cf8"
                        : "#333",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[11px] font-mono font-medium"
                    fill={isRelaxed ? "#4ade80" : "#6b7280"}
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {dijkstraNodes.map((node) => {
              const isVisited = current.visited.includes(node.id);
              const isCurrent = current.current === node.id;
              const dist = current.distances[node.id];

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={
                      isCurrent
                        ? "#f59e0b30"
                        : isVisited
                        ? "#6366f130"
                        : "#1a1a1a"
                    }
                    stroke={
                      isCurrent ? "#f59e0b" : isVisited ? "#6366f1" : "#444"
                    }
                    strokeWidth={isCurrent ? 3 : 1.5}
                    animate={{
                      fill: isCurrent
                        ? "#f59e0b30"
                        : isVisited
                        ? "#6366f130"
                        : "#1a1a1a",
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
                  <text
                    x={node.x}
                    y={node.y + NODE_R + 14}
                    textAnchor="middle"
                    className="text-[10px] font-mono"
                    fill={isVisited ? "#818cf8" : "#6b7280"}
                  >
                    {dist === null ? "∞" : `d=${dist}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Priority Queue (min-heap)
          </p>
          <div className="flex items-center gap-1 min-h-[44px] flex-wrap">
            {current.pq.length === 0 ? (
              <span className="text-xs text-muted italic">empty</span>
            ) : (
              current.pq.map(([d, id], i) => (
                <motion.div
                  key={`${id}-${d}-${i}`}
                  className="rounded-lg border border-card-border px-3 py-1.5 text-sm font-mono"
                  style={{ color: "#e5e7eb" }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  ({d},{id})
                </motion.div>
              ))
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
