"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { naiveBayesTrace, nbData } from "@/lib/traces/naiveBayes";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 8];
const Y_RANGE: [number, number] = [0, 8];
const GRID_SIZE = 20;

// Gaussian log-likelihood for 1 point
function logGaussian(x: number, mu: number, sigma: number): number {
  const s = sigma + 1e-9;
  return -0.5 * (((x - mu) / s) ** 2 + Math.log(2 * Math.PI * s * s));
}

export default function NaiveBayesVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = naiveBayesTrace;
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

  const { phase, means, stds, priors, query, showQuery, showEllipses, logPosteriors, prediction } = current;

  const points = nbData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));

  const showDecisionBg = phase === "posterior" || phase === "classify" || phase === "result";

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch Naive Bayes estimate class distributions and classify the query"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Data &amp; Gaussian Distributions
            </h4>
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
                const plotW = PLOT_W - PADDING.left - PADDING.right;
                const plotH = PLOT_H - PADDING.top - PADDING.bottom;
                const xMin = X_RANGE[0], xMax = X_RANGE[1];
                const yMin = Y_RANGE[0], yMax = Y_RANGE[1];

                const tileW = plotW / GRID_SIZE;
                const tileH = plotH / GRID_SIZE;

                const tiles: React.ReactNode[] = [];
                if (showDecisionBg) {
                  for (let gi = 0; gi < GRID_SIZE; gi++) {
                    for (let gj = 0; gj < GRID_SIZE; gj++) {
                      const x1v = xMin + (gi + 0.5) / GRID_SIZE * (xMax - xMin);
                      const x2v = yMin + (gj + 0.5) / GRID_SIZE * (yMax - yMin);
                      const logP0 = Math.log(priors.c0) +
                        logGaussian(x1v, means.c0[0], stds.c0[0]) +
                        logGaussian(x2v, means.c0[1], stds.c0[1]);
                      const logP1 = Math.log(priors.c1) +
                        logGaussian(x1v, means.c1[0], stds.c1[0]) +
                        logGaussian(x2v, means.c1[1], stds.c1[1]);
                      const isClass1 = logP1 > logP0;
                      tiles.push(
                        <rect
                          key={`tile-${gi}-${gj}`}
                          x={PADDING.left + gi * tileW}
                          y={PADDING.top + (GRID_SIZE - 1 - gj) * tileH}
                          width={tileW}
                          height={tileH}
                          fill={isClass1 ? DEFAULT_COLORS[1] : DEFAULT_COLORS[0]}
                          opacity={0.12}
                        />
                      );
                    }
                  }
                }

                // Ellipse helper
                const makeEllipse = (
                  mu: [number, number],
                  std: [number, number],
                  color: string,
                  scale: number,
                  dashed: boolean
                ) => {
                  const cx = sx(mu[0]);
                  const cy = sy(mu[1]);
                  const rx = (std[0] / (xMax - xMin)) * plotW * scale;
                  const ry = (std[1] / (yMax - yMin)) * plotH * scale;
                  return (
                    <ellipse
                      cx={cx}
                      cy={cy}
                      rx={rx}
                      ry={ry}
                      fill="none"
                      stroke={color}
                      strokeWidth={1.5}
                      strokeDasharray={dashed ? "4,3" : "none"}
                      opacity={0.8}
                    />
                  );
                };

                // Query diamond marker
                const qx = sx(query.x1);
                const qy = sy(query.x2);
                const diamondSize = 8;
                const diamondPath = `M ${qx} ${qy - diamondSize} L ${qx + diamondSize} ${qy} L ${qx} ${qy + diamondSize} L ${qx - diamondSize} ${qy} Z`;

                const queryColor = prediction !== null
                  ? DEFAULT_COLORS[prediction]
                  : "#ffffff";

                return (
                  <>
                    {tiles}

                    {/* Class 0 ellipses */}
                    {showEllipses.c0 && makeEllipse(means.c0, stds.c0, DEFAULT_COLORS[0], 1, false)}
                    {showEllipses.c0 && makeEllipse(means.c0, stds.c0, DEFAULT_COLORS[0], 2, true)}

                    {/* Class 1 ellipses */}
                    {showEllipses.c1 && makeEllipse(means.c1, stds.c1, DEFAULT_COLORS[1], 1, false)}
                    {showEllipses.c1 && makeEllipse(means.c1, stds.c1, DEFAULT_COLORS[1], 2, true)}

                    {/* Query point */}
                    {showQuery && (
                      <>
                        <path d={diamondPath} fill={queryColor} stroke="#ffffff" strokeWidth={1.5} opacity={0.9} />
                        {prediction !== null && (
                          <text x={qx + 12} y={qy - 4} fill={queryColor} fontSize={11} fontWeight="bold">
                            Class {prediction}
                          </text>
                        )}
                      </>
                    )}
                  </>
                );
              }}
            </ScatterPlot>
          </div>

          {/* Posterior panel */}
          <div className="space-y-4 min-w-[200px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Log Posteriors
            </h4>
            <div className="rounded-lg border border-card-border bg-card-bg/50 p-4 space-y-3 text-xs font-mono">
              <div>
                <p className="text-muted mb-1">log P(C₀|x)</p>
                <p className={logPosteriors ? "text-indigo-400" : "text-muted"}>
                  {logPosteriors && isFinite(logPosteriors.c0) ? logPosteriors.c0.toFixed(1) : "—"}
                </p>
              </div>
              <div>
                <p className="text-muted mb-1">log P(C₁|x)</p>
                <p className={logPosteriors && isFinite(logPosteriors.c1) ? "text-yellow-400" : "text-muted"}>
                  {logPosteriors && isFinite(logPosteriors.c1) ? logPosteriors.c1.toFixed(1) : "—"}
                </p>
              </div>
              {prediction !== null && (
                <div className="pt-2 border-t border-card-border">
                  <p className="text-muted mb-1">Prediction</p>
                  <p style={{ color: DEFAULT_COLORS[prediction] }} className="font-bold">
                    Class {prediction}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-card-border bg-card-bg/50 p-3 space-y-1">
              <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Query Point</p>
              <p className="text-xs font-mono">x₁ = {query.x1}, x₂ = {query.x2}</p>
            </div>
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
          {showEllipses.c0 && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5" style={{ background: DEFAULT_COLORS[0] }} />
              1σ ellipse
            </span>
          )}
          {showEllipses.c0 && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 border-dashed" style={{ borderTop: `2px dashed ${DEFAULT_COLORS[0]}` }} />
              2σ ellipse
            </span>
          )}
          {showQuery && (
            <span className="flex items-center gap-1.5">
              <span className="text-white">◆</span>
              Query point
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
