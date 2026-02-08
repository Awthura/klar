export interface BstNode {
  key: number;
  x: number;
  y: number;
}

export interface BstEdge {
  parent: number;
  child: number;
}

export interface BstStep {
  nodes: BstNode[];
  edges: BstEdge[];
  highlightPath: number[];
  insertingKey: number | null;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const bstInsertOrder = [5, 3, 7, 1, 4, 6, 8];

const positions: Record<number, { x: number; y: number }> = {
  5: { x: 200, y: 40 },
  3: { x: 120, y: 120 },
  7: { x: 280, y: 120 },
  1: { x: 80, y: 200 },
  4: { x: 160, y: 200 },
  6: { x: 240, y: 200 },
  8: { x: 320, y: 200 },
};

export const bstTrace: BstStep[] = [
  {
    nodes: [],
    edges: [],
    highlightPath: [],
    insertingKey: 5,
    description: "Empty tree. Insert 5 as the root node.",
    mathConcept: "\\text{root} = \\text{nil} \\Rightarrow \\text{create node}(5)",
    codeLine: 3,
  },
  {
    nodes: [{ key: 5, ...positions[5] }],
    edges: [],
    highlightPath: [5],
    insertingKey: 3,
    description: "Insert 3: compare with root 5. Since 3 < 5, go left. Place as left child.",
    mathConcept: "3 < 5 \\Rightarrow \\text{insert left}",
    codeLine: 5,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
    ],
    edges: [{ parent: 5, child: 3 }],
    highlightPath: [5, 7],
    insertingKey: 7,
    description:
      "Insert 7: compare with root 5. Since 7 > 5, go right. Place as right child.",
    mathConcept: "7 > 5 \\Rightarrow \\text{insert right}",
    codeLine: 7,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
      { key: 7, ...positions[7] },
    ],
    edges: [
      { parent: 5, child: 3 },
      { parent: 5, child: 7 },
    ],
    highlightPath: [5, 3, 1],
    insertingKey: 1,
    description:
      "Insert 1: 1 < 5 → go left to 3. 1 < 3 → go left. Place as left child of 3.",
    mathConcept: "1 < 5 \\to 1 < 3 \\Rightarrow \\text{left of } 3",
    codeLine: 5,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
      { key: 7, ...positions[7] },
      { key: 1, ...positions[1] },
    ],
    edges: [
      { parent: 5, child: 3 },
      { parent: 5, child: 7 },
      { parent: 3, child: 1 },
    ],
    highlightPath: [5, 3, 4],
    insertingKey: 4,
    description:
      "Insert 4: 4 < 5 → go left to 3. 4 > 3 → go right. Place as right child of 3.",
    mathConcept: "4 < 5 \\to 4 > 3 \\Rightarrow \\text{right of } 3",
    codeLine: 7,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
      { key: 7, ...positions[7] },
      { key: 1, ...positions[1] },
      { key: 4, ...positions[4] },
    ],
    edges: [
      { parent: 5, child: 3 },
      { parent: 5, child: 7 },
      { parent: 3, child: 1 },
      { parent: 3, child: 4 },
    ],
    highlightPath: [5, 7, 6],
    insertingKey: 6,
    description:
      "Insert 6: 6 > 5 → go right to 7. 6 < 7 → go left. Place as left child of 7.",
    mathConcept: "6 > 5 \\to 6 < 7 \\Rightarrow \\text{left of } 7",
    codeLine: 5,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
      { key: 7, ...positions[7] },
      { key: 1, ...positions[1] },
      { key: 4, ...positions[4] },
      { key: 6, ...positions[6] },
    ],
    edges: [
      { parent: 5, child: 3 },
      { parent: 5, child: 7 },
      { parent: 3, child: 1 },
      { parent: 3, child: 4 },
      { parent: 7, child: 6 },
    ],
    highlightPath: [5, 7, 8],
    insertingKey: 8,
    description:
      "Insert 8: 8 > 5 → go right to 7. 8 > 7 → go right. Place as right child of 7.",
    mathConcept: "8 > 5 \\to 8 > 7 \\Rightarrow \\text{right of } 7",
    codeLine: 7,
  },
  {
    nodes: [
      { key: 5, ...positions[5] },
      { key: 3, ...positions[3] },
      { key: 7, ...positions[7] },
      { key: 1, ...positions[1] },
      { key: 4, ...positions[4] },
      { key: 6, ...positions[6] },
      { key: 8, ...positions[8] },
    ],
    edges: [
      { parent: 5, child: 3 },
      { parent: 5, child: 7 },
      { parent: 3, child: 1 },
      { parent: 3, child: 4 },
      { parent: 7, child: 6 },
      { parent: 7, child: 8 },
    ],
    highlightPath: [5, 3, 4],
    insertingKey: null,
    description:
      "Tree complete! Search for 4: 4 < 5 → left → 4 > 3 → right → found! Height = 2, so O(log n) operations.",
    mathConcept:
      "h = O(\\log n) \\text{ for balanced BST}",
    codeLine: 12,
  },
];

export const bstCode = `class Node:
    def __init__(self, key):
        self.key = key
        self.left = self.right = None

def insert(root, key):
    if root is None:
        return Node(key)              # Create leaf
    if key < root.key:
        root.left = insert(root.left, key)   # Go left
    else:
        root.right = insert(root.right, key) # Go right
    return root

def search(root, key):
    if root is None or root.key == key:
        return root                    # Found or miss
    if key < root.key:
        return search(root.left, key)  # Search left
    return search(root.right, key)     # Search right`;

export const bstBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "\\text{root} = \\text{nil} \\Rightarrow \\text{Node}(k)",
    codeLine: 8,
    description: "Base case: empty subtree — create a new leaf node",
  },
  {
    math: "k < \\text{root.key} \\Rightarrow \\text{insert left}",
    codeLine: 10,
    description: "BST property: smaller keys go in the left subtree",
  },
  {
    math: "k \\geq \\text{root.key} \\Rightarrow \\text{insert right}",
    codeLine: 12,
    description: "BST property: larger keys go in the right subtree",
  },
  {
    math: "\\text{root.key} = k \\Rightarrow \\text{found}",
    codeLine: 17,
    description: "Search: if current node matches, return it",
  },
  {
    math: "T(n) = O(h),\\; h = O(\\log n) \\text{ balanced}",
    codeLine: 19,
    description: "Operations take O(height) time — O(log n) when balanced",
  },
];
