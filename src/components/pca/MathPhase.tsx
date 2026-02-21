"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function PCAMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Variance maximization, covariance matrix, and eigendecomposition"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Variance Maximization</h3>
          <p className="text-muted mb-4">
            PCA finds the direction{" "}
            <MathBlock tex="v_1" /> that maximizes the variance of the
            projected data:
          </p>
          <MathBlock
            tex="v_1 = \arg\max_{\|v\|=1}\; v^\top \Sigma v"
            display
          />
          <p className="text-muted mt-4">
            This is equivalent to finding the leading eigenvector of the
            covariance matrix <MathBlock tex="\Sigma" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Covariance Matrix</h3>
          <p className="text-muted mb-4">
            First center the data: <MathBlock tex="\tilde{x}_i = x_i - \bar{x}" />.
            The sample covariance matrix is:
          </p>
          <MathBlock
            tex="\Sigma = \frac{1}{n-1}\tilde{X}^\top\tilde{X}"
            display
          />
          <p className="text-muted mt-4">
            Entry <MathBlock tex="\Sigma_{jk}" /> measures how features{" "}
            <MathBlock tex="j" /> and <MathBlock tex="k" /> co-vary. Diagonal
            entries are the per-feature variances.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Eigendecomposition</h3>
          <p className="text-muted mb-4">
            Decompose the symmetric covariance matrix into its eigenvectors
            (principal directions) and eigenvalues (explained variances):
          </p>
          <MathBlock
            tex="\Sigma = V \Lambda V^\top"
            display
          />
          <p className="text-muted mt-4">
            Columns of <MathBlock tex="V" /> are orthonormal eigenvectors;{" "}
            <MathBlock tex="\Lambda = \text{diag}(\lambda_1,\ldots,\lambda_d)" />{" "}
            with <MathBlock tex="\lambda_1 \geq \lambda_2 \geq \cdots" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Projection</h3>
          <p className="text-muted mb-4">
            Project the centered data onto the top{" "}
            <MathBlock tex="k" /> principal components to get the
            lower-dimensional representation:
          </p>
          <MathBlock
            tex="Z = \tilde{X} V_k \in \mathbb{R}^{n \times k}"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Choosing k — Scree Plot</h4>
            <p className="text-sm text-muted">
              Plot the eigenvalues in decreasing order; look for the "elbow"
              where the curve flattens. The fraction of variance explained by
              k components is{" "}
              <MathBlock tex="\sum_{j=1}^k \lambda_j \;/\; \sum_j \lambda_j" />.
              A common rule of thumb is to retain enough components to explain
              95% of the total variance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
