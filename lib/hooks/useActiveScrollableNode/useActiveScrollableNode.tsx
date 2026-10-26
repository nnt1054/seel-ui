import type { RefObject } from "react";

import { useEventListeners } from "@hooks/useEventListeners";
import type { AdjacentNodes, Node } from "@types";
import { handleAdjacentNode, isValidAdjacentNode } from "@utils";

export interface UseActiveScrollableNodeProps {
  ref: RefObject<HTMLElement | null>;
  adjacentNodes?: AdjacentNodes;
  moveFocus?: (activeNode: Node) => void;
  isActive?: boolean;
}

export const useActiveScrollableNode = (props: UseActiveScrollableNodeProps) => {
  const {
    ref,
    adjacentNodes = {},
    moveFocus = () => {},
    isActive = true,
  } = props;

  const up = () => {
    const element = ref.current;
    if (!element) return;

    const scrollBy = element.clientHeight / 2;
    const atTop = element.scrollTop == 0;
    if (atTop && isValidAdjacentNode(adjacentNodes.up)) {
      handleAdjacentNode(adjacentNodes.up, moveFocus);
    } else {
      element.scrollBy({
        top: -scrollBy,
        behavior: "smooth",
      });
    }
  };

  const down = () => {
    const element = ref.current;
    if (!element) return;

    const scrollBy = element.clientHeight / 2;
    const scrollBottom = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop);
    const atBottom = scrollBottom <= 1;
    if (atBottom && isValidAdjacentNode(adjacentNodes.down)) {
      handleAdjacentNode(adjacentNodes.down, moveFocus);
    } else {
      element.scrollBy({
        top: scrollBy,
        behavior: "smooth",
      });
    }
  };

  const left = () => {
    const element = ref.current;
    if (!element) return;

    const scrollBy = element.clientWidth / 2;
    const atLeft = element.scrollLeft == 0;
    if (atLeft && isValidAdjacentNode(adjacentNodes.left)) {
      handleAdjacentNode(adjacentNodes.left, moveFocus);
    } else {
      element.scrollBy({
        left: -scrollBy,
        behavior: "smooth",
      });
    }
  };

  const right = () => {
    const element = ref.current;
    if (!element) return;

    const scrollBy = element.clientWidth / 2;
    const scrollRight = Math.abs(element.scrollWidth - element.clientWidth - element.scrollLeft);
    const atRight = scrollRight <= 1;
    if (atRight && isValidAdjacentNode(adjacentNodes.right)) {
      handleAdjacentNode(adjacentNodes.right, moveFocus);
    } else {
      element.scrollBy({
        left: scrollBy,
        behavior: "smooth",
      });
    }
  };

  useEventListeners(ref, {
    up: up,
    down: down,
    left: left,
    right: right,
  }, isActive);
};

export default useActiveScrollableNode;
