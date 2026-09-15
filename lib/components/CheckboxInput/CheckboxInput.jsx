import { useRef } from "react";

import { KeyCodes } from "@constants";
import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useAdjacentNodes } from "@hooks/useAdjacentNodes/useAdjacentNodes";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";

export const CheckboxInput = withActiveNode((props) => {
  const {
    ref = useRef(),
    node,
    adjacentNodes = {},
    value,
    setValue = () => {},
    ...others
  } = props;

  const { hasFocus, moveFocus } = useActiveNode();

  useEventListeners(ref, {
    confirm: () => {
      ref.current.checked = !ref.current.checked;
      ref.current.dispatchEvent(new Event("change"));
    },
    change: (event) => {
      const checked = event.target.checked;
      setValue(checked);
    },
  });

  useAdjacentNodes({
    ref,
    adjacentNodes,
    moveFocus,
  });

  return (
    <input
      type="checkbox"
      ref={ref}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default CheckboxInput;
