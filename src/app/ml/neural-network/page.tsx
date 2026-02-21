import NeuralNetworkMathPhase from "@/components/neural-network/MathPhase";
import NeuralNetworkVisualPhase from "@/components/neural-network/VisualPhase";
import NeuralNetworkCodePhase from "@/components/neural-network/CodePhase";

export const metadata = {
  title: "Neural Network — KLAR",
};

export default function NeuralNetworkPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Neural Network</h1>
        <p className="text-muted text-lg">
          Multi-layer perceptron that learns nonlinear decision boundaries via
          backpropagation.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Deep Learning
          </span>
        </div>
      </div>

      <NeuralNetworkMathPhase />
      <NeuralNetworkVisualPhase />
      <NeuralNetworkCodePhase />
    </div>
  );
}
