import BstMathPhase from "@/components/binary-search-tree/MathPhase";
import BstVisualPhase from "@/components/binary-search-tree/VisualPhase";
import BstCodePhase from "@/components/binary-search-tree/CodePhase";

export const metadata = {
  title: "Binary Search Tree — KLAR",
};

export default function BinarySearchTreePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Binary Search Tree</h1>
        <p className="text-muted text-lg">
          A rooted binary tree where each node&apos;s left subtree has smaller
          keys and right subtree has larger keys.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(log n)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Trees
          </span>
        </div>
      </div>

      <BstMathPhase />
      <BstVisualPhase />
      <BstCodePhase />
    </div>
  );
}
