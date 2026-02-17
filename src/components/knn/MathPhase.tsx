"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function KnnMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Distance metrics, majority voting, and the bias-variance tradeoff"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Problem Definition</h3>
          <p className="text-muted mb-4">
            Given <MathBlock tex="n" /> labeled training points{" "}
            <MathBlock tex="(x_i, y_i)" /> and a new query point{" "}
            <MathBlock tex="q" />, classify <MathBlock tex="q" /> based on the
            labels of its <MathBlock tex="k" /> nearest neighbors.
          </p>
          <MathBlock
            tex="\hat{y}(q) = \arg\max_c \sum_{x_i \in \mathcal{N}_k(q)} \mathbb{1}[y_i = c]"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Euclidean Distance</h3>
          <p className="text-muted mb-4">
            The distance between two points in <MathBlock tex="d" />-dimensional
            space:
          </p>
          <MathBlock
            tex="d(q, x_i) = \sqrt{\sum_{j=1}^{d}(q_j - x_{ij})^2}"
            display
          />
          <p className="text-muted mt-4">
            For 2D data, this simplifies to the familiar formula:{" "}
            <MathBlock tex="d = \sqrt{(\Delta x)^2 + (\Delta y)^2}" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Choosing k: Bias-Variance Tradeoff</h3>
          <p className="text-muted mb-4">
            The choice of <MathBlock tex="k" /> controls model complexity:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Small k</strong> (e.g., k=1): Low bias, high variance. The
              decision boundary is jagged and sensitive to noise.
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Large k</strong> (e.g., k=n): High bias, low variance.
              The model always predicts the majority class.
            </p>
          </div>
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">No Training Phase</h4>
            <p className="text-sm text-muted">
              KNN is a <em>lazy learner</em> — it stores all training data and
              defers computation to prediction time. Prediction cost is{" "}
              <MathBlock tex="O(nd)" /> for <MathBlock tex="n" /> points in{" "}
              <MathBlock tex="d" /> dimensions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
