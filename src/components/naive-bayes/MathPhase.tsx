"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function NaiveBayesMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Bayes' theorem, conditional independence, and Gaussian likelihood"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Bayes&apos; Theorem</h3>
          <p className="text-muted mb-4">
            Classification by posterior probability. We want the class{" "}
            <MathBlock tex="C_k" /> that maximizes the probability given the
            observed features:
          </p>
          <MathBlock
            tex="P(C_k | x) = \frac{P(x | C_k)\, P(C_k)}{P(x)}"
            display
          />
          <p className="text-muted mt-4">
            Since <MathBlock tex="P(x)" /> is constant across classes, we only
            need to maximize the numerator:{" "}
            <MathBlock tex="P(x|C_k)\,P(C_k)" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Conditional Independence</h3>
          <p className="text-muted mb-4">
            The &ldquo;naive&rdquo; assumption: features are independent given
            the class label. This factorizes the joint likelihood:
          </p>
          <MathBlock
            tex="P(x | C_k) = \prod_{j=1}^{d} P(x_j | C_k)"
            display
          />
          <p className="text-muted mt-4">
            This is rarely true in practice, yet Naive Bayes often performs
            surprisingly well — especially in high dimensions where estimating
            the full joint is infeasible.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Gaussian Likelihood</h3>
          <p className="text-muted mb-4">
            For continuous features we model each feature as Gaussian:{" "}
            <MathBlock tex="x_j | C_k \sim \mathcal{N}(\mu_{kj}, \sigma_{kj}^2)" />:
          </p>
          <MathBlock
            tex="P(x_j | C_k) = \frac{1}{\sqrt{2\pi}\,\sigma_{kj}} \exp\!\left(-\frac{(x_j - \mu_{kj})^2}{2\sigma_{kj}^2}\right)"
            display
          />
          <p className="text-muted mt-4">
            Parameters <MathBlock tex="\mu_{kj}" /> and{" "}
            <MathBlock tex="\sigma_{kj}" /> are estimated from the training
            points in class <MathBlock tex="k" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Log Posterior</h3>
          <p className="text-muted mb-4">
            To avoid numerical underflow with many features, work in log
            space. The prediction is:
          </p>
          <MathBlock
            tex="\hat{y} = \arg\max_k \!\left[\log P(C_k) + \sum_{j=1}^d \log P(x_j | C_k)\right]"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Where It Shines</h4>
            <p className="text-sm text-muted">
              Despite the naive independence assumption, Naive Bayes excels at
              text classification (spam filters, sentiment analysis) where
              features are bag-of-words counts. It also trains in{" "}
              <MathBlock tex="O(nd)" /> — a single pass through the data — and
              handles missing features gracefully.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
