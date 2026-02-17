export interface LogisticRegressionStep {
  iteration: number;
  w1: number;
  w2: number;
  b: number;
  loss: number;
  description: string;
  mathConcept: string;
}

// 2-class dataset in 2D
export const logRegData = [
  // Class 0
  { x1: 1.0, x2: 1.0, label: 0 },
  { x1: 1.5, x2: 2.0, label: 0 },
  { x1: 2.0, x2: 1.5, label: 0 },
  { x1: 2.5, x2: 2.5, label: 0 },
  { x1: 1.2, x2: 3.0, label: 0 },
  { x1: 2.0, x2: 0.5, label: 0 },
  // Class 1
  { x1: 4.0, x2: 4.0, label: 1 },
  { x1: 4.5, x2: 3.5, label: 1 },
  { x1: 5.0, x2: 5.0, label: 1 },
  { x1: 5.5, x2: 4.5, label: 1 },
  { x1: 4.0, x2: 5.5, label: 1 },
  { x1: 5.0, x2: 3.0, label: 1 },
];

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

function computeTrace(): LogisticRegressionStep[] {
  const steps: LogisticRegressionStep[] = [];
  const data = logRegData;
  const n = data.length;
  const lr = 1.0;
  const innerSteps = 5; // 5 gradient steps per visualization step (60 total)

  let w1 = 0;
  let w2 = 0;
  let b = 0;

  for (let iter = 0; iter <= 12; iter++) {
    // Compute loss for display (before inner updates)
    let totalLoss = 0;
    for (const pt of data) {
      const z = w1 * pt.x1 + w2 * pt.x2 + b;
      const p = sigmoid(z);
      const pClamped = Math.max(1e-7, Math.min(1 - 1e-7, p));
      totalLoss += -(pt.label * Math.log(pClamped) + (1 - pt.label) * Math.log(1 - pClamped));
    }

    const bce = totalLoss / n;

    steps.push({
      iteration: iter,
      w1: Math.round(w1 * 1000) / 1000,
      w2: Math.round(w2 * 1000) / 1000,
      b: Math.round(b * 1000) / 1000,
      loss: Math.round(bce * 1000) / 1000,
      description:
        iter === 0
          ? `Initialize: w₁=0, w₂=0, b=0. BCE loss = ${bce.toFixed(3)}.`
          : `Iteration ${iter}: w₁=${w1.toFixed(3)}, w₂=${w2.toFixed(3)}, b=${b.toFixed(3)}. Loss = ${bce.toFixed(3)}.`,
      mathConcept:
        iter === 0
          ? "\\sigma(z) = \\frac{1}{1+e^{-z}},\\quad w_1=w_2=b=0"
          : `w_1=${w1.toFixed(3)},\\; w_2=${w2.toFixed(3)},\\; \\mathcal{L}=${bce.toFixed(3)}`,
    });

    // Run multiple gradient steps before the next visualization step
    for (let s = 0; s < innerSteps; s++) {
      let dw1 = 0;
      let dw2 = 0;
      let db = 0;
      for (const pt of data) {
        const z = w1 * pt.x1 + w2 * pt.x2 + b;
        const p = sigmoid(z);
        const err = p - pt.label;
        dw1 += (1 / n) * err * pt.x1;
        dw2 += (1 / n) * err * pt.x2;
        db += (1 / n) * err;
      }
      w1 -= lr * dw1;
      w2 -= lr * dw2;
      b -= lr * db;
    }
  }

  return steps;
}

export const logisticRegressionTrace = computeTrace();

export const logisticRegressionCode = `def logistic_regression(X, y, lr=0.1, epochs=100):
    w = np.zeros(X.shape[1])             # Initialize weights
    b = 0.0                              # Initialize bias
    n = len(X)
    for epoch in range(epochs):           # Training loop
        z = X @ w + b                    # Linear combination
        p = 1 / (1 + np.exp(-z))         # Sigmoid activation
        loss = -(1/n) * sum(y*log(p) + (1-y)*log(1-p))  # BCE
        dw = (1/n) * X.T @ (p - y)       # Gradient w.r.t. w
        db = (1/n) * sum(p - y)           # Gradient w.r.t. b
        w -= lr * dw                     # Update weights
        b -= lr * db                     # Update bias
    return w, b`;

export const logisticRegressionBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "w = \\mathbf{0},\\; b = 0",
    codeLine: 2,
    description: "Initialize weight vector and bias to zero",
  },
  {
    math: "z_i = w^T x_i + b",
    codeLine: 6,
    description: "Compute the linear combination (logit)",
  },
  {
    math: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
    codeLine: 7,
    description: "Apply sigmoid to get probability",
  },
  {
    math: "\\mathcal{L} = -\\frac{1}{n}\\sum[y_i\\log p_i + (1-y_i)\\log(1-p_i)]",
    codeLine: 8,
    description: "Binary cross-entropy loss",
  },
  {
    math: "\\nabla_w \\mathcal{L} = \\frac{1}{n} X^T(p - y)",
    codeLine: 9,
    description: "Gradient with respect to weights",
  },
  {
    math: "w \\leftarrow w - \\alpha \\nabla_w \\mathcal{L}",
    codeLine: 11,
    description: "Update weights via gradient descent",
  },
];
