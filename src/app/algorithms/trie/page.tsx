import TrieMathPhase from "@/components/trie/MathPhase";
import TrieVisualPhase from "@/components/trie/VisualPhase";
import TrieCodePhase from "@/components/trie/CodePhase";

export const metadata = {
  title: "Trie — KLAR",
};

export default function TriePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Trie (Prefix Tree)</h1>
        <p className="text-muted text-lg">
          A tree-shaped data structure for efficient string storage, search, and
          prefix matching.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(m)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Data Structures
          </span>
        </div>
      </div>

      <TrieMathPhase />
      <TrieVisualPhase />
      <TrieCodePhase />
    </div>
  );
}
