"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import { svmTrace, svmData } from "@/lib/traces/svm";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 8];
const Y_RANGE: [number, number] = [0, 8];

function getBoundaryLineEnds(
  w1: number, w2: number, b: number,
  xRange: [number, number], yRange: [number, number]
): { x: number; y: number }[] | null {
  if (Math.abs(w1) < 0.001 && Math.abs(w2) < 0.001) return null;
  const corners = [
    { x: xRange[0], y: yRange[1] },
    { x: xRange[1], y: yRange[1] },
    { x: xRange[1], y: yRange[0] },
    { x: xRange[0], y: yRange[0] },
  ];
  const side = (pt: { x: number; y: number }) => w1 * pt.x + w2 * pt.y + b;
  const lineEnds: { x: number; y: number }[] = [];

  for (let i = 0; i < 4; i++) {
    const curr = corners[i];
    const next = corners[(i + 1) % 4];
    const sCurr = side(curr);
    const sNext = side(next);
    if ((sCurr >= 0) !== (sNext >= 0)) {
      const t = sCurr / (sCurr - sNext);
      lineEnds.push({ x: curr.x + t * (next.x - curr.x), y: curr.y + t * (next.y - curr.y) });
    }
  }
  return lineEnds.length >= 2 ? lineEnds : null;
}

function getMarginLanePolygon(
  w1: number, w2: number, b: number,
  xRange: [number, number], yRange: [number, number],
  sx: ScaleFn, sy: ScaleFn
): string | null {
  const pos1 = getBoundaryLineEnds(w1, w2, b - 1, xRange, yRange);
  const neg1 = getBoundaryLineEnds(w1, w2, b + 1, xRange, yRange);
  if (!pos1 || !neg1) return null;
  const pts = [pos1[0], pos1[1], neg1[1], neg1[0]];
  return pts.map(p => `${sx(p.x)},${sy(p.y)}`).join(" ");
}

// Polygon covering the half-plane where w1*x + w2*y + b has the given sign (+1 or -1).
// Traverses the plot boundary corners in order, collecting corners on the desired side
// and intersection points where the boundary crosses the zero line.
function getHalfPlanePolygon(
  w1: number, w2: number, b: number,
  side: 1 | -1,
  xRange: [number, number], yRange: [number, number],
  sx: ScaleFn, sy: ScaleFn
): string | null {
  if (Math.abs(w1) < 0.001 && Math.abs(w2) < 0.001) return null;
  const corners = [
    { x: xRange[0], y: yRange[1] },
    { x: xRange[1], y: yRange[1] },
    { x: xRange[1], y: yRange[0] },
    { x: xRange[0], y: yRange[0] },
  ];
  const eval_ = (pt: { x: number; y: number }) => w1 * pt.x + w2 * pt.y + b;
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i < 4; i++) {
    const curr = corners[i];
    const next = corners[(i + 1) % 4];
    const sCurr = eval_(curr);
    const sNext = eval_(next);
    // Include corner if on the desired side (or exactly on boundary)
    if ((side === 1 && sCurr >= 0) || (side === -1 && sCurr <= 0)) {
      pts.push(curr);
    }
    // Include intersection point if edge crosses the decision boundary
    if ((sCurr > 0) !== (sNext > 0) && Math.abs(sCurr) > 1e-10 && Math.abs(sNext) > 1e-10) {
      const t = sCurr / (sCurr - sNext);
      pts.push({ x: curr.x + t * (next.x - curr.x), y: curr.y + t * (next.y - curr.y) });
    }
  }

  if (pts.length < 3) return null;
  return pts.map(p => `${sx(p.x)},${sy(p.y)}`).join(" ");
}

export default function SVMVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = svmTrace;
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

  const points = svmData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));
  const { w1, w2, b, margin, phase, supportVectorIndices } = current;

  const showMarginLines = phase !== "init";
  const showLane = phase === "identify_support" || phase === "optimize" || phase === "converged";
  const showHalfPlanes = phase !== "init";

  const decisionLine = getBoundaryLineEnds(w1, w2, b, X_RANGE, Y_RANGE);
  const marginPlusLine = showMarginLines ? getBoundaryLineEnds(w1, w2, b - 1, X_RANGE, Y_RANGE) : null;
  const marginMinusLine = showMarginLines ? getBoundaryLineEnds(w1, w2, b + 1, X_RANGE, Y_RANGE) : null;

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch the maximum-margin hyperplane converge"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Data & Decision Boundary
            </h4>
            <ScatterPlot
              width={PLOT_W}
              height={PLOT_H}
              points={points}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
              highlightIndices={supportVectorIndices}
              highlightColor="#ffffff"
            >
              {(sx: ScaleFn, sy: ScaleFn) => {
                // Half-plane shading
                const posPolygon = showHalfPlanes && decisionLine
                  ? getHalfPlanePolygon(w1, w2, b, 1, X_RANGE, Y_RANGE, sx, sy)
                  : null;
                const negPolygon = showHalfPlanes && decisionLine
                  ? getHalfPlanePolygon(w1, w2, b, -1, X_RANGE, Y_RANGE, sx, sy)
                  : null;

                // Margin lane polygon
                const lanePolygon = showLane
                  ? getMarginLanePolygon(w1, w2, b, X_RANGE, Y_RANGE, sx, sy)
                  : null;

                // Margin width annotation: double-headed arrow between midpoints of margin lines
                let marginAnnotation = null;
                if (showLane && marginPlusLine && marginMinusLine && margin > 0) {
                  const plusMid = {
                    x: (sx(marginPlusLine[0].x) + sx(marginPlusLine[1].x)) / 2,
                    y: (sy(marginPlusLine[0].y) + sy(marginPlusLine[1].y)) / 2,
                  };
                  const minusMid = {
                    x: (sx(marginMinusLine[0].x) + sx(marginMinusLine[1].x)) / 2,
                    y: (sy(marginMinusLine[0].y) + sy(marginMinusLine[1].y)) / 2,
                  };
                  const dx = plusMid.x - minusMid.x;
                  const dy = plusMid.y - minusMid.y;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  if (len > 8) {
                    const ux = dx / len, uy = dy / len; // unit along arrow
                    const px = -uy, py = ux;            // perpendicular
                    const as = 6;                        // arrowhead size
                    // Arrowhead polygons pointing outward from each end
                    const ah1 = [
                      `${plusMid.x},${plusMid.y}`,
                      `${plusMid.x - ux * as - px * as * 0.4},${plusMid.y - uy * as - py * as * 0.4}`,
                      `${plusMid.x - ux * as + px * as * 0.4},${plusMid.y - uy * as + py * as * 0.4}`,
                    ].join(" ");
                    const ah2 = [
                      `${minusMid.x},${minusMid.y}`,
                      `${minusMid.x + ux * as - px * as * 0.4},${minusMid.y + uy * as - py * as * 0.4}`,
                      `${minusMid.x + ux * as + px * as * 0.4},${minusMid.y + uy * as + py * as * 0.4}`,
                    ].join(" ");
                    // Label offset perpendicular to arrow
                    const labelX = (plusMid.x + minusMid.x) / 2 + px * 18;
                    const labelY = (plusMid.y + minusMid.y) / 2 + py * 18;
                    marginAnnotation = (
                      <>
                        <line
                          x1={plusMid.x} y1={plusMid.y}
                          x2={minusMid.x} y2={minusMid.y}
                          stroke="white" strokeWidth={1.5} opacity={0.75}
                        />
                        <polygon points={ah1} fill="white" opacity={0.75} />
                        <polygon points={ah2} fill="white" opacity={0.75} />
                        <text
                          x={labelX} y={labelY}
                          fill="white" fontSize={11}
                          textAnchor="middle" dominantBaseline="middle"
                          fontFamily="ui-monospace, monospace" opacity={0.9}
                        >
                          {`γ=${margin.toFixed(2)}`}
                        </text>
                      </>
                    );
                  }
                }

                return (
                  <>
                    {/* Half-plane shading — class colors at low opacity */}
                    {posPolygon && (
                      <polygon
                        points={posPolygon}
                        fill={DEFAULT_COLORS[1]}
                        opacity={0.09}
                        clipPath={`url(#plot-clip-${PLOT_W}-${PLOT_H})`}
                      />
                    )}
                    {negPolygon && (
                      <polygon
                        points={negPolygon}
                        fill={DEFAULT_COLORS[0]}
                        opacity={0.09}
                        clipPath={`url(#plot-clip-${PLOT_W}-${PLOT_H})`}
                      />
                    )}

                    {/* Margin lane */}
                    {lanePolygon && (
                      <polygon
                        points={lanePolygon}
                        fill="white"
                        opacity={0.15}
                        clipPath={`url(#plot-clip-${PLOT_W}-${PLOT_H})`}
                      />
                    )}

                    {/* Margin boundary lines */}
                    {marginPlusLine && (
                      <line
                        x1={sx(marginPlusLine[0].x)} y1={sy(marginPlusLine[0].y)}
                        x2={sx(marginPlusLine[1].x)} y2={sy(marginPlusLine[1].y)}
                        stroke={DEFAULT_COLORS[1]} strokeWidth={1.5}
                        strokeDasharray="4,3" opacity={0.7}
                      />
                    )}
                    {marginMinusLine && (
                      <line
                        x1={sx(marginMinusLine[0].x)} y1={sy(marginMinusLine[0].y)}
                        x2={sx(marginMinusLine[1].x)} y2={sy(marginMinusLine[1].y)}
                        stroke={DEFAULT_COLORS[0]} strokeWidth={1.5}
                        strokeDasharray="4,3" opacity={0.7}
                      />
                    )}

                    {/* Decision boundary */}
                    {decisionLine && (
                      <line
                        x1={sx(decisionLine[0].x)} y1={sy(decisionLine[0].y)}
                        x2={sx(decisionLine[1].x)} y2={sy(decisionLine[1].y)}
                        stroke="#fff" strokeWidth={2} strokeDasharray="6,3"
                      />
                    )}

                    {/* Margin width annotation */}
                    {marginAnnotation}
                  </>
                );
              }}
            </ScatterPlot>
          </div>

          {/* Stats panel */}
          <div className="space-y-4 min-w-[200px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Current Parameters
            </h4>
            <div className="rounded-lg border border-card-border bg-card-bg/50 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between gap-4">
                <span className="text-muted">w₁</span>
                <span>{w1.toFixed(3)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">w₂</span>
                <span>{w2.toFixed(3)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">b</span>
                <span>{b.toFixed(3)}</span>
              </div>
              <div className="flex justify-between gap-4 pt-2 border-t border-card-border">
                <span className="text-muted">margin γ</span>
                <span className="text-green-400">{margin.toFixed(3)}</span>
              </div>
            </div>

            <div className="rounded-lg border border-card-border bg-card-bg/50 p-3">
              <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Phase</p>
              <p className="text-xs font-mono capitalize">{phase.replace("_", " ")}</p>
            </div>

            {supportVectorIndices.length > 0 && (
              <div className="rounded-lg border border-card-border bg-card-bg/50 p-3">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Support Vectors</p>
                <p className="text-xs font-mono">indices: {supportVectorIndices.join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[0] }} />
            Class −1
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[1] }} />
            Class +1
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="white" strokeWidth="2" strokeDasharray="4,2"/></svg>
            Decision boundary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-white" />
            Support vector
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
