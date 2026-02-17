"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function LinearRegressionMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Linear model, MSE loss, and gradient descent optimization"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">The Model</h3>
          <p className="text-muted mb-4">
            Linear regression fits a line <MathBlock tex="\hat{y} = wx + b" /> to
            data points <MathBlock tex="(x_i, y_i)" /> by finding the weight{" "}
            <MathBlock tex="w" /> and bias <MathBlock tex="b" /> that best explain
            the relationship.
          </p>
          <MathBlock tex="\hat{y}_i = w x_i + b" display />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Loss Function: Mean Squared Error</h3>
          <p className="text-muted mb-4">
            We measure how wrong our predictions are using the average squared
            difference between predicted <MathBlock tex="\hat{y}_i" /> and actual{" "}
            <MathBlock tex="y_i" />:
          </p>
          <MathBlock
            tex="\mathcal{L}(w,b) = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i)^2"
            display
          />
          <p className="text-muted mt-4">
            This is a convex function in <MathBlock tex="w" /> and{" "}
            <MathBlock tex="b" />, so gradient descent is guaranteed to find
            the global minimum.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Gradient Descent</h3>
          <p className="text-muted mb-4">
            We compute the partial derivatives and update parameters in the
            direction of steepest descent:
          </p>
          <MathBlock
            tex="\frac{\partial \mathcal{L}}{\partial w} = \frac{2}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i) \cdot x_i"
            display
          />
          <MathBlock
            tex="\frac{\partial \mathcal{L}}{\partial b} = \frac{2}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i)"
            display
            className="mt-4"
          />
          <p className="text-muted mt-4">
            Update rule with learning rate <MathBlock tex="\alpha" />:
          </p>
          <MathBlock
            tex="w \leftarrow w - \alpha \frac{\partial \mathcal{L}}{\partial w}, \quad b \leftarrow b - \alpha \frac{\partial \mathcal{L}}{\partial b}"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Convergence</h3>
          <p className="text-muted mb-4">
            Since MSE is convex, gradient descent converges to the global minimum.
            The optimal solution can also be found analytically via the normal equation:
          </p>
          <MathBlock
            tex="w^* = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2}, \quad b^* = \bar{y} - w^*\bar{x}"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Why Gradient Descent?</h4>
            <p className="text-sm text-muted">
              While the normal equation works for simple linear regression, gradient
              descent scales to millions of features and is the foundation for
              training neural networks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
