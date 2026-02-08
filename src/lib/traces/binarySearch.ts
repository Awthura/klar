export interface BinarySearchStep {
  lo: number;
  hi: number;
  mid: number;
  comparison: "less" | "greater" | "equal" | null;
  description: string;
  mathConcept: string;
  codeLine: number;
  eliminated: number[]; // indices that have been eliminated
}

const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;

export const binarySearchArray = array;
export const binarySearchTarget = target;

export const binarySearchTrace: BinarySearchStep[] = [
  {
    lo: 0,
    hi: 9,
    mid: 4,
    comparison: null,
    description: `Initialize: search for ${target} in array of ${array.length} elements. Set lo=0, hi=${array.length - 1}.`,
    mathConcept: "A[lo] \\leq x \\leq A[hi]",
    codeLine: 2,
    eliminated: [],
  },
  {
    lo: 0,
    hi: 9,
    mid: 4,
    comparison: "less",
    description: `Compute mid = ⌊(0+9)/2⌋ = 4. A[4]=${array[4]}. Since ${array[4]} < ${target}, search right half.`,
    mathConcept: "\\text{mid} = \\lfloor(lo + hi)/2\\rfloor = 4",
    codeLine: 4,
    eliminated: [0, 1, 2, 3, 4],
  },
  {
    lo: 5,
    hi: 9,
    mid: 7,
    comparison: "greater",
    description: `Update lo=5. Compute mid = ⌊(5+9)/2⌋ = 7. A[7]=${array[7]}. Since ${array[7]} > ${target}, search left half.`,
    mathConcept: "A[\\text{mid}] > x \\Rightarrow hi = \\text{mid} - 1",
    codeLine: 8,
    eliminated: [0, 1, 2, 3, 4, 7, 8, 9],
  },
  {
    lo: 5,
    hi: 6,
    mid: 5,
    comparison: "equal",
    description: `Update hi=6. Compute mid = ⌊(5+6)/2⌋ = 5. A[5]=${array[5]} = ${target}. Found!`,
    mathConcept: "A[\\text{mid}] = x \\Rightarrow \\text{return mid}",
    codeLine: 6,
    eliminated: [0, 1, 2, 3, 4, 7, 8, 9],
  },
];

export const binarySearchCode = `def binary_search(A, x):
    lo, hi = 0, len(A) - 1        # Initialize search bounds
    while lo <= hi:                # Invariant: x in A[lo..hi]
        mid = (lo + hi) // 2      # Compute midpoint
        if A[mid] == x:
            return mid             # Found: return index
        elif A[mid] < x:
            lo = mid + 1           # Eliminate left half
        else:
            hi = mid - 1           # Eliminate right half
    return -1                      # Not found`;

export const binarySearchBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\text{lo} = 0,\\; \\text{hi} = n-1",
    codeLine: 2,
    description: "Initialize the search bounds to cover the entire array",
  },
  {
    math: "A[\\text{lo}] \\leq x \\leq A[\\text{hi}]",
    codeLine: 3,
    description: "Loop invariant: target must be within current bounds",
  },
  {
    math: "\\text{mid} = \\lfloor(\\text{lo} + \\text{hi})/2\\rfloor",
    codeLine: 4,
    description: "Compute the midpoint using integer division",
  },
  {
    math: "A[\\text{mid}] = x \\Rightarrow \\text{return}",
    codeLine: 6,
    description: "If midpoint value equals target, we found it",
  },
  {
    math: "A[\\text{mid}] < x \\Rightarrow \\text{lo} = \\text{mid} + 1",
    codeLine: 8,
    description: "Target is larger, eliminate the left half",
  },
  {
    math: "A[\\text{mid}] > x \\Rightarrow \\text{hi} = \\text{mid} - 1",
    codeLine: 10,
    description: "Target is smaller, eliminate the right half",
  },
];
