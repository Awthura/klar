export interface InsertionSortStep {
  array: number[];
  currentIndex: number;
  comparingIndex: number | null;
  sortedBoundary: number;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const insertionSortArray = [5, 2, 8, 1, 9, 3];

export const insertionSortTrace: InsertionSortStep[] = [
  {
    array: [5, 2, 8, 1, 9, 3],
    currentIndex: 0,
    comparingIndex: null,
    sortedBoundary: 1,
    description: "Initialize: first element [5] is trivially sorted. Start from index 1.",
    mathConcept: "\\text{Invariant: } A[0..0] \\text{ is sorted}",
    codeLine: 2,
  },
  {
    array: [5, 2, 8, 1, 9, 3],
    currentIndex: 1,
    comparingIndex: 0,
    sortedBoundary: 1,
    description: "Key = 2. Compare with A[0]=5. Since 2 < 5, shift 5 right.",
    mathConcept: "\\text{key} = A[1] = 2,\\quad 2 < 5 \\;\\Rightarrow\\; \\text{shift}",
    codeLine: 5,
  },
  {
    array: [2, 5, 8, 1, 9, 3],
    currentIndex: 1,
    comparingIndex: null,
    sortedBoundary: 2,
    description: "Insert 2 at position 0. Sorted region: [2, 5].",
    mathConcept: "A[0..1] = [2, 5] \\text{ is sorted}",
    codeLine: 6,
  },
  {
    array: [2, 5, 8, 1, 9, 3],
    currentIndex: 2,
    comparingIndex: 1,
    sortedBoundary: 2,
    description: "Key = 8. Compare with A[1]=5. Since 8 ≥ 5, no shift needed.",
    mathConcept: "\\text{key} = 8 \\geq 5 \\;\\Rightarrow\\; \\text{already in place}",
    codeLine: 4,
  },
  {
    array: [2, 5, 8, 1, 9, 3],
    currentIndex: 2,
    comparingIndex: null,
    sortedBoundary: 3,
    description: "8 stays in place. Sorted region: [2, 5, 8].",
    mathConcept: "A[0..2] = [2, 5, 8] \\text{ is sorted}",
    codeLine: 6,
  },
  {
    array: [2, 5, 8, 1, 9, 3],
    currentIndex: 3,
    comparingIndex: 2,
    sortedBoundary: 3,
    description: "Key = 1. Compare with 8, 5, 2 — all greater. Shift all three right.",
    mathConcept: "\\text{key} = 1 < A[j] \\;\\forall j \\in [0,2] \\;\\Rightarrow\\; \\text{shift all}",
    codeLine: 5,
  },
  {
    array: [1, 2, 5, 8, 9, 3],
    currentIndex: 3,
    comparingIndex: null,
    sortedBoundary: 4,
    description: "Insert 1 at position 0. Sorted region: [1, 2, 5, 8].",
    mathConcept: "A[0..3] = [1, 2, 5, 8] \\text{ is sorted}",
    codeLine: 6,
  },
  {
    array: [1, 2, 5, 8, 9, 3],
    currentIndex: 4,
    comparingIndex: 3,
    sortedBoundary: 4,
    description: "Key = 9. Compare with A[3]=8. Since 9 ≥ 8, no shift needed.",
    mathConcept: "\\text{key} = 9 \\geq 8 \\;\\Rightarrow\\; \\text{already in place}",
    codeLine: 4,
  },
  {
    array: [1, 2, 5, 8, 9, 3],
    currentIndex: 4,
    comparingIndex: null,
    sortedBoundary: 5,
    description: "9 stays in place. Sorted region: [1, 2, 5, 8, 9].",
    mathConcept: "A[0..4] = [1, 2, 5, 8, 9] \\text{ is sorted}",
    codeLine: 6,
  },
  {
    array: [1, 2, 5, 8, 9, 3],
    currentIndex: 5,
    comparingIndex: 4,
    sortedBoundary: 5,
    description: "Key = 3. Compare with 9, 8, 5 — all greater. Shift them right. Stop at 2.",
    mathConcept: "\\text{key} = 3: \\; 3 < 9, 3 < 8, 3 < 5, 3 \\geq 2 \\;\\Rightarrow\\; \\text{insert at } j=2",
    codeLine: 5,
  },
  {
    array: [1, 2, 3, 5, 8, 9],
    currentIndex: 5,
    comparingIndex: null,
    sortedBoundary: 6,
    description: "Insert 3 at position 2. Array fully sorted: [1, 2, 3, 5, 8, 9]!",
    mathConcept: "A[0..5] = [1, 2, 3, 5, 8, 9] \\text{ is sorted} \\;\\checkmark",
    codeLine: 6,
  },
];

export const insertionSortCode = `def insertion_sort(A):
    n = len(A)
    for i in range(1, n):             # Outer: extend sorted region
        key = A[i]                    # Element to insert
        j = i - 1
        while j >= 0 and A[j] > key: # Inner: find insertion point
            A[j + 1] = A[j]          # Shift element right
        A[j + 1] = key               # Insert key at correct position
    return A`;

export const insertionSortBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "i = 1, 2, \\ldots, n-1",
    codeLine: 3,
    description: "Outer loop extends the sorted region one element at a time",
  },
  {
    math: "\\text{key} = A[i]",
    codeLine: 4,
    description: "Save the current element to insert into the sorted prefix",
  },
  {
    math: "j \\geq 0 \\;\\land\\; A[j] > \\text{key}",
    codeLine: 6,
    description: "Inner loop finds where key belongs by scanning right to left",
  },
  {
    math: "A[j+1] \\leftarrow A[j]",
    codeLine: 7,
    description: "Shift larger elements one position to the right",
  },
  {
    math: "A[j+1] \\leftarrow \\text{key}",
    codeLine: 8,
    description: "Place the key at its correct sorted position",
  },
  {
    math: "\\text{Invariant: } A[0..i] \\text{ sorted after iteration } i",
    codeLine: 3,
    description: "Loop invariant: after each outer iteration, A[0..i] is sorted",
  },
];
