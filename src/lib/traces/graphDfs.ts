export interface GraphDfsStep {
  stack: string[];
  visited: string[];
  current: string | null;
  edges: [string, string][];
  description: string;
  mathConcept: string;
  codeLine: number;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export const dfsNodes: GraphNode[] = [
  { id: "A", x: 200, y: 60 },
  { id: "B", x: 100, y: 160 },
  { id: "C", x: 300, y: 160 },
  { id: "D", x: 50, y: 280 },
  { id: "E", x: 180, y: 280 },
  { id: "F", x: 320, y: 280 },
  { id: "G", x: 130, y: 380 },
];

export const dfsEdges: GraphEdge[] = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
  { source: "B", target: "D" },
  { source: "B", target: "E" },
  { source: "C", target: "F" },
  { source: "E", target: "G" },
  { source: "D", target: "G" },
];

export const graphDfsTrace: GraphDfsStep[] = [
  {
    stack: ["A"],
    visited: ["A"],
    current: "A",
    edges: [],
    description:
      "Start DFS from node A. Mark A as visited and begin exploring.",
    mathConcept: "\\text{DFS}(s): \\text{visited} = \\{A\\}",
    codeLine: 6,
  },
  {
    stack: ["A", "B"],
    visited: ["A", "B"],
    current: "B",
    edges: [["A", "B"]],
    description:
      "Explore A's first neighbor B. Push B onto the call stack.",
    mathConcept: "\\text{explore}(B): B \\in \\text{Adj}(A)",
    codeLine: 10,
  },
  {
    stack: ["A", "B", "D"],
    visited: ["A", "B", "D"],
    current: "D",
    edges: [["A", "B"], ["B", "D"]],
    description:
      "Explore B's first unvisited neighbor D. Go deeper before exploring E.",
    mathConcept: "\\text{explore}(D): D \\in \\text{Adj}(B)",
    codeLine: 10,
  },
  {
    stack: ["A", "B", "D", "G"],
    visited: ["A", "B", "D", "G"],
    current: "G",
    edges: [["A", "B"], ["B", "D"], ["D", "G"]],
    description:
      "Explore D's unvisited neighbor G (B already visited). Push G.",
    mathConcept: "\\text{explore}(G): G \\in \\text{Adj}(D)",
    codeLine: 10,
  },
  {
    stack: ["A", "B", "D", "G", "E"],
    visited: ["A", "B", "D", "E", "G"],
    current: "E",
    edges: [["A", "B"], ["B", "D"], ["D", "G"], ["G", "E"]],
    description:
      "Explore G's unvisited neighbor E (D already visited). Push E.",
    mathConcept: "\\text{explore}(E): E \\in \\text{Adj}(G)",
    codeLine: 10,
  },
  {
    stack: ["A"],
    visited: ["A", "B", "D", "E", "G"],
    current: "A",
    edges: [["A", "B"], ["B", "D"], ["D", "G"], ["G", "E"]],
    description:
      "E has no unvisited neighbors. Backtrack through G → D → B → A.",
    mathConcept: "\\text{Backtrack: all neighbors visited}",
    codeLine: 8,
  },
  {
    stack: ["A", "C"],
    visited: ["A", "B", "C", "D", "E", "G"],
    current: "C",
    edges: [["A", "B"], ["B", "D"], ["D", "G"], ["G", "E"], ["A", "C"]],
    description:
      "Back at A, explore next unvisited neighbor C.",
    mathConcept: "\\text{explore}(C): C \\in \\text{Adj}(A)",
    codeLine: 10,
  },
  {
    stack: ["A", "C", "F"],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: "F",
    edges: [
      ["A", "B"],
      ["B", "D"],
      ["D", "G"],
      ["G", "E"],
      ["A", "C"],
      ["C", "F"],
    ],
    description: "Explore C's unvisited neighbor F.",
    mathConcept: "\\text{explore}(F): F \\in \\text{Adj}(C)",
    codeLine: 10,
  },
  {
    stack: [],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: null,
    edges: [
      ["A", "B"],
      ["B", "D"],
      ["D", "G"],
      ["G", "E"],
      ["A", "C"],
      ["C", "F"],
    ],
    description:
      "F has no unvisited neighbors. Backtrack to C, then A. Stack empty — DFS complete! Order: A, B, D, G, E, C, F.",
    mathConcept: "O(|V| + |E|): \\text{each vertex and edge visited once}",
    codeLine: 12,
  },
];

export const graphDfsCode = `def dfs(graph, source):
    visited = set()
    order = []

    def explore(v):
        visited.add(v)              # Mark visited
        order.append(v)             # Record order
        for u in graph[v]:          # Visit neighbors
            if u not in visited:    # Skip if seen
                explore(u)          # Recurse deeper

    explore(source)
    return order`;

export const graphDfsBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "\\text{visited} = \\emptyset",
    codeLine: 2,
    description: "Initialize empty visited set to track explored vertices",
  },
  {
    math: "\\text{visited} \\leftarrow \\text{visited} \\cup \\{v\\}",
    codeLine: 6,
    description: "Mark the current vertex as visited",
  },
  {
    math: "\\forall u \\in \\text{Adj}(v)",
    codeLine: 8,
    description: "Iterate over all neighbors of the current vertex",
  },
  {
    math: "u \\notin \\text{visited} \\Rightarrow \\text{explore}(u)",
    codeLine: 10,
    description: "Recursively explore unvisited neighbors — go deep first",
  },
  {
    math: "O(|V| + |E|)",
    codeLine: 12,
    description: "Each vertex visited once, each edge checked once",
  },
];
