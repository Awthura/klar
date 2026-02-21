"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { randomForestTrace, rfData, RF_TREES } from "@/lib/traces/randomForest";

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

  const showBootstrap = phase === "bootstrap";
  const showTrainSplit = phase === "train_tree";
  const showAllSplits = phase === "aggregate" || phase === "result";
  const showVotes = phase === "aggregate" || phase === "result";

  // How many trees have been fully trained at this step
  const treesTrainedCount =
    phase === "init" ? 0 :
    phase === "bootstrap" ? treeIndex :
    phase === "train_tree" ? treeIndex + 1 : 5;

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

                if (!showTrainSplit && !showAllSplits) return null;

                // Region shading only for the current tree during training
                let shading = null;
                if (showTrainSplit) {
                  const tree = RF_TREES[treeIndex];
                  shading = tree.feature === "x1" ? (
                    <>
                      <rect
                        x={PADDING.left} y={PADDING.top}
                        width={sx(tree.threshold) - PADDING.left} height={plotH}
                        fill={DEFAULT_COLORS[0]} opacity={0.10}
                      />
                      <rect
                        x={sx(tree.threshold)} y={PADDING.top}
                        width={PADDING.left + plotW - sx(tree.threshold)} height={plotH}
                        fill={DEFAULT_COLORS[1]} opacity={0.10}
                      />
                    </>
                  ) : (
                    <>
                      <rect
                        x={PADDING.left} y={sy(tree.threshold)}
                        width={plotW}
                        height={PADDING.top + plotH - sy(tree.threshold)}
                        fill={DEFAULT_COLORS[0]} opacity={0.10}
                      />
                      <rect
                        x={PADDING.left} y={PADDING.top}
                        width={plotW}
                        height={sy(tree.threshold) - PADDING.top}
                        fill={DEFAULT_COLORS[1]} opacity={0.10}
                      />
                    </>
                  );
                }

                // Split lines for all trained trees
                const splitLines = RF_TREES.slice(0, treesTrainedCount).map((tree, idx) => {
                  const isCurrent = showTrainSplit && idx === treeIndex;
                  const opacity = showAllSplits ? 0.35 : (isCurrent ? 0.70 : 0.22);
                  const sw = isCurrent ? 2 : 1.5;
                  return tree.feature === "x1" ? (
                    <line key={`s${idx}`}
                      x1={sx(tree.threshold)} y1={PADDING.top}
                      x2={sx(tree.threshold)} y2={PADDING.top + plotH}
                      stroke="white" strokeWidth={sw}
                      strokeDasharray="5,3" opacity={opacity}
                    />
                  ) : (
                    <line key={`s${idx}`}
                      x1={PADDING.left} y1={sy(tree.threshold)}
                      x2={PADDING.left + plotW} y2={sy(tree.threshold)}
                      stroke="white" strokeWidth={sw}
                      strokeDasharray="5,3" opacity={opacity}
                    />
                  );
                });

                return <>{shading}{splitLines}</>;
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
                <span>{treesTrainedCount}/5</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Phase</span>
                <span className="capitalize">{phase.replace("_", " ")}</span>
              </div>
              {showTrainSplit && (
                <div className="flex justify-between gap-4 pt-2 border-t border-card-border">
                  <span className="text-muted">Split</span>
                  <span>{splitFeature} ≤ {splitThreshold}</span>
                </div>
              )}
            </div>

            {/* Vote bar chart */}
            {showVotes && (
              <div className="rounded-lg border border-card-border bg-card-bg/50 p-3 space-y-2">
                <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Vote Tally</p>
                {rfData.slice(0, 6).map((_, i) => {
                  const total = votes[i].class0 + votes[i].class1;
                  const pct0 = total > 0 ? (votes[i].class0 / total) * 100 : 50;
                  return (
                    <div key={i} className="space-y-0.5">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-muted">pt {i}</span>
                        <span className="text-muted">{votes[i].class0} : {votes[i].class1}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden flex">
                        <div
                          className="transition-all duration-300"
                          style={{ width: `${pct0}%`, background: DEFAULT_COLORS[0] }}
                        />
                        <div
                          className="transition-all duration-300 flex-1"
                          style={{ background: DEFAULT_COLORS[1] }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[10px] text-muted pt-1">First 6 pts · class 0 vs class 1</p>
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
          {(showTrainSplit || showAllSplits) && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0" style={{ borderTop: "2px dashed white" }} />
              {showAllSplits ? "All 5 tree splits" : "Current tree split"}
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
