"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot from "@/components/shared/ml/ScatterPlot";
import LossCurve from "@/components/shared/ml/LossCurve";
import { linearRegressionTrace, lrData } from "@/lib/traces/linearRegression";

const PLOT_W = 500;
const PLOT_H = 350;
const X_RANGE: [number, number] = [0, 9];
const Y_RANGE: [number, number] = [0, 20];

export default function LinearRegressionVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = linearRegressionTrace;
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

  const points = lrData.map((d) => ({ x: d.x, y: d.y }));

  const lineX1 = X_RANGE[0];
  const lineX2 = X_RANGE[1];
  const lineY1 = current.w * lineX1 + current.b;
  const lineY2 = current.w * lineX2 + current.b;

  const losses = trace.map((t) => t.loss);

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch gradient descent fit a line to data"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Data & Regression Line</h4>
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x"
              yLabel="y"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx, sy) => (
                <>
                  {/* Regression line */}
                  <line
                    x1={sx(lineX1)}
                    y1={sy(lineY1)}
                    x2={sx(lineX2)}
                    y2={sy(lineY2)}
                    stroke="#22c55e"
                    strokeWidth={2}
                  />

                  {/* Residual lines */}
                  {lrData.map((d, i) => {
                    const pred = current.w * d.x + current.b;
                    return (
                      <line
                        key={i}
                        x1={sx(d.x)}
                        y1={sy(d.y)}
                        x2={sx(d.x)}
                        y2={sy(pred)}
                        stroke="#ef4444"
                        strokeWidth={1}
                        strokeDasharray="3,2"
                        opacity={0.6}
                      />
                    );
                  })}
                </>
              )}
            </ScatterPlot>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Loss Over Iterations</h4>
            <LossCurve
              losses={losses}
              currentStep={step}
              width={320}
              height={200}
            />
            <div className="mt-3 text-xs text-muted space-y-1">
              <p>w = {current.w.toFixed(3)}, b = {current.b.toFixed(3)}</p>
              <p>Loss = {current.loss.toFixed(2)}</p>
            </div>
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
