import type { RefObject } from "react";

import { DefaultEvents } from "@constants";
import { useActiveNode } from "@hooks/useActiveNode";
import { usePropagateEvents } from "@hooks/usePropagateEvents";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps } from "@types";

export interface ActiveContainerProps extends ActiveNodeProps {
  events?: string[];
}

export const ActiveContainer = withActiveNode((props: ActiveContainerProps) => {
  const {
    ref,
    node,
    events = DefaultEvents,
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
