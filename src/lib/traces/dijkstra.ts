export interface DijkstraStep {
  distances: Record<string, number | null>;
  visited: string[];
  current: string | null;
  relaxedEdge: [string, string] | null;
  pq: [number, string][];
  description: string;
  mathConcept: string;
  codeLine: number;
}

export interface DijkstraNode {
  id: string;
  x: number;
  y: number;
}

export interface DijkstraEdge {
  source: string;
  target: string;
  weight: number;
}

export const dijkstraNodes: DijkstraNode[] = [
  { id: "A", x: 60, y: 150 },
  { id: "B", x: 200, y: 50 },
  { id: "C", x: 200, y: 250 },
  { id: "D", x: 350, y: 120 },
  { id: "E", x: 350, y: 270 },
];

export const dijkstraEdges: DijkstraEdge[] = [
  { source: "A", target: "B", weight: 4 },
  { source: "A", target: "C", weight: 2 },
  { source: "C", target: "B", weight: 1 },
  { source: "C", target: "D", weight: 4 },
  { source: "C", target: "E", weight: 5 },
  { source: "B", target: "D", weight: 3 },
  { source: "E", target: "D", weight: 1 },
];

export const dijkstraTrace: DijkstraStep[] = [
  {
    distances: { A: 0, B: null, C: null, D: null, E: null },
    visited: [],
    current: null,
    relaxedEdge: null,
    pq: [[0, "A"]],
    description:
      "Initialize: set dist(A) = 0, all others = ∞. Push source A into the priority queue.",
    mathConcept: "\\text{dist}(s) = 0,\\; \\text{dist}(v) = \\infty\\; \\forall v \\neq s",
    codeLine: 5,
  },
  {
    distances: { A: 0, B: 4, C: 2, D: null, E: null },
    visited: ["A"],
    current: "A",
    relaxedEdge: null,
    pq: [
      [2, "C"],
      [4, "B"],
    ],
    description:
      "Extract A (dist 0). Relax A→B: 0+4=4. Relax A→C: 0+2=2. Push both.",
    mathConcept:
      "\\text{dist}(B) = \\min(\\infty, 0{+}4) = 4,\\; \\text{dist}(C) = \\min(\\infty, 0{+}2) = 2",
    codeLine: 10,
  },
  {
    distances: { A: 0, B: 3, C: 2, D: 6, E: 7 },
    visited: ["A", "C"],
    current: "C",
    relaxedEdge: ["C", "B"],
    pq: [
      [3, "B"],
      [4, "B"],
      [6, "D"],
      [7, "E"],
    ],
    description:
      "Extract C (dist 2). Relax C→B: 2+1=3 < 4 ✓ (update!). C→D: 2+4=6. C→E: 2+5=7.",
    mathConcept:
      "\\text{dist}(B) = \\min(4,\\; 2{+}1) = 3 \\;\\text{(improved!)}",
    codeLine: 14,
  },
  {
    distances: { A: 0, B: 3, C: 2, D: 6, E: 7 },
    visited: ["A", "B", "C"],
    current: "B",
    relaxedEdge: null,
    pq: [
      [4, "B"],
      [6, "D"],
      [7, "E"],
    ],
    description:
      "Extract B (dist 3). Relax B→D: 3+3=6 = 6 (no improvement). B→C: already visited.",
    mathConcept:
      "\\text{dist}(D) = \\min(6,\\; 3{+}3) = 6 \\;\\text{(no change)}",
    codeLine: 14,
  },
  {
    distances: { A: 0, B: 3, C: 2, D: 6, E: 7 },
    visited: ["A", "B", "C", "D"],
    current: "D",
    relaxedEdge: null,
    pq: [[7, "E"]],
    description:
      "Skip stale B entry. Extract D (dist 6). D has no outgoing edges to relax.",
    mathConcept: "v \\in \\text{visited} \\Rightarrow \\text{skip stale entry}",
    codeLine: 11,
  },
  {
    distances: { A: 0, B: 3, C: 2, D: 6, E: 7 },
    visited: ["A", "B", "C", "D", "E"],
    current: "E",
    relaxedEdge: null,
    pq: [],
    description:
      "Extract E (dist 7). Relax E→D: 7+1=8 > 6 (no improvement). Priority queue empty — done!",
    mathConcept:
      "\\text{dist}(D) = \\min(6,\\; 7{+}1) = 6 \\;\\text{(no change)}",
    codeLine: 14,
  },
  {
    distances: { A: 0, B: 3, C: 2, D: 6, E: 7 },
    visited: ["A", "B", "C", "D", "E"],
    current: null,
    relaxedEdge: null,
    pq: [],
    description:
      "All shortest distances found! A:0, B:3 (via C), C:2, D:6 (via C or B), E:7 (via C).",
    mathConcept:
      "\\forall v: \\text{dist}(s,v) \\text{ is optimal (greedy choice)}",
    codeLine: 17,
  },
];

export const dijkstraCode = `import heapq

def dijkstra(graph, source):
    dist = {v: float('inf') for v in graph}
    dist[source] = 0                # Source distance
    pq = [(0, source)]              # Priority queue
    visited = set()

    while pq:
        d, v = heapq.heappop(pq)    # Extract min
        if v in visited: continue    # Skip stale
        visited.add(v)
        for u, w in graph[v]:        # Check neighbors
            if dist[v] + w < dist[u]:   # Relaxation
                dist[u] = dist[v] + w
                heapq.heappush(pq, (dist[u], u))
    return dist`;

export const dijkstraBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "\\text{dist}(s) = 0,\\; \\text{dist}(v) = \\infty",
    codeLine: 5,
    description: "Initialize source distance to 0, all others to infinity",
  },
  {
    math: "(d, v) = \\text{extractMin}(PQ)",
    codeLine: 10,
    description: "Greedily extract the vertex with smallest tentative distance",
  },
  {
    math: "v \\in S \\Rightarrow \\text{skip}",
    codeLine: 11,
    description: "Skip already-finalized vertices (stale PQ entries)",
  },
  {
    math: "\\forall (v, u, w) \\in E",
    codeLine: 13,
    description: "Check all outgoing edges from the current vertex",
  },
  {
    math: "\\text{dist}(u) = \\min(\\text{dist}(u),\\; \\text{dist}(v) + w)",
    codeLine: 14,
    description: "Relaxation: update distance if a shorter path is found",
  },
];
