export interface SVMStep {
  iteration: number;
  phase: "init" | "find_margin" | "identify_support" | "optimize" | "converged";
  w1: number;
  w2: number;
  b: number;
  margin: number;
  supportVectorIndices: number[];
  description: string;
  mathConcept: string;
}

// 2-class dataset: class -1 (label 0) and class +1 (label 1)
export const svmData = [
  // Class -1 (label 0)
  { x1: 1.0, x2: 2.0, label: 0 },   // 0
  { x1: 1.5, x2: 1.0, label: 0 },   // 1
  { x1: 2.0, x2: 2.5, label: 0 },   // 2  ← support vector
  { x1: 2.5, x2: 1.5, label: 0 },   // 3
  { x1: 1.0, x2: 3.5, label: 0 },   // 4
  { x1: 2.0, x2: 0.5, label: 0 },   // 5
  // Class +1 (label 1)
  { x1: 5.0, x2: 4.0, label: 1 },   // 6
  { x1: 5.5, x2: 5.0, label: 1 },   // 7
  { x1: 6.0, x2: 3.5, label: 1 },   // 8
  { x1: 6.5, x2: 5.0, label: 1 },   // 9  ← support vector
  { x1: 5.0, x2: 6.0, label: 1 },   // 10
  { x1: 6.0, x2: 2.5, label: 1 },   // 11 ← support vector
];

// Pre-computed snapshots simulating convergence to w=[0.6, 0.2], b=-3.1, margin=3.16
export const svmTrace: SVMStep[] = [
  {
    iteration: 0,
    phase: "init",
    w1: 0, w2: 0, b: 0, margin: 0,
    supportVectorIndices: [],
    description: "Initialize: w=(0,0), b=0. No decision boundary yet.",
    mathConcept: "\\mathbf{w}=(0,0),\\; b=0",
  },
  {
    iteration: 1,
    phase: "find_margin",
    w1: 0.2, w2: 0.1, b: -1.0, margin: 0.89,
    supportVectorIndices: [],
    description: "Finding margin: adjust weights to separate classes. Margin = 0.89.",
    mathConcept: "\\min_i y_i(\\mathbf{w}^\\top x_i + b)",
  },
  {
    iteration: 2,
    phase: "find_margin",
    w1: 0.35, w2: 0.12, b: -1.8, margin: 1.52,
    supportVectorIndices: [],
    description: "Margin growing: w=(0.35, 0.12), b=-1.8. Margin = 1.52.",
    mathConcept: "\\min_i y_i(\\mathbf{w}^\\top x_i + b)",
  },
  {
    iteration: 3,
    phase: "identify_support",
    w1: 0.45, w2: 0.15, b: -2.2, margin: 2.10,
    supportVectorIndices: [2, 9, 11],
    description: "Support vectors identified at indices 2, 9, 11. Margin = 2.10.",
    mathConcept: "\\gamma = \\frac{2}{\\|\\mathbf{w}\\|}",
  },
  {
    iteration: 4,
    phase: "identify_support",
    w1: 0.50, w2: 0.16, b: -2.5, margin: 2.44,
    supportVectorIndices: [2, 9, 11],
    description: "Optimizing with support vectors. Margin = 2.44.",
    mathConcept: "\\gamma = \\frac{2}{\\|\\mathbf{w}\\|}",
  },
  {
    iteration: 5,
    phase: "optimize",
    w1: 0.53, w2: 0.175, b: -2.7, margin: 2.70,
    supportVectorIndices: [2, 9, 11],
    description: "Gradient step: w=(0.53, 0.175), b=-2.7. Margin = 2.70.",
    mathConcept: "\\frac{\\partial}{\\partial \\mathbf{w}}\\!\\left[\\tfrac{1}{2}\\|\\mathbf{w}\\|^2\\right] = 0",
  },
  {
    iteration: 6,
    phase: "optimize",
    w1: 0.56, w2: 0.185, b: -2.85, margin: 2.84,
    supportVectorIndices: [2, 9, 11],
    description: "Gradient step: w=(0.56, 0.185), b=-2.85. Margin = 2.84.",
    mathConcept: "\\frac{\\partial}{\\partial \\mathbf{w}}\\!\\left[\\tfrac{1}{2}\\|\\mathbf{w}\\|^2\\right] = 0",
  },
  {
    iteration: 7,
    phase: "optimize",
    w1: 0.575, w2: 0.193, b: -2.96, margin: 2.98,
    supportVectorIndices: [2, 9, 11],
    description: "Gradient step: w=(0.575, 0.193), b=-2.96. Margin = 2.98.",
    mathConcept: "\\frac{\\partial}{\\partial \\mathbf{w}}\\!\\left[\\tfrac{1}{2}\\|\\mathbf{w}\\|^2\\right] = 0",
  },
  {
    iteration: 8,
    phase: "optimize",
    w1: 0.595, w2: 0.198, b: -3.06, margin: 3.08,
    supportVectorIndices: [2, 9, 11],
    description: "Nearly converged: w=(0.595, 0.198), b=-3.06. Margin = 3.08.",
    mathConcept: "\\frac{\\partial}{\\partial \\mathbf{w}}\\!\\left[\\tfrac{1}{2}\\|\\mathbf{w}\\|^2\\right] = 0",
  },
  {
    iteration: 9,
    phase: "converged",
    w1: 0.6, w2: 0.2, b: -3.1, margin: 3.16,
    supportVectorIndices: [2, 9, 11],
    description: "Converged! w=(0.6, 0.2), b=-3.1. Maximum margin = 3.16.",
    mathConcept: "\\|\\mathbf{w}\\|=0.632,\\; \\gamma=3.16",
  },
];

export const svmCode = `def svm_train(X, y, C=1.0, lr=0.01, epochs=1000):
    n, d = X.shape
    w = np.zeros(d)
    b = 0.0
    for epoch in range(epochs):
        for i in range(n):
            margin = y[i] * (X[i] @ w + b)
            if margin < 1:
                w += lr * (C * y[i] * X[i] - w)
                b += lr * C * y[i]
            else:
                w -= lr * w
    return w, b

def predict(X, w, b):
    return np.sign(X @ w + b)

def margin_width(w):
    return 2 / np.linalg.norm(w)

def support_vectors(X, y, w, b):
    margins = y * (X @ w + b)
    return X[np.abs(margins - 1) < 0.1]`;

export const svmBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\mathbf{w}=\\mathbf{0},\\;b=0",
    codeLine: 3,
    description: "Initialize weight vector and bias to zero",
  },
  {
    math: "y_i(\\mathbf{w}^\\top x_i+b)<1",
    codeLine: 7,
    description: "Check if point is within or violates the margin",
  },
  {
    math: "\\mathbf{w}\\mathrel{+}=\\eta Cy_ix_i-\\eta\\mathbf{w}",
    codeLine: 9,
    description: "Update weights for misclassified / margin-violation point",
  },
  {
    math: "\\mathbf{w}\\mathrel{-}=\\eta\\mathbf{w}",
    codeLine: 11,
    description: "Regularization step for correctly classified points",
  },
  {
    math: "\\hat{y}=\\text{sign}(\\mathbf{w}^\\top x+b)",
    codeLine: 15,
    description: "Predict class label using sign of decision function",
  },
  {
    math: "\\gamma=\\frac{2}{\\|\\mathbf{w}\\|}",
    codeLine: 18,
    description: "Compute margin width from weight vector norm",
  },
  {
    math: "\\{x_i:|y_i(\\mathbf{w}^\\top x_i+b)-1|<\\epsilon\\}",
    codeLine: 21,
    description: "Identify support vectors near the margin boundary",
  },
];
