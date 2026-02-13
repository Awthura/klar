export interface TrieNode {
  id: string;
  char: string;
  isEnd: boolean;
  children: string[];
  depth: number;
}

export interface TrieStep {
  nodes: TrieNode[];
  edges: [string, string, string][]; // [parentId, childId, char]
  highlightPath: string[];
  insertingWord: string;
  description: string;
  mathConcept: string;
  codeLine: number;
}

export const trieWords = ["cat", "car", "card", "do", "dog"];

function buildTrieSteps(): TrieStep[] {
  const steps: TrieStep[] = [];
  const nodes: TrieNode[] = [{ id: "root", char: "", isEnd: false, children: [], depth: 0 }];
  const edges: [string, string, string][] = [];

  // Initial state
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root"],
    insertingWord: "",
    description: "Initialize: empty trie with just the root node.",
    mathConcept: "T = (\\{\\text{root}\\},\\; \\emptyset)",
    codeLine: 2,
  });

  // Insert "cat"
  let id1 = "c";
  nodes.push({ id: id1, char: "c", isEnd: false, children: [], depth: 1 });
  nodes[0].children.push(id1);
  edges.push(["root", id1, "c"]);
  let id2 = "ca";
  nodes.push({ id: id2, char: "a", isEnd: false, children: [], depth: 2 });
  nodes.find(n => n.id === id1)!.children.push(id2);
  edges.push([id1, id2, "a"]);
  let id3 = "cat";
  nodes.push({ id: id3, char: "t", isEnd: true, children: [], depth: 3 });
  nodes.find(n => n.id === id2)!.children.push(id3);
  edges.push([id2, id3, "t"]);
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root", "c", "ca", "cat"],
    insertingWord: "cat",
    description: "Insert \"cat\": create nodes c→a→t. Mark 't' as end-of-word.",
    mathConcept: "\\text{insert}(\\text{\"cat\"}): \\text{root} \\xrightarrow{c} \\xrightarrow{a} \\xrightarrow{t}\\!\\!*",
    codeLine: 7,
  });

  // Insert "car"
  let id4 = "car";
  nodes.push({ id: id4, char: "r", isEnd: true, children: [], depth: 3 });
  nodes.find(n => n.id === "ca")!.children.push(id4);
  edges.push(["ca", id4, "r"]);
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root", "c", "ca", "car"],
    insertingWord: "car",
    description: "Insert \"car\": reuse c→a prefix, add new node 'r'. Mark as end-of-word.",
    mathConcept: "\\text{shared prefix} = \\text{\"ca\"} \\;\\Rightarrow\\; \\text{only add 'r'}",
    codeLine: 6,
  });

  // Insert "card"
  let id5 = "card";
  nodes.push({ id: id5, char: "d", isEnd: true, children: [], depth: 4 });
  nodes.find(n => n.id === "car")!.children.push(id5);
  edges.push(["car", id5, "d"]);
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root", "c", "ca", "car", "card"],
    insertingWord: "card",
    description: "Insert \"card\": reuse c→a→r prefix, add 'd'. Both \"car\" and \"card\" are words.",
    mathConcept: "\\text{\"car\"} \\sqsubset \\text{\"card\"} \\;\\Rightarrow\\; \\text{both marked as words}",
    codeLine: 7,
  });

  // Insert "do"
  let id6 = "d";
  nodes.push({ id: id6, char: "d", isEnd: false, children: [], depth: 1 });
  nodes[0].children.push(id6);
  edges.push(["root", id6, "d"]);
  let id7 = "do";
  nodes.push({ id: id7, char: "o", isEnd: true, children: [], depth: 2 });
  nodes.find(n => n.id === id6)!.children.push(id7);
  edges.push([id6, id7, "o"]);
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root", "d", "do"],
    insertingWord: "do",
    description: "Insert \"do\": new branch from root with d→o. Mark 'o' as end-of-word.",
    mathConcept: "\\text{\"do\"} \\text{ shares no prefix with \"ca*\"} \\;\\Rightarrow\\; \\text{new branch}",
    codeLine: 7,
  });

  // Insert "dog"
  let id8 = "dog";
  nodes.push({ id: id8, char: "g", isEnd: true, children: [], depth: 3 });
  nodes.find(n => n.id === "do")!.children.push(id8);
  edges.push(["do", id8, "g"]);
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    edges: [...edges],
    highlightPath: ["root", "d", "do", "dog"],
    insertingWord: "dog",
    description: "Insert \"dog\": reuse d→o prefix, add 'g'. All 5 words inserted! Trie complete.",
    mathConcept: "\\text{Total nodes} = 10,\\; |\\Sigma_{\\text{used}}| = 7 \\text{ distinct chars}",
    codeLine: 7,
  });

  return steps;
}

export const trieTrace: TrieStep[] = buildTrieSteps();

export const trieCode = `class TrieNode:
    def __init__(self):
        self.children = {}             # Map: char -> TrieNode
        self.is_end = False            # Marks end of a word

class Trie:
    def __init__(self):
        self.root = TrieNode()         # Empty root node

    def insert(self, word):
        node = self.root               # Start at root
        for char in word:              # Traverse each character
            if char not in node.children:
                node.children[char] = TrieNode()  # Create if missing
            node = node.children[char] # Move to child
        node.is_end = True             # Mark end of word

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False           # Character not found
            node = node.children[char]
        return node.is_end             # True only if full word exists`;

export const trieBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "\\text{children}: \\Sigma \\to \\text{Node}",
    codeLine: 3,
    description: "Each node maps characters to child nodes (branching factor up to |Σ|)",
  },
  {
    math: "\\text{is\\_end} \\in \\{\\text{true}, \\text{false}\\}",
    codeLine: 4,
    description: "Boolean flag marking whether this node completes a word",
  },
  {
    math: "\\text{root} = \\text{TrieNode}()",
    codeLine: 8,
    description: "Trie starts with an empty root (represents empty prefix \"\")",
  },
  {
    math: "\\text{traverse}: w[0], w[1], \\ldots, w[m-1]",
    codeLine: 12,
    description: "Insert processes each character of the word sequentially",
  },
  {
    math: "c \\notin \\text{children} \\Rightarrow \\text{create node}",
    codeLine: 14,
    description: "Create a new node if the character path doesn't exist yet",
  },
  {
    math: "\\text{is\\_end}(w[m-1]) = \\text{true}",
    codeLine: 16,
    description: "After inserting all characters, mark the last node as end-of-word",
  },
  {
    math: "\\text{search}: O(m) \\text{ where } m = |w|",
    codeLine: 23,
    description: "Search is O(m) — independent of how many words are stored",
  },
];
