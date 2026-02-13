export interface Algorithm {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  complexity: string;
}

export const algorithms: Algorithm[] = [
  {
    slug: "binary-search",
    name: "Binary Search",
    shortName: "Binary Search",
    category: "Search",
    description: "Efficiently find an element in a sorted array by halving the search space each step.",
    complexity: "O(log n)",
  },
  {
    slug: "merge-sort",
    name: "Merge Sort",
    shortName: "Merge Sort",
    category: "Sorting",
    description: "Divide-and-conquer sorting that recursively splits and merges sorted subarrays.",
    complexity: "O(n log n)",
  },
  {
    slug: "graph-bfs",
    name: "Graph BFS",
    shortName: "Graph BFS",
    category: "Graphs",
    description: "Explore a graph layer by layer to find shortest paths in unweighted graphs.",
    complexity: "O(V + E)",
  },
  {
    slug: "a-star",
    name: "A* Search",
    shortName: "A* Search",
    category: "Graphs",
    description: "Pathfinding with heuristic guidance — combines Dijkstra's optimality with greedy best-first speed.",
    complexity: "O((V + E) log V)",
  },
  {
    slug: "topological-sort",
    name: "Topological Sort",
    shortName: "Topo Sort",
    category: "Graphs",
    description: "Order vertices of a directed acyclic graph so every edge goes from earlier to later in the ordering.",
    complexity: "O(V + E)",
  },
  {
    slug: "union-find",
    name: "Union-Find (Disjoint Set)",
    shortName: "Union-Find",
    category: "Data Structures",
    description: "Efficiently track and merge disjoint sets using union by rank and path compression.",
    complexity: "O(α(n))",
  },
  {
    slug: "trie",
    name: "Trie (Prefix Tree)",
    shortName: "Trie",
    category: "Data Structures",
    description: "A tree-shaped data structure for efficient string storage, search, and prefix matching.",
    complexity: "O(m)",
  },
  {
    slug: "insertion-sort",
    name: "Insertion Sort",
    shortName: "Insertion Sort",
    category: "Sorting",
    description: "Build a sorted array one element at a time by inserting each into its correct position.",
    complexity: "O(n²)",
  },
];
