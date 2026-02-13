"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { unionFindTrace, unionFindElements } from "@/lib/traces/unionFind";

const NODE_R = 22;
const LEVEL_HEIGHT = 70;

export default function UnionFindVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = unionFindTrace;
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

  // Build tree structure from parent array
  const parent = current.parent;
  const roots = unionFindElements.filter((e) => parent[e] === e);
  const children: Record<number, number[]> = {};
  unionFindElements.forEach((e) => {
    if (parent[e] !== e) {
      if (!children[parent[e]]) children[parent[e]] = [];
      children[parent[e]].push(e);
    }
  });

  // Layout trees side by side
  function getTreeNodes(root: number): { id: number; x: number; y: number; parentId: number | null }[] {
    const nodes: { id: number; x: number; y: number; parentId: number | null }[] = [];
    function layout(node: number, x: number, y: number, parentId: number | null, spread: number) {
      nodes.push({ id: node, x, y, parentId });
      const kids = children[node] || [];
      const startX = x - ((kids.length - 1) * spread) / 2;
      kids.forEach((kid, i) => {
        layout(kid, startX + i * spread, y + LEVEL_HEIGHT, node, spread * 0.6);
      });
    }
    layout(root, 0, 40, null, 70);
    return nodes;
  }

  let offsetX = 60;
  const allNodes: { id: number; x: number; y: number; parentId: number | null }[] = [];
  roots.forEach((root) => {
    const treeNodes = getTreeNodes(root);
    const minX = Math.min(...treeNodes.map((n) => n.x));
    const maxX = Math.max(...treeNodes.map((n) => n.x));
    const width = maxX - minX;
    treeNodes.forEach((n) => {
      allNodes.push({ ...n, x: n.x - minX + offsetX });
    });
    offsetX += width + 100;
  });

  const svgWidth = Math.max(offsetX + 40, 400);

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Union by rank and path compression on 6 elements"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center overflow-x-auto">
          <svg width={svgWidth} height={250} className="overflow-visible">
            {/* Edges */}
            {allNodes.map((node) => {
              if (node.parentId === null) return null;
              const parentNode = allNodes.find((n) => n.id === node.parentId);
              if (!parentNode) return null;
              return (
                <line
                  key={`edge-${node.id}`}
                  x1={node.x}
                  y1={node.y - NODE_R}
                  x2={parentNode.x}
                  y2={parentNode.y + NODE_R}
                  stroke="#4b5563"
                  strokeWidth={1.5}
                />
              );
            })}

            {/* Nodes */}
            {allNodes.map((node) => {
              const isHighlighted = current.highlighted.includes(node.id);
              const isRoot = parent[node.id] === node.id;

              let fill = "#1a1a2e";
              if (isHighlighted && isRoot) fill = "#818cf8";
              else if (isHighlighted) fill = "#3b82f6";

              let stroke = "#4b5563";
              if (isHighlighted && isRoot) stroke = "#a5b4fc";
              else if (isHighlighted) stroke = "#60a5fa";
              else if (isRoot) stroke = "#6b7280";

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    animate={{ fill }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold font-mono"
                    fill="#e5e7eb"
                  >
                    {node.id}
                  </text>
                  {isRoot && (
                    <text
                      x={node.x}
                      y={node.y - NODE_R - 8}
                      textAnchor="middle"
                      className="text-[10px] font-mono"
                      fill="#9ca3af"
                    >
                      r={current.rank[node.id]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-center">
          <div className="text-xs font-mono text-muted">
            Operation: <span className="text-accent font-bold">{current.operation}</span>
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
