"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function HashTableMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Hash functions, collision resolution, and expected constant-time access"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Hash Function</h3>
          <p className="text-muted mb-4">
            A hash function <MathBlock tex="h" /> maps keys from a universe{" "}
            <MathBlock tex="U" /> to bucket indices in <MathBlock tex="[0, m)" />:
          </p>
          <MathBlock tex="h: U \to \{0, 1, \ldots, m-1\}" display />
          <p className="text-muted mt-4">
            A simple example: <MathBlock tex="h(k) = k \bmod m" />. The goal is to
            distribute keys uniformly across buckets.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Collisions</h3>
          <p className="text-muted mb-4">
            When <MathBlock tex="h(k_1) = h(k_2)" /> for <MathBlock tex="k_1 \neq k_2" />,
            a <strong>collision</strong> occurs. Since <MathBlock tex="|U| \gg m" />,
            collisions are inevitable (by the pigeonhole principle).
          </p>
          <MathBlock
            tex="|U| > m \Rightarrow \exists\, k_1 \neq k_2 : h(k_1) = h(k_2)"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Chaining</h3>
          <p className="text-muted mb-4">
            Each bucket stores a linked list (chain) of all elements that hash to that
            index. Insert appends to the list; search scans the list:
          </p>
          <div className="space-y-2 text-sm">
            <p><MathBlock tex="\bullet" /> <strong>Insert:</strong> <MathBlock tex="O(1)" /> — append to chain at <MathBlock tex="h(k)" /></p>
            <p><MathBlock tex="\bullet" /> <strong>Search:</strong> <MathBlock tex="O(1 + \alpha)" /> expected — scan chain of expected length <MathBlock tex="\alpha" /></p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Load Factor &amp; Expected Complexity</h3>
          <p className="text-muted mb-4">
            The <strong>load factor</strong> <MathBlock tex="\alpha = n/m" /> is the
            average number of elements per bucket:
          </p>
          <MathBlock tex="\alpha = \frac{n}{m}" display />
          <div className="mt-4 rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              Under simple uniform hashing, the expected time for search is{" "}
              <MathBlock tex="O(1 + \alpha)" />. If we keep{" "}
              <MathBlock tex="\alpha = O(1)" /> by resizing when{" "}
              <MathBlock tex="\alpha" /> exceeds a threshold, all operations are{" "}
              <MathBlock tex="O(1)" /> expected (amortized for resizing).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
