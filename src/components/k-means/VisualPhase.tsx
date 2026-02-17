"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import LossCurve from "@/components/shared/ml/LossCurve";
import { kMeansTrace, kMeansData } from "@/lib/traces/kMeans";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 9];
const Y_RANGE: [number, number] = [0, 7];

const CENTROID_COLORS = ["#818cf8", "#f59e0b", "#22c55e"];

export default function KMeansVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = kMeansTrace;
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

  // Color points by their cluster assignment
  const points = kMeansData.map((d, i) => ({
    x: d.x,
    y: d.y,
    label: current.assignments[i],
  }));

  const pointColors = points.map((_, i) => {
    const assignment = current.assignments[i];
    return CENTROID_COLORS[assignment] || DEFAULT_COLORS[0];
  });

  // Collect WCSS values for loss curve (only from steps that have WCSS > 0)
  const wcssValues = trace.filter((t) => t.wcss > 0).map((t) => t.wcss);
  const wcssStepIdx = trace.slice(0, step + 1).filter((t) => t.wcss > 0).length - 1;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch K-Means alternate between assign and update steps"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Clusters & Centroids</h4>
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              pointColors={pointColors}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx: ScaleFn, sy: ScaleFn) => (
                <>
                  {/* Centroids — use native SVG transform (not Framer Motion x/y) */}
                  {current.centroids.map((c, ci) => (
                    <g
                      key={`centroid-${ci}`}
                      transform={`translate(${sx(c.x)}, ${sy(c.y)})`}
                    >
                      <rect
                        x={-8}
                        y={-8}
                        width={16}
                        height={16}
                        rx={3}
                        fill={CENTROID_COLORS[ci]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <text
                        x={0}
                        y={-14}
                        textAnchor="middle"
                        className="text-[9px] font-bold"
                        fill={CENTROID_COLORS[ci]}
                      >
                        {"μ"}{ci + 1}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </ScatterPlot>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">WCSS Over Iterations</h4>
            {wcssValues.length > 0 && (
              <LossCurve
                losses={wcssValues}
                currentStep={Math.max(0, wcssStepIdx)}
                width={320}
                height={200}
                yLabel="WCSS"
              />
            )}
            <div className="mt-3 text-xs text-muted space-y-1">
              <p>WCSS = {current.wcss > 0 ? current.wcss.toFixed(2) : "\u2014"}</p>
              <p>Phase: {current.phase}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs text-muted">
          {CENTROID_COLORS.map((color, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
              Cluster {i + 1}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3.5 h-3.5 rounded-sm border-2 border-white bg-gray-600" />
            Centroid
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
