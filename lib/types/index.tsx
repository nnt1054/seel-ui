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

export interface Command {
  execute?: () => void;
  release?: () => void;
  ignoreModifiers?: boolean;
}

export interface Commands {
  [name: string]: Command;
}

export interface GamepadButtonEvent {
  type?: string;
  keyCode?: number;
  gamepadCode?: number;
  value?: number;
}

type KeyCode = number | number[];

export type Keybinds = {
  [commandName: string]: KeyCode;
};
export type KeybindCombination = number[];

type GamepadCode = number;

export type GamepadKeybinds = {
  [commandName: string]: GamepadCode;
};

type ButtonMapping = {
  [buttonIndex: number]: GamepadCode;
};

type AxesMapping = {
  [axisIndex: number]: number[];
};

export interface GamepadMapping {
  buttons: ButtonMapping;
  axes: AxesMapping;
}

export interface Callbacks {
  [key: string]: () => void;
}
