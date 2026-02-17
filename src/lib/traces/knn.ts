export interface KnnStep {
  phase: "init" | "compute_distances" | "sort" | "select_k" | "vote" | "result";
  queryPoint: { x: number; y: number };
  distances: { idx: number; dist: number }[];
  selectedK: number[];
  prediction: number | null;
  description: string;
  mathConcept: string;
}

// 3-class dataset with clear visual separation
export const knnData = [
  // Class 0 — bottom-left cluster
  { x: 1.0, y: 1.0, label: 0 },
  { x: 1.5, y: 1.5, label: 0 },
  { x: 1.2, y: 2.0, label: 0 },
  { x: 2.0, y: 1.2, label: 0 },
  // Class 1 — top cluster
  { x: 3.5, y: 6.0, label: 1 },
  { x: 4.0, y: 5.5, label: 1 },
  { x: 4.5, y: 6.5, label: 1 },
  { x: 3.0, y: 5.8, label: 1 },
  // Class 2 — right cluster
  { x: 6.5, y: 2.5, label: 2 },
  { x: 7.0, y: 3.0, label: 2 },
  { x: 7.5, y: 2.0, label: 2 },
  { x: 7.0, y: 1.5, label: 2 },
];

export const knnQuery = { x: 5.0, y: 3.5 };
export const knnK = 3;

function euclidean(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function computeTrace(): KnnStep[] {
  const steps: KnnStep[] = [];
  const q = knnQuery;

  // Step 0: Init
  steps.push({
    phase: "init",
    queryPoint: q,
    distances: [],
    selectedK: [],
    prediction: null,
    description: `Query point: (${q.x}, ${q.y}). Classify using its ${knnK} nearest neighbors among 3 classes.`,
    mathConcept: `\\text{query} = (${q.x}, ${q.y}),\\; k = ${knnK}`,
  });

  // Step 1: Compute distances
  const dists = knnData.map((p, i) => ({
    idx: i,
    dist: Math.round(euclidean(q, p) * 100) / 100,
  }));

  steps.push({
    phase: "compute_distances",
    queryPoint: q,
    distances: dists,
    selectedK: [],
    prediction: null,
    description: `Compute Euclidean distance from query to all ${knnData.length} points.`,
    mathConcept: "d(q, x_i) = \\sqrt{(q_1 - x_{i1})^2 + (q_2 - x_{i2})^2}",
  });

  // Step 2: Sort by distance
  const sorted = [...dists].sort((a, b) => a.dist - b.dist);
  steps.push({
    phase: "sort",
    queryPoint: q,
    distances: sorted,
    selectedK: [],
    prediction: null,
    description: `Sort distances: nearest is point ${sorted[0].idx} (d=${sorted[0].dist}), farthest is point ${sorted[sorted.length - 1].idx} (d=${sorted[sorted.length - 1].dist}).`,
    mathConcept: "\\text{sort}\\{d(q, x_i)\\}_{i=1}^{n}",
  });

  // Step 3: Select top-k
  const topK = sorted.slice(0, knnK);
  steps.push({
    phase: "select_k",
    queryPoint: q,
    distances: sorted,
    selectedK: topK.map((d) => d.idx),
    prediction: null,
    description: `Select k=${knnK} nearest: points ${topK.map((d) => d.idx).join(", ")} with distances ${topK.map((d) => d.dist).join(", ")}.`,
    mathConcept: `\\mathcal{N}_k(q) = \\{x_{${topK.map((d) => d.idx).join("}}, x_{")}\\}`,
  });

  // Step 4: Majority vote
  const votes: Record<number, number> = {};
  for (const d of topK) {
    const label = knnData[d.idx].label;
    votes[label] = (votes[label] || 0) + 1;
  }
  const pred = Number(Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0]);

  steps.push({
    phase: "vote",
    queryPoint: q,
    distances: sorted,
    selectedK: topK.map((d) => d.idx),
    prediction: null,
    description: `Majority vote among k=${knnK} neighbors: ${Object.entries(votes).map(([l, c]) => `class ${l}: ${c} vote${c > 1 ? "s" : ""}`).join(", ")}.`,
    mathConcept: `\\hat{y} = \\arg\\max_c \\sum_{x_i \\in \\mathcal{N}_k} \\mathbb{1}[y_i = c]`,
  });

  // Step 5: Result
  steps.push({
    phase: "result",
    queryPoint: q,
    distances: sorted,
    selectedK: topK.map((d) => d.idx),
    prediction: pred,
    description: `Prediction: class ${pred}. The query point is classified by majority vote of its ${knnK} nearest neighbors.`,
    mathConcept: `\\hat{y}(q) = ${pred}`,
  });

  return steps;
}

export const knnTrace = computeTrace();

export const knnCode = `def knn_classify(X_train, y_train, query, k=3):
    distances = []
    for i, x in enumerate(X_train):      # Compute distances
        d = sqrt(sum((q - x)**2 for q, x in zip(query, x)))
        distances.append((d, i))
    distances.sort()                      # Sort by distance
    top_k = distances[:k]                 # Select k nearest
    votes = {}
    for d, idx in top_k:                  # Count votes
        label = y_train[idx]
        votes[label] = votes.get(label, 0) + 1
    return max(votes, key=votes.get)      # Majority vote`;

export const knnBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "d(q, x_i) = \\sqrt{\\sum_j (q_j - x_{ij})^2}",
    codeLine: 4,
    description: "Compute Euclidean distance from query to each training point",
  },
  {
    math: "\\text{sort}\\{d(q, x_i)\\}",
    codeLine: 6,
    description: "Sort all distances in ascending order",
  },
  {
    math: "\\mathcal{N}_k(q) = \\text{top-}k \\text{ nearest}",
    codeLine: 7,
    description: "Select the k nearest neighbors",
  },
  {
    math: "\\text{count}(y_i = c),\\; x_i \\in \\mathcal{N}_k",
    codeLine: 9,
    description: "Count class votes among k neighbors",
  },
  {
    math: "\\hat{y} = \\arg\\max_c \\text{votes}(c)",
    codeLine: 12,
    description: "Return the class with the most votes",
  },
];
