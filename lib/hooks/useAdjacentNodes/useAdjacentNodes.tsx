import type { RefObject } from "react";

import { useEventListeners } from "@hooks/useEventListeners";
import type { AdjacentNodes, Node } from "@types";
import { handleAdjacentNode } from "@utils";

export interface UseAdjacentNodesProps {
  ref: RefObject<HTMLElement | null>;
  adjacentNodes?: AdjacentNodes;
  moveFocus?: (activeNode: Node) => void;
  isActive?: boolean;
}

export const useAdjacentNodes = (props: UseAdjacentNodesProps) => {
  const {
    ref,
    adjacentNodes = {},
    moveFocus = () => {},
    isActive = true,
  } = props;

  const up = () => {
    if (adjacentNodes.up) {
      handleAdjacentNode(adjacentNodes.up, moveFocus);
    }
  };

  const down = () => {
    if (adjacentNodes.down) {
      handleAdjacentNode(adjacentNodes.down, moveFocus);
    }
  };

  const left = () => {
    if (adjacentNodes.left) {
      handleAdjacentNode(adjacentNodes.left, moveFocus);
    }
  };

  const right = () => {
    if (adjacentNodes.right) {
      handleAdjacentNode(adjacentNodes.right, moveFocus);
    }
  };

  useEventListeners(ref, {
    up: up,
    down: down,
    left: left,
    right: right,
  }, isActive);
};

export default useAdjacentNodes;
