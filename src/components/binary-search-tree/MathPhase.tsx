"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function BstMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="BST property, insertion and search, and height analysis"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">BST Property</h3>
          <p className="text-muted mb-4">
            For every node <MathBlock tex="v" /> in a Binary Search Tree:
          </p>
          <MathBlock
            tex="\forall\, u \in \text{left}(v): u.\text{key} < v.\text{key} \quad \text{and} \quad \forall\, w \in \text{right}(v): w.\text{key} \geq v.\text{key}"
            display
          />
          <p className="text-muted mt-4">
            This invariant enables efficient search by eliminating half the remaining
            tree at each comparison.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Search</h3>
          <p className="text-muted mb-4">
            To search for key <MathBlock tex="k" />, compare with the current node and
            recurse:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="k = v.\text{key}" />: found
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="k < v.\text{key}" />: search left subtree
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="k > v.\text{key}" />: search right subtree
            </p>
          </div>
          <MathBlock tex="T_{\text{search}} = O(h)" display />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Insertion</h3>
          <p className="text-muted mb-4">
            Insertion follows the same path as search. When we reach a{" "}
            <MathBlock tex="\text{nil}" /> pointer, we create a new leaf node:
          </p>
          <MathBlock
            tex="\text{insert}(v, k) = \begin{cases} \text{Node}(k) & \text{if } v = \text{nil} \\ \text{insert left} & \text{if } k < v.\text{key} \\ \text{insert right} & \text{otherwise} \end{cases}"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Height Analysis</h3>
          <p className="text-muted mb-4">
            All operations take <MathBlock tex="O(h)" /> time, where{" "}
            <MathBlock tex="h" /> is the tree height:
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-green-400">Best case (balanced):</strong>{" "}
              <MathBlock tex="h = \lfloor \log_2 n \rfloor \Rightarrow O(\log n)" />
            </p>
            <p>
              <strong className="text-red-400">Worst case (degenerate):</strong>{" "}
              <MathBlock tex="h = n - 1 \Rightarrow O(n)" />{" "}
              (inserting sorted data creates a linked list)
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              Self-balancing trees (AVL, Red-Black) guarantee{" "}
              <MathBlock tex="h = O(\log n)" /> after every operation,
              ensuring worst-case <MathBlock tex="O(\log n)" /> performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
