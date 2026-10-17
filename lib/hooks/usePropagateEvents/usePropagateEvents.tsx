import type { RefObject } from "react";

import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import type { ChildrenRef, Node } from "@types";

interface usePropagateEventsProps {
  ref: RefObject<HTMLElement | null>;
  childrenRef: ChildrenRef | null;
  activeNode: Node;
  events: string[];
  isActive?: boolean;
}

interface Callbacks {
  [key: string]: () => void;
}

export const usePropagateEvents = (props: usePropagateEventsProps) => {
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
