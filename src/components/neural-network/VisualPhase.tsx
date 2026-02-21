"use client";

import { useState, useCallback } from "react";
import PhaseHeader from "@/components/shared/PhaseHeader";
import StepControls from "@/components/shared/StepControls";
import MathBlock from "@/components/shared/MathBlock";
import ScatterPlot, { DEFAULT_COLORS, PADDING } from "@/components/shared/ml/ScatterPlot";
import type { ScaleFn } from "@/components/shared/ml/ScatterPlot";
import LossCurve from "@/components/shared/ml/LossCurve";
import { neuralNetworkTrace, nnData } from "@/lib/traces/neuralNetwork";

const NET_W = 500;
const NET_H = 340;

const SCATTER_W = 400;
const SCATTER_H = 280;
const X_RANGE: [number, number] = [0, 8];
const Y_RANGE: [number, number] = [0, 8];

// Node positions for 2→4→4 architecture
const INPUT_NODES = [
  { x: 80, y: 120, label: "x₁" },
  { x: 80, y: 220, label: "x₂" },
];
const HIDDEN_NODES = [
  { x: 260, y: 55, label: "h₁" },
  { x: 260, y: 130, label: "h₂" },
  { x: 260, y: 210, label: "h₃" },
  { x: 260, y: 285, label: "h₄" },
];
const OUTPUT_NODES = [
  { x: 440, y: 55, label: "ŷ₀" },
  { x: 440, y: 130, label: "ŷ₁" },
  { x: 440, y: 210, label: "ŷ₂" },
  { x: 440, y: 285, label: "ŷ₃" },
];

// Per-class colors matching DEFAULT_COLORS[0-3]
const OUTPUT_CLASS_RGB = [
  [129, 140, 248],  // class 0 indigo  #818cf8
  [245, 158, 11],   // class 1 amber   #f59e0b
  [34, 197, 94],    // class 2 green   #22c55e
  [239, 68, 68],    // class 3 red     #ef4444
];

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// Forward pass returning argmax class (0-3)
function forwardPass(
  x1: number, x2: number,
  wIH: number[][], wHO: number[][], bH: number[], bO: number[]
): number {
  const h = [0, 1, 2, 3].map((j) => sigmoid(x1 * wIH[0][j] + x2 * wIH[1][j] + bH[j]));
  const logits = [0, 1, 2, 3].map((k) =>
    h.reduce((s, hi, i) => s + hi * wHO[i][k], 0) + bO[k]
  );
  const maxL = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / sum);
  return probs.indexOf(Math.max(...probs));
}

const GRID_SIZE = 20;

export default function NeuralNetworkVisualPhase() {
  const [step, setStep] = useState(0);
  const trace = neuralNetworkTrace;
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

  const { weightsIH, weightsHO, biasH, biasO, hiddenActivations, outputActivation, highlightEdges, loss } = current;

  const losses = trace.map((t) => t.loss);
  const points = nnData.map((d) => ({ x: d.x1, y: d.x2, label: d.label }));

  // Build all edges
  const edges: { id: string; x1: number; y1: number; x2: number; y2: number; weight: number }[] = [];
  INPUT_NODES.forEach((inp, i) => {
    HIDDEN_NODES.forEach((hid, j) => {
      edges.push({
        id: `IH_${i}_${j}`,
        x1: inp.x, y1: inp.y,
        x2: hid.x, y2: hid.y,
        weight: weightsIH[i][j],
      });
    });
  });
  HIDDEN_NODES.forEach((hid, i) => {
    OUTPUT_NODES.forEach((out, j) => {
      edges.push({
        id: `HO_${i}_${j}`,
        x1: hid.x, y1: hid.y,
        x2: out.x, y2: out.y,
        weight: weightsHO[i][j],
      });
    });
  });

  return (
    <section className="mb-16">
      <PhaseHeader
        phase={2}
        title="See It Work"
        subtitle="Watch the network learn to separate 4 quadrant clusters"
      />

      <div className="rounded-xl border border-card-border bg-card-bg p-6 space-y-6">

        {/* Network diagram */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
            Network Architecture (2 → 4 → 4)
          </h4>
          <svg width={NET_W} height={NET_H} className="w-full max-w-[500px] mx-auto block overflow-visible">
            {/* Edges */}
            {edges.map((e) => {
              const isHighlighted = highlightEdges.includes(e.id);
              const w = Math.abs(e.weight);
              const strokeWidth = isHighlighted ? Math.min(5, w * 3 + 1) : Math.min(3, w * 2 + 0.5);
              const color = e.weight >= 0
                ? (isHighlighted ? "#a5b4fc" : "#818cf8")
                : (isHighlighted ? "#fca5a5" : "#ef4444");
              return (
                <line
                  key={e.id}
                  x1={e.x1} y1={e.y1}
                  x2={e.x2} y2={e.y2}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  opacity={isHighlighted ? 1 : 0.4}
                />
              );
            })}

            {/* Input nodes */}
            {INPUT_NODES.map((n, i) => (
              <g key={`in-${i}`}>
                <circle cx={n.x} cy={n.y} r={22} fill="#1a1a2e" stroke="#4b5563" strokeWidth={1.5} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#e5e7eb" fontSize={12} fontWeight="bold">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Hidden nodes */}
            {HIDDEN_NODES.map((n, i) => {
              const act = hiddenActivations[i] ?? 0;
              const alpha = 0.3 + act * 0.7;
              return (
                <g key={`hid-${i}`}>
                  <circle
                    cx={n.x} cy={n.y} r={22}
                    fill={`rgba(129,140,248,${alpha.toFixed(2)})`}
                    stroke="#818cf8" strokeWidth={1.5}
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#e5e7eb" fontSize={12} fontWeight="bold">
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Output nodes — colored by class */}
            {OUTPUT_NODES.map((n, i) => {
              const act = outputActivation[i] ?? 0;
              const alpha = 0.3 + act * 0.7;
              const [r, g, b] = OUTPUT_CLASS_RGB[i];
              return (
                <g key={`out-${i}`}>
                  <circle
                    cx={n.x} cy={n.y} r={22}
                    fill={`rgba(${r},${g},${b},${alpha.toFixed(2)})`}
                    stroke={DEFAULT_COLORS[i]} strokeWidth={1.5}
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#e5e7eb" fontSize={12} fontWeight="bold">
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Layer labels */}
            <text x={80} y={NET_H - 10} textAnchor="middle" fill="#6b7280" fontSize={11}>Input</text>
            <text x={260} y={NET_H - 10} textAnchor="middle" fill="#6b7280" fontSize={11}>Hidden</text>
            <text x={440} y={NET_H - 10} textAnchor="middle" fill="#6b7280" fontSize={11}>Output</text>
          </svg>
        </div>

        {/* Decision region + loss curve */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Decision Region
            </h4>
            <ScatterPlot
              width={SCATTER_W}
              height={SCATTER_H}
              points={points}
              xLabel="x₁"
              yLabel="x₂"
              xRange={X_RANGE}
              yRange={Y_RANGE}
            >
              {(sx: ScaleFn, sy: ScaleFn) => {
                const plotW = SCATTER_W - PADDING.left - PADDING.right;
                const plotH = SCATTER_H - PADDING.top - PADDING.bottom;
                const xMin = X_RANGE[0], xMax = X_RANGE[1];
                const yMin = Y_RANGE[0], yMax = Y_RANGE[1];

                const tiles: React.ReactNode[] = [];
                const tileW = plotW / GRID_SIZE;
                const tileH = plotH / GRID_SIZE;

                for (let gi = 0; gi < GRID_SIZE; gi++) {
                  for (let gj = 0; gj < GRID_SIZE; gj++) {
                    const x1 = xMin + (gi + 0.5) / GRID_SIZE * (xMax - xMin);
                    const x2 = yMin + (gj + 0.5) / GRID_SIZE * (yMax - yMin);
                    const cls = forwardPass(x1, x2, weightsIH, weightsHO, biasH, biasO);
                    const color = DEFAULT_COLORS[cls];

                    tiles.push(
                      <rect
                        key={`${gi}-${gj}`}
                        x={PADDING.left + gi * tileW}
                        y={PADDING.top + (GRID_SIZE - 1 - gj) * tileH}
                        width={tileW}
                        height={tileH}
                        fill={color}
                        opacity={0.22}
                      />
                    );
                  }
                }

                return <>{tiles}</>;
              }}
            </ScatterPlot>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Cross-Entropy Loss
            </h4>
            <LossCurve
              losses={losses}
              currentStep={step}
              width={300}
              height={200}
              yLabel="CE Loss"
            />
            <div className="mt-2 text-xs font-mono text-muted space-y-1">
              <p>Epoch: {current.epoch}</p>
              <p>Loss: {loss.toFixed(3)}</p>
              <p>Phase: {current.phase}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted">
          {[0, 1, 2, 3].map((cls) => (
            <span key={cls} className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: DEFAULT_COLORS[cls] }} />
              Class {cls}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#818cf8", opacity: 0.5 }} />
            Positive weight
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: "#ef4444", opacity: 0.5 }} />
            Negative weight
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
