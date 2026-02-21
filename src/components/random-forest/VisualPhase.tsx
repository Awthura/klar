"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { randomForestTrace, rfData } from "@/lib/traces/randomForest";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 8];
const Y_RANGE: [number, number] = [0, 8];

export default function RandomForestVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = randomForestTrace;
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

  const { phase, treeIndex, bootstrapIndices, splitFeature, splitThreshold, votes, finalPredictions } = current;

  const showSplit = phase === "train_tree" || phase === "aggregate" || phase === "result";
  const showBootstrap = phase === "bootstrap";
  const showVotes = phase === "aggregate" || phase === "result";

  // Use final predictions to color points when available
  const pointColors = finalPredictions.map((pred, i) =>
    pred !== null
      ? DEFAULT_COLORS[pred % DEFAULT_COLORS.length]
      : DEFAULT_COLORS[rfData[i].label % DEFAULT_COLORS.length]
  );

  const highlightIndices = showBootstrap ? [...new Set(bootstrapIndices)] : [];

  const points = rfData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch trees bootstrap, split, and vote to form the ensemble"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div className="relative">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Data & Decision Boundaries
            </h4>
            {phase === "bootstrap" && (
              <div className="absolute top-7 right-2 z-10 rounded-full bg-white/20 border border-white/40 px-3 py-1 text-xs font-bold text-white">
                Tree {treeIndex + 1}/5
              </div>
            )}
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
              highlightIndices={highlightIndices}
              highlightColor="#ffffff"
              pointColors={pointColors}
            >
              {(sx: ScaleFn, sy: ScaleFn) => {
                const plotW = PLOT_W - PADDING.left - PADDING.right;
                const plotH = PLOT_H - PADDING.top - PADDING.bottom;

                if (!showSplit) return null;

                // Draw stump split line (dashed white)
                const lineEl = splitFeature === "x1" ? (
                  // Vertical line at x1 = threshold
                  <line
                    x1={sx(splitThreshold)} y1={PADDING.top}
                    x2={sx(splitThreshold)} y2={PADDING.top + plotH}
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="5,3"
                    opacity={0.7}
                  />
                ) : (
                  // Horizontal line at x2 = threshold
                  <line
                    x1={PADDING.left} y1={sy(splitThreshold)}
                    x2={PADDING.left + plotW} y2={sy(splitThreshold)}
                    stroke="white"
                    strokeWidth={2}
                    strokeDasharray="5,3"
                    opacity={0.7}
                  />
                );

                // Light region shading
                const shadingEl = splitFeature === "x1" ? (
                  <>
                    <rect
                      x={PADDING.left} y={PADDING.top}
                      width={sx(splitThreshold) - PADDING.left}
                      height={plotH}
                      fill={DEFAULT_COLORS[0]}
                      opacity={0.06}
                    />
                    <rect
                      x={sx(splitThreshold)} y={PADDING.top}
                      width={PADDING.left + plotW - sx(splitThreshold)}
                      height={plotH}
                      fill={DEFAULT_COLORS[1]}
                      opacity={0.06}
                    />
                  </>
                ) : (
                  <>
                    <rect
                      x={PADDING.left} y={sy(splitThreshold)}
                      width={plotW}
                      height={PADDING.top + plotH - sy(splitThreshold)}
                      fill={DEFAULT_COLORS[0]}
                      opacity={0.06}
                    />
                    <rect
                      x={PADDING.left} y={PADDING.top}
                      width={plotW}
                      height={sy(splitThreshold) - PADDING.top}
                      fill={DEFAULT_COLORS[1]}
                      opacity={0.06}
                    />
                  </>
                );

                return (
                  <>
                    {shadingEl}
                    {lineEl}
                  </>
                );
              }}
            </ScatterPlot>
          </div>

          {/* Stats panel */}
          <div className="space-y-4 min-w-[200px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Ensemble Status
            </h4>
            <div className="rounded-lg border border-card-border bg-card-bg/50 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between gap-4">
                <span className="text-muted">Trees trained</span>
                <span>{Math.min(treeIndex + (phase === "bootstrap" ? 0 : 1), 5)}/5</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Phase</span>
                <span className="capitalize">{phase.replace("_", " ")}</span>
              </div>
              {showSplit && (
                <div className="flex justify-between gap-4 pt-2 border-t border-card-border">
                  <span className="text-muted">Split</span>
                  <span>{splitFeature} ≤ {splitThreshold}</span>
                </div>
              )}
            </div>

            {/* Vote tallies */}
            {showVotes && (
              <div className="rounded-lg border border-card-border bg-card-bg/50 p-3 space-y-1">
                <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Vote Tally</p>
                {rfData.slice(0, 6).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-muted w-12">pt {i}:</span>
                    <span className="text-indigo-400">{votes[i].class0}v0</span>
                    <span className="text-yellow-400">{votes[i].class1}v1</span>
                  </div>
                ))}
                <p className="text-[10px] text-muted mt-1">…showing first 6 points</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[0] }} />
            Class 0
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[1] }} />
            Class 1
          </span>
          {showBootstrap && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-white/70" />
              Bootstrap sample
            </span>
          )}
          {showSplit && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0.5 bg-white border-dashed" style={{ borderTop: "2px dashed white" }} />
              Split threshold
            </span>
          )}
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
