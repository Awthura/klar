export interface TreeNode {
  id: number;
  feature: string | null; // "x1" or "x2" for splits, null for leaves
  threshold: number | null;
  label: number | null; // class label for leaf nodes
  entropy: number;
  samples: number;
  left: number | null; // child node id
  right: number | null;
  depth: number;
}

export interface DecisionTreeStep {
  phase: "init" | "compute_entropy" | "find_split" | "split" | "result";
  nodeId: number; // which node is being processed
  tree: TreeNode[];
  splitLines: { feature: string; threshold: number; depth: number }[];
  description: string;
  mathConcept: string;
}

// 2-class dataset (simple XOR-like pattern in one quadrant)
export const dtData = [
  { x1: 1.0, x2: 1.0, label: 0 },
  { x1: 1.5, x2: 2.0, label: 0 },
  { x1: 2.0, x2: 1.5, label: 0 },
  { x1: 2.5, x2: 0.5, label: 0 },
  { x1: 3.0, x2: 2.5, label: 0 },
  { x1: 4.0, x2: 4.0, label: 1 },
  { x1: 4.5, x2: 3.5, label: 1 },
  { x1: 5.0, x2: 5.0, label: 1 },
  { x1: 5.5, x2: 4.0, label: 1 },
  { x1: 3.5, x2: 5.0, label: 1 },
];

function entropy(labels: number[]): number {
  if (labels.length === 0) return 0;
  const counts: Record<number, number> = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  let ent = 0;
  for (const c of Object.values(counts)) {
    const p = c / labels.length;
    if (p > 0) ent -= p * Math.log2(p);
  }
  return Math.round(ent * 1000) / 1000;
}

function majorityClass(labels: number[]): number {
  const counts: Record<number, number> = {};
  for (const l of labels) counts[l] = (counts[l] || 0) + 1;
  return Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
}

// Pre-compute a simple decision tree build trace
function computeTrace(): DecisionTreeStep[] {
  const steps: DecisionTreeStep[] = [];
  const data = dtData;
  const allLabels = data.map((d) => d.label);

  // Step 0: Init
  const rootEntropy = entropy(allLabels);
  const tree: TreeNode[] = [
    { id: 0, feature: null, threshold: null, label: null, entropy: rootEntropy, samples: data.length, left: null, right: null, depth: 0 },
  ];

  steps.push({
    phase: "init",
    nodeId: 0,
    tree: JSON.parse(JSON.stringify(tree)),
    splitLines: [],
    description: `Start with all ${data.length} samples in root node. Entropy = ${rootEntropy}.`,
    mathConcept: `H(S) = -\\sum_c p_c \\log_2 p_c = ${rootEntropy}`,
  });

  // Step 1: Compute entropy at root
  steps.push({
    phase: "compute_entropy",
    nodeId: 0,
    tree: JSON.parse(JSON.stringify(tree)),
    splitLines: [],
    description: `Root entropy H = ${rootEntropy}. Class 0: ${allLabels.filter((l) => l === 0).length}, Class 1: ${allLabels.filter((l) => l === 1).length}.`,
    mathConcept: `H = -\\frac{5}{10}\\log_2\\frac{5}{10} - \\frac{5}{10}\\log_2\\frac{5}{10} = ${rootEntropy}`,
  });

  // Step 2: Find best split — x1 <= 3.25
  const splitThreshold = 3.25;
  const leftData = data.filter((d) => d.x1 <= splitThreshold);
  const rightData = data.filter((d) => d.x1 > splitThreshold);
  const leftEntropy = entropy(leftData.map((d) => d.label));
  const rightEntropy = entropy(rightData.map((d) => d.label));
  const infoGain = rootEntropy - (leftData.length / data.length) * leftEntropy - (rightData.length / data.length) * rightEntropy;

  steps.push({
    phase: "find_split",
    nodeId: 0,
    tree: JSON.parse(JSON.stringify(tree)),
    splitLines: [],
    description: `Best split: x₁ <= ${splitThreshold}. Left: ${leftData.length} samples (H=${leftEntropy}), Right: ${rightData.length} samples (H=${rightEntropy}). Info gain = ${infoGain.toFixed(3)}.`,
    mathConcept: `IG = H(S) - \\frac{|S_L|}{|S|}H(S_L) - \\frac{|S_R|}{|S|}H(S_R) = ${infoGain.toFixed(3)}`,
  });

  // Step 3: Split root
  tree[0].feature = "x1";
  tree[0].threshold = splitThreshold;
  tree[0].left = 1;
  tree[0].right = 2;

  const leftLabel = leftData.every((d) => d.label === leftData[0].label) ? leftData[0].label : null;
  const rightLabel = rightData.every((d) => d.label === rightData[0].label) ? rightData[0].label : null;

  tree.push({
    id: 1, feature: null, threshold: null, label: leftLabel ?? majorityClass(leftData.map((d) => d.label)),
    entropy: leftEntropy, samples: leftData.length, left: null, right: null, depth: 1,
  });
  tree.push({
    id: 2, feature: null, threshold: null, label: rightLabel ?? majorityClass(rightData.map((d) => d.label)),
    entropy: rightEntropy, samples: rightData.length, left: null, right: null, depth: 1,
  });

  const splitLines = [{ feature: "x1", threshold: splitThreshold, depth: 0 }];

  steps.push({
    phase: "split",
    nodeId: 0,
    tree: JSON.parse(JSON.stringify(tree)),
    splitLines: [...splitLines],
    description: `Split on x₁ <= ${splitThreshold}. Left node: ${leftData.length} samples → class ${leftLabel ?? "mixed"}. Right node: ${rightData.length} samples → class ${rightLabel ?? "mixed"}.`,
    mathConcept: `x_1 \\leq ${splitThreshold}`,
  });

  // Step 4: Check if left needs further splitting (it might be pure)
  if (leftEntropy > 0) {
    // Need to split left node on x2
    const leftSplitThreshold = 2.75;
    const llData = leftData.filter((d) => d.x2 <= leftSplitThreshold);
    const lrData = leftData.filter((d) => d.x2 > leftSplitThreshold);
    const llEntropy = entropy(llData.map((d) => d.label));
    const lrEntropy = entropy(lrData.map((d) => d.label));
    const leftInfoGain = leftEntropy - (llData.length / leftData.length) * llEntropy - (lrData.length / leftData.length) * lrEntropy;

    steps.push({
      phase: "find_split",
      nodeId: 1,
      tree: JSON.parse(JSON.stringify(tree)),
      splitLines: [...splitLines],
      description: `Left node not pure. Best split: x₂ <= ${leftSplitThreshold}. Info gain = ${leftInfoGain.toFixed(3)}.`,
      mathConcept: `IG = ${leftEntropy} - \\frac{${llData.length}}{${leftData.length}} \\cdot ${llEntropy} - \\frac{${lrData.length}}{${leftData.length}} \\cdot ${lrEntropy} = ${leftInfoGain.toFixed(3)}`,
    });

    tree[1].feature = "x2";
    tree[1].threshold = leftSplitThreshold;
    tree[1].left = 3;
    tree[1].right = 4;
    tree[1].label = null;

    tree.push({
      id: 3, feature: null, threshold: null, label: majorityClass(llData.map((d) => d.label)),
      entropy: llEntropy, samples: llData.length, left: null, right: null, depth: 2,
    });
    tree.push({
      id: 4, feature: null, threshold: null, label: majorityClass(lrData.map((d) => d.label)),
      entropy: lrEntropy, samples: lrData.length, left: null, right: null, depth: 2,
    });

    splitLines.push({ feature: "x2", threshold: leftSplitThreshold, depth: 1 });

    steps.push({
      phase: "split",
      nodeId: 1,
      tree: JSON.parse(JSON.stringify(tree)),
      splitLines: [...splitLines],
      description: `Split left node on x₂ <= ${leftSplitThreshold}. Both children are now pure leaves.`,
      mathConcept: `x_2 \\leq ${leftSplitThreshold}`,
    });
  }

  // Final step: Result
  steps.push({
    phase: "result",
    nodeId: -1,
    tree: JSON.parse(JSON.stringify(tree)),
    splitLines: [...splitLines],
    description: `Decision tree complete. ${tree.filter((n) => n.feature === null).length} leaves, depth ${Math.max(...tree.map((n) => n.depth))}.`,
    mathConcept: "\\text{Tree complete — all leaves are pure}",
  });

  return steps;
}

export const decisionTreeTrace = computeTrace();

export const decisionTreeCode = `def build_tree(X, y, depth=0, max_depth=5):
    if len(set(y)) == 1:              # Pure node
        return Leaf(y[0])
    if depth >= max_depth:            # Max depth reached
        return Leaf(majority(y))
    best_feat, best_thresh = None, None
    best_gain = 0
    for feature in range(X.shape[1]):     # Try each feature
        for thresh in unique(X[:, feature]):
            gain = info_gain(y, X[:, feature], thresh)
            if gain > best_gain:          # Track best split
                best_gain = gain
                best_feat, best_thresh = feature, thresh
    left_mask = X[:, best_feat] <= best_thresh
    left = build_tree(X[left_mask], y[left_mask], depth+1)
    right = build_tree(X[~left_mask], y[~left_mask], depth+1)
    return Node(best_feat, best_thresh, left, right)

def info_gain(y, feature, threshold):
    H = entropy(y)                        # Parent entropy
    left = y[feature <= threshold]
    right = y[feature > threshold]
    H_split = (len(left)*entropy(left) + len(right)*entropy(right)) / len(y)
    return H - H_split                    # Information gain`;

export const decisionTreeBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "H(S) = 0 \\Rightarrow \\text{leaf}",
    codeLine: 2,
    description: "If all samples have the same class, create a leaf node",
  },
  {
    math: "IG(S, f, t) = H(S) - \\frac{|S_L|}{|S|}H(S_L) - \\frac{|S_R|}{|S|}H(S_R)",
    codeLine: 10,
    description: "Compute information gain for each candidate split",
  },
  {
    math: "f^*, t^* = \\arg\\max_{f,t} IG(S, f, t)",
    codeLine: 12,
    description: "Select the feature and threshold with highest information gain",
  },
  {
    math: "S_L = \\{x \\in S : x_{f^*} \\leq t^*\\}",
    codeLine: 14,
    description: "Partition data: left child gets samples below threshold",
  },
  {
    math: "\\text{recurse}(S_L),\\; \\text{recurse}(S_R)",
    codeLine: 15,
    description: "Recursively build subtrees for each partition",
  },
  {
    math: "H(S) = -\\sum_c p_c \\log_2 p_c",
    codeLine: 19,
    description: "Entropy measures impurity of a set of labels",
  },
];
