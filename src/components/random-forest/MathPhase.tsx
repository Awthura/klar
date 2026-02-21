"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function RandomForestMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Bootstrap aggregation, feature subsampling, and variance reduction"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Bias-Variance Decomposition</h3>
          <p className="text-muted mb-4">
            Averaging <MathBlock tex="T" /> uncorrelated models each with variance{" "}
            <MathBlock tex="\sigma^2" /> reduces variance by{" "}
            <MathBlock tex="1/T" />. With correlation{" "}
            <MathBlock tex="\rho" /> between trees:
          </p>
          <MathBlock
            tex="\text{Var}(\bar{h}) \xrightarrow{T\to\infty} \rho\sigma^2"
            display
          />
          <p className="text-muted mt-4">
            Random feature subsampling decorrelates trees (reduces{" "}
            <MathBlock tex="\rho" />), so the ensemble variance shrinks even
            further than plain bagging.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Bootstrap Sampling</h3>
          <p className="text-muted mb-4">
            Each tree trains on a bootstrap sample: <MathBlock tex="n" /> points
            drawn with replacement from the training set. On average, each
            sample omits about 36.8% of the original points (OOB set):
          </p>
          <MathBlock
            tex="P(\text{not sampled}) = \left(1 - \frac{1}{n}\right)^n \to e^{-1} \approx 0.368"
            display
          />
          <p className="text-muted mt-4">
            The left-out OOB (out-of-bag) points serve as a free validation
            set.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Feature Subsampling</h3>
          <p className="text-muted mb-4">
            At each split, only a random subset of features is considered. For
            classification with <MathBlock tex="d" /> features, the standard
            choice is:
          </p>
          <MathBlock
            tex="m = \lfloor\sqrt{d}\rfloor"
            display
          />
          <p className="text-muted mt-4">
            This prevents any single dominant feature from appearing in every
            tree, creating diverse, decorrelated trees.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Majority Vote</h3>
          <p className="text-muted mb-4">
            For classification, the final prediction is the class chosen by
            the most trees:
          </p>
          <MathBlock
            tex="\hat{y}(x) = \text{mode}\{\hat{y}_t(x)\}_{t=1}^T"
            display
          />
          <p className="text-muted mt-4">
            For regression, trees are averaged:{" "}
            <MathBlock tex="\hat{y}(x) = \frac{1}{T}\sum_{t=1}^T \hat{y}_t(x)" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">OOB Error</h3>
          <p className="text-muted mb-4">
            Each data point can be evaluated by the trees that did not train on
            it, giving an unbiased estimate of generalization error:
          </p>
          <MathBlock
            tex="\text{OOB error} = \frac{1}{n}\sum_i \mathbf{1}[\hat{y}_{\text{OOB}}(x_i) \neq y_i]"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Free Feature Importance</h4>
            <p className="text-sm text-muted">
              Feature importance can be computed by measuring how much OOB
              error increases when a feature's values are randomly permuted —
              no separate validation set required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
