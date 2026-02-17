"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import LossCurve from "@/components/shared/ml/LossCurve";
import { logisticRegressionTrace, logRegData } from "@/lib/traces/logisticRegression";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 7];
const Y_RANGE: [number, number] = [-0.5, 6.5];

export default function LogisticRegressionVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = logisticRegressionTrace;
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

  const points = logRegData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));

  // Decision boundary: w1*x1 + w2*x2 + b = 0
  const { w1, w2, b } = current;
  const hasLine = Math.abs(w2) > 0.001 || Math.abs(w1) > 0.001;

  // Split chart rectangle along boundary line into two polygons.
  // Walk clockwise around the 4 corners; when the sign of
  // (w1*x + w2*y + b) flips between two consecutive corners,
  // insert the edge intersection point into both polygons.
  function splitRegions(sx: ScaleFn, sy: ScaleFn) {
    const corners = [
      { x: X_RANGE[0], y: Y_RANGE[1] }, // top-left
      { x: X_RANGE[1], y: Y_RANGE[1] }, // top-right
      { x: X_RANGE[1], y: Y_RANGE[0] }, // bottom-right
      { x: X_RANGE[0], y: Y_RANGE[0] }, // bottom-left
    ];
    const side = (pt: { x: number; y: number }) => w1 * pt.x + w2 * pt.y + b;
    const c1Verts: { x: number; y: number }[] = [];
    const c0Verts: { x: number; y: number }[] = [];
    const lineEnds: { x: number; y: number }[] = [];

    for (let i = 0; i < 4; i++) {
      const curr = corners[i];
      const next = corners[(i + 1) % 4];
      const sCurr = side(curr);
      const sNext = side(next);
      if (sCurr > 0) c1Verts.push(curr);
      else c0Verts.push(curr);
      if ((sCurr > 0) !== (sNext > 0)) {
        const t = sCurr / (sCurr - sNext);
        const ix = curr.x + t * (next.x - curr.x);
        const iy = curr.y + t * (next.y - curr.y);
        c1Verts.push({ x: ix, y: iy });
        c0Verts.push({ x: ix, y: iy });
        lineEnds.push({ x: ix, y: iy });
      }
    }

    const toStr = (v: { x: number; y: number }[]) =>
      v.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ");

    return {
      class0: c0Verts.length >= 3 ? toStr(c0Verts) : null,
      class1: c1Verts.length >= 3 ? toStr(c1Verts) : null,
      lineEnds: lineEnds.length >= 2 ? lineEnds : null,
    };
  }

  const losses = trace.map((t) => t.loss);

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch the decision boundary separate two classes"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Data & Decision Boundary</h4>
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx: ScaleFn, sy: ScaleFn) => {
                const regions = hasLine ? splitRegions(sx, sy) : null;
                return (
                  <>
                    {/* Shaded regions */}
                    {regions?.class1 && (
                      <polygon points={regions.class1} fill={DEFAULT_COLORS[1]} opacity={0.08} />
                    )}
                    {regions?.class0 && (
                      <polygon points={regions.class0} fill={DEFAULT_COLORS[0]} opacity={0.08} />
                    )}

                    {/* Decision boundary line */}
                    {regions?.lineEnds && (
                      <line
                        x1={sx(regions.lineEnds[0].x)}
                        y1={sy(regions.lineEnds[0].y)}
                        x2={sx(regions.lineEnds[1].x)}
                        y2={sy(regions.lineEnds[1].y)}
                        stroke="#fff"
                        strokeWidth={2}
                        strokeDasharray="6,3"
                      />
                    )}
                  </>
                );
              }}
            </ScatterPlot>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">BCE Loss Over Iterations</h4>
            <LossCurve
              losses={losses}
              currentStep={step}
              width={320}
              height={200}
              yLabel="BCE Loss"
            />
            <div className="mt-3 text-xs text-muted space-y-1">
              <p>w₁ = {current.w1.toFixed(3)}, w₂ = {current.w2.toFixed(3)}</p>
              <p>b = {current.b.toFixed(3)}</p>
              <p>Loss = {current.loss.toFixed(3)}</p>
            </div>
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
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-0.5 bg-white border-dashed" />
            Decision boundary
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
