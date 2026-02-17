"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { useScales, DEFAULT_COLORS } from "@/components/shared/ml/ScatterPlot";
import { knnTrace, knnData, knnQuery, knnK } from "@/lib/traces/knn";

const PLOT_W = 500;
const PLOT_H = 380;
const X_RANGE: [number, number] = [0, 8];
const Y_RANGE: [number, number] = [0, 7];

export default function KnnVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = knnTrace;
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

  const points = knnData.map((d) => ({ x: d.x, y: d.y, label: d.label }));
  const { scaleX, scaleY } = useScales(points, PLOT_W, PLOT_H, X_RANGE, Y_RANGE);

  // Find the radius to capture k neighbors (for the expanding circle)
  const kRadius =
    current.phase === "select_k" || current.phase === "vote" || current.phase === "result"
      ? current.distances[knnK - 1]?.dist ?? 0
      : 0;

  // Scale the radius to pixel space (approximate using x-axis scale)
  const pixelRadiusX = (kRadius / (X_RANGE[1] - X_RANGE[0])) * (PLOT_W - 70);
  const pixelRadiusY = (kRadius / (Y_RANGE[1] - Y_RANGE[0])) * (PLOT_H - 60);
  const pixelRadius = Math.sqrt(pixelRadiusX * pixelRadiusY);

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle={`Classifying query point (${knnQuery.x}, ${knnQuery.y}) with k=${knnK}`}
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">
        <div className="flex justify-center">
          <ScatterPlot
            width={PLOT_W}
            height={PLOT_H}
            points={points}
            xLabel="x₁"
            yLabel="x₂"
            xRange={X_RANGE}
            yRange={Y_RANGE}
            highlightIndices={current.selectedK}
            highlightColor="#fff"
          >
            {/* Distance lines from query to all points */}
            {current.phase === "compute_distances" &&
              knnData.map((p, i) => (
                <motion.line
                  key={`dist-${i}`}
                  x1={scaleX(knnQuery.x)}
                  y1={scaleY(knnQuery.y)}
                  x2={scaleX(p.x)}
                  y2={scaleY(p.y)}
                  stroke="#4b5563"
                  strokeWidth={1}
                  strokeDasharray="4,3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                />
              ))}

            {/* Distance lines to selected k neighbors */}
            {(current.phase === "select_k" || current.phase === "vote" || current.phase === "result") &&
              current.selectedK.map((idx) => (
                <motion.line
                  key={`sel-${idx}`}
                  x1={scaleX(knnQuery.x)}
                  y1={scaleY(knnQuery.y)}
                  x2={scaleX(knnData[idx].x)}
                  y2={scaleY(knnData[idx].y)}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                />
              ))}

            {/* Expanding circle for k-radius */}
            <AnimatePresence>
              {kRadius > 0 && (
                <motion.circle
                  cx={scaleX(knnQuery.x)}
                  cy={scaleY(knnQuery.y)}
                  r={pixelRadius}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="6,3"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: pixelRadius, opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>

            {/* Query point */}
            <motion.circle
              cx={scaleX(knnQuery.x)}
              cy={scaleY(knnQuery.y)}
              r={7}
              fill={current.prediction !== null ? DEFAULT_COLORS[current.prediction] : "#fff"}
              stroke="#fff"
              strokeWidth={2}
              animate={{
                fill: current.prediction !== null ? DEFAULT_COLORS[current.prediction] : "#fff",
              }}
            />
            <text
              x={scaleX(knnQuery.x) + 12}
              y={scaleY(knnQuery.y) - 8}
              className="text-[10px] font-bold"
              fill="#fff"
            >
              query
            </text>
          </ScatterPlot>
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
            <span className="inline-block w-3 h-3 rounded-full bg-white border border-gray-400" />
            Query
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
