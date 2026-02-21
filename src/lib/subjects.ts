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
      {
        slug: "a-star",
        name: "A* Search",
        description:
          "Pathfinding with heuristic guidance — combines Dijkstra's optimality with greedy best-first speed.",
        complexity: "O((V + E) log V)",
        category: "Graphs",
      },
      {
        slug: "topological-sort",
        name: "Topological Sort",
        description:
          "Order vertices of a directed acyclic graph so every edge goes from earlier to later in the ordering.",
        complexity: "O(V + E)",
        category: "Graphs",
      },
      {
        slug: "union-find",
        name: "Union-Find (Disjoint Set)",
        description:
          "Efficiently track and merge disjoint sets using union by rank and path compression.",
        complexity: "O(α(n))",
        category: "Data Structures",
      },
      {
        slug: "trie",
        name: "Trie (Prefix Tree)",
        description:
          "A tree-shaped data structure for efficient string storage, search, and prefix matching.",
        complexity: "O(m)",
        category: "Data Structures",
      },
      {
        slug: "insertion-sort",
        name: "Insertion Sort",
        description:
          "Build a sorted array one element at a time by inserting each into its correct position.",
        complexity: "O(n²)",
        category: "Sorting",
      },
    ],
  },
  {
    slug: "ml",
    name: "Machine Learning",
    shortName: "ML",
    description:
      "Foundational machine learning algorithms through math-first learning.",
    icon: "🧠",
    basePath: "/ml",
    topics: [
      {
        slug: "linear-regression",
        name: "Linear Regression",
        description:
          "Fit a line to data by minimizing mean squared error using gradient descent.",
        category: "Regression",
      },
      {
        slug: "knn",
        name: "k-Nearest Neighbors",
        description:
          "Classify a point by majority vote of its k closest neighbors in feature space.",
        category: "Classification",
      },
      {
        slug: "k-means",
        name: "K-Means Clustering",
        description:
          "Partition data into k clusters by iteratively assigning points and updating centroids.",
        category: "Clustering",
      },
      {
        slug: "logistic-regression",
        name: "Logistic Regression",
        description:
          "Binary classification using the sigmoid function and cross-entropy loss.",
        category: "Classification",
      },
      {
        slug: "decision-tree",
        name: "Decision Tree",
        description:
          "Recursively split feature space using information gain to build interpretable classifiers.",
        category: "Classification",
      },
      {
        slug: "svm",
        name: "Support Vector Machine",
        description:
          "Find the maximum-margin hyperplane that separates two classes, with support vectors defining the boundary.",
        category: "Classification",
      },
      {
        slug: "pca",
        name: "Principal Component Analysis",
        description:
          "Reduce dimensionality by projecting data onto the directions of maximum variance.",
        category: "Dimensionality Reduction",
      },
      {
        slug: "random-forest",
        name: "Random Forest",
        description:
          "Ensemble of decision trees trained on bootstrapped data with feature subsampling.",
        category: "Ensemble",
      },
      {
        slug: "neural-network",
        name: "Neural Network",
        description:
          "Multi-layer perceptron that learns nonlinear decision boundaries via backpropagation.",
        category: "Deep Learning",
      },
      {
        slug: "naive-bayes",
        name: "Naive Bayes",
        description:
          "Probabilistic classifier using Bayes' theorem with the conditional independence assumption.",
        category: "Classification",
      },
    ],
  },
];
