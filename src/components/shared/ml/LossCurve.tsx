"use client";

import { motion } from "framer-motion";

interface LossCurveProps {
  losses: number[];
  currentStep: number;
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  className?: string;
}

const PADDING = { top: 15, right: 15, bottom: 35, left: 50 };

export default function LossCurve({
  losses,
  currentStep,
  width = 400,
  height = 200,
  xLabel = "Iteration",
  yLabel = "Loss",
  color = "#818cf8",
  className = "",
}: LossCurveProps) {
  const plotW = width - PADDING.left - PADDING.right;
  const plotH = height - PADDING.top - PADDING.bottom;

  if (losses.length === 0) return null;

  const maxLoss = Math.max(...losses) * 1.1;
  const minLoss = 0;
  const maxIter = Math.max(losses.length - 1, 1);

  const scaleX = (i: number) => PADDING.left + (i / maxIter) * plotW;
  const scaleY = (v: number) => PADDING.top + plotH - ((v - minLoss) / (maxLoss - minLoss)) * plotH;

  // Build path up to currentStep
  const visibleLosses = losses.slice(0, currentStep + 1);
  const pathD = visibleLosses
    .map((l, i) => `${i === 0 ? "M" : "L"} ${scaleX(i).toFixed(1)} ${scaleY(l).toFixed(1)}`)
    .join(" ");

  // Tick marks
  const yTicks = 4;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => minLoss + (i / yTicks) * (maxLoss - minLoss));

  return (
    <svg width={width} height={height} className={`overflow-visible ${className}`}>
      {/* Grid */}
      {yTickVals.map((v, i) => (
        <line key={i} x1={PADDING.left} y1={scaleY(v)} x2={PADDING.left + plotW} y2={scaleY(v)} stroke="#2a2a2a" strokeWidth={0.5} />
      ))}

      {/* Axes */}
      <line x1={PADDING.left} y1={PADDING.top + plotH} x2={PADDING.left + plotW} y2={PADDING.top + plotH} stroke="#4b5563" strokeWidth={1} />
      <line x1={PADDING.left} y1={PADDING.top} x2={PADDING.left} y2={PADDING.top + plotH} stroke="#4b5563" strokeWidth={1} />

      {/* Labels */}
      <text x={PADDING.left + plotW / 2} y={height - 5} textAnchor="middle" className="text-[11px]" fill="#6b7280">{xLabel}</text>
      <text x={14} y={PADDING.top + plotH / 2} textAnchor="middle" className="text-[11px]" fill="#6b7280" transform={`rotate(-90, 14, ${PADDING.top + plotH / 2})`}>{yLabel}</text>

      {/* Y tick labels */}
      {yTickVals.map((v, i) => (
        <text key={i} x={PADDING.left - 8} y={scaleY(v) + 3} textAnchor="end" className="text-[9px] font-mono" fill="#6b7280">
          {v.toFixed(2)}
        </text>
      ))}

      {/* Loss curve */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current point dot */}
      {visibleLosses.length > 0 && (
        <motion.circle
          cx={scaleX(currentStep)}
          cy={scaleY(visibleLosses[visibleLosses.length - 1])}
          r={4}
          fill={color}
          animate={{
            cx: scaleX(currentStep),
            cy: scaleY(visibleLosses[visibleLosses.length - 1]),
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </svg>
  );
}
