"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { pcaTrace } from "@/lib/traces/pca";

const PLOT_W = 480;
const PLOT_H = 380;
const X_RANGE: [number, number] = [-4, 4];
const Y_RANGE: [number, number] = [-4, 4];

export default function PCAVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = pcaTrace;
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

  const { phase, centeredData, pc1, pc2, eigenvalue1, eigenvalue2, projections, varianceExplained } = current;

  const points = centeredData.map((p) => ({ x: p.x, y: p.y }));

  const showArrows = phase === "eigenvectors" || phase === "project" || phase === "result";
  const showProjections = (phase === "project" || phase === "result") && projections[0].x !== 0;
  const showVarBar = varianceExplained > 0;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch PCA find the directions of maximum variance"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Centered Data & Principal Components
            </h4>
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x̃₁"
              yLabel="x̃₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx: ScaleFn, sy: ScaleFn) => {
                const plotW = PLOT_W - PADDING.left - PADDING.right;
                const plotH = PLOT_H - PADDING.top - PADDING.bottom;
                const xMin = X_RANGE[0], xMax = X_RANGE[1];
                const yMin = Y_RANGE[0], yMax = Y_RANGE[1];

                const ox = sx(0);
                const oy = sy(0);

                // PC1 arrow endpoint (scale 2.5 units)
                const pc1Scale = 2.5;
                const pc1EndX = sx(pc1.dx * pc1Scale);
                const pc1EndY = sy(pc1.dy * pc1Scale);

                // PC2 arrow endpoint (scale 1.2 units)
                const pc2Scale = 1.2;
                const pc2EndX = sx(pc2.dx * pc2Scale);
                const pc2EndY = sy(pc2.dy * pc2Scale);

                // Full PC1 line across plot for projection phase
                const pc1LineEnd1 = { x: -pc1.dx * 5, y: -pc1.dy * 5 };
                const pc1LineEnd2 = { x: pc1.dx * 5, y: pc1.dy * 5 };

                return (
                  <>
                    <defs>
                      <marker id="arrowhead-pc1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
                      </marker>
                      <marker id="arrowhead-pc2" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
                      </marker>
                    </defs>

                    {/* PC1 full axis line for projection phase */}
                    {showProjections && (
                      <line
                        x1={sx(pc1LineEnd1.x)} y1={sy(pc1LineEnd1.y)}
                        x2={sx(pc1LineEnd2.x)} y2={sy(pc1LineEnd2.y)}
                        stroke="#22c55e"
                        strokeWidth={2}
                        opacity={0.6}
                        clipPath={`url(#plot-clip-${PLOT_W}-${PLOT_H})`}
                      />
                    )}

                    {/* Perpendicular lines from points to projections */}
                    {showProjections && centeredData.map((p, i) => (
                      <line
                        key={`perp-${i}`}
                        x1={sx(p.x)} y1={sy(p.y)}
                        x2={sx(projections[i].x)} y2={sy(projections[i].y)}
                        stroke="#6b7280"
                        strokeWidth={1}
                        strokeDasharray="3,2"
                        opacity={0.7}
                      />
                    ))}

                    {/* Projection dots on PC1 */}
                    {showProjections && projections.map((p, i) => (
                      <circle
                        key={`proj-${i}`}
                        cx={sx(p.x)}
                        cy={sy(p.y)}
                        r={4}
                        fill="#22c55e"
                        opacity={0.8}
                      />
                    ))}

                    {/* PC1 arrow */}
                    {showArrows && (
                      <line
                        x1={ox} y1={oy}
                        x2={pc1EndX} y2={pc1EndY}
                        stroke="#22c55e"
                        strokeWidth={2.5}
                        markerEnd="url(#arrowhead-pc1)"
                      />
                    )}
                    {showArrows && (
                      <text x={pc1EndX + 8} y={pc1EndY - 5} fill="#22c55e" fontSize={12} fontWeight="bold">
                        PC1
                      </text>
                    )}

                    {/* PC2 arrow */}
                    {showArrows && (
                      <line
                        x1={ox} y1={oy}
                        x2={pc2EndX} y2={pc2EndY}
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        markerEnd="url(#arrowhead-pc2)"
                      />
                    )}
                    {showArrows && (
                      <text x={pc2EndX + 8} y={pc2EndY + 4} fill="#ef4444" fontSize={12} fontWeight="bold">
                        PC2
                      </text>
                    )}
                  </>
                );
              }}
            </ScatterPlot>
          </div>
        </div>

        {/* Variance explained bar */}
        {showVarBar && (
          <div className="max-w-sm mx-auto">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Variance Explained
            </h4>
            <div className="flex rounded-full overflow-hidden h-5 w-full">
              <div
                className="flex items-center justify-center text-[10px] font-bold text-black"
                style={{ width: `${varianceExplained}%`, background: "#22c55e" }}
              >
                {varianceExplained.toFixed(1)}%
              </div>
              <div
                className="flex items-center justify-center text-[10px] font-bold"
                style={{ width: `${100 - varianceExplained}%`, background: "#ef4444", color: "#fff" }}
              >
                {(100 - varianceExplained) >= 8 ? `${(100 - varianceExplained).toFixed(1)}%` : ""}
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted mt-1">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-green-500" />
                PC1 (λ₁={eigenvalue1})
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-sm bg-red-500" />
                PC2 (λ₂={eigenvalue2})
              </span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[0] }} />
            Data point (centered)
          </span>
          {showArrows && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-1 bg-green-500" />
                PC1 (max variance)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-1 bg-red-500" />
                PC2 (orthogonal)
              </span>
            </>
          )}
          {showProjections && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
              Projection onto PC1
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
