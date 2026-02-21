"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function SVMMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Maximum margin hyperplane, support vectors, and the primal objective"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Decision Function</h3>
          <p className="text-muted mb-4">
            SVM classifies a point by the sign of its distance from the decision
            hyperplane{" "}
            <MathBlock tex="\mathbf{w}^\top x + b = 0" />:
          </p>
          <MathBlock
            tex="\hat{y}(x) = \text{sign}(\mathbf{w}^\top x + b)"
            display
          />
          <p className="text-muted mt-4">
            Points with <MathBlock tex="\mathbf{w}^\top x + b > 0" /> are
            classified as class +1, and points with a negative value as class
            −1.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Maximum Margin</h3>
          <p className="text-muted mb-4">
            The geometric margin — the perpendicular distance between the two
            parallel margin hyperplanes — is:
          </p>
          <MathBlock
            tex="\gamma = \frac{2}{\|\mathbf{w}\|}"
            display
          />
          <p className="text-muted mt-4">
            SVM finds the <em>maximum-margin</em> hyperplane: the one that
            maximizes <MathBlock tex="\gamma" />, pushing the two class clouds
            as far apart as possible.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Primal Objective</h3>
          <p className="text-muted mb-4">
            Maximizing the margin is equivalent to minimizing{" "}
            <MathBlock tex="\|\mathbf{w}\|^2" /> subject to all points being
            correctly classified outside the margin:
          </p>
          <MathBlock
            tex="\min_{\mathbf{w},b}\; \frac{1}{2}\|\mathbf{w}\|^2 \quad \text{s.t.}\; y_i(\mathbf{w}^\top x_i + b) \geq 1 \;\forall i"
            display
          />
          <p className="text-muted mt-4">
            The soft-margin variant adds slack variables{" "}
            <MathBlock tex="\xi_i \geq 0" /> and a penalty{" "}
            <MathBlock tex="C\sum_i \xi_i" /> to tolerate some
            misclassifications.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Support Vectors</h3>
          <p className="text-muted mb-4">
            The solution depends <em>only</em> on the points lying on the margin
            boundaries (support vectors). The weight vector is their weighted
            sum:
          </p>
          <MathBlock
            tex="\mathbf{w} = \sum_{i \in SV} \alpha_i y_i x_i"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Kernel Trick</h4>
            <p className="text-sm text-muted">
              Replace <MathBlock tex="x_i^\top x_j" /> with a kernel{" "}
              <MathBlock tex="K(x_i, x_j) = \phi(x_i)^\top\phi(x_j)" /> to
              implicitly operate in a high-dimensional feature space — enabling
              nonlinear decision boundaries without ever computing{" "}
              <MathBlock tex="\phi(x)" /> explicitly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
