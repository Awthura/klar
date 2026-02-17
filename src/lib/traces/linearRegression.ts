export interface LinearRegressionStep {
  iteration: number;
  w: number;
  b: number;
  loss: number;
  dw: number;
  db: number;
  description: string;
  mathConcept: string;
}

// Simple dataset: y ≈ 2x + 1
export const lrData = [
  { x: 1, y: 2.9 },
  { x: 2, y: 5.1 },
  { x: 3, y: 6.8 },
  { x: 4, y: 9.2 },
  { x: 5, y: 10.9 },
  { x: 6, y: 13.1 },
  { x: 7, y: 14.8 },
  { x: 8, y: 17.2 },
];

const n = lrData.length;
const lr = 0.01;

// Pre-compute gradient descent trace
function computeTrace(): LinearRegressionStep[] {
  const steps: LinearRegressionStep[] = [];
  let w = 0;
  let b = 0;

  for (let iter = 0; iter <= 12; iter++) {
    // Compute predictions and loss
    let totalLoss = 0;
    let dw = 0;
    let db = 0;
    for (const pt of lrData) {
      const pred = w * pt.x + b;
      const err = pred - pt.y;
      totalLoss += err * err;
      dw += (2 / n) * err * pt.x;
      db += (2 / n) * err;
    }
    const mse = totalLoss / n;

    const desc =
      iter === 0
        ? `Initialize: w=0, b=0. MSE loss = ${mse.toFixed(2)}.`
        : `Iteration ${iter}: w=${w.toFixed(3)}, b=${b.toFixed(3)}. Loss = ${mse.toFixed(2)}.`;

    const mathC =
      iter === 0
        ? "\\hat{y} = wx + b,\\quad w=0,\\; b=0"
        : `w = ${w.toFixed(3)},\\; b = ${b.toFixed(3)},\\; \\mathcal{L} = ${mse.toFixed(2)}`;

    steps.push({
      iteration: iter,
      w: Math.round(w * 1000) / 1000,
      b: Math.round(b * 1000) / 1000,
      loss: Math.round(mse * 100) / 100,
      dw: Math.round(dw * 1000) / 1000,
      db: Math.round(db * 1000) / 1000,
      description: desc,
      mathConcept: mathC,
    });

    // Update parameters
    w -= lr * dw;
    b -= lr * db;
  }
  return steps;
}

export const linearRegressionTrace = computeTrace();

export const linearRegressionCode = `def linear_regression(X, y, lr=0.01, epochs=100):
    w, b = 0.0, 0.0                  # Initialize parameters
    n = len(X)
    for epoch in range(epochs):       # Training loop
        y_hat = w * X + b             # Forward pass
        loss = (1/n) * sum((y_hat - y)**2)  # MSE loss
        dw = (2/n) * sum((y_hat - y) * X)   # Gradient w.r.t. w
        db = (2/n) * sum(y_hat - y)         # Gradient w.r.t. b
        w -= lr * dw                  # Update w
        b -= lr * db                  # Update b
    return w, b`;

export const linearRegressionBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "w = 0,\\; b = 0",
    codeLine: 2,
    description: "Initialize weight and bias to zero",
  },
  {
    math: "\\hat{y}_i = w x_i + b",
    codeLine: 5,
    description: "Forward pass: compute predictions for all points",
  },
  {
    math: "\\mathcal{L} = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i - y_i)^2",
    codeLine: 6,
    description: "Compute mean squared error loss",
  },
  {
    math: "\\frac{\\partial \\mathcal{L}}{\\partial w} = \\frac{2}{n}\\sum(\\hat{y}_i - y_i)x_i",
    codeLine: 7,
    description: "Gradient of loss with respect to weight",
  },
  {
    math: "\\frac{\\partial \\mathcal{L}}{\\partial b} = \\frac{2}{n}\\sum(\\hat{y}_i - y_i)",
    codeLine: 8,
    description: "Gradient of loss with respect to bias",
  },
  {
    math: "w \\leftarrow w - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial w}",
    codeLine: 9,
    description: "Update weight using gradient descent",
  },
  {
    math: "b \\leftarrow b - \\alpha \\frac{\\partial \\mathcal{L}}{\\partial b}",
    codeLine: 10,
    description: "Update bias using gradient descent",
  },
];
