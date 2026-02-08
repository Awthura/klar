import HashTableMathPhase from "@/components/hash-table/MathPhase";
import HashTableVisualPhase from "@/components/hash-table/VisualPhase";
import HashTableCodePhase from "@/components/hash-table/CodePhase";

export const metadata = {
  title: "Hash Table — KLAR",
};

export default function HashTablePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Hash Table</h1>
        <p className="text-muted text-lg">
          Map keys to values using a hash function for constant-time average
          lookups and inserts.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(1) avg
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Data Structures
          </span>
        </div>
      </div>

      <HashTableMathPhase />
      <HashTableVisualPhase />
      <HashTableCodePhase />
    </div>
  );
}
