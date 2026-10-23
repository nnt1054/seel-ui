import type { PropsWithChildren, RefObject } from "react";

export type Node = number | string | null;
export type AdjacentNode = Node | (() => void);
export type AdjacentNodes = {
  up?: AdjacentNode;
  down?: AdjacentNode;
  left?: AdjacentNode;
  right?: AdjacentNode;
};

export interface ActiveNodeProps extends PropsWithChildren {
  ref: RefObject<HTMLElement | null>;
  node: Node;

  // required for tailwind
  className?: string | undefined;
}

export type NodeRefMap = Map<Node, RefObject<HTMLElement | null>>;
export type ChildrenRef = RefObject<NodeRefMap>;

export type Orientation = "vertical" | "horizontal";

export interface ExtraActiveNodeProps {
  initial?: Node;
  hasFocus?: boolean;
}

export type IComponentProps<T> = Omit<T, keyof ActiveNodeProps> & Partial<ActiveNodeProps> & ExtraActiveNodeProps;
