"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { useScales, DEFAULT_COLORS } from "@/components/shared/ml/ScatterPlot";
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
  const { scaleX, scaleY, plotW, plotH } = useScales(points, PLOT_W, PLOT_H, X_RANGE, Y_RANGE);

  // Decision boundary: w1*x1 + w2*x2 + b = 0 => x2 = -(w1/w2)*x1 - b/w2
  const { w1, w2, b } = current;
  const hasLine = Math.abs(w2) > 0.001;
  const boundaryX1 = X_RANGE[0];
  const boundaryX2 = X_RANGE[1];
  const boundaryY1 = hasLine ? -(w1 / w2) * boundaryX1 - b / w2 : 0;
  const boundaryY2 = hasLine ? -(w1 / w2) * boundaryX2 - b / w2 : 0;

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
              {/* Shaded regions */}
              {hasLine && (
                <>
                  <defs>
                    <clipPath id="plot-clip">
                      <rect x={50} y={20} width={plotW} height={plotH} />
                    </clipPath>
                  </defs>
                  {/* Class 1 region (above boundary) */}
                  <motion.polygon
                    points={`${scaleX(boundaryX1)},${scaleY(boundaryY1)} ${scaleX(boundaryX2)},${scaleY(boundaryY2)} ${scaleX(boundaryX2)},${scaleY(Y_RANGE[1])} ${scaleX(boundaryX1)},${scaleY(Y_RANGE[1])}`}
                    fill={DEFAULT_COLORS[1]}
                    opacity={0.08}
                    clipPath="url(#plot-clip)"
                    animate={{
                      points: `${scaleX(boundaryX1)},${scaleY(boundaryY1)} ${scaleX(boundaryX2)},${scaleY(boundaryY2)} ${scaleX(boundaryX2)},${scaleY(Y_RANGE[1])} ${scaleX(boundaryX1)},${scaleY(Y_RANGE[1])}`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Class 0 region (below boundary) */}
                  <motion.polygon
                    points={`${scaleX(boundaryX1)},${scaleY(boundaryY1)} ${scaleX(boundaryX2)},${scaleY(boundaryY2)} ${scaleX(boundaryX2)},${scaleY(Y_RANGE[0])} ${scaleX(boundaryX1)},${scaleY(Y_RANGE[0])}`}
                    fill={DEFAULT_COLORS[0]}
                    opacity={0.08}
                    clipPath="url(#plot-clip)"
                    animate={{
                      points: `${scaleX(boundaryX1)},${scaleY(boundaryY1)} ${scaleX(boundaryX2)},${scaleY(boundaryY2)} ${scaleX(boundaryX2)},${scaleY(Y_RANGE[0])} ${scaleX(boundaryX1)},${scaleY(Y_RANGE[0])}`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </>
              )}

              {/* Decision boundary line */}
              {hasLine && (
                <motion.line
                  x1={scaleX(boundaryX1)}
                  y1={scaleY(boundaryY1)}
                  x2={scaleX(boundaryX2)}
                  y2={scaleY(boundaryY2)}
                  stroke="#fff"
                  strokeWidth={2}
                  strokeDasharray="6,3"
                  animate={{
                    x1: scaleX(boundaryX1),
                    y1: scaleY(boundaryY1),
                    x2: scaleX(boundaryX2),
                    y2: scaleY(boundaryY2),
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}
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
