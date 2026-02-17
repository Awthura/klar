export interface KMeansStep {
  iteration: number;
  phase: "init" | "assign" | "update" | "converged";
  centroids: { x: number; y: number }[];
  assignments: number[]; // cluster assignment for each point
  wcss: number;
  description: string;
  mathConcept: string;
}

// 3 clusters of 2D points
export const kMeansData = [
  // Cluster 0 (bottom-left)
  { x: 1.0, y: 1.5 },
  { x: 1.5, y: 1.0 },
  { x: 2.0, y: 1.8 },
  { x: 1.2, y: 2.2 },
  // Cluster 1 (top-center)
  { x: 4.0, y: 5.5 },
  { x: 4.5, y: 6.0 },
  { x: 5.0, y: 5.0 },
  { x: 3.5, y: 5.8 },
  // Cluster 2 (right)
  { x: 7.0, y: 2.0 },
  { x: 7.5, y: 3.0 },
  { x: 8.0, y: 2.5 },
  { x: 7.2, y: 1.5 },
];

export const kMeansK = 3;

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function computeWCSS(
  data: { x: number; y: number }[],
  assignments: number[],
  centroids: { x: number; y: number }[]
): number {
  let wcss = 0;
  for (let i = 0; i < data.length; i++) {
    const c = centroids[assignments[i]];
    wcss += (data[i].x - c.x) ** 2 + (data[i].y - c.y) ** 2;
  }
  return Math.round(wcss * 100) / 100;
}

function computeTrace(): KMeansStep[] {
  const steps: KMeansStep[] = [];
  const data = kMeansData;

  // Initialize centroids (pick deliberately non-optimal positions)
  let centroids = [
    { x: 2.0, y: 5.0 },
    { x: 5.0, y: 3.0 },
    { x: 8.0, y: 5.0 },
  ];

  let assignments = new Array(data.length).fill(0);

  // Step 0: Init
  steps.push({
    iteration: 0,
    phase: "init",
    centroids: centroids.map((c) => ({ ...c })),
    assignments: [...assignments],
    wcss: 0,
    description: `Initialize ${kMeansK} centroids at arbitrary positions. Now alternate between assign and update steps.`,
    mathConcept: `k = ${kMeansK},\\; \\mu_1, \\mu_2, \\mu_3 \\text{ initialized}`,
  });

  for (let iter = 1; iter <= 4; iter++) {
    // Assign step
    assignments = data.map((p) => {
      let minDist = Infinity;
      let minIdx = 0;
      centroids.forEach((c, ci) => {
        const d = dist(p, c);
        if (d < minDist) {
          minDist = d;
          minIdx = ci;
        }
      });
      return minIdx;
    });

    const wcssAssign = computeWCSS(data, assignments, centroids);

    steps.push({
      iteration: iter,
      phase: "assign",
      centroids: centroids.map((c) => ({ ...c })),
      assignments: [...assignments],
      wcss: wcssAssign,
      description: `Iteration ${iter} — Assign: each point goes to its nearest centroid. WCSS = ${wcssAssign}.`,
      mathConcept: `c_i = \\arg\\min_j \\|x_i - \\mu_j\\|^2`,
    });

    // Update step
    const newCentroids = centroids.map((_, ci) => {
      const clusterPoints = data.filter((_, i) => assignments[i] === ci);
      if (clusterPoints.length === 0) return centroids[ci];
      return {
        x: Math.round((clusterPoints.reduce((s, p) => s + p.x, 0) / clusterPoints.length) * 100) / 100,
        y: Math.round((clusterPoints.reduce((s, p) => s + p.y, 0) / clusterPoints.length) * 100) / 100,
      };
    });

    const wcssUpdate = computeWCSS(data, assignments, newCentroids);

    const converged = centroids.every(
      (c, i) => Math.abs(c.x - newCentroids[i].x) < 0.01 && Math.abs(c.y - newCentroids[i].y) < 0.01
    );

    centroids = newCentroids;

    if (converged) {
      steps.push({
        iteration: iter,
        phase: "converged",
        centroids: centroids.map((c) => ({ ...c })),
        assignments: [...assignments],
        wcss: wcssUpdate,
        description: `Iteration ${iter} — Centroids unchanged. Converged! Final WCSS = ${wcssUpdate}.`,
        mathConcept: `\\mu_j^{(t+1)} = \\mu_j^{(t)} \\Rightarrow \\text{converged}`,
      });
      break;
    }

    steps.push({
      iteration: iter,
      phase: "update",
      centroids: centroids.map((c) => ({ ...c })),
      assignments: [...assignments],
      wcss: wcssUpdate,
      description: `Iteration ${iter} — Update: recompute centroids as cluster means. WCSS = ${wcssUpdate}.`,
      mathConcept: `\\mu_j = \\frac{1}{|C_j|}\\sum_{x_i \\in C_j} x_i`,
    });
  }

  return steps;
}

export const kMeansTrace = computeTrace();

export const kMeansCode = `def k_means(X, k=3, max_iter=100):
    centroids = initialize_centroids(X, k)  # Random init
    for iteration in range(max_iter):
        # Assign step
        assignments = []
        for x in X:                           # For each point
            dists = [norm(x - c) for c in centroids]
            assignments.append(argmin(dists))  # Nearest centroid
        # Update step
        for j in range(k):                    # For each cluster
            cluster = X[assignments == j]
            centroids[j] = mean(cluster)      # New centroid
        if converged(centroids):
            break                             # Done
    return assignments, centroids`;

export const kMeansBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\mu_1, \\ldots, \\mu_k \\leftarrow \\text{init}",
    codeLine: 2,
    description: "Initialize k centroids (random or heuristic)",
  },
  {
    math: "\\|x_i - \\mu_j\\|^2 \\;\\forall j",
    codeLine: 7,
    description: "Compute distance from each point to each centroid",
  },
  {
    math: "c_i = \\arg\\min_j \\|x_i - \\mu_j\\|^2",
    codeLine: 8,
    description: "Assign each point to its nearest centroid",
  },
  {
    math: "\\mu_j = \\frac{1}{|C_j|}\\sum_{x_i \\in C_j} x_i",
    codeLine: 11,
    description: "Update centroid to mean of assigned points",
  },
  {
    math: "\\mu^{(t+1)} = \\mu^{(t)} \\Rightarrow \\text{stop}",
    codeLine: 13,
    description: "Stop when centroids no longer change",
  },
];
