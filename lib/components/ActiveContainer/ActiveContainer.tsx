import { useContext } from "react";
import type { RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode";
import { usePropagateEvents } from "@hooks/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import { DefaultEventsContext } from "@providers/InputProvider";
import type { ActiveNodeProps } from "@types";

export interface ActiveContainerProps extends ActiveNodeProps {
  events?: string[];
}

export const ActiveContainer = withActiveNode((props: ActiveContainerProps) => {
  const { events: defaultEvents } = useContext(DefaultEventsContext);

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
