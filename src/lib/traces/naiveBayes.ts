export interface NaiveBayesStep {
  iteration: number;
  phase: "init" | "priors" | "likelihoods" | "posterior" | "classify" | "result";
  means: { c0: [number, number]; c1: [number, number] };
  stds: { c0: [number, number]; c1: [number, number] };
  priors: { c0: number; c1: number };
  query: { x1: number; x2: number };
  showQuery: boolean;
  showEllipses: { c0: boolean; c1: boolean };
  logPosteriors: { c0: number; c1: number } | null;
  prediction: number | null;
  description: string;
  mathConcept: string;
}

// Dataset: 2 classes
export const nbData = [
  // Class 0 (bottom-left)
  { x1: 1.5, x2: 1.0, label: 0 },  // 0
  { x1: 2.0, x2: 2.0, label: 0 },  // 1
  { x1: 1.0, x2: 2.5, label: 0 },  // 2
  { x1: 2.5, x2: 1.5, label: 0 },  // 3
  { x1: 3.0, x2: 2.0, label: 0 },  // 4
  { x1: 1.5, x2: 3.0, label: 0 },  // 5
  // Class 1 (top-right)
  { x1: 5.0, x2: 5.0, label: 1 },  // 6
  { x1: 6.0, x2: 5.5, label: 1 },  // 7
  { x1: 5.5, x2: 6.0, label: 1 },  // 8
  { x1: 6.5, x2: 5.0, label: 1 },  // 9
  { x1: 5.0, x2: 6.5, label: 1 },  // 10
  { x1: 6.0, x2: 4.5, label: 1 },  // 11
];

// Pre-computed statistics
const MEANS = {
  c0: [1.917, 2.0] as [number, number],
  c1: [5.667, 5.417] as [number, number],
};
const STDS = {
  c0: [0.671, 0.671] as [number, number],
  c1: [0.583, 0.671] as [number, number],
};
const PRIORS = { c0: 0.5, c1: 0.5 };
const QUERY = { x1: 3.5, x2: 4.0 };

// Log posterior values for query point
const LOG_POSTERIORS = { c0: -21.8, c1: -18.8 };

export const naiveBayesTrace: NaiveBayesStep[] = [
  {
    iteration: 0,
    phase: "init",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: false,
    showEllipses: { c0: false, c1: false },
    logPosteriors: null,
    prediction: null,
    description: "Dataset: 12 points, 2 classes. We will classify the query point (3.5, 4.0).",
    mathConcept: "P(\\hat{y}|x)\\propto P(x|\\hat{y})P(\\hat{y})",
  },
  {
    iteration: 1,
    phase: "priors",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: false,
    showEllipses: { c0: false, c1: false },
    logPosteriors: null,
    prediction: null,
    description: "Compute class priors: each class has 6/12 = 50% of points.",
    mathConcept: "P(C_0)=\\frac{6}{12}=0.5,\\;P(C_1)=0.5",
  },
  {
    iteration: 2,
    phase: "likelihoods",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: false,
    showEllipses: { c0: true, c1: false },
    logPosteriors: null,
    prediction: null,
    description: "Class 0 Gaussian: mean=(1.92, 2.00), std=(0.67, 0.67). Ellipses show 1σ and 2σ.",
    mathConcept: "\\mu_{0}=(1.92,2.00),\\;\\sigma_{0}=(0.67,0.67)",
  },
  {
    iteration: 3,
    phase: "likelihoods",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: false,
    showEllipses: { c0: true, c1: true },
    logPosteriors: null,
    prediction: null,
    description: "Class 1 Gaussian: mean=(5.67, 5.42), std=(0.58, 0.67). Both class ellipses shown.",
    mathConcept: "\\mu_{1}=(5.67,5.42),\\;\\sigma_{1}=(0.58,0.67)",
  },
  {
    iteration: 4,
    phase: "posterior",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: true,
    showEllipses: { c0: true, c1: true },
    logPosteriors: null,
    prediction: null,
    description: "Query point appears. We compute log-posteriors for each class.",
    mathConcept: "P(C_k|x)\\propto P(C_k)\\prod_j P(x_j|C_k)",
  },
  {
    iteration: 5,
    phase: "posterior",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: true,
    showEllipses: { c0: true, c1: true },
    logPosteriors: { c0: LOG_POSTERIORS.c0, c1: -Infinity },
    prediction: null,
    description: `Log-posterior for C₀: log P(x|C₀) ≈ -21.3, log P(C₀|x) ≈ -21.8.`,
    mathConcept: "\\log P(x|C_0)\\approx-21.3,\\;\\log P(C_0|x)\\approx-21.8",
  },
  {
    iteration: 6,
    phase: "posterior",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: true,
    showEllipses: { c0: true, c1: true },
    logPosteriors: LOG_POSTERIORS,
    prediction: null,
    description: `Log-posterior for C₁: log P(x|C₁) ≈ -18.3, log P(C₁|x) ≈ -18.8.`,
    mathConcept: "\\log P(x|C_1)\\approx-18.3,\\;\\log P(C_1|x)\\approx-18.8",
  },
  {
    iteration: 7,
    phase: "classify",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: true,
    showEllipses: { c0: true, c1: true },
    logPosteriors: LOG_POSTERIORS,
    prediction: null,
    description: "argmax: log P(C₁|x) = -18.8 > log P(C₀|x) = -21.8 → predict Class 1.",
    mathConcept: "\\hat{y}=\\arg\\max_k\\log P(C_k|x)",
  },
  {
    iteration: 8,
    phase: "result",
    means: MEANS,
    stds: STDS,
    priors: PRIORS,
    query: QUERY,
    showQuery: true,
    showEllipses: { c0: true, c1: true },
    logPosteriors: LOG_POSTERIORS,
    prediction: 1,
    description: "Prediction: Class 1. P(C₁|x) ≈ 0.95.",
    mathConcept: "\\hat{y}=1,\\;P(C_1|x)\\approx0.95",
  },
];

export const naiveBayesCode = `import numpy as np

def gaussian_nb(X_train, y_train, x_query):
    classes = np.unique(y_train)
    priors, means, stds = {}, {}, {}
    for c in classes:
        X_c = X_train[y_train == c]
        priors[c] = len(X_c) / len(X_train)
        means[c] = X_c.mean(axis=0)
        stds[c] = X_c.std(axis=0) + 1e-9
    def log_likelihood(x, mu, sigma):
        return -0.5 * np.sum(
            ((x - mu) / sigma)**2 + np.log(2*np.pi*sigma**2)
        )
    log_posteriors = {}
    for c in classes:
        log_prior = np.log(priors[c])
        log_like = log_likelihood(x_query, means[c], stds[c])
        log_posteriors[c] = log_prior + log_like
    prediction = max(log_posteriors, key=log_posteriors.get)
    return prediction, log_posteriors`;

export const naiveBayesBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "P(C_k) = \\frac{|\\{i: y_i=k\\}|}{n}",
    codeLine: 8,
    description: "Estimate class prior from training data",
  },
  {
    math: "\\mu_k = \\frac{1}{n_k}\\sum_{y_i=k} x_i",
    codeLine: 9,
    description: "Compute per-class mean for each feature",
  },
  {
    math: "\\sigma_k = \\text{std}(\\{x_i: y_i=k\\})",
    codeLine: 10,
    description: "Compute per-class standard deviation for each feature",
  },
  {
    math: "\\log P(x|C_k) = -\\frac{1}{2}\\sum_j\\left[\\left(\\frac{x_j-\\mu_{kj}}{\\sigma_{kj}}\\right)^2 + \\log(2\\pi\\sigma_{kj}^2)\\right]",
    codeLine: 12,
    description: "Log-likelihood under Gaussian assumption (naive independence)",
  },
  {
    math: "\\log P(C_k)",
    codeLine: 17,
    description: "Log of class prior probability",
  },
  {
    math: "\\log P(x|C_k)",
    codeLine: 18,
    description: "Log-likelihood of query under class k Gaussian",
  },
  {
    math: "\\hat{y} = \\arg\\max_k [\\log P(C_k) + \\log P(x|C_k)]",
    codeLine: 21,
    description: "Predict class with highest log-posterior",
  },
];
