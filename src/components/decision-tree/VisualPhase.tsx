"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { decisionTreeTrace, dtData, TreeNode } from "@/lib/traces/decisionTree";

const PLOT_W = 460;
const PLOT_H = 300;
const TREE_W = 460;
const TREE_H = 220;
const X_RANGE: [number, number] = [0, 7];
const Y_RANGE: [number, number] = [0, 6];

function TreeVisualization({ tree, activeNodeId }: { tree: TreeNode[]; activeNodeId: number }) {
  const nodePositions: Record<number, { x: number; y: number }> = {};
  const maxDepth = Math.max(...tree.map((n) => n.depth));
  const levelWidths: Record<number, number> = {};

  for (const node of tree) {
    levelWidths[node.depth] = (levelWidths[node.depth] || 0) + 1;
  }

  const levelCounters: Record<number, number> = {};
  for (const node of tree) {
    const depth = node.depth;
    levelCounters[depth] = (levelCounters[depth] || 0) + 1;
    const count = levelWidths[depth];
    const idx = levelCounters[depth];
    nodePositions[node.id] = {
      x: (idx / (count + 1)) * TREE_W,
      y: 30 + (depth / Math.max(maxDepth, 1)) * (TREE_H - 60),
    };
  }

  return (
    <svg width={TREE_W} height={TREE_H} className="overflow-visible">
      {/* Edges */}
      {tree.map((node) => {
        if (node.left !== null) {
          const from = nodePositions[node.id];
          const to = nodePositions[node.left];
          if (from && to) {
            return (
              <line key={`e-${node.id}-${node.left}`} x1={from.x} y1={from.y + 14} x2={to.x} y2={to.y - 14} stroke="#4b5563" strokeWidth={1.5} />
            );
          }
        }
        return null;
      })}
      {tree.map((node) => {
        if (node.right !== null) {
          const from = nodePositions[node.id];
          const to = nodePositions[node.right];
          if (from && to) {
            return (
              <line key={`e-${node.id}-${node.right}`} x1={from.x} y1={from.y + 14} x2={to.x} y2={to.y - 14} stroke="#4b5563" strokeWidth={1.5} />
            );
          }
        }
        return null;
      })}

      {/* Nodes */}
      {tree.map((node) => {
        const pos = nodePositions[node.id];
        if (!pos) return null;
        const isActive = node.id === activeNodeId;
        const isLeaf = node.feature === null;
        const fillColor = isActive
          ? "#818cf8"
          : isLeaf
          ? node.label === 0
            ? DEFAULT_COLORS[0]
            : DEFAULT_COLORS[1]
          : "#2d2d3f";
        const strokeColor = isActive ? "#a5b4fc" : "#4b5563";

        return (
          <g key={`n-${node.id}`}>
            <motion.rect
              x={pos.x - 40}
              y={pos.y - 14}
              width={80}
              height={28}
              rx={6}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={isActive ? 2 : 1}
              animate={{ fill: fillColor }}
              transition={{ duration: 0.3 }}
            />
            <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="text-[10px] font-mono" fill="#e5e7eb">
              {isLeaf
                ? `class ${node.label}`
                : `${node.feature} <= ${node.threshold}`}
            </text>
            <text x={pos.x} y={pos.y + 24} textAnchor="middle" className="text-[8px]" fill="#6b7280">
              n={node.samples}, H={node.entropy}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function DecisionTreeVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = decisionTreeTrace;
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

  const points = dtData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch the tree grow and partition feature space"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        {/* Tree visualization */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Decision Tree</h4>
          <div className="flex justify-center">
            <TreeVisualization tree={current.tree} activeNodeId={current.nodeId} />
          </div>
        </div>

        {/* Feature space with partition lines */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Feature Space Partitions</h4>
          <div className="flex justify-center">
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx: ScaleFn, sy: ScaleFn) => (
                <>
                  {/* Partition lines */}
                  {current.splitLines.map((split, i) => {
                    if (split.feature === "x1") {
                      return (
                        <motion.line
                          key={`split-${i}`}
                          x1={sx(split.threshold)}
                          y1={sy(Y_RANGE[0])}
                          x2={sx(split.threshold)}
                          y2={sy(Y_RANGE[1])}
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="6,3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                        />
                      );
                    } else {
                      const firstSplit = current.splitLines[0];
                      return (
                        <motion.line
                          key={`split-${i}`}
                          x1={sx(X_RANGE[0])}
                          y1={sy(split.threshold)}
                          x2={sx(firstSplit?.threshold ?? X_RANGE[1])}
                          y2={sy(split.threshold)}
                          stroke="#22c55e"
                          strokeWidth={2}
                          strokeDasharray="6,3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.8 }}
                        />
                      );
                    }
                  })}
                </>
              )}
            </ScatterPlot>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[0] }} />
            Class 0
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[1] }} />
            Class 1
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
