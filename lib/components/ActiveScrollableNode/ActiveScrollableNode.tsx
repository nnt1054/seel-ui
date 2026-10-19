import type { RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useActiveScrollableNode } from "@hooks/useActiveScrollableNode/useActiveScrollableNode";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
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
