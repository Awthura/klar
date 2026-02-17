"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function KMeansMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="WCSS objective, assignment step, update step, and convergence"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Objective: Within-Cluster Sum of Squares</h3>
          <p className="text-muted mb-4">
            K-Means seeks to partition <MathBlock tex="n" /> data points into{" "}
            <MathBlock tex="k" /> clusters <MathBlock tex="C_1, \ldots, C_k" />{" "}
            by minimizing the total distance from each point to its cluster centroid:
          </p>
          <MathBlock
            tex="\text{WCSS} = \sum_{j=1}^{k}\sum_{x_i \in C_j} \|x_i - \mu_j\|^2"
            display
          />
          <p className="text-muted mt-4">
            where <MathBlock tex="\mu_j" /> is the centroid (mean) of cluster{" "}
            <MathBlock tex="C_j" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Lloyd&apos;s Algorithm: Two Alternating Steps</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">1. Assignment Step</h4>
              <p className="text-muted mb-2">
                Assign each point to the nearest centroid:
              </p>
              <MathBlock
                tex="c_i = \arg\min_j \|x_i - \mu_j\|^2"
                display
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">2. Update Step</h4>
              <p className="text-muted mb-2">
                Recompute each centroid as the mean of its assigned points:
              </p>
              <MathBlock
                tex="\mu_j = \frac{1}{|C_j|}\sum_{x_i \in C_j} x_i"
                display
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Convergence</h3>
          <p className="text-muted mb-4">
            Each step decreases (or maintains) WCSS, so the algorithm is guaranteed
            to converge. However, it may converge to a <em>local</em> minimum:
          </p>
          <MathBlock
            tex="\text{WCSS}^{(t+1)} \leq \text{WCSS}^{(t)}"
            display
          />
          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">K-Means++ Initialization</h4>
            <p className="text-sm text-muted">
              Random initialization can lead to poor local minima. K-Means++
              selects initial centroids spread apart, giving{" "}
              <MathBlock tex="O(\log k)" /> competitive ratio in expectation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
