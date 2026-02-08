export interface QuickSortStep {
  array: number[];
  pivotIndex: number | null;
  activeRange: [number, number] | null;
  sorted: number[];
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const quickSortArray = [6, 3, 8, 2, 5, 1];

export const quickSortTrace: QuickSortStep[] = [
  {
    array: [6, 3, 8, 2, 5, 1],
    pivotIndex: null,
    activeRange: [0, 5],
    sorted: [],
    description:
      "Start with unsorted array. Quick Sort picks a pivot and partitions elements around it.",
    mathConcept: "T(n) = T(k) + T(n{-}k{-}1) + O(n)",
    codeLine: 1,
  },
  {
    array: [6, 3, 8, 2, 5, 1],
    pivotIndex: 5,
    activeRange: [0, 5],
    sorted: [],
    description:
      "Choose pivot = 1 (last element). Partition: elements ≤ 1 go left, > 1 go right.",
    mathConcept: "\\text{pivot} = A[hi] = 1",
    codeLine: 9,
  },
  {
    array: [1, 3, 8, 2, 5, 6],
    pivotIndex: 0,
    activeRange: [0, 5],
    sorted: [0],
    description:
      "After partition: 1 is placed at index 0 (its final position). No elements ≤ 1 on its left.",
    mathConcept: "A[\\text{pivot}] \\text{ is now in its sorted position}",
    codeLine: 15,
  },
  {
    array: [1, 3, 8, 2, 5, 6],
    pivotIndex: 5,
    activeRange: [1, 5],
    sorted: [0],
    description:
      "Recurse on right subarray [3, 8, 2, 5, 6]. Choose pivot = 6.",
    mathConcept: "\\text{Recurse: } A[1..5],\\; \\text{pivot} = 6",
    codeLine: 9,
  },
  {
    array: [1, 3, 2, 5, 6, 8],
    pivotIndex: 4,
    activeRange: [1, 5],
    sorted: [0, 4, 5],
    description:
      "After partition: 6 at index 4, 8 pushed to index 5. Both in final positions.",
    mathConcept: "\\text{Partition places pivot; larger elements go right}",
    codeLine: 15,
  },
  {
    array: [1, 3, 2, 5, 6, 8],
    pivotIndex: 3,
    activeRange: [1, 3],
    sorted: [0, 4, 5],
    description: "Recurse on [3, 2, 5]. Choose pivot = 5.",
    mathConcept: "\\text{Recurse: } A[1..3],\\; \\text{pivot} = 5",
    codeLine: 9,
  },
  {
    array: [1, 3, 2, 5, 6, 8],
    pivotIndex: 3,
    activeRange: [1, 3],
    sorted: [0, 3, 4, 5],
    description:
      "After partition: 5 stays at index 3. All elements left of it are smaller.",
    mathConcept: "A[1..2] < 5 \\text{ and } 5 \\text{ is placed correctly}",
    codeLine: 15,
  },
  {
    array: [1, 3, 2, 5, 6, 8],
    pivotIndex: 2,
    activeRange: [1, 2],
    sorted: [0, 3, 4, 5],
    description: "Recurse on [3, 2]. Choose pivot = 2.",
    mathConcept: "\\text{Recurse: } A[1..2],\\; \\text{pivot} = 2",
    codeLine: 9,
  },
  {
    array: [1, 2, 3, 5, 6, 8],
    pivotIndex: 1,
    activeRange: [1, 2],
    sorted: [0, 1, 2, 3, 4, 5],
    description:
      "After partition: 2 at index 1, 3 at index 2. Array is fully sorted!",
    mathConcept: "T(n) = O(n \\log n) \\text{ average case}",
    codeLine: 15,
  },
];

export const quickSortCode = `def quick_sort(A, lo=0, hi=None):
    if hi is None: hi = len(A) - 1
    if lo < hi:
        p = partition(A, lo, hi)     # Partition
        quick_sort(A, lo, p - 1)     # Sort left
        quick_sort(A, p + 1, hi)     # Sort right

def partition(A, lo, hi):
    pivot = A[hi]                    # Choose last as pivot
    i = lo
    for j in range(lo, hi):         # Scan elements
        if A[j] <= pivot:
            A[i], A[j] = A[j], A[i] # Swap to left
            i += 1
    A[i], A[hi] = A[hi], A[i]       # Place pivot
    return i`;

export const quickSortBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "\\text{if } lo < hi",
    codeLine: 3,
    description: "Base case: subarrays of size ≤ 1 are already sorted",
  },
  {
    math: "p = \\text{partition}(A, lo, hi)",
    codeLine: 4,
    description: "Partition returns the final index of the pivot",
  },
  {
    math: "T(k) + T(n{-}k{-}1)",
    codeLine: 5,
    description: "Two recursive calls on subarrays left and right of pivot",
  },
  {
    math: "\\text{pivot} = A[hi]",
    codeLine: 9,
    description: "Lomuto partition: choose the last element as pivot",
  },
  {
    math: "A[j] \\leq \\text{pivot} \\Rightarrow \\text{swap to left}",
    codeLine: 13,
    description: "Move elements ≤ pivot to the left partition",
  },
  {
    math: "A[i] \\leftrightarrow A[hi] \\Rightarrow \\text{pivot in place}",
    codeLine: 15,
    description: "Place pivot in its final sorted position",
  },
];
