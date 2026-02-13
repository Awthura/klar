"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function TrieMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Prefix trees, shared prefixes, and search complexity"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Prefix Tree Definition</h3>
          <p className="text-muted mb-4">
            A <strong>trie</strong> (prefix tree) is a rooted tree where each edge
            is labeled with a character from an alphabet{" "}
            <MathBlock tex="\Sigma" />. Each node represents a prefix:
          </p>
          <MathBlock
            tex="\text{node}(v) \;\leftrightarrow\; \text{prefix } w[0..k]"
            display
          />
          <p className="text-muted mt-4">
            Words sharing a common prefix share the same path from the root.
            End-of-word is marked with a boolean flag at the terminal node.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Shared Prefixes</h3>
          <p className="text-muted mb-4">
            The key advantage: words with common prefixes share nodes. For words{" "}
            <MathBlock tex="w_1" /> and <MathBlock tex="w_2" />, the shared
            prefix path has length:
          </p>
          <MathBlock
            tex="\text{lcp}(w_1, w_2) = \max\{k : w_1[0..k] = w_2[0..k]\}"
            display
          />
          <p className="text-muted mt-4">
            This saves space compared to storing each word independently. For
            example, {'"'}cat{'"'}, {'"'}car{'"'}, {'"'}card{'"'} share the prefix {'"'}ca{'"'}.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity Analysis</h3>
          <p className="text-muted mb-4">
            For a word of length <MathBlock tex="m" />:
          </p>
          <MathBlock
            tex="\text{insert}(w) = O(m), \quad \text{search}(w) = O(m)"
            display
          />
          <p className="text-muted mt-4 mb-4">
            Both operations are independent of the total number of stored words{" "}
            <MathBlock tex="n" />. Space in the worst case:
          </p>
          <MathBlock
            tex="O\!\left(\sum_{i=1}^{n} |w_i| \cdot |\Sigma|\right)"
            display
          />

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Trie vs. Hash Table</h4>
            <p className="text-sm text-muted">
              Hash tables offer <MathBlock tex="O(m)" /> average lookup but don&apos;t
              support prefix queries. Tries enable prefix search, autocomplete,
              and lexicographic ordering — all in <MathBlock tex="O(m)" /> time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
