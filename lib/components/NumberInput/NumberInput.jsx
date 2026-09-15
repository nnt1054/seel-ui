import { useRef } from "react";

import { KeyCodes } from "@constants";
import { useActiveNode } from "@hooks/useActiveNode/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider/ActiveNodeProvider";

export const NumberInput = withActiveNode((props) => {
  const {
    ref = useRef(),
    node,
    ...others
  } = props;

  const { hasFocus } = useActiveNode();

  // events while node has focus
  useEventListeners(ref, {
    confirm: () => {
      ref.current.focus();
    },
    cancel: () => {
      ref.current.blur();
    },
  });

  // events while input has focus
  const onKeyDown = (event) => {
    if (event.keyCode == KeyCodes.ESC) {
      ref.current.blur();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode == KeyCodes.ENTER) {
      ref.current.blur();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode == KeyCodes.TAB) {
      if (event.shiftKey) {
        onCycleL();
      } else {
        onCycleR();
      }
      event.preventDefault();
    }
  };

  return (
    <input
      type="number"
      ref={ref}
      onKeyDown={onKeyDown}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default NumberInput;
