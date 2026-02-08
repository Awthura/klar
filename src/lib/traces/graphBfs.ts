export interface GraphBfsStep {
  queue: string[];
  visited: string[];
  current: string | null;
  discoveredThisStep: string[];
  edges: [string, string][];
  distances: Record<string, number>;
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

export const graphNodes: GraphNode[] = [
  { id: "A", x: 200, y: 60 },
  { id: "B", x: 100, y: 160 },
  { id: "C", x: 300, y: 160 },
  { id: "D", x: 50, y: 280 },
  { id: "E", x: 180, y: 280 },
  { id: "F", x: 320, y: 280 },
  { id: "G", x: 130, y: 380 },
];

export const graphEdges: GraphEdge[] = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
  { source: "B", target: "D" },
  { source: "B", target: "E" },
  { source: "C", target: "F" },
  { source: "E", target: "G" },
  { source: "D", target: "G" },
];

export const adjacencyList: Record<string, string[]> = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B", "G"],
  E: ["B", "G"],
  F: ["C"],
  G: ["E", "D"],
};

export const graphBfsTrace: GraphBfsStep[] = [
  {
    queue: ["A"],
    visited: ["A"],
    current: null,
    discoveredThisStep: ["A"],
    edges: [],
    distances: { A: 0 },
    description: "Initialize: enqueue source node A. Mark A as visited with distance 0.",
    mathConcept: "L_0 = \\{s\\},\\; \\text{dist}(s,s) = 0",
    codeLine: 4,
  },
  {
    queue: ["B", "C"],
    visited: ["A", "B", "C"],
    current: "A",
    discoveredThisStep: ["B", "C"],
    edges: [["A", "B"], ["A", "C"]],
    distances: { A: 0, B: 1, C: 1 },
    description: "Dequeue A. Discover neighbors B and C. Enqueue both with distance 1.",
    mathConcept: "L_1 = \\{v : (s,v) \\in E\\} = \\{B, C\\}",
    codeLine: 8,
  },
  {
    queue: ["C", "D", "E"],
    visited: ["A", "B", "C", "D", "E"],
    current: "B",
    discoveredThisStep: ["D", "E"],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2 },
    description: "Dequeue B. Discover neighbors D and E (A already visited). Enqueue with distance 2.",
    mathConcept: "L_2 = \\{v : \\text{dist}(s,v) = 2\\}",
    codeLine: 8,
  },
  {
    queue: ["D", "E", "F"],
    visited: ["A", "B", "C", "D", "E", "F"],
    current: "C",
    discoveredThisStep: ["F"],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2 },
    description: "Dequeue C. Discover neighbor F (A already visited). Enqueue F with distance 2.",
    mathConcept: "\\text{FIFO} \\Rightarrow \\text{layer-by-layer exploration}",
    codeLine: 8,
  },
  {
    queue: ["E", "F", "G"],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: "D",
    discoveredThisStep: ["G"],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["D", "G"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2, G: 3 },
    description: "Dequeue D. Discover neighbor G (B already visited). Enqueue G with distance 3.",
    mathConcept: "\\text{dist}(s, G) = \\text{dist}(s, D) + 1 = 3",
    codeLine: 8,
  },
  {
    queue: ["F", "G"],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: "E",
    discoveredThisStep: [],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["D", "G"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2, G: 3 },
    description: "Dequeue E. All neighbors (B, G) already visited. No new discoveries.",
    mathConcept: "v \\in \\text{visited} \\Rightarrow \\text{skip}",
    codeLine: 9,
  },
  {
    queue: ["G"],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: "F",
    discoveredThisStep: [],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["D", "G"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2, G: 3 },
    description: "Dequeue F. Neighbor C already visited. No new discoveries.",
    mathConcept: "v \\in \\text{visited} \\Rightarrow \\text{skip}",
    codeLine: 9,
  },
  {
    queue: [],
    visited: ["A", "B", "C", "D", "E", "F", "G"],
    current: null,
    discoveredThisStep: [],
    edges: [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["D", "G"]],
    distances: { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2, G: 3 },
    description: "Dequeue G. All neighbors visited. Queue is empty — BFS complete!",
    mathConcept: "\\text{Queue} = \\emptyset \\Rightarrow \\text{done}",
    codeLine: 6,
  },
];

export const graphBfsCode = `from collections import deque

def bfs(graph, source):
    visited = {source}              # Track visited nodes
    queue = deque([source])         # FIFO queue
    dist = {source: 0}             # Distance from source
    while queue:                    # Process until empty
        v = queue.popleft()         # Dequeue front
        for u in graph[v]:          # Visit neighbors
            if u not in visited:    # Skip if seen
                visited.add(u)      # Mark visited
                dist[u] = dist[v] + 1  # Set distance
                queue.append(u)     # Enqueue neighbor
    return dist`;

export const graphBfsBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\text{visited} = \\{s\\}",
    codeLine: 4,
    description: "Initialize visited set with the source node",
  },
  {
    math: "Q = \\text{deque}([s])",
    codeLine: 5,
    description: "FIFO queue ensures layer-by-layer traversal",
  },
  {
    math: "\\text{dist}(s) = 0",
    codeLine: 6,
    description: "Source has distance 0 from itself",
  },
  {
    math: "v = Q.\\text{popleft}()",
    codeLine: 8,
    description: "Dequeue the front node (FIFO order)",
  },
  {
    math: "\\forall u \\in \\text{Adj}(v)",
    codeLine: 9,
    description: "Iterate over all neighbors in adjacency list",
  },
  {
    math: "\\text{dist}(u) = \\text{dist}(v) + 1",
    codeLine: 12,
    description: "Distance grows by 1 each layer — shortest path in unweighted graph",
  },
];
