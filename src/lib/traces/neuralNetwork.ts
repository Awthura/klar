export interface NeuralNetworkStep {
  iteration: number;
  phase: "init" | "forward" | "loss" | "backward" | "update" | "converged";
  epoch: number;
  weightsIH: number[][];   // [2][3] — input→hidden
  weightsHO: number[][];   // [3][1] — hidden→output
  biasH: number[];         // [3]
  biasO: number[];         // [1]
  loss: number;
  hiddenActivations: number[];  // [3]
  outputActivation: number;
  highlightEdges: string[];
  description: string;
  mathConcept: string;
}

// XOR-like dataset (not linearly separable)
export const nnData = [
  // Class 0 (diagonal)
  { x1: 1.5, x2: 1.5, label: 0 },
  { x1: 2.0, x2: 2.0, label: 0 },
  { x1: 6.0, x2: 6.0, label: 0 },
  { x1: 6.5, x2: 6.5, label: 0 },
  { x1: 1.0, x2: 2.5, label: 0 },
  // Class 1 (anti-diagonal)
  { x1: 1.5, x2: 6.0, label: 1 },
  { x1: 2.0, x2: 6.5, label: 1 },
  { x1: 6.0, x2: 1.5, label: 1 },
  { x1: 6.5, x2: 2.0, label: 1 },
  { x1: 2.5, x2: 6.5, label: 1 },
];

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// Pre-computed weight snapshots at epochs 0,10,20,...,110
// Architecture: 2 → 3 → 1, sigmoid activations
// Representative point used for activations: (1.5, 6.0) — class 1

const epochData: Array<{
  epoch: number;
  phase: NeuralNetworkStep["phase"];
  wIH: number[][];
  wHO: number[][];
  bH: number[];
  bO: number[];
  loss: number;
  mathConcept: string;
  highlightEdges: string[];
}> = [
  {
    epoch: 0,
    phase: "init",
    wIH: [[0.1, -0.2, 0.15], [-0.1, 0.2, -0.15]],
    wHO: [[-0.3], [0.25], [-0.2]],
    bH: [0.05, -0.05, 0.0],
    bO: [0.1],
    loss: 0.693,
    mathConcept: "W^{(1)},W^{(2)}\\sim\\mathcal{N}(0,0.1)",
    highlightEdges: [],
  },
  {
    epoch: 10,
    phase: "forward",
    wIH: [[0.15, -0.25, 0.22], [-0.15, 0.28, -0.22]],
    wHO: [[-0.42], [0.38], [-0.31]],
    bH: [0.04, -0.06, 0.01],
    bO: [0.08],
    loss: 0.620,
    mathConcept: "h=\\sigma(W^{(1)}x+b^{(1)})",
    highlightEdges: ["IH_0_0", "IH_0_1", "IH_1_0", "IH_1_1"],
  },
  {
    epoch: 20,
    phase: "forward",
    wIH: [[0.22, -0.32, 0.3], [-0.22, 0.36, -0.3]],
    wHO: [[-0.55], [0.5], [-0.44]],
    bH: [0.03, -0.07, 0.02],
    bO: [0.06],
    loss: 0.550,
    mathConcept: "h=\\sigma(W^{(1)}x+b^{(1)})",
    highlightEdges: ["IH_0_2", "IH_1_2", "HO_2_0"],
  },
  {
    epoch: 30,
    phase: "forward",
    wIH: [[0.3, -0.4, 0.38], [-0.3, 0.45, -0.38]],
    wHO: [[-0.68], [0.62], [-0.57]],
    bH: [0.02, -0.08, 0.02],
    bO: [0.04],
    loss: 0.500,
    mathConcept: "h=\\sigma(W^{(1)}x+b^{(1)})",
    highlightEdges: ["HO_0_0", "HO_1_0", "HO_2_0"],
  },
  {
    epoch: 40,
    phase: "loss",
    wIH: [[0.38, -0.48, 0.46], [-0.38, 0.53, -0.46]],
    wHO: [[-0.8], [0.73], [-0.69]],
    bH: [0.01, -0.09, 0.02],
    bO: [0.02],
    loss: 0.420,
    mathConcept: "\\mathcal{L}=-\\frac{1}{n}\\sum[y\\log\\hat{y}+(1-y)\\log(1-\\hat{y})]",
    highlightEdges: [],
  },
  {
    epoch: 50,
    phase: "backward",
    wIH: [[0.46, -0.55, 0.54], [-0.46, 0.61, -0.54]],
    wHO: [[-0.91], [0.83], [-0.79]],
    bH: [0.0, -0.10, 0.02],
    bO: [0.0],
    loss: 0.350,
    mathConcept: "\\delta^{(2)}=\\hat{y}-y,\\;\\delta^{(1)}=(W^{(2)\\top}\\delta^{(2)})\\odot\\sigma'(h)",
    highlightEdges: ["HO_0_0", "HO_1_0", "HO_2_0"],
  },
  {
    epoch: 60,
    phase: "backward",
    wIH: [[0.54, -0.62, 0.61], [-0.54, 0.68, -0.61]],
    wHO: [[-1.01], [0.92], [-0.88]],
    bH: [-0.01, -0.11, 0.02],
    bO: [-0.02],
    loss: 0.280,
    mathConcept: "\\delta^{(2)}=\\hat{y}-y,\\;\\delta^{(1)}=(W^{(2)\\top}\\delta^{(2)})\\odot\\sigma'(h)",
    highlightEdges: ["IH_0_0", "IH_0_1", "IH_0_2", "IH_1_0", "IH_1_1", "IH_1_2"],
  },
  {
    epoch: 70,
    phase: "backward",
    wIH: [[0.61, -0.68, 0.68], [-0.61, 0.74, -0.68]],
    wHO: [[-1.09], [1.0], [-0.96]],
    bH: [-0.02, -0.12, 0.02],
    bO: [-0.04],
    loss: 0.220,
    mathConcept: "\\delta^{(2)}=\\hat{y}-y,\\;\\delta^{(1)}=(W^{(2)\\top}\\delta^{(2)})\\odot\\sigma'(h)",
    highlightEdges: ["IH_0_0", "IH_1_0"],
  },
  {
    epoch: 80,
    phase: "update",
    wIH: [[0.67, -0.73, 0.74], [-0.67, 0.79, -0.74]],
    wHO: [[-1.16], [1.07], [-1.03]],
    bH: [-0.03, -0.13, 0.02],
    bO: [-0.06],
    loss: 0.180,
    mathConcept: "W\\leftarrow W-\\eta\\nabla_W\\mathcal{L}",
    highlightEdges: ["IH_0_0", "IH_0_1", "IH_0_2", "IH_1_0", "IH_1_1", "IH_1_2", "HO_0_0", "HO_1_0", "HO_2_0"],
  },
  {
    epoch: 90,
    phase: "update",
    wIH: [[0.72, -0.77, 0.79], [-0.72, 0.83, -0.79]],
    wHO: [[-1.21], [1.12], [-1.08]],
    bH: [-0.04, -0.14, 0.02],
    bO: [-0.07],
    loss: 0.140,
    mathConcept: "W\\leftarrow W-\\eta\\nabla_W\\mathcal{L}",
    highlightEdges: ["HO_0_0", "HO_1_0", "HO_2_0"],
  },
  {
    epoch: 100,
    phase: "update",
    wIH: [[0.76, -0.81, 0.83], [-0.76, 0.86, -0.83]],
    wHO: [[-1.25], [1.16], [-1.12]],
    bH: [-0.05, -0.15, 0.02],
    bO: [-0.08],
    loss: 0.110,
    mathConcept: "W\\leftarrow W-\\eta\\nabla_W\\mathcal{L}",
    highlightEdges: ["IH_0_0", "IH_1_0", "IH_0_1", "IH_1_1"],
  },
  {
    epoch: 110,
    phase: "converged",
    wIH: [[0.79, -0.83, 0.86], [-0.79, 0.89, -0.86]],
    wHO: [[-1.28], [1.19], [-1.15]],
    bH: [-0.06, -0.16, 0.02],
    bO: [-0.09],
    loss: 0.082,
    mathConcept: "\\hat{y}(x)=\\sigma(W^{(2)}\\sigma(W^{(1)}x+b^{(1)})+b^{(2)})",
    highlightEdges: [],
  },
];

export const neuralNetworkTrace: NeuralNetworkStep[] = epochData.map((e, i) => {
  // Compute activations for representative point (1.5, 6.0)
  const repX = [1.5, 6.0];
  const h = e.wIH[0].map((_, j) => {
    const z = repX[0] * e.wIH[0][j] + repX[1] * e.wIH[1][j] + e.bH[j];
    return sigmoid(z);
  });
  const outZ = h[0] * e.wHO[0][0] + h[1] * e.wHO[1][0] + h[2] * e.wHO[2][0] + e.bO[0];
  const out = sigmoid(outZ);

  const phaseLabel = {
    init: "Initialize weights",
    forward: `Forward pass (epoch ${e.epoch})`,
    loss: `Compute loss (epoch ${e.epoch})`,
    backward: `Backpropagation (epoch ${e.epoch})`,
    update: `Weight update (epoch ${e.epoch})`,
    converged: "Converged!",
  }[e.phase];

  return {
    iteration: i,
    phase: e.phase,
    epoch: e.epoch,
    weightsIH: e.wIH,
    weightsHO: e.wHO,
    biasH: e.bH,
    biasO: e.bO,
    loss: e.loss,
    hiddenActivations: h,
    outputActivation: out,
    highlightEdges: e.highlightEdges,
    description: `${phaseLabel}: loss = ${e.loss.toFixed(3)}`,
    mathConcept: e.mathConcept,
  };
});

export const neuralNetworkCode = `def sigmoid(z): return 1 / (1 + np.exp(-z))

def mlp_train(X, y, hidden=3, lr=0.1, epochs=200):
    n, d = X.shape
    W1 = np.random.randn(d, hidden) * 0.3
    b1 = np.zeros(hidden)
    W2 = np.random.randn(hidden, 1) * 0.3
    b2 = np.zeros(1)
    losses = []
    for epoch in range(epochs):
        h = sigmoid(X @ W1 + b1)
        y_hat = sigmoid(h @ W2 + b2)
        loss = -np.mean(y*np.log(y_hat+1e-8) + (1-y)*np.log(1-y_hat+1e-8))
        losses.append(loss)
        d_out = y_hat - y.reshape(-1,1)
        dW2 = h.T @ d_out / n
        db2 = d_out.mean(axis=0)
        d_hid = (d_out @ W2.T) * h*(1-h)
        dW1 = X.T @ d_hid / n
        db1 = d_hid.mean(axis=0)
        W1 -= lr * dW1; b1 -= lr * db1
        W2 -= lr * dW2; b2 -= lr * db2
    return W1, b1, W2, b2`;

export const neuralNetworkBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "W^{(1)} \\sim \\mathcal{N}(0, 0.3^2),\\; b^{(1)} = \\mathbf{0}",
    codeLine: 5,
    description: "Initialize hidden layer weights and biases",
  },
  {
    math: "h = \\sigma(XW^{(1)} + b^{(1)})",
    codeLine: 11,
    description: "Forward pass through hidden layer with sigmoid",
  },
  {
    math: "\\hat{y} = \\sigma(hW^{(2)} + b^{(2)})",
    codeLine: 12,
    description: "Forward pass through output layer",
  },
  {
    math: "\\mathcal{L} = -\\frac{1}{n}\\sum[y\\log\\hat{y} + (1-y)\\log(1-\\hat{y})]",
    codeLine: 13,
    description: "Binary cross-entropy loss",
  },
  {
    math: "\\delta^{(2)} = \\hat{y} - y",
    codeLine: 15,
    description: "Output layer error signal",
  },
  {
    math: "\\nabla_{W^{(2)}}\\mathcal{L} = \\frac{1}{n}h^\\top\\delta^{(2)}",
    codeLine: 16,
    description: "Gradient of output layer weights",
  },
  {
    math: "\\delta^{(1)} = (\\delta^{(2)}W^{(2)\\top}) \\odot \\sigma'(h)",
    codeLine: 18,
    description: "Backpropagate error through hidden layer",
  },
  {
    math: "\\nabla_{W^{(1)}}\\mathcal{L} = \\frac{1}{n}X^\\top\\delta^{(1)}",
    codeLine: 19,
    description: "Gradient of hidden layer weights",
  },
  {
    math: "W^{(1)} \\leftarrow W^{(1)} - \\eta \\nabla_{W^{(1)}}\\mathcal{L}",
    codeLine: 22,
    description: "Update all weights via gradient descent",
  },
];
