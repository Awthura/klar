export interface TopologicalSortStep {
  visited: string[];
  stack: string[];
  current: string | null;
  inProgress: string[];
  edges: [string, string][];
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const topoNodes = ["A", "B", "C", "D", "E", "F", "G"];
export const topoEdges: [string, string][] = [
  ["A", "C"],
  ["A", "D"],
  ["B", "D"],
  ["B", "E"],
  ["C", "F"],
  ["D", "F"],
  ["D", "G"],
  ["E", "G"],
];

// Position layout for visualization
export const topoPositions: Record<string, { x: number; y: number }> = {
  A: { x: 80, y: 40 },
  B: { x: 220, y: 40 },
  C: { x: 40, y: 140 },
  D: { x: 150, y: 140 },
  E: { x: 280, y: 140 },
  F: { x: 100, y: 240 },
  G: { x: 220, y: 240 },
};

export const topologicalSortTrace: TopologicalSortStep[] = [
  {
    visited: [],
    stack: [],
    current: null,
    inProgress: [],
    edges: topoEdges,
    description: "Initialize: no nodes visited. We will DFS from each unvisited node.",
    mathConcept: "\\text{visited} = \\emptyset, \\quad \\text{stack} = []",
    codeLine: 2,
  },
  {
    visited: [],
    stack: [],
    current: "A",
    inProgress: ["A"],
    edges: topoEdges,
    description: "Start DFS from node A. Mark A as in-progress.",
    mathConcept: "\\text{DFS}(A): \\text{exploring neighbors of } A",
    codeLine: 5,
  },
  {
    visited: [],
    stack: [],
    current: "C",
    inProgress: ["A", "C"],
    edges: topoEdges,
    description: "DFS from A → visit neighbor C. Mark C as in-progress.",
    mathConcept: "(A, C) \\in E \\;\\Rightarrow\\; \\text{DFS}(C)",
    codeLine: 7,
  },
  {
    visited: [],
    stack: [],
    current: "F",
    inProgress: ["A", "C", "F"],
    edges: topoEdges,
    description: "DFS from C → visit neighbor F. Mark F as in-progress.",
    mathConcept: "(C, F) \\in E \\;\\Rightarrow\\; \\text{DFS}(F)",
    codeLine: 7,
  },
  {
    visited: ["F"],
    stack: ["F"],
    current: "F",
    inProgress: ["A", "C"],
    edges: topoEdges,
    description: "F has no unvisited neighbors. Push F onto stack. Backtrack to C.",
    mathConcept: "\\text{finish}(F) \\;\\Rightarrow\\; \\text{stack.push}(F)",
    codeLine: 9,
  },
  {
    visited: ["F", "C"],
    stack: ["F", "C"],
    current: "C",
    inProgress: ["A"],
    edges: topoEdges,
    description: "C's neighbors all visited. Push C onto stack. Backtrack to A.",
    mathConcept: "\\text{finish}(C) \\;\\Rightarrow\\; \\text{stack.push}(C)",
    codeLine: 9,
  },
  {
    visited: ["F", "C"],
    stack: ["F", "C"],
    current: "D",
    inProgress: ["A", "D"],
    edges: topoEdges,
    description: "From A, visit next neighbor D. Mark D as in-progress.",
    mathConcept: "(A, D) \\in E \\;\\Rightarrow\\; \\text{DFS}(D)",
    codeLine: 7,
  },
  {
    visited: ["F", "C"],
    stack: ["F", "C"],
    current: "G",
    inProgress: ["A", "D", "G"],
    edges: topoEdges,
    description: "DFS from D → F already visited, visit G. Mark G as in-progress.",
    mathConcept: "(D, G) \\in E \\;\\Rightarrow\\; \\text{DFS}(G)",
    codeLine: 7,
  },
  {
    visited: ["F", "C", "G"],
    stack: ["F", "C", "G"],
    current: "G",
    inProgress: ["A", "D"],
    edges: topoEdges,
    description: "G has no unvisited neighbors. Push G onto stack. Backtrack to D.",
    mathConcept: "\\text{finish}(G) \\;\\Rightarrow\\; \\text{stack.push}(G)",
    codeLine: 9,
  },
  {
    visited: ["F", "C", "G", "D"],
    stack: ["F", "C", "G", "D"],
    current: "D",
    inProgress: ["A"],
    edges: topoEdges,
    description: "D's neighbors all visited. Push D onto stack. Backtrack to A.",
    mathConcept: "\\text{finish}(D) \\;\\Rightarrow\\; \\text{stack.push}(D)",
    codeLine: 9,
  },
  {
    visited: ["F", "C", "G", "D", "A"],
    stack: ["F", "C", "G", "D", "A"],
    current: "A",
    inProgress: [],
    edges: topoEdges,
    description: "A's neighbors all visited. Push A onto stack. DFS from A complete.",
    mathConcept: "\\text{finish}(A) \\;\\Rightarrow\\; \\text{stack.push}(A)",
    codeLine: 9,
  },
  {
    visited: ["F", "C", "G", "D", "A"],
    stack: ["F", "C", "G", "D", "A"],
    current: "B",
    inProgress: ["B"],
    edges: topoEdges,
    description: "B is unvisited. Start DFS from B. Mark B as in-progress.",
    mathConcept: "B \\notin \\text{visited} \\;\\Rightarrow\\; \\text{DFS}(B)",
    codeLine: 5,
  },
  {
    visited: ["F", "C", "G", "D", "A"],
    stack: ["F", "C", "G", "D", "A"],
    current: "E",
    inProgress: ["B", "E"],
    edges: topoEdges,
    description: "From B, D already visited. Visit E. Mark E as in-progress.",
    mathConcept: "(B, E) \\in E \\;\\Rightarrow\\; \\text{DFS}(E)",
    codeLine: 7,
  },
  {
    visited: ["F", "C", "G", "D", "A", "E"],
    stack: ["F", "C", "G", "D", "A", "E"],
    current: "E",
    inProgress: ["B"],
    edges: topoEdges,
    description: "E's neighbor G already visited. Push E onto stack. Backtrack to B.",
    mathConcept: "\\text{finish}(E) \\;\\Rightarrow\\; \\text{stack.push}(E)",
    codeLine: 9,
  },
  {
    visited: ["F", "C", "G", "D", "A", "E", "B"],
    stack: ["F", "C", "G", "D", "A", "E", "B"],
    current: "B",
    inProgress: [],
    edges: topoEdges,
    description: "B's neighbors all visited. Push B onto stack. All nodes processed!",
    mathConcept: "\\text{finish}(B) \\;\\Rightarrow\\; \\text{stack.push}(B)",
    codeLine: 9,
  },
  {
    visited: ["F", "C", "G", "D", "A", "E", "B"],
    stack: ["F", "C", "G", "D", "A", "E", "B"],
    current: null,
    inProgress: [],
    edges: topoEdges,
    description: "Reverse the stack → Topological order: B, E, A, D, G, C, F. All edges go left→right.",
    mathConcept: "\\text{order} = \\text{stack.reverse()} = [B, E, A, D, G, C, F]",
    codeLine: 11,
  },
];

export const topologicalSortCode = `def topological_sort(graph):
    visited = set()
    stack = []

    def dfs(node):
        visited.add(node)              # Mark as visited
        for neighbor in graph[node]:   # Visit all neighbors
            if neighbor not in visited:
                dfs(neighbor)          # Recurse on unvisited
        stack.append(node)             # Push after all descendants done

    for node in graph:                 # Process all components
        if node not in visited:
            dfs(node)

    return stack[::-1]                 # Reverse = topological order`;

export const topologicalSortBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\text{visited} = \\emptyset",
    codeLine: 2,
    description: "Track which nodes have been fully processed",
  },
  {
    math: "\\text{stack} = []",
    codeLine: 3,
    description: "Stack collects nodes in reverse topological order",
  },
  {
    math: "u \\to \\text{visited}",
    codeLine: 6,
    description: "Mark node as visited when DFS enters it",
  },
  {
    math: "(u, v) \\in E \\;\\land\\; v \\notin \\text{visited}",
    codeLine: 7,
    description: "For each edge, recurse on unvisited neighbors",
  },
  {
    math: "\\text{finish}(u) \\Rightarrow \\text{stack.push}(u)",
    codeLine: 10,
    description: "Push node to stack when all descendants are processed (finish time)",
  },
  {
    math: "\\text{reverse(stack)} = \\text{topological order}",
    codeLine: 15,
    description: "Reversing finish-time order gives valid topological ordering",
  },
];
