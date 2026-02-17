import KMeansMathPhase from "@/components/k-means/MathPhase";
import KMeansVisualPhase from "@/components/k-means/VisualPhase";
import KMeansCodePhase from "@/components/k-means/CodePhase";

export const metadata = {
  title: "K-Means Clustering — KLAR",
};

export default function KMeansPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">K-Means Clustering</h1>
        <p className="text-muted text-lg">
          Partition data into k clusters by iteratively assigning points and updating centroids.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Clustering
          </span>
        </div>
      </div>

      <KMeansMathPhase />
      <KMeansVisualPhase />
      <KMeansCodePhase />
    </div>
  );
}
