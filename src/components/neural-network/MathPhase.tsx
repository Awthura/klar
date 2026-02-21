"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function NeuralNetworkMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Layered transformations, sigmoid activation, and backpropagation"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Network Architecture</h3>
          <p className="text-muted mb-4">
            A multi-layer perceptron (MLP) stacks linear transformations with
            nonlinear activations. Each layer{" "}
            <MathBlock tex="l" /> computes:
          </p>
          <MathBlock
            tex="h^{(l)} = \sigma\!\left(W^{(l)} h^{(l-1)} + b^{(l)}\right)"
            display
          />
          <p className="text-muted mt-4">
            where <MathBlock tex="h^{(0)} = x" /> (the input). Stacking layers
            allows the network to compose simple functions into highly nonlinear
            decision boundaries.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Sigmoid Activation</h3>
          <p className="text-muted mb-4">
            The sigmoid squashes any real value into{" "}
            <MathBlock tex="(0,1)" /> and has a convenient derivative:
          </p>
          <MathBlock
            tex="\sigma(z) = \frac{1}{1+e^{-z}}, \quad \sigma'(z) = \sigma(z)(1-\sigma(z))"
            display
          />
          <p className="text-muted mt-4">
            The self-referential derivative means we can reuse already-computed
            activations during backpropagation — no redundant computation.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Forward Pass &amp; Loss</h3>
          <p className="text-muted mb-4">
            For binary classification, the final output uses sigmoid and the
            binary cross-entropy loss penalizes confident errors:
          </p>
          <MathBlock
            tex="\mathcal{L} = -\frac{1}{n}\sum_{i=1}^n\left[y_i\log\hat{y}_i + (1-y_i)\log(1-\hat{y}_i)\right]"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Backpropagation</h3>
          <p className="text-muted mb-4">
            Gradients flow backwards via the chain rule. The weight gradient
            for layer <MathBlock tex="l" /> is:
          </p>
          <MathBlock
            tex="\frac{\partial\mathcal{L}}{\partial W^{(l)}} = \frac{1}{n}\, h^{(l-1)\top} \delta^{(l)}"
            display
          />
          <p className="text-muted mt-4">
            where the error signal{" "}
            <MathBlock tex="\delta^{(l)}" /> propagates backward:{" "}
            <MathBlock tex="\delta^{(l)} = (W^{(l+1)\top}\delta^{(l+1)}) \odot \sigma'(h^{(l)})" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Universal Approximation</h3>
          <p className="text-muted mb-4">
            A single hidden layer with enough neurons can approximate any
            continuous function on a compact domain to arbitrary precision:
          </p>
          <MathBlock
            tex="\forall\;\epsilon > 0,\;\exists\; N:\; \sup_x |f(x) - h_N(x)| < \epsilon"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Use ReLU in Practice</h4>
            <p className="text-sm text-muted">
              Although sigmoid is intuitive, production networks prefer{" "}
              <MathBlock tex="\text{ReLU}(z) = \max(0, z)" /> in hidden layers.
              ReLU avoids the vanishing gradient problem that plagues deep
              sigmoid networks — gradients don&apos;t saturate near 0 or 1.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
