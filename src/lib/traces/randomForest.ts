export interface RandomForestStep {
  iteration: number;
  phase: "init" | "bootstrap" | "train_tree" | "aggregate" | "result";
  treeIndex: number;
  bootstrapIndices: number[];
  splitFeature: "x1" | "x2";
  splitThreshold: number;
  treePredictions: number[];
  votes: { class0: number; class1: number }[];
  finalPredictions: (number | null)[];
  description: string;
  mathConcept: string;
}

// 2-class dataset, separable around x1≈4
export const rfData = [
  // Class 0
  { x1: 1.0, x2: 1.0, label: 0 },   // 0
  { x1: 1.5, x2: 2.5, label: 0 },   // 1
  { x1: 2.5, x2: 1.5, label: 0 },   // 2
  { x1: 2.0, x2: 3.0, label: 0 },   // 3
  { x1: 3.0, x2: 0.8, label: 0 },   // 4
  { x1: 1.8, x2: 1.8, label: 0 },   // 5
  // Class 1
  { x1: 5.0, x2: 5.0, label: 1 },   // 6
  { x1: 5.5, x2: 4.0, label: 1 },   // 7
  { x1: 6.0, x2: 5.5, label: 1 },   // 8
  { x1: 6.5, x2: 3.5, label: 1 },   // 9
  { x1: 5.0, x2: 6.5, label: 1 },   // 10
  { x1: 4.5, x2: 4.5, label: 1 },   // 11
];

// 5 pre-defined decision stumps
export const RF_TREES = [
  { feature: "x1" as const, threshold: 3.5 },
  { feature: "x2" as const, threshold: 3.2 },
  { feature: "x1" as const, threshold: 4.0 },
  { feature: "x2" as const, threshold: 3.8 },
  { feature: "x1" as const, threshold: 3.8 },
];

// Fixed bootstrap samples per tree
const BOOTSTRAP_SAMPLES = [
  [0, 1, 1, 2, 3, 5, 6, 7, 9, 10, 11, 11],
  [0, 2, 2, 4, 5, 5, 6, 7, 8, 9, 10, 10],
  [0, 1, 3, 3, 4, 5, 6, 8, 8, 9, 10, 11],
  [1, 2, 3, 4, 5, 5, 6, 7, 7, 9, 10, 11],
  [0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
];

// Predict with a stump
function predictStump(x1: number, x2: number, tree: (typeof RF_TREES)[0]): number {
  const val = tree.feature === "x1" ? x1 : x2;
  return val <= tree.threshold ? 0 : 1;
}

// Compute predictions from all trees trained so far
function computeVotes(treesTrainedSoFar: number): {
  votes: { class0: number; class1: number }[];
  treePredictions: number[];
  finalPredictions: (number | null)[];
} {
  const votes = rfData.map(() => ({ class0: 0, class1: 0 }));
  const lastTreePreds = rfData.map((p) => predictStump(p.x1, p.x2, RF_TREES[treesTrainedSoFar - 1]));

  for (let t = 0; t < treesTrainedSoFar; t++) {
    rfData.forEach((p, i) => {
      const pred = predictStump(p.x1, p.x2, RF_TREES[t]);
      if (pred === 0) votes[i].class0++;
      else votes[i].class1++;
    });
  }

  const finalPredictions = votes.map((v) =>
    treesTrainedSoFar > 0 ? (v.class0 > v.class1 ? 0 : 1) : null
  );

  return { votes, treePredictions: lastTreePreds, finalPredictions };
}

function buildTrace(): RandomForestStep[] {
  const steps: RandomForestStep[] = [];
  const emptyVotes = rfData.map(() => ({ class0: 0, class1: 0 }));
  const emptyFinal = rfData.map(() => null as number | null);

  // Step 0: init
  steps.push({
    iteration: 0,
    phase: "init",
    treeIndex: 0,
    bootstrapIndices: [],
    splitFeature: "x1",
    splitThreshold: 0,
    treePredictions: [],
    votes: emptyVotes,
    finalPredictions: emptyFinal,
    description: "Initialize: 5 trees, 12 data points, feature subsampling m=⌊√2⌋=1.",
    mathConcept: "n_{\\text{trees}}=5,\\;m=\\lfloor\\sqrt{2}\\rfloor=1",
  });

  for (let t = 0; t < 5; t++) {
    // Bootstrap step
    steps.push({
      iteration: steps.length,
      phase: "bootstrap",
      treeIndex: t,
      bootstrapIndices: BOOTSTRAP_SAMPLES[t],
      splitFeature: RF_TREES[t].feature,
      splitThreshold: RF_TREES[t].threshold,
      treePredictions: [],
      votes: t > 0 ? computeVotes(t).votes : emptyVotes,
      finalPredictions: t > 0 ? computeVotes(t).finalPredictions : emptyFinal,
      description: `Tree ${t + 1}/5: Bootstrap sample drawn with replacement (${new Set(BOOTSTRAP_SAMPLES[t]).size} unique points).`,
      mathConcept: "B_t\\sim\\text{sample}(n,\\text{replace}=\\text{True})",
    });

    // Train tree step
    const { votes, treePredictions, finalPredictions } = computeVotes(t + 1);
    steps.push({
      iteration: steps.length,
      phase: "train_tree",
      treeIndex: t,
      bootstrapIndices: BOOTSTRAP_SAMPLES[t],
      splitFeature: RF_TREES[t].feature,
      splitThreshold: RF_TREES[t].threshold,
      treePredictions,
      votes,
      finalPredictions,
      description: `Tree ${t + 1}/5 trained: split on ${RF_TREES[t].feature} ≤ ${RF_TREES[t].threshold}.`,
      mathConcept: `\\hat{y}_t(x)=\\mathbf{1}[x_{${RF_TREES[t].feature}}\\leq ${RF_TREES[t].threshold}]`,
    });
  }

  // Aggregate
  const { votes: finalVotes, finalPredictions: final } = computeVotes(5);
  steps.push({
    iteration: steps.length,
    phase: "aggregate",
    treeIndex: 4,
    bootstrapIndices: BOOTSTRAP_SAMPLES[4],
    splitFeature: RF_TREES[4].feature,
    splitThreshold: RF_TREES[4].threshold,
    treePredictions: rfData.map((p) => predictStump(p.x1, p.x2, RF_TREES[4])),
    votes: finalVotes,
    finalPredictions: final,
    description: "Majority vote across all 5 trees to produce final predictions.",
    mathConcept: "\\hat{y}(x)=\\text{mode}\\{\\hat{y}_t(x)\\}_{t=1}^5",
  });

  // Compute accuracy
  const correct = final.filter((p, i) => p === rfData[i].label).length;
  const acc = (correct / rfData.length * 100).toFixed(1);
  steps.push({
    iteration: steps.length,
    phase: "result",
    treeIndex: 4,
    bootstrapIndices: BOOTSTRAP_SAMPLES[4],
    splitFeature: RF_TREES[4].feature,
    splitThreshold: RF_TREES[4].threshold,
    treePredictions: rfData.map((p) => predictStump(p.x1, p.x2, RF_TREES[4])),
    votes: finalVotes,
    finalPredictions: final,
    description: `Random Forest complete! Accuracy = ${acc}% on training data.`,
    mathConcept: `\\text{Acc}=\\frac{1}{n}\\sum_i\\mathbf{1}[\\hat{y}(x_i)=y_i]`,
  });

  return steps;
}

export const randomForestTrace = buildTrace();

export const randomForestCode = `def random_forest(X, y, n_trees=5, max_depth=1):
    trees = []
    for t in range(n_trees):
        idx = np.random.choice(len(X), len(X), replace=True)
        X_boot, y_boot = X[idx], y[idx]
        max_features = int(np.sqrt(X.shape[1]))
        feat_idx = np.random.choice(X.shape[1], max_features, replace=False)
        tree = DecisionTree(max_depth=max_depth)
        tree.fit(X_boot[:, feat_idx], y_boot)
        trees.append((tree, feat_idx))
    return trees

def predict(X, trees):
    all_preds = []
    for tree, feat_idx in trees:
        preds = tree.predict(X[:, feat_idx])
        all_preds.append(preds)
    all_preds = np.array(all_preds)
    from scipy.stats import mode
    final = mode(all_preds, axis=0).mode[0]
    return final`;

export const randomForestBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "B_t = \\{i_1,\\ldots,i_n\\},\\; i_j\\sim\\text{Uniform}(1,n)",
    codeLine: 4,
    description: "Bootstrap sample: draw n indices with replacement",
  },
  {
    math: "m = \\lfloor\\sqrt{d}\\rfloor",
    codeLine: 6,
    description: "Number of features to consider at each split",
  },
  {
    math: "\\hat{y}_t = \\text{tree}(X_{B_t})",
    codeLine: 8,
    description: "Fit a depth-limited decision tree on the bootstrap sample",
  },
  {
    math: "\\hat{y}_t(x) = \\text{tree}_t.\\text{predict}(x)",
    codeLine: 14,
    description: "Get prediction from tree t for all test points",
  },
  {
    math: "\\text{collect } \\hat{y}_1,\\ldots,\\hat{y}_T",
    codeLine: 16,
    description: "Stack predictions from all trees",
  },
  {
    math: "\\hat{y}(x) = \\text{mode}\\{\\hat{y}_t(x)\\}_{t=1}^T",
    codeLine: 18,
    description: "Majority vote: final prediction is the most common class",
  },
];
