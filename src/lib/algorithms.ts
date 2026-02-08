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
];
