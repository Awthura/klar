"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { bstTrace, bstInsertOrder } from "@/lib/traces/bst";

const NODE_R = 22;

export default function BstVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = bstTrace;
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

  const getNodePos = (key: number) =>
    current.nodes.find((n) => n.key === key);

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Building a BST by inserting [${bstInsertOrder.join(", ")}]`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <svg width={400} height={280} className="overflow-visible">
            {current.edges.map((edge) => {
              const parent = getNodePos(edge.parent);
              const child = getNodePos(edge.child);
              if (!parent || !child) return null;

              return (
                <motion.line
                  key={`${edge.parent}-${edge.child}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={child.x}
                  y2={child.y}
                  stroke="#4b5563"
                  strokeWidth={1.5}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {current.nodes.map((node) => {
              const isOnPath = current.highlightPath.includes(node.key);
              const isNewNode =
                current.insertingKey !== null &&
                node.key === current.insertingKey;
              const isSearchTarget =
                current.insertingKey === null &&
                current.highlightPath.includes(node.key);

              return (
                <g key={node.key}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={NODE_R}
                    fill={
                      isNewNode
                        ? "#22c55e30"
                        : isOnPath
                        ? "#818cf830"
                        : "#1a1a1a"
                    }
                    stroke={
                      isNewNode
                        ? "#22c55e"
                        : isOnPath
                        ? "#818cf8"
                        : "#444"
                    }
                    strokeWidth={isNewNode || isSearchTarget ? 2.5 : 1.5}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold font-mono"
                    fill={isNewNode ? "#4ade80" : "#e5e7eb"}
                  >
                    {node.key}
                  </text>
                </g>
              );
            })}

            {current.nodes.length === 0 && (
              <text
                x={200}
                y={130}
                textAnchor="middle"
                className="text-sm"
                fill="#6b7280"
              >
                empty tree
              </text>
            )}
          </svg>
        </div>

        {current.insertingKey !== null && (
          <div className="flex justify-center">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm">
              Inserting: <span className="font-mono font-bold text-green-400">{current.insertingKey}</span>
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
