"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  description?: string;
}

export default function StepControls({
  currentStep,
  totalSteps,
  onStepChange,
  description,
}: StepControlsProps) {
  const [playing, setPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        onStepChange(-1); // -1 signals "next"
      }, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, speed, onStepChange]);

  useEffect(() => {
    if (playing && currentStep >= totalSteps - 1) {
      if (looping) {
        onStepChange(0);
      } else {
        stop();
      }
    }
  }, [currentStep, totalSteps, playing, looping, stop, onStepChange]);

  const handlePrev = () => {
    stop();
    if (currentStep > 0) onStepChange(currentStep - 1);
  };

  const handleNext = () => {
    stop();
    if (currentStep < totalSteps - 1) onStepChange(currentStep + 1);
  };

  const handlePlay = () => {
    if (playing) {
      stop();
    } else {
      if (currentStep >= totalSteps - 1) onStepChange(0);
      setPlaying(true);
    }
  };

  const handleReset = () => {
    stop();
    onStepChange(0);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={handleReset}
          className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium hover:bg-accent-light transition-colors"
          title="Reset"
        >
          Reset
        </button>
        <button
          onClick={handlePrev}
          disabled={currentStep <= 0}
          className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium hover:bg-accent-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          onClick={handlePlay}
          className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
            playing
              ? "bg-red-500/10 text-red-500 border border-red-500/30"
              : "bg-accent text-white"
          }`}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setLooping(!looping)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors border ${
            looping
              ? "bg-accent/10 text-accent border-accent/30"
              : "border-card-border text-foreground/70 hover:bg-accent-light"
          }`}
          title="Toggle loop"
        >
          Loop
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep >= totalSteps - 1}
          className="rounded-lg border border-card-border px-3 py-1.5 text-xs font-medium hover:bg-accent-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <span className="text-xs text-muted ml-2">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="ml-auto rounded border border-card-border bg-card-bg px-2 py-1 text-xs"
        >
          <option value={2000}>0.5x</option>
          <option value={1000}>1x</option>
          <option value={500}>2x</option>
          <option value={250}>4x</option>
        </select>
      </div>
      {description && (
        <p className="text-sm text-muted bg-card-bg border border-card-border rounded-lg px-4 py-2">
          {description}
        </p>
      )}
    </div>
  );
}
