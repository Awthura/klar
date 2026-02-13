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

export const aStarTrace: AStarStep[] = [
  {
    openSet: [n(0,0)],
    closedSet: [],
    current: n(0,0),
    gScore: { [n(0,0)]: 0 },
    fScore: { [n(0,0)]: manhattan(n(0,0), aStarGoal) },
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
    description: "Expand (0,0): add neighbors (0,1) and (1,0) to open set. Both have f=1+7=8.",
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
    description: "Expand (0,1): neighbor (1,1) is obstacle. Add (0,2) with f=2+6=8.",
    mathConcept: "\\text{skip } n \\text{ if } n \\in \\text{obstacles}",
    codeLine: 9,
  },
  {
    openSet: [n(0,2), n(2,0), n(2,1)],
    closedSet: [n(0,0), n(0,1), n(1,0)],
    current: n(1,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8 },
    path: [],
    description: "Expand (1,0): add (2,0) f=2+6=8, (2,1) f=2+6=8. Skip obstacle (1,1).",
    mathConcept: "\\text{if } g(u) + w(u,v) < g(v) \\text{ then update}",
    codeLine: 10,
  },
  {
    openSet: [n(2,0), n(2,1), n(0,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2)],
    current: n(0,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8 },
    path: [],
    description: "Expand (0,2): add (0,3) with f=3+5=8. Skip (1,2) as obstacle.",
    mathConcept: "f(n) = 3 + 5 = 8 \\quad\\text{(consistent heuristic)}",
    codeLine: 7,
  },
  {
    openSet: [n(2,0), n(0,3), n(2,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1)],
    current: n(2,1),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8 },
    path: [],
    description: "Expand (2,1): add (2,2) with f=3+5=8. Moving toward goal.",
    mathConcept: "g(2{,}2) = g(2{,}1) + 1 = 3",
    codeLine: 10,
  },
  {
    openSet: [n(0,3), n(2,2), n(3,0)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0)],
    current: n(2,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8 },
    path: [],
    description: "Expand (2,0): add (3,0) with f=3+5=8.",
    mathConcept: "h \\text{ is admissible: } h(n) \\leq h^*(n) \\;\\forall n",
    codeLine: 10,
  },
  {
    openSet: [n(2,2), n(3,0), n(0,4), n(1,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3)],
    current: n(0,3),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8 },
    path: [],
    description: "Expand (0,3): add (0,4) f=4+4=8, (1,3) f=4+4=8. All f-scores remain 8.",
    mathConcept: "\\text{All } f\\text{-scores} = 8 \\;\\Rightarrow\\; \\text{consistent heuristic}",
    codeLine: 7,
  },
  {
    openSet: [n(3,0), n(0,4), n(1,3), n(3,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2)],
    current: n(2,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8 },
    path: [],
    description: "Expand (2,2): skip obstacle (2,3). Add (3,2) with f=4+4=8.",
    mathConcept: "g(3{,}2) = g(2{,}2) + 1 = 4",
    codeLine: 9,
  },
  {
    openSet: [n(0,4), n(1,3), n(3,2), n(4,0)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0)],
    current: n(3,0),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4, [n(4,0)]: 4 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8, [n(4,0)]: 8 },
    path: [],
    description: "Expand (3,0): skip (3,1) obstacle. Add (4,0) f=4+4=8.",
    mathConcept: "g(4{,}0) = g(3{,}0) + 1 = 4",
    codeLine: 10,
  },
  {
    openSet: [n(1,3), n(3,2), n(4,0), n(1,4), n(3,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0), n(0,4)],
    current: n(0,4),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8 },
    path: [],
    description: "Expand (0,4): add (1,4) f=5+3=8. Getting closer to goal.",
    mathConcept: "h(1{,}4) = |1-4| + |4-4| = 3",
    codeLine: 7,
  },
  {
    openSet: [n(3,2), n(4,0), n(1,4), n(3,3), n(2,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0), n(0,4), n(1,3)],
    current: n(1,3),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,3)]: 5, [n(2,3)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,3)]: 8, [n(2,3)]: 8 },
    path: [],
    description: "Expand (1,3): add (2,3) f=5+3=8, update (3,3) path. Converging on goal.",
    mathConcept: "h(2{,}3) = |2-4| + |3-4| = 3",
    codeLine: 10,
  },
  {
    openSet: [n(4,0), n(1,4), n(2,3), n(3,3), n(4,2)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0), n(0,4), n(1,3), n(3,2)],
    current: n(3,2),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,3)]: 5, [n(2,3)]: 5, [n(4,2)]: 5 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,3)]: 8, [n(2,3)]: 8, [n(4,2)]: 8 },
    path: [],
    description: "Expand (3,2): add (4,2) f=5+3=8, (3,3) already in open set.",
    mathConcept: "g(4{,}2) = g(3{,}2) + 1 = 5",
    codeLine: 10,
  },
  {
    openSet: [n(1,4), n(2,3), n(4,2), n(3,4), n(4,3)],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0), n(0,4), n(1,3), n(3,2), n(3,3)],
    current: n(3,3),
    gScore: { [n(0,0)]: 0, [n(0,1)]: 1, [n(1,0)]: 1, [n(0,2)]: 2, [n(2,0)]: 2, [n(2,1)]: 2, [n(0,3)]: 3, [n(2,2)]: 3, [n(3,0)]: 3, [n(0,4)]: 4, [n(1,3)]: 4, [n(3,2)]: 4, [n(4,0)]: 4, [n(1,4)]: 5, [n(3,3)]: 5, [n(2,3)]: 5, [n(4,2)]: 5, [n(3,4)]: 6, [n(4,3)]: 6 },
    fScore: { [n(0,0)]: 8, [n(0,1)]: 8, [n(1,0)]: 8, [n(0,2)]: 8, [n(2,0)]: 8, [n(2,1)]: 8, [n(0,3)]: 8, [n(2,2)]: 8, [n(3,0)]: 8, [n(0,4)]: 8, [n(1,3)]: 8, [n(3,2)]: 8, [n(4,0)]: 8, [n(1,4)]: 8, [n(3,3)]: 8, [n(2,3)]: 8, [n(4,2)]: 8, [n(3,4)]: 8, [n(4,3)]: 8 },
    path: [],
    description: "Expand (3,3): add (3,4) f=6+2=8 and (4,3) f=6+2=8. Almost at goal!",
    mathConcept: "h(3{,}4) = |3-4|+|4-4| = 1 \\;\\Rightarrow\\; f = 7",
    codeLine: 10,
  },
  {
    openSet: [],
    closedSet: [n(0,0), n(0,1), n(1,0), n(0,2), n(2,1), n(2,0), n(0,3), n(2,2), n(3,0), n(0,4), n(1,3), n(3,2), n(3,3), n(4,3), n(4,4)],
    current: n(4,4),
    gScore: { [n(4,4)]: 7 },
    fScore: { [n(4,4)]: 7 },
    path: [n(0,0), n(0,1), n(0,2), n(0,3), n(1,3), n(2,3), n(3,3), n(4,3), n(4,4)],
    description: "Expand (4,3): reach goal (4,4)! Reconstruct path of length 8. Optimal path found.",
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
