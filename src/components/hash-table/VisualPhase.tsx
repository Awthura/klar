"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import { hashTableTrace, hashTableSize } from "@/lib/traces/hashTable";

const BUCKET_W = 48;
const BUCKET_H = 40;
const CHAIN_W = 52;
const CHAIN_H = 36;
const GAP = 8;

export default function HashTableVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = hashTableTrace;
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

  const svgHeight = hashTableSize * (BUCKET_H + GAP) + 40;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Inserting keys with h(k) = k mod 7 — watch for collisions and chaining"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center overflow-x-auto">
          <svg width={400} height={svgHeight} className="overflow-visible">
            {current.buckets.map((chain, bucketIdx) => {
              const y = 20 + bucketIdx * (BUCKET_H + GAP);
              const isTarget = bucketIdx === current.hashValue;

              return (
                <g key={bucketIdx}>
                  <rect
                    x={10}
                    y={y}
                    width={BUCKET_W}
                    height={BUCKET_H}
                    rx={6}
                    fill={isTarget ? "#818cf830" : "#1a1a1a"}
                    stroke={isTarget ? "#818cf8" : "#333"}
                    strokeWidth={isTarget ? 2 : 1}
                  />
                  <text
                    x={10 + BUCKET_W / 2}
                    y={y + BUCKET_H / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-mono font-medium"
                    fill={isTarget ? "#a5b4fc" : "#6b7280"}
                  >
                    [{bucketIdx}]
                  </text>

                  {chain.length === 0 && (
                    <text
                      x={10 + BUCKET_W + 16}
                      y={y + BUCKET_H / 2 + 1}
                      dominantBaseline="middle"
                      className="text-xs font-mono"
                      fill="#444"
                    >
                      ∅
                    </text>
                  )}

                  {chain.map((val, chainIdx) => {
                    const cx = 10 + BUCKET_W + 16 + chainIdx * (CHAIN_W + 8);
                    const isNew =
                      current.insertingKey === val &&
                      chainIdx === chain.length - 1;

                    return (
                      <g key={`${bucketIdx}-${chainIdx}`}>
                        {chainIdx > 0 && (
                          <line
                            x1={cx - 8}
                            y1={y + BUCKET_H / 2}
                            x2={cx}
                            y2={y + BUCKET_H / 2}
                            stroke="#555"
                            strokeWidth={1}
                          />
                        )}
                        {chainIdx === 0 && (
                          <line
                            x1={10 + BUCKET_W}
                            y1={y + BUCKET_H / 2}
                            x2={cx}
                            y2={y + BUCKET_H / 2}
                            stroke="#555"
                            strokeWidth={1}
                          />
                        )}
                        <motion.rect
                          x={cx}
                          y={y + (BUCKET_H - CHAIN_H) / 2}
                          width={CHAIN_W}
                          height={CHAIN_H}
                          rx={6}
                          fill={
                            isNew && current.collision
                              ? "#ef444430"
                              : isNew
                              ? "#22c55e30"
                              : "#2d2d3f"
                          }
                          stroke={
                            isNew && current.collision
                              ? "#ef4444"
                              : isNew
                              ? "#22c55e"
                              : "#4b5563"
                          }
                          strokeWidth={isNew ? 2 : 1}
                          initial={isNew ? { opacity: 0, scale: 0.8 } : {}}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <text
                          x={cx + CHAIN_W / 2}
                          y={y + BUCKET_H / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-mono font-medium"
                          fill="#e5e7eb"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
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
