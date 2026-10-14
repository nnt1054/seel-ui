import { type RefObject, useEffect } from "react";

import { useEventListeners } from "@hooks/useEventListeners";
import { handleAdjacentNode } from "@utils";

type Node = number | string | null;
type AdjacentNode = Node | (() => void);
type AdjacentNodes = {
  up?: AdjacentNode;
  down?: AdjacentNode;
  left?: AdjacentNode;
  right?: AdjacentNode;
};

export interface UseActiveGridIndexProps {
  ref: RefObject<HTMLElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  columns?: number;
  maxIndex?: number;
  adjacentNodes: AdjacentNodes;
  moveFocus?: (activeNode: Node) => void;
  isActive?: boolean;
}

export const useActiveGridIndex = (props: UseActiveGridIndexProps) => {
  const {
    ref,
    activeIndex,
    setActiveIndex,
    columns: _columns = 1,
    maxIndex = 1,
    adjacentNodes = {},
    moveFocus = () => {},
    isActive = true,
  } = props;

  const columns = Math.min(_columns, maxIndex);
  const rows = Math.ceil(maxIndex / columns);
  const gridSize = rows * columns;

  // todo: "0" should be a valid adjacentNode
  const up = () => {
    if (activeIndex < columns && adjacentNodes.up) {
      handleAdjacentNode(adjacentNodes.up, moveFocus);
    } else {
      let newIndex = activeIndex - columns;
      if (newIndex < 0) {
        newIndex += gridSize - 1 + columns;
        if (newIndex >= maxIndex) newIndex -= columns;
        if (newIndex < 0) newIndex += columns;
        setActiveIndex(newIndex);
      } else {
        setActiveIndex(newIndex);
      }
    }
  };

  const down = () => {
    if (activeIndex >= (maxIndex - columns) && adjacentNodes.down) {
      handleAdjacentNode(adjacentNodes.down, moveFocus);
    } else {
      const newIndex = activeIndex + columns;
      if (newIndex >= maxIndex) {
        setActiveIndex((newIndex + 1) % columns);
      } else {
        setActiveIndex(newIndex);
      }
    }
  };

  const left = () => {
    if ((activeIndex % columns) == 0 && adjacentNodes.left) {
      handleAdjacentNode(adjacentNodes.left, moveFocus);
    } else {
      const newIndex = (activeIndex - 1 + maxIndex) % maxIndex;
      setActiveIndex(newIndex);
    }
  };

  const right = () => {
    if ((activeIndex % columns) == (columns - 1) && adjacentNodes.right) {
      handleAdjacentNode(adjacentNodes.right, moveFocus);
    } else {
      const newIndex = (activeIndex + 1) % maxIndex;
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (maxIndex < 1) return;
    setActiveIndex(Math.min(activeIndex, maxIndex - 1));
  }, [maxIndex]);

  useEventListeners(ref, {
    up: up,
    down: down,
    left: left,
    right: right,
  }, isActive);
};

export default useActiveGridIndex;
