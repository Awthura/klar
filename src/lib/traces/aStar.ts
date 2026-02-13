export interface AStarStep {
  openSet: number[];
  closedSet: number[];
  current: number;
  gScore: Record<number, number>;
  fScore: Record<number, number>;
  path: number[];
  description: string;
  mathConcept: string;
  codeLine: number;
}

// 5x5 grid: 0=open, 1=obstacle
export const aStarGrid = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

export const aStarStart = 0; // node id = row*5+col, so (0,0)=0
export const aStarGoal = 24; // (4,4)=24

// Nodes are numbered row*5+col (0-24)
function n(r: number, c: number) {
  return r * 5 + c;
}

function manhattan(a: number, b: number) {
  const ar = Math.floor(a / 5), ac = a % 5;
  const br = Math.floor(b / 5), bc = b % 5;
  return Math.abs(ar - br) + Math.abs(ac - bc);
}

// Walls: (1,1), (1,2), (2,3), (3,1)
// Correct optimal path: (0,0)→(0,1)→(0,2)→(0,3)→(0,4)→(1,4)→(2,4)→(3,4)→(4,4)
// All f-scores on this grid equal 8 (consistent heuristic)

export const aStarTrace: AStarStep[] = [
  {
    openSet: [n(0,0)],
    closedSet: [],
    current: n(0,0),
    gScore: { [n(0,0)]: 0 },
    fScore: { [n(0,0)]: 8 },
    path: [],
    description: "Initialize: add start (0,0) to open set. g(start)=0, f(start)=h(start)=8.",
    mathConcept: "f(n) = g(n) + h(n),\\quad f(\\text{start}) = 0 + 8 = 8",
    codeLine: 3,
  },
  {
    openSet: [n(0,1), n(1,0)],
    closedSet: [n(0,0)],
    current: n(0,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8 },
    path: [],
    description: "Expand (0,0): add neighbors (0,1) f=1+7=8 and (1,0) f=1+7=8.",
    mathConcept: "g(v) = g(u) + w(u,v),\\quad h(v) = |v_r - t_r| + |v_c - t_c|",
    codeLine: 7,
  },
  {
    openSet: [n(1,0), n(0,2)],
    closedSet: [n(0,0), n(0,1)],
    current: n(0,1),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8 },
    path: [],
    description: "Expand (0,1): skip wall (1,1). Add (0,2) f=2+6=8.",
    mathConcept: "\\text{skip } n \\text{ if } n \\in \\text{obstacles}",
    codeLine: 9,
  },
  {
    openSet: [n(0,2), n(2,0)],
    closedSet: [n(0,0), n(0,1), n(1,0)],
    current: n(1,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8 },
    path: [],
    description: "Expand (1,0): skip wall (1,1). Add (2,0) f=2+6=8.",
    mathConcept: "\\text{if } g(u) + w(u,v) < g(v) \\text{ then update}",
    codeLine: 10,
  },
  {
    openSet: [n(2,0), n(0,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2)],
    current: n(0,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8 },
    path: [],
    description: "Expand (0,2): skip wall (1,2). Add (0,3) f=3+5=8.",
    mathConcept: "f(n) = 3 + 5 = 8 \\quad\\text{(consistent heuristic)}",
    codeLine: 7,
  },
  {
    openSet: [n(0,3), n(2,1), n(3,0)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0)],
    current: n(2,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8 },
    path: [],
    description: "Expand (2,0): add (2,1) f=3+5=8 and (3,0) f=3+5=8. Search branches two ways.",
    mathConcept: "h \\text{ is admissible: } h(n) \\leq h^*(n) \\;\\forall n",
    codeLine: 10,
  },
  {
    openSet: [n(2,1), n(3,0), n(0,4), n(1,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3)],
    current: n(0,3),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8 },
    path: [],
    description: "Expand (0,3): add (0,4) f=4+4=8, (1,3) f=4+4=8. Reaching the right side.",
    mathConcept: "\\text{All } f\\text{-scores} = 8 \\;\\Rightarrow\\; \\text{consistent heuristic}",
    codeLine: 7,
  },
  {
    openSet: [n(3,0), n(0,4), n(1,3), n(2,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1)],
    current: n(2,1),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8 },
    path: [],
    description: "Expand (2,1): skip walls (1,1), (3,1). Add (2,2) f=4+4=8.",
    mathConcept: "g(2{,}2) = g(2{,}1) + 1 = 4",
    codeLine: 10,
  },
  {
    openSet: [n(0,4), n(1,3), n(2,2), n(4,0)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0)],
    current: n(3,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8 },
    path: [],
    description: "Expand (3,0): skip wall (3,1). Add (4,0) f=4+4=8.",
    mathConcept: "g(4{,}0) = g(3{,}0) + 1 = 4",
    codeLine: 10,
  },
  {
    openSet: [n(1,3), n(2,2), n(4,0), n(1,4)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4)],
    current: n(0,4),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8 },
    path: [],
    description: "Expand (0,4): add (1,4) f=5+3=8. Going down the right edge.",
    mathConcept: "h(1{,}4) = |1-4| + |4-4| = 3",
    codeLine: 7,
  },
  {
    openSet: [n(2,2), n(4,0), n(1,4)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3)],
    current: n(1,3),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8 },
    path: [],
    description: "Expand (1,3): walls (1,2) and (2,3) block it. (1,4) already in open set. Dead end here.",
    mathConcept: "\\text{(2,3) is a wall} \\;\\Rightarrow\\; \\text{cannot go through}",
    codeLine: 9,
  },
  {
    openSet: [n(4,0), n(1,4), n(3,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2)],
    current: n(2,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8 },
    path: [],
    description: "Expand (2,2): skip wall (2,3). Add (3,2) f=5+3=8.",
    mathConcept: "g(3{,}2) = g(2{,}2) + 1 = 5",
    codeLine: 9,
  },
  {
    openSet: [n(1,4), n(3,2), n(4,1)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0)],
    current: n(4,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5, [n(4,1)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8, [n(4,1)]: 8 },
    path: [],
    description: "Expand (4,0): add (4,1) f=5+3=8. Left branch exploring bottom row.",
    mathConcept: "g(4{,}1) = g(4{,}0) + 1 = 5",
    codeLine: 10,
  },
  {
    openSet: [n(3,2), n(4,1), n(2,4)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0), n(1,4)],
    current: n(1,4),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5, [n(4,1)]: 5, [n(2,4)]: 6 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8, [n(4,1)]: 8, [n(2,4)]: 8 },
    path: [],
    description: "Expand (1,4): add (2,4) f=6+2=8. Right-side path going down around the wall.",
    mathConcept: "h(2{,}4) = |2-4| + |4-4| = 2",
    codeLine: 7,
  },
  {
    openSet: [n(4,1), n(2,4), n(3,3), n(4,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0), n(1,4), n(3,2)],
    current: n(3,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5, [n(4,1)]: 5, [n(2,4)]: 6, [n(3,3)]: 6, [n(4,2)]: 6 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8, [n(4,1)]: 8, [n(2,4)]: 8, [n(3,3)]: 8, [n(4,2)]: 8 },
    path: [],
    description: "Expand (3,2): skip wall (3,1). Add (3,3) f=6+2=8, (4,2) f=6+2=8.",
    mathConcept: "g(3{,}3) = g(3{,}2) + 1 = 6",
    codeLine: 10,
  },
  {
    openSet: [n(2,4), n(3,3), n(4,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0), n(1,4), n(3,2), n(4,1)],
    current: n(4,1),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5, [n(4,1)]: 5, [n(2,4)]: 6, [n(3,3)]: 6, [n(4,2)]: 6 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8, [n(4,1)]: 8, [n(2,4)]: 8, [n(3,3)]: 8, [n(4,2)]: 8 },
    path: [],
    description: "Expand (4,1): (4,2) already in open. No new nodes from bottom-left path.",
    mathConcept: "\\text{(4,2) already has } g=6 \\text{ — no improvement}",
    codeLine: 10,
  },
  {
    openSet: [n(3,3), n(4,2), n(3,4)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0), n(1,4), n(3,2), n(4,1), n(2,4)],
    current: n(2,4),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(0,3)]: 3, [n(2,1)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(2,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,2)]: 5, [n(4,1)]: 5, [n(2,4)]: 6, [n(3,3)]: 6, [n(4,2)]: 6, [n(3,4)]: 7 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(0,3)]: 8, [n(2,1)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(2,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,2)]: 8, [n(4,1)]: 8, [n(2,4)]: 8, [n(3,3)]: 8, [n(4,2)]: 8, [n(3,4)]: 8 },
    path: [],
    description: "Expand (2,4): skip wall (2,3). Add (3,4) f=7+1=8. Almost at goal!",
    mathConcept: "h(3{,}4) = |3-4|+|4-4| = 1",
    codeLine: 7,
  },
  {
    openSet: [],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,0), n(0,3), n(2,1), n(3,0), n(0,4), n(1,3), n(2,2), n(4,0), n(1,4), n(3,2), n(4,1), n(2,4), n(3,4), n(4,4)],
    current: n(4,4),
    gScore: { [n(4,4)]: 8 },
    fScore: { [n(4,4)]: 8 },
    path: [n(0,0), n(0,1), n(0,2), n(0,3), n(0,4), n(1,4), n(2,4), n(3,4), n(4,4)],
    description: "Expand (3,4): reach goal (4,4)! Path goes around the wall via the right edge. Optimal cost = 8.",
    mathConcept: "f(\\text{goal}) = g(\\text{goal}) = 8 \\;\\Rightarrow\\; \\text{optimal}",
    codeLine: 14,
  },
];

export const aStarCode = `import heapq

def a_star(grid, start, goal):
    open_set = [(h(start, goal), start)]  # Priority queue: (f_score, node)
    came_from = {}
    g_score = {start: 0}                  # Cost from start to node
    closed = set()

    while open_set:
        f, current = heapq.heappop(open_set)   # Get lowest f-score
        if current == goal:
            return reconstruct(came_from, current)  # Path found
        closed.add(current)
        for neighbor in get_neighbors(grid, current):
            if neighbor in closed:
                continue                   # Skip already evaluated
            tentative_g = g_score[current] + 1
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f = tentative_g + h(neighbor, goal)  # f = g + h
                heapq.heappush(open_set, (f, neighbor))
    return None                            # No path exists

def h(node, goal):
    return abs(node[0]-goal[0]) + abs(node[1]-goal[1])  # Manhattan`;

export const aStarBridge: { math: string; codeLine: number; description: string }[] = [
  {
    math: "f(n) = g(n) + h(n)",
    codeLine: 4,
    description: "Each node's priority is cost-so-far plus heuristic estimate to goal",
  },
  {
    math: "g(\\text{start}) = 0",
    codeLine: 5,
    description: "Initialize start node with zero cost",
  },
  {
    math: "\\min_{n \\in \\text{Open}} f(n)",
    codeLine: 9,
    description: "Always expand the node with lowest f-score (priority queue min)",
  },
  {
    math: "\\text{current} = \\text{goal} \\Rightarrow \\text{return path}",
    codeLine: 11,
    description: "If we reached the goal, reconstruct and return the path",
  },
  {
    math: "g'(v) = g(u) + w(u,v)",
    codeLine: 16,
    description: "Tentative g-score through current node",
  },
  {
    math: "g'(v) < g(v) \\Rightarrow \\text{update}",
    codeLine: 17,
    description: "Only update if we found a shorter path to this neighbor",
  },
  {
    math: "h(n) = |n_r - g_r| + |n_c - g_c|",
    codeLine: 24,
    description: "Manhattan distance heuristic (admissible for grid movement)",
  },
];
