export interface Topic {
  slug: string;
  name: string;
  description: string;
  complexity?: string;
  category?: string;
}

export interface Subject {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  basePath: string;
  topics: Topic[];
}

export const subjects: Subject[] = [
  {
    slug: "dsa",
    name: "Data Structures & Algorithms",
    shortName: "DSA",
    description:
      "Fundamental algorithms and data structures through math-first learning.",
    icon: "📐",
    basePath: "/algorithms",
    topics: [
      {
        slug: "binary-search",
        name: "Binary Search",
        description:
          "Efficiently find an element in a sorted array by halving the search space each step.",
        complexity: "O(log n)",
        category: "Search",
      },
      {
        slug: "merge-sort",
        name: "Merge Sort",
        description:
          "Divide-and-conquer sorting that recursively splits and merges sorted subarrays.",
        complexity: "O(n log n)",
        category: "Sorting",
      },
      {
        slug: "graph-bfs",
        name: "Graph BFS",
        description:
          "Explore a graph layer by layer to find shortest paths in unweighted graphs.",
        complexity: "O(V + E)",
        category: "Graphs",
      },
      {
        slug: "quick-sort",
        name: "Quick Sort",
        description:
          "Partition-based sorting that picks a pivot and recursively sorts subarrays in-place.",
        complexity: "O(n log n)",
        category: "Sorting",
      },
      {
        slug: "graph-dfs",
        name: "Graph DFS",
        description:
          "Traverse a graph by exploring as deep as possible before backtracking.",
        complexity: "O(V + E)",
        category: "Graphs",
      },
      {
        slug: "dijkstra",
        name: "Dijkstra's Algorithm",
        description:
          "Find shortest paths from a source vertex in a weighted graph with non-negative edges.",
        complexity: "O((V + E) log V)",
        category: "Graphs",
      },
      {
        slug: "hash-table",
        name: "Hash Table",
        description:
          "Map keys to values using a hash function for constant-time average lookups and inserts.",
        complexity: "O(1) avg",
        category: "Data Structures",
      },
      {
        slug: "binary-search-tree",
        name: "Binary Search Tree",
        description:
          "A rooted binary tree where each node's left subtree has smaller keys and right subtree has larger keys.",
        complexity: "O(log n)",
        category: "Trees",
      },
      {
        slug: "heap",
        name: "Heap & Priority Queue",
        description:
          "A complete binary tree satisfying the heap property, enabling efficient min/max extraction.",
        complexity: "O(log n)",
        category: "Data Structures",
      },
      {
        slug: "dynamic-programming",
        name: "Dynamic Programming",
        description:
          "Solve complex problems by breaking them into overlapping subproblems and caching results.",
        complexity: "Varies",
        category: "Optimization",
      },
    ],
  },
];
