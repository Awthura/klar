"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { trieTrace } from "@/lib/traces/trie";

const NODE_R = 18;
const LEVEL_HEIGHT = 65;

export default function TrieVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = trieTrace;
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

  // Layout trie nodes using a simple tree layout
  const layout = useMemo(() => {
    const nodes = current.nodes;
    const positions: Record<string, { x: number; y: number }> = {};
    let leafCounter = 0;
    const LEAF_GAP = 50;

    // Count leaves under each node
    function countLeaves(nodeId: string): number {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node || node.children.length === 0) return 1;
      return node.children.reduce((sum, cid) => sum + countLeaves(cid), 0);
    }

    function layoutNode(nodeId: string, depth: number) {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      if (node.children.length === 0) {
        positions[nodeId] = { x: 60 + leafCounter * LEAF_GAP, y: 30 + depth * LEVEL_HEIGHT };
        leafCounter++;
      } else {
        node.children.forEach((cid) => layoutNode(cid, depth + 1));
        const childPositions = node.children.map((cid) => positions[cid]);
        const avgX = childPositions.reduce((s, p) => s + p.x, 0) / childPositions.length;
        positions[nodeId] = { x: avgX, y: 30 + depth * LEVEL_HEIGHT };
      }
    }

    layoutNode("root", 0);
    return positions;
  }, [current.nodes]);

  const svgWidth = Math.max(
    ...Object.values(layout).map((p) => p.x),
    300
  ) + 60;
  const svgHeight = Math.max(
    ...Object.values(layout).map((p) => p.y),
    200
  ) + 50;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Building a trie from words: ${trieTrace[trieTrace.length - 1].insertingWord ? "cat, car, card, do, dog" : ""}`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible">
            {/* Edges */}
            {current.edges.map(([parentId, childId, char], i) => {
              const p1 = layout[parentId];
              const p2 = layout[childId];
              if (!p1 || !p2) return null;
              const isHighlighted =
                current.highlightPath.includes(parentId) &&
                current.highlightPath.includes(childId);
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              return (
                <g key={i}>
                  <line
                    x1={p1.x}
                    y1={p1.y + NODE_R}
                    x2={p2.x}
                    y2={p2.y - NODE_R}
                    stroke={isHighlighted ? "#818cf8" : "#4b5563"}
                    strokeWidth={isHighlighted ? 2 : 1}
                  />
                  <text
                    x={mx + 10}
                    y={my}
                    textAnchor="middle"
                    className="text-[11px] font-mono font-bold"
                    fill={isHighlighted ? "#a5b4fc" : "#9ca3af"}
                  >
                    {char}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {current.nodes.map((node) => {
              const pos = layout[node.id];
              if (!pos) return null;
              const isHighlighted = current.highlightPath.includes(node.id);
              const isEnd = node.isEnd;

              let fill = "#1a1a2e";
              if (isHighlighted && isEnd) fill = "#22c55e";
              else if (isHighlighted) fill = "#818cf8";
              else if (isEnd) fill = "#166534";

              let stroke = "#4b5563";
              if (isHighlighted) stroke = "#a5b4fc";
              else if (isEnd) stroke = "#4ade80";

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={NODE_R}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isEnd ? 2.5 : 1.5}
                    animate={{ fill }}
                    transition={{ duration: 0.3 }}
                  />
                  {isEnd && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={NODE_R - 4}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={1}
                    />
                  )}
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[11px] font-mono font-bold"
                    fill="#e5e7eb"
                  >
                    {node.id === "root" ? "ε" : node.char}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#818cf8]" /> Active Path
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#22c55e]" /> End of Word
          </span>
        </div>

        {current.insertingWord && (
          <div className="flex justify-center">
            <div className="text-xs font-mono text-muted">
              Inserting: <span className="text-accent font-bold">&quot;{current.insertingWord}&quot;</span>
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
