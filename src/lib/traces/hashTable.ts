export interface HashTableStep {
  buckets: number[][];
  insertingKey: number | null;
  hashValue: number | null;
  collision: boolean;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const hashTableSize = 7;
export const hashTableKeys = [15, 11, 27, 8, 12, 4];

export const hashTableTrace: HashTableStep[] = [
  {
    buckets: [[], [], [], [], [], [], []],
    insertingKey: null,
    hashValue: null,
    collision: false,
    description: `Empty hash table with ${hashTableSize} buckets. We use h(k) = k mod ${hashTableSize} with chaining for collisions.`,
    mathConcept: "h(k) = k \\bmod m,\\; m = 7",
    codeLine: 3,
  },
  {
    buckets: [[], [15], [], [], [], [], []],
    insertingKey: 15,
    hashValue: 1,
    collision: false,
    description: "Insert 15: h(15) = 15 mod 7 = 1. Bucket 1 is empty — place directly.",
    mathConcept: "h(15) = 15 \\bmod 7 = 1",
    codeLine: 10,
  },
  {
    buckets: [[], [15], [], [], [11], [], []],
    insertingKey: 11,
    hashValue: 4,
    collision: false,
    description: "Insert 11: h(11) = 11 mod 7 = 4. Bucket 4 is empty — place directly.",
    mathConcept: "h(11) = 11 \\bmod 7 = 4",
    codeLine: 10,
  },
  {
    buckets: [[], [15], [], [], [11], [], [27]],
    insertingKey: 27,
    hashValue: 6,
    collision: false,
    description: "Insert 27: h(27) = 27 mod 7 = 6. Bucket 6 is empty — place directly.",
    mathConcept: "h(27) = 27 \\bmod 7 = 6",
    codeLine: 10,
  },
  {
    buckets: [[], [15, 8], [], [], [11], [], [27]],
    insertingKey: 8,
    hashValue: 1,
    collision: true,
    description:
      "Insert 8: h(8) = 8 mod 7 = 1. Collision with 15! Chain: append 8 to bucket 1.",
    mathConcept: "h(8) = h(15) = 1 \\;\\Rightarrow\\; \\text{collision!}",
    codeLine: 11,
  },
  {
    buckets: [[], [15, 8], [], [], [11], [12], [27]],
    insertingKey: 12,
    hashValue: 5,
    collision: false,
    description: "Insert 12: h(12) = 12 mod 7 = 5. Bucket 5 is empty — place directly.",
    mathConcept: "h(12) = 12 \\bmod 7 = 5",
    codeLine: 10,
  },
  {
    buckets: [[], [15, 8], [], [], [11, 4], [12], [27]],
    insertingKey: 4,
    hashValue: 4,
    collision: true,
    description:
      "Insert 4: h(4) = 4 mod 7 = 4. Collision with 11! Chain: append 4 to bucket 4.",
    mathConcept: "h(4) = h(11) = 4 \\;\\Rightarrow\\; \\text{collision!}",
    codeLine: 11,
  },
  {
    buckets: [[], [15, 8], [], [], [11, 4], [12], [27]],
    insertingKey: null,
    hashValue: null,
    collision: false,
    description:
      "All keys inserted. Load factor α = 6/7 ≈ 0.86. Two collisions occurred in buckets 1 and 4.",
    mathConcept:
      "\\alpha = n/m = 6/7,\\; E[\\text{search}] = O(1 + \\alpha)",
    codeLine: 14,
  },
];

export const hashTableCode = `class HashTable:
    def __init__(self, size=7):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return key % self.size       # Hash function

    def insert(self, key):
        idx = self._hash(key)        # Compute bucket
        self.buckets[idx].append(key) # Chain append

    def search(self, key):
        idx = self._hash(key)        # Compute bucket
        return key in self.buckets[idx]  # Linear scan

    def load_factor(self):
        n = sum(len(b) for b in self.buckets)
        return n / self.size         # α = n/m`;

export const hashTableBridge: {
  math: string;
  codeLine: number;
  description: string;
}[] = [
  {
    math: "m = \\text{size}",
    codeLine: 4,
    description: "Create m empty buckets (linked lists for chaining)",
  },
  {
    math: "h(k) = k \\bmod m",
    codeLine: 7,
    description: "Hash function maps key to a bucket index in [0, m)",
  },
  {
    math: "\\text{bucket}[h(k)].\\text{append}(k)",
    codeLine: 11,
    description: "Insert by appending to the chain at the hashed bucket",
  },
  {
    math: "k \\in \\text{bucket}[h(k)]",
    codeLine: 15,
    description: "Search by scanning the chain at the hashed bucket",
  },
  {
    math: "\\alpha = n/m",
    codeLine: 19,
    description: "Load factor: ratio of elements to buckets. Expected O(1+α) search",
  },
];
