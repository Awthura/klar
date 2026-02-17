"use client";

import { motion } from "framer-motion";

export interface Point {
  x: number;
  y: number;
  label?: number; // class label for classification
}

export type ScaleFn = (v: number) => number;

interface ScatterPlotProps {
  width?: number;
  height?: number;
  points: Point[];
  xLabel?: string;
  yLabel?: string;
  xRange?: [number, number];
  yRange?: [number, number];
  pointColors?: string[];
  highlightIndices?: number[];
  highlightColor?: string;
  className?: string;
  children?: ((scaleX: ScaleFn, scaleY: ScaleFn) => React.ReactNode) | React.ReactNode;
}

const PADDING = { top: 20, right: 20, bottom: 40, left: 50 };

const DEFAULT_COLORS = ["#818cf8", "#f59e0b", "#22c55e", "#ef4444", "#06b6d4"];

export default function ScatterPlot({
  width = 500,
  height = 350,
  points,
  xLabel = "x₁",
  yLabel = "x₂",
  xRange,
  yRange,
  pointColors,
  highlightIndices = [],
  highlightColor = "#fff",
  className = "",
  children,
}: ScatterPlotProps) {
  const plotW = width - PADDING.left - PADDING.right;
  const plotH = height - PADDING.top - PADDING.bottom;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const [xMin, xMax] = xRange ?? [Math.min(...xs) - 0.5, Math.max(...xs) + 0.5];
  const [yMin, yMax] = yRange ?? [Math.min(...ys) - 0.5, Math.max(...ys) + 0.5];

  const scaleX: ScaleFn = (v) => PADDING.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const scaleY: ScaleFn = (v) => PADDING.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  // Tick marks
  const xTicks = 5;
  const yTicks = 5;
  const xTickVals = Array.from({ length: xTicks + 1 }, (_, i) => xMin + (i / xTicks) * (xMax - xMin));
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => yMin + (i / yTicks) * (yMax - yMin));

  // Resolve children — render-prop or static
  const resolvedChildren = typeof children === "function" ? children(scaleX, scaleY) : children;

  return (
    <svg width={width} height={height} className={`overflow-visible ${className}`}>
      {/* Clip path for overlays */}
      <defs>
        <clipPath id={`plot-clip-${width}-${height}`}>
          <rect x={PADDING.left} y={PADDING.top} width={plotW} height={plotH} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {xTickVals.map((v, i) => (
        <line key={`xg${i}`} x1={scaleX(v)} y1={PADDING.top} x2={scaleX(v)} y2={PADDING.top + plotH} stroke="#2a2a2a" strokeWidth={0.5} />
      ))}
      {yTickVals.map((v, i) => (
        <line key={`yg${i}`} x1={PADDING.left} y1={scaleY(v)} x2={PADDING.left + plotW} y2={scaleY(v)} stroke="#2a2a2a" strokeWidth={0.5} />
      ))}

      {/* Axes */}
      <line x1={PADDING.left} y1={PADDING.top + plotH} x2={PADDING.left + plotW} y2={PADDING.top + plotH} stroke="#4b5563" strokeWidth={1} />
      <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + plotH} stroke="#4b5563" strokeWidth={1} />

      {/* Axis labels */}
      <text x={PADDING.left + plotW / 2} y={height - 5} textAnchor="middle" className="text-[11px]" fill="#6b7280">{xLabel}</text>
      <text x={14} y={PADDING.top + plotH / 2} textAnchor="middle" className="text-[11px]" fill="#6b7280" transform={`rotate(-90, 14, ${PADDING.top + plotH / 2})`}>{yLabel}</text>

      {/* Tick labels */}
      {xTickVals.map((v, i) => (
        <text key={`xt${i}`} x={scaleX(v)} y={PADDING.top + plotH + 16} textAnchor="middle" className="text-[9px] font-mono" fill="#6b7280">
          {v.toFixed(1)}
        </text>
      ))}
      {yTickVals.map((v, i) => (
        <text key={`yt${i}`} x={PADDING.left - 8} y={scaleY(v) + 3} textAnchor="end" className="text-[9px] font-mono" fill="#6b7280">
          {v.toFixed(1)}
        </text>
      ))}

      {/* Overlay children (lines, regions, etc.) rendered behind points but above grid */}
      {resolvedChildren}

      {/* Points */}
      {points.map((p, i) => {
        const isHighlighted = highlightIndices.includes(i);
        const color = pointColors
          ? pointColors[i]
          : p.label !== undefined
          ? DEFAULT_COLORS[p.label % DEFAULT_COLORS.length]
          : DEFAULT_COLORS[0];

        return (
          <motion.circle
            key={i}
            cx={scaleX(p.x)}
            cy={scaleY(p.y)}
            r={isHighlighted ? 6 : 4}
            fill={isHighlighted ? highlightColor : color}
            stroke={isHighlighted ? highlightColor : "none"}
            strokeWidth={isHighlighted ? 2 : 0}
            opacity={0.9}
            animate={{
              cx: scaleX(p.x),
              cy: scaleY(p.y),
              r: isHighlighted ? 6 : 4,
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </svg>
  );
}

export { PADDING, DEFAULT_COLORS };
export type { ScatterPlotProps };
