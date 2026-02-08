export interface HeapStep {
  array: number[];
  highlightIndices: number[];
  swapping: [number, number] | null;
  phase: "build" | "extract";
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const heapInitialArray = [4, 10, 3, 5, 1, 8, 2];

export const heapTrace: HeapStep[] = [
  {
    array: [4, 10, 3, 5, 1, 8, 2],
    highlightIndices: [],
    swapping: null,
    phase: "build",
    description:
      "Start with unordered array. Build a min-heap by sifting down from the last non-leaf node upward.",
    mathConcept:
      "\\text{Build-Heap: sift down from } \\lfloor n/2 \\rfloor - 1 \\text{ to } 0",
    codeLine: 3,
  },
  {
    array: [4, 10, 3, 5, 1, 8, 2],
    highlightIndices: [2, 5, 6],
    swapping: null,
    phase: "build",
    description:
      "Sift down index 2 (value 3). Children: 8 (idx 5), 2 (idx 6). Min child is 2 < 3 → swap.",
    mathConcept:
      "\\text{children}(i) = (2i{+}1,\\; 2i{+}2) = (5, 6)",
    codeLine: 9,
  },
  {
    array: [4, 10, 2, 5, 1, 8, 3],
    highlightIndices: [2, 6],
    swapping: [2, 6],
    phase: "build",
    description: "Swapped indices 2 and 6: value 3 ↔ 2. Subtree at index 2 now satisfies heap property.",
    mathConcept: "A[2] = 2 \\leq \\min(A[5], A[6]) \\;\\checkmark",
    codeLine: 14,
  },
  {
    array: [4, 10, 2, 5, 1, 8, 3],
    highlightIndices: [1, 3, 4],
    swapping: null,
    phase: "build",
    description:
      "Sift down index 1 (value 10). Children: 5 (idx 3), 1 (idx 4). Min child is 1 < 10 → swap.",
    mathConcept:
      "\\text{children}(1) = (3, 4),\\; \\min(5, 1) = 1",
    codeLine: 9,
  },
  {
    array: [4, 1, 2, 5, 10, 8, 3],
    highlightIndices: [1, 4],
    swapping: [1, 4],
    phase: "build",
    description:
      "Swapped indices 1 and 4: value 10 ↔ 1. Index 4 is a leaf — no further sifting needed.",
    mathConcept: "A[1] = 1 \\leq \\min(A[3], A[4]) \\;\\checkmark",
    codeLine: 14,
  },
  {
    array: [4, 1, 2, 5, 10, 8, 3],
    highlightIndices: [0, 1, 2],
    swapping: null,
    phase: "build",
    description:
      "Sift down index 0 (value 4). Children: 1 (idx 1), 2 (idx 2). Min child is 1 < 4 → swap.",
    mathConcept:
      "\\text{children}(0) = (1, 2),\\; \\min(1, 2) = 1",
    codeLine: 9,
  },
  {
    array: [1, 4, 2, 5, 10, 8, 3],
    highlightIndices: [0, 1],
    swapping: [0, 1],
    phase: "build",
    description:
      "Swapped indices 0 and 1: value 4 ↔ 1. Check new position of 4: children are 5, 10. 4 < 5 — done.",
    mathConcept: "A[0] = 1 = \\min(A) \\;\\checkmark \\;\\text{(heap built!)}",
    codeLine: 14,
  },
  {
    array: [1, 4, 2, 5, 10, 8, 3],
    highlightIndices: [],
    swapping: null,
    phase: "build",
    description:
      "Min-heap built! Root is the minimum (1). Parent ≤ children at every node. Build took O(n) time.",
    mathConcept:
      "\\text{Build-Heap: } O(n),\\; \\text{not } O(n \\log n)",
    codeLine: 4,
  },
  {
    array: [3, 4, 2, 5, 10, 8],
    highlightIndices: [0],
    swapping: null,
    phase: "extract",
    description:
      "Extract min: remove root (1), move last element (3) to root. Sift down to restore heap.",
    mathConcept:
      "\\text{extractMin}: A[0] \\leftrightarrow A[n{-}1],\\; \\text{sift down}",
    codeLine: 17,
  },
  {
    array: [2, 4, 3, 5, 10, 8],
    highlightIndices: [0, 2],
    swapping: [0, 2],
    phase: "extract",
    description:
      "Sift down 3: children are 4, 2. Min child 2 < 3 → swap. Heap property restored! Extracted min = 1.",
    mathConcept:
      "\\text{extractMin}: O(\\log n) \\text{ for sift-down}",
    codeLine: 20,
  },
];

export const heapCode = `def build_min_heap(A):
    n = len(A)
    for i in range(n // 2 - 1, -1, -1):
        sift_down(A, i, n)          # Heapify subtree

def sift_down(A, i, n):
    smallest = i
    left, right = 2*i + 1, 2*i + 2
    if left < n and A[left] < A[smallest]:
        smallest = left              # Left is smaller
    if right < n and A[right] < A[smallest]:
        smallest = right             # Right is smaller
    if smallest != i:
        A[i], A[smallest] = A[smallest], A[i]
        sift_down(A, smallest, n)    # Recurse down

def extract_min(A):
    min_val = A[0]                   # Root is min
    A[0] = A[-1]                     # Move last to root
    A.pop()
    sift_down(A, 0, len(A))         # Restore heap
    return min_val`;

export const heapBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "\\text{for } i = \\lfloor n/2 \\rfloor - 1 \\text{ downto } 0",
    codeLine: 3,
    description: "Build heap bottom-up from last non-leaf to root",
  },
  {
    math: "\\text{children}(i) = (2i{+}1,\\; 2i{+}2)",
    codeLine: 8,
    description: "In array representation, children are at indices 2i+1 and 2i+2",
  },
  {
    math: "A[i] > A[\\text{child}] \\Rightarrow \\text{swap}",
    codeLine: 14,
    description: "If parent is larger than smallest child, swap to restore heap",
  },
  {
    math: "\\text{min} = A[0]",
    codeLine: 18,
    description: "Root of min-heap is always the minimum element",
  },
  {
    math: "\\text{extractMin}: O(\\log n)",
    codeLine: 21,
    description: "Replace root with last element and sift down — O(log n)",
  },
];
