import type { RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { usePropagateEvents } from "@hooks/usePropagateEvents/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps } from "@types";

interface ActiveContainerProps extends ActiveNodeProps {
  events?: string[];
}

// todo: move default events
const defaultEvents = [
  "up",
  "down",
  "left",
  "right",
  "cycleR",
  "cycleL",
  "confirm",
];

export const ActiveContainer = withActiveNode((props: ActiveContainerProps) => {
  const {
    ref,
    node,
    events = defaultEvents,
    ...others
  } = props;

  const { hasFocus, childrenRef, activeNode } = useActiveNode();

  usePropagateEvents({
    ref,
    childrenRef,
    activeNode,
    events,
  });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default ActiveContainer;
