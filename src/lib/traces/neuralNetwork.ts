export interface NeuralNetworkStep {
  iteration: number;
  phase: "init" | "forward" | "loss" | "backward" | "update" | "converged";
  epoch: number;
  weightsIH: number[][];   // [2][4] — 2 inputs, 4 hidden
  weightsHO: number[][];   // [4][4] — 4 hidden, 4 outputs
  biasH: number[];         // [4]
  biasO: number[];         // [4]
  loss: number;
  hiddenActivations: number[];  // [4]
  outputActivation: number[];   // [4] softmax probabilities
  highlightEdges: string[];
  description: string;
  mathConcept: string;
}

// 4-class dataset: one cluster per quadrant
export const nnData = [
  // Class 0 — bottom-left (indigo)
  { x1: 1.5, x2: 1.5, label: 0 }, { x1: 2.0, x2: 1.0, label: 0 },
  { x1: 1.0, x2: 2.0, label: 0 }, { x1: 2.5, x2: 2.0, label: 0 }, { x1: 1.5, x2: 2.5, label: 0 },
  // Class 1 — bottom-right (amber)
  { x1: 6.5, x2: 1.5, label: 1 }, { x1: 6.0, x2: 1.0, label: 1 },
  { x1: 7.0, x2: 2.0, label: 1 }, { x1: 5.5, x2: 2.0, label: 1 }, { x1: 6.5, x2: 2.5, label: 1 },
  // Class 2 — top-left (green)
  { x1: 1.5, x2: 6.5, label: 2 }, { x1: 2.0, x2: 7.0, label: 2 },
  { x1: 1.0, x2: 6.0, label: 2 }, { x1: 2.5, x2: 6.0, label: 2 }, { x1: 1.5, x2: 5.5, label: 2 },
  // Class 3 — top-right (red)
  { x1: 6.5, x2: 6.5, label: 3 }, { x1: 6.0, x2: 7.0, label: 3 },
  { x1: 7.0, x2: 6.0, label: 3 }, { x1: 5.5, x2: 6.0, label: 3 }, { x1: 6.5, x2: 5.5, label: 3 },
];

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

function softmax(logits: number[]): number[] {
  const maxL = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxL));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

// Linear interpolation from initial to final weights
function lerp(a: number, b: number, t: number): number {
  return Math.round((a + t * (b - a)) * 100) / 100;
}

function makeWeights(scale: number): {
  wIH: number[][];
  wHO: number[][];
  bH: number[];
  bO: number[];
} {
  // Architecture: 2→4→4
  // Final weights designed to detect quadrants:
  //   h0=x1_high, h1=x1_low, h2=x2_high, h3=x2_low (threshold at x=4)
  const wIH = [
    [lerp(0.1, 2, scale), lerp(-0.1, -2, scale), lerp(0.05, 0, scale), lerp(-0.05, 0, scale)],
    [lerp(-0.05, 0, scale), lerp(0.05, 0, scale), lerp(0.1, 2, scale), lerp(-0.1, -2, scale)],
  ];
  const bH = [
    lerp(-0.5, -8, scale), lerp(0.5, 8, scale),
    lerp(-0.5, -8, scale), lerp(0.5, 8, scale),
  ];
  // Class 0=BL(h1+h3), 1=BR(h0+h3), 2=TL(h1+h2), 3=TR(h0+h2)
  const wHO = [
    [lerp(-0.3, -2.5, scale), lerp(0.3, 2.5, scale), lerp(-0.3, -2.5, scale), lerp(0.3, 2.5, scale)],
    [lerp(0.3, 2.5, scale), lerp(-0.3, -2.5, scale), lerp(0.3, 2.5, scale), lerp(-0.3, -2.5, scale)],
    [lerp(-0.3, -2.5, scale), lerp(-0.3, -2.5, scale), lerp(0.3, 2.5, scale), lerp(0.3, 2.5, scale)],
    [lerp(0.3, 2.5, scale), lerp(0.3, 2.5, scale), lerp(-0.3, -2.5, scale), lerp(-0.3, -2.5, scale)],
  ];
  const bO = [0, 0, 0, 0];
  return { wIH, wHO, bH, bO };
}

// 12 steps: epochs 0,10,...,110
const scales = [0.0, 0.06, 0.13, 0.22, 0.34, 0.47, 0.59, 0.70, 0.79, 0.87, 0.93, 1.0];
const lossValues = [1.386, 1.20, 1.05, 0.92, 0.78, 0.64, 0.50, 0.38, 0.28, 0.20, 0.14, 0.08];
const epochNums = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];

const phaseArr: NeuralNetworkStep["phase"][] = [
  "init",
  "forward", "forward", "forward",
  "loss",
  "backward", "backward", "backward",
  "update", "update", "update",
  "converged",
];

const mathConceptArr = [
  "W^{(1)}\\sim\\mathcal{N}(0,0.3^2)",
  "h=\\sigma(XW^{(1)}+b^{(1)})",
  "h=\\sigma(XW^{(1)}+b^{(1)})",
  "\\text{logits}=hW^{(2)}+b^{(2)}",
  "\\mathcal{L}=-\\frac{1}{n}\\sum_{i,k}Y_{ik}\\log\\hat{Y}_{ik}",
  "\\delta^{(2)}=(\\hat{Y}-Y)/n",
  "\\delta^{(2)}=(\\hat{Y}-Y)/n",
  "\\delta^{(1)}=(\\delta^{(2)}W^{(2)\\top})\\odot\\sigma'(h)",
  "W^{(1)}\\leftarrow W^{(1)}-\\eta\\nabla_{W^{(1)}}\\mathcal{L}",
  "W^{(1)}\\leftarrow W^{(1)}-\\eta\\nabla_{W^{(1)}}\\mathcal{L}",
  "W^{(1)}\\leftarrow W^{(1)}-\\eta\\nabla_{W^{(1)}}\\mathcal{L}",
  "\\hat{Y}(x)=\\text{softmax}(\\sigma(W^{(1)}x+b^{(1)})W^{(2)}+b^{(2)})",
];

const highlightEdgesArr: string[][] = [
  // init
  [],
  // forward ×3
  ["IH_0_0", "IH_0_1", "IH_1_0", "IH_1_1"],
  ["IH_0_2", "IH_0_3", "IH_1_2", "IH_1_3"],
  ["HO_0_0", "HO_1_0", "HO_2_0", "HO_3_0", "HO_0_1", "HO_1_1", "HO_2_1", "HO_3_1"],
  // loss
  [],
  // backward ×3 (HO first, then IH)
  ["HO_0_0", "HO_0_1", "HO_0_2", "HO_0_3", "HO_1_0", "HO_1_1", "HO_1_2", "HO_1_3"],
  ["HO_2_0", "HO_2_1", "HO_2_2", "HO_2_3", "HO_3_0", "HO_3_1", "HO_3_2", "HO_3_3"],
  ["IH_0_0", "IH_0_1", "IH_0_2", "IH_0_3", "IH_1_0", "IH_1_1", "IH_1_2", "IH_1_3"],
  // update ×3 (all, then HO, then IH)
  [
    "IH_0_0", "IH_0_1", "IH_0_2", "IH_0_3", "IH_1_0", "IH_1_1", "IH_1_2", "IH_1_3",
    "HO_0_0", "HO_0_1", "HO_0_2", "HO_0_3", "HO_1_0", "HO_1_1", "HO_1_2", "HO_1_3",
    "HO_2_0", "HO_2_1", "HO_2_2", "HO_2_3", "HO_3_0", "HO_3_1", "HO_3_2", "HO_3_3",
  ],
  [
    "HO_0_0", "HO_0_1", "HO_0_2", "HO_0_3", "HO_1_0", "HO_1_1", "HO_1_2", "HO_1_3",
    "HO_2_0", "HO_2_1", "HO_2_2", "HO_2_3", "HO_3_0", "HO_3_1", "HO_3_2", "HO_3_3",
  ],
  ["IH_0_0", "IH_0_1", "IH_0_2", "IH_0_3", "IH_1_0", "IH_1_1", "IH_1_2", "IH_1_3"],
  // converged
  [],
];

export const neuralNetworkTrace: NeuralNetworkStep[] = scales.map((scale, i) => {
  const { wIH, wHO, bH, bO } = makeWeights(scale);

  // Compute activations for representative point (1.5, 1.5) — class 0
  const repX = [1.5, 1.5];
  const h = [0, 1, 2, 3].map((j) => {
    const z = repX[0] * wIH[0][j] + repX[1] * wIH[1][j] + bH[j];
    return sigmoid(z);
  });
  const logits = [0, 1, 2, 3].map((k) =>
    h.reduce((s, hi, idx) => s + hi * wHO[idx][k], 0) + bO[k]
  );
  const outProbs = softmax(logits);

  const phase = phaseArr[i];
  const epoch = epochNums[i];

  const phaseLabel = {
    init: "Initialize weights",
    forward: `Forward pass (epoch ${epoch})`,
    loss: `Compute loss (epoch ${epoch})`,
    backward: `Backpropagation (epoch ${epoch})`,
    update: `Weight update (epoch ${epoch})`,
    converged: "Converged!",
  }[phase];

  return {
    iteration: i,
    phase,
    epoch,
    weightsIH: wIH,
    weightsHO: wHO,
    biasH: bH,
    biasO: bO,
    loss: lossValues[i],
    hiddenActivations: h,
    outputActivation: outProbs,
    highlightEdges: highlightEdgesArr[i],
    description: `${phaseLabel}: loss = ${lossValues[i].toFixed(3)}`,
    mathConcept: mathConceptArr[i],
  };
});

export const neuralNetworkCode = `def sigmoid(z): return 1 / (1 + np.exp(-z))

def softmax(z):
    exp_z = np.exp(z - z.max(axis=1, keepdims=True))
    return exp_z / exp_z.sum(axis=1, keepdims=True)

def mlp_train(X, y, hidden=4, lr=0.1, epochs=200):
    n, d = X.shape
    K = 4
    W1 = np.random.randn(d, hidden) * 0.3
    b1 = np.zeros(hidden)
    W2 = np.random.randn(hidden, K) * 0.3
    b2 = np.zeros(K)
    Y = np.eye(K)[y]
    losses = []
    for epoch in range(epochs):
        h = sigmoid(X @ W1 + b1)
        logits = h @ W2 + b2
        y_hat = softmax(logits)
        loss = -np.mean(np.sum(Y * np.log(y_hat + 1e-8), axis=1))
        losses.append(loss)
        d_out = (y_hat - Y) / n
        dW2 = h.T @ d_out
        db2 = d_out.sum(axis=0)
        d_hid = (d_out @ W2.T) * h * (1 - h)
        dW1 = X.T @ d_hid
        db1 = d_hid.sum(axis=0)
        W1 -= lr * dW1; b1 -= lr * db1
        W2 -= lr * dW2; b2 -= lr * db2
    return W1, b1, W2, b2`;

export const neuralNetworkBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "W^{(1)} \\sim \\mathcal{N}(0, 0.3^2),\\; b^{(1)} = \\mathbf{0}",
    codeLine: 10,
    description: "Initialize hidden layer weights randomly",
  },
  {
    math: "h = \\sigma(XW^{(1)} + b^{(1)})",
    codeLine: 17,
    description: "Forward pass through hidden layer with sigmoid",
  },
  {
    math: "\\text{logits} = hW^{(2)} + b^{(2)}",
    codeLine: 18,
    description: "Compute raw output scores for each class",
  },
  {
    math: "\\hat{Y} = \\text{softmax}(\\text{logits})",
    codeLine: 19,
    description: "Convert logits to class probabilities via softmax",
  },
  {
    math: "\\mathcal{L} = -\\frac{1}{n}\\sum_{i,k} Y_{ik}\\log\\hat{Y}_{ik}",
    codeLine: 20,
    description: "Categorical cross-entropy loss over all classes",
  },
  {
    math: "\\delta^{(2)} = (\\hat{Y} - Y) / n",
    codeLine: 22,
    description: "Output layer error signal (averaged over batch)",
  },
  {
    math: "\\delta^{(1)} = (\\delta^{(2)} W^{(2)\\top}) \\odot \\sigma'(h)",
    codeLine: 25,
    description: "Backpropagate error through hidden layer",
  },
  {
    math: "W^{(1)} \\leftarrow W^{(1)} - \\eta \\nabla_{W^{(1)}} \\mathcal{L}",
    codeLine: 28,
    description: "Update all weights via gradient descent",
  },
];
