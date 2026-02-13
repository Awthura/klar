export interface UnionFindStep {
  parent: number[];
  rank: number[];
  operation: string;
  highlighted: number[];
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const unionFindElements = [0, 1, 2, 3, 4, 5];

export const unionFindTrace: UnionFindStep[] = [
  {
    parent: [0, 1, 2, 3, 4, 5],
    rank: [0, 0, 0, 0, 0, 0],
    operation: "init",
    highlighted: [0, 1, 2, 3, 4, 5],
    description: "Initialize: each element is its own parent. All ranks are 0.",
    mathConcept: "\\forall x:\\; \\text{parent}(x) = x,\\; \\text{rank}(x) = 0",
    codeLine: 3,
  },
  {
    parent: [0, 0, 2, 3, 4, 5],
    rank: [1, 0, 0, 0, 0, 0],
    operation: "union(0, 1)",
    highlighted: [0, 1],
    description: "Union(0, 1): same rank, make 0 the root. Rank of 0 increases to 1.",
    mathConcept: "\\text{rank}(r_x) = \\text{rank}(r_y) \\;\\Rightarrow\\; \\text{rank}(r_x) \\mathrel{+}= 1",
    codeLine: 11,
  },
  {
    parent: [0, 0, 2, 2, 4, 5],
    rank: [1, 0, 1, 0, 0, 0],
    operation: "union(2, 3)",
    highlighted: [2, 3],
    description: "Union(2, 3): same rank, make 2 the root. Rank of 2 increases to 1.",
    mathConcept: "\\text{rank}(r_x) = \\text{rank}(r_y) \\;\\Rightarrow\\; \\text{rank}(r_x) \\mathrel{+}= 1",
    codeLine: 11,
  },
  {
    parent: [0, 0, 2, 2, 2, 5],
    rank: [1, 0, 1, 0, 0, 0],
    operation: "union(3, 4)",
    highlighted: [2, 3, 4],
    description: "Union(3, 4): find(3)=2 (rank 1), find(4)=4 (rank 0). Attach 4 under 2.",
    mathConcept: "\\text{rank}(r_x) > \\text{rank}(r_y) \\;\\Rightarrow\\; \\text{parent}(r_y) = r_x",
    codeLine: 9,
  },
  {
    parent: [0, 0, 2, 2, 2, 5],
    rank: [1, 0, 1, 0, 0, 0],
    operation: "find(4)",
    highlighted: [4, 2],
    description: "Find(4): follow 4→2. Root is 2. Path is already short (length 1).",
    mathConcept: "\\text{find}(4): 4 \\to 2 \\;\\Rightarrow\\; \\text{root} = 2",
    codeLine: 5,
  },
  {
    parent: [2, 0, 2, 2, 2, 5],
    rank: [1, 0, 1, 0, 0, 0],
    operation: "union(0, 2)",
    highlighted: [0, 1, 2, 3, 4],
    description: "Union(0, 2): both rank 1, make 2 the root of 0's tree. Rank of 2 → 2.",
    mathConcept: "\\{0, 1\\} \\cup \\{2, 3, 4\\} = \\{0, 1, 2, 3, 4\\}",
    codeLine: 11,
  },
  {
    parent: [2, 0, 2, 2, 2, 2],
    rank: [1, 0, 2, 0, 0, 0],
    operation: "union(4, 5)",
    highlighted: [0, 1, 2, 3, 4, 5],
    description: "Union(4, 5): find(4)=2 (rank 2), find(5)=5 (rank 0). Attach 5 under 2.",
    mathConcept: "\\{0,1,2,3,4\\} \\cup \\{5\\} = \\{0,1,2,3,4,5\\}",
    codeLine: 9,
  },
  {
    parent: [2, 2, 2, 2, 2, 2],
    rank: [1, 0, 2, 0, 0, 0],
    operation: "find(1) with path compression",
    highlighted: [1, 0, 2],
    description: "Find(1): path 1→0→2. Path compression makes 1 point directly to root 2.",
    mathConcept: "\\text{find}(1): 1 \\to 0 \\to 2 \\;\\xrightarrow{\\text{compress}}\\; 1 \\to 2",
    codeLine: 6,
  },
];

export const unionFindCode = `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))   # Each element is its own root
        self.rank = [0] * n            # Rank (upper bound on height)

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return            # Already in same set
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx            # Ensure rx has higher rank
        self.parent[ry] = rx           # Attach smaller tree under larger
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1         # Increment rank if equal`;

export const unionFindBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\forall x:\\; \\text{parent}(x) = x",
    codeLine: 3,
    description: "Initialize each element as its own set (self-loop = root)",
  },
  {
    math: "\\text{rank}(x) = 0",
    codeLine: 4,
    description: "All ranks start at 0 (single-element trees)",
  },
  {
    math: "\\text{find}(x): x \\to \\text{parent}(x) \\to \\cdots \\to \\text{root}",
    codeLine: 7,
    description: "Path compression: make every node on path point directly to root",
  },
  {
    math: "\\text{rank}(r_x) < \\text{rank}(r_y) \\Rightarrow \\text{swap}",
    codeLine: 14,
    description: "Union by rank: always attach smaller tree under larger tree's root",
  },
  {
    math: "\\text{parent}(r_y) = r_x",
    codeLine: 15,
    description: "Make the smaller tree's root point to the larger tree's root",
  },
  {
    math: "\\alpha(n) \\text{ amortized per operation}",
    codeLine: 17,
    description: "With both optimizations, amortized cost is inverse Ackermann α(n) ≈ O(1)",
  },
];
