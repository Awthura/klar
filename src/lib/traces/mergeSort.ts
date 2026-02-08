export interface MergeSortStep {
  type: "split" | "merge" | "complete";
  arrays: number[][]; // current state of all subarrays
  activeIndices: [number, number] | null; // which two elements are being compared
  depth: number;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const mergeSortArray = [38, 27, 43, 3, 9, 82, 10];

export const mergeSortTrace: MergeSortStep[] = [
  {
    type: "split",
    arrays: [[38, 27, 43, 3, 9, 82, 10]],
    activeIndices: null,
    depth: 0,
    description: "Start with the unsorted array. We will recursively divide it in half.",
    mathConcept: "T(n) = 2T(n/2) + O(n)",
    codeLine: 2,
  },
  {
    type: "split",
    arrays: [[38, 27, 43, 3], [9, 82, 10]],
    activeIndices: null,
    depth: 1,
    description: "Split into two halves: [38,27,43,3] and [9,82,10].",
    mathConcept: "\\text{Divide: } A[0..\\lfloor n/2 \\rfloor], A[\\lfloor n/2 \\rfloor +1..n]",
    codeLine: 4,
  },
  {
    type: "split",
    arrays: [[38, 27], [43, 3], [9, 82, 10]],
    activeIndices: null,
    depth: 2,
    description: "Split left half further: [38,27] and [43,3].",
    mathConcept: "\\text{Recurse on left: } T(n/2)",
    codeLine: 4,
  },
  {
    type: "split",
    arrays: [[38], [27], [43, 3], [9, 82, 10]],
    activeIndices: null,
    depth: 3,
    description: "Split [38,27] into single elements [38] and [27]. Base case reached.",
    mathConcept: "T(1) = O(1) \\text{ (base case)}",
    codeLine: 3,
  },
  {
    type: "merge",
    arrays: [[27, 38], [43, 3], [9, 82, 10]],
    activeIndices: [0, 1],
    depth: 2,
    description: "Merge [38] and [27] → [27,38]. Compare and place in sorted order.",
    mathConcept: "\\text{Merge: compare and combine sorted halves}",
    codeLine: 6,
  },
  {
    type: "split",
    arrays: [[27, 38], [43], [3], [9, 82, 10]],
    activeIndices: null,
    depth: 3,
    description: "Split [43,3] into [43] and [3]. Base case reached.",
    mathConcept: "T(1) = O(1)",
    codeLine: 3,
  },
  {
    type: "merge",
    arrays: [[27, 38], [3, 43], [9, 82, 10]],
    activeIndices: [0, 1],
    depth: 2,
    description: "Merge [43] and [3] → [3,43].",
    mathConcept: "\\text{Merge: } O(n) \\text{ comparisons per level}",
    codeLine: 6,
  },
  {
    type: "merge",
    arrays: [[3, 27, 38, 43], [9, 82, 10]],
    activeIndices: [0, 1],
    depth: 1,
    description: "Merge [27,38] and [3,43] → [3,27,38,43]. Walk both arrays left to right.",
    mathConcept: "\\text{Merge two sorted halves: } O(n)",
    codeLine: 6,
  },
  {
    type: "split",
    arrays: [[3, 27, 38, 43], [9, 82], [10]],
    activeIndices: null,
    depth: 2,
    description: "Now process right half. Split [9,82,10] into [9,82] and [10].",
    mathConcept: "\\text{Recurse on right: } T(n/2)",
    codeLine: 4,
  },
  {
    type: "split",
    arrays: [[3, 27, 38, 43], [9], [82], [10]],
    activeIndices: null,
    depth: 3,
    description: "Split [9,82] into [9] and [82]. Base cases.",
    mathConcept: "T(1) = O(1)",
    codeLine: 3,
  },
  {
    type: "merge",
    arrays: [[3, 27, 38, 43], [9, 82], [10]],
    activeIndices: [0, 1],
    depth: 2,
    description: "Merge [9] and [82] → [9,82]. Already sorted.",
    mathConcept: "\\text{Merge: } O(n)",
    codeLine: 6,
  },
  {
    type: "merge",
    arrays: [[3, 27, 38, 43], [9, 10, 82]],
    activeIndices: [0, 1],
    depth: 1,
    description: "Merge [9,82] and [10] → [9,10,82].",
    mathConcept: "\\text{Merge: } O(n)",
    codeLine: 6,
  },
  {
    type: "merge",
    arrays: [[3, 9, 10, 27, 38, 43, 82]],
    activeIndices: null,
    depth: 0,
    description: "Final merge: [3,27,38,43] and [9,10,82] → [3,9,10,27,38,43,82]. Done!",
    mathConcept: "\\text{Total: } O(n \\log n)",
    codeLine: 6,
  },
  {
    type: "complete",
    arrays: [[3, 9, 10, 27, 38, 43, 82]],
    activeIndices: null,
    depth: 0,
    description: "Array is fully sorted! Total work: O(n log n) — log n levels with O(n) merging each.",
    mathConcept: "T(n) = O(n \\log n)",
    codeLine: 1,
  },
];

export const mergeSortCode = `def merge_sort(A):
    if len(A) <= 1:                  # Base case
        return A
    mid = len(A) // 2               # Divide
    left = merge_sort(A[:mid])      # Recurse left
    right = merge_sort(A[mid:])     # Recurse right
    return merge(left, right)       # Conquer

def merge(L, R):
    result = []
    i = j = 0
    while i < len(L) and j < len(R):  # Compare heads
        if L[i] <= R[j]:
            result.append(L[i])        # Take from left
            i += 1
        else:
            result.append(R[j])        # Take from right
            j += 1
    result.extend(L[i:])               # Remaining left
    result.extend(R[j:])               # Remaining right
    return result`;

export const mergeSortBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "|A| \\leq 1 \\Rightarrow \\text{return } A",
    codeLine: 2,
    description: "Base case: a single element is already sorted",
  },
  {
    math: "\\text{mid} = \\lfloor n/2 \\rfloor",
    codeLine: 4,
    description: "Divide the array at the midpoint",
  },
  {
    math: "T(n/2) + T(n/2)",
    codeLine: 5,
    description: "Two recursive calls, each on half the array",
  },
  {
    math: "\\text{Merge}(L, R) : O(n)",
    codeLine: 7,
    description: "Merge step: combine two sorted halves in linear time",
  },
  {
    math: "L[i] \\leq R[j] \\Rightarrow \\text{take } L[i]",
    codeLine: 13,
    description: "Compare heads of both halves, take the smaller",
  },
  {
    math: "\\text{Total: } T(n) = O(n \\log n)",
    codeLine: 1,
    description: "Master theorem gives O(n log n) total",
  },
];
