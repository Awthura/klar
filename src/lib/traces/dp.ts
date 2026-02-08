export interface DpStep {
  table: (number | null)[];
  currentIndex: number | null;
  dependencies: [number, number] | null;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const dpTarget = 7;

export const dpTrace: DpStep[] = [
  {
    table: [null, null, null, null, null, null, null, null],
    currentIndex: null,
    dependencies: null,
    description:
      "Compute Fibonacci(7) using bottom-up DP. Allocate a table of size 8 to store subproblem results.",
    mathConcept:
      "F(n) = F(n{-}1) + F(n{-}2),\\; F(0) = 0,\\; F(1) = 1",
    codeLine: 3,
  },
  {
    table: [0, 1, null, null, null, null, null, null],
    currentIndex: 1,
    dependencies: null,
    description: "Base cases: dp[0] = 0, dp[1] = 1. These are given, not computed.",
    mathConcept: "F(0) = 0,\\; F(1) = 1 \\;\\text{(base cases)}",
    codeLine: 4,
  },
  {
    table: [0, 1, 1, null, null, null, null, null],
    currentIndex: 2,
    dependencies: [0, 1],
    description: "dp[2] = dp[1] + dp[0] = 1 + 0 = 1. Reuses stored results instead of recomputing.",
    mathConcept: "F(2) = F(1) + F(0) = 1 + 0 = 1",
    codeLine: 6,
  },
  {
    table: [0, 1, 1, 2, null, null, null, null],
    currentIndex: 3,
    dependencies: [1, 2],
    description: "dp[3] = dp[2] + dp[1] = 1 + 1 = 2.",
    mathConcept: "F(3) = F(2) + F(1) = 1 + 1 = 2",
    codeLine: 6,
  },
  {
    table: [0, 1, 1, 2, 3, null, null, null],
    currentIndex: 4,
    dependencies: [2, 3],
    description: "dp[4] = dp[3] + dp[2] = 2 + 1 = 3.",
    mathConcept: "F(4) = F(3) + F(2) = 2 + 1 = 3",
    codeLine: 6,
  },
  {
    table: [0, 1, 1, 2, 3, 5, null, null],
    currentIndex: 5,
    dependencies: [3, 4],
    description: "dp[5] = dp[4] + dp[3] = 3 + 2 = 5.",
    mathConcept: "F(5) = F(4) + F(3) = 3 + 2 = 5",
    codeLine: 6,
  },
  {
    table: [0, 1, 1, 2, 3, 5, 8, null],
    currentIndex: 6,
    dependencies: [4, 5],
    description: "dp[6] = dp[5] + dp[4] = 5 + 3 = 8.",
    mathConcept: "F(6) = F(5) + F(4) = 5 + 3 = 8",
    codeLine: 6,
  },
  {
    table: [0, 1, 1, 2, 3, 5, 8, 13],
    currentIndex: 7,
    dependencies: [5, 6],
    description:
      "dp[7] = dp[6] + dp[5] = 8 + 5 = 13. Done! Fibonacci(7) = 13. Only n steps vs 2ⁿ recursive calls.",
    mathConcept: "F(7) = 13,\\; O(n) \\text{ vs naive } O(2^n)",
    codeLine: 7,
  },
];

export const dpCode = `def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)              # Allocate table
    dp[0], dp[1] = 0, 1             # Base cases
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]   # Recurrence
    return dp[n]                     # Answer

# Naive recursive (exponential!)
def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)`;

export const dpBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "n \\leq 1 \\Rightarrow F(n) = n",
    codeLine: 2,
    description: "Base case: F(0) = 0 and F(1) = 1",
  },
  {
    math: "\\text{dp}[0..n] \\;\\text{(table)}",
    codeLine: 3,
    description: "Allocate array to store solutions to all subproblems",
  },
  {
    math: "F(i) = F(i{-}1) + F(i{-}2)",
    codeLine: 6,
    description: "Fill table bottom-up using the recurrence relation",
  },
  {
    math: "O(n) \\text{ time, } O(n) \\text{ space}",
    codeLine: 7,
    description: "Each subproblem computed once — linear time and space",
  },
  {
    math: "T(n) = T(n{-}1) + T(n{-}2) = O(2^n)",
    codeLine: 12,
    description: "Naive recursion: exponential due to overlapping subproblems",
  },
];
