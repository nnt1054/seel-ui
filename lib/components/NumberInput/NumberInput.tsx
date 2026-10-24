import type { InputHTMLAttributes, KeyboardEvent, RefObject } from "react";

import { KeyCodes } from "@constants";
import { useActiveNode } from "@hooks/useActiveNode";
import { useEventListeners } from "@hooks/useEventListeners";
import { withActiveNode } from "@providers/ActiveNodeProvider";
import type { ActiveNodeProps, AdjacentNodes } from "@types";

export interface NumberInputProps extends ActiveNodeProps, InputHTMLAttributes<HTMLInputElement> {
  adjacentNodes?: AdjacentNodes;
  onCycleL?: () => void;
  onCycleR?: () => void;
}

export const NumberInput = withActiveNode((props: NumberInputProps) => {
  const {
    ref,
    node,
    adjacentNodes = {},
    onCycleL = () => {},
    onCycleR = () => {},
    ...others
  } = props;

  const { hasFocus } = useActiveNode();

  // events while node has focus
  useEventListeners(ref, {
    confirm: () => {
      ref.current?.focus();
    },
    cancel: () => {
      ref.current?.blur();
    },
  });

  // events while input has focus
  const onKeyDown = (event: KeyboardEvent) => {
    if (!ref.current) return;
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
      ref={ref as RefObject<HTMLInputElement>}
      onKeyDown={onKeyDown}
      data-focused={hasFocus ? "" : null}
      {...others}
    />
  );
});

export default NumberInput;
