import type { RefObject } from "react";

import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import type { Callbacks, ChildrenRef, Node } from "@types";

export interface UsePropagateEventsProps {
  ref: RefObject<HTMLElement | null>;
  childrenRef: ChildrenRef | null;
  activeNode: Node;
  events: string[];
  isActive?: boolean;
}

export const usePropagateEvents = (props: UsePropagateEventsProps) => {
  const {
    ref,
    childrenRef,
    activeNode,
    events = [],
    isActive = true,
  } = props;

  if (!childrenRef) return;

  const callbacks = events.reduce((callbacks, event) => {
    callbacks[event] = () => {
      const activeRef = childrenRef.current.get(activeNode);
      activeRef?.current?.dispatchEvent(new Event(event));
    };
    return callbacks;
  }, {} as Callbacks);

  useEventListeners(ref, callbacks, isActive);
};

export default usePropagateEvents;
