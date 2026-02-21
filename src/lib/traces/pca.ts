export interface PCAStep {
  iteration: number;
  phase: "init" | "center" | "covariance" | "eigenvectors" | "project" | "result";
  centeredData: { x: number; y: number }[];
  pc1: { dx: number; dy: number };
  pc2: { dx: number; dy: number };
  eigenvalue1: number;
  eigenvalue2: number;
  projections: { x: number; y: number }[];
  varianceExplained: number;
  description: string;
  mathConcept: string;
}

// Original dataset — strongly correlated along y ≈ x + 0.5
export const pcaData = [
  { x: 1.0, y: 1.5 },
  { x: 2.0, y: 2.8 },
  { x: 3.0, y: 3.2 },
  { x: 4.0, y: 4.5 },
  { x: 5.0, y: 5.1 },
  { x: 6.0, y: 5.8 },
  { x: 2.5, y: 1.8 },
  { x: 3.5, y: 4.0 },
  { x: 4.5, y: 3.8 },
  { x: 5.5, y: 6.2 },
];

// Pre-computed values
// Mean: (3.75, 3.87)
// PC1: [0.748, 0.663], PC2: [-0.663, 0.748]
// λ1=4.89, λ2=0.18, var-explained=96.5%

const MEAN_X = 3.75;
const MEAN_Y = 3.87;
const PC1 = { dx: 0.748, dy: 0.663 };
const PC2 = { dx: -0.663, dy: 0.748 };
const LAMBDA1 = 4.89;
const LAMBDA2 = 0.18;

// Centered data
const centeredData = pcaData.map((p) => ({
  x: parseFloat((p.x - MEAN_X).toFixed(3)),
  y: parseFloat((p.y - MEAN_Y).toFixed(3)),
}));

// Projections: foot-of-perpendicular from each centered point onto the PC1 line
const projections = centeredData.map((p) => {
  const t = p.x * PC1.dx + p.y * PC1.dy;
  return {
    x: parseFloat((t * PC1.dx).toFixed(3)),
    y: parseFloat((t * PC1.dy).toFixed(3)),
  };
});

const emptyProjections = centeredData.map(() => ({ x: 0, y: 0 }));

export const pcaTrace: PCAStep[] = [
  {
    iteration: 0,
    phase: "init",
    centeredData: pcaData.map((p) => ({ x: p.x - MEAN_X, y: p.y - MEAN_Y })),
    pc1: { dx: 1, dy: 0 },
    pc2: { dx: 0, dy: 1 },
    eigenvalue1: 0,
    eigenvalue2: 0,
    projections: emptyProjections,
    varianceExplained: 0,
    description: "Original dataset: 10 points with strong positive correlation.",
    mathConcept: "X\\in\\mathbb{R}^{10\\times2}",
  },
  {
    iteration: 1,
    phase: "center",
    centeredData,
    pc1: { dx: 1, dy: 0 },
    pc2: { dx: 0, dy: 1 },
    eigenvalue1: 0,
    eigenvalue2: 0,
    projections: emptyProjections,
    varianceExplained: 0,
    description: `Centered data by subtracting mean (${MEAN_X}, ${MEAN_Y}). Origin is now the centroid.`,
    mathConcept: "\\tilde{x}_i=x_i-\\bar{x},\\;\\bar{x}=(3.75,3.87)",
  },
  {
    iteration: 2,
    phase: "covariance",
    centeredData,
    pc1: { dx: 1, dy: 0 },
    pc2: { dx: 0, dy: 1 },
    eigenvalue1: 0,
    eigenvalue2: 0,
    projections: emptyProjections,
    varianceExplained: 0,
    description: "Computed covariance matrix Σ. Off-diagonal terms show strong correlation.",
    mathConcept: "\\Sigma=\\frac{1}{n-1}\\tilde{X}^\\top\\tilde{X}=\\begin{pmatrix}2.69&2.41\\\\2.41&2.38\\end{pmatrix}",
  },
  {
    iteration: 3,
    phase: "eigenvectors",
    centeredData,
    pc1: PC1,
    pc2: PC2,
    eigenvalue1: LAMBDA1,
    eigenvalue2: LAMBDA2,
    projections: emptyProjections,
    varianceExplained: 0,
    description: "Eigenvectors found. PC1 (green) captures the main variance direction.",
    mathConcept: "\\Sigma v=\\lambda v,\\;\\lambda_1=4.89,\\;\\lambda_2=0.18",
  },
  {
    iteration: 4,
    phase: "project",
    centeredData,
    pc1: PC1,
    pc2: PC2,
    eigenvalue1: LAMBDA1,
    eigenvalue2: LAMBDA2,
    projections: emptyProjections,
    varianceExplained: 0,
    description: "Projecting each point onto PC1 (the first principal component).",
    mathConcept: "z_i=\\tilde{x}_i^\\top v_1",
  },
  {
    iteration: 5,
    phase: "project",
    centeredData,
    pc1: PC1,
    pc2: PC2,
    eigenvalue1: LAMBDA1,
    eigenvalue2: LAMBDA2,
    projections,
    varianceExplained: 0,
    description: "Projections shown. Dashed lines are perpendiculars to PC1 axis.",
    mathConcept: "z_i=\\tilde{x}_i^\\top v_1,\\;\\text{Var}(z)=\\lambda_1=4.89",
  },
  {
    iteration: 6,
    phase: "project",
    centeredData,
    pc1: PC1,
    pc2: PC2,
    eigenvalue1: LAMBDA1,
    eigenvalue2: LAMBDA2,
    projections,
    varianceExplained: 96.5,
    description: "96.5% of variance captured by PC1 alone.",
    mathConcept: "z_i=\\tilde{x}_i^\\top v_1,\\;\\text{Var}(z)=\\lambda_1=4.89",
  },
  {
    iteration: 7,
    phase: "result",
    centeredData,
    pc1: PC1,
    pc2: PC2,
    eigenvalue1: LAMBDA1,
    eigenvalue2: LAMBDA2,
    projections,
    varianceExplained: 96.5,
    description: "PCA complete! 1D projection retains 96.5% of total variance.",
    mathConcept: "\\text{Var explained}=\\frac{4.89}{5.07}=96.5\\%",
  },
];

export const pcaCode = `def pca(X, n_components=1):
    X_mean = X.mean(axis=0)
    X_c = X - X_mean
    n = X.shape[0]
    cov = (X_c.T @ X_c) / (n - 1)
    eigenvalues, eigenvectors = np.linalg.eigh(cov)
    idx = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[idx]
    eigenvectors = eigenvectors[:, idx]
    components = eigenvectors[:, :n_components]
    X_proj = X_c @ components
    total_var = eigenvalues.sum()
    explained = eigenvalues[:n_components] / total_var
    return X_proj, components, explained`;

export const pcaBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\bar{x} = \\frac{1}{n}\\sum_i x_i",
    codeLine: 2,
    description: "Compute mean of each feature",
  },
  {
    math: "\\tilde{X} = X - \\bar{x}",
    codeLine: 3,
    description: "Center data by subtracting the mean",
  },
  {
    math: "\\Sigma = \\frac{1}{n-1}\\tilde{X}^\\top\\tilde{X}",
    codeLine: 5,
    description: "Compute sample covariance matrix",
  },
  {
    math: "\\Sigma v = \\lambda v",
    codeLine: 6,
    description: "Eigendecomposition of covariance matrix",
  },
  {
    math: "\\lambda_1 \\geq \\lambda_2 \\geq \\cdots",
    codeLine: 7,
    description: "Sort eigenvalues in descending order",
  },
  {
    math: "V_k = [v_1,\\ldots,v_k]",
    codeLine: 9,
    description: "Select top-k eigenvectors as principal components",
  },
  {
    math: "Z = \\tilde{X}V_k",
    codeLine: 10,
    description: "Project centered data onto principal components",
  },
  {
    math: "\\text{Var explained} = \\frac{\\sum_{j=1}^k \\lambda_j}{\\sum_j \\lambda_j}",
    codeLine: 12,
    description: "Compute fraction of variance explained by k components",
  },
];
