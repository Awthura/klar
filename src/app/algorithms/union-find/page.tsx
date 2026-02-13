import UnionFindMathPhase from "@/components/union-find/MathPhase";
import UnionFindVisualPhase from "@/components/union-find/VisualPhase";
import UnionFindCodePhase from "@/components/union-find/CodePhase";

export const metadata = {
  title: "Union-Find — KLAR",
};

export default function UnionFindPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Union-Find (Disjoint Set)</h1>
        <p className="text-muted text-lg">
          Efficiently track and merge disjoint sets using union by rank and path
          compression.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(α(n))
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Data Structures
          </span>
        </div>
      </div>

      <UnionFindMathPhase />
      <UnionFindVisualPhase />
      <UnionFindCodePhase />
    </div>
  );
}
