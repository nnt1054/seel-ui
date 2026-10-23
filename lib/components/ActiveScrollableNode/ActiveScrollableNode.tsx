import type { RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode";
import { useActiveScrollableNode } from "@hooks/useActiveScrollableNode";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

interface ActiveScrollableNodeProps extends ActiveNodeProps {
  adjacentNodes?: AdjacentNodes;
}

export const ActiveScrollableNode = withActiveNode((props: ActiveScrollableNodeProps) => {
  const {
    ref,
    node,
    adjacentNodes,
    ...others
  } = props;

  const { hasFocus, moveFocus, grabFocus } = useActiveNode();

  useActiveScrollableNode({
    ref,
    adjacentNodes,
    moveFocus,
  });

  const onClick = () => {
    grabFocus();
  };

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      onClick={onClick}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default ActiveScrollableNode;
