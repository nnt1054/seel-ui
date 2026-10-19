import type { MouseEvent, RefObject } from "react";

import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useAdjacentNodes } from "@hooks/useAdjacentNodes/useAdjacentNodes";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

interface ButtonProps extends ActiveNodeProps {
  adjacentNodes?: AdjacentNodes;
  onClick?: () => void;
}

export const Button = withActiveNode((props: ButtonProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    onClick = () => {},
    ...others
  } = props;

  const { hasFocus, grabFocus, moveFocus } = useActiveNode();

  const onConfirm = () => {
    grabFocus();
    onClick();
  };

  const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEventListeners(ref, {
    confirm: onConfirm,
  });

  useAdjacentNodes({
    ref,
    adjacentNodes,
    moveFocus,
  });

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onConfirm}
      onMouseDown={onMouseDown}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default Button;
