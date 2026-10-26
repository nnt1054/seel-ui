import { useEffect } from "react";
import type { RefObject } from "react";

import { useEventListeners } from "@hooks/useEventListeners";
import type { AdjacentNode, AdjacentNodes, Node } from "@types";
import { handleAdjacentNode, isValidAdjacentNode } from "@utils";

export interface UseActiveIndexProps {
  ref: RefObject<HTMLElement | null>;
  activeIndex: Node;
  setActiveIndex: (index: number) => void;
  maxIndex?: number;
  initialIndex?: number;
  isColumn?: boolean;
  isReverse?: boolean;
  disableWrap?: boolean;
  disableJump?: boolean;
  columns?: number;
  adjacentNodes?: AdjacentNodes;
  moveFocus?: (activeNode: Node) => void;
  isActive?: boolean;
}

export const useActiveIndex = (props: UseActiveIndexProps) => {
  const {
    ref,
    activeIndex: _activeIndex,
    setActiveIndex,
    maxIndex = 0,
    initialIndex = 0,
    isColumn = false,
    isReverse = false,
    disableWrap = false,
    disableJump = false,
    adjacentNodes = {},
    moveFocus = () => {},
    isActive = true,
  } = props;

  const isNumber = typeof _activeIndex === "number";
  const activeIndex = isNumber ? _activeIndex as number : 0;

  const incrementIndex = (adjacentNode?: AdjacentNode) => {
    if (activeIndex >= (maxIndex - 1) && adjacentNode) {
      handleAdjacentNode(adjacentNode, moveFocus);
    } else {
      const newIndex = disableWrap
        ? Math.min(activeIndex + 1, maxIndex - 1)
        : (activeIndex + 1) % maxIndex;
      setActiveIndex(newIndex);
    }
  };

  const decrementIndex = (adjacentNode?: AdjacentNode) => {
    if (activeIndex <= 0 && adjacentNode) {
      handleAdjacentNode(adjacentNode, moveFocus);
    } else {
      const newIndex = disableWrap
        ? Math.max(activeIndex - 1, 0)
        : (activeIndex - 1 + maxIndex) % maxIndex;
      setActiveIndex(newIndex);
    }
  };

  const up = () => {
    if (isColumn) {
      if (isReverse) {
        incrementIndex(adjacentNodes.up);
      } else {
        decrementIndex(adjacentNodes.up);
      }
    } else {
      if (isValidAdjacentNode(adjacentNodes.up)) {
        handleAdjacentNode(adjacentNodes.up, moveFocus);
      } else if (!disableJump) {
        const jumpIndex = isReverse ? maxIndex - 1 : 0;
        setActiveIndex(jumpIndex);
      }
    }
  };

  const down = () => {
    if (isColumn) {
      if (isReverse) {
        decrementIndex(adjacentNodes.down);
      } else {
        incrementIndex(adjacentNodes.down);
      }
    } else {
      if (isValidAdjacentNode(adjacentNodes.down)) {
        handleAdjacentNode(adjacentNodes.down, moveFocus);
      } else if (!disableJump) {
        const jumpIndex = isReverse ? 0 : maxIndex - 1;
        setActiveIndex(jumpIndex);
      }
    }
  };

  const left = () => {
    if (isColumn) {
      if (isValidAdjacentNode(adjacentNodes.left)) {
        handleAdjacentNode(adjacentNodes.left, moveFocus);
      } else if (!disableJump) {
        const jumpIndex = isReverse ? maxIndex - 1 : 0;
        setActiveIndex(jumpIndex);
      }
    } else {
      if (isReverse) {
        incrementIndex(adjacentNodes.left);
      } else {
        decrementIndex(adjacentNodes.left);
      }
    }
  };

  const right = () => {
    if (isColumn) {
      if (isValidAdjacentNode(adjacentNodes.right)) {
        handleAdjacentNode(adjacentNodes.right, moveFocus);
      } else if (!disableJump) {
        const jumpIndex = isReverse ? 0 : maxIndex - 1;
        setActiveIndex(jumpIndex);
      }
    } else {
      if (isReverse) {
        decrementIndex(adjacentNodes.right);
      } else {
        incrementIndex(adjacentNodes.right);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!Number.isInteger(activeIndex)) return;
    if (maxIndex < 1) return;
    setActiveIndex(Math.min(activeIndex, maxIndex - 1));
  }, [activeIndex, maxIndex]);

  useEventListeners(ref, {
    up: up,
    down: down,
    left: left,
    right: right,
  }, isActive && isNumber);
};

export default useActiveIndex;
