"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function LogisticRegressionMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Sigmoid function, cross-entropy loss, and gradient descent"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">The Sigmoid Function</h3>
          <p className="text-muted mb-4">
            Logistic regression maps a linear combination{" "}
            <MathBlock tex="z = w^T x + b" /> through the sigmoid function to
            produce a probability:
          </p>
          <MathBlock
            tex="\sigma(z) = \frac{1}{1 + e^{-z}} \in (0, 1)"
            display
          />
          <p className="text-muted mt-4">
            This gives <MathBlock tex="P(y=1|x) = \sigma(w^Tx + b)" />.
            We classify as 1 when <MathBlock tex="\sigma(z) \geq 0.5" />,
            equivalently when <MathBlock tex="z \geq 0" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Binary Cross-Entropy Loss</h3>
          <p className="text-muted mb-4">
            The loss function penalizes confident wrong predictions heavily:
          </p>
          <MathBlock
            tex="\mathcal{L} = -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \log(\sigma(z_i)) + (1 - y_i)\log(1 - \sigma(z_i))\right]"
            display
          />
          <p className="text-muted mt-4">
            When <MathBlock tex="y_i = 1" />, only the{" "}
            <MathBlock tex="\log \sigma(z_i)" /> term remains, pushing{" "}
            <MathBlock tex="\sigma(z_i)" /> toward 1. Vice versa for{" "}
            <MathBlock tex="y_i = 0" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Gradient Descent</h3>
          <p className="text-muted mb-4">
            The gradient has an elegant form identical in structure to linear
            regression:
          </p>
          <MathBlock
            tex="\nabla_w \mathcal{L} = \frac{1}{n}\sum_{i=1}^{n}(\sigma(z_i) - y_i) \cdot x_i"
            display
          />
          <MathBlock
            tex="\frac{\partial \mathcal{L}}{\partial b} = \frac{1}{n}\sum_{i=1}^{n}(\sigma(z_i) - y_i)"
            display
            className="mt-4"
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Connection to Linear Regression</h4>
            <p className="text-sm text-muted">
              The gradient <MathBlock tex="\frac{1}{n}X^T(\hat{y} - y)" /> has the
              same form for both linear and logistic regression! The only difference
              is that <MathBlock tex="\hat{y} = \sigma(Xw + b)" /> passes through
              the sigmoid, while in linear regression <MathBlock tex="\hat{y} = Xw + b" />.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Decision Boundary</h3>
          <p className="text-muted mb-4">
            The decision boundary is where <MathBlock tex="\sigma(z) = 0.5" />,
            i.e. <MathBlock tex="z = 0" />:
          </p>
          <MathBlock
            tex="w_1 x_1 + w_2 x_2 + b = 0 \quad\Rightarrow\quad x_2 = -\frac{w_1}{w_2}x_1 - \frac{b}{w_2}"
            display
          />
          <p className="text-muted mt-4">
            This is a straight line in 2D, or a hyperplane in higher dimensions.
          </p>
        </div>
      </div>
    </section>
  );
}
