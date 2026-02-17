"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function DecisionTreeMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Entropy, information gain, and recursive partitioning"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Entropy</h3>
          <p className="text-muted mb-4">
            Entropy measures the <em>impurity</em> of a set of labels. A pure
            set (all same class) has entropy 0; a perfectly balanced set has
            maximum entropy:
          </p>
          <MathBlock
            tex="H(S) = -\sum_{c=1}^{C} p_c \log_2 p_c"
            display
          />
          <p className="text-muted mt-4">
            where <MathBlock tex="p_c = |S_c|/|S|" /> is the proportion of
            class <MathBlock tex="c" /> in set <MathBlock tex="S" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Information Gain</h3>
          <p className="text-muted mb-4">
            We split on the feature and threshold that maximize the reduction in
            entropy:
          </p>
          <MathBlock
            tex="IG(S, f, t) = H(S) - \frac{|S_L|}{|S|}H(S_L) - \frac{|S_R|}{|S|}H(S_R)"
            display
          />
          <p className="text-muted mt-4">
            where <MathBlock tex="S_L = \{x \in S : x_f \leq t\}" /> and{" "}
            <MathBlock tex="S_R = S \setminus S_L" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Recursive Splitting</h3>
          <p className="text-muted mb-4">
            The tree is built top-down by greedily selecting the best split at each
            node, then recursing on each partition:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              Find <MathBlock tex="f^*, t^* = \arg\max_{f,t} IG(S, f, t)" />
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              Split: <MathBlock tex="S_L, S_R" /> based on{" "}
              <MathBlock tex="x_{f^*} \leq t^*" />
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              Recurse until leaves are pure or max depth is reached
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Gini Impurity (Alternative)</h3>
          <p className="text-muted mb-4">
            An alternative to entropy, often used in CART trees:
          </p>
          <MathBlock
            tex="G(S) = 1 - \sum_{c=1}^{C} p_c^2"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Entropy vs. Gini</h4>
            <p className="text-sm text-muted">
              In practice, entropy and Gini produce very similar trees. Gini is
              slightly faster to compute (no logarithm). Scikit-learn uses Gini
              by default.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
