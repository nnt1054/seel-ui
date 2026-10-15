export type Node = number | string | null;
export type AdjacentNode = Node | (() => void);
export type AdjacentNodes = {
  up?: AdjacentNode;
  down?: AdjacentNode;
  left?: AdjacentNode;
  right?: AdjacentNode;
};
